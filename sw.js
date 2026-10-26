/* PSPO Prep service worker: precache the app shell, cache Google Fonts at runtime. */
const VERSION = 'pspo-prep-v1';
const FONT_CACHE = 'pspo-prep-fonts';
const SHELL = [
  './',
  'index.html',
  'css/app.css',
  'js/app.js',
  'data/syllabus.js',
  'data/questions-1.js',
  'data/questions-2.js',
  'manifest.webmanifest',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONT_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(caches.open(FONT_CACHE).then(async cache => {
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
      return res;
    }));
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Pages: network first so updates show up, fall back to the cached shell offline.
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match('index.html')));
    return;
  }

  // Assets: cache first, refresh in the background.
  event.respondWith(caches.match(req).then(hit => {
    const fresh = fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit);
    return hit || fresh;
  }));
});
