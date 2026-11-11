// Runs before React so navigation always gives feedback, even before hydration.
export const navigationBootstrap = String.raw`(() => {
  const root = document.documentElement;
  let pendingTimer;
  function reset() {
    clearTimeout(pendingTimer);
    root.removeAttribute('data-navigation-pending');
  }
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
    reset();
    root.setAttribute('data-navigation-pending', 'true');
    pendingTimer = setTimeout(reset, 30000);
    // A later application listener may cancel this click.
    queueMicrotask(() => { if (event.defaultPrevented) reset(); });
  });
  addEventListener('pageshow', reset);
  // Use browser-managed preparation: activation reuses the already rendered document.
  // Unsupported browsers retain normal links and the lightweight document prefetch.
  const connection = navigator.connection;
  if (HTMLScriptElement.supports?.('speculationrules') && !connection?.saveData && !/^(slow-)?2g$/.test(connection?.effectiveType || '')) {
    const rules = document.createElement('script');
    rules.type = 'speculationrules';
    rules.textContent = JSON.stringify({
      prefetch: [{urls: ['/resume/', '/about/'].filter(path => path !== location.pathname), eagerness: 'eager'}],
      prerender: [...(location.pathname === '/' ? [{urls: ['/resume/'], eagerness: 'eager'}] : []), {source: 'document', where: {and: [
      {href_matches: ['/', '/about/', '/resume/']},
      {selector_matches: 'a[data-static-navigation]'},
      {not: {selector_matches: '[download], [target="_blank"]'}}
    ]}, eagerness: 'moderate'}]});
    document.head.appendChild(rules);
  }
})();`;
