/* Imported into the generated service worker (vite.config.ts → workbox.importScripts).
   Tapping the daily summary focuses the app (or opens it) on Today. */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((c) => 'focus' in c);
      // The worker's scope is the app's base path ('/' in dev, '/verdant/' on GitHub Pages).
      const home = self.registration.scope;
      if (existing) return existing.focus().then((w) => (w && 'navigate' in w ? w.navigate(home) : undefined));
      return self.clients.openWindow(home);
    }),
  );
});
