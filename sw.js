// Brandmeld Gids - Service Worker
// Minimaal: alleen PWA installatie inschakelen, GEEN caching
// zodat automatische updates via Firebase altijd live blijven

const CACHE_NAME = 'brandmeld-gids-v1';

// Bij installatie: sla alleen de shell op (niet de data)
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Bij activatie: oude caches opruimen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch: altijd netwerk eerst — live data blijft gegarandeerd
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});
