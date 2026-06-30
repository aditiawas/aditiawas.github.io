// Theme toggle — persists choice in localStorage
(function () {
  var STORAGE_KEY = 'theme';

  function getPreferred() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // Apply theme immediately (before paint)
  apply(getPreferred());

  document.addEventListener('DOMContentLoaded', function () {
    // Sync toggle icon now that the button exists in the DOM
    apply(document.documentElement.getAttribute('data-theme') || getPreferred());

    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        apply(current === 'dark' ? 'light' : 'dark');
      });
    }

    // Mobile hamburger
    var hamburger = document.querySelector('.nav-hamburger');
    var links = document.querySelector('.nav-links');
    if (hamburger && links) {
      hamburger.addEventListener('click', function () {
        links.classList.toggle('open');
      });
      // Close menu when a link is clicked
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('open');
        });
      });
    }
  });
})();
