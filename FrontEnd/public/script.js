///////////////////////////////////////////////////////////
// Smooth scrolling navigation

const allLinks = document.querySelectorAll('a:link');
allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    // Scroll to top
    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    // Scroll to other links
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile nav
    if (link.classList.contains('smooth-flag')) headerEl.classList.toggle('nav-open');
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector('.section-header');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) document.body.classList.add('sticky');
    if (ent.isIntersecting === true) document.body.classList.remove('sticky');
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  }
);

if (sectionHeroEl) obs.observe(sectionHeroEl);
