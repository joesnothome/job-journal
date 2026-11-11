const CACHE='job-journal-v2';
const ASSETS=['./','./index.html','./style.css','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./src/app.js','./src/model.js','./src/storage.js','./src/photos.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('job-journal-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));});
