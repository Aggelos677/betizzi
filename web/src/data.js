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
    matches: d.fixtures.map((f) => ({
      id: f.id, ts: f.ts, status: f.status, minute: f.elapsed, score: f.gh == null ? null : [f.gh, f.ga],
      league: { id: f.league_id, name: f.league, country: f.country },
      home: { name: f.home, logo: f.home_logo, rank: f.home_rank },
      away: { name: f.away, logo: f.away_logo, rank: f.away_rank },
      tips: (tipsBy[f.id] || []).map((t) => ({
        tier: t.tier, locked: !!t.locked, market: t.market, sel: t.sel, price: t.price, prob: t.prob, reason: t.reason, result: t.result,
      })),
    })),
  };
}
