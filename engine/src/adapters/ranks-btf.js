// Θέση βαθμολογίας από το BTFStats (απόφαση Owner 08/11/2026): μόνο ανάγνωση, ένα αρχείο ανά μέρα (ajax/matchesData.php),
// που έχει μέσα σε κάθε αγώνα hrank / arank / nteams. Ταιριάζουμε τους αγώνες με τους δικούς μας από την ώρα σέντρας (±15΄)
// και τα ονόματα των ομάδων. Μόνο αγώνες πρωταθλήματος (l.type = 'League'). Χωρίς κλήσεις στο API-Football.
const STOP = new Set(["fc", "cf", "sc", "ac", "fk", "sk", "cd", "club", "de", "the", "afc", "calcio", "sv", "ca", "us", "as", "ud", "rc", "if", "bk", "ff", "nk", "ks", "cs", "se"]);
const toks = (s) => new Set((String(s || "").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().match(/[a-z0-9]+/g) || []).filter((t) => t.length > 1 && !STOP.has(t)));
const sim = (a, b) => {
  const A = toks(a), B = toks(b); if (!A.size || !B.size) return 0;
  let n = 0; for (const t of A) if (B.has(t)) n++;
  if (n) return n / Math.min(A.size, B.size);
  for (const x of A) for (const y of B) if (x.length >= 3 && y.length >= 3 && (x.startsWith(y) || y.startsWith(x))) return 0.5;
  return 0;
};

async function btfDay(date) {
  const r = await fetch(`https://www.btfstats.com/ajax/matchesData.php?date=${date}&timezone=Europe%2FAthens`, {
    headers: { "X-Requested-With": "XMLHttpRequest", "User-Agent": "betizzi-engine (ranks)" }, signal: AbortSignal.timeout(25000),
  });
  if (!r.ok) throw new Error("btfstats " + r.status);
  const j = await r.json();
  return (j.fixtures || []).filter((x) => x.hrank || x.arank).map((x) => ({ ts: x.ts, home: x.home, away: x.away, h: x.hrank || null, a: x.arank || null, n: x.nteams || null }));
}

// σήμερα, αύριο, μεθαύριο (ώρα Ελλάδας): ό,τι δείχνουν η σελίδα και το Izzistats
export async function syncRanks(env) {
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS rank(fixture_id INTEGER PRIMARY KEY, h INTEGER, a INTEGER, n INTEGER, at INTEGER)").run();
  const now = Math.floor(Date.now() / 1000);
  const ath = (t) => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Athens" }).format(t * 1000);
  const dates = [0, 1, 2].map((d) => ath(now + d * 86400));
  const ours = (await env.DB.prepare(`SELECT f.id, f.ts, h.name home, a.name away FROM fixtures f JOIN leagues l ON l.id=f.league_id
      JOIN teams h ON h.id=f.home_id JOIN teams a ON a.id=f.away_id WHERE l.type='League' AND f.ts BETWEEN ? AND ?`).bind(now - 6 * 3600, now + 3 * 86400 + 6 * 3600).all()).results;
  let btf = [];
  for (const d of dates) { try { btf = btf.concat(await btfDay(d)); } catch (e) { /* μία μέρα που απέτυχε δεν σταματά τις άλλες */ } }
  if (!btf.length) return 0;
  const st = [];
  for (const f of ours) {
    let best = null, bs = 0;
    for (const b of btf) {
      if (Math.abs(b.ts - f.ts) > 900) continue;
      const s = sim(f.home, b.home) + sim(f.away, b.away);
      if (s > bs) { bs = s; best = b; }
    }
    if (best && bs >= 1) st.push(env.DB.prepare("INSERT OR REPLACE INTO rank(fixture_id,h,a,n,at) VALUES(?,?,?,?,?)").bind(f.id, best.h, best.a, best.n, now));
  }
  for (let i = 0; i < st.length; i += 50) await env.DB.batch(st.slice(i, i + 50));
  return st.length;
}
