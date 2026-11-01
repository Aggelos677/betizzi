// Κανόνες tips betizzi (01/11/2026). Όλα τα όρια εδώ, σε ένα σημείο.
export const RULES = {
  freeShare: 0.25,          // free ≈ 1 στους 4 αγώνες με αποδόσεις
  vipShare: 1 / 8,          // VIP ≈ 1 στους 8
  free: { min: 1.40, max: 4.00 },
  vip: { max: 3.50, floor: 1.50 },
  vipTarget: {              // ελάχιστη απόδοση VIP ανά ισχύ σήματος (7..10 στα 10)
    O25: { 7: 2.00, 8: 1.80, 9: 1.60, 10: 1.50 },
    U25: { 7: 2.10, 8: 1.90, 9: 1.70, 10: 1.55 },
    GG:  { 7: 1.90, 8: 1.70, 9: 1.50, 10: 1.50 },
    NG:  { 7: 2.20, 8: 2.00, 9: 1.80, 10: 1.65 },
  },
  vipTarget12: (side, diff) => diff >= 10 ? (side === "1" ? 1.55 : 1.80) : diff >= 8 ? (side === "1" ? 1.75 : 2.00) : (side === "1" ? 2.00 : 2.25),
  groupShare: { RES: 0.4, GOALS: 0.4, BTTS: 0.2 },
  maxPerMatch: 2,
};
const GROUP = { "1": "RES", "X": "RES", "2": "RES", O25: "GOALS", U25: "GOALS", GG: "BTTS", NG: "BTTS" };
const MARKET = { "1": "1X2", "X": "1X2", "2": "1X2", O25: "OU", U25: "OU", GG: "BTTS", NG: "BTTS" };
const LEVEL = { A: 0, B: 1, C: 2 };

export async function makeTips(env, now) {
  const DAY = 86400;
  const fx = (await env.DB.prepare("SELECT id, ts, home_id, away_id FROM fixtures WHERE ts BETWEEN ? AND ? AND status IN ('NS','TBD')")
    .bind(now + 15 * 60, now + 2 * DAY).all()).results;
  if (!fx.length) return { fixtures: 0 };
  const ids = fx.map((f) => f.id);
  // αποδόσεις: καλύτερη τιμή ανά αγώνα/επιλογή
  const odds = {};
  for (let i = 0; i < ids.length; i += 90) {
    const part = ids.slice(i, i + 90);
    const r = await env.DB.prepare(`SELECT fixture_id, market, sel, MAX(price) price FROM odds WHERE fixture_id IN (${part.map(() => "?").join(",")}) GROUP BY fixture_id, market, sel`).bind(...part).all();
    for (const o of r.results) (odds[o.fixture_id] ||= {})[o.sel] = o.price;
  }
  async function last5(team) {
    return (await env.DB.prepare("SELECT gf, ga FROM results WHERE team_id=? ORDER BY ts DESC LIMIT 5").bind(team).all()).results;
  }
  const pts = (g) => g.reduce((a, x) => a + (x.gf > x.ga ? 3 : x.gf === x.ga ? 1 : 0), 0);
  const fair = (o, a, b, c) => { const inv = [a, b, c].filter(Boolean).map((x) => 1 / x); const s = inv.reduce((x, y) => x + y, 0); return o && s ? (1 / o) / s : null; };

  const cands = []; let withOdds = 0;
  for (const f of fx) {
    const o = odds[f.id]; if (!o || !o["1"]) continue;
    withOdds++;
    const H = await last5(f.home_id), A = await last5(f.away_id);
    if (H.length < 5 || A.length < 5) continue;
    const G = [...H, ...A];
    const o25 = G.filter((g) => g.gf + g.ga >= 3).length, bts = G.filter((g) => g.gf > 0 && g.ga > 0).length, dr = G.filter((g) => g.gf === g.ga).length;
    const sig = { O25: o25, U25: 10 - o25, GG: bts, NG: 10 - bts };
    const prob = {
      "1": fair(o["1"], o["1"], o["X"], o["2"]), "X": fair(o["X"], o["1"], o["X"], o["2"]), "2": fair(o["2"], o["1"], o["X"], o["2"]),
      O25: fair(o.O25, o.O25, o.U25), U25: fair(o.U25, o.O25, o.U25), GG: fair(o.GG, o.GG, o.NG), NG: fair(o.NG, o.GG, o.NG),
    };
    for (const k of ["O25", "U25", "GG", "NG"]) {
      const s = sig[k], p = o[k]; if (s < 7 || !p) continue;
      const vip = p >= Math.max(RULES.vip.floor, RULES.vipTarget[k][s]) && p <= RULES.vip.max;
      cands.push({ f, k, s, p, vip, level: s >= 9 ? "A" : s === 8 ? "B" : "C", prob: prob[k], why: `${s}/10 games` });
    }
    const hp = pts(H), ap = pts(A);
    for (const [side, me, ot, th] of [["1", hp, ap, 10], ["2", ap, hp, 11]]) {
      const diff = me - ot, p = o[side];
      if (me >= th && diff >= 6 && p) {
        const vip = p >= Math.max(RULES.vip.floor, RULES.vipTarget12(side, diff)) && p <= RULES.vip.max;
        cands.push({ f, k: side, s: 100 + diff, p, vip, level: me >= 13 && diff >= 9 ? "A" : "B", prob: prob[side], why: `form ${hp}-${ap} pts` });
      }
    }
    const px = o["X"];
    if (px && dr >= 7 && px >= 3.20 && px <= 3.50) cands.push({ f, k: "X", s: dr, p: px, vip: true, level: "A", prob: prob["X"], why: `${dr}/10 draws` });
    else if (px && Math.abs(hp - ap) <= 1 && dr >= 4 && px >= 3.25) cands.push({ f, k: "X", s: dr, p: px, vip: false, level: "A", prob: prob["X"], why: `${dr}/10 draws` });
  }

  const used = {}; const take = (c) => {
    const u = (used[c.f.id] ||= new Set());
    if (u.size >= RULES.maxPerMatch || u.has(GROUP[c.k])) return false;
    u.add(GROUP[c.k]); return true;
  };
  // VIP: τα πιο δυνατά πρώτα, μέχρι το όριο
  const vipQuota = Math.round(withOdds * RULES.vipShare);
  const VIP = [];
  for (const c of cands.filter((c) => c.vip).sort((a, b) => b.s - a.s)) { if (VIP.length >= vipQuota) break; if (take(c)) VIP.push(c); }
  // Free: επίπεδα Α→Β→Γ, αναλογία ανά ομάδα αγορών, 1 X τη μέρα
  const freeQuota = Math.round(withOdds * RULES.freeShare);
  const pool = cands.filter((c) => !VIP.includes(c) && c.p >= RULES.free.min && c.p <= RULES.free.max)
    .sort((a, b) => LEVEL[a.level] - LEVEL[b.level] || b.s - a.s);
  const FREE = [], byG = { RES: 0, GOALS: 0, BTTS: 0 }; let xs = 0;
  const tryFree = (c, capG) => {
    if (FREE.length >= freeQuota) return;
    const g = GROUP[c.k];
    if (capG && byG[g] >= Math.round(freeQuota * RULES.groupShare[g])) return;
    if (c.k === "X" && xs >= 1) return;
    if (!take(c)) return;
    FREE.push(c); byG[g]++; if (c.k === "X") xs++;
  };
  for (const c of pool) tryFree(c, true);
  for (const c of pool) if (!FREE.includes(c)) tryFree(c, false);

  // κρατάμε το created_at των tips που ξαναβγαίνουν, σβήνουμε μόνο όσα δεν ισχύουν πια
  const keep = new Set([...VIP, ...FREE].map((c) => c.f.id + "|" + MARKET[c.k] + "|" + c.k));
  const old = (await env.DB.prepare("SELECT fixture_id, market, sel FROM tips WHERE result IS NULL AND fixture_id IN (SELECT id FROM fixtures WHERE ts > ? AND status IN ('NS','TBD'))").bind(now + 15 * 60).all()).results;
  const st = old.filter((t) => !keep.has(t.fixture_id + "|" + t.market + "|" + t.sel))
    .map((t) => env.DB.prepare("DELETE FROM tips WHERE fixture_id=? AND market=? AND sel=?").bind(t.fixture_id, t.market, t.sel));
  for (const [tier, list] of [["vip", VIP], ["free", FREE]])
    for (const c of list)
      st.push(env.DB.prepare(`INSERT INTO tips(fixture_id,market,sel,tier,strength,level,price,prob,reason,created_at) VALUES(?,?,?,?,?,?,?,?,?,?)
        ON CONFLICT(fixture_id,market,sel) DO UPDATE SET tier=excluded.tier,strength=excluded.strength,level=excluded.level,price=excluded.price,prob=excluded.prob,reason=excluded.reason`)
        .bind(c.f.id, MARKET[c.k], c.k, tier, c.s, c.level, c.p, c.prob, c.why, now));
  for (let i = 0; i < st.length; i += 90) await env.DB.batch(st.slice(i, i + 90));
  return { fixtures: fx.length, with_odds: withOdds, candidates: cands.length, vip: VIP.length, free: FREE.length };
}
