// src/js/theme.js
// Dark / Light Mode Switcher & Persistence

const THEME_KEY = 'portfolio-theme';

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark';
}

export function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {}
}

export function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  const newTheme = isLight ? 'light' : 'dark';
  try {
    localStorage.setItem(THEME_KEY, newTheme);
  } catch (e) {}
  return newTheme;
}

export function initTheme() {
  const saved = getTheme();
  if (saved === 'light') {
    document.body.classList.add('light-mode');
  }

  const themeToggleNav = document.getElementById('themeToggleNav');
  if (themeToggleNav) {
    themeToggleNav.addEventListener('click', () => {
      toggleTheme();
    });
  }
}
