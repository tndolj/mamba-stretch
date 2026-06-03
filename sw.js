/* Mamba Stretch — service worker
   precache app shell, offline-first navigations, runtime-cache assets + fonts */
const CACHE = 'mamba-v3';
const SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // navigations: network-first, fall back to cached shell when offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => {
          caches.open(CACHE).then(c => c.put('/', res.clone()));
          return res;
        })
        .catch(() => caches.match('/').then(r => r || caches.match('/index.html')))
    );
    return;
  }

  // everything else (assets, Google Fonts): cache-first, then network + cache
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      // cache same-origin and font responses (opaque cross-origin included)
      const url = new URL(req.url);
      const cacheable = url.origin === location.origin ||
        url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';
      if (cacheable && (res.ok || res.type === 'opaque')) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => cached))
  );
});
