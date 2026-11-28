/*
 * Offline Builder service worker.
 *
 * Caches the app shell and immutable build assets so a prepared document can be
 * opened after a reload with the network down. It never caches API responses:
 * document content lives in IndexedDB and the server stays the source of truth.
 */
const CACHE = "revercue-shell-v1";
const SHELL = ["/", "/offline-editor", "/index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL).catch(() => undefined))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  // Navigations: network first so a deploy is picked up, cache as the fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => undefined);
          return response;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match("/index.html")) || Response.error()),
    );
    return;
  }

  // Static assets are content-hashed, so cache first is safe and fast.
  event.respondWith(
    caches.match(request).then(
      (hit) =>
        hit ||
        fetch(request)
          .then((response) => {
            if (response.ok && (url.pathname.startsWith("/assets/") || /\.(css|js|woff2?|png|jpg|jpeg|svg|webp)$/.test(url.pathname))) {
              const copy = response.clone();
              caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => undefined);
            }
            return response;
          })
          .catch(() => Response.error()),
    ),
  );
});
