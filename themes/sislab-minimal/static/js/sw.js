self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch('https://www.meganii.com/pwa'));

    // Immediately start downloading the actual resource.
    fetch(event.request.url);
  }
});