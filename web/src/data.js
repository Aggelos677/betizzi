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
  return {
    date,
    coupons: d.coupons || [],
    matches: d.fixtures.map((f) => ({
      id: f.id, ts: f.ts, status: f.status, minute: f.elapsed, score: f.gh == null ? null : [f.gh, f.ga], round: f.round || "",
      league: { id: f.league_id, name: f.league, country: f.country },
      home: { name: f.home, logo: f.home_logo, rank: f.home_rank, form: f.home_form || [], gg: f.home_gg },
      away: { name: f.away, logo: f.away_logo, rank: f.away_rank, form: f.away_form || [], gg: f.away_gg },
      odds: f.odds || {}, books: f.bk || {}, model: f.model || null,
      tips: (tipsBy[f.id] || []).map((t) => ({
        tier: t.tier, locked: !!t.locked, market: t.market, sel: t.sel, price: t.price, prob: t.prob, reason: t.reason, result: t.result, min: t.min_price ?? null, at: t.created_at ?? null,
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
  const form = (list) => list.map((g) => ({ ts: g.ts, home: !!g.is_home, gf: g.gf, ga: g.ga, res: g.gf > g.ga ? "W" : g.gf < g.ga ? "L" : "D" }));
  return {
    id: f.id, ts: f.ts, status: f.status, minute: f.elapsed, score: f.gh == null ? null : [f.gh, f.ga], round: f.round || "",
    league: { id: f.league_id, name: f.league, country: f.country },
    home: { name: f.home, logo: f.home_logo, rank: f.home_rank, form: form(d.form.home) },
    away: { name: f.away, logo: f.away_logo, rank: f.away_rank, form: form(d.form.away) },
    tips: d.tips.filter((t) => t.status !== "withdrawn").map((t) => ({ tier: t.tier, locked: !!t.locked, market: t.market, sel: t.sel, price: t.price, prob: t.prob, reason: t.reason, result: t.result })),
    odds: d.odds, model: d.model,
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
  return { since: d.since, pending: d.pending, updated: d.updated, settled: d.settled.map(row), withdrawn: d.withdrawn.map(row) };
}

// Έτοιμα παρολί μιας μέρας (UTC) με αποτέλεσμα, για τη λωρίδα «Χθες» και το «τελευταίο που κέρδισε».
export async function getCoupons(env, date) {
  const r = env.ENGINE
    ? await env.ENGINE.fetch(`https://engine/api/coupons?date=${date}`)
    : await fetch(`https://betizzi-engine.bettipsters79.workers.dev/api/coupons?date=${date}`);
  if (!r.ok) return [];
  return (await r.json()) || [];
}
