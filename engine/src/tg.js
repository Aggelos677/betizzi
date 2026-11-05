// Telegram (απόφαση Owner 03/11/2026)
//  - Δημόσιο κανάλι φίλων: @betizzi_tips (νέα, νίκες παρολί, μηνιαίο report).
//  - Ιδιωτικό κανάλι «betizzi ⚡ Strongest»: κάθε πρωί τα δυνατά της ημέρας, μόλις βγουν (ώρα: releaseMin, απόφαση Owner 05/11).
//    Μπαίνει όποιος εξαργυρώσει 1000 credits = 30 μέρες. Ο bot δίνει προσωπικό link μίας χρήσης
//    και βγάζει όποιον λήξει. Τα αποτελέσματα ΔΕΝ ποστάρονται καθημερινά (μόνο μηνιαία αναφορά).
// Bot: @betizzi_tips_bot · token στο secret TG_BOT_TOKEN (ποτέ στον κώδικα).
import { apiStrong, athH } from "./strong.js";

const now = () => Math.floor(Date.now() / 1000);
const DAY = 86400;
export const TG = { price: 1000, days: 30, publicChat: "@betizzi_tips" };
const SEL = { "1": "Home win (1)", "2": "Away win (2)", X: "Draw (X)", O25: "Over 2.5", U25: "Under 2.5", GG: "GG (both teams score)", NG: "NG" };

async function kvInit(env) {
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS kv(k TEXT PRIMARY KEY, v TEXT)").run();
  for (const col of ["tg_until INTEGER", "tg_out INTEGER"]) { try { await env.DB.prepare("ALTER TABLE users ADD COLUMN " + col).run(); } catch (e) { /* υπάρχει */ } }
}
const kvGet = async (env, k) => (await env.DB.prepare("SELECT v FROM kv WHERE k=?").bind(k).first())?.v ?? null;
const kvSet = (env, k, v) => env.DB.prepare("INSERT OR REPLACE INTO kv(k, v) VALUES(?,?)").bind(k, String(v)).run();

