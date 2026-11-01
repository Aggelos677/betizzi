// betizzi-engine — μηχανή δεδομένων.
// Τραβάει αγώνες/αποτελέσματα/live από τα «adapters», βγάζει tips με τους κανόνες του betizzi
// και τα γράφει στη βάση betizzi-db. Η σελίδα διαβάζει ΜΟΝΟ από τη βάση (/api/...).
import { makeCoupons, apiCoupons } from "./coupons.js";
import LEAGUES from "../data/leagues.json";
import { apifStats } from "./adapters/stats-apif.js";
import { apifOdds } from "./adapters/odds-apif.js";
import { makeTips } from "./tips.js";

const LEAGUE_IDS = new Set(LEAGUES.map((l) => l.id));
const DAY = 86400;
const VIP_OPEN = 600; // απόφαση Owner: τα VIP ανοίγουν σε όλους 10΄ μετά τη σέντρα

// Ποιος adapter χρησιμοποιείται. Αλλαγή πηγής = αλλαγή μόνο εδώ.
function sources(env) {
  return { stats: apifStats(env), odds: apifOdds(env) };
}

const now = () => Math.floor(Date.now() / 1000);
const ymd = (ts) => new Date(ts * 1000).toISOString().slice(0, 10);

async function log(env, job, ok, calls, note) {
  await env.DB.prepare("INSERT INTO runs(ts,job,ok,calls,note) VALUES(?,?,?,?,?)")
    .bind(now(), job, ok ? 1 : 0, calls, String(note || "").slice(0, 500)).run();
}

// ---------- jobs ----------
async function seedLeagues(env) {
  const stmts = LEAGUES.map((l) =>
    env.DB.prepare("INSERT OR REPLACE INTO leagues(id,country,name,type,tier,enabled) VALUES(?,?,?,?,?,1)")
      .bind(l.id, l.country, l.name, l.type, l.tier));
  for (let i = 0; i < stmts.length; i += 90) await env.DB.batch(stmts.slice(i, i + 90));
  return LEAGUES.length;
}

async function syncFixtures(env, days = 3) {
  const src = sources(env).stats;
  let n = 0, calls = 0;
  for (let d = 0; d < days; d++) {
    const list = await src.fixturesByDate(ymd(now() + d * DAY)); calls++;
    const keep = list.filter((f) => LEAGUE_IDS.has(f.league_id));
    await saveFixtures(env, keep);
    n += keep.length;
  }
  await log(env, "fixtures", true, calls, n + " fixtures");
  return n;
}

async function saveFixtures(env, list) {
  const st = [];
  for (const f of list) {
    st.push(env.DB.prepare(`INSERT INTO fixtures(id,ts,league_id,season,round,home_id,away_id,status,elapsed,gh,ga,hth,hta,updated)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      ON CONFLICT(id) DO UPDATE SET ts=excluded.ts,status=excluded.status,elapsed=excluded.elapsed,gh=excluded.gh,ga=excluded.ga,hth=excluded.hth,hta=excluded.hta,updated=excluded.updated`)
      .bind(f.id, f.ts, f.league_id, f.season, f.round, f.home.id, f.away.id, f.status, f.elapsed, f.gh, f.ga, f.hth, f.hta, now()));
    for (const t of [f.home, f.away])
      st.push(env.DB.prepare("INSERT OR REPLACE INTO teams(id,name,country,logo) VALUES(?,?,?,?)").bind(t.id, t.name, f.country, t.logo));
  }
  for (let i = 0; i < st.length; i += 90) await env.DB.batch(st.slice(i, i + 90));
}

// Φόρμα: τελευταίοι 10 αγώνες κάθε ομάδας που παίζει τις επόμενες 3 μέρες. Λίγες ομάδες ανά εκτέλεση.
async function syncForm(env, batch = 40) {
  const src = sources(env).stats;
  // Πρώτα οι ομάδες των αγώνων που έχουν αποδόσεις (μόνο εκεί βγαίνει tip), με τη σειρά της σέντρας.
  const { results } = await env.DB.prepare(`
    SELECT t.team, MIN(t.ts) ts FROM (
      SELECT home_id team, ts FROM fixtures f WHERE ts BETWEEN ?1 AND ?2 AND EXISTS (SELECT 1 FROM odds o WHERE o.fixture_id=f.id)
      UNION ALL SELECT away_id, ts FROM fixtures f WHERE ts BETWEEN ?1 AND ?2 AND EXISTS (SELECT 1 FROM odds o WHERE o.fixture_id=f.id)) t
    LEFT JOIN (SELECT team_id, MAX(fetched) f FROM form_fetch GROUP BY team_id) ff ON ff.team_id=t.team
    WHERE ff.f IS NULL OR ff.f < ?3 GROUP BY t.team ORDER BY ts LIMIT ?4`).bind(now(), now() + 3 * DAY, now() - 20 * 3600, batch).all();
  let calls = 0;
  for (const r of results) {
    let games;
    try { games = await src.lastResults(r.team, 10); calls++; } catch (e) { break; } // όριο API: συνεχίζει στο επόμενο λεπτό

    const st = games.map((g) => env.DB.prepare("INSERT OR REPLACE INTO results(team_id,fixture_id,ts,is_home,gf,ga,ht_gf,ht_ga) VALUES(?,?,?,?,?,?,?,?)")
      .bind(r.team, g.id, g.ts, g.is_home, g.gf, g.ga, g.ht_gf, g.ht_ga));
    st.push(env.DB.prepare("INSERT OR REPLACE INTO form_fetch(team_id,fetched) VALUES(?,?)").bind(r.team, now()));
    await env.DB.batch(st);
  }
  if (calls) await log(env, "form", true, calls, results.length + " teams");
  return results.length;
}

// Αποδόσεις σε κομμάτια: έως 8 σελίδες ανά τρέξιμο, με δείκτη στη D1. Κάθε μέρα ξαναρχίζει κάθε 12 ώρες.
async function syncOdds(env, maxPages = 8) {
  const src = sources(env).odds;
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS odds_bk(fixture_id INTEGER, bk TEXT, market TEXT, sel TEXT, price REAL, updated INTEGER, PRIMARY KEY(fixture_id, bk, market, sel))").run();
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS odds_cursor(date TEXT PRIMARY KEY, next_page INTEGER, total INTEGER, started INTEGER, done INTEGER)").run();
  let calls = 0, n = 0;
  for (let d = 0; d < 2 && calls < maxPages; d++) {
    const date = ymd(now() + d * DAY);
    let c = await env.DB.prepare("SELECT * FROM odds_cursor WHERE date=?").bind(date).first();
    if (!c || (c.done && now() - c.started > 12 * 3600)) c = { date, next_page: 1, total: 1, started: now(), done: 0 };
    while (!c.done && calls < maxPages) {
      const { rows, perBook = [], total } = await src.oddsPage(date, c.next_page, LEAGUE_IDS); calls++;
      // τιμή ανά bookmaker (για «καλύτερο παρολί» και «ο bookmaker μου»)
      const sb = perBook.map((o) => env.DB.prepare("INSERT OR REPLACE INTO odds_bk(fixture_id,bk,market,sel,price,updated) VALUES(?,?,?,?,?,?)")
        .bind(o.fixture_id, o.bk, o.market, o.sel, o.price, now()));
      for (let i = 0; i < sb.length; i += 90) await env.DB.batch(sb.slice(i, i + 90));
      const st = rows.map((o) => env.DB.prepare("INSERT OR REPLACE INTO odds(fixture_id,source,market,sel,price,bookmaker,updated) VALUES(?,?,?,?,?,?,?)")
        .bind(o.fixture_id, src.name, o.market, o.sel, o.price, o.bookmaker, o.updated));
      for (let i = 0; i < st.length; i += 90) await env.DB.batch(st.slice(i, i + 90));
      n += rows.length; c.total = total; c.next_page++;
      if (c.next_page > total) c.done = 1;
    }
    await env.DB.prepare("INSERT OR REPLACE INTO odds_cursor VALUES(?,?,?,?,?)").bind(c.date, c.next_page, c.total, c.started, c.done).run();
  }
  if (calls) await log(env, "odds", true, calls, n + " prices");
  return { calls, prices: n };
}

