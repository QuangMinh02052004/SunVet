// VetDose service worker — cài app + chạy offline (phần khung).
const CACHE = 'sunvet-v4';
const CORE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Dữ liệu thuốc luôn lấy mới từ mạng (không cache API).
  if (url.pathname.startsWith('/api/')) {
    e.respondWith(fetch(request).catch(() => new Response('[]', { headers: { 'Content-Type': 'application/json' } })));
    return;
  }

  // Khung giao diện: ưu tiên cache, có mạng thì cập nhật ngầm.
  e.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request).then((res) => {
        if (res && res.status === 200 && url.origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
