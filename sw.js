const CACHE_NAME = "static-v1.0.3"; // Cambia versione ad ogni release per mostrare messaggio banner per aggiornare la PWA

self.addEventListener("install", e =>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                "./",
                "./style.css",
                "./apple-touch-icon.webp",
                "./images/left-arrow.png",
                "./images/home.png",
                "./images/crypt.png",
                "./images/qrcode.png",
                "./images/time.png",
                "./images/zoom-in.png",
                "./images/login.png",
                "./images/logo-unico.jpeg",
                "./videos/loader2.mp4",
            ])
        })
    );
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
});

// Notifica aggiornamento (da gestire nel client)
self.addEventListener("message", event => {
    if (event.data === "SKIP_WAITING") {
        self.skipWaiting();
    }
});