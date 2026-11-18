// Αποδόσεις Stoiximan (TASKS — Owner 18/11/2026).
// Ο scraper στον PC του Owner στέλνει κάθε 2΄ POST /ingest/stoiximan με header X-Ingest-Key.
// Κλειδί: Cloudflare Secret INGEST_KEY στο betizzi-engine (ποτέ στον κώδικα / στο Sheet).
// Κόστος D1: γράφουμε ΜΟΝΟ αγώνες που άλλαξαν (hash), όχι όλο το JSON κάθε 2΄.
import { bestFixture, toBk } from "./stoix-match.js";
const MAX_BYTES = 3 * 1024 * 1024; // ~130 KB σήμερα· όριο ασφαλείας
const MAX_EVENTS = 5000;
const SOURCES = new Set(["stoiximan.com.cy"]);

const now = () => Math.floor(Date.now() / 1000);

// σύγκριση κλειδιού σε σταθερό χρόνο
function sameKey(a, b) {
  const x = new TextEncoder().encode(a || ""), y = new TextEncoder().encode(b || "");
  let d = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) d |= (x[i] || 0) ^ (y[i] || 0);
  return d === 0 && x.length > 0;
}

async function sha(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b).slice(0, 12)].map((v) => v.toString(16).padStart(2, "0")).join("");
}

// ελάχιστος έλεγχος μορφής ενός αγώνα· ό,τι δεν ταιριάζει παραλείπεται (μετράει στο skipped)
function clean(e) {
  if (!e || typeof e !== "object") return null;
  const id = String(e.id ?? "");
  if (!/^\d{1,15}$/.test(id)) return null;
  if (typeof e.start !== "string" || !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(e.start)) return null;
  if (!Array.isArray(e.mk)) return null;
  const mk = e.mk.filter((m) => Array.isArray(m) && typeof m[0] === "string" && Array.isArray(m[3]));
  return {
    id,
    br: Number.isInteger(e.br) ? e.br : null,
    start: e.start.slice(0, 16),
    region: String(e.region ?? "").slice(0, 80),
    league: String(e.league ?? "").slice(0, 160),
    match: String(e.match ?? "").slice(0, 200),
    teams: Array.isArray(e.teams) ? e.teams.slice(0, 2) : [],
    url: typeof e.url === "string" && e.url.startsWith("/") ? e.url.slice(0, 300) : null,
    mk,
  };
}

