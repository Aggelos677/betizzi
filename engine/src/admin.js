// Backoffice betizzi (απόφαση Owner 02/11/2026). Μόνο για admin: χρήστης με role='admin' ή το μυστικό ADMIN_TOKEN.
// Μετρητής επισκέψεων/clicks: συγκεντρωτικά νούμερα ανά μέρα, χωρίς cookies και χωρίς προσωπικά στοιχεία.
import { authTables, userFrom } from "./auth.js";

const now = () => Math.floor(Date.now() / 1000);
const day = (t = now()) => new Date(t * 1000).toISOString().slice(0, 10);
const OWNER = "menelaou.chr70@gmail.com"; // admin από την αρχή (μπορεί να αλλάξει από τη βάση)
export const PARTNER_STATUS = ["todo", "sent", "replied", "talks", "signed", "live", "no"];

let ready = false;
export async function adminTables(env) {
  if (ready) return;
  await authTables(env);
  await env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS hits(day TEXT, kind TEXT, lang TEXT, country TEXT, src TEXT, n INTEGER, PRIMARY KEY(day, kind, lang, country, src))`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS partners(id INTEGER PRIMARY KEY, name TEXT, grp TEXT, countries TEXT, tier TEXT, contact TEXT, email TEXT,
      status TEXT DEFAULT 'todo', deal TEXT, links TEXT, notes TEXT, updated_at INTEGER)`),
  ]);
  for (const col of ["role TEXT", "note TEXT"]) { try { await env.DB.prepare("ALTER TABLE users ADD COLUMN " + col).run(); } catch (e) { /* υπάρχει */ } }
  await env.DB.prepare("UPDATE users SET role='admin' WHERE email=? AND (role IS NULL OR role='')").bind(OWNER).run();
  // πρώτη φορά: η λίστα επαφών της 1/11 (project «Επαφές bookmakers»)
  if (!(await env.DB.prepare("SELECT COUNT(*) c FROM partners").first()).c) {
    const SEED = [
      ["bet365", "bet365", "CY,GR,ES,DE,BG", "A"], ["Stoiximan", "Kaizen", "GR,CY", "A"], ["Betano", "Kaizen", "PT,RO,PE,CO", "A"],
      ["Novibet", "Novibet", "CY,GR", "A"], ["Meridianbet", "Meridianbet", "CY", "B"], ["Winmasters", "Winmasters", "CY", "B"],
      ["Superbet", "Superbet", "RO,GR", "A"], ["Maxbet", "Maxbet", "RS", "A"], ["Mozzart", "Mozzart", "RS", "A"], ["AdmiralBet", "Admiral", "RS", "A"],
      ["Winbet", "Winbet", "BG", "A"], ["Efbet", "Efbet", "BG", "A"], ["Betclic", "Betclic", "PT,FR", "A"], ["bwin", "Entain", "ES,DE,AT,PT", "A"],
      ["Sportium", "Sportium", "ES", "A"], ["Winamax", "Winamax", "FR", "A"], ["Unibet", "Kindred", "FR", "A"], ["Tipico", "Tipico", "DE", "A"],
      ["Caliente", "Caliente", "MX", "A"], ["BetPlay", "BetPlay", "CO", "A"], ["Rushbet", "Rush Street", "CO", "A"], ["Apuesta Total", "Apuesta Total", "PE", "A"],
      ["SportyBet", "SportyBet", "NG", "A"], ["Bet9ja", "Bet9ja", "NG", "A"], ["BetKing", "BetKing", "NG", "A"], ["Betika", "Betika", "KE", "A"],
      ["Betway", "Super Group", "ZA,GH", "A"], ["Hollywoodbets", "Hollywoodbets", "ZA", "A"],
    ];
    const t = now();
    await env.DB.batch(SEED.map(([n, g, c, tier]) => env.DB.prepare("INSERT INTO partners(name, grp, countries, tier, status, updated_at) VALUES(?,?,?,?, 'todo', ?)").bind(n, g, c, tier, t)));
  }
  ready = true;
}

