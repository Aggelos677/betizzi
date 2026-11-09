// betizzi service worker (03/11/2026): η σελίδα ανοίγει και χωρίς σήμα (τελευταία έκδοση της αρχικής από την cache).
// Δίκτυο πρώτα (με navigation preload για ταχύτητα)· κρατάμε ΜΟΝΟ τις αρχικές /xx/ χωρίς query (το πολύ 9 σελίδες).
// Δεν αγγίζουμε auth, admin, μετρήσεις και live δεδομένα.
// 09/11 (Owner: «άσπρη σελίδα μέχρι να ανοίξει»): αν το δίκτυο αργεί πάνω από 1,5΄΄ στην αρχική, δείχνουμε αμέσως την
// κρατημένη σελίδα, ΜΟΝΟ αν είναι της ίδιας μέρας (ώρα Ελλάδας, όπως ο server). Όταν φτάσει η νέα, την κρατάμε και, αν η
// κρατημένη ήταν παλιότερη από 3΄, λέμε στη σελίδα να ανανεωθεί (το κάνει μόνο αν ο χρήστης δεν έχει αγγίξει ακόμα τίποτα).
const C = "bz-v2";
const WAIT = 1500, OLD = 3 * 60000;
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== C) await caches.delete(k);
  if (self.registration.navigationPreload) await self.registration.navigationPreload.enable();
  await self.clients.claim();
})()));
const home = (u) => /^\/[a-z]{2}\/$/.test(u.pathname);
const day = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Athens" }).format(new Date());
async function keep(key, res) {
  const h = new Headers(res.headers);
  h.set("x-bz-day", day()); h.set("x-bz-t", String(Date.now()));
  const c = await caches.open(C);
  await c.put(key, new Response(await res.blob(), { status: res.status, statusText: res.statusText, headers: h }));
}
self.addEventListener("fetch", (e) => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return;
  if (/^\/(auth\/|admin|h$|me\.json|vip\.json|live\.json|goals\.json)/.test(u.pathname)) return;
  if (r.mode !== "navigate") return;
  const lang = (u.pathname.match(/^\/([a-z]{2})\//) || [])[1] || "en";
  const key = new Request(u.origin + "/" + lang + "/");
  const isHome = home(u) && !u.searchParams.has("d");
  e.respondWith((async () => {
    const net = (async () => {
      const res = (await e.preloadResponse) || (await fetch(r));
      if (res.ok && isHome) e.waitUntil(keep(key, res.clone()));
      return res;
    })();
    e.waitUntil(net.catch(() => {}));
    if (isHome) {
      const old = await caches.match(key);
      if (old && old.headers.get("x-bz-day") === day()) {
        const quick = await Promise.race([net.catch(() => null), new Promise((ok) => setTimeout(() => ok("slow"), WAIT))]);
        if (quick && quick !== "slow") return quick;
        // αργό ή χωρίς δίκτυο: η κρατημένη σελίδα της ίδιας μέρας αμέσως
        const age = Date.now() - (+old.headers.get("x-bz-t") || 0);
        if (age > OLD) e.waitUntil(net.then(async (res) => {
          if (!res.ok) return;
          const cl = await self.clients.get(e.resultingClientId || e.clientId);
          if (cl) cl.postMessage({ bz: "fresh" });
        }).catch(() => {}));
        return old;
      }
    }
    try { return await net; }
    catch (err) { return (await caches.match(key)) || Response.error(); }
  })());
});
