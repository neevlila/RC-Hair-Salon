import { createIcons, icons } from 'lucide';

const Header = {
  render: () => {
    const navLinks = `
      <a href="/" data-link>Home</a>
      <a href="/services" data-link>Services</a>
      <a href="/#booking">Booking</a>
      <a href="/ai-suggestion" data-link>AI Suggestion</a>
    `;

    return `
      <a href="/" class="logo" data-link>RC The Hair Studio</a>
      <nav class="nav-menu">
        ${navLinks}
      </nav>
      <button id="mobile-nav-toggle" aria-label="Toggle navigation">
        <i data-lucide="menu"></i>
      </button>
    `;
  },
  addEvents: (router) => {
    // Scroll behavior
    const headerEl = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
      headerEl.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile nav toggle
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    mobileNavToggle.addEventListener('click', () => {
      const isOpened = navMenu.classList.toggle('active');
      mobileNavToggle.innerHTML = isOpened
        ? '<i data-lucide="x"></i>'
        : '<i data-lucide="menu"></i>';
      createIcons({ icons, attrs: { 'stroke-width': 1.5 } });
    });

    // Close mobile nav on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileNavToggle.innerHTML = '<i data-lucide="menu"></i>';
          createIcons({ icons, attrs: { 'stroke-width': 1.5 } });
        }
      });
    });

    // Set initial active link
    Header.updateActiveLink(window.location.pathname);
  },
  updateActiveLink: (pathname) => {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    navMenu.querySelectorAll('a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === pathname) {
        link.classList.add('active');
      }
    });
  }
};

export default Header;
