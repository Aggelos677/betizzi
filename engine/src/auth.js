// Εγγραφή / σύνδεση betizzi (απόφαση Owner 02/11/2026): κωδικός 6 ψηφίων στο email, χωρίς password.
// Τα email φεύγουν από τον λογαριασμό Brevo του betizzi (secret BREVO_KEY, αποστολέας noreply@betizzi.com).
// Η σελίδα (betizzi-web) μιλάει με αυτά τα endpoints μέσω service binding και κρατά το session σε cookie HttpOnly.
// Προσωπικά δεδομένα: μόνο email, γλώσσα, χώρα (από Cloudflare), συγκαταθέσεις. Τίποτα άλλο.
import { MAIL, WELCOME } from "./auth-texts.js";

const now = () => Math.floor(Date.now() / 1000);
const CODE_TTL = 10 * 60, SESSION_TTL = 90 * 86400, MAX_TRIES = 5;
const LIMIT = { perEmail15m: 3, perIpHour: 10, perDay: 250 }; // Brevo δωρεάν: 300/μέρα
export const CREDITS = { signup: 100, visit: 10 };            // πίνακας credits (απόφαση Owner 01/11)
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;

async function sha(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}
const rnd = (n) => [...crypto.getRandomValues(new Uint8Array(n))].map((x) => x.toString(16).padStart(2, "0")).join("");
const code6 = () => String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, "0");

let ready = false;
export async function authTables(env) {
  if (ready) return;
  await env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, email TEXT UNIQUE NOT NULL, lang TEXT, country TEXT,
      created_at INTEGER, last_seen INTEGER, news INTEGER DEFAULT 0, tg_id TEXT, ref_code TEXT UNIQUE, ref_by INTEGER, status TEXT DEFAULT 'active')`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS login_codes(email TEXT PRIMARY KEY, code_hash TEXT, exp INTEGER, tries INTEGER, sent_at INTEGER, sends INTEGER, win INTEGER)`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY, user_id INTEGER, created_at INTEGER, exp INTEGER)`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS credits(id INTEGER PRIMARY KEY, user_id INTEGER, ts INTEGER, kind TEXT, amount INTEGER, ref TEXT, day TEXT)`),
    env.DB.prepare(`CREATE UNIQUE INDEX IF NOT EXISTS credits_once ON credits(user_id, kind, day)`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS consents(id INTEGER PRIMARY KEY, user_id INTEGER, kind TEXT, value INTEGER, ts INTEGER, country TEXT, text_version TEXT)`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS auth_rate(k TEXT PRIMARY KEY, n INTEGER, win INTEGER)`),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY, ts INTEGER, who TEXT, action TEXT, target TEXT, detail TEXT)`),
  ]);
  ready = true;
}

async function bump(env, k, win, max) {
  const t = now(), r = await env.DB.prepare("SELECT n, win FROM auth_rate WHERE k=?").bind(k).first();
  if (r && t - r.win < win) {
    if (r.n >= max) return false;
    await env.DB.prepare("UPDATE auth_rate SET n=n+1 WHERE k=?").bind(k).run();
  } else await env.DB.prepare("INSERT OR REPLACE INTO auth_rate(k,n,win) VALUES(?,1,?)").bind(k, t).run();
  return true;
}

async function brevo(env, to, subject, html, text, tag) {
  if (!env.BREVO_KEY) throw new Error("mail not configured");
  const r = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": env.BREVO_KEY, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ sender: { name: "betizzi", email: env.MAIL_FROM || "noreply@betizzi.com" }, to: [{ email: to }], subject, htmlContent: html, textContent: text, tags: [tag] }),
  });
  if (!r.ok) throw new Error("mail " + r.status + " " + (await r.text()).slice(0, 120));
}
const LOGO = '<div style="font-size:26px;font-weight:800">bet<span style="color:#b6f23a;font-style:italic">izzi</span></div>';
const BOX = (inner) => `<div style="font-family:Arial,sans-serif;max-width:440px;margin:auto;padding:24px;background:#0c0f0d;color:#eef3ee;border-radius:14px">${LOGO}${inner}</div>`;

// Καλωσόρισμα: μία φορά, μετά την πρώτη σύνδεση (transactional, χωρίς προσφορές)
async function sendWelcome(env, to, lang) {
  const W = WELCOME[lang] || WELCOME.en, site = `https://betizzi.com/${WELCOME[lang] ? lang : "en"}/`;
  const html = BOX(`<h2 style="margin:16px 0 6px;font-size:20px">${W.hi}</h2>
<p style="font-size:15px;margin:6px 0">${W.got}</p>
<div style="margin:14px 0;padding:14px;border:1px solid #2a352e;border-radius:12px;background:#141a16"><div style="font:700 30px monospace;color:#b6f23a">100 / 1000</div>
<div style="height:8px;border-radius:99px;background:#2a352e;margin-top:8px"><div style="width:10%;height:8px;border-radius:99px;background:#b6f23a"></div></div>
<p style="font-size:13px;color:#9aa89f;margin:10px 0 0">${W.goal}</p></div>
<p style="font-size:14px;font-weight:700;margin:14px 0 4px">${W.how}</p>
<ul style="font-size:14px;margin:0;padding-left:18px">${W.ways.map((w) => `<li style="margin:4px 0">${w}</li>`).join("")}</ul>
<p style="font-size:14px;margin:14px 0">${W.vip}</p>
<p style="margin:18px 0"><a href="${site}" style="display:inline-block;background:#b6f23a;color:#14200a;font-weight:800;text-decoration:none;padding:12px 18px;border-radius:10px">${W.go}</a></p>
<p style="font-size:11px;color:#9aa89f">${W.foot}</p>`);
  const text = [W.hi, W.got.replace(/<[^>]+>/g, ""), W.goal.replace(/<[^>]+>/g, ""), W.how + ":", ...W.ways.map((w) => "- " + w), W.vip, site, W.foot].join("\n");
  await brevo(env, to, W.subject, html, text, "welcome");
}

