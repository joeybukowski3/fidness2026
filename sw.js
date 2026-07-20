const CACHE_NAME = 'pro-trainer-elite-v15-schedule-fasting-merge';
const ASSETS = [
  './',
  './index.html',
  './manifest.json?v=7',
  './css/mission-dashboard.css?v=2',
  './js/state-schema.js?v=2',
  './js/performance-program.js?v=1',
  './js/program-data.js?v=9',
  './js/mission-records.js?v=2',
  './js/mission-dashboard.js?v=2',
  './js/coach.js?v=2',
  './assets/diagrams/placeholder.svg'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
    ])
  );
});

async function injectCoachScript(response) {
  if (!response) return response;
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) return response;

  const html = await response.text();
  if (html.includes('js/coach.js')) {
    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  }

  const script = '<script src="./js/coach.js?v=2" defer></script>';
  const updatedHtml = html.includes('</body>')
    ? html.replace('</body>', `${script}\n</body>`)
    : `${html}\n${script}`;
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  headers.delete('content-encoding');
  headers.set('cache-control', 'no-cache');

  return new Response(updatedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isHtmlRequest = event.request.mode === 'navigate' ||
    (event.request.headers.get('accept') || '').includes('text/html');
  const isAppShell = url.origin === self.location.origin &&
    (url.pathname.endsWith('/') || url.pathname.endsWith('/index.html'));

  if (isHtmlRequest) {
    event.respondWith((async () => {
      try {
        const networkResponse = await fetch(event.request);
        const response = isAppShell ? await injectCoachScript(networkResponse) : networkResponse;
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      } catch {
        const cached = await caches.match(event.request) || await caches.match('./index.html');
        return isAppShell ? injectCoachScript(cached) : cached;
      }
    })());
    return;
  }

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
