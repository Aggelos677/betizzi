// betizzi-web: σελίδες έτοιμες από τον server (SSR), μία ανά γλώσσα.
// Μέχρι το άνοιγμα: noindex παντού (X-Robots-Tag) και robots.txt κλειστό.
import { LANGS, HREFLANG, TZ, LOCALE, T, SEL, UI, UI_ORDER, REC } from "./i18n.js";
import { TRANSLATOR } from "./translator.js";
import { getDay, getMatch, getRecord, getCoupons } from "./data.js";
import { PG, PG_ORDER, OP } from "./i18n-pages.js";

const SITE = "https://betizzi.com";
// Σειρά λιγκών: πρώτα οι μεγάλες (Top 30), μετά οι υπόλοιπες ανά χώρα.
const TOP = [2, 3, 848, 39, 140, 135, 78, 61, 197, 94, 88, 203, 144, 179, 40, 283, 172, 286, 71, 128, 253, 262, 307, 218, 207, 119, 113, 103, 106, 318];
const rankOf = (id) => { const i = TOP.indexOf(id); return i < 0 ? 999 : i; };
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const LIVE = new Set(["1H", "2H", "HT", "ET", "BT", "P", "LIVE"]);
const DONE = new Set(["FT", "AET", "PEN"]);

// Χώρες όπου το online στοίχημα είναι 21+ (Ελλάδα: ν. 4002/2011 όπως ισχύει). Εκεί δείχνουμε «21+» αντί «18+».
// Σε αμφίβολες περιπτώσεις βάζουμε το αυστηρότερο. Τα ελληνικά δείχνουν πάντα 21+ (και για τον Googlebot).
const AGE21 = new Set(["GR", "EE", "LV", "LT", "BE", "US"]);
// Κύπρος: ελληνόφωνη αλλά 18+ (Εθνική Αρχή Στοιχημάτων) — ο Κύπριος βλέπει 18+ και στα ελληνικά.
const age21 = (req, lang) => (lang === "el" && req.cf?.country !== "CY") || AGE21.has(req.cf?.country);
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
.fl a{margin:0 6px;white-space:nowrap}
.doc h2{margin-top:22px}.doc p,.doc li{color:#cfd8d1;line-height:1.6}.doc ul{list-style:disc;padding-left:20px}.doc li{margin:4px 0}.doc a{color:var(--lime)}
.recl{text-align:center;margin:10px 0}.recl a{color:var(--lime);font-weight:700;text-decoration:none}
.frow{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 0}.frow .tm{min-width:0}
`;

function ymdIn(tz, ts = Date.now()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(ts);
}

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const p = url.pathname;
    if (url.hostname === "www.betizzi.com") return Response.redirect("https://betizzi.com" + p + url.search, 301);
    if (p === "/") return Response.redirect(url.origin + "/en/", 301);
    if (p === "/goals.json") {
      const r = env.ENGINE ? await env.ENGINE.fetch("https://engine/api/goals") : await fetch("https://betizzi-engine.bettipsters79.workers.dev/api/goals");
      return new Response(r.ok ? await r.text() : "[]", { headers: { "content-type": "application/json", "cache-control": "public, max-age=20" } });
    }
    if (p === "/live.json") {
      const r = env.ENGINE ? await env.ENGINE.fetch("https://engine/api/live") : await fetch("https://betizzi-engine.bettipsters79.workers.dev/api/live");
      return new Response(await r.text(), { headers: { "content-type": "application/json", "cache-control": "public, max-age=20" } });
    }
    // Εγγραφή / σύνδεση (απόφαση Owner 02/11): η σελίδα μιλάει με το engine· το session ζει σε cookie HttpOnly.
    if (p.startsWith("/auth/") || p === "/me.json" || p === "/vip.json") return authRoute(req, env, url);
    const m = p.match(/^\/([a-z]{2})\/$/);
    if (m && LANGS.includes(m[1])) {
      // Γρήγορη φόρτωση: έτοιμη σελίδα από τη μνήμη (έως 60΄΄), ανανέωση στο παρασκήνιο.
      // Τα live σκορ έρχονται έτσι κι αλλιώς από το /live.json κάθε 30΄΄.
      const dq = url.searchParams.get("d") || "";
      const key = m[1] + (url.searchParams.has("demo") ? "?demo" : "") + (dq ? "|" + dq : "");
      const hit = PAGES.get(key), age = hit ? Date.now() - hit.t : Infinity;
      const build = () => todayPage(env, m[1], url).then((b) => { PAGES.set(key, { t: Date.now(), b }); return b; });
      const a21 = age21(req, m[1]);
      if (hit && age < 60000) return html(hit.b, 200, a21);
      if (hit && age < 15 * 60000) { ctx.waitUntil(build().catch(() => {})); return html(hit.b, 200, a21); }
      try { return html(await build(), 200, a21); }
      catch (e) { return html(`<!doctype html><meta charset="utf-8"><p>betizzi — ${esc(e.message)}</p>`, 503); }
    }
    const mm = p.match(/^\/([a-z]{2})\/([a-z0-9-]+)-(\d{4}-\d{2}-\d{2})-(\d+)$/);
    if (mm && LANGS.includes(mm[1])) {
      const x = await getMatch(env, +mm[4]);
      if (!x) return html("<!doctype html><title>404</title>", 404);
      const want = matchPath(mm[1], x);
      if (want !== p) return Response.redirect(url.origin + want, 301); // σταθερό id, το slug διορθώνεται
      return html(matchPage(mm[1], x), 200, age21(req, mm[1]));
    }
    const rm = p.match(/^\/([a-z]{2})\/([a-z-]+)(?:\/(\d{4}-\d{2}|all))?$/);
    if (rm && LANGS.includes(rm[1]) && Object.values(REC).some((r) => r.slug === rm[2])) {
      if (rm[2] !== REC[rm[1]].slug) return Response.redirect(url.origin + `/${rm[1]}/${REC[rm[1]].slug}${rm[3] ? "/" + rm[3] : ""}${url.search}`, 301);
      const mq = rm[3] || "", tq = ["free", "vip"].includes(url.searchParams.get("t")) ? url.searchParams.get("t") : "";
      const fq = ["w", "l"].includes(url.searchParams.get("f")) ? url.searchParams.get("f") : "", pq = Math.max(1, Math.min(999, parseInt(url.searchParams.get("p")) || 1));
      const key = `rec|${rm[1]}|${mq}|${tq}|${fq}|${pq}`, hit = PAGES.get(key);
      if (hit && Date.now() - hit.t < 5 * 60000) return html(hit.b, 200, age21(req, rm[1]));
      try { const [rd, sd] = await Promise.all([getRecord(env), stripData(env, rm[1], TZ[rm[1]])]);
        const b = recordPage(rm[1], rd, mq, tq, fq, pq, sd && sd.last); PAGES.set(key, { t: Date.now(), b }); return html(b, 200, age21(req, rm[1])); }
      catch (e) { return html(`<!doctype html><meta charset="utf-8"><p>betizzi — ${esc(e.message)}</p>`, 503); }
    }
    const sp = p.match(/^\/([a-z]{2})\/([a-z0-9-]+)$/);
    if (sp && LANGS.includes(sp[1])) {
      const [, lang, slug] = sp;
      const key = PG_ORDER.find((k) => PG[k].slug[lang] === slug);
      if (key) return html(staticPage(lang, key), 200, age21(req, lang));
      const other = PG_ORDER.find((k) => Object.values(PG[k].slug).includes(slug));
      if (other) return Response.redirect(url.origin + pgPath(other, lang), 301);
    }
    if (m === null && /^\/[a-z]{2}$/.test(p) && LANGS.includes(p.slice(1))) return Response.redirect(url.origin + p + "/", 301);
    return env.ASSETS.fetch(req);
  },
};

const AUTH_COOKIE = "bz_s";
function cookieTok(req) {
  const m = (req.headers.get("cookie") || "").match(/(?:^|;\s*)bz_s=([a-f0-9]{64})/);
  return m ? m[1] : "";
}
async function authRoute(req, env, url) {
  const p = url.pathname, tok = cookieTok(req);
  const eng = (path, init = {}) => {
    const h = { "content-type": "application/json", "x-bz-session": tok, "x-bz-ip": req.headers.get("cf-connecting-ip") || "" };
    return env.ENGINE ? env.ENGINE.fetch("https://engine" + path, { ...init, headers: h })
      : fetch("https://betizzi-engine.bettipsters79.workers.dev" + path, { ...init, headers: h });
  };
  const J = (o, extra = {}) => new Response(JSON.stringify(o), { headers: { "content-type": "application/json", "cache-control": "private, no-store", ...extra } });
  const same = (req.headers.get("origin") || url.origin) === url.origin; // μόνο από τη δική μας σελίδα
  if (req.method === "POST" && !same) return J({ error: "origin" });
  const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
  if (p === "/auth/start" && req.method === "POST")
    return J(await (await eng("/auth/start", { method: "POST", body: JSON.stringify({ email: body.email, lang: body.lang }) })).json());
  if (p === "/auth/verify" && req.method === "POST") {
    const r = await (await eng("/auth/verify", { method: "POST", body: JSON.stringify({ email: body.email, code: body.code, lang: body.lang,
      adult: !!body.adult, news: !!body.news, country: req.headers.get("cf-ipcountry") || "" }) })).json();
    if (!r.ok) return J(r);
    return J({ ok: true, isNew: r.isNew }, { "set-cookie": `${AUTH_COOKIE}=${r.token}; Path=/; Max-Age=${r.maxAge}; HttpOnly; Secure; SameSite=Lax` });
  }
  if (p === "/auth/logout" && req.method === "POST") {
    await eng("/auth/logout", { method: "POST", body: "{}" });
    return J({ ok: true }, { "set-cookie": `${AUTH_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax` });
  }
  if (p === "/me.json") return J(tok ? await (await eng("/auth/me")).json() : { user: null });
  if (p === "/vip.json") {
    if (!tok) return J({ error: "login" });
    const d = (url.searchParams.get("d") || "").match(/^\d{4}-\d{2}-\d{2}$/) ? url.searchParams.get("d") : new Date().toISOString().slice(0, 10);
    const sh = (n) => { const [y, mo, da] = d.split("-").map(Number); return new Date(Date.UTC(y, mo - 1, da + n)).toISOString().slice(0, 10); };
    const rs = await Promise.all([sh(-1), d, sh(1)].map((x) => eng("/auth/vip?date=" + x).then((q) => q.json()).catch(() => ({}))));
    if (!rs[1].tips) return J(rs[1]);
    const seen = new Set(), r = { tips: [] };
    for (const q of rs) for (const tp of q.tips || []) if (!seen.has(tp.rid)) { seen.add(tp.rid); r.tips.push(tp); }
    r.tips.sort((a, b) => a.rid - b.rid);
    // ίδια μορφή με τα tips της σελίδας (RAW[15])
    return J({ tips: r.tips.map((tp) => [tp.fixture_id, [SELNAME[tp.sel] || tp.sel, tp.price, "vip", tp.reason, 0, tp.result == null ? -1 : tp.result, 0, "best price", "A", tp.min_price || 0, tp.created_at || 0]]) });
  }
  return J({ error: "not found" });
}

function html(body, status = 200, a21 = false) {
  if (a21) body = body.replace(/18\+/g, "21+");
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=60",
      "x-robots-tag": "noindex, nofollow", // αφαιρείται την ημέρα που ανοίγει το site
    },
  });
}


// Λωρίδα «Χθες · Μήνας» της αρχικής (απόφαση Owner 02/11): μόνο W/L και %, χωρίς σχόλιο.
// Τις πρώτες 5 μέρες του μήνα δείχνει τον προηγούμενο μήνα (μέχρι να χτιστεί record).
let RECC = null;
async function stripData(env, lang, tz) {
  try {
    if (!RECC || Date.now() - RECC.t > 10 * 60 * 1000) {
      // παρολί των τελευταίων 10 ημερών (UTC), για «επιλογές της ημέρας χθες» και «τελευταίο που κέρδισε»
      const days = [...Array(10)].map((_, i) => new Date(Date.now() - (i + 1) * 86400000).toISOString().slice(0, 10));
      const [d, ...cps] = await Promise.all([getRecord(env), ...days.map((x) => getCoupons(env, x).catch(() => []))]);
      RECC = { t: Date.now(), d, cps: days.map((x, i) => ({ date: x, list: cps[i] || [] })) };
    }
    const d = RECC.d, today = ymdIn(tz);
    const [y, m, dd] = today.split("-").map(Number);
    const yday = new Date(Date.UTC(y, m - 1, dd - 1)).toISOString().slice(0, 10);
    const mm = dd <= 5 ? new Date(Date.UTC(y, m - 2, 15)) : new Date(Date.UTC(y, m - 1, 15));
    const mKey = mm.toISOString().slice(0, 7);
    const mLabel = new Intl.DateTimeFormat(LOCALE[lang], { timeZone: "UTC", month: "long" }).format(mm);
    const day = (x) => ymdIn(tz, x.ts * 1000);
    const Y = d.settled.filter((x) => day(x) === yday && (x.result === 0 || x.result === 1)).sort((a, b) => a.ts - b.ts);
    const M = d.settled.filter((x) => day(x).slice(0, 7) === mKey && (x.result === 0 || x.result === 1));
    const big = (L) => L.filter((x) => x.result === 1).sort((a, b) => b.price - a.price)[0] || null;
    const pack = (b) => b && { sel: SEL[b.sel] || b.sel, price: b.price, home: b.home, away: b.away, vip: b.tier === "vip" };
    // παρολί: μετράνε μόνο οι «επιλογές της ημέρας» (στα παλιά χωρίs σήμανση: όλα)
    const cp = (c, date) => ({ kind: c.kind, odds: c.odds, r: c.result, date, variant: c.variant,
      legs: (c.legs || []).map((l) => ({ h: l.home, a: l.away, sel: SEL[l.sel] || l.sel, p: l.price })) });
    const yc = (RECC.cps[0] || { list: [] }), ylist = yc.list.some((c) => c.pick) ? yc.list.filter((c) => c.pick) : yc.list;
    const settled = ylist.filter((c) => c.result === 0 || c.result === 1);
    let last = null;
    for (const day of RECC.cps) { const w = day.list.filter((c) => c.result === 1).sort((a, b) => b.odds - a.odds)[0]; if (w) { last = cp(w, day.date); break; } }
    const b10 = yc.list.filter((c) => c.result === 1 && c.odds >= 10).sort((a, b) => b.odds - a.odds)[0];
    const dlbl = (x) => new Intl.DateTimeFormat(LOCALE[lang], { timeZone: "UTC", weekday: "long", day: "numeric", month: "numeric" }).format(Date.parse(x + "T12:00:00Z"));
    if (last) last.label = dlbl(last.date);
    return {
      pk: { won: settled.filter((c) => c.result === 1).length, total: settled.length, rows: settled.map((c) => ({ kind: c.kind, odds: c.odds, r: c.result })) },
      last, big10: b10 ? cp(b10, yc.date) : null,
      y: { won: Y.filter((x) => x.result === 1).length, total: Y.length, rows: Y.slice(0, 40).map((x) => ({ h: x.home, o: x.price, r: x.result })), big: pack(big(Y)) },
      m: { won: M.filter((x) => x.result === 1).length, total: M.length, label: mLabel, big: pack(big(M)) },
    };
  } catch (e) { return null; }
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
  const [day, day2, strip] = await Promise.all([getDay(env, date), getDay(env, nb).catch(() => null), stripData(env, lang, tz)]);
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
    .replace(/var TOP30 = \[[\s\S]*?\];/, () => "var TOP30 = " + JSON.stringify(top) + ";var DAYNAV = " + JSON.stringify({ date, today, nav }) + ";var BZC = " + JSON.stringify(coupons).replace(/</g, "\\u003c") + ";var YREC = " + JSON.stringify(strip).replace(/</g, "\\u003c") + ";")
    .replace('<div class="hscroll" id="mFilter"', () => ssr + '<div class="hscroll" id="mFilter"')
    .replace('<div class="mlist" id="matchList">', () => '<div class="mlist" id="matchList">' + leaguesHtml)
    .replace("<!--datanote-->", () => `<nav class="langs" aria-label="Language">${langNav}</nav>`)
    .replace("<!--footlinks-->", () => `<p class="footl" style="margin:0;opacity:.7;font-size:.8rem;line-height:1.9">${footLinks(lang, ' style="color:inherit"')}</p>`);
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
<footer><p>${esc(t.rg)}</p><p class="fl">${footLinks(lang)}</p><p>© betizzi · <time datetime="${nowIso}">${esc(dLong)}</time></p></footer>
</body>
</html>`;
}

// ---------- Record: όλα τα tips, κερδισμένα και χαμένα ----------
const RCSS = `
.gb h2{margin-top:22px}.gbt{display:flex;flex-wrap:wrap;gap:6px}.gbt input{position:absolute;opacity:0;pointer-events:none}
.gbt label{font-size:.8rem;font-weight:700;padding:6px 12px;border-radius:999px;border:1px solid var(--line);color:var(--muted);cursor:pointer}
.gbt input:checked+label{background:#e8efe9;color:#0c0f0d;border-color:#e8efe9}
.gbp{display:none;width:100%}
.gbt input:nth-of-type(1):checked~.gbp-l,.gbt input:nth-of-type(2):checked~.gbp-r,.gbt input:nth-of-type(3):checked~.gbp-t{display:block}
.gbl{list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:8px}
.gbl li{background:var(--panel,#141a16);border:1px solid rgba(60,207,110,.5);border-radius:14px;padding:10px 12px}.gbl.bd li{border-color:rgba(255,107,107,.5)}
.gb1{display:flex;justify-content:space-between;gap:10px}.gb1 b:last-child{font-family:'JetBrains Mono',monospace}
.gbl small{display:block;margin-top:4px;color:var(--muted);font:500 .78rem 'JetBrains Mono',monospace}
td.pos{color:#3ccf6e}td.neg{color:#ff6b6b}
.lp{margin-top:16px;display:flex;flex-direction:column;gap:6px}.lp small{color:var(--muted)}.lp1{display:flex;gap:10px;align-items:center;justify-content:space-between;font-size:.85rem}
.lpw{background:rgba(60,207,110,.15);color:#3ccf6e;border-radius:999px;padding:5px 10px;font:800 .78rem 'JetBrains Mono',monospace;white-space:nowrap}
.pg{display:flex;justify-content:space-between;align-items:center;margin:10px 0;font-size:.85rem;color:var(--muted)}.pg a{color:var(--lime,#b6f23a);font-weight:800;text-decoration:none;padding:6px 14px;border:1px solid var(--line);border-radius:10px}

.st{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:0 0 12px}.st div{background:var(--c1);border:1px solid var(--ln);border-radius:12px;padding:10px;text-align:center}
.st b{display:block;font:700 24px "JetBrains Mono",monospace}.st small{color:var(--mu);font-size:12px}.st .vipb{border-color:#5a4a14}.st .pos{color:var(--lime)}.st .neg{color:#ff6b6b}
.note{color:var(--mu);font-size:13px;margin:-4px 0 12px}
.big{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin:0 0 6px}
.bw{position:relative;overflow:hidden;border-radius:14px;padding:12px 14px;background:linear-gradient(135deg,#1f3a10,#141a16 70%);border:1px solid var(--lime);box-shadow:0 0 18px rgba(182,242,58,.25)}
.bw:after{content:"🏆";position:absolute;right:10px;top:8px;font-size:22px}
.bw .x{font:800 30px "JetBrains Mono",monospace;color:var(--lime);text-shadow:0 0 12px rgba(182,242,58,.6)}
.bw .mt{font-weight:700;margin-top:2px}.bw small{color:var(--mu)}
.rl li{display:grid;grid-template-columns:70px 1fr auto;gap:8px;align-items:center;padding:8px 10px;border-top:1px solid var(--ln)}
.rl li.w{background:linear-gradient(90deg,rgba(182,242,58,.13),transparent 60%);border-left:3px solid var(--lime)}
.rl li.l{opacity:.62;border-left:3px solid transparent}
.rl .d{font:500 12px "JetBrains Mono",monospace;color:var(--mu)}.rl a{text-decoration:none}.rl small{color:var(--mu);display:block;font-size:12px}
.rl .r{font:700 13px "JetBrains Mono",monospace;white-space:nowrap;text-align:right}.rl .w .ok{color:var(--lime);font-size:16px}.rl .l .ko{color:#ff6b6b}
.tg{font:700 10px "JetBrains Mono",monospace;padding:2px 5px;border-radius:5px;margin-right:4px;background:var(--lime);color:#0c0f0d}.tg.vip{background:var(--gold)}
.tw{overflow-x:auto}.tw td:first-child,.tw th:first-child{text-align:left}
details summary{cursor:pointer;color:var(--mu);margin:8px 0}
.chips{display:flex;gap:6px;overflow-x:auto;margin:0 0 8px;padding-bottom:2px}.ch{flex:none;text-decoration:none;font:700 13px Manrope,sans-serif;padding:8px 12px;border-radius:999px;border:1px solid var(--ln);color:var(--mu);min-height:36px;text-transform:capitalize}
.ch.on{background:var(--lime);color:#0c0f0d;border-color:var(--lime)}
h2.rep{font-size:26px;text-transform:capitalize;margin-top:14px}
.kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:0 0 8px}.kpi div{background:var(--c1);border:1px solid var(--ln);border-radius:12px;padding:10px 6px;text-align:center}
.kpi b{display:block;font:700 22px "JetBrains Mono",monospace}.kpi small{color:var(--mu);font-size:11px;display:block}.kpi em{font:700 11px "JetBrains Mono",monospace;font-style:normal}
.pos{color:var(--lime)}.neg{color:#ff6b6b}
.big{grid-template-columns:repeat(auto-fill,minmax(210px,1fr))}
.two{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0 0}.three{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.card h3{margin:0 0 6px;font:700 16px "Fira Sans Extra Condensed",sans-serif}
.gl{border-color:#3d5a1a}.bl{border-color:#5a2a2a}
.gl li,.bl li{display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-top:1px solid var(--ln);font-size:14px}.gl li:first-child,.bl li:first-child{border-top:0}
.gl .r,.bl .r{text-align:right;white-space:nowrap}.gl small,.bl small{display:block;color:var(--mu);font-size:11px}
.rr{display:grid;grid-template-columns:76px 1fr;gap:2px 8px;align-items:center;padding:6px 0;border-top:1px solid var(--ln)}.rr:first-of-type{border-top:0}
.rr .lab{font:700 12px "JetBrains Mono",monospace}.rr .bar{height:8px;background:var(--c2);border-radius:4px;overflow:hidden}.rr .bar i{display:block;height:100%}.rr .bar .p{background:var(--lime)}.rr .bar .n{background:#ff6b6b}
.rr .v{grid-column:2;font:500 11px "JetBrains Mono",monospace;color:var(--mu)}.rr.few{opacity:.5}
.bdg{grid-column:2;justify-self:start;font:700 10px Manrope,sans-serif;padding:2px 6px;border-radius:5px;border:1px solid currentColor}
.hitk b{color:var(--lime)}
@media(max-width:640px){.kpi{grid-template-columns:repeat(2,1fr)}.two,.three{grid-template-columns:1fr}}
`;
function recStats(a) {
  const n = a.length, w = a.filter((t) => t.result === 1).length;
  const u = a.reduce((s, t) => s + (t.result === 1 ? t.price - 1 : -1), 0);
  const avg = n ? a.reduce((s, t) => s + t.price, 0) / n : 0;
  return { n, w, l: n - w, hit: n ? Math.round((w / n) * 100) : 0, u, roi: n ? Math.round((u / n) * 1000) / 10 : 0, avg };
}
const MKT = (sel) => (["1", "X", "2", "1X", "X2", "12"].includes(sel) ? "1X2" : /^[OU]\d/.test(sel) ? `Over/Under ${sel.slice(1, 2)}.${sel.slice(2)}` : sel === "GG" || sel === "NG" ? "GG/NG" : sel);
const sgn = (v, d = 2) => (v > 0 ? "+" : "") + v.toFixed(d);

const BANDS = [[1, 1.6, "< 1.60"], [1.6, 1.8, "1.60–1.79"], [1.8, 2, "1.80–1.99"], [2, 2.5, "2.00–2.49"], [2.5, 99, "2.50+"]];
const MIN_L = 3, MIN_R = 5; // ελάχιστο δείγμα: λίγκα / εύρος απόδοσης

function recordPage(lang, d, mq = "", tq = "", fq = "", pq = 1, lastPar = null) {
  const r = REC[lang], t = T[lang], tz = TZ[lang], loc = LOCALE[lang];
  const fD = (ts, o) => new Intl.DateTimeFormat(loc, { timeZone: tz, ...o }).format(ts * 1000);
  const dLong = (ts) => fD(ts, { day: "numeric", month: "long", year: "numeric" });
  const mKey = (ts) => ymdIn(tz, ts * 1000).slice(0, 7);
  const mName = (k) => new Intl.DateTimeFormat(loc, { timeZone: "UTC", month: "long", year: "numeric" }).format(Date.UTC(+k.slice(0, 4), +k.slice(5) - 1, 15));
  const ALL = d.settled, all = recStats(ALL);
  const months = [...new Set(ALL.map((x) => mKey(x.ts)))].sort().reverse();
  const mo = mq === "all" ? "all" : months.includes(mq) ? mq : months[0] || "";
  const tierOk = (x) => !tq || x.tier === tq;
  const inM = (x, k) => k === "all" || mKey(x.ts) === k;
  const S = ALL.filter((x) => inM(x, mo) && tierOk(x));
  const prevK = mo && mo !== "all" ? months[months.indexOf(mo) + 1] : null;
  const ms = recStats(S), ps = prevK ? recStats(ALL.filter((x) => inM(x, prevK) && tierOk(x))) : null;
  const answer = ALL.length
    ? r.ans.replace("{since}", dLong(d.since)).replace("{n}", all.n).replace("{w}", all.w).replace("{l}", all.l).replace("{hit}", all.hit)
        .replace("{u}", sgn(all.u)).replace("{roi}", sgn(all.roi, 1)).replace("{avg}", all.avg.toFixed(2)).replace("{wd}", d.withdrawn.length).replace("{upd}", dLong(d.updated))
    : r.empty;
  const base = `/${lang}/${r.slug}`;
  // Κάθε μήνας = δική του σελίδα (/…/2026-11) για Google/AI. Το φίλτρο TIP/VIP είναι ?t= και δεν ευρετηριάζεται.
  const mPath = (m) => (m && m !== months[0] ? `/${m}` : "");
  const q = (m, tt) => base + mPath(m) + (tt ? "?t=" + tt : "");
  const chip = (href, label, on) => `<a class="ch${on ? " on" : ""}" href="${href}">${esc(label)}</a>`;
  const chipsHtml = ALL.length ? `<div class="chips">${months.map((k) => chip(q(k, tq), mName(k), mo === k)).join("")}${chip(q("all", tq), r.allM, mo === "all")}</div>
    <div class="chips">${chip(q(mo, ""), r.all, !tq)}${chip(q(mo, "free"), "TIP · Free", tq === "free")}${chip(q(mo, "vip"), "VIP", tq === "vip")}</div>` : "";
  const delta = (a, b, unit) => { if (b == null) return ""; const v = a - b; return `<em class="${v >= 0 ? "pos" : "neg"}">${v >= 0 ? "▲" : "▼"} ${Math.abs(v).toFixed(unit === "%" ? 0 : 2)}${unit}</em>`; };
  const kpi = S.length ? `<div class="kpi">
    <div><small>${esc(r.tips)}</small><b>${ms.n}</b></div>
    <div><small>${esc(r.won)}</small><b class="pos">${ms.w} ✓</b></div>
    <div><small>${esc(r.lost)}</small><b>${ms.l} ✗</b></div>
    <div class="hitk"><small>${esc(r.hit)}</small><b>${ms.hit}%</b>${ps && ps.n ? delta(ms.hit, ps.hit, "%") : ""}</div></div>${ps && ps.n ? `<p class="note">▲▼ ${esc(r.vsPrev)} (${esc(mName(prevK))})</p>` : ""}` : "";
  const mp = (x) => matchPath(lang, { id: x.id, ts: x.ts, home: { name: x.home }, away: { name: x.away } });
  const wins = S.filter((x) => x.result === 1).sort((a, b) => b.price - a.price).slice(0, 3);
  const bigHtml = wins.length ? `<h2>${esc(mo === "all" ? r.big : r.top3)}</h2><div class="big">${wins.map((x, i) => `<a class="bw" href="${mp(x)}" style="text-decoration:none">
    <div class="x">${["🥇", "🥈", "🥉"][i]} ${x.price.toFixed(2)}</div><div class="mt">${esc(x.home)} – ${esc(x.away)}${x.score ? ` · ${x.score[0]}–${x.score[1]}` : ""}</div>
    <small><span class="tg ${x.tier}">${x.tier === "vip" ? "VIP" : "TIP"}</span>${esc(SEL[x.sel] || x.sel)} · ${esc(x.league)} · ${fD(x.ts, { day: "numeric", month: "short" })}</small></a>`).join("")}</div>` : "";
  const by = (a, f) => { const m = new Map(); for (const x of a) { const k = f(x); (m.get(k) || m.set(k, []).get(k)).push(x); } return m; };
  // Απόφαση Owner 02/11: «πού πάμε καλά / πού όχι» ανά λίγκα, εύρος απόδοσης, είδος tip, με ΟΛΑ τα νούμερα
  // (tips, W/L, μέση απόδοση, %, ROI). Μπαίνει μόνο κατηγορία με αρκετά tips: 10 στον μήνα, 30 σε όλους τους μήνες.
  const MINN = mo === "all" ? 30 : 10;
  const band = (x) => (BANDS.find(([lo, hi]) => x.price >= lo && x.price < hi) || BANDS[BANDS.length - 1])[2];
  const kindOf = (x) => (["1", "X", "2"].includes(x.sel) ? "1X2 · " + x.sel : SEL[x.sel] || x.sel); // όροι στοιχήματος όπως τους λέει ο κόσμος
  const dims = [["l", r.league, (x) => `${x.league} · ${x.country}`], ["r", r.rangeH, band], ["t", r.tabT, kindOf]];
  const lineHtml = (k, s, good) => `<li><div class="gb1"><b>${esc(k)}</b><b class="${good ? "pos" : "neg"}">ROI ${sgn(s.roi, 1)}%</b></div>
    <small>${s.n} tips · ${s.w}W ${s.l}L · ${esc(r.avg)} ${s.avg.toFixed(2)} · ${s.hit}%</small></li>`;
  const gbBlock = (good) => {
    const id = good ? "g" : "b";
    const tabs = dims.map(([k, lab], i) => `<input type="radio" name="gb${id}" id="gb${id}${k}"${i ? "" : " checked"}><label for="gb${id}${k}">${esc(lab)}</label>`).join("");
    const panes = dims.map(([k, , f]) => {
      const rows = [...by(S, f).entries()].map(([kk, a]) => [kk, recStats(a)]).filter(([, s]) => s.n >= MINN && (good ? s.roi > 0 : s.roi < 0))
        .sort((a, b) => (good ? b[1].roi - a[1].roi : a[1].roi - b[1].roi)).slice(0, 5);
      return `<div class="gbp gbp-${k}">${rows.length ? `<ul class="gbl ${good ? "gd" : "bd"}">${rows.map(([kk, s]) => lineHtml(kk, s, good)).join("")}</ul>` : `<p class="note">${esc(r.needN.replace("{n}", MINN))}</p>`}</div>`;
    }).join("");
    return `<section class="gb gb${id}"><h2 class="${good ? "pos" : "neg"}">${good ? "✓ " + esc(r.goodH) : "✗ " + esc(r.badH)}</h2><div class="gbt">${tabs}${panes}</div></section>`;
  };
  const lgHtml = S.length ? gbBlock(true) + gbBlock(false) : "";
  // πίνακας ανά εύρος απόδοσης: W–L, %, ROI
  const rangesHtml = S.length ? `<h2>${esc(r.tblR)}</h2><div class="card tw"><table><tr><th>${esc(r.rangeH)}</th><th>W–L</th><th>%</th><th>ROI</th></tr>${
    BANDS.map(([lo, hi, lab]) => [lab, recStats(S.filter((x) => x.price >= lo && x.price < hi))]).filter(([, s]) => s.n)
      .map(([lab, s]) => `<tr><td>${lab}</td><td>${s.w}–${s.l}</td><td>${s.hit}%</td><td class="${s.roi >= 0 ? "pos" : "neg"}">${sgn(s.roi, 1)}%</td></tr>`).join("")}</table></div>` : "";
  // τελευταίο παρολί που κέρδισε (τα παρολί δεν μετράνε στο Record, μόνο αυτό φαίνεται)
  const parHtml = lastPar ? `<div class="card lp"><small>${esc(r.lastPar)} · ${esc(lastPar.label || lastPar.date)}</small><div class="lp1"><span>${lastPar.legs.slice(0, 3).map((l) => `${esc(l.h)}–${esc(l.a)} <b class="pos">${esc(l.sel)}</b>`).join(" · ")}${lastPar.legs.length > 3 ? " · …" : ""}</span><b class="lpw">✓ WIN x${lastPar.odds.toFixed(2)}</b></div></div>` : "";
  const table = (title, head, groups) => {
    const rows = [...groups.entries()].map(([k, a]) => [k, recStats(a)]);
    return rows.length ? `<h2>${esc(title)}</h2><div class="card tw"><table><tr><th>${esc(head)}</th><th>${esc(r.tips)}</th><th>${esc(r.won)}</th><th>${esc(r.lost)}</th><th>${esc(r.hit)}</th></tr>${
      rows.map(([k, s]) => `<tr><td>${esc(k)}</td><td>${s.n}</td><td>${s.w}</td><td>${s.l}</td><td>${s.hit}%</td></tr>`).join("")}</table></div>` : "";
  };
  const monthsTable = mo === "all" ? table(r.byMonth, r.month, new Map(months.map((k) => [mName(k), ALL.filter((x) => inM(x, k) && tierOk(x))]))) : "";
  const li = (x, wd) => `<li class="${wd ? "l" : x.result === 1 ? "w" : "l"}"><span class="d">${fD(x.ts, { day: "2-digit", month: "2-digit" })}<br>${fD(x.ts, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" })}</span>
    <span><a href="${mp(x)}">${esc(x.home)} – ${esc(x.away)}</a><small>${esc(x.league)}${x.score && !wd ? ` · ${x.score[0]}–${x.score[1]}` : ""}</small></span>
    <span class="r"><span class="tg ${x.tier}">${x.tier === "vip" ? "VIP" : "TIP"}</span>${esc(SEL[x.sel] || x.sel)} @${x.price.toFixed(2)} ${wd ? "↩" : x.result === 1 ? '<span class="ok">✓</span>' : '<span class="ko">✗</span>'}</span></li>`;
  const LF = fq === "w" ? S.filter((x) => x.result === 1) : fq === "l" ? S.filter((x) => x.result !== 1) : S;
  const PER = 10, pages = Math.max(1, Math.ceil(LF.length / PER)), pg = Math.min(pq, pages);
  const lq = (f, p) => base + mPath(mo) + "?" + [tq ? "t=" + tq : "", f ? "f=" + f : "", p > 1 ? "p=" + p : ""].filter(Boolean).join("&") + "#all";
  const pager = pages > 1 ? `<nav class="pg">${pg > 1 ? `<a href="${lq(fq, pg - 1)}">←</a>` : "<span></span>"}<span>${esc(r.page.replace("{p}", pg).replace("{n}", pages))}</span>${pg < pages ? `<a href="${lq(fq, pg + 1)}">→</a>` : "<span></span>"}</nav>` : "";
  const listHtml = S.length ? `<h2 id="all">${esc(r.latest)}</h2><div class="chips">${chip(lq("", 1), r.all, !fq)}${chip(lq("w", 1), r.won, fq === "w")}${chip(lq("l", 1), r.lost, fq === "l")}</div>
    <div class="card" style="padding:0"><ul class="rl">${LF.slice((pg - 1) * PER, pg * PER).map((x) => li(x)).join("")}</ul></div>${pager}` : "";
  const WD = d.withdrawn.filter((x) => inM(x, mo) && tierOk(x));
  const wdHtml = WD.length ? `<details><summary>${esc(r.withdrawn)} (${WD.length})</summary><div class="card" style="padding:0"><ul class="rl">${WD.map((x) => li(x, true)).join("")}</ul></div></details>` : "";
  const repTitle = mo && mo !== "all" ? r.rep.replace("{m}", mName(mo)) : r.allM;

  const canonical = `${SITE}${base}${mPath(mo)}`;
  const alt = LANGS.map((l) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE}/${l}/${REC[l].slug}${mPath(mo)}">`).join("") + `<link rel="alternate" hreflang="x-default" href="${SITE}/en/${REC.en.slug}${mPath(mo)}">`;
  const langNav = LANGS.map((l) => `<a href="/${l}/${REC[l].slug}${mPath(mo)}" hreflang="${HREFLANG[l]}"${l === lang ? ' aria-current="page"' : ""}>${l.toUpperCase()}</a>`).join("");
  const nowIso = new Date((d.updated || Date.now() / 1000) * 1000).toISOString();
  const ld = [
    { "@context": "https://schema.org", "@type": "Dataset", name: r.title, description: r.desc, url: `${SITE}${base}`, inLanguage: HREFLANG[lang],
      creator: { "@type": "Organization", name: "betizzi", url: SITE }, dateModified: nowIso, temporalCoverage: d.since ? `${new Date(d.since * 1000).toISOString().slice(0, 10)}/..` : undefined,
      isAccessibleForFree: true, variableMeasured: [r.tips, r.won, r.lost, r.hit] },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "betizzi", item: `${SITE}/${lang}/` },
      { "@type": "ListItem", position: 2, name: r.nav, item: `${SITE}${base}` }] },
  ];
  return `<!doctype html>
<html lang="${HREFLANG[lang]}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(r.title)}${mo && mo !== months[0] ? " · " + esc(mo === "all" ? r.allM : mName(mo)) : ""}</title>
<meta name="description" content="${esc(r.desc)}">
<link rel="canonical" href="${canonical}">
${tq || fq || pq > 1 ? '<meta name="robots" content="noindex,follow">' : alt}
<meta property="og:type" content="website"><meta property="og:site_name" content="betizzi"><meta property="og:title" content="${esc(r.title)}">
<meta property="og:description" content="${esc(answer)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${SITE}/og/${lang}.png">
<meta property="article:modified_time" content="${nowIso}"><meta name="theme-color" content="#0c0f0d">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:ital,wght@0,700;1,800&family=Manrope:wght@400;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>
<style>${CSS}${RCSS}</style>
</head>
<body>
<header><a class="logo" href="/${lang}/"><b>bet</b><i>izzi</i></a><nav class="l" aria-label="Language">${langNav}</nav></header>
<main>
<nav class="bc"><a href="/${lang}/">betizzi</a> › ${esc(r.nav)}</nav>
<h1>${esc(r.h1)}</h1>
<p class="ans">${esc(answer)}</p>
${chipsHtml}
${S.length ? `<h2 class="rep">${esc(repTitle)}${tq ? ` · ${tq === "vip" ? "VIP" : "TIP"}` : ""}</h2>` : ""}
${kpi}
${ALL.length && ALL.length < 200 ? `<p class="note">${esc(r.small)}</p>` : ""}
${d.pending ? `<p class="note">${esc(r.pending.replace("{n}", d.pending))}</p>` : ""}
${lgHtml}
${rangesHtml}
${parHtml}
${bigHtml}
${monthsTable}
${listHtml}
${wdHtml}
<h2>${esc(r.how)}</h2><p class="how">${esc(r.howText)}</p>
<p><a href="/${lang}/">← ${esc(t.back)}</a></p>
</main>
<footer><p>${esc(t.rg)}</p><p class="fl">${footLinks(lang)}</p><p>© betizzi · <time datetime="${nowIso}">${esc(dLong(d.updated || Date.now() / 1000))}</time></p></footer>
</body>
</html>`;
}

// ---------- Στατικές σελίδες (Ποιοι είμαστε, Επικοινωνία, Υπεύθυνο παιχνίδι, Affiliate, Όροι, Απόρρητο, Cookies) ----------
function pgPath(key, lang) {
  const sl = PG[key].slug[lang];
  return sl ? `/${lang}/${sl}` : `/en/${PG[key].slug.en}`; // Όροι/Απόρρητο/Cookies: όπου δεν υπάρχει μετάφραση, τα αγγλικά
}
const pgLabel = (key, lang) => (PG[key].title[lang] || PG[key].title.en).replace(/\s*·\s*18\+$/, "");
function footLinks(lang, attr = "") {
  const a = [`<a href="/${lang}/${REC[lang].slug}"${attr}>${esc(REC[lang].nav)}</a>`];
  for (const k of PG_ORDER) a.push(`<a href="${pgPath(k, lang)}"${attr}${PG[k].slug[lang] ? "" : ' hreflang="en"'}>${esc(pgLabel(k, lang))}</a>`);
  return a.join(" · ");
}
// Μικρό markdown: ## τίτλοι, - λίστες, παράγραφοι, **έντονα**, [κείμενο](link)
function md(src) {
  const inl = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, x, u) =>
    `<a href="${u}"${/^https?:/.test(u) ? ' rel="noopener" target="_blank"' : ""}>${x}</a>`);
  return src.trim().split(/\n\s*\n/).map((blk) => {
    const lines = blk.split("\n");
    if (lines[0].startsWith("## ")) { const rest = lines.slice(1).join("\n"); return `<h2>${inl(lines[0].slice(3))}</h2>` + (rest.trim() ? md(rest) : ""); }
    if (lines.every((l) => l.startsWith("- "))) return `<ul>${lines.map((l) => `<li>${inl(l.slice(2))}</li>`).join("")}</ul>`;
    return `<p>${inl(lines.join(" "))}</p>`;
  }).join("\n");
}
function staticPage(lang, key) {
  const pg = PG[key], t = T[lang];
  const own = !!pg.body[lang], L = own ? lang : "en"; // χωρίς μετάφραση → αγγλικό κείμενο
  const langs = LANGS.filter((l) => pg.slug[l]);
  const canonical = SITE + pgPath(key, lang);
  const alt = langs.map((l) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE}/${l}/${pg.slug[l]}">`).join("") + `<link rel="alternate" hreflang="x-default" href="${SITE}/en/${pg.slug.en}">`;
  const langNav = LANGS.map((l) => `<a href="${pgPath(key, l)}" hreflang="${HREFLANG[l]}"${l === lang ? ' aria-current="page"' : ""}>${l.toUpperCase()}</a>`).join("");
  const upd = new Date(OP.updated + "T00:00:00Z").toISOString();
  const dUpd = new Intl.DateTimeFormat(LOCALE[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(upd));
  const ld = [{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "betizzi", item: `${SITE}/${lang}/` },
    { "@type": "ListItem", position: 2, name: pg.title[L], item: canonical }] }];
  if (key === "about") ld.push({ "@context": "https://schema.org", "@type": "Organization", name: "betizzi", url: SITE, logo: `${SITE}/og/en.png`,
    description: pg.desc.en, email: OP.hello, founder: { "@type": "Person", name: OP.name },
    address: { "@type": "PostalAddress", addressLocality: "Paphos", addressCountry: "CY" },
    contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: OP.hello }, { "@type": "ContactPoint", contactType: "partnerships", email: OP.partners }] });
  return `<!doctype html>
<html lang="${HREFLANG[L]}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(pg.title[L])} | betizzi</title>
<meta name="description" content="${esc(pg.desc[L])}">
<link rel="canonical" href="${canonical}">
${own ? alt : '<meta name="robots" content="noindex,follow">'}
<meta property="og:type" content="website"><meta property="og:site_name" content="betizzi"><meta property="og:title" content="${esc(pg.title[L])}">
<meta property="og:description" content="${esc(pg.desc[L])}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${SITE}/og/${lang}.png">
<meta property="article:modified_time" content="${upd}"><meta name="theme-color" content="#0c0f0d">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:ital,wght@0,700;1,800&family=Manrope:wght@400;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>
<style>${CSS}</style>
</head>
<body>
<header><a class="logo" href="/${lang}/"><b>bet</b><i>izzi</i></a><nav class="l" aria-label="Language">${langNav}</nav></header>
<main class="doc">
<nav class="bc"><a href="/${lang}/">betizzi</a> › ${esc(pg.title[L])}</nav>
<h1>${esc(pg.title[L])}</h1>
${md(pg.body[L])}
<p class="how" style="font-size:13px;margin-top:24px"><time datetime="${upd}">${esc(dUpd)}</time></p>
<p><a href="/${lang}/">← ${esc(t.back)}</a></p>
</main>
<footer><p>${esc(t.rg)}</p><p class="fl">${footLinks(lang)}</p><p>© betizzi · ${esc(OP.name)}, ${esc(OP.city)}</p></footer>
</body>
</html>`;
}
