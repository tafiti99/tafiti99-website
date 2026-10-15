/* Tafiti99 shared interactions. Uses the site's existing blue/teal identity. */
(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.getElementById('mainNav');
  const targetSelector = '[data-reveal], body > section:not(.hero-section), .stat-card, .founder-card, .service-card, .timeline-item, .project-card';
  const observed = new WeakSet();

  const updateNav = () => {
    if (nav) nav.classList.toggle('navbar-scrolled', window.scrollY > 20);
  };
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  document.querySelectorAll('.current-year').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const makeVisible = (element) => {
    element.classList.add('is-visible');
  };

  let observer = null;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          makeVisible(entry.target);
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  }

  const observeElement = (element, index = 0) => {
    if (!(element instanceof Element) || observed.has(element)) return;
    observed.add(element);

    if (!observer) {
      makeVisible(element);
      return;
    }

    element.classList.add('reveal-on-scroll');
    if (element.matches('.stat-card, .founder-card, .service-card, .timeline-item, .project-card')) {
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    }
    observer.observe(element);
  };

  const scanForTargets = (rootNode) => {
    if (!(rootNode instanceof Element) && rootNode !== document) return;
    if (rootNode instanceof Element && rootNode.matches(targetSelector)) {
      observeElement(rootNode, document.querySelectorAll(targetSelector).length);
    }
    if (typeof rootNode.querySelectorAll === 'function') {
      rootNode.querySelectorAll(targetSelector).forEach((element, index) => observeElement(element, index));
    }
  };

  scanForTargets(document);

  // Portfolio and article cards are loaded asynchronously; observe them when they arrive.
  if ('MutationObserver' in window) {
    const contentObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) scanForTargets(node);
        });
      });
    });
    contentObserver.observe(document.body, { childList: true, subtree: true });
  }
})();
