const cacheStorageName = "suki-cache-storage"
const assets = [
  "/",
  "/css/style.css",
  "/js/app.js",
  "/images/background/*",
  "/images/stickers/*",
  "/images/icons/*",
]

// Cache Assets
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(cacheStorageName).then(cache => {
      cache.addAll(assets)
    })
  )
})

// Get Cache Access
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
