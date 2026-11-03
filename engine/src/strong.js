// «Τα δυνατά της ημέρας» (απόφαση Owner 03/11/2026): 3 κάρτες, κάθε μέρα στις 10:00 ώρα Ελλάδας/Κύπρου.
//  1) Νίκη (1 ή 2) σε απόδοση 1.60–1.85: VIP αν υπάρχει, αλλιώς Free
//  2) Γκολ: Over 2.5 ή GG σε απόδοση 1.60–1.85: VIP αν υπάρχει, αλλιώς Free
//  3) Τριάδα: τα 3 πιο δυνατά VIP που μένουν, κάθε επιλογή 1.50–1.80 (διαφορετικοί αγώνες)· αν λείπουν, από Free
// Τα VIP εδώ είναι ανοιχτά για όλους. Μόνο αγώνες που αρχίζουν τουλάχιστον 45΄ μετά.
// Βγαίνει μία φορά τη μέρα και ΔΕΝ αλλάζει (record, με hash). Τα αποτελέσματα διαβάζονται από τα tips.
import { MODEL_VERSION, NOT_FIRST_TEAM } from "./tips.js";
import { aiTexts } from "./ai.js";

const DAY = 86400;
const now = () => Math.floor(Date.now() / 1000);
const ymd = (t) => new Date(t * 1000).toISOString().slice(0, 10);
export const athH = () => +new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Athens", hour: "2-digit", hourCycle: "h23" }).format(new Date());

async function sha(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

export async function makeStrong(env, date = ymd(now()), force = false) {
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS strong(date TEXT PRIMARY KEY, data TEXT, created_at INTEGER, model_version TEXT, hash TEXT)").run();
  if ((await env.DB.prepare("SELECT 1 FROM strong WHERE date=?").bind(date).first()) && !force) return { ok: true, exists: true };
  const from = Math.floor(Date.parse(date + "T00:00:00Z") / 1000), to = from + DAY;
  const start = Math.max(now() + 45 * 60, from);
  const rows = (await env.DB.prepare(`SELECT t.fixture_id f, t.sel, t.price, t.prob, t.tier, t.level, t.strength s, f.ts, l.tier lt, h.name hn, a.name an
      FROM tips t JOIN fixtures f ON f.id=t.fixture_id JOIN leagues l ON l.id=f.league_id JOIN teams h ON h.id=f.home_id JOIN teams a ON a.id=f.away_id
      WHERE t.status='active' AND f.status IN ('NS','TBD') AND f.ts BETWEEN ? AND ?`).bind(start, to).all()).results
    .filter((x) => x.price && x.prob && !NOT_FIRST_TEAM.test(x.hn) && !NOT_FIRST_TEAM.test(x.an));
  // σειρά δύναμης: πιθανότητα, μετά λίγκα (μικρότερο tier = πιο γνωστή)
  const rank = (a, b) => b.prob - a.prob || (a.lt ?? 9) - (b.lt ?? 9);
  const vip = rows.filter((x) => x.tier === "vip").sort(rank), free = rows.filter((x) => x.tier !== "vip").sort(rank);
  const used = new Set();
  const pick = (test) => {
    for (const pool of [vip, free]) { const c = pool.find((x) => !used.has(x.f) && test(x)); if (c) { used.add(c.f); return c; } }
    return null;
  };
  // απόφαση Owner 03/11: οι δύο κάρτες «μονών» (Νίκη, Γκολ) σε απόδοση 1.60–1.85
  const win = pick((x) => (x.sel === "1" || x.sel === "2") && x.price >= 1.6 && x.price <= 1.85);
  const goals = pick((x) => (x.sel === "O25" || x.sel === "GG") && x.price >= 1.6 && x.price <= 1.85);
  const treble = [];
  // απόφαση Owner 03/11: κάθε επιλογή της τριάδας 1.50–1.80
  // ... και μπορεί να πάρει το πολύ ΕΝΑ από τα δύο «μονά» (Νίκη/Γκολ) της ημέρας
  const singles = new Set([win, goals].filter(Boolean).map((x) => x.f + ":" + x.sel)), inT = new Set();
  let fromSingles = 0;
  for (const pool of [vip, free]) for (const x of pool) {
    if (treble.length >= 3 || inT.has(x.f) || x.price < 1.5 || x.price > 1.8) continue;
    const isSingle = singles.has(x.f + ":" + x.sel);
    if (used.has(x.f) && !isSingle) continue;
    if (isSingle && fromSingles >= 1) continue;
    if (isSingle) fromSingles++;
    inT.add(x.f); treble.push(x);
  }
  // όχι πριν τις 10:00 ώρα Ελλάδας (εκτός αν το ζητήσει ο Owner με force)
  if (!force && athH() < 10) return { ok: false, wait: true };
  if (!win && !goals && treble.length < 3) return { ok: false, empty: true };
  const leg = (x) => x && { f: x.f, sel: x.sel, price: x.price, prob: x.prob, tier: x.tier };
  const data = { win: leg(win), goals: leg(goals), treble: treble.length === 3 ? { legs: treble.map(leg), odds: +treble.reduce((q, x) => q * x.price, 1).toFixed(2) } : null };
  const js = JSON.stringify(data), t = now();
  await env.DB.prepare("INSERT OR REPLACE INTO strong(date, data, created_at, model_version, hash) VALUES(?,?,?,?,?)")
    .bind(date, js, t, MODEL_VERSION, await sha(date + js + t)).run();
  return { ok: true, data };
}

// Για τη σελίδα: οι 3 κάρτες με ομάδες, ώρα, αποτέλεσμα (από tips/αγώνες). Τα VIP εδώ είναι ανοιχτά.
export async function apiStrong(env, date) {
  let r;
  try { r = await env.DB.prepare("SELECT data, created_at FROM strong WHERE date=?").bind(date).first(); } catch (e) { return null; }
  if (!r) return null;
  const d = JSON.parse(r.data), all = [d.win, d.goals, ...(d.treble ? d.treble.legs : [])].filter(Boolean);
  if (!all.length) return null;
  const ids = [...new Set(all.map((x) => x.f))];
  const fx = {};
  for (const f of (await env.DB.prepare(`SELECT f.id, f.ts, f.status, f.gh, f.ga, h.name home, a.name away, l.name league, l.country
      FROM fixtures f JOIN teams h ON h.id=f.home_id JOIN teams a ON a.id=f.away_id JOIN leagues l ON l.id=f.league_id WHERE f.id IN (${ids.map(() => "?").join(",")})`).bind(...ids).all()).results) fx[f.id] = f;
  const now_ = {};
  for (const o of (await env.DB.prepare(`SELECT fixture_id, sel, MAX(price) p FROM odds WHERE fixture_id IN (${ids.map(() => "?").join(",")}) GROUP BY fixture_id, sel`).bind(...ids).all()).results) now_[o.fixture_id + ":" + o.sel] = o.p;
  const res = {}, minp = {};
  for (const t of (await env.DB.prepare(`SELECT fixture_id, sel, result, min_price FROM tips WHERE fixture_id IN (${ids.map(() => "?").join(",")})`).bind(...ids).all()).results) { res[t.fixture_id + ":" + t.sel] = t.result; minp[t.fixture_id + ":" + t.sel] = t.min_price; }
  const ai = await aiTexts(env, date);
  const full = (x) => x && { ...x, ...(fx[x.f] || {}), ai: ai[x.f + ":" + x.sel] || null, fixture_id: x.f, result: res[x.f + ":" + x.sel] ?? null, now: now_[x.f + ":" + x.sel] ?? null, min: minp[x.f + ":" + x.sel] ?? null };
  const out = { at: r.created_at, win: full(d.win), goals: full(d.goals) };
  if (d.treble) {
    const legs = d.treble.legs.map(full);
    const rs = legs.map((l) => l.result);
    out.treble = { odds: d.treble.odds, legs, result: rs.some((v) => v === 0) ? 0 : rs.every((v) => v === 1 || v === 2) ? 1 : null };
  }
  return out;
}

// Ποια tips είναι «δυνατά» μιας μέρας (για το σήμα ⚡ στη σελίδα του αγώνα).
export async function strongKeys(env, date) {
  try {
    const r = await env.DB.prepare("SELECT data FROM strong WHERE date=?").bind(date).first();
    if (!r) return [];
    const d = JSON.parse(r.data);
    return [d.win, d.goals, ...(d.treble ? d.treble.legs : [])].filter(Boolean).map((x) => x.f + ":" + x.sel);
  } catch (e) { return []; }
}