async function sendMail(env, to, lang, code) {
  const T = MAIL[lang] || MAIL.en;
  if (!env.BREVO_KEY) throw new Error("mail not configured");
  const html = `<div style="font-family:Arial,sans-serif;max-width:420px;margin:auto;padding:24px;background:#0c0f0d;color:#eef3ee;border-radius:14px">
<div style="font-size:26px;font-weight:800">bet<span style="color:#b6f23a;font-style:italic">izzi</span></div>
<p style="font-size:15px">${T.body}</p>
<div style="font:700 34px/1.2 monospace;letter-spacing:8px;color:#b6f23a;margin:18px 0">${code}</div>
<p style="font-size:12px;color:#9aa89f">${T.foot}</p></div>`;
  const r = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": env.BREVO_KEY, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ sender: { name: "betizzi", email: env.MAIL_FROM || "noreply@betizzi.com" }, to: [{ email: to }],
      subject: T.subject.replace("{code}", code), htmlContent: html, textContent: `${T.body}\n\n${code}\n\n${T.foot}`, tags: ["login-code"] }),
  });
  if (!r.ok) throw new Error("mail " + r.status + " " + (await r.text()).slice(0, 120));
}

// POST /auth/start {email, lang}  → στέλνει κωδικό
export async function authStart(env, body, ip) {
  await authTables(env);
  const email = String(body.email || "").trim().toLowerCase(), lang = String(body.lang || "en").slice(0, 2);
  if (!EMAIL_RE.test(email)) return { error: "email" };
  if (!(await bump(env, "e:" + email, 900, LIMIT.perEmail15m))) return { error: "wait" };
  if (ip && !(await bump(env, "ip:" + ip, 3600, LIMIT.perIpHour))) return { error: "wait" };
  if (!(await bump(env, "day:" + new Date().toISOString().slice(0, 10), 86400, LIMIT.perDay))) return { error: "busy" };
  const code = code6(), t = now();
  await env.DB.prepare("INSERT OR REPLACE INTO login_codes(email, code_hash, exp, tries, sent_at, sends) VALUES(?,?,?,0,?,1)")
    .bind(email, await sha(email + "|" + code), t + CODE_TTL, t).run();
  await sendMail(env, email, lang, code);
  return { ok: true };
}

// POST /auth/verify {email, code, lang, country, adult, news} → session
export async function authVerify(env, body) {
  await authTables(env);
  const email = String(body.email || "").trim().toLowerCase(), code = String(body.code || "").replace(/\D/g, "");
  const r = await env.DB.prepare("SELECT * FROM login_codes WHERE email=?").bind(email).first();
  if (!r || r.exp < now()) return { error: "expired" };
  if (r.tries >= MAX_TRIES) return { error: "tries" };
  if ((await sha(email + "|" + code)) !== r.code_hash) {
    await env.DB.prepare("UPDATE login_codes SET tries=tries+1 WHERE email=?").bind(email).run();
    return { error: "code", left: MAX_TRIES - r.tries - 1 };
  }
  await env.DB.prepare("DELETE FROM login_codes WHERE email=?").bind(email).run();
  const t = now(), country = String(body.country || "").slice(0, 2).toUpperCase(), lang = String(body.lang || "en").slice(0, 2);
  let u = await env.DB.prepare("SELECT * FROM users WHERE email=?").bind(email).first(), isNew = false;
  if (!u) {
    if (!body.adult) return { error: "adult" };
    isNew = true;
    await env.DB.prepare("INSERT INTO users(email, lang, country, created_at, last_seen, news, ref_code) VALUES(?,?,?,?,?,?,?)")
      .bind(email, lang, country, t, t, body.news ? 1 : 0, rnd(4)).run();
    u = await env.DB.prepare("SELECT * FROM users WHERE email=?").bind(email).first();
    await env.DB.batch([
      env.DB.prepare("INSERT INTO consents(user_id, kind, value, ts, country, text_version) VALUES(?,?,?,?,?,?)").bind(u.id, "adult", 1, t, country, "2026-11-02"),
      env.DB.prepare("INSERT INTO consents(user_id, kind, value, ts, country, text_version) VALUES(?,?,?,?,?,?)").bind(u.id, "news", body.news ? 1 : 0, t, country, "2026-11-02"),
      env.DB.prepare("INSERT OR IGNORE INTO credits(user_id, ts, kind, amount, day) VALUES(?,?,?,?,?)").bind(u.id, t, "signup", CREDITS.signup, "once"),
      env.DB.prepare("INSERT INTO audit(ts, who, action, target) VALUES(?,?,?,?)").bind(t, "user:" + u.id, "signup", email),
    ]);
    // καλωσόρισμα: αν αποτύχει, η εγγραφή δεν χαλάει (καταγράφεται στο audit)
    try { await sendWelcome(env, email, lang); }
    catch (e) { await env.DB.prepare("INSERT INTO audit(ts, who, action, target, detail) VALUES(?,?,?,?,?)").bind(t, "system", "welcome_fail", email, String(e.message).slice(0, 200)).run(); }
  }
  if (u.status !== "active") return { error: "blocked" };
  const token = rnd(32);
  await env.DB.prepare("INSERT INTO sessions(token_hash, user_id, created_at, exp) VALUES(?,?,?,?)").bind(await sha(token), u.id, t, t + SESSION_TTL).run();
  return { ok: true, token, isNew, maxAge: SESSION_TTL };
}

export async function userFrom(env, token) {
  if (!token || token.length < 32) return null;
  await authTables(env);
  return env.DB.prepare(`SELECT u.* FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.exp>? AND u.status='active'`)
    .bind(await sha(token), now()).first();
}

// GET /auth/me → στοιχεία + credits (και +10 για την πρώτη επίσκεψη της μέρας)
export async function authMe(env, token) {
  const u = await userFrom(env, token);
  if (!u) return { user: null };
  const t = now(), day = new Date().toISOString().slice(0, 10);
  await env.DB.batch([
    env.DB.prepare("UPDATE users SET last_seen=? WHERE id=?").bind(t, u.id),
    env.DB.prepare("INSERT OR IGNORE INTO credits(user_id, ts, kind, amount, day) VALUES(?,?,?,?,?)").bind(u.id, t, "visit", CREDITS.visit, day),
  ]);
  const c = await env.DB.prepare("SELECT COALESCE(SUM(amount),0) s FROM credits WHERE user_id=?").bind(u.id).first();
  return { user: { email: u.email, credits: c.s, since: u.created_at, ref: u.ref_code, tg: !!u.tg_id } };
}

export async function authLogout(env, token) {
  if (token) await env.DB.prepare("DELETE FROM sessions WHERE token_hash=?").bind(await sha(token)).run();
  return { ok: true };
}

// GET /auth/vip?date= → τα VIP tips της μέρας ανοιχτά, μόνο για συνδεδεμένο χρήστη (ίδια σειρά με το /api/day)
export async function authVip(env, token, from, to) {
  const u = await userFrom(env, token);
  if (!u) return { error: "login" };
  const r = await env.DB.prepare(`SELECT t.rowid rid, t.fixture_id, t.sel, t.price, t.prob, t.reason, t.result, t.min_price, t.created_at FROM tips t JOIN fixtures f ON f.id=t.fixture_id
    WHERE f.ts BETWEEN ? AND ? AND t.tier='vip' AND t.status!='withdrawn' ORDER BY t.rowid`).bind(from, to).all();
  return { tips: r.results };
}