async function syncLive(env) {
  const src = sources(env).stats;
  const list = (await src.live()).filter((f) => LEAGUE_IDS.has(f.league_id));
  if (list.length) await saveFixtures(env, list);
  // όσοι ήταν live και δεν είναι πια στη λίστα → τελείωσαν: παίρνουμε το τελικό (έως 20 ανά λεπτό)
  const liveIds = new Set(list.map((f) => f.id));
  const gone = (await env.DB.prepare("SELECT id FROM fixtures WHERE status IN ('1H','2H','HT','ET','BT','P','LIVE','INT','SUSP') AND ts > ?").bind(now() - 6 * 3600).all()).results
    .map((r) => r.id).filter((id) => !liveIds.has(id));
  // και όσοι έπρεπε να έχουν αρχίσει πριν 2,5 ώρες αλλά δεν τους είδαμε ποτέ live
  const stale = (await env.DB.prepare("SELECT id FROM fixtures WHERE status IN ('NS','TBD') AND ts BETWEEN ? AND ? LIMIT 20").bind(now() - 8 * 3600, now() - 150 * 60).all()).results.map((r) => r.id);
  const ids = [...gone, ...stale].slice(0, 20);
  if (ids.length) await saveFixtures(env, await src.byIds(ids));
  await settleTips(env);
  return list.length;
}

// Κλείσιμο tips: μόνο σε κανονική λήξη (FT). Το αποτέλεσμα γράφεται μία φορά.
async function settleTips(env) {
  const rows = (await env.DB.prepare(`SELECT t.fixture_id, t.market, t.sel, f.gh, f.ga FROM tips t JOIN fixtures f ON f.id=t.fixture_id
    WHERE t.result IS NULL AND t.status='active' AND f.status='FT'`).all()).results;
  const won = (s, i, j) => ({ "1": i > j, X: i === j, "2": i < j, "1X": i >= j, X2: i <= j, "12": i !== j, O15: i + j > 1, O25: i + j > 2, O35: i + j > 3,
    U25: i + j < 3, U35: i + j < 4, GG: i > 0 && j > 0, NG: i === 0 || j === 0 })[s];
  const st = rows.filter((r) => won(r.sel, r.gh, r.ga) !== undefined)
    .map((r) => env.DB.prepare("UPDATE tips SET result=? WHERE fixture_id=? AND market=? AND sel=? AND result IS NULL").bind(won(r.sel, r.gh, r.ga) ? 1 : 0, r.fixture_id, r.market, r.sel));
  for (let i = 0; i < st.length; i += 90) await env.DB.batch(st.slice(i, i + 90));
}

async function runTips(env) {
  const out = await makeTips(env, now());
  await log(env, "tips", true, 0, JSON.stringify(out));
  return out;
}

