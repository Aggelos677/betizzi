// Τα έτοιμα κουπόνια (παρολί) του betizzi. Βγαίνουν μία φορά τη μέρα και δεν αλλάζουν μετά (record).
// Πρόγραμμα (απόφαση 01/11/2026):
//  Δευ–Παρ: x3, x5, x10
//  Σαβ–Κυρ: x3 νίκες, x3 γκολ, x5 νίκες, x5 γκολ, x10 ×2, x50
//  + ένα x50 τη μέρα του Champions League και τη μέρα του Europa/Conference.
import { MODEL_VERSION, NOT_FIRST_TEAM } from "./tips.js";

const DAY = 86400;
const now = () => Math.floor(Date.now() / 1000);
const ymd = (t) => new Date(t * 1000).toISOString().slice(0, 10);
const WINS = new Set(["1", "2"]), GOALS = new Set(["O25", "GG", "O15"]);
const UCL = 2, UEL = [3, 848];

// Στυλ επιλογών: όχι όλα «σούπερ φαβορί». Ποικιλία ανά μέρα (απόφαση Owner 01/11/2026).
//  low  = χαμηλές αποδόσεις (1.20–1.50), περισσότερες επιλογές
//  mid  = 1.55–1.95, λίγες επιλογές (π.χ. x3 = 1.80 × 1.75)
//  high = 1.70–2.40, για μεγάλα κουπόνια με λίγες «γεμάτες» επιλογές
const BAND = { low: [1.2, 1.5], mid: [1.55, 1.95], high: [1.7, 2.4] };
function schedule(date, leagueIds, rnd) {
  const wd = new Date(date + "T12:00:00Z").getUTCDay(); // 0=Κυρ, 6=Σαβ
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const s3 = pick([["mid", "low"], ["low", "mid"]]), s5 = pick([["mid", "low"], ["low", "mid"]]);
  const list = wd === 0 || wd === 6
    ? [["x3", 3, "wins", s3[0]], ["x3", 3, "goals", s3[1]], ["x5", 5, "wins", s5[0]], ["x5", 5, "goals", s5[1]],
       ["x10", 10, "mix", "mid"], ["x10", 10, "mix", pick(["low", "high"])], ["x50", 50, "mix", "high"]]
    : [["x3", 3, "mix", pick(["mid", "low"])], ["x5", 5, "mix", pick(["mid", "low"])], ["x10", 10, "mix", pick(["mid", "high"])]];
  if (leagueIds.has(UCL)) list.push(["x50", 50, "ucl", "high"]);
  if (UEL.some((id) => leagueIds.has(id))) list.push(["x50", 50, "uel", "high"]);
  return list;
}

