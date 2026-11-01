// betizzi-web: σελίδες έτοιμες από τον server (SSR), μία ανά γλώσσα.
// Μέχρι το άνοιγμα: noindex παντού (X-Robots-Tag) και robots.txt κλειστό.
import { LANGS, HREFLANG, TZ, LOCALE, T, SEL } from "./i18n.js";
import { getDay } from "./data.js";

const SITE = "https://betizzi.com";
// Σειρά λιγκών: πρώτα οι μεγάλες (Top 30), μετά οι υπόλοιπες ανά χώρα.
const TOP = [2, 3, 848, 39, 140, 135, 78, 61, 197, 94, 88, 203, 144, 179, 40, 283, 172, 286, 71, 128, 253, 262, 307, 218, 207, 119, 113, 103, 106, 318];
const rankOf = (id) => { const i = TOP.indexOf(id); return i < 0 ? 999 : i; };
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const LIVE = new Set(["1H", "2H", "HT", "ET", "BT", "P", "LIVE"]);
const DONE = new Set(["FT", "AET", "PEN"]);

function ymdIn(tz, ts = Date.now()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(ts);
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const p = url.pathname;
    if (p === "/") return Response.redirect(url.origin + "/en/", 301);
    const m = p.match(/^\/([a-z]{2})\/$/);
    if (m && LANGS.includes(m[1])) {
      try { return html(await todayPage(env, m[1])); }
      catch (e) { return html(`<!doctype html><meta charset="utf-8"><p>betizzi — ${esc(e.message)}</p>`, 503); }
    }
    if (m === null && /^\/[a-z]{2}$/.test(p) && LANGS.includes(p.slice(1))) return Response.redirect(url.origin + p + "/", 301);
    return env.ASSETS.fetch(req);
  },
};

function html(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=60",
      "x-robots-tag": "noindex, nofollow", // αφαιρείται την ημέρα που ανοίγει το site
    },
  });
}