// ---------- API για τη σελίδα ----------
async function apiDay(env, date) {
  const from = Math.floor(Date.parse(date + "T00:00:00Z") / 1000) - 3 * 3600;
  const to = from + DAY + 6 * 3600; // καλύπτει ζώνες ώρας από UTC−3 έως UTC+3
  const fx = await env.DB.prepare(`SELECT f.*, l.name league, l.country, l.type ltype, l.tier,
      h.name home, h.logo home_logo, a.name away, a.logo away_logo
      FROM fixtures f JOIN leagues l ON l.id=f.league_id JOIN teams h ON h.id=f.home_id JOIN teams a ON a.id=f.away_id
      WHERE f.ts BETWEEN ? AND ? ORDER BY l.tier, l.country, f.ts`).bind(from, to).all();
  const tips = await env.DB.prepare(`SELECT t.* FROM tips t JOIN fixtures f ON f.id=t.fixture_id WHERE f.ts BETWEEN ? AND ?`).bind(from, to).all();
  // VIP: η επιλογή/απόδοση/αιτιολόγηση ΔΕΝ φεύγουν δημόσια μέχρι 10΄ μετά τη σέντρα (μετά φαίνονται για το record).
  // Όταν μπει login, ο συνδεδεμένος χρήστης θα παίρνει πλήρη VIP από ξεχωριστό endpoint.
  const t0 = now();
  const out = tips.results.map((t) => {
    const f = fx.results.find((x) => x.id === t.fixture_id);
    if (t.tier === "vip" && f && f.ts + VIP_OPEN > t0) return { fixture_id: t.fixture_id, tier: "vip", status: t.status, locked: true };
    return t;
  });
  // Για τη σελίδα: αποδόσεις, μοντέλο, φόρμα 5 αγώνων και GG στους 10, για κάθε αγώνα.
  const odds = {};
  for (const o of (await env.DB.prepare("SELECT o.fixture_id, o.sel, o.price FROM odds o JOIN fixtures f ON f.id=o.fixture_id WHERE f.ts BETWEEN ? AND ?").bind(from, to).all()).results)
    (odds[o.fixture_id] ||= {})[o.sel] = o.price;
  const res = {};
  for (const r of (await env.DB.prepare(`SELECT r.team_id, r.ts, r.is_home, r.gf, r.ga FROM results r WHERE r.team_id IN
      (SELECT home_id FROM fixtures WHERE ts BETWEEN ?1 AND ?2 UNION SELECT away_id FROM fixtures WHERE ts BETWEEN ?1 AND ?2) ORDER BY r.ts DESC`).bind(from, to).all()).results)
    (res[r.team_id] ||= []).push(r);
  const tipsBy = {};
  for (const t of out) (tipsBy[t.fixture_id] ||= []).push(t); // μόνο τα ορατά tips (το σκορ δεν προδίδει VIP)
  for (const f of fx.results) {
    f.odds = odds[f.id] || {};
    f.model = scoreModel(f.odds, tipsBy[f.id] || []);
    for (const side of ["home", "away"]) {
      const list = (res[f[side + "_id"]] || []).filter((r) => r.ts < f.ts).slice(0, 10);
      f[side + "_form"] = list.slice(0, 5).map((r) => [r.gf > r.ga ? "W" : r.gf < r.ga ? "L" : "D", r.gf + "-" + r.ga, r.is_home]);
      f[side + "_gg"] = list.length ? list.filter((r) => r.gf > 0 && r.ga > 0).length / list.length : null;
    }
  }
  return { date, fixtures: fx.results, tips: out, coupons: await apiCoupons(env, date) };
}

// Ένας αγώνας: στοιχεία, tips (VIP κρυφό ως τη σέντρα), αποδόσεις, φόρμα 10 αγώνων, πιθανότητες και πιθανό σκορ.
async function apiMatch(env, id) {
  const f = await env.DB.prepare(`SELECT f.*, l.name league, l.country, h.name home, h.logo home_logo, a.name away, a.logo away_logo
    FROM fixtures f JOIN leagues l ON l.id=f.league_id JOIN teams h ON h.id=f.home_id JOIN teams a ON a.id=f.away_id WHERE f.id=?`).bind(id).first();
  if (!f) return { error: "not found" };
  const tips = (await env.DB.prepare("SELECT * FROM tips WHERE fixture_id=? AND status='active'").bind(id).all()).results
    .map((t) => (t.tier === "vip" && f.ts + VIP_OPEN > now() ? { fixture_id: id, tier: "vip", status: t.status, locked: true } : t));
  const odds = {};
  for (const o of (await env.DB.prepare("SELECT market, sel, price FROM odds WHERE fixture_id=?").bind(id).all()).results) odds[o.sel] = o.price;
  const form = async (team) => (await env.DB.prepare("SELECT fixture_id, ts, is_home, gf, ga FROM results WHERE team_id=? AND ts < ? ORDER BY ts DESC LIMIT 10").bind(team, f.ts).all()).results;
  const model = scoreModel(odds, tips.filter((t) => t.sel));
  return { fixture: f, tips, odds, form: { home: await form(f.home_id), away: await form(f.away_id) }, model };
}

// Μοντέλο: πιθανότητες από τις αποδόσεις (χωρίς το περιθώριο του bookmaker) και Poisson για το σκορ.
// Το πιθανό σκορ δεν αντιφάσκει ποτέ με τα tips του αγώνα.
function scoreModel(o, tips) {
  if (!o["1"] || !o["X"] || !o["2"]) return null;
  const inv = [1 / o["1"], 1 / o["X"], 1 / o["2"]], s = inv[0] + inv[1] + inv[2];
  const p1 = inv[0] / s, px = inv[1] / s, p2 = inv[2] / s;
  let pO = null;
  if (o.O25 && o.U25) { const a = 1 / o.O25, b = 1 / o.U25; pO = a / (a + b); }
  const pois = (l, k) => { let r = Math.exp(-l); for (let i = 1; i <= k; i++) r *= l / i; return r; };
  const grid = (lh, la) => { const g = []; for (let i = 0; i <= 7; i++) for (let j = 0; j <= 7; j++) g.push([i, j, pois(lh, i) * pois(la, j)]); return g; };
  const over = (g) => g.reduce((a, [i, j, p]) => a + (i + j > 2 ? p : 0), 0);
  const diff = (g) => g.reduce((a, [i, j, p]) => a + (i > j ? p : i < j ? -p : 0), 0);
  // συνολικά γκολ: από Over 2.5 αν υπάρχει, αλλιώς 2.6
  let L = 2.6;
  if (pO) { let lo = 0.5, hi = 6; for (let k = 0; k < 40; k++) { L = (lo + hi) / 2; over(grid(L / 2, L / 2)) < pO ? (lo = L) : (hi = L); } }
  // μοίρασμα ανάμεσα στις ομάδες ώστε 1 − 2 να ταιριάζει με την αγορά
  let lo = 0.05, hi = 0.95, r = 0.5;
  for (let k = 0; k < 40; k++) { r = (lo + hi) / 2; diff(grid(L * r, L * (1 - r))) < p1 - p2 ? (lo = r) : (hi = r); }
  const g = grid(L * r, L * (1 - r));
  const ok = ([i, j]) => tips.every((t) => !t.sel || ({
    "1": i > j, X: i === j, "2": i < j, "1X": i >= j, X2: i <= j, "12": i !== j,
    O15: i + j > 1, O25: i + j > 2, O35: i + j > 3, U25: i + j < 3, U35: i + j < 4, GG: i > 0 && j > 0, NG: i === 0 || j === 0,
  })[t.sel] !== false);
  const best = g.filter(ok).sort((a, b) => b[2] - a[2])[0] || g.sort((a, b) => b[2] - a[2])[0];
  return { p1, px, p2, over25: pO ?? over(g), score: [best[0], best[1]] };
}

// Έτοιμες απαντήσεις /api/day για σήμερα και αύριο (UTC), για γρήγορη σελίδα.
async function cacheDays(env) {
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS api_cache(k TEXT PRIMARY KEY, body TEXT, t INTEGER)").run();
  for (const d of [ymd(now()), ymd(now() + DAY)]) {
    const body = JSON.stringify(await apiDay(env, d));
    await env.DB.prepare("INSERT OR REPLACE INTO api_cache(k, body, t) VALUES(?,?,?)").bind("day:" + d, body, now()).run();
  }
}

async function status(env) {
  const q = (s) => env.DB.prepare(s).first();
  return {
    leagues: (await q("SELECT COUNT(*) n FROM leagues")).n,
    fixtures_next_3d: (await env.DB.prepare("SELECT COUNT(*) n FROM fixtures WHERE ts BETWEEN ? AND ?").bind(now(), now() + 3 * DAY).first()).n,
    teams_with_form: (await q("SELECT COUNT(DISTINCT team_id) n FROM results")).n,
    odds_rows: (await q("SELECT COUNT(*) n FROM odds")).n,
    tips: (await env.DB.prepare("SELECT tier, COUNT(*) n FROM tips t JOIN fixtures f ON f.id=t.fixture_id WHERE f.ts > ? GROUP BY tier").bind(now() - 6 * 3600).all()).results,
    last_runs: (await env.DB.prepare("SELECT datetime(ts,'unixepoch') at, job, ok, calls, note FROM runs ORDER BY id DESC LIMIT 12").all()).results,
  };
}

const json = (o, s = 200) => new Response(JSON.stringify(o, null, 1), { status: s, headers: { "content-type": "application/json; charset=utf-8", "access-control-allow-origin": "*" } });

