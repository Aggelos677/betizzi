// «Σερί ομάδων» (απόφαση Owner 06/11/2026): για τη σελίδα «για ψαγμένους», σαν τους πίνακες του FootyStats.
// Μόνο ομάδες των δικών μας λιγκών που παίζουν τις επόμενες 3 μέρες (ώρα Ελλάδας). Πίνακες στους 10 τελευταίους αγώνες
// (ελάχιστο 10, αλλιώς η ομάδα δεν μπαίνει)· «Φόρμα» στους 5 τελευταίους. Μόνο από τη δική μας βάση (results), χωρίς κλήσεις API.
// Κατηγορίες: σε φόρμα, δυνατοί εντός, νικούν εκτός, πολλά γκολ, σερί GG, Over 2.5, Under 2.5. Κόρνερ: όταν έρθουν δεδομένα από το BTFStats / MODIX90.
import { NOT_FIRST_TEAM } from "./tips.js";

const DAY = 86400;
const now = () => Math.floor(Date.now() / 1000);
// τέλος της μεθαυριανής μέρας Ελλάδας (σήμερα, αύριο, μεθαύριο)
const athEndTomorrow = () => {
  const t = now(), d = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Athens" }).format(t * 1000);
  const [y, m, dd] = d.split("-").map(Number), u = Date.UTC(y, m - 1, dd + 3) / 1000; // απόφαση Owner 06/11: οι επόμενες 3 μέρες (σήμερα + 2)
  const off = (+new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Athens", hour: "2-digit", hourCycle: "h23" }).format(u * 1000) - new Date(u * 1000).getUTCHours() + 24) % 24;
  return u - off * 3600;
};

const pts = (x) => (x.gf > x.ga ? 3 : x.gf === x.ga ? 1 : 0);
const runOf = (g, ok) => { let r = 0; while (r < g.length && ok(g[r])) r++; return r; };
// Κατηγορίες (απόφαση Owner 06/11): κάθε μία δίνει για μια ομάδα {c, n, run, avg} ή null (δεν μπαίνει), τη σειρά και την επιλογή για την απόδοση.
// all = οι 10 τελευταίοι (ελάχιστο 10)· side = οι τελευταίοι εντός/εκτός (έως 10, ελάχιστο 5) για τις κατηγορίες έδρας.
const W = (x) => x.gf > x.ga, O = (x) => x.gf + x.ga >= 3, U = (x) => x.gf + x.ga <= 2, G = (x) => x.gf > 0 && x.ga > 0;
const CATS = {
  form: { sel: (h) => (h ? "1" : "2"), f: (all) => { const c = all.filter(W).length, run = runOf(all, W); return c >= 7 || run >= 5 ? { c, n: all.length, run } : null; } },
  home: { sel: () => "1", only: "home", f: (all, side) => { if (side.length < 5) return null; const g = side.slice(0, 5), c = g.filter(W).length; return c >= 4 ? { c, n: 5, run: runOf(side, W) } : null; } },
  away: { sel: () => "2", only: "away", f: (all, side) => { if (side.length < 5) return null; const g = side.slice(0, 5), c = g.filter(W).length; return c >= 3 ? { c, n: 5, run: runOf(side, W) } : null; } },
  goals: { sel: () => "O25", f: (all) => { const avg = all.reduce((a, x) => a + x.gf + x.ga, 0) / all.length; return avg >= 3 ? { c: Math.round(avg * 100), n: all.length, avg: Math.round(avg * 10) / 10, run: runOf(all, O) } : null; } },
  gg: { sel: () => "GG", f: (all) => { const run = runOf(all, G), c = all.filter(G).length; return run >= 4 || c >= 8 ? { c, n: all.length, run, key: run * 100 + c } : null; } },
  over: { sel: () => "O25", f: (all) => { const c = all.filter(O).length; return c >= 7 ? { c, n: all.length, run: runOf(all, O) } : null; } },
  under: { sel: () => "U25", f: (all) => { const c = all.filter(U).length; return c >= 7 ? { c, n: all.length, run: runOf(all, U) } : null; } },
};

export async function apiStreaks(env, leagueIds, top = 15) {
  const LID = await leagueIds(env);
  const fx = (await env.DB.prepare(`SELECT f.id, f.ts, f.league_id, f.home_id, f.away_id, h.name home, a.name away, l.name league, l.country
      FROM fixtures f JOIN teams h ON h.id=f.home_id JOIN teams a ON a.id=f.away_id JOIN leagues l ON l.id=f.league_id
      WHERE f.ts BETWEEN ? AND ? AND f.status IN ('NS','TBD') ORDER BY f.ts`).bind(now() + 5 * 60, athEndTomorrow()).all()).results
    .filter((f) => LID.has(f.league_id) && !NOT_FIRST_TEAM.test(f.home) && !NOT_FIRST_TEAM.test(f.away));
  // ο πρώτος επόμενος αγώνας κάθε ομάδας
  const next = new Map();
  for (const f of fx) for (const [id, home] of [[f.home_id, true], [f.away_id, false]]) if (!next.has(id)) next.set(id, { f, home });
  const ids = [...next.keys()], res = {};
  for (let i = 0; i < ids.length; i += 90) {
    const part = ids.slice(i, i + 90);
    for (const r of (await env.DB.prepare(`SELECT team_id, ts, is_home, gf, ga FROM results WHERE team_id IN (${part.map(() => "?").join(",")}) ORDER BY ts DESC`).bind(...part).all()).results)
      (res[r.team_id] ||= []).push(r);
  }
  const odds = {}, fids = [...new Set(fx.map((f) => f.id))];
  for (let i = 0; i < fids.length; i += 90) {
    const part = fids.slice(i, i + 90);
    for (const o of (await env.DB.prepare(`SELECT fixture_id, sel, price FROM odds WHERE fixture_id IN (${part.map(() => "?").join(",")})`).bind(...part).all()).results)
      (odds[o.fixture_id] ||= {})[o.sel] = o.price;
  }
  const out = { updated: now(), teams: next.size, cats: {} };
  for (const [key, C] of Object.entries(CATS)) {
    const rows = [];
    for (const [id, { f, home }] of next) {
      if (C.only === "home" && !home) continue;
      if (C.only === "away" && home) continue;
      const past = (res[id] || []).filter((r) => r.ts < f.ts);
      const all = past.slice(0, 10);
      if (all.length < 10) continue; // ελάχιστο 10 αγώνες (απόφαση Owner 06/11)
      const side = past.filter((r) => (home ? r.is_home : !r.is_home)).slice(0, 10);
      const v = C.f(all, side); if (!v) continue;
      const sel = C.sel(home);
      rows.push({ team: home ? f.home : f.away, home, league: f.league, country: f.country, ...v,
        form: all.slice(0, 5).map((x) => (x.gf > x.ga ? "W" : x.gf < x.ga ? "L" : "D")).join(""),
        fixture: { id: f.id, ts: f.ts, home: f.home, away: f.away }, sel, price: (odds[f.id] || {})[sel] || null });
    }
    rows.sort((a, b) => (b.key ?? b.c) - (a.key ?? a.c) || b.run - a.run || a.fixture.ts - b.fixture.ts);
    out.cats[key] = rows.slice(0, top);
  }
  return out;
}
