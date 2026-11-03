// AI ανάλυση για «Τα δυνατά της ημέρας» (απόφαση Owner 03/11/2026): ξεκινάμε με ΕΛΛΗΝΙΚΑ και ΑΓΓΛΙΚΑ.
// 1) Ο «συγγραφέας» γράφει 2–3 προτάσεις ΜΟΝΟ από τα δικά μας δεδομένα.
// 2) Ο «ελεγκτής» (άλλο μοντέλο, άλλες οδηγίες) ελέγχει κάθε αριθμό, ότι δεν προσθέτει τίποτα έξω από τα δεδομένα,
//    ότι το συμπέρασμα δένει με το tip, και ότι δεν έχει απαγορευμένες λέξεις / υποσχέσεις κέρδους.
// 3) Έγκριση → δημοσιεύεται. Απόρριψη → μία ακόμα προσπάθεια· αν ξανακοπεί, μένει η ανάλυση από τα «καλούπια».
// Ενεργό μόνο αν υπάρχει το secret ANTHROPIC_KEY (το βάζει ο Owner στο Cloudflare). Όλα καταγράφονται (strong_text).

const WRITER = "claude-sonnet-5-5", CHECKER = "claude-opus-5-5";
const LANGS = ["el", "en"];
const BANNED = /σίγουρ|κλειδωμέν|εγγυημέν|fixed|sure\s?(win|bet|thing)|guarantee|lock(ed)?\b|1 στις|1 in \d/i;

async function claude(env, model, system, user, max = 400) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": env.ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model, max_tokens: max, system, messages: [{ role: "user", content: user }] }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error("anthropic " + r.status + " " + (j.error && j.error.message || ""));
  return (j.content || []).map((c) => c.text || "").join("").trim();
}

const SELNAME = { "1": "home win (1)", "2": "away win (2)", X: "draw (X)", O25: "Over 2.5 goals", U25: "Under 2.5 goals", GG: "both teams to score (GG)", NG: "not both teams to score (NG)" };

async function facts(env, c) {
  const f = await env.DB.prepare(`SELECT f.id, f.ts, f.round, f.home_rank, f.away_rank, f.home_id, f.away_id, h.name home, a.name away, l.name league, l.country
    FROM fixtures f JOIN teams h ON h.id=f.home_id JOIN teams a ON a.id=f.away_id JOIN leagues l ON l.id=f.league_id WHERE f.id=?`).bind(c.f).first();
  if (!f) return null;
  const last = async (team) => (await env.DB.prepare("SELECT ts, is_home, gf, ga FROM results WHERE team_id=? AND ts < ? ORDER BY ts DESC LIMIT 5").bind(team, f.ts).all()).results
    .map((r) => ({ result: r.gf > r.ga ? "W" : r.gf < r.ga ? "L" : "D", score_for_against: `${r.gf}-${r.ga}`, venue: r.is_home ? "home" : "away" }));
  return {
    match: `${f.home} vs ${f.away}`, competition: `${f.country} · ${f.league}`, round: f.round || null,
    standings: f.home_rank && f.away_rank ? { [f.home]: f.home_rank, [f.away]: f.away_rank } : null,
    last5_most_recent_first: { [f.home]: await last(f.home_id), [f.away]: await last(f.away_id) },
    our_tip: { pick: SELNAME[c.sel] || c.sel, odds: c.price, our_probability_percent: Math.round(c.prob * 100) },
  };
}

const W_SYS = (lang) => `You write a short analysis for a football tips website (betizzi), in ${lang === "el" ? "Greek (natural, everyday Greek; team names stay in Latin letters as given)" : "English"}.
Rules:
- 2 to 3 sentences, max 70 words. Plain text, no headings, no emojis, no lists.
- Use ONLY the facts in the JSON. Talk ONLY about what our tip is based on: the last games, form and goals of both teams (and the table if given).
- Never mention injuries/absences, players, news, market money/odds movement, history, motivation, coaches or weather: they were not part of our decision (Owner 03/11).
- Mention the form of both teams with numbers from the data, and end with a natural conclusion that leads to OUR TIP (pick and odds), e.g. "We expect a lively game with chances at both ends, and we believe both teams will score: GG at 1.53." Do NOT state our probability or any percentage in the conclusion (Owner 03/11: natural, not provocative).
- Never promise a win. Never use the words sure, locked, guaranteed, fixed (or σίγουρο, κλειδωμένο, εγγυημένο). No "1 in X".
- Betting terms (Over/Under, GG/NG, 1X2, VIP, Tip) stay as they are.
Return only the text.`;

const C_SYS = `You are a strict fact-checker for a football tips website. You get DATA (JSON) and a TEXT written from it.
Approve only if ALL are true:
1) Every number, score, count, position, odds and percentage in TEXT matches DATA exactly (recount wins/draws/losses yourself).
2) TEXT states nothing that is not in DATA, and does NOT mention injuries/absences, players, market money or odds movement (not part of the decision).
3) TEXT's conclusion supports the exact tip in DATA (same pick, same odds) and states no percentage/probability.
4) No promises of winning, no words like sure/locked/guaranteed/fixed (or Greek σίγουρο/κλειδωμένο/εγγυημένο), no "1 in X".
5) Language is correct and natural for the requested language; team names as in DATA.
Reply with JSON only: {"ok": true} or {"ok": false, "problems": ["..."]}`;

export async function aiStrong(env, date) {
  if (!env.ANTHROPIC_KEY) return { ok: false, reason: "no ANTHROPIC_KEY" };
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS strong_text(date TEXT, fixture_id INTEGER, sel TEXT, lang TEXT, text TEXT, status TEXT,
    note TEXT, tries INTEGER, created_at INTEGER, PRIMARY KEY(date, fixture_id, sel, lang))`).run();
  const r = await env.DB.prepare("SELECT data FROM strong WHERE date=?").bind(date).first();
  if (!r) return { ok: false, reason: "no strong yet" };
  const d = JSON.parse(r.data), cards = [d.win, d.goals].filter(Boolean);
  const out = [];
  for (const c of cards) {
    const data = await facts(env, c); if (!data) continue;
    for (const lang of LANGS) {
      if (await env.DB.prepare("SELECT 1 FROM strong_text WHERE date=? AND fixture_id=? AND sel=? AND lang=?").bind(date, c.f, c.sel, lang).first()) continue;
      let text = "", status = "rejected", note = "", tries = 0;
      for (tries = 1; tries <= 2; tries++) {
        try {
          text = await claude(env, WRITER, W_SYS(lang), "DATA:\n" + JSON.stringify(data, null, 1) + (note ? "\n\nA previous draft was rejected for: " + note + "\nFix these problems." : ""));
          if (BANNED.test(text)) { note = "banned word"; continue; }
          const v = await claude(env, CHECKER, C_SYS, "LANGUAGE: " + (lang === "el" ? "Greek" : "English") + "\nDATA:\n" + JSON.stringify(data, null, 1) + "\n\nTEXT:\n" + text, 300);
          const m = v.match(/\{[\s\S]*\}/); const j = m ? JSON.parse(m[0]) : { ok: false, problems: ["checker gave no JSON"] };
          if (j.ok === true) { status = "ok"; note = ""; break; }
          note = (j.problems || []).join("; ").slice(0, 500);
        } catch (e) { note = String(e.message || e).slice(0, 300); }
      }
      await env.DB.prepare("INSERT OR REPLACE INTO strong_text(date, fixture_id, sel, lang, text, status, note, tries, created_at) VALUES(?,?,?,?,?,?,?,?,?)")
        .bind(date, c.f, c.sel, lang, text, status, note, Math.min(tries, 2), Math.floor(Date.now() / 1000)).run();
      out.push({ f: c.f, sel: c.sel, lang, status, note });
    }
  }
  return { ok: true, out };
}

// Εγκεκριμένα κείμενα για τη σελίδα: { "fixture:sel": { el: "...", en: "..." } }
export async function aiTexts(env, date) {
  try {
    const rows = (await env.DB.prepare("SELECT fixture_id, sel, lang, text FROM strong_text WHERE date=? AND status='ok'").bind(date).all()).results;
    const o = {}; for (const r of rows) (o[r.fixture_id + ":" + r.sel] ||= {})[r.lang] = r.text; return o;
  } catch (e) { return {}; }
}
