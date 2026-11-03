// betizzi service worker (03/11/2026): η σελίδα ανοίγει και χωρίς σήμα (τελευταία έκδοση της αρχικής από την cache).
// Δίκτυο πρώτα (με navigation preload για ταχύτητα)· κρατάμε ΜΟΝΟ τις αρχικές /xx/ χωρίς query (το πολύ 9 σελίδες).
// Δεν αγγίζουμε auth, admin, μετρήσεις και live δεδομένα.
const C = "bz-v2";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== C) await caches.delete(k);
  if (self.registration.navigationPreload) await self.registration.navigationPreload.enable();
  await self.clients.claim();
})()));
const home = (u) => /^\/[a-z]{2}\/$/.test(u.pathname);
self.addEventListener("fetch", (e) => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return;
  if (/^\/(auth\/|admin|h$|me\.json|vip\.json|live\.json|goals\.json)/.test(u.pathname)) return;
  if (r.mode !== "navigate") return;
  const lang = (u.pathname.match(/^\/([a-z]{2})\//) || [])[1] || "en";
  const key = new Request(u.origin + "/" + lang + "/");
  e.respondWith((async () => {
    try {
      const res = (await e.preloadResponse) || (await fetch(r));
      if (res.ok && home(u) && !u.searchParams.has("d")) { const cp = res.clone(); e.waitUntil(caches.open(C).then((c) => c.put(key, cp))); }
      return res;
    } catch (err) {
      return (await caches.match(key)) || Response.error();
    }
  })());
});
