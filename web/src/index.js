// betizzi-web: σελίδες έτοιμες από τον server (SSR), μία ανά γλώσσα.
// Μέχρι το άνοιγμα: noindex παντού (X-Robots-Tag) και robots.txt κλειστό.
import { LANGS, HREFLANG, TZ, LOCALE, T, SEL, UI, UI_ORDER } from "./i18n.js";
import { TRANSLATOR } from "./translator.js";
import { getDay, getMatch } from "./data.js";

const SITE = "https://betizzi.com";
// Σειρά λιγκών: πρώτα οι μεγάλες (Top 30), μετά οι υπόλοιπες ανά χώρα.
const TOP = [2, 3, 848, 39, 140, 135, 78, 61, 197, 94, 88, 203, 144, 179, 40, 283, 172, 286, 71, 128, 253, 262, 307, 218, 207, 119, 113, 103, 106, 318];
const rankOf = (id) => { const i = TOP.indexOf(id); return i < 0 ? 999 : i; };
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const LIVE = new Set(["1H", "2H", "HT", "ET", "BT", "P", "LIVE"]);
const DONE = new Set(["FT", "AET", "PEN"]);

const PAGES = new Map(); // μνήμη σελίδων ανά γλώσσα
const CSS = `
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
.teams{text-decoration:none;display:flex;flex-direction:column;gap:3px;min-width:0}.tm{display:flex;gap:6px;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tm img{flex:none;border-radius:3px}
.tips{display:flex;gap:4px;align-items:center}.more{font:700 11px "JetBrains Mono",monospace;color:var(--lime);border:1px solid var(--ln);border-radius:6px;padding:3px 5px}
.tip{font:700 12px "JetBrains Mono",monospace;padding:6px 8px;border-radius:8px;white-space:nowrap}.tip.free{background:var(--lime);color:#0c0f0d}.tip.vip{background:var(--gold);color:#0c0f0d}.tip i{font-style:normal;opacity:.75}
.how{color:var(--mu)}footer{color:var(--mu);font-size:13px;text-align:center;padding:22px 14px 40px;border-top:1px solid var(--ln);margin-top:20px}

.bc{font-size:13px;color:var(--mu);margin:4px 0}.bc a{text-decoration:none}
.vs{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;text-align:center;background:var(--c1);border:1px solid var(--ln);border-radius:12px;padding:14px;margin:10px 0}
.vs img{width:44px;height:44px}.vs b{display:block;margin-top:6px;font:700 17px "Fira Sans Extra Condensed",sans-serif}.vs .mid{font:700 22px "JetBrains Mono",monospace}
.card{background:var(--c1);border:1px solid var(--ln);border-radius:12px;padding:12px;margin:0 0 10px}
.tipc{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 0;border-top:1px solid var(--ln)}.tipc:first-child{border-top:0}
.tipc small{color:var(--mu);display:block}.add{font:700 13px Manrope,sans-serif;background:var(--c2);color:var(--lime);border:1px solid var(--lime);border-radius:10px;padding:10px 12px;min-height:44px}
table{width:100%;border-collapse:collapse;font:500 14px "JetBrains Mono",monospace}td,th{padding:7px 4px;text-align:center;border-top:1px solid var(--ln)}th{color:var(--mu);font:600 12px Manrope,sans-serif}
.fm{display:flex;gap:3px}.fm span{width:16px;height:20px;border-radius:5px;display:grid;place-items:center;font:700 11px "JetBrains Mono",monospace;color:#0c0f0d}
.fm .W{background:#3ccf6e}.fm .D{background:#ffb547}.fm .L{background:#ff6b6b}
.frow{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 0}.frow .tm{min-width:0}
`;

