(() => {
  'use strict';

  const menuButton = document.querySelector('.mobile-menu-button');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'メニューを開く');
    mobileNav?.classList.remove('is-open');
  };

  menuButton?.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.setAttribute('aria-label', willOpen ? 'メニューを閉じる' : 'メニューを開く');
    mobileNav.classList.toggle('is-open', willOpen);
  });
  mobileNav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const sections = document.querySelectorAll('.mockup-section:not(.mockup-section--hero)');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sections.forEach((section) => section.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -4% 0px', threshold: 0.04 });

  sections.forEach((section) => observer.observe(section));
})();
