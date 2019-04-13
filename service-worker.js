const CACHE_NAME = "tafsirq-3";
var urlsToCache = [
  "/",
  "/favicon.ico",
  "/nav.html",
  "/index.html",
  "/pages/doa.html",
  "/pages/hadits.html",
  "/pages/home.html",
  "/pages/quran.html",
  "/pages/artikel.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/api.js",
  "/js/nav.js",
  "/js/main.js",
  "/img/logo-tafsirq.png",
  "/img/banner.jpg",
  "/img/doa-orang-tua.jpg",
  "/img/icons/icon-72x72.png",
  "/img/icons/icon-96x96.png",
  "/img/icons/icon-128x128.png",
  "/img/icons/icon-144x144.png",
  "/img/icons/icon-152x152.png",
  "/img/icons/icon-192x192.png",
  "/img/icons/icon-384x384.png",
  "/img/icons/icon-512x512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, {cacheName: CACHE_NAME})
      .then(function (response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