export async function tg(env, method, params = {}) {
  if (!env.TG_BOT_TOKEN) throw new Error("TG_BOT_TOKEN missing");
  const r = await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/${method}`, {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(params),
  });
  const j = await r.json().catch(() => ({}));
  if (!j.ok) throw new Error(`tg ${method}: ${j.description || r.status}`);
  return j.result;
}

// Κάθε λεπτό: διαβάζει τα νέα γεγονότα του bot (χωρίς webhook).
//  - ο bot έγινε admin σε κανάλι → κρατάμε το id (δημόσιο / ιδιωτικό)
//  - μέλος μπήκε στο ιδιωτικό με προσωπικό link «u:<id>» → συνδέουμε τον λογαριασμό με το Telegram id του
//  - /start στον bot → σύντομη απάντηση με το link του site
export async function tgPoll(env) {
  if (!env.TG_BOT_TOKEN) return { skip: true };
  await kvInit(env);
  const off = +(await kvGet(env, "tg_off")) || 0;
  let ups;
  try { ups = await tg(env, "getUpdates", { offset: off, timeout: 0, allowed_updates: ["my_chat_member", "chat_member", "message", "channel_post"] }); }
  catch (e) { await env.DB.prepare("INSERT INTO runs(ts,job,ok,calls,note) VALUES(?,?,?,?,?)").bind(now(), "tg", 0, 0, String(e.message).slice(0, 300)).run(); return { error: e.message }; }
  let last = off - 1;
  for (const u of ups) {
    last = Math.max(last, u.update_id);
    try {
      const mc = u.my_chat_member;
      if (mc && mc.chat && mc.chat.type === "channel" && ["administrator"].includes(mc.new_chat_member?.status)) {
        const key = (mc.chat.username || "").toLowerCase() === TG.publicChat.slice(1) ? "tg_chan_public" : "tg_chan_vip";
        await kvSet(env, key, mc.chat.id);
        await kvSet(env, key + "_title", mc.chat.title || "");
      }
      // οποιοδήποτε post στο κανάλι (π.χ. ο Owner γράφει «hi») → κρατάμε το id του καναλιού
      const cp = u.channel_post;
      if (cp && cp.chat) {
        const pub = (cp.chat.username || "").toLowerCase() === TG.publicChat.slice(1);
        if (pub || /strongest/i.test(cp.chat.title || "")) { const key = pub ? "tg_chan_public" : "tg_chan_vip"; await kvSet(env, key, cp.chat.id); await kvSet(env, key + "_title", cp.chat.title || ""); }
      }
      const cm = u.chat_member;
      if (cm && String(cm.chat.id) === (await kvGet(env, "tg_chan_vip")) && cm.new_chat_member?.status === "member") {
        const nm = cm.invite_link?.name || "";
        const m = nm.match(/^u:(\d+)$/);
        if (m) {
          await env.DB.prepare("UPDATE users SET tg_id=?, tg_out=0 WHERE id=?").bind(String(cm.new_chat_member.user.id), +m[1]).run();
          await env.DB.prepare("INSERT INTO audit(ts, who, action, target) VALUES(?,?,?,?)").bind(now(), "user:" + m[1], "tg_join", String(cm.new_chat_member.user.id)).run();
        }
      }
      const msg = u.message;
      if (msg && msg.chat?.type === "private" && /^\/start/.test(msg.text || "")) {
        await tg(env, "sendMessage", { chat_id: msg.chat.id, disable_web_page_preview: true,
          text: "👋 Welcome to betizzi!\n\nFree football tips, ready-made parlays and live scores: https://betizzi.com\n\n⚡ Our strongest picks every morning are in a members-only channel: collect 1000 credits on betizzi.com and tap «Join ⚡ Strongest» in your account.\n\n18+ · Play responsibly." });
      }
    } catch (e) { /* ένα κακό γεγονός δεν σταματά τα υπόλοιπα */ }
  }
  if (ups.length) await kvSet(env, "tg_off", last + 1);
  if (ups.length) await env.DB.prepare("INSERT INTO runs(ts,job,ok,calls,note) VALUES(?,?,?,?,?)").bind(now(), "tg", 1, 1, ups.length + " updates").run();
  return { updates: ups.length };
}

// Εξαργύρωση: 1000 credits → 30 μέρες στο ιδιωτικό κανάλι + προσωπικό link μίας χρήσης (24 ώρες).
// Αν η συνδρομή τρέχει ακόμα, δίνει νέο link χωρίς χρέωση.
export async function tgJoin(env, user) {
  await kvInit(env);
  const chat = await kvGet(env, "tg_chan_vip");
  if (!env.TG_BOT_TOKEN || !chat) return { error: "tg_off" };
  const t = now(), u = await env.DB.prepare("SELECT id, tg_until FROM users WHERE id=?").bind(user.id).first();
  let until = u.tg_until || 0, charged = false;
  if (until <= t) {
    const bal = (await env.DB.prepare("SELECT COALESCE(SUM(amount),0) s FROM credits WHERE user_id=?").bind(u.id).first()).s;
    if (bal < TG.price) return { error: "credits", need: TG.price, have: bal };
    until = t + TG.days * DAY;
    const day = new Date().toISOString().slice(0, 10);
    const r = await env.DB.prepare("INSERT OR IGNORE INTO credits(user_id, ts, kind, amount, ref, day) VALUES(?,?,?,?,?,?)").bind(u.id, t, "tg_month", -TG.price, "strong", day).run();
    if (!(r.meta && r.meta.changes)) return { error: "busy" };
    await env.DB.prepare("UPDATE users SET tg_until=?, tg_out=0 WHERE id=?").bind(until, u.id).run();
    await env.DB.prepare("INSERT INTO audit(ts, who, action, target) VALUES(?,?,?,?)").bind(t, "user:" + u.id, "tg_month", String(until)).run();
    charged = true;
  }
  const link = await tg(env, "createChatInviteLink", { chat_id: chat, name: "u:" + u.id, member_limit: 1, expire_date: t + DAY });
  // αν τον είχαμε βγάλει παλιότερα (λήξη), τον «ξεμπλοκάρουμε» για να μπορεί να ξαναμπεί
  const me = await env.DB.prepare("SELECT tg_id FROM users WHERE id=?").bind(u.id).first();
  if (me?.tg_id) { try { await tg(env, "unbanChatMember", { chat_id: chat, user_id: +me.tg_id, only_if_banned: true }); } catch (e) {} }
  const bal = (await env.DB.prepare("SELECT COALESCE(SUM(amount),0) s FROM credits WHERE user_id=?").bind(u.id).first()).s;
  return { ok: true, link: link.invite_link, until, charged, credits: bal };
}

// Κάθε ώρα: όσοι έληξαν βγαίνουν από το ιδιωτικό κανάλι (ban + unban = kick, μπορούν να ξαναμπούν με νέα εξαργύρωση).
export async function tgExpire(env) {
  if (!env.TG_BOT_TOKEN) return { skip: true };
  await kvInit(env);
  const chat = await kvGet(env, "tg_chan_vip");
  if (!chat) return { skip: true };
  const list = (await env.DB.prepare("SELECT id, tg_id FROM users WHERE tg_id IS NOT NULL AND tg_until>0 AND tg_until<? AND COALESCE(tg_out,0)=0 LIMIT 50").bind(now()).all()).results;
  let n = 0;
  for (const u of list) {
    try {
      await tg(env, "banChatMember", { chat_id: chat, user_id: +u.tg_id, until_date: now() + 60 });
      await tg(env, "unbanChatMember", { chat_id: chat, user_id: +u.tg_id, only_if_banned: true });
      await env.DB.prepare("UPDATE users SET tg_out=1 WHERE id=?").bind(u.id).run();
      try { await tg(env, "sendMessage", { chat_id: +u.tg_id, text: "⏳ Your month of ⚡ betizzi Strongest has ended. Collect 1000 credits on https://betizzi.com to join again. Thanks for being with us!" }); } catch (e) {}
      n++;
    } catch (e) { /* συνεχίζουμε με τους υπόλοιπους */ }
  }
  return { kicked: n };
}

// Μόλις βγουν τα δυνατά της ημέρας: στο ιδιωτικό κανάλι (μία φορά τη μέρα).
export async function tgPostStrong(env, date = new Date().toISOString().slice(0, 10)) {
  if (!env.TG_BOT_TOKEN || athH() < 8) return { skip: true }; // 05/11: όταν βγουν τα δυνατά (ώρα ανάλογα με τα χθεσινά)
  await kvInit(env);
  const chat = await kvGet(env, "tg_chan_vip");
  if (!chat || (await kvGet(env, "tg_post_" + date))) return { skip: true };
  const s = await apiStrong(env, date);
  if (!s) return { skip: true, why: "no strong" };
  const hm = (ts) => new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Athens", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(ts * 1000);
  const line = (x) => `${x.home} – ${x.away} · ${hm(x.ts)}\n👉 <b>${SEL[x.sel] || x.sel}</b> @ <b>${(+x.price).toFixed(2)}</b>`;
  const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const parts = [`⚡ <b>betizzi · Today's strongest</b> (${date.split("-").reverse().join("/")})`];
  if (s.win) parts.push(`🏆 <b>Win</b> · ${esc(s.win.league || "")}\n${esc(line(s.win)).replace(/&lt;(\/?)b&gt;/g, "<$1b>")}`);
  if (s.goals) parts.push(`⚽ <b>Goals</b> · ${esc(s.goals.league || "")}\n${esc(line(s.goals)).replace(/&lt;(\/?)b&gt;/g, "<$1b>")}`);
  if (s.treble) parts.push(`🎯 <b>Treble x${(+s.treble.odds).toFixed(2)}</b>\n` + s.treble.legs.map((x) => "• " + esc(`${x.home} – ${x.away} · ${hm(x.ts)} · ${SEL[x.sel] || x.sel} @ ${(+x.price).toFixed(2)}`)).join("\n"));
  parts.push("Times: Athens/Cyprus. Odds can change. 18+ · Bet only what you can afford to lose.\nhttps://betizzi.com");
  await tg(env, "sendMessage", { chat_id: chat, text: parts.join("\n\n"), parse_mode: "HTML", disable_web_page_preview: true });
  await kvSet(env, "tg_post_" + date, now());
  return { ok: true };
}

export async function tgStatus(env) {
  await kvInit(env);
  const me = env.TG_BOT_TOKEN ? await tg(env, "getMe").catch((e) => ({ error: e.message })) : null;
  return { bot: me && (me.username || me.error), public: await kvGet(env, "tg_chan_public"), vip: await kvGet(env, "tg_chan_vip"), vipTitle: await kvGet(env, "tg_chan_vip_title") };
}
