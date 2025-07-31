const CACHE_NAME = 'custom-app-launcher-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/settings.html',
  '/manifest.json',
  '/default-icon.png',
  '/style.css',
  '/app1.html'
  '/app2.html'
  '/app3.html'
  '/app4.html'
  '/app5.html'
  '/app6.html'
  '/app7.html'
  '/app8.html'
  '/app9.html'
  '/app10.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
