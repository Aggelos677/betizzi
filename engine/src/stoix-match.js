// Αντιστοίχιση αγώνων Stoiximan ↔ δικοί μας αγώνες (απόφαση Owner 18/11, επιλογή Α:
// η Stoiximan φαίνεται ως bookmaker, ΔΕΝ μπαίνει στην «καλύτερη τιμή» των tips — πίνακας odds_bk μόνο).
// Κανόνας: ίδια ώρα σέντρας (±15΄) + ονόματα ομάδων (ελληνικά → λατινικά) αρκετά όμοια,
// και καθαρά καλύτερο από τον δεύτερο υποψήφιο. Σε αμφιβολία: καμία αντιστοίχιση.
const DIGRAPH = [["αι", "e"], ["ει", "i"], ["οι", "i"], ["ου", "ou"], ["μπ", "b"], ["ντ", "d"], ["γκ", "g"], ["γγ", "ng"], ["τζ", "tz"], ["τσ", "ts"]];
const LETTER = { α: "a", β: "v", γ: "g", δ: "d", ε: "e", ζ: "z", η: "i", θ: "th", ι: "i", κ: "k", λ: "l", μ: "m", ν: "n", ξ: "x", ο: "o", π: "p", ρ: "r", σ: "s", ς: "s", τ: "t", υ: "i", φ: "f", χ: "h", ψ: "ps", ω: "o" };
const STOP = new Set(["fc", "cf", "sc", "cd", "ud", "ac", "afc", "fk", "nk", "ks", "kf", "club", "clube", "de", "the", "utd", "united", "giounaitent", "giounaintent", "iunaited", "iunaitent", "iunaided", "unaited", "unied", "unaided", "sf", "ksf"]);

const plain = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
export function latin(s) {
  let x = plain(s);
  for (const [g, l] of DIGRAPH) x = x.split(g).join(l);
  return x.replace(/[α-ως]/g, (c) => LETTER[c] || c);
}
// ίδια «φωνητική» μορφή και για τα δύο ονόματα (Alcoyano ≈ Αλκογιάνο, Vipers ≈ Βάιπερς, Chirundu ≈ Τσιντούρου)
const sound = (w) => w.replace(/ph/g, "f").replace(/th/g, "t").replace(/ch|tch|tsh/g, "ts").replace(/[cq]/g, "k").replace(/gi(?=[aeou])/g, "i")
  .replace(/ou/g, "u").replace(/[yj]/g, "i").replace(/w/g, "v").replace(/ai/g, "ai").replace(/h/g, "").replace(/(.)\1+/g, "$1").replace(/nt/g, "d").replace(/mp/g, "b");
const words = (s) => latin(s).replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w)).map(sound).filter((w) => w && !STOP.has(w));
const key = (s) => words(s).join("");

// Ομοιότητα 0..1: δίγραμμα (Dice) πάνω στο ενιαίο όνομα· κρατά το καλύτερο από ολόκληρο όνομα / κύρια λέξη.
function dice(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const bg = (s) => { const m = new Map(); for (let i = 0; i < s.length - 1; i++) { const k = s.slice(i, i + 2); m.set(k, (m.get(k) || 0) + 1); } return m; };
  const A = bg(a), B = bg(b); let n = 0;
  for (const [k, v] of A) n += Math.min(v, B.get(k) || 0);
  return (2 * n) / (a.length - 1 + b.length - 1 || 1);
}
export function teamSim(gr, en) {
  const a = key(gr), b = key(en);
  let s = dice(a, b);
  if (a && b && (a.includes(b) || b.includes(a)) && Math.min(a.length, b.length) >= 4) s = Math.max(s, 0.85);
  const wa = words(gr), wb = words(en);
  for (const x of wa) for (const y of wb) if (x.length >= 5 && y.length >= 5) s = Math.max(s, dice(x, y) * 0.95);
  return s;
}

// Αγώνες που δεν παίζουμε ποτέ (γυναικεία, νέων, Β' ομάδες): δεν τους ταιριάζουμε καν.
const SKIP = /\((Γ|W)\)|\bU1[5-9]\b|\bU2[0-3]\b| Β'| B'|\bII\b/;

export const MIN_SCORE = 0.62, MIN_GAP = 0.12;
// ev: {id, start "YYYY-MM-DD HH:MM" UTC, match "Α - Β"}· fx: [{id, ts, home, away}]
export function bestFixture(ev, fx) {
  if (SKIP.test(ev.match)) return null;
  const parts = String(ev.match).split(" - ");
  if (parts.length !== 2) return null;
  const t = Date.parse(ev.start.replace(" ", "T") + ":00Z") / 1000;
  const scored = [];
  for (const f of fx) {
    if (Math.abs(f.ts - t) > 15 * 60) continue;
    const h = teamSim(parts[0], f.home), a = teamSim(parts[1], f.away);
    scored.push({ f, s: (2 * Math.max(h, a) + Math.min(h, a)) / 3 }); // η πιο σίγουρη ομάδα μετράει διπλά
  }
  scored.sort((a, b) => b.s - a.s);
  if (!scored.length || scored[0].s < MIN_SCORE) return null;
  if (scored[1] && scored[0].s - scored[1].s < MIN_GAP) return null;
  return { fixture_id: scored[0].f.id, score: Math.round(scored[0].s * 100) / 100 };
}

// Αγορές Stoiximan → δικοί μας κωδικοί (ίδιοι με odds_bk του API-Football)
export function toBk(mk) {
  const out = [];
  for (const [type, , line, sels] of mk || []) {
    for (const [name, price] of sels || []) {
      if (!(price > 1)) continue;
      let market = null, sel = null;
      if ((type === "MRES" || type === "MR12") /* 18/11: κάποιοι αγώνες έρχονται ως MR12 */ && ["1", "X", "2"].includes(name)) { market = "1X2"; sel = name; }
      else if (type === "DBLC" && ["1X", "X2", "12"].includes(name)) { market = "DC"; sel = name; }
      else if (type === "BTSC") { market = "BTTS"; sel = /GG/.test(name) ? "GG" : /NG/.test(name) ? "NG" : null; }
      else if (type === "HCTG") {
        const m = /^(Over|Under) (\d\.5)$/.exec(name);
        const code = m && (m[1] === "Over" ? "O" : "U") + m[2].replace(".5", "5");
        if (code && ["O15", "O25", "U25", "O35", "U35"].includes(code)) { market = "OU"; sel = code; }
      }
      if (market && sel) out.push({ market, sel, price });
    }
  }
  return out;
}