export async function makeCoupons(env, date = ymd(now()), dry = false) {
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS coupons(date TEXT, n INTEGER, kind TEXT, variant TEXT, legs TEXT, odds REAL, prob REAL,
    created_at INTEGER, model_version TEXT, hash TEXT, PRIMARY KEY(date, n))`).run();
  const done = await env.DB.prepare("SELECT COUNT(*) c FROM coupons WHERE date=?").bind(date).first();
  if (done.c && !dry) return { date, skipped: "already made" };

  const from = Math.floor(Date.parse(date + "T00:00:00Z") / 1000), to = from + DAY;
  const start = Math.max(now() + 45 * 60, from); // μόνο αγώνες που δεν έχουν αρχίσει (περιθώριο 45΄)
  const fx = (await env.DB.prepare("SELECT f.id, f.league_id, h.name hn, a.name an FROM fixtures f JOIN teams h ON h.id=f.home_id JOIN teams a ON a.id=f.away_id WHERE f.ts BETWEEN ? AND ? AND f.status IN ('NS','TBD')").bind(start, to).all()).results;
  const leagueOf = new Map(fx.filter((f) => !NOT_FIRST_TEAM.test(f.hn) && !NOT_FIRST_TEAM.test(f.an)).map((f) => [f.id, f.league_id]));
  // υποψήφιες επιλογές: τα tips μας + οι πιο πιθανές επιλογές του μοντέλου (από τις αποδόσεις)
  const cands = [];
  for (const t of (await env.DB.prepare("SELECT fixture_id, sel, price, prob, tier FROM tips WHERE status='active' AND fixture_id IN (SELECT id FROM fixtures WHERE ts BETWEEN ? AND ? AND status IN ('NS','TBD'))").bind(start, to).all()).results)
    if (t.price && t.prob) cands.push({ f: t.fixture_id, sel: t.sel, price: t.price, prob: t.prob, src: t.tier });
  const odds = {};
  for (const o of (await env.DB.prepare("SELECT fixture_id, sel, price FROM odds WHERE fixture_id IN (SELECT id FROM fixtures WHERE ts BETWEEN ? AND ? AND status IN ('NS','TBD'))").bind(start, to).all()).results)
    (odds[o.fixture_id] ||= {})[o.sel] = o.price;
  for (const [id, o] of Object.entries(odds)) {
    const add = (sel, p) => { if (o[sel] && p >= 0.47 && o[sel] >= 1.2) cands.push({ f: +id, sel, price: o[sel], prob: p, src: "model" }); };
    if (o["1"] && o.X && o["2"]) { const s = 1 / o["1"] + 1 / o.X + 1 / o["2"]; add("1", 1 / o["1"] / s); add("2", 1 / o["2"] / s); }
    if (o.O25 && o.U25) { const s = 1 / o.O25 + 1 / o.U25; add("O25", 1 / o.O25 / s); add("U25", 1 / o.U25 / s); }
    if (o.GG && o.NG) { const s = 1 / o.GG + 1 / o.NG; add("GG", 1 / o.GG / s); add("NG", 1 / o.NG / s); }
  }
  // ένα «καλύτερο» ανά αγώνα+επιλογή: προτιμάμε τα tips μας
  const best = new Map();
  for (const c of cands) { const k = c.f + "|" + c.sel; const b = best.get(k); if (!b || (b.src === "model" && c.src !== "model")) best.set(k, c); }
  const pool = [...best.values()].filter((c) => leagueOf.has(c.f));
  // σταθερή «τύχη» ανά μέρα, για να μην αλλάζουν αν ξανατρέξει
  let seed = [...date].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) >>> 0, 7);
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

  const out = [], usedBy = {};
  const plan = schedule(date, new Set(fx.map((f) => f.league_id)), rnd);
  for (const [kind, target, variant, style] of plan) {
    const [lo, hi] = BAND[style];
    // επιλογές του μοντέλου στα ψηλά στυλ μόνο αν είναι αρκετά πιθανές για την απόδοσή τους
    let p = pool.filter((c) => c.price >= lo && c.price <= hi && (c.src !== "model" || style === "low" || c.prob * c.price >= 0.93));
    if (variant === "wins") p = p.filter((c) => WINS.has(c.sel));
    if (variant === "goals") p = p.filter((c) => GOALS.has(c.sel));
    if (variant === "ucl") p = p.filter((c) => leagueOf.get(c.f) === UCL);
    if (variant === "uel") p = p.filter((c) => UEL.includes(leagueOf.get(c.f)));
    const used = (usedBy[kind] ||= new Set()); // ίδιο μέγεθος κουπονιού: διαφορετικοί αγώνες
    // ταξινόμηση: tips μας πρώτα, μετά πιθανότητα, με λίγη τύχη για ποικιλία
    p = p.filter((c) => !used.has(c.f)).map((c) => ({ c, s: (c.src === "model" ? 0 : 0.15) + c.prob + rnd() * 0.12 })).sort((a, b) => b.s - a.s).map((x) => x.c);
    // χτίσιμο: καλύτερες επιλογές πρώτα, και η τελευταία διαλέγεται ώστε να «κλείσει» κοντά στον στόχο
    const legs = [], fxIn = new Set(); let tot = 1;
    const free = () => p.filter((c) => !fxIn.has(c.f));
    const take = (c) => { legs.push(c); fxIn.add(c.f); tot *= c.price; };
    while (legs.length < 12) {
      const need = target / tot;
      if (need <= hi * 1.15 && need >= lo * 0.87 && legs.length >= 1) {
        const fin = free().filter((c) => tot * c.price >= target * 0.85 && tot * c.price <= target * 1.15)
          .sort((a, b) => Math.abs(a.price - need) - Math.abs(b.price - need))[0];
        if (fin) { take(fin); break; }
      }
      const nxt = free().find((c) => tot * c.price * lo <= target * 1.15);
      if (!nxt) break;
      take(nxt);
      if (tot >= target * 0.85) break;
    }
    if (tot < target * 0.85 || legs.length < 2) continue; // δεν βγαίνει σήμερα
    legs.forEach((l) => used.add(l.f));
    const prob = legs.reduce((a, l) => a * l.prob, 1);
    out.push({ kind, variant, style, legs, odds: Math.round(tot * 100) / 100, prob });
  }
  if (dry) return { date, dry: true, made: out.map((c) => ({ kind: c.kind, variant: c.variant, odds: c.odds, prob: Math.round(c.prob * 1000) / 10, style: c.style, legs: c.legs.map((l) => l.sel + "@" + l.price + "(" + l.src + ")") })) };
  const t = now(), st = [];
  for (let i = 0; i < out.length; i++) {
    const c = out[i];
    const legs = JSON.stringify(c.legs.map((l) => [l.f, l.sel, l.price, Math.round(l.prob * 1000) / 1000, l.src]));
    const hash = await sha256([date, i + 1, c.kind, legs, t, MODEL_VERSION].join("|"));
    st.push(env.DB.prepare("INSERT OR IGNORE INTO coupons VALUES(?,?,?,?,?,?,?,?,?,?)").bind(date, i + 1, c.kind, c.variant, legs, c.odds, c.prob, t, MODEL_VERSION, hash));
  }
  if (st.length) await env.DB.batch(st);
  return { date, made: out.map((c) => `${c.kind} ${c.variant} ${c.style} ${c.legs.length} legs x${c.odds}`) };
}

async function sha256(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

// Για τη σελίδα: κουπόνια μιας μέρας με στοιχεία αγώνων. Επιλογές από VIP tips κρυφές ως τη σέντρα.
export async function apiCoupons(env, date) {
  const rows = (await env.DB.prepare("SELECT * FROM coupons WHERE date=? ORDER BY n").bind(date).all().catch(() => ({ results: [] }))).results;
  const ids = [...new Set(rows.flatMap((r) => JSON.parse(r.legs).map((l) => l[0])))];
  const fx = {};
  for (let i = 0; i < ids.length; i += 90) {
    const part = ids.slice(i, i + 90);
    for (const f of (await env.DB.prepare(`SELECT f.id, f.ts, f.status, f.gh, f.ga, f.fth, f.fta, l.name league, h.name home, a.name away FROM fixtures f
      JOIN leagues l ON l.id=f.league_id JOIN teams h ON h.id=f.home_id JOIN teams a ON a.id=f.away_id WHERE f.id IN (${part.map(() => "?").join(",")})`).bind(...part).all()).results) fx[f.id] = f;
  }
  const won = (s, i, j) => ({ "1": i > j, X: i === j, "2": i < j, O15: i + j > 1, O25: i + j > 2, U25: i + j < 3, GG: i > 0 && j > 0, NG: i === 0 || j === 0 })[s];
  return rows.map((r) => {
    const legs = JSON.parse(r.legs).map(([f, sel, price, prob, src]) => {
      const m = fx[f] || {};
      const hide = src === "vip" && m.ts + 600 > now(); // VIP ανοίγουν 10΄ μετά τη σέντρα
      const s90 = m.status === "FT" ? [m.gh, m.ga] : (m.status === "AET" || m.status === "PEN") && m.fth != null ? [m.fth, m.fta] : null;
      const res = s90 ? (won(sel, s90[0], s90[1]) ? 1 : 0) : null;
      return { fixture_id: f, home: m.home, away: m.away, league: m.league, ts: m.ts, status: m.status, gh: m.gh, ga: m.ga,
        sel: hide ? null : sel, price: hide ? null : price, prob: hide ? null : prob, vip: src === "vip", locked: hide, result: res };
    });
    const result = legs.some((l) => l.result === 0) ? 0 : legs.every((l) => l.result === 1) ? 1 : null;
    return { n: r.n, kind: r.kind, variant: r.variant, odds: r.odds, prob: r.prob, created_at: r.created_at, hash: r.hash, result, legs };
  });
}
