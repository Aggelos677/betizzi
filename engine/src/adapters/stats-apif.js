// Adapter «stats» για το API-Football. Επιστρέφει το κοινό σχήμα του betizzi.
// Αν αλλάξει πηγή stats, γράφουμε νέο αρχείο με τις ίδιες συναρτήσεις.
const BASE = "https://v3.football.api-sports.io/";
// Ήπιος ρυθμός: ~5 κλήσεις/δευτ., και μία επανάληψη αν απαντήσει 429 (όριο ανά λεπτό).
let last = 0;
async function apifFetch(url, key) {
  for (let i = 0; i < 6; i++) {
    const wait = Math.max(0, last + 700 - Date.now()); if (wait) await new Promise((r) => setTimeout(r, wait));
    last = Date.now();
    const r = await fetch(url, { headers: { "x-apisports-key": key } });
    // Το API-Football απαντάει το όριο ανά λεπτό είτε με 429 είτε με 200 + errors.rateLimit.
    const body = r.status === 429 ? null : await r.text();
    if (body !== null && !body.slice(0, 300).includes('"rateLimit"')) return new Response(body, { status: r.status });
    await new Promise((res) => setTimeout(res, 15000));
  }
  throw new Error("apif 429 " + url);
}

export function apifStats(env) {
  async function get(path) {
    const r = await apifFetch(BASE + path, env.APIF_KEY);
    if (!r.ok) throw new Error("apif " + r.status + " " + path);
    const j = await r.json();
    if (j.errors && Object.keys(j.errors).length) throw new Error("apif " + JSON.stringify(j.errors));
    return j.response;
  }
  const fx = (f) => ({
    id: f.fixture.id, ts: f.fixture.timestamp, status: f.fixture.status.short, elapsed: f.fixture.status.elapsed,
    league_id: f.league.id, season: f.league.season, round: f.league.round, country: f.league.country,
    home: { id: f.teams.home.id, name: f.teams.home.name, logo: f.teams.home.logo },
    away: { id: f.teams.away.id, name: f.teams.away.name, logo: f.teams.away.logo },
    gh: f.goals.home, ga: f.goals.away, hth: f.score.halftime.home, hta: f.score.halftime.away,
    fth: f.score.fulltime?.home ?? null, fta: f.score.fulltime?.away ?? null, // σκορ 90λέπτου (χωρίς παράταση)
  });
  return {
    name: "apif",
    async fixturesByDate(date) { return (await get(`fixtures?date=${date}`)).map(fx); },
    async live() { return (await get("fixtures?live=all")).map(fx); },
    async byIds(ids) { return ids.length ? (await get("fixtures?ids=" + ids.slice(0, 20).join("-"))).map(fx) : []; },
    async lastResults(teamId, n) {
      const list = await get(`fixtures?team=${teamId}&last=${n}&status=FT-AET-PEN`);
      return list.map((f) => {
        const home = f.teams.home.id === teamId;
        return { id: f.fixture.id, ts: f.fixture.timestamp, is_home: home ? 1 : 0,
          gf: home ? f.goals.home : f.goals.away, ga: home ? f.goals.away : f.goals.home,
          ht_gf: home ? f.score.halftime.home : f.score.halftime.away, ht_ga: home ? f.score.halftime.away : f.score.halftime.home };
      });
    },
  };
}
