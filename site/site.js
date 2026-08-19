(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Active nav link
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (link) {
    var target = link.getAttribute('href').split('#')[0] || 'index.html';
    if (target === here) link.classList.add('is-active');
  });

  // Header shadow after scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Theme toggle (light/dark) — initial theme is already set by the inline
  // no-flash script in <head>; this just wires up the button.
  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var root = document.documentElement;
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('akin-theme', next); } catch (e) {}
    });
  }

  // Scroll reveal
  if (!reduceMotion) {
    var targets = document.querySelectorAll(
      '.solutions, .industries, .process, .content-section, .cta-section, .trust, .measure-grid, .about-points, .card-grid, .industry-grid'
    );
    if ('IntersectionObserver' in window && targets.length) {
      targets.forEach(function (el) { el.classList.add('reveal'); });
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      targets.forEach(function (el) { io.observe(el); });
    }
  }
})();