// ---------- μετρητής (από τη σελίδα) ----------
const KINDS = new Set(["pv", "bk", "su"]); // σελίδα, click σε bookmaker, άνοιγμα εγγραφής
export async function hit(env, b, country) {
  await adminTables(env);
  const kind = KINDS.has(b.k) ? b.k : null; if (!kind) return { ok: false };
  const lang = String(b.l || "").slice(0, 2), src = String(b.s || "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 24);
  if (src === "bzqa") return { ok: true, qa: true }; // δοκιμαστές: δεν μετράνε
  await env.DB.prepare(`INSERT INTO hits(day, kind, lang, country, src, n) VALUES(?,?,?,?,?,1)
    ON CONFLICT(day, kind, lang, country, src) DO UPDATE SET n=n+1`).bind(day(), kind, lang, String(country || "").slice(0, 2), src).run();
  return { ok: true };
}

// ---------- πρόσβαση ----------
export async function isAdmin(env, token, key) {
  if (key && env.ADMIN_TOKEN && key === env.ADMIN_TOKEN) return { who: "key", role: "admin" };
  // υπεύθυνος marketing (secret MKT_PASS): βλέπει ΜΟΝΟ τη σελίδα Marketing, συγκεντρωτικά νούμερα
  if (key && env.MKT_PASS && key === env.MKT_PASS) return { who: "mkt", role: "mkt" };
  await adminTables(env);
  const u = await userFrom(env, token);
  return u && (u.role === "admin" || u.email === OWNER) ? { who: "user:" + u.id, email: u.email, role: "admin" } : null;
}
const audit = (env, who, action, target, detail) =>
  env.DB.prepare("INSERT INTO audit(ts, who, action, target, detail) VALUES(?,?,?,?,?)").bind(now(), who, action, String(target ?? ""), detail ? String(detail).slice(0, 500) : null).run();

// ---------- 1. Σήμερα ----------
export async function aToday(env) {
  const d = day(), y = day(now() - 86400), from = Math.floor(Date.parse(d + "T00:00:00Z") / 1000);
  const q = (s, ...b) => env.DB.prepare(s).bind(...b);
  const [hitsT, hitsY, su, logins, users, news, tips, coupons, yres, bk] = await Promise.all([
    q("SELECT kind, lang, country, src, n FROM hits WHERE day=?", d).all(),
    q("SELECT kind, SUM(n) n FROM hits WHERE day=? GROUP BY kind", y).all(),
    q("SELECT COUNT(*) c FROM users WHERE created_at>=?", from).first(),
    q("SELECT COUNT(DISTINCT user_id) c FROM sessions WHERE created_at>=?", from).first(),
    q("SELECT COUNT(*) c FROM users").first(),
    q("SELECT COUNT(*) c FROM users WHERE news=1").first(),
    q("SELECT t.tier, COUNT(*) n FROM tips t JOIN fixtures f ON f.id=t.fixture_id WHERE t.status='active' AND f.ts BETWEEN ? AND ? GROUP BY t.tier", from, from + 86400).all(),
    q("SELECT COUNT(*) c FROM coupons WHERE date=? AND style IS NOT NULL", d).first().catch(() => ({ c: 0 })),
    q(`SELECT SUM(t.result=1) w, SUM(t.result=0) l FROM tips t JOIN fixtures f ON f.id=t.fixture_id WHERE t.status='active' AND f.ts BETWEEN ? AND ?`, from - 86400, from).first(),
    q("SELECT src, SUM(n) n FROM hits WHERE day=? AND kind='bk' GROUP BY src ORDER BY n DESC", d).all(),
  ]);
  const sum = (k) => hitsT.results.filter((x) => x.kind === k).reduce((a, x) => a + x.n, 0);
  const group = (k, f) => { const m = {}; for (const x of hitsT.results.filter((x) => x.kind === k)) m[x[f] || "—"] = (m[x[f] || "—"] || 0) + x.n; return Object.entries(m).sort((a, b) => b[1] - a[1]); };
  return {
    day: d, pv: sum("pv"), pvY: (hitsY.results.find((x) => x.kind === "pv") || {}).n || 0, bk: sum("bk"), suOpen: sum("su"),
    byLang: group("pv", "lang"), byCountry: group("pv", "country").slice(0, 15), bySrc: group("pv", "src"), bkBySrc: bk.results,
    signups: su.c, logins: logins.c, users: users.c, newsYes: news.c,
    tips: Object.fromEntries(tips.results.map((x) => [x.tier, x.n])), coupons: coupons.c, yesterday: { w: yres.w || 0, l: yres.l || 0 },
  };
}

// ---------- 2. Πελάτες ----------
export async function aUsers(env, q, page) {
  const lim = 50, off = (Math.max(1, page) - 1) * lim, like = "%" + String(q || "").toLowerCase() + "%";
  const rows = (await env.DB.prepare(`SELECT u.id, u.email, u.lang, u.country, u.created_at, u.last_seen, u.news, u.status, u.role, u.note,
      (SELECT COALESCE(SUM(amount),0) FROM credits c WHERE c.user_id=u.id) credits
    FROM users u WHERE lower(u.email) LIKE ? OR u.country LIKE ? ORDER BY u.id DESC LIMIT ? OFFSET ?`).bind(like, like.toUpperCase(), lim, off).all()).results;
  const total = (await env.DB.prepare("SELECT COUNT(*) c FROM users WHERE lower(email) LIKE ? OR country LIKE ?").bind(like, like.toUpperCase()).first()).c;
  return { rows, total, page, per: lim };
}
export async function aUserAct(env, who, b) {
  const id = +b.id, u = await env.DB.prepare("SELECT id, email FROM users WHERE id=?").bind(id).first();
  if (!u) return { error: "user" };
  if (b.action === "credits") {
    const amt = Math.trunc(+b.amount); if (!amt || Math.abs(amt) > 100000) return { error: "amount" };
    await env.DB.prepare("INSERT INTO credits(user_id, ts, kind, amount, ref, day) VALUES(?,?,?,?,?,?)").bind(id, now(), "admin", amt, String(b.reason || "").slice(0, 120), "a" + now() + Math.random()).run();
    await audit(env, who, "credits", u.email, `${amt} ${b.reason || ""}`);
  } else if (b.action === "block" || b.action === "unblock") {
    await env.DB.prepare("UPDATE users SET status=? WHERE id=?").bind(b.action === "block" ? "blocked" : "active", id).run();
    if (b.action === "block") await env.DB.prepare("DELETE FROM sessions WHERE user_id=?").bind(id).run();
    await audit(env, who, b.action, u.email);
  } else if (b.action === "note") {
    await env.DB.prepare("UPDATE users SET note=? WHERE id=?").bind(String(b.text || "").slice(0, 500), id).run();
    await audit(env, who, "note", u.email, b.text);
  } else return { error: "action" };
  return { ok: true };
}
// εξαγωγή ΜΟΝΟ όσων είπαν ναι στο newsletter (με ημερομηνία συγκατάθεσης)
export async function aExport(env, who) {
  const r = (await env.DB.prepare(`SELECT u.email, u.lang, u.country, (SELECT MAX(ts) FROM consents c WHERE c.user_id=u.id AND c.kind='news' AND c.value=1) consent_ts
    FROM users u WHERE u.news=1 AND u.status='active' ORDER BY u.id`).all()).results;
  await audit(env, who, "export_news", r.length + " emails");
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return "email,lang,country,consent_utc\n" + r.map((x) => [x.email, x.lang, x.country, x.consent_ts ? new Date(x.consent_ts * 1000).toISOString() : ""].map(esc).join(",")).join("\n");
}

// ---------- 4. Συνεργάτες ----------
export async function aPartners(env) {
  const rows = (await env.DB.prepare("SELECT * FROM partners ORDER BY CASE status WHEN 'live' THEN 0 WHEN 'signed' THEN 1 WHEN 'talks' THEN 2 WHEN 'replied' THEN 3 WHEN 'sent' THEN 4 WHEN 'todo' THEN 5 ELSE 6 END, name").all()).results;
  const clicks = (await env.DB.prepare("SELECT src, SUM(n) n FROM hits WHERE kind='bk' AND day>=? GROUP BY src").bind(day(now() - 30 * 86400)).all()).results;
  return { rows, clicks30: Object.fromEntries(clicks.map((x) => [x.src, x.n])), statuses: PARTNER_STATUS };
}
export async function aPartnerSave(env, who, b) {
  const f = (k, n = 300) => (b[k] == null ? null : String(b[k]).slice(0, n));
  if (b.del && b.id) { await env.DB.prepare("DELETE FROM partners WHERE id=?").bind(+b.id).run(); await audit(env, who, "partner_del", b.id); return { ok: true }; }
  if (!f("name")) return { error: "name" };
  if (b.status && !PARTNER_STATUS.includes(b.status)) return { error: "status" };
  const v = [f("name", 80), f("grp", 80), f("countries", 120), f("tier", 4), f("contact", 120), f("email", 160), b.status || "todo", f("deal", 200), f("links", 2000), f("notes", 2000), now()];
  if (b.id) await env.DB.prepare("UPDATE partners SET name=?, grp=?, countries=?, tier=?, contact=?, email=?, status=?, deal=?, links=?, notes=?, updated_at=? WHERE id=?").bind(...v, +b.id).run();
  else await env.DB.prepare("INSERT INTO partners(name, grp, countries, tier, contact, email, status, deal, links, notes, updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").bind(...v).run();
  await audit(env, who, b.id ? "partner_edit" : "partner_add", f("name"), b.status);
  return { ok: true };
}

// ---------- 5. Υγεία ----------
export async function aHealth(env) {
  const since = now() - 86400, q = (s, ...b) => env.DB.prepare(s).bind(...b);
  const [byJob, errs, last, pending, stuck, mailFail] = await Promise.all([
    q("SELECT job, COUNT(*) runs, SUM(calls) calls FROM runs WHERE ts>=? AND job!='cron' GROUP BY job", Math.floor(Date.parse(day() + "T00:00:00Z") / 1000)).all(),
    q("SELECT datetime(ts,'unixepoch') at, substr(note,1,160) note, COUNT(*) n FROM runs WHERE ts>=? AND (ok=0 OR note LIKE 'Error%') GROUP BY substr(note,1,60) ORDER BY ts DESC LIMIT 12", since).all(),
    q("SELECT datetime(ts,'unixepoch') at, job, ok, calls, substr(note,1,120) note FROM runs WHERE job!='cron' ORDER BY id DESC LIMIT 15").all(),
    q("SELECT COUNT(*) c FROM tips t JOIN fixtures f ON f.id=t.fixture_id WHERE t.status='active' AND t.result IS NULL AND f.ts < ?", now() - 3 * 3600).first(),
    q("SELECT COUNT(*) c FROM fixtures WHERE status IN ('NS','1H','2H','HT') AND ts < ?", now() - 4 * 3600).first(),
    q("SELECT datetime(ts,'unixepoch') at, target, detail FROM audit WHERE action='welcome_fail' ORDER BY id DESC LIMIT 10").all(),
  ]);
  let api = null;
  try {
    const r = await fetch("https://v3.football.api-sports.io/status", { headers: { "x-apisports-key": env.APIF_KEY } });
    const j = await r.json(); api = { current: j.response?.requests?.current, limit: j.response?.requests?.limit_day, plan: j.response?.subscription?.plan };
  } catch (e) { api = { error: String(e.message) }; }
  return { api, byJob: byJob.results, errors: errs.results, last: last.results, pendingOld: pending.c, stuck: stuck.c, mailFail: mailFail.results, brevo: !!env.BREVO_KEY };
}

// ---------- 7. Ιστορικό ----------
export async function aAudit(env) {
  return (await env.DB.prepare("SELECT datetime(ts,'unixepoch') at, who, action, target, detail FROM audit ORDER BY id DESC LIMIT 100").all()).results;
}

// ---------- Λίγκες (απόφαση Owner 02/11): ενεργή/ανενεργή + πώς πήγε τις τελευταίες 7 μέρες ----------
export async function aLeagues(env) {
  const since = now() - 7 * 86400, to = now();
  const L = (await env.DB.prepare("SELECT id, country, name, type, tier, enabled FROM leagues ORDER BY country, tier, name").all()).results;
  const st = (await env.DB.prepare(`SELECT f.league_id id, COUNT(*) n,
      SUM(f.status IN ('FT','AET','PEN')) done, SUM(f.status IN ('FT','AET','PEN') AND f.gh IS NOT NULL) res,
      SUM(f.ts < ? AND f.status IN ('NS','TBD','1H','2H','HT')) stuck,
      SUM(EXISTS(SELECT 1 FROM odds o WHERE o.fixture_id=f.id)) wo,
      SUM(EXISTS(SELECT 1 FROM odds_bk b WHERE b.fixture_id=f.id AND b.bk='Bet365')) b365
    FROM fixtures f WHERE f.ts BETWEEN ? AND ? AND f.status NOT IN ('PST','CANC','ABD','SUSP') GROUP BY f.league_id`).bind(to - 4 * 3600, since, to + 2 * 86400).all()).results;
  const tp = (await env.DB.prepare(`SELECT f.league_id id, SUM(t.result=1) w, SUM(t.result=0) l, COUNT(*) n FROM tips t JOIN fixtures f ON f.id=t.fixture_id
    WHERE t.status='active' AND f.ts BETWEEN ? AND ? GROUP BY f.league_id`).bind(since, to + 2 * 86400).all()).results;
  const S = Object.fromEntries(st.map((x) => [x.id, x])), P = Object.fromEntries(tp.map((x) => [x.id, x]));
  return { rows: L.map((l) => ({ ...l, s: S[l.id] || null, t: P[l.id] || null })) };
}
export async function aLeagueSave(env, who, b) {
  const ids = (Array.isArray(b.ids) ? b.ids : [b.id]).map(Number).filter(Boolean).slice(0, 600), on = b.on ? 1 : 0;
  if (!ids.length) return { error: "id" };
  for (let i = 0; i < ids.length; i += 90) {
    const part = ids.slice(i, i + 90);
    await env.DB.prepare(`UPDATE leagues SET enabled=? WHERE id IN (${part.map(() => "?").join(",")})`).bind(on, ...part).run();
    // ανενεργή: σβήνονται οι μελλοντικοί αγώνες της που ΔΕΝ έχουν tip (όσοι έχουν tip μένουν για το record)
    if (!on) await env.DB.prepare(`DELETE FROM fixtures WHERE league_id IN (${part.map(() => "?").join(",")}) AND status IN ('NS','TBD') AND ts > ?
      AND NOT EXISTS (SELECT 1 FROM tips t WHERE t.fixture_id=fixtures.id)`).bind(...part, now()).run();
  }
  const names = (await env.DB.prepare(`SELECT country || ' – ' || name nm FROM leagues WHERE id IN (${ids.slice(0, 20).map(() => "?").join(",")})`).bind(...ids.slice(0, 20)).all()).results.map((x) => x.nm);
  await audit(env, who, on ? "league_on" : "league_off", ids.length + " λίγκες", names.join(", "));
  return { ok: true, n: ids.length };
}

// ---------- Marketing (όπως στο Pattern90): μόνο ανάγνωση, μόνο συγκεντρωτικά, χωρίς κανένα email/όνομα ----------
// Δεν μετράνε: emails με «+test», ids στο Variable MKT_EXCLUDE (με κόμμα), emails μιας χρήσης.
const DISPOSABLE = /@(mailinator|guerrillamail|10minutemail|tempmail|temp-mail|yopmail|trashmail|getnada|sharklasers|moblha|goldvester|agaexpress|hiringview|37xiao|ofags|playfine|hopefunder|dispostable|maildrop|fakeinbox|throwawaymail)\./i;
export async function aMkt(env) {
  const excl = new Set(String(env.MKT_EXCLUDE || "").split(",").map((x) => +x.trim()).filter(Boolean));
  const U = (await env.DB.prepare("SELECT id, email, country, lang, created_at, last_seen, news, status, role FROM users").all()).results
    .filter((u) => !/\+test/i.test(u.email) && !excl.has(u.id) && !DISPOSABLE.test(u.email) && u.role !== "admin");
  const disp = (await env.DB.prepare("SELECT email FROM users").all()).results.filter((u) => DISPOSABLE.test(u.email)).length;
  const t = now(), dk = (s) => day(s), days = [...Array(30)].map((_, i) => day(t - (29 - i) * 86400));
  const perDay = Object.fromEntries(days.map((d) => [d, 0])); for (const u of U) { const k = dk(u.created_at); if (k in perDay) perDay[k]++; }
  const wk = (n) => U.filter((u) => u.created_at >= t - n * 86400).length;
  const group = (rows, f, min = 3) => { const m = {}; for (const r of rows) { const k = f(r) || "—"; m[k] = (m[k] || 0) + (r.n || 1); }
    const out = [], other = [0]; for (const [k, v] of Object.entries(m).sort((a, b) => b[1] - a[1])) (v < min ? (other[0] += v) : out.push([k, v])); if (other[0]) out.push(["Άλλες", other[0]]); return out; };
  const H = (await env.DB.prepare("SELECT day, kind, lang, country, src, n FROM hits WHERE day>=?").bind(days[0]).all()).results;
  const pv = Object.fromEntries(days.map((d) => [d, 0])), bk = Object.fromEntries(days.map((d) => [d, 0]));
  for (const h of H) { if (h.kind === "pv" && h.day in pv) pv[h.day] += h.n; if (h.kind === "bk" && h.day in bk) bk[h.day] += h.n; }
  const H7 = H.filter((h) => h.day >= day(t - 6 * 86400));
  const su7 = H7.filter((h) => h.kind === "su").reduce((a, h) => a + h.n, 0);
  return {
    updated: t,
    users: { total: U.length, d1: wk(1), d7: wk(7), d30: wk(30), active7: U.filter((u) => u.last_seen >= t - 7 * 86400).length, perDay: Object.entries(perDay), byCountry: group(U, (u) => u.country), byLang: group(U, (u) => u.lang, 1) },
    news: { yes: U.filter((u) => u.news === 1 && u.status === "active").length, pct: U.length ? Math.round(U.filter((u) => u.news === 1).length * 100 / U.length) : 0 },
    traffic: { perDay: Object.entries(pv), bkPerDay: Object.entries(bk), src7: group(H7.filter((h) => h.kind === "pv"), (h) => h.src || "απευθείας / άγνωστο", 1),
      country7: group(H7.filter((h) => h.kind === "pv"), (h) => h.country), lang7: group(H7.filter((h) => h.kind === "pv"), (h) => h.lang, 1),
      pv7: H7.filter((h) => h.kind === "pv").reduce((a, h) => a + h.n, 0), bk7: H7.filter((h) => h.kind === "bk").reduce((a, h) => a + h.n, 0), suOpen7: su7, signups7: wk(7) },
    excluded: { disposable: disp },
  };
}
