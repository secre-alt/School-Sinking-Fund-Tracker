const CACHE_NAME = "fund-tracker-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/main.css",
  "/assets/fonts.css",
  "/fonts/Poppins-Regular.ttf",
  "/fonts/Poppins-Medium.ttf",
  "/fonts/Poppins-SemiBold.ttf",
  "/fonts/Poppins-Bold.ttf"
];

// Install SW and cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve from cache first
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
