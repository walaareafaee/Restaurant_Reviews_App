const cacheName = "static-v1";
const db = ["./",
  "./index.html",
  "./restaurant.html",
  "./css/styles.css",
  "./data/restaurants.json",
  "./js/dbhelper.js",
  "./js/main.js",
  "./js/restaurant_info.js",
  "./img/1.jpg",
  "./img/2.jpg",
  "./img/3.jpg",
  "./img/4.jpg",
  "./img/5.jpg",
  "./img/6.jpg",
  "./img/7.jpg",
  "./img/8.jpg",
  "./img/9.jpg",
  "./img/10.jpg",
  "https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('cacheName').then(function (cache) {
      return cache.addAll(db);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return (
              cacheName.startsWith("cacheName") &&
              cacheName != staticCacheName
            );
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then(function(response) {
        let responseClone = response.clone();
        caches.open('v1').then(function(cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    }).catch(function(error) {
      console.log(error);
    })
  );
});