/**
 * 생활계산기.com Service Worker
 *
 * 전략: Network-First + Cache Fallback + Offline Page
 * - HTML 문서: 네트워크 우선 → 캐시 → offline.html
 * - 정적 자산(JS/CSS/폰트/이미지): Stale-While-Revalidate
 * - API / live-data: 네트워크 우선, 캐시 미사용
 *
 * 버전 변경 시 CACHE_VERSION 만 올리면 자동 롤오버.
 */

const CACHE_VERSION = 'v2026-04-14-3';
const STATIC_CACHE = `lc-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `lc-runtime-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

// 설치 시 미리 캐시할 핵심 자산
const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.svg',
  '/favicon-32.png',
  '/apple-touch-icon.png',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg'
];

// 네트워크 우선 경로 (실시간 성격)
const NETWORK_ONLY_PATHS = [
  '/data/live-data.json'
];

// 설치: 핵심 자산 프리캐시
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      // 개별 add 로 실패 허용 (일부 자산이 없어도 설치 진행)
      await Promise.all(
        PRECACHE_URLS.map(url =>
          cache.add(new Request(url, {cache: 'reload'})).catch(() => {})
        )
      );
      await self.skipWaiting();
    })()
  );
});

// 활성화: 구버전 캐시 정리
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter(n => n.startsWith('lc-') && n !== STATIC_CACHE && n !== RUNTIME_CACHE)
          .map(n => caches.delete(n))
      );
      await self.clients.claim();
    })()
  );
});

// 요청 유형별 전략
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 외부 origin (분석/광고 등)은 건드리지 않음
  if (url.origin !== self.location.origin) return;

  // chrome-extension, data URL 등 제외
  if (!url.protocol.startsWith('http')) return;

  // 네트워크 전용 경로
  if (NETWORK_ONLY_PATHS.some(p => url.pathname.startsWith(p))) {
    event.respondWith(fetch(req).catch(() => new Response('{}', {
      status: 200,
      headers: {'Content-Type': 'application/json'}
    })));
    return;
  }

  // HTML 문서: 네트워크 우선 → 캐시 → offline.html
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      (async () => {
        try {
          const networkRes = await fetch(req);
          // 성공 시 runtime 캐시에 저장
          if (networkRes && networkRes.status === 200 && networkRes.type !== 'opaque') {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(req, networkRes.clone());
          }
          return networkRes;
        } catch (e) {
          // 네트워크 실패 → 캐시 확인
          const cached = await caches.match(req);
          if (cached) return cached;
          // 캐시도 없음 → offline.html
          const offline = await caches.match(OFFLINE_URL);
          return offline || new Response('오프라인 상태입니다.', {
            status: 503,
            headers: {'Content-Type': 'text/plain; charset=utf-8'}
          });
        }
      })()
    );
    return;
  }

  // 정적 자산 (JS/CSS/폰트/이미지): Stale-While-Revalidate
  if (
    req.destination === 'script' ||
    req.destination === 'style' ||
    req.destination === 'image' ||
    req.destination === 'font' ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/terms/')
  ) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME_CACHE);
        const cached = await cache.match(req);
        const networkPromise = fetch(req)
          .then(res => {
            if (res && res.status === 200 && res.type !== 'opaque') {
              cache.put(req, res.clone());
            }
            return res;
          })
          .catch(() => null);
        return cached || (await networkPromise) || new Response('', {status: 503});
      })()
    );
    return;
  }

  // 그 외: 기본 fetch (캐시 미사용)
});

// 메시지 리스너 (클라이언트에서 SKIP_WAITING 등 트리거)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
