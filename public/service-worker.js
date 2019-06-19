const CACHE_NAME = "firstpwa"
const urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/project.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/css/mystyle.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/manifest.json",
  "/images/icon.png",
  "/images/logo-lolos.png",
  "/images/mobilewebspecialist.jpg",
  "/images/profile.jpg",
  "/images/temu-logo.png"
]

self.addEventListener("install",(event)=>{
  // mengabarkan browser agar tidak menonaktifkan service worker Promise yang dikirim ke dalamnya di resolve atau di reject.
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
            // console.log("Service Worker using assets from cache : ", res.url)
            return res
          }

          // console.log("Service Worker using assers from server : ", event.request.url)
          // jika request tidak tersedia didalam cache, sw mengunduh data yg diminta 
          const fetchRequest = event.request.clone()
          return fetch(fetchRequest).then((res)=>{
            if(!res || res.status !== 200){
              return res 
            }
            
            // menyalin request berupa object response ke cache
            const responseToCache = res.clone()
            caches.open(CACHE_NAME).then((cache)=>{
                cache.put(event.request, responseToCache)
            })

            return res 
          })
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