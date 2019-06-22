/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}

self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting())
});

self.addEventListener('activate', function (event) {
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
