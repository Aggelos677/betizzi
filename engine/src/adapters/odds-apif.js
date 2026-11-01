// Adapter «odds» για το API-Football (προσωρινό, μέχρι να μπει btfodds/OddAlerts).
// Κρατάει την καλύτερη τιμή από Pinnacle, Bet365, 1xBet για τις αγορές των tips.
const BASE = "https://v3.football.api-sports.io/";
// Ήπιος ρυθμός: ~5 κλήσεις/δευτ., και μία επανάληψη αν απαντήσει 429 (όριο ανά λεπτό).
let last = 0;
async function apifFetch(url, key) {
  for (let i = 0; i < 6; i++) {
    const wait = Math.max(0, last + 700 - Date.now()); if (wait) await new Promise((r) => setTimeout(r, wait));
    last = Date.now();
    const r = await fetch(url, { headers: { "x-apisports-key": key } });
    const body = r.status === 429 ? null : await r.text();
    if (body !== null && !body.slice(0, 300).includes('"rateLimit"')) return new Response(body, { status: r.status });
    await new Promise((res) => setTimeout(res, 15000));
  }
  throw new Error("apif 429 " + url);
}
// 3–5 καλοί bookmakers (απόφαση Owner 01/11/2026). Κρατάμε την τιμή ΚΑΘΕ bookmaker,
// ώστε να δείχνουμε πού είναι το καλύτερο παρολί, ή μόνο τον bookmaker του χρήστη.
export const BOOKS = ["Bet365", "Betano", "Pinnacle", "1xBet", "William Hill"];
const BOOKSET = new Set(BOOKS);
const MAP = {
  "Match Winner": { market: "1X2", sel: { Home: "1", Draw: "X", Away: "2" } },
  "Goals Over/Under": { market: "OU", sel: { "Over 2.5": "O25", "Under 2.5": "U25", "Over 1.5": "O15", "Under 3.5": "U35", "Over 3.5": "O35" } },
  "Both Teams Score": { market: "BTTS", sel: { Yes: "GG", No: "NG" } },
  "Double Chance": { market: "DC", sel: { "Home/Draw": "1X", "Draw/Away": "X2", "Home/Away": "12" } },
};

export function apifOdds(env) {
  return {
    name: "apif",
    // Μία σελίδα τη φορά, για να μοιράζεται η δουλειά σε πολλά σύντομα τρεξίματα.
    async oddsPage(date, page, leagueIds) {
      const rows = [], perBook = [];
      {
        const r = await apifFetch(`${BASE}odds?date=${date}&page=${page}`, env.APIF_KEY);
        const j = await r.json();
        var total = j.paging ? j.paging.total : 1;
        for (const o of j.response || []) {
          if (!leagueIds.has(o.league.id)) continue;
          const best = {};
          for (const b of o.bookmakers) {
            if (!BOOKSET.has(b.name)) continue;
            for (const bet of b.bets) {
              const m = MAP[bet.name]; if (!m) continue;
              for (const v of bet.values) {
                const sel = m.sel[v.value]; if (!sel) continue;
                const p = parseFloat(v.odd); const k = m.market + "|" + sel;
                perBook.push({ fixture_id: o.fixture.id, bk: b.name, market: m.market, sel, price: p });
                if (!best[k] || p > best[k].price) best[k] = { fixture_id: o.fixture.id, market: m.market, sel, price: p, bookmaker: b.name, updated: Math.floor(Date.parse(o.update) / 1000) };
              }
            }
          }
          rows.push(...Object.values(best));
        }
      }
      return { rows, perBook, total };
    },
  };
}
