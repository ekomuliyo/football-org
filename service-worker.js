importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([
    {url: '/', revision: '1' },
    {url: '/index.html', revision: '1' },
    {url: '/club-detail.html', revision: '1' },
], {
    // Ignore all URL parameters.
    ignoreURLParametersMatching: [/.*/]
});

// images
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
        }),
      ],
    }),
);

// js
workbox.routing.registerRoute(
    new RegExp('.+\\.js$'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName : 'js'
    })
);

// manifest json
workbox.routing.registerRoute(
    new RegExp('.+\\.json$'),
    new workbox.strategies.CacheFirst({
        cacheName : 'manifest'
    })
);

// request ke api
try {
    workbox.routing.registerRoute(
        ({url}) => url.pathname.startsWith('/v2/'),
        new workbox.strategies.CacheFirst({
            cacheName: 'api-football',
            plugins: [
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200],
                    'X-Is-Cacheable': 'true'
                })
            ]
        })
    );    
} catch (error) {
    
}

// push notif api
self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
  
    const options = {
      body: body,
      icon: '/assets/icon-128x128.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
  
    event.waitUntil(
      self.registration.showNotification('Ada Notifikasi Baru :)', options)
    );
  });

  self.__WB_MANIFEST;