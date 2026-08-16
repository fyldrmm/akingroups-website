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

  // Scroll reveal
  if (!reduceMotion) {
    var targets = document.querySelectorAll(
      '.solutions, .industries, .process, .content-section, .cta-section, .measure-grid, .about-points, .card-grid, .industry-grid'
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
