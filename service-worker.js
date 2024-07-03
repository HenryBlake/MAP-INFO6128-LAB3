// service-worker.js

const CACHE_NAME = "my-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/css/main.css",
  "js/app.js",
  "/asset/favicon_package_v0.16/favicon-32x32.png",
];

self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
          return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
      caches.keys().then(cacheNames => {
          return Promise.all(
              cacheNames.map(cacheName => {
                  if (cacheName !== CACHE_NAME) {
                      return caches.delete(cacheName);
                  }
              })
          );
      })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
      event.respondWith(
          caches.match(event.request).then(response => {
              return response || fetch(event.request).then(networkResponse => {
                  return caches.open(CACHE_NAME).then(cache => {
                      cache.put(event.request, networkResponse.clone());
                      return networkResponse;
                  });
              });
          }).catch(() => {
              return caches.match('/offline.html');
          })
      );
  }
});