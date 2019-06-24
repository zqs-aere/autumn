self.addEventListener('install', function (event) {
  console.log('V1 installing…')
  event.waitUntil(self.skipWaiting())
});

self.addEventListener('activate', function (event) {
  console.log('V1 now ready to handle fetches!')

  event.waitUntil(Promise.all( // 更新客户端
    [
      self.clients.claim(), // 清理旧版本
      caches.keys().then(function (cacheList) {
        return Promise.all(
          cacheList.map(function (cacheName) {
            console.log(cacheName)
            if (cacheName !== 'my-test-cache-v1') {
              return caches.delete(cacheName)
            }
          })
        )
      })
    ])
  )
})

// self.addEventListener('fetch', event => {
//   const url = new URL(event.request.url);

//   //如果是同域并且请求的是 dog.svg 的话，那么返回 cat.svg
//   if (url.origin == location.origin && url.pathname == '/dog.svg') {
//     event.respondWith(caches.match('/cat.svg'));
//   }
// });