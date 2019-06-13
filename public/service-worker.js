const CACHE_NAME = "firstpwa-2"
const urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js"
]

self.addEventListener("install",(event)=>{
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache)=>{
          return cache.addAll(urlsToCache)
      })
    )
})

self.addEventListener("fetch",(event)=>{
    event.respondWith(
      caches.match(event.request, {
          cacheName: CACHE_NAME
      }).then((res)=>{
          if(res){
            console.log("Service Worker using assets from cache : ", res.url)
            return res
          }

          console.log("Service Worker using assers from server : ", event.request.url)
          return fetch(event.request)
      })
    )
})

// penghapusan cache lama agar tidak membebani cache storage browser
self.addEventListener("activate",(event)=>{
    event.waitUntil(
      // caches.keys : array of Cache keys
        caches.keys().then((cacheNames)=>{
          return Promise.all(
              cacheNames.map((cache)=>{
                  if(cache != CACHE_NAME){
                    console.log("Service Worker : cache "+ cache +" deleted")
                    return caches.delete(cache)
                  }
              })
          )
        })
    )
})