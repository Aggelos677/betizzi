// Τα έτοιμα κουπόνια (παρολί) του betizzi. Ό,τι δημοσιεύτηκε δεν αλλάζει (record)· μέσα στη μέρα μόνο ΠΡΟΣΤΙΘΕΝΤΑΙ όσα λείπουν.
// Κανόνες (απόφαση Owner 02/11/2026, βλ. project «Tips και παρολί — κανόνες»):
//  Ζώνες x3–5, x8–12, x20–30: Νίκες (1X2) · Γκολ (Over 2.5 + GG) · Μικτό. Και ~x100.
//  Καθημερινές: 9 + 1 x100 = 10 (κυρίως αγώνες μετά τις 17:00).
//  Σάβ–Κυρ: διπλά, ένα σετ έως τις 17:00 και ένα μετά = 18 + 2 x100 (ένα για κάθε ζώνη ώρας) = 20.
//  Μόνο από τα tips μας (Free + VIP· τα VIP μέσα στα παρολί είναι ανοιχτά), με σειρά ποιότητας.
//  Στυλ: Ισορροπημένο (1.50–2.10)· αν δεν βγαίνει, Φαβορί (1X2 1.40–1.65, γκολ 1.50–1.75). Ποτέ 1.40 με 3.80 μαζί.
//  Κάθε tip σε ΕΝΑ παρολί· το x100 μπορεί να ξαναπάρει έως τις ΜΙΣΕΣ επιλογές του από άλλα παρολί.
//  Ό,τι δεν βγαίνει, δεν βγαίνει· ξαναδοκιμάζεται όταν μπουν νέα tips.
import { MODEL_VERSION, NOT_FIRST_TEAM } from "./tips.js";

const DAY = 86400;
const now = () => Math.floor(Date.now() / 1000);
const ymd = (t) => new Date(t * 1000).toISOString().slice(0, 10);
const WINS = new Set(["1", "2"]), GOALS = new Set(["O25", "GG"]);
const ZONES = [["x3-5", 3, 5], ["x8-12", 8, 12], ["x20-30", 20, 30]];
const CRAZY = ["x100", 80, 130];
const STYLE = {
  bal: { wins: [1.50, 2.10], goals: [1.50, 2.10], other: [1.50, 2.10] },
  fav: { wins: [1.40, 1.65], goals: [1.50, 1.75], other: [1.45, 1.75] },
};
const LEVEL = { A: 2, B: 1, C: 0 };
const typeOf = (sel) => (WINS.has(sel) ? "wins" : GOALS.has(sel) ? "goals" : "other");

export async function makeCoupons(env, date = ymd(now()), dry = false) {
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS coupons(date TEXT, n INTEGER, kind TEXT, variant TEXT, legs TEXT, odds REAL, prob REAL,
    created_at INTEGER, model_version TEXT, hash TEXT, PRIMARY KEY(date, n))`).run();
  for (const col of ["style TEXT", "pick INTEGER", "slot TEXT"]) { try { await env.DB.prepare("ALTER TABLE coupons ADD COLUMN " + col).run(); } catch (e) { /* υπάρχει */ } }
  // ό,τι υπάρχει ήδη: οι θέσεις (ζώνη|είδος|ώρα) που καλύφθηκαν και οι αγώνες που χρησιμοποιήθηκαν.
  // Τα πολύ παλιά (πριν 02/11, χωρίς στυλ) αγνοούνται εδώ και κρύβονται στη σελίδα.
  const prev = (await env.DB.prepare("SELECT n, kind, variant, style, slot, legs FROM coupons WHERE date=?").bind(date).all()).results;
  const base = prev.reduce((m, r) => Math.max(m, r.n), 0);
  const have = new Set(), usedFx = new Set();
  for (const r of prev.filter((r) => r.style)) {
    have.add(r.slot || `${r.kind}|${r.variant}|day`);
    if (r.kind !== CRAZY[0]) for (const l of JSON.parse(r.legs)) usedFx.add(l[0]);
  }

  const from = Math.floor(Date.parse(date + "T00:00:00Z") / 1000), to = from + DAY;
  const start = Math.max(now() + 45 * 60, from); // μόνο αγώνες που δεν έχουν αρχίσει (περιθώριο 45΄)
  const fx = (await env.DB.prepare("SELECT f.id, h.name hn, a.name an FROM fixtures f JOIN teams h ON h.id=f.home_id JOIN teams a ON a.id=f.away_id WHERE f.ts BETWEEN ? AND ? AND f.status IN ('NS','TBD')").bind(start, to).all()).results;
  const ok = new Set(fx.filter((f) => !NOT_FIRST_TEAM.test(f.hn) && !NOT_FIRST_TEAM.test(f.an)).map((f) => f.id));
  // τα tips μας, με «ποιότητα»: VIP πρώτα, μετά επίπεδο (Α/Β/Γ), ισχύς, και πόσο κοντά είναι η τιμή στον «πάτο» του VIP
  const tips = (await env.DB.prepare("SELECT t.fixture_id f, t.sel, t.price, t.prob, t.tier, t.strength s, t.level, t.min_price, f.ts FROM tips t JOIN fixtures f ON f.id=t.fixture_id WHERE t.status='active' AND f.ts BETWEEN ? AND ? AND f.status IN ('NS','TBD')").bind(start, to).all()).results
    .filter((x) => ok.has(x.f) && x.price && x.prob)
    .map((x) => {
      const near = x.tier === "vip" ? 1 : x.min_price ? Math.min(1, x.price / (x.min_price / 0.97)) : 0.9;
      return { ...x, src: x.tier, q: (x.tier === "vip" ? 3 : 0) + (LEVEL[x.level] ?? 0) + near + Math.min(x.s || 0, 110) / 1000 };
    })
    .sort((a, b) => b.q - a.q);

  const wd = new Date(date + "T12:00:00Z").getUTCDay(), weekend = wd === 0 || wd === 6;
  // Ζώνες ώρας (ώρα Ελλάδας/Κύπρου): έως τις 17:00 και μετά τις 17:00.
  const hAth = (ts) => +new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Athens", hour: "2-digit", hourCycle: "h23" }).format(ts * 1000);
  for (const x of tips) x.late = hAth(x.ts) >= 17;
  function build(lo, hi, variant, style, pool, maxLegs = 12) {
    const band = STYLE[style];
    let p = pool.filter((c) => {
      const ty = typeOf(c.sel);
      if (variant === "wins" && ty !== "wins") return false;
      if (variant === "goals" && ty !== "goals") return false;
      const [a, b] = band[ty]; return c.price >= a && c.price <= b;
    });
    const legs = [], fxIn = new Set(); let tot = 1;
    const avail = () => p.filter((c) => !fxIn.has(c.f));
    const add = (c) => { legs.push(c); fxIn.add(c.f); tot *= c.price; };
    const mid = Math.sqrt(lo * hi);
    while (legs.length < maxLegs && tot < lo) {
      const left = avail(); if (!left.length) break;
      const fin = left.filter((c) => tot * c.price >= lo && tot * c.price <= hi);
      if (fin.length && legs.length >= 1) { add(fin.sort((a, b) => b.q - a.q || Math.abs(tot * a.price - mid) - Math.abs(tot * b.price - mid))[0]); break; }
      const nxt = left.find((c) => tot * c.price <= hi); if (!nxt) break;
      add(nxt);
    }
    if (tot < lo || tot > hi || legs.length < 2) return null;
    return { legs, odds: Math.round(tot * 100) / 100, prob: legs.reduce((a, l) => a * l.prob, 1), value: legs.reduce((a, l) => a + l.q, 0) / legs.length };
  }
  const inWin = (t, win) => win === "early" ? !t.late : win === "late" ? t.late : true;
  const out = [];
  // μία θέση: ζώνη + είδος + ώρα. Πρώτα Ισορροπημένο, αν δεν βγαίνει Φαβορί.
  const make = (zone, lo, hi, variant, win) => {
    const slot = `${zone}|${variant}|${win}`; if (have.has(slot)) return;
    const free = tips.filter((t) => !usedFx.has(t.f));
    for (const style of ["bal", "fav"]) {
      const c = win === "day" ? (build(lo, hi, variant, style, free.filter((t) => t.late)) || build(lo, hi, variant, style, free))
        : build(lo, hi, variant, style, free.filter((t) => inWin(t, win)));
      if (!c) continue;
      c.legs.forEach((l) => usedFx.add(l.f)); have.add(slot);
      out.push({ kind: zone, variant, style, slot, ...c }); return;
    }
  };
  const wins = weekend ? ["early", "late"] : ["day"];
  for (const w of wins) for (const [z, lo, hi] of ZONES) make(z, lo, hi, "mix", w);
  for (const w of wins) for (const [z, lo, hi] of ZONES) for (const v of ["wins", "goals"]) make(z, lo, hi, v, w);
  // ~x100: ένα τη μέρα (κυρίως βραδινοί)· Σάβ–Κυρ ένα έως τις 17:00 και ένα μετά.
  // Ό,τι περισσεύει + έως τις ΜΙΣΕΣ επιλογές από τα πιο δυνατά tips που μπήκαν ήδη σε άλλα παρολί.
  for (const w of wins) {
    const [z, lo, hi] = CRAZY, slot = `${z}|mix|${w}`; if (have.has(slot)) continue;
    const ok = (t) => w === "day" || inWin(t, w);
    const rest = tips.filter((t) => !usedFx.has(t.f) && ok(t)), reused = tips.filter((t) => usedFx.has(t.f) && ok(t));
    const sortP = (a) => a.sort((x, y) => (w === "day" ? y.late - x.late : 0) || (y.q - x.q));
    let c = null;
    for (let k = Math.min(7, reused.length); k >= 0 && !c; k--) {
      const r = new Set(reused.slice(0, k).map((t) => t.f));
      const x = build(lo, hi, "mix", "bal", sortP([...reused.slice(0, k), ...rest]), 14);
      if (x && x.legs.filter((l) => r.has(l.f)).length * 2 <= x.legs.length) c = x;
    }
    if (c) { c.legs.forEach((l) => usedFx.add(l.f)); have.add(slot); out.push({ kind: z, variant: "mix", style: "bal", slot, ...c }); }
  }
  if (dry) return { date, dry: true, weekend, tips: tips.length, had: [...have].length - out.length, made: out.map((c) => ({ slot: c.slot, style: c.style, odds: c.odds, prob: Math.round(c.prob * 1000) / 10, value: Math.round(c.value * 100) / 100, legs: c.legs.map((l) => l.sel + "@" + l.price + "(" + l.src + ")") })) };
  const t = now(), st = [];
  for (let i = 0; i < out.length; i++) {
    const c = out[i];
    const legs = JSON.stringify(c.legs.map((l) => [l.f, l.sel, l.price, Math.round(l.prob * 1000) / 1000, l.src]));
    const hash = await sha256([date, base + i + 1, c.kind, legs, t, MODEL_VERSION].join("|"));
    st.push(env.DB.prepare("INSERT OR IGNORE INTO coupons(date,n,kind,variant,legs,odds,prob,created_at,model_version,hash,style,pick,slot) VALUES(?,?,?,?,?,?,?,?,?,?,?,0,?)")
      .bind(date, base + i + 1, c.kind, c.variant, legs, c.odds, c.prob, t, MODEL_VERSION, hash, c.style, c.slot));
  }
  if (st.length) await env.DB.batch(st);
  return { date, made: out.map((c) => `${c.slot} ${c.style} ${c.legs.length} legs x${c.odds}`) };
}

async function sha256(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

// Για τη σελίδα: κουπόνια μιας μέρας με στοιχεία αγώνων. Επιλογές από VIP tips κρυφές ως τη σέντρα.
export async function apiCoupons(env, date) {
  let rows = (await env.DB.prepare("SELECT * FROM coupons WHERE date=? ORDER BY n").bind(date).all().catch(() => ({ results: [] }))).results;
  if (rows.some((r) => r.style)) rows = rows.filter((r) => r.style); // τα παλιά (πριν 02/11) κρύβονται όταν υπάρχουν νέα
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
      const hide = false; // απόφαση Owner 02/11: τα VIP μέσα στα δικά μας παρολί είναι ανοιχτά
      const s90 = m.status === "FT" ? [m.gh, m.ga] : (m.status === "AET" || m.status === "PEN") && m.fth != null ? [m.fth, m.fta] : m.status === "PEN" && m.gh != null ? [m.gh, m.ga] : null;
      // αναβολή/ακύρωση/διακοπή = void (2): μετρά 1.00 και το παρολί κλείνει χωρίς αυτόν (απόφαση Owner 02/11)
      const VOIDST = ["PST", "CANC", "ABD", "AWD", "WO"].includes(m.status) && m.ts < Date.now() / 1000 - 3600;
      const res = VOIDST ? 2 : s90 ? (won(sel, s90[0], s90[1]) ? 1 : 0) : null;
      return { fixture_id: f, home: m.home, away: m.away, league: m.league, ts: m.ts, status: m.status, gh: m.gh, ga: m.ga,
        sel: hide ? null : sel, price: hide ? null : price, prob: hide ? null : prob, vip: src === "vip", locked: hide, result: res };
    });
    const result = legs.some((l) => l.result === 0) ? 0 : legs.every((l) => l.result === 1 || l.result === 2) && legs.some((l) => l.result === 1) ? 1 : null;
    const oddsNow = Math.round(legs.reduce((a, l) => a * (l.result === 2 ? 1 : l.price || 1), 1) * 100) / 100; // απόδοση χωρίς τα void
    return { n: r.n, kind: r.kind, variant: r.variant, style: r.style || null, slot: r.slot || null, pick: false, odds: r.odds, odds_now: legs.some((l) => l.result === 2) ? oddsNow : null, prob: r.prob, created_at: r.created_at, hash: r.hash, result, legs };
  });
}
