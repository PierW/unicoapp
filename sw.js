self.addEventListener("install", e =>{
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "./",
                "./style.css",
                "./apple-touch-icon.png",
                "./images/left-arrow.png",
                "./images/home.png",
                "./images/crypt.png",
                "./images/qrcode.png",
                "./images/time.png",
                "./images/zoom-in.png",
                "./images/login.png",
                "./images/logo-unico.jpeg",
                "./videos/loader.mp4",
            ])
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
});