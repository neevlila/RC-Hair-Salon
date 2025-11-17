import Router from 'vanilla-router';
import { createIcons, icons } from 'lucide';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Page Modules
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AISuggestionPage from './pages/AISuggestionPage';

// Import Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

// --- THEME MANAGEMENT (REFACTORED) ---
const updateThemeIcon = () => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', isDarkMode ? 'sun' : 'moon');
      createIcons({
        icons,
        attrs: { 'stroke-width': 1.5 },
        nameAttr: 'data-lucide'
      });
    }
  }
};

const applyTheme = (theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
  updateThemeIcon();
};

const toggleTheme = () => {
  const currentTheme = localStorage.getItem('theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
};

// --- ROUTER SETUP ---
const router = new Router({
  mode: 'history',
  page404: () => router.navigateTo('/'),
});

const renderPage = (pageModule) => {
  const appElement = document.getElementById('app');
  appElement.innerHTML = pageModule.render();
  if (pageModule.addEvents) {
    pageModule.addEvents(router);
  }
  createIcons({ icons, attrs: { 'stroke-width': 1.5 } });
  // Check for selected service from session storage
  const selectedService = sessionStorage.getItem('selectedService');
  if (window.location.hash === '#booking' && selectedService) {
    const serviceSelect = document.getElementById('service-select');
    if (serviceSelect) {
      serviceSelect.value = selectedService;
    }
    sessionStorage.removeItem('selectedService'); // Clean up
  }

  document.documentElement.scrollTop = 0; // Scroll to top on page change
};

router.add('/', () => renderPage(HomePage));
router.add('/services', () => renderPage(ServicesPage));
router.add('/ai-suggestion', () => renderPage(AISuggestionPage));

// --- LAYOUT & INITIALIZATION ---
const renderLayout = () => {
  document.getElementById('main-header').innerHTML = Header.render();
  document.getElementById('main-footer').innerHTML = Footer.render();
  Header.addEvents(router, toggleTheme);
};

const initializeApp = () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  renderLayout();
  applyTheme(savedTheme);
  router.check();

  // Handle navigation
  window.addEventListener('popstate', () => {
    router.check();
    // Ensure header active links are updated on back/forward
    setTimeout(() => Header.updateActiveLink(window.location.pathname), 0);
  });
  
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.matches('[data-link]')) {
      e.preventDefault();
      router.navigateTo(link.getAttribute('href'));
      Header.updateActiveLink(link.getAttribute('href'));
    }
  });
};

document.addEventListener('DOMContentLoaded', initializeApp);