async function todayPage(env, lang) {
  const t = T[lang], tz = TZ[lang];
  const date = ymdIn(tz);
  const day = await getDay(env, date);
  // ο engine μετράει μέρα σε UTC· κρατάμε τους αγώνες που πέφτουν σήμερα στην ώρα της χώρας
  const matches = day.matches.filter((x) => ymdIn(tz, x.ts * 1000) === date);
  const tipsFree = matches.reduce((a, x) => a + x.tips.filter((y) => y.tier === "free").length, 0);
  const tipsVip = matches.reduce((a, x) => a + x.tips.filter((y) => y.tier === "vip").length, 0);
  const dLong = new Intl.DateTimeFormat(LOCALE[lang], { timeZone: tz, day: "numeric", month: "long", year: "numeric" }).format(Date.now());
  const hm = (ts) => new Intl.DateTimeFormat(LOCALE[lang], { timeZone: tz, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(ts * 1000);

  // ομαδοποίηση ανά λίγκα
  const groups = new Map();
  for (const x of matches) {
    const k = x.league.id;
    if (!groups.has(k)) groups.set(k, { league: x.league, list: [] });
    groups.get(k).list.push(x);
  }
  const order = [...groups.values()].sort((a, b) => {
    const ta = a.list.some((x) => x.tips.length) ? 0 : 1, tb = b.list.some((x) => x.tips.length) ? 0 : 1;
    return rankOf(a.league.id) - rankOf(b.league.id) || ta - tb || a.league.country.localeCompare(b.league.country) || a.league.name.localeCompare(b.league.name);
  });

  const tipHtml = (tp) => tp.locked
    ? `<span class="tip vip" title="${esc(t.vipLock)}">VIP 🔒</span>`
    : `<span class="tip ${tp.tier}">${tp.tier === "vip" ? "VIP " : "TIP "}<b>${esc(SEL[tp.sel] || tp.sel)}</b> <i>${tp.price ? tp.price.toFixed(2) : ""}</i>${tp.result === 1 ? " ✓" : tp.result === 0 ? " ✗" : ""}</span>`;

  // Στη γραμμή: μόνο το πιο δυνατό tip + σήμα «+N». Όλα φαίνονται στη σελίδα του αγώνα.
  const topTip = (tips) => {
    if (!tips.length) return "";
    const s = [...tips].sort((a, b) => (b.prob || 0) - (a.prob || 0));
    return tipHtml(s[0]) + (s.length > 1 ? `<span class="more">+${s.length - 1}</span>` : "");
  };
  const row = (x) => {
    const live = LIVE.has(x.status), done = DONE.has(x.status);
    const mid = x.score && (live || done)
      ? `<span class="sc${live ? " lv" : ""}">${x.score[0]}–${x.score[1]}</span>`
      : `<time datetime="${new Date(x.ts * 1000).toISOString()}">${hm(x.ts)}</time>`;
    const st = live ? `<span class="min">${x.status === "HT" ? "HT" : esc(x.minute) + "'"}</span>` : done ? `<span class="min">${t.ft}</span>` : "";
    const team = (s) => `<span class="tm"><img src="${esc(s.logo)}" alt="" width="18" height="18" loading="lazy" decoding="async">${esc(s.name)}</span>`;
    return `<li class="m${x.tips.length ? " has" : ""}"><div class="t">${mid}${st}</div><div class="teams">${team(x.home)}${team(x.away)}</div><div class="tips">${topTip(x.tips)}</div></li>`;
  };

  const leaguesHtml = order.map((g, i) => {
    const open = i < 40 || g.list.some((x) => x.tips.length);
    const head = `<h3>${esc(g.league.country)} · ${esc(g.league.name)} <small>${g.list.length}</small></h3>`;
    const body = `<ul>${g.list.sort((a, b) => a.ts - b.ts).map(row).join("")}</ul>`;
    return open ? `<section class="lg">${head}${body}</section>` : `<details class="lg"><summary>${head}</summary>${body}</details>`;
  }).join("");

  const canonical = `${SITE}/${lang}/`;
  const alt = LANGS.map((l) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE}/${l}/">`).join("") + `<link rel="alternate" hreflang="x-default" href="${SITE}/en/">`;
  const answer = t.answer(dLong, matches.length, tipsFree, tipsVip);
  const nowIso = new Date().toISOString();
  const tipped = matches.filter((x) => x.tips.length).slice(0, 50);
  const ld = [
    { "@context": "https://schema.org", "@type": "Organization", "@id": SITE + "/#org", name: "betizzi", url: SITE, logo: SITE + "/logo.png", description: t.desc },
    {
      "@context": "https://schema.org", "@type": "WebPage", name: `${t.title} — ${dLong}`, url: canonical, inLanguage: HREFLANG[lang], dateModified: nowIso,
      publisher: { "@id": SITE + "/#org" }, description: answer,
      mainEntity: {
        "@type": "ItemList", numberOfItems: tipped.length,
        itemListElement: tipped.map((x, i) => ({
          "@type": "ListItem", position: i + 1,
          item: {
            "@type": "SportsEvent", name: `${x.home.name} vs ${x.away.name}`, startDate: new Date(x.ts * 1000).toISOString(), sport: "Football",
            homeTeam: { "@type": "SportsTeam", name: x.home.name }, awayTeam: { "@type": "SportsTeam", name: x.away.name },
            superEvent: { "@type": "SportsEvent", name: x.league.name },
          },
        })),
      },
    },
  ];
  const langNav = LANGS.map((l) => `<a href="/${l}/" hreflang="${HREFLANG[l]}"${l === lang ? ' aria-current="page"' : ""}>${l.toUpperCase()}</a>`).join("");

  return `<!doctype html>
<html lang="${HREFLANG[lang]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(t.title)} — ${esc(dLong)} | betizzi</title>
<meta name="description" content="${esc(t.desc)}">
<link rel="canonical" href="${canonical}">
${alt}
<meta property="og:type" content="website"><meta property="og:site_name" content="betizzi">
<meta property="og:title" content="${esc(t.title)} — ${esc(dLong)}"><meta property="og:description" content="${esc(answer)}">
<meta property="og:url" content="${canonical}"><meta property="og:image" content="${SITE}/og/${lang}.png">
<meta name="theme-color" content="#0c0f0d">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:ital,wght@0,700;1,800&family=Manrope:wght@400;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>
<style>
:root{--bg:#0c0f0d;--c1:#141a16;--c2:#1b231e;--ln:#2a352e;--lime:#b6f23a;--gold:#e8b931;--tx:#e9efe9;--mu:#8b9a90}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:15px/1.45 Manrope,system-ui,sans-serif}
a{color:inherit}header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid var(--ln);position:sticky;top:0;background:var(--bg);z-index:2}
.logo{font:800 26px/1 "Fira Sans Extra Condensed",sans-serif;text-decoration:none;letter-spacing:.5px}.logo b{color:#fff}.logo i{color:var(--lime);display:inline-block;transform:skewX(-14deg)}
nav.l{display:flex;gap:6px;overflow-x:auto;font:700 12px "JetBrains Mono",monospace}nav.l a{text-decoration:none;color:var(--mu);padding:4px}nav.l a[aria-current]{color:var(--lime)}
main{max-width:760px;margin:0 auto;padding:14px}
h1{font:700 30px/1.1 "Fira Sans Extra Condensed",sans-serif;margin:6px 0 8px}
.ans{color:#cfd8d1;background:var(--c1);border:1px solid var(--ln);border-radius:12px;padding:12px;margin:0 0 14px}
h2{font:700 20px "Fira Sans Extra Condensed",sans-serif;margin:18px 0 8px}
.lg{background:var(--c1);border:1px solid var(--ln);border-radius:12px;margin:0 0 10px;overflow:hidden}
.lg h3{margin:0;padding:9px 12px;font:700 15px "Fira Sans Extra Condensed",sans-serif;background:var(--c2);display:flex;gap:8px}.lg h3 small{color:var(--mu);font-weight:400;margin-left:auto}
details.lg summary{list-style:none;cursor:pointer}details.lg summary::-webkit-details-marker{display:none}
ul{list-style:none;margin:0;padding:0}
.m{display:grid;grid-template-columns:54px 1fr auto;gap:8px;align-items:center;padding:8px 12px;border-top:1px solid var(--ln);min-height:52px}
.t{display:flex;flex-direction:column;align-items:center;font:500 13px "JetBrains Mono",monospace;color:var(--mu)}
.sc{color:#fff;font-weight:700}.sc.lv{color:var(--lime)}.min{font-size:11px;color:var(--lime)}
.teams{display:flex;flex-direction:column;gap:3px;min-width:0}.tm{display:flex;gap:6px;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tm img{flex:none;border-radius:3px}
.tips{display:flex;gap:4px;align-items:center}.more{font:700 11px "JetBrains Mono",monospace;color:var(--lime);border:1px solid var(--ln);border-radius:6px;padding:3px 5px}
.tip{font:700 12px "JetBrains Mono",monospace;padding:6px 8px;border-radius:8px;white-space:nowrap}.tip.free{background:var(--lime);color:#0c0f0d}.tip.vip{background:var(--gold);color:#0c0f0d}.tip i{font-style:normal;opacity:.75}
.how{color:var(--mu)}footer{color:var(--mu);font-size:13px;text-align:center;padding:22px 14px 40px;border-top:1px solid var(--ln);margin-top:20px}
</style>
</head>
<body>
<header><a class="logo" href="/${lang}/"><b>bet</b><i>izzi</i></a><nav class="l" aria-label="Language">${langNav}</nav></header>
<main>
<h1>${esc(t.title)}</h1>
<p class="ans">${esc(answer)}</p>
<h2>${esc(t.matches)} · ${esc(dLong)}</h2>
${leaguesHtml}
<h2>${esc(t.how)}</h2>
<p class="how">${esc(t.howText)}</p>
</main>
<footer><p>${esc(t.rg)}</p><p>© betizzi · <time datetime="${nowIso}">${esc(dLong)}</time></p></footer>
</body>
</html>`;
}
