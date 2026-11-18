// Αποδόσεις Stoiximan (TASKS — Owner 18/11/2026).
// Ο scraper στον PC του Owner στέλνει κάθε 2΄ POST /ingest/stoiximan με header X-Ingest-Key.
// Κλειδί: Cloudflare Secret INGEST_KEY στο betizzi-engine (ποτέ στον κώδικα / στο Sheet).
// Κόστος D1: γράφουμε ΜΟΝΟ αγώνες που άλλαξαν (hash), όχι όλο το JSON κάθε 2΄.
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

  const info = { source: body.source, scraped_at_utc: scraped, received: t, events: evs.length, changed: st.length, skipped };
  await env.DB.prepare("INSERT OR REPLACE INTO kv(k,v) VALUES('stoix_last', ?)").bind(JSON.stringify(info)).run();
  return json({ ok: true, ...info });
}
