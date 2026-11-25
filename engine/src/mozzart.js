// Αποδόσεις Mozzart (εντολή Owner 25/11/2026: «κάθε 5 λεπτά»).
// Πηγή: δημόσιο feed της Mozzart για affiliates (έγγραφο «Serbia API Odds Feed», χωρίς κλειδί), μόνο ανάγνωση.
// Το feed δίνει στο ποδόσφαιρο ΜΟΝΟ 1X2 και Ημίχρονο–Τελικό (επιβεβαίωση Mozzart 25/11) → κρατάμε μόνο 1X2.
// Όπως η Stoiximan (18/11, επιλογή Α): μόνο εμφάνιση στον πίνακα odds_bk· ΔΕΝ αλλάζει την «καλύτερη τιμή» των tips (πίνακας odds).
// Η σελίδα δείχνει τη Mozzart μόνο σε επισκέπτες από χώρες με άδεια (web/src/index.js, MOZ_COUNTRIES).
// Κόστος D1: γράφουμε μόνο αγώνες που άλλαξαν (hash).
import { bestFixture } from "./stoix-match.js";

const FEED = "https://api.mozzartbet.com/MozzartWS/external.json/android/mobile-offer/daily-range";
// Διοργανώσεις που δεν παίζουμε ποτέ (νέων, γυναικεία, Β' ομάδες) — όπως ο κανόνας λιγκών του CLAUDE.md
const SKIP_COMP = /Mladi|\bM\s?2\d\b|\bU\s?\d\d\b|Žene|Zene|\bW\b|Razvojna|Rezerv/i;

const now = () => Math.floor(Date.now() / 1000);
const dmy = (d) => `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}/${d.getUTCFullYear()}`;

async function sha(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b).slice(0, 12)].map((v) => v.toString(16).padStart(2, "0")).join("");
}

// Συντομογραφίες της Mozzart → πλήρες όνομα (για το ταίριασμα· αλλιώς μένουν χωρίς αντιστοίχιση, όχι λάθος)
const ALIAS = [[/^PSG$/i, "Paris Saint Germain"], [/^Man\.?\s?Utd\.?$/i, "Manchester United"], [/^Man\.?\s?City$/i, "Manchester City"],
  [/^Atl\.?\s?Madrid$/i, "Atletico Madrid"], [/^Ath\.?\s?Bilbao$/i, "Athletic Club"], [/^Crvena Zvezda$/i, "Crvena Zvezda"], [/^Nott\.?\s?Forest$/i, "Nottingham Forest"]];
const full = (n) => { n = String(n).trim(); for (const [re, v] of ALIAS) if (re.test(n)) return v; return n; };

// Ένας αγώνας του feed → {id, start "YYYY-MM-DD HH:MM" UTC, match "Α - Β", odds:[{sel,price}]} ή null
export function parseMatch(m) {
  if (!m || m.sportId !== 1 || m.status !== 1) return null;
  if (SKIP_COMP.test(String(m.competition || ""))) return null;
  if (!m.id || !m.home || !m.visitor || !(m.startTime > 0)) return null;
  const g = (m.games || []).find((x) => x.id === 1 || x.name === "Konačan ishod");
  if (!g) return null;
  const odds = [];
  for (const s of g.subgames || []) {
    if (["1", "X", "2"].includes(s.name) && s.value > 1 && s.winStatus === "ACTIVE") odds.push({ sel: s.name, price: +s.value });
  }
  if (odds.length !== 3) return null;
  return {
    id: String(m.id),
    start: new Date(m.startTime).toISOString().slice(0, 16).replace("T", " "),
    match: `${full(m.home)} - ${full(m.visitor)}`,
    comp: String(m.competition || "").replace(/\s+/g, " ").slice(0, 120),
    odds,
  };
}

export async function syncMozzart(env) {
  const t = now();
  const d0 = new Date(), d1 = new Date(Date.now() + 86400000);
  const url = `${FEED}?lang=1&fromDate=${dmy(d0)}&toDate=${dmy(d1)}`;
  const r = await fetch(url, { headers: { accept: "application/json", "user-agent": "betizzi.com (affiliate odds feed)" } });
  if (!r.ok) throw new Error(`mozzart feed ${r.status}`);
  const all = await r.json();
  if (!Array.isArray(all)) throw new Error("mozzart feed: not an array");

  const evs = [];
  for (const m of all) { const e = parseMatch(m); if (e) evs.push(e); }

  await env.DB.batch([
    env.DB.prepare("CREATE TABLE IF NOT EXISTS moz_map(mid TEXT PRIMARY KEY, fixture_id INTEGER, score REAL, match TEXT, comp TEXT, at INTEGER)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS moz_h(mid TEXT PRIMARY KEY, h TEXT, at INTEGER)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS kv(k TEXT PRIMARY KEY, v TEXT)"),
  ]);

  // ήδη αντιστοιχισμένοι + hash
  const map = {}, oldH = {}, used = new Set();
  const ids = evs.map((e) => e.id);
  for (let i = 0; i < ids.length; i += 90) {
    const part = ids.slice(i, i + 90), q = part.map(() => "?").join(",");
    for (const x of (await env.DB.prepare(`SELECT mid, fixture_id FROM moz_map WHERE mid IN (${q})`).bind(...part).all()).results) map[x.mid] = x.fixture_id;
    for (const x of (await env.DB.prepare(`SELECT mid, h FROM moz_h WHERE mid IN (${q})`).bind(...part).all()).results) oldH[x.mid] = x.h;
  }

  // νέες αντιστοιχίσεις (ίδιος κανόνας με τη Stoiximan: ώρα ±15΄ + ονόματα, σε αμφιβολία καμία)
  const todo = evs.filter((e) => map[e.id] == null);
  let newly = 0;
  if (todo.length) {
    const ts = todo.map((e) => Date.parse(e.start.replace(" ", "T") + ":00Z") / 1000);
    const fx = (await env.DB.prepare(`SELECT f.id, f.ts, h.name home, a.name away FROM fixtures f JOIN teams h ON h.id=f.home_id JOIN teams a ON a.id=f.away_id
      WHERE f.ts BETWEEN ? AND ?`).bind(Math.min(...ts) - 900, Math.max(...ts) + 900).all()).results;
    for (const x of (await env.DB.prepare("SELECT fixture_id FROM moz_map WHERE at > ?").bind(t - 5 * 86400).all()).results) used.add(x.fixture_id);
    const ins = [];
    for (const e of todo) {
      const b = bestFixture(e, fx.filter((f) => !used.has(f.id)));
      if (!b) continue;
      map[e.id] = b.fixture_id; used.add(b.fixture_id); newly++;
      ins.push(env.DB.prepare("INSERT OR IGNORE INTO moz_map(mid,fixture_id,score,match,comp,at) VALUES(?,?,?,?,?,?)").bind(e.id, b.fixture_id, b.score, e.match, e.comp, t));
    }
    for (let i = 0; i < ins.length; i += 90) await env.DB.batch(ins.slice(i, i + 90));
  }

  // τιμές: μόνο όπου άλλαξαν
  const st = [];
  let rows = 0;
  for (const e of evs) {
    if (map[e.id] == null) continue;
    const h = await sha(JSON.stringify([map[e.id], e.odds]));
    if (oldH[e.id] === h) continue;
    for (const o of e.odds) {
      st.push(env.DB.prepare("INSERT OR REPLACE INTO odds_bk(fixture_id,bk,market,sel,price,updated) VALUES(?,?,?,?,?,?)").bind(map[e.id], "Mozzart", "1X2", o.sel, o.price, t));
      rows++;
    }
    st.push(env.DB.prepare("INSERT OR REPLACE INTO moz_h(mid,h,at) VALUES(?,?,?)").bind(e.id, h, t));
  }
  for (let i = 0; i < st.length; i += 90) await env.DB.batch(st.slice(i, i + 90));

  const info = { at: t, feed: all.length, football: evs.length, matched: evs.filter((e) => map[e.id] != null).length, newly, bk_rows: rows };
  await env.DB.prepare("INSERT OR REPLACE INTO kv(k,v) VALUES('moz_last', ?)").bind(JSON.stringify(info)).run();
  return info;
}