export async function ingestStoiximan(req, env, json) {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  if (!env.INGEST_KEY) return json({ error: "not configured" }, 503); // χωρίς secret το endpoint μένει κλειστό
  if (!sameKey(req.headers.get("x-ingest-key"), env.INGEST_KEY)) return json({ error: "key" }, 401);
  if (+(req.headers.get("content-length") || 0) > MAX_BYTES) return json({ error: "too big" }, 413);

  const text = await req.text();
  if (text.length > MAX_BYTES) return json({ error: "too big" }, 413);
  let body;
  try { body = JSON.parse(text); } catch { return json({ error: "json" }, 400); }
  if (!SOURCES.has(body?.source)) return json({ error: "source" }, 400);
  if (!Array.isArray(body.events) || body.events.length > MAX_EVENTS) return json({ error: "events" }, 400);
  const scraped = String(body.scraped_at_utc || "").slice(0, 19);

  await env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS stoix_ev(id TEXT PRIMARY KEY, src TEXT, br INTEGER, start TEXT, region TEXT, league TEXT,
      match TEXT, teams TEXT, url TEXT, mk TEXT, h TEXT, first_seen INTEGER, updated INTEGER, scraped_at TEXT)`),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS stoix_ev_start ON stoix_ev(start)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS stoix_ev_br ON stoix_ev(br)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS kv(k TEXT PRIMARY KEY, v TEXT)"),
  ]);

  const evs = [];
  let skipped = 0;
  const seenIds = new Set();
  for (const raw of body.events) {
    const e = clean(raw);
    if (!e || seenIds.has(e.id)) { skipped++; continue; }
    seenIds.add(e.id);
    e.h = await sha(JSON.stringify([e.br, e.start, e.region, e.league, e.match, e.teams, e.url, e.mk]));
    evs.push(e);
  }

  // ποια άλλαξαν (ανάγνωση = φθηνή· εγγραφή μόνο όπου άλλαξε το hash)
  const old = {};
  for (let i = 0; i < evs.length; i += 90) {
    const part = evs.slice(i, i + 90).map((e) => e.id);
    const r = await env.DB.prepare(`SELECT id, h FROM stoix_ev WHERE id IN (${part.map(() => "?").join(",")})`).bind(...part).all();
    for (const x of r.results) old[x.id] = x.h;
  }
  const t = now();
  const st = [];
  for (const e of evs) {
    if (old[e.id] === e.h) continue;
    st.push(env.DB.prepare(`INSERT INTO stoix_ev(id,src,br,start,region,league,match,teams,url,mk,h,first_seen,updated,scraped_at)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      ON CONFLICT(id) DO UPDATE SET br=excluded.br,start=excluded.start,region=excluded.region,league=excluded.league,match=excluded.match,
      teams=excluded.teams,url=excluded.url,mk=excluded.mk,h=excluded.h,updated=excluded.updated,scraped_at=excluded.scraped_at`)
      .bind(e.id, body.source, e.br, e.start, e.region, e.league, e.match, JSON.stringify(e.teams), e.url, JSON.stringify(e.mk), e.h, t, t, scraped));
  }
  for (let i = 0; i < st.length; i += 90) await env.DB.batch(st.slice(i, i + 90));

  const changedIds = new Set(evs.filter((e) => old[e.id] !== e.h).map((e) => e.id));
  const m = await mapAndPrice(env, evs, changedIds, t);

  const info = { source: body.source, scraped_at_utc: scraped, received: t, events: evs.length, changed: st.length, skipped, matched: m.matched, newly: m.newly, bk_rows: m.rows };
  await env.DB.prepare("INSERT OR REPLACE INTO kv(k,v) VALUES('stoix_last', ?)").bind(JSON.stringify(info)).run();
  return json({ ok: true, ...info });
}

// Αντιστοίχιση με τους δικούς μας αγώνες + τιμές Stoiximan στο odds_bk (μόνο εμφάνιση· απόφαση Owner 18/11, Α).
// Το odds_bk ΔΕΝ το διαβάζουν τα tips (αυτά διαβάζουν τον πίνακα odds) — η «καλύτερη τιμή» των tips δεν αλλάζει.
async function mapAndPrice(env, evs, changedIds, t) {
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS stoix_map(sid TEXT PRIMARY KEY, fixture_id INTEGER, score REAL, at INTEGER)").run();
  const map = {}, used = new Set();
  const ids = evs.map((e) => e.id);
  for (let i = 0; i < ids.length; i += 90) {
    const part = ids.slice(i, i + 90);
    for (const r of (await env.DB.prepare(`SELECT sid, fixture_id FROM stoix_map WHERE sid IN (${part.map(() => "?").join(",")})`).bind(...part).all()).results) {
      map[r.sid] = r.fixture_id; used.add(r.fixture_id);
    }
  }
  const todo = evs.filter((e) => map[e.id] == null);
  let newly = 0;
  if (todo.length) {
    const ts = todo.map((e) => Date.parse(e.start.replace(" ", "T") + ":00Z") / 1000).filter((x) => x > 0);
    const fx = ts.length ? (await env.DB.prepare(`SELECT f.id, f.ts, h.name home, a.name away FROM fixtures f JOIN teams h ON h.id=f.home_id JOIN teams a ON a.id=f.away_id
      WHERE f.ts BETWEEN ? AND ?`).bind(Math.min(...ts) - 900, Math.max(...ts) + 900).all()).results : [];
    for (const r of (await env.DB.prepare("SELECT fixture_id FROM stoix_map").all()).results) used.add(r.fixture_id);
    const ins = [];
    // πρώτα οι αγώνες με Sportradar id (η Stoiximan έχει κάποιες φορές διπλή εγγραφή χωρίς id)
    for (const e of todo.sort((a, b) => (b.br != null) - (a.br != null))) {
      const b = bestFixture(e, fx.filter((f) => !used.has(f.id)));
      if (!b) continue;
      map[e.id] = b.fixture_id; used.add(b.fixture_id); changedIds.add(e.id); newly++;
      ins.push(env.DB.prepare("INSERT OR IGNORE INTO stoix_map(sid,fixture_id,score,at) VALUES(?,?,?,?)").bind(e.id, b.fixture_id, b.score, t));
    }
    for (let i = 0; i < ins.length; i += 90) await env.DB.batch(ins.slice(i, i + 90));
  }
  const st = [];
  for (const e of evs) {
    if (map[e.id] == null || !changedIds.has(e.id)) continue; // γράφουμε μόνο όταν άλλαξε κάτι
    for (const o of toBk(e.mk))
      st.push(env.DB.prepare("INSERT OR REPLACE INTO odds_bk(fixture_id,bk,market,sel,price,updated) VALUES(?,?,?,?,?,?)")
        .bind(map[e.id], "Stoiximan", o.market, o.sel, o.price, t));
  }
  for (let i = 0; i < st.length; i += 90) await env.DB.batch(st.slice(i, i + 90));
  return { matched: Object.keys(map).length, newly, rows: st.length };
}