export default {
  async fetch(req, env) {
    const u = new URL(req.url);
    try {
      if (u.pathname === "/" || u.pathname === "/status") return json(await status(env));
      if (u.pathname === "/api/live") {
        const r = await env.DB.prepare("SELECT id, status, elapsed, gh, ga FROM fixtures WHERE ts BETWEEN ? AND ? AND status NOT IN ('NS','TBD')").bind(now() - 4 * 3600, now() + 600).all();
        return json(r.results.map((f) => [f.id, f.status, f.elapsed, f.gh, f.ga]));
      }
      if (u.pathname === "/api/coupons") return json(await apiCoupons(env, u.searchParams.get("date") || ymd(now())));
      if (u.pathname === "/api/match") return json(await apiMatch(env, +u.searchParams.get("id")));
      if (u.pathname === "/api/day") {
        // έτοιμο από το cron (κάθε 2΄) → γρήγορη απάντηση· αλλιώς υπολογισμός επί τόπου
        const date = u.searchParams.get("date") || ymd(now());
        const c = await env.DB.prepare("SELECT body, t FROM api_cache WHERE k=?").bind("day:" + date).first().catch(() => null);
        if (c && now() - c.t < 600) return new Response(c.body, { headers: { "content-type": "application/json; charset=utf-8", "x-cache": "hit" } });
        return json(await apiDay(env, date));
      }
      if (u.pathname === "/run") {
        if (!env.ADMIN_TOKEN || u.searchParams.get("t") !== env.ADMIN_TOKEN) return json({ error: "unauthorized" }, 401);
        const job = u.searchParams.get("job");
        if (job === "apistatus") {
          const r = await fetch("https://v3.football.api-sports.io/status", { headers: { "x-apisports-key": env.APIF_KEY } });
          const j = await r.json();
          return json({ key_tail: String(env.APIF_KEY || "").slice(-4), plan: j.response?.subscription?.plan, account: j.response?.account?.firstname,
            today: j.response?.requests, per_min_limit: r.headers.get("x-ratelimit-limit"), per_min_left: r.headers.get("x-ratelimit-remaining"), errors: j.errors });
        }
        const jobs = { coupons: makeCoupons, coupons_dry: (e) => makeCoupons(e, undefined, true), cache: cacheDays, seed: seedLeagues, fixtures: syncFixtures, form: syncForm, odds: syncOdds, live: syncLive, tips: runTips };
        if (!jobs[job]) return json({ error: "unknown job", jobs: Object.keys(jobs) }, 400);
        return json({ job, result: await jobs[job](env) });
      }
      return json({ error: "not found" }, 404);
    } catch (e) {
      return json({ error: String(e && e.message || e) }, 500);
    }
  },

  // Ένα cron κάθε λεπτό. Τι τρέχει εξαρτάται από την ώρα (UTC).
  async scheduled(ev, env, ctx) {
    const d = new Date(ev.scheduledTime), m = d.getUTCMinutes(), h = d.getUTCHours();
    const tasks = [];
    // Αργός ρυθμός (01/11/2026, απόφαση Owner): μοιραζόμαστε το κλειδί API-Football με το MODIX90.
    // Ανεβαίνει όταν πάμε live.
    tasks.push(syncLive(env)); // 1 κλήση/λεπτό: τα live σκορ πρέπει να είναι φρέσκα για τα εφέ
    if (h === 3 && m === 5) tasks.push(seedLeagues(env).then(() => syncFixtures(env)));
    tasks.push(syncForm(env, 60)); // κάθε λεπτό, 60 ομάδες (~1 κλήση/0,7΄΄)
    tasks.push(syncOdds(env)); // κάνει δουλειά μόνο όταν υπάρχουν σελίδες που λείπουν
    if (m === 40 && h % 3 === 0) tasks.push(runTips(env));
    if (h === 3 && m === 50) tasks.push(runTips(env));
    if (m % 2 === 0) tasks.push(cacheDays(env));
    if (h === 6 && m === 50) tasks.push(makeCoupons(env)); // μετά τα tips των 06:40 UTC
    ctx.waitUntil(Promise.allSettled(tasks).then(async (r) => {
      const bad = r.filter((x) => x.status === "rejected");
      if (bad.length) await log(env, "cron", false, 0, bad.map((b) => String(b.reason)).join(" | "));
    }));
  },
};
