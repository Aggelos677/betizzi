// betizzi service worker (03/11/2026): η σελίδα ανοίγει και χωρίς σήμα (τελευταία έκδοση από την cache).
// Δίκτυο πρώτα για τις σελίδες· δεν αγγίζουμε auth, admin, μετρήσεις και live δεδομένα.
const C = "bz-v1";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(
  caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== C).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", (e) => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return;
  if (/^\/(auth\/|admin|h$|me\.json|vip\.json|live\.json|goals\.json)/.test(u.pathname)) return;
  if (r.mode === "navigate") {
    e.respondWith(fetch(r).then((res) => { if (res.ok) { const cp = res.clone(); caches.open(C).then((c) => c.put(r, cp)); } return res; })
      .catch(() => caches.match(r).then((m) => m || caches.match("/" + (u.pathname.split("/")[1] || "en") + "/"))));
    return;
  }
  if (u.pathname.startsWith("/icons/")) e.respondWith(caches.match(r).then((m) => m || fetch(r).then((res) => { const cp = res.clone(); caches.open(C).then((c) => c.put(r, cp)); return res; })));
});
