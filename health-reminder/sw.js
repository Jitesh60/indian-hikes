// Service worker: offline app shell + notification button handling.
const CACHE = 'health-reminder-v1';
const SHELL = ['./', 'index.html', 'styles.css', 'app.js', 'manifest.webmanifest', 'icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Network first so updates show up straight away; fall back to the cache offline.
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request, { ignoreSearch: true })),
  );
});

self.addEventListener('notificationclick', (event) => {
  const { fkey } = event.notification.data || {};
  const action = event.action || 'open';
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const client = clients[0];
      if (client) {
        if (fkey && action !== 'open') client.postMessage({ type: 'notification-action', action, fkey });
        return client.focus();
      }
      const query = fkey && action !== 'open' ? `?action=${encodeURIComponent(action)}&fkey=${encodeURIComponent(fkey)}` : '';
      return self.clients.openWindow(`./${query}`);
    }),
  );
});
