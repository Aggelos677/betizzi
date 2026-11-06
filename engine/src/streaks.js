// «Σερί ομάδων» (απόφαση Owner 06/11/2026): για τη σελίδα «για ψαγμένους», σαν τους πίνακες του FootyStats.
// Μόνο ομάδες των δικών μας λιγκών που παίζουν σήμερα ή αύριο (ώρα Ελλάδας). Πίνακες στους 10 τελευταίους αγώνες
// (ελάχιστο 10, αλλιώς η ομάδα δεν μπαίνει)· «Φόρμα» στους 5 τελευταίους. Μόνο από τη δική μας βάση (results), χωρίς κλήσεις API.
// Κόρνερ: όταν έρθουν δεδομένα από το BTFStats / MODIX90.
import { NOT_FIRST_TEAM } from "./tips.js";

const DAY = 86400;
const now = () => Math.floor(Date.now() / 1000);
// τέλος της αυριανής μέρας Ελλάδας
const athEndTomorrow = () => {
  const t = now(), d = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Athens" }).format(t * 1000);
  const [y, m, dd] = d.split("-").map(Number), u = Date.UTC(y, m - 1, dd + 2) / 1000;
  const off = (+new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Athens", hour: "2-digit", hourCycle: "h23" }).format(u * 1000) - new Date(u * 1000).getUTCHours() + 24) % 24;
  return u - off * 3600;
};

// κατηγορία: [κλειδί, πόσοι αγώνες, ελάχιστο για να μπει, μέτρηση ανά αγώνα, επιλογή για την απόδοση]
const CATS = [
  ["wins", 10, 7, (g) => g.gf > g.ga, (home) => (home ? "1" : "2")],
  ["over", 10, 7, (g) => g.gf + g.ga >= 3, () => "O25"],
  ["under", 10, 7, (g) => g.gf + g.ga <= 2, () => "U25"],
  ["gg", 10, 7, (g) => g.gf > 0 && g.ga > 0, () => "GG"],
  ["form", 5, 12, null, (home) => (home ? "1" : "2")], // βαθμοί στους 5 (από 15)
];

export async function apiStreaks(env, leagueIds, top = 20) {
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
    for (const r of (await env.DB.prepare(`SELECT team_id, ts, gf, ga FROM results WHERE team_id IN (${part.map(() => "?").join(",")}) ORDER BY ts DESC`).bind(...part).all()).results)
      (res[r.team_id] ||= []).push(r);
  }
  const odds = {}, fids = [...new Set(fx.map((f) => f.id))];
  for (let i = 0; i < fids.length; i += 90) {
    const part = fids.slice(i, i + 90);
    for (const o of (await env.DB.prepare(`SELECT fixture_id, sel, price FROM odds WHERE fixture_id IN (${part.map(() => "?").join(",")})`).bind(...part).all()).results)
      (odds[o.fixture_id] ||= {})[o.sel] = o.price;
  }
  const out = { updated: now(), teams: next.size, cats: {} };
  for (const [key, n, min, hit, selOf] of CATS) {
    const rows = [];
    for (const [id, { f, home }] of next) {
      const g = (res[id] || []).filter((r) => r.ts < f.ts).slice(0, n);
      if (g.length < n) continue; // ελάχιστο: 10 αγώνες (φόρμα: 5)
      let c, run = 0;
      if (key === "form") { c = g.reduce((a, x) => a + (x.gf > x.ga ? 3 : x.gf === x.ga ? 1 : 0), 0); while (run < g.length && g[run].gf >= g[run].ga) run++; }
      else { c = g.filter(hit).length; while (run < g.length && hit(g[run])) run++; }
      if (c < min) continue;
      const sel = selOf(home);
      rows.push({ team: home ? f.home : f.away, league: f.league, country: f.country, c, n, run,
        form: g.slice(0, 5).map((x) => (x.gf > x.ga ? "W" : x.gf < x.ga ? "L" : "D")).join(""),
        fixture: { id: f.id, ts: f.ts, home: f.home, away: f.away }, sel, price: (odds[f.id] || {})[sel] || null });
    }
    rows.sort((a, b) => b.c - a.c || b.run - a.run || a.fixture.ts - b.fixture.ts);
    out.cats[key] = rows.slice(0, top);
  }
  return out;
}
