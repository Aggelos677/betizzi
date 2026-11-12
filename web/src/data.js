// Adapter δεδομένων της σελίδας. Η σελίδα διαβάζει ΜΟΝΟ το σχήμα που επιστρέφει αυτό το αρχείο.
// Σήμερα: betizzi-engine (service binding ENGINE). Αύριο: modix-bt-v2 — αλλάζει μόνο αυτό το αρχείο.
export async function getDay(env, date) {
  const r = env.ENGINE
    ? await env.ENGINE.fetch(`https://engine/api/day?date=${date}`)
    : await fetch(`https://betizzi-engine.bettipsters79.workers.dev/api/day?date=${date}`);
  if (!r.ok) throw new Error("engine " + r.status);
  const d = await r.json();
  const tipsBy = {};
  for (const t of d.tips) if (t.status !== "withdrawn") (tipsBy[t.fixture_id] ||= []).push(t);
  const STAR = starGrades(d.tips.filter((t) => t.status !== "withdrawn"));
  return {
    date,
    coupons: d.coupons || [],
    strong: d.strong || null,
    matches: d.fixtures.map((f) => ({
      id: f.id, ts: f.ts, status: f.status, minute: f.elapsed, score: f.gh == null ? null : [f.gh, f.ga], round: f.round || "",
      league: { id: f.league_id, name: f.league, country: f.country },
      home: { name: f.home, logo: f.home_logo, rank: f.home_rank, form: f.home_form || [], gg: f.home_gg },
      away: { name: f.away, logo: f.away_logo, rank: f.away_rank, form: f.away_form || [], gg: f.away_gg },
      odds: f.odds || {}, books: f.bk || {}, model: f.model || null,
      tips: (tipsBy[f.id] || []).map((t) => ({
        tier: t.tier, locked: !!t.locked, market: t.market, sel: t.sel, price: t.price, prob: t.prob, reason: t.reason, result: t.result, min: t.min_price ?? null, at: t.created_at ?? null,
        star: STAR.get(t) || 0,
      })),
    })),
  };
}

export async function getMatch(env, id) {
  const r = env.ENGINE
    ? await env.ENGINE.fetch(`https://engine/api/match?id=${id}`)
    : await fetch(`https://betizzi-engine.bettipsters79.workers.dev/api/match?id=${id}`);
  const d = await r.json();
  if (d.error) return null;
  const f = d.fixture;
  const form = (list) => list.map((g) => ({ ts: g.ts, home: !!g.is_home, opp: g.opp || "", gf: g.gf, ga: g.ga, res: g.gf > g.ga ? "W" : g.gf < g.ga ? "L" : "D" }));
  return {
    id: f.id, ts: f.ts, status: f.status, minute: f.elapsed, score: f.gh == null ? null : [f.gh, f.ga], round: f.round || "",
    league: { id: f.league_id, name: f.league, country: f.country },
    home: { name: f.home, logo: f.home_logo, rank: f.home_rank, form: form(d.form.home) },
    away: { name: f.away, logo: f.away_logo, rank: f.away_rank, form: form(d.form.away) },
    tips: d.tips.filter((t) => t.status !== "withdrawn").map((t) => ({ tier: t.tier, locked: !!t.locked, market: t.market, sel: t.sel, price: t.price, prob: t.prob, reason: t.reason, result: t.result })),
    odds: d.odds, model: d.model, strong: d.strong || [],
  };
}

// Record: tips που κρίθηκαν + αποσυρμένα. Ίδιο σχήμα όποια κι αν είναι η πηγή.
export async function getRecord(env) {
  const r = env.ENGINE
    ? await env.ENGINE.fetch("https://engine/api/record")
    : await fetch("https://betizzi-engine.bettipsters79.workers.dev/api/record");
  if (!r.ok) throw new Error("engine " + r.status);
  const d = await r.json();
  const row = (t) => ({
    id: t.fixture_id, ts: t.ts, tier: t.tier, market: t.market, sel: t.sel, price: t.price, result: t.result,
    league: t.league, country: t.country, home: t.home, away: t.away, score: t.gh == null ? null : [t.gh, t.ga],
    at: t.created_at, wdAt: t.withdrawn_at, model: t.model_version, hash: t.hash,
  });
  return { since: d.since, pending: d.pending, updated: d.updated, settled: d.settled.map(row), withdrawn: d.withdrawn.map(row), parlays: d.parlays || null };
}

// Έτοιμα παρολί μιας μέρας (UTC) με αποτέλεσμα, για τη λωρίδα «Χθες» και το «τελευταίο που κέρδισε».
export async function getCoupons(env, date) {
  const r = env.ENGINE
    ? await env.ENGINE.fetch(`https://engine/api/coupons?date=${date}`)
    : await fetch(`https://betizzi-engine.bettipsters79.workers.dev/api/coupons?date=${date}`);
  if (!r.ok) return [];
  return (await r.json()) || [];
}

// «Σερί ομάδων» (06/11): πίνακες ανά κατηγορία από τη μηχανή
export async function getStreaks(env) {
  const r = env.ENGINE
    ? await env.ENGINE.fetch("https://engine/api/streaks")
    : await fetch("https://betizzi-engine.bettipsters79.workers.dev/api/streaks");
  if (!r.ok) throw new Error("streaks " + r.status);
  return await r.json();
}

// 12/11 (απόφαση Owner 11–12/11, DECISIONS «ΑΣΤΕΡΙΑ»): ③ = όλα τα VIP· τα υπόλοιπα της ημέρας ταξινομούνται με το ΙΔΙΟ
// κριτήριο που διαλέγει το engine τα VIP/Free (tips.js: πόσο κοντά είναι η τιμή στον «πάτο» του VIP, μετά επίπεδο A–D,
// μετά ισχύς σήματος) — όχι με πιθανότητα. Το πάνω μισό → ②, τα υπόλοιπα → ①.
// Ο «πάτος» δεν αποθηκεύεται· βγαίνει από min_price = πάτος × 0.97 (freeBelowVip). Δεν γράφεται τίποτα στη βάση.
const LEVEL = { A: 0, B: 1, C: 2, D: 3 };
function starGrades(tips) {
  const g = new Map(), rest = [];
  for (const t of tips) { if (t.tier === "vip") g.set(t, 3); else rest.push(t); }
  const near = (t) => (t.price && t.min_price ? Math.min(1, (t.price * 0.97) / t.min_price) : 0);
  rest.sort((a, b) => near(b) - near(a) || (LEVEL[a.level] ?? 4) - (LEVEL[b.level] ?? 4) || (b.strength || 0) - (a.strength || 0));
  const top = Math.ceil(rest.length / 2);
  rest.forEach((t, i) => g.set(t, i < top ? 2 : 1));
  return g;
}
