/**
 * Hash-based SPA Router
 */
const routes = {};
let currentCleanup = null;

export function route(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.location.hash = '#' + path;
}

export function currentRoute() {
  const hash = window.location.hash.slice(1) || '/home';
  return hash;
}

export function startRouter() {
  const handleRoute = async () => {
    if (currentCleanup) {
      currentCleanup();
      currentCleanup = null;
    }
    const path = currentRoute();
    const handler = routes[path] || routes['/home'];
    if (handler) {
      const cleanup = await handler();
      if (typeof cleanup === 'function') {
        currentCleanup = cleanup;
      }
    }
  };

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