function ymdIn(tz, ts = Date.now()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(ts);
}

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const p = url.pathname;
    if (p === "/") return Response.redirect(url.origin + "/en/", 301);
    if (p === "/live.json") {
      const r = env.ENGINE ? await env.ENGINE.fetch("https://engine/api/live") : await fetch("https://betizzi-engine.bettipsters79.workers.dev/api/live");
      return new Response(await r.text(), { headers: { "content-type": "application/json", "cache-control": "public, max-age=20" } });
    }
    const m = p.match(/^\/([a-z]{2})\/$/);
    if (m && LANGS.includes(m[1])) {
      // Γρήγορη φόρτωση: έτοιμη σελίδα από τη μνήμη (έως 60΄΄), ανανέωση στο παρασκήνιο.
      // Τα live σκορ έρχονται έτσι κι αλλιώς από το /live.json κάθε 30΄΄.
      const dq = url.searchParams.get("d") || "";
      const key = m[1] + (url.searchParams.has("demo") ? "?demo" : "") + (dq ? "|" + dq : "");
      const hit = PAGES.get(key), age = hit ? Date.now() - hit.t : Infinity;
      const build = () => todayPage(env, m[1], url).then((b) => { PAGES.set(key, { t: Date.now(), b }); return b; });
      if (hit && age < 60000) return html(hit.b);
      if (hit && age < 15 * 60000) { ctx.waitUntil(build().catch(() => {})); return html(hit.b); }
      try { return html(await build()); }
      catch (e) { return html(`<!doctype html><meta charset="utf-8"><p>betizzi — ${esc(e.message)}</p>`, 503); }
    }
    const mm = p.match(/^\/([a-z]{2})\/([a-z0-9-]+)-(\d{4}-\d{2}-\d{2})-(\d+)$/);
    if (mm && LANGS.includes(mm[1])) {
      const x = await getMatch(env, +mm[4]);
      if (!x) return html("<!doctype html><title>404</title>", 404);
      const want = matchPath(mm[1], x);
      if (want !== p) return Response.redirect(url.origin + want, 301); // σταθερό id, το slug διορθώνεται
      return html(matchPage(mm[1], x));
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

async function todayPage(env, lang, url) {
  const t = T[lang], tz = TZ[lang];
  const today = ymdIn(tz);
  // ?d=ΗΗΗΗ-ΜΜ-ΗΗ: από 7 μέρες πίσω έως 2 μπροστά (ο engine έχει αγώνες για 3 μέρες)
  const shift = (d, n) => { const [y, mo, da] = d.split("-").map(Number); return new Date(Date.UTC(y, mo - 1, da + n)).toISOString().slice(0, 10); };
  const dq = url.searchParams.get("d");
  const okD = dq && /^\d{4}-\d{2}-\d{2}$/.test(dq) && dq >= shift(today, -7) && dq <= shift(today, 2);
  const date = okD ? dq : today, isToday = date === today;
  // ο engine μετράει μέρα σε UTC: παίρνουμε και τη γειτονική μέρα UTC, για να μη χάνονται αγώνες τα ξημερώματα
  const [y0, m0, d0] = date.split("-").map(Number);
  const nb = ymdIn(tz, Date.UTC(y0, m0 - 1, d0)) === date ? shift(date, -1) : shift(date, 1);
  const [day, day2] = await Promise.all([getDay(env, date), getDay(env, nb).catch(() => null)]);
  const seen = new Set(), all = [];
  for (const x of [...day.matches, ...(day2 ? day2.matches : [])]) if (!seen.has(x.id)) { seen.add(x.id); all.push(x); }
  // κρατάμε τους αγώνες που πέφτουν αυτή τη μέρα στην ώρα της χώρας
  const matches = all.filter((x) => ymdIn(tz, x.ts * 1000) === date);
  const noon = Date.UTC(y0, m0 - 1, d0, 12);
  const title = isToday ? t.title : t.title.replace(/\s+\S+$/, "");
  const nav = [-1, 0, 1, 2].map((n) => {
    const d = shift(today, n), [yy, mm, dd] = d.split("-").map(Number), ts = Date.UTC(yy, mm - 1, dd, 12);
    const lbl = n === -1 ? "Yesterday" : n === 0 ? "Today" : n === 1 ? "Tomorrow" : new Intl.DateTimeFormat(LOCALE[lang], { timeZone: "UTC", weekday: "short", day: "numeric", month: "numeric" }).format(ts);
    return { d, n, lbl, href: n === 0 ? `/${lang}/` : `/${lang}/?d=${d}` };
  });
  const tipsFree = matches.reduce((a, x) => a + x.tips.filter((y) => y.tier === "free").length, 0);
  const tipsVip = matches.reduce((a, x) => a + x.tips.filter((y) => y.tier === "vip").length, 0);
  const dLong = new Intl.DateTimeFormat(LOCALE[lang], { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }).format(noon);
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
    return `<li class="m${x.tips.length ? " has" : ""}"><div class="t">${mid}${st}</div><a class="teams" href="${matchPath(lang, x)}">${team(x.home)}${team(x.away)}</a><div class="tips">${topTip(x.tips)}</div></li>`;
  };

  const leaguesHtml = order.map((g, i) => {
    const open = i < 40 || g.list.some((x) => x.tips.length);
    const head = `<h3>${esc(g.league.country)} · ${esc(g.league.name)} <small>${g.list.length}</small></h3>`;
    const body = `<ul>${g.list.sort((a, b) => a.ts - b.ts).map(row).join("")}</ul>`;
    return open ? `<section class="lg">${head}${body}</section>` : `<details class="lg"><summary>${head}</summary>${body}</details>`;
  }).join("");

  const canonical = isToday ? `${SITE}/${lang}/` : `${SITE}/${lang}/?d=${date}`;
  const alt = LANGS.map((l) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE}/${l}/">`).join("") + `<link rel="alternate" hreflang="x-default" href="${SITE}/en/">`;
  const answer = t.answer(dLong, matches.length, tipsFree, tipsVip);
  const nowIso = new Date().toISOString();
  const tipped = matches.filter((x) => x.tips.length).slice(0, 50);
  const ld = [
    { "@context": "https://schema.org", "@type": "Organization", "@id": SITE + "/#org", name: "betizzi", url: SITE, logo: SITE + "/logo.png", description: t.desc },
    {
      "@context": "https://schema.org", "@type": "WebPage", name: `${title} — ${dLong}`, url: canonical, inLanguage: HREFLANG[lang], dateModified: nowIso,
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

  const ssr = `<h1 class="ssrh">${esc(title)}</h1><p class="ssra">${esc(answer)}</p>`;
  const head = `<title>${esc(title)} — ${esc(dLong)} | betizzi</title>
<meta name="description" content="${esc(t.desc)}">
<link rel="canonical" href="${canonical}">
${alt}
<meta property="og:type" content="website"><meta property="og:site_name" content="betizzi">
<meta property="og:title" content="${esc(title)} — ${esc(dLong)}"><meta property="og:description" content="${esc(answer)}">
<meta property="og:url" content="${canonical}"><meta property="og:image" content="${SITE}/og/${lang}.png">
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>
<style>.ssrh{font:800 1.15rem/1.15 "Fira Sans Extra Condensed",sans-serif;margin:4px 0 2px;text-transform:none;letter-spacing:0}.ssra{font-size:.8rem;color:var(--muted);margin:0 0 8px}
.mlist .lg h3{margin:0;padding:8px 12px;font-size:.9rem}.mlist .lg ul{list-style:none;margin:0;padding:0}.mlist .m{display:flex;gap:8px;padding:6px 12px}</style>`;
  const raw = matches.map((x) => rawRow(x, hm));
  const coupons = (day.coupons || []).map((c) => ({ ...c, legs: c.legs.map((l) => ({ ...l, time: l.ts ? hm(l.ts) : "" })) }));
  const top = TOP.map((id) => groups.get(id)).filter(Boolean).map((g) => g.league.country + "|" + g.league.name);
  let tpl = await template(env, url);
  tpl = tpl.replace('<html lang="en">', `<html lang="${HREFLANG[lang]}">`)
    .replace(/<title>[\s\S]*?<\/title>/, () => head)
    .replace(/var RAW = \[[\s\S]*?\];\n/, () => "var RAW = " + JSON.stringify(raw).replace(/</g, "\\u003c") + ";\n")
    .replace(/var TOP30 = \[[\s\S]*?\];/, () => "var TOP30 = " + JSON.stringify(top) + ";var DAYNAV = " + JSON.stringify({ date, today, nav }) + ";var BZC = " + JSON.stringify(coupons).replace(/</g, "\\u003c") + ";")
    .replace('<div class="hscroll" id="mFilter"', () => ssr + '<div class="hscroll" id="mFilter"')
    .replace('<div class="mlist" id="matchList">', () => '<div class="mlist" id="matchList">' + leaguesHtml)
    .replace("<!--datanote-->", () => `<nav class="langs" aria-label="Language">${langNav}</nav>`);
  // μετάφραση της εφαρμογής + σωστή ημερομηνία στη γλώσσα της σελίδας
  const dShort = new Intl.DateTimeFormat(LOCALE[lang], { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" }).format(noon);
  tpl = tpl.replace('"today").textContent="Sunday 1 November"', () => '"today").textContent=' + JSON.stringify(dShort));
  tpl = tpl.replace('<span id="today"></span>', () => '<span id="today">' + esc(dShort) + "</span>");
  if (lang !== "en") {
    const i = UI_ORDER.indexOf(lang), dict = {};
    for (const k in UI) dict[k] = UI[k][i];
    // μετάφραση και από τον server για τα σταθερά κείμενα (όχι «πήδημα» όταν η σελίδα αλλάζει γλώσσα στον browser)
    const bi = tpl.indexOf("<body");
    let body = tpl.slice(bi);
    // μόνο στο HTML, ποτέ μέσα σε <script>
    body = body.split(/(<script[\s\S]*?<\/script>)/).map((part) => part.startsWith("<script") ? part
      : part.replace(/>([^<>]+)</g, (mm, txt) => { const k = txt.trim(); return k && dict[k] ? ">" + txt.replace(k, () => esc(dict[k])) + "<" : mm; })).join("");
    tpl = tpl.slice(0, bi) + body;
    tpl = tpl.replace(/<body([^>]*)>/, (m) => m + `<script>window.__I18N=${JSON.stringify(dict).replace(/</g, "\\u003c")};${TRANSLATOR}</script>`);
  }
  if (!url.searchParams.has("demo")) tpl = tpl.replace('<div class="demorow">', '<div class="demorow" hidden>').replace('id="demoCoupon"', 'id="demoCoupon" hidden');
  return tpl;
}

let TPL = null;
async function template(env, url) {
  if (!TPL) TPL = await (await env.ASSETS.fetch(new Request(url.origin + "/prototype.html"))).text();
  return TPL;
}

// Μία γραμμή στη μορφή που διαβάζει η εφαρμογή (ίδια με το πρωτότυπο).
const BOOKS = ["Bet365", "Betano", "Pinnacle", "1xBet", "William Hill"];
const SELNAME = { "1": "Home", "2": "Away", X: "Draw", O25: "Over 2.5", U25: "Under 2.5", O15: "Over 1.5", O35: "Over 3.5", U35: "Under 3.5", GG: "GG", NG: "NG", "1X": "1X", X2: "X2", "12": "12" };
function rawRow(x, hm) {
  const type = LIVE.has(x.status) ? "inprogress" : DONE.has(x.status) ? "finished" : ["PST", "CANC", "ABD", "AWD", "WO"].includes(x.status) ? "cancelled" : "notstarted";
  const o = x.odds, md = x.model;
  const pc = (v) => (v == null ? null : Math.round(v * 100));
  const fs = (f) => f.map((g) => g[0]).join("");
  const gg = [x.home.gg, x.away.gg].filter((v) => v != null);
  return [
    x.id, hm(x.ts), x.league.country, x.league.name, x.home.name, x.away.name, type, x.score ? x.score.join("-") : "",
    x.home.rank || 0, x.away.rank || 0, 0, fs(x.home.form), fs(x.away.form),
    [o["1"] || null, o.X || null, o["2"] || null, o.O25 || null, o.U25 || null, o.GG || null, o.NG || null],
    md ? [pc(md.p1), pc(md.px), 100 - pc(md.p1) - pc(md.px), pc(md.over25), md.score.join("-")] : [null, null, null, null, ""],
    x.tips.map((tp) => tp.locked ? ["", 0, "vip", "", 0, -1, 0, "", "A"]
      : [SELNAME[tp.sel] || tp.sel, tp.price, tp.tier, tp.reason, 0, tp.result == null ? -1 : tp.result, 0, "best price", "A", tp.min || 0, tp.at ? hm(tp.at) : ""]),
    x.status, x.minute || 0, x.home.form, x.away.form,
    { cr: null, yc: null, bts: gg.length ? Math.round((gg.reduce((a, b) => a + b, 0) / gg.length) * 100) : null },
    BOOKS.map((b) => (x.books && x.books[b]) || 0), // [1,X,2,O25,U25,GG,NG] ανά bookmaker, σειρά BOOKS
  ];
}

// ---------- Σελίδα αγώνα ----------
const slugify = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  .replace(/ß/g, "ss").replace(/[øØ]/g, "o").replace(/[łŁ]/g, "l").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export function matchPath(lang, x) {
  const d = new Date(x.ts * 1000).toISOString().slice(0, 10);
  return `/${lang}/${slugify(x.home.name)}-vs-${slugify(x.away.name)}-${T[lang].slug}-${d}-${x.id}`;
}

function matchPage(lang, x) {
  const t = T[lang], tz = TZ[lang];
  const dLong = new Intl.DateTimeFormat(LOCALE[lang], { timeZone: tz, day: "numeric", month: "long", year: "numeric" }).format(x.ts * 1000);
  const hm = new Intl.DateTimeFormat(LOCALE[lang], { timeZone: tz, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(x.ts * 1000);
  const pc = (v) => (v == null ? "–" : Math.round(v * 100));
  const open = x.tips.filter((y) => !y.locked).sort((a, b) => (b.prob || 0) - (a.prob || 0));
  const md = x.model;
  const score = md ? `${md.score[0]}–${md.score[1]}` : "–";
  const tipTxt = open.length ? t.mTip.replace("{sel}", SEL[open[0].sel] || open[0].sel).replace("{pr}", open[0].price.toFixed(2)) : "";
  const answer = t.mAnswer.replace("{h}", x.home.name).replace("{a}", x.away.name).replace("{lg}", x.league.name).replace("{d}", dLong).replace("{t}", hm)
    .replace("{tip}", tipTxt).replace("{p1}", pc(md?.p1)).replace("{px}", pc(md?.px)).replace("{p2}", pc(md?.p2)).replace("{o}", pc(md?.over25)).replace("{s}", score)
    .replace(/\s+/g, " ").trim();
  const live = LIVE.has(x.status), done = DONE.has(x.status);
  const mid = x.score && (live || done) ? `${x.score[0]}–${x.score[1]}` : hm;

  const tipsHtml = x.tips.length ? x.tips.map((y) => y.locked
    ? `<div class="tipc"><div><span class="tip vip">VIP 🔒</span><small>${esc(t.vipLock)}</small></div></div>`
    : `<div class="tipc"><div><span class="tip ${y.tier}">${y.tier === "vip" ? "VIP" : "TIP"} <b>${esc(SEL[y.sel] || y.sel)}</b> <i>${y.price.toFixed(2)}</i>${y.result === 1 ? " ✓" : y.result === 0 ? " ✗" : ""}</span>
       <small>${esc(t.why)}: ${esc(y.reason)} · ${pc(y.prob)}% ${esc(t.chance)}</small></div>
       <button class="add" data-fx="${x.id}" data-sel="${esc(y.sel)}" data-price="${y.price}">${esc(t.add)}</button></div>`).join("")
    : `<p class="how">${esc(t.noTipM)}</p>`;

  const formRow = (team) => `<div class="frow"><span class="tm"><img src="${esc(team.logo)}" alt="" width="18" height="18" loading="lazy">${esc(team.name)}</span>
    <span class="fm">${team.form.slice(0, 10).reverse().map((g) => `<span class="${g.res}" title="${g.gf}-${g.ga}">${t[g.res]}</span>`).join("")}</span></div>`;
  const oddsRow = ["1", "X", "2", "O25", "U25", "GG", "NG"].filter((k) => x.odds[k]);
  const oddsHtml = oddsRow.length ? `<table><tr>${oddsRow.map((k) => `<th>${SEL[k]}</th>`).join("")}</tr><tr>${oddsRow.map((k) => `<td>${x.odds[k].toFixed(2)}</td>`).join("")}</tr></table>` : "";
  const modelHtml = md ? `<table><tr><th>1</th><th>X</th><th>2</th><th>Over 2.5</th><th>${esc(t.score)}</th></tr>
    <tr><td>${pc(md.p1)}%</td><td>${pc(md.px)}%</td><td>${pc(md.p2)}%</td><td>${pc(md.over25)}%</td><td>${score}</td></tr></table>` : "";

  const path = matchPath(lang, x), canonical = SITE + path;
  const alt = LANGS.map((l) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE}${matchPath(l, x)}">`).join("") + `<link rel="alternate" hreflang="x-default" href="${SITE}${matchPath("en", x)}">`;
  const title = `${x.home.name} – ${x.away.name}: ${t.word} ${dLong}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "SportsEvent", name: `${x.home.name} vs ${x.away.name}`, startDate: new Date(x.ts * 1000).toISOString(), sport: "Football",
      eventStatus: "https://schema.org/EventScheduled", location: { "@type": "Place", name: x.home.name },
      homeTeam: { "@type": "SportsTeam", name: x.home.name, logo: x.home.logo }, awayTeam: { "@type": "SportsTeam", name: x.away.name, logo: x.away.logo },
      superEvent: { "@type": "SportsEvent", name: x.league.name }, description: answer, url: canonical },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "betizzi", item: `${SITE}/${lang}/` },
      { "@type": "ListItem", position: 2, name: x.league.name },
      { "@type": "ListItem", position: 3, name: `${x.home.name} – ${x.away.name}`, item: canonical }] },
  ];
  const langNav = LANGS.map((l) => `<a href="${matchPath(l, x)}" hreflang="${HREFLANG[l]}"${l === lang ? ' aria-current="page"' : ""}>${l.toUpperCase()}</a>`).join("");
  const nowIso = new Date().toISOString();
  return `<!doctype html>
<html lang="${HREFLANG[lang]}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | betizzi</title>
<meta name="description" content="${esc(answer.slice(0, 160))}">
<link rel="canonical" href="${canonical}">
${alt}
<meta property="og:type" content="article"><meta property="og:site_name" content="betizzi"><meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(answer)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${SITE}/og/${lang}.png">
<meta property="article:modified_time" content="${nowIso}"><meta name="theme-color" content="#0c0f0d">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:ital,wght@0,700;1,800&family=Manrope:wght@400;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>
<style>${CSS}</style>
</head>
<body>
<header><a class="logo" href="/${lang}/"><b>bet</b><i>izzi</i></a><nav class="l" aria-label="Language">${langNav}</nav></header>
<main>
<nav class="bc"><a href="/${lang}/">betizzi</a> › ${esc(x.league.country)} · ${esc(x.league.name)}</nav>
<h1>${esc(x.home.name)} – ${esc(x.away.name)}: ${esc(t.word)}</h1>
<p class="ans">${esc(answer)}</p>
<div class="vs"><div><img src="${esc(x.home.logo)}" alt=""><b>${esc(x.home.name)}</b></div><div class="mid">${mid}${live ? `<div class="min">${esc(x.minute)}'</div>` : ""}</div><div><img src="${esc(x.away.logo)}" alt=""><b>${esc(x.away.name)}</b></div></div>
<h2>${esc(t.tips)}</h2><div class="card">${tipsHtml}</div>
${md ? `<h2>${esc(t.model)}</h2><div class="card">${modelHtml}</div>` : ""}
<h2>${esc(t.form)}</h2><div class="card">${formRow(x.home)}${formRow(x.away)}</div>
${oddsHtml ? `<h2>${esc(t.odds)}</h2><div class="card">${oddsHtml}</div>` : ""}
<p><a href="/${lang}/">← ${esc(t.back)}</a></p>
</main>
<footer><p>${esc(t.rg)}</p><p>© betizzi · <time datetime="${nowIso}">${esc(dLong)}</time></p></footer>
</body>
</html>`;
}
