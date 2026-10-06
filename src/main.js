// src/main.js
// Main Application Entrypoint — Performance-Optimized Modular Architecture

import './css/main.css';

import { createIcons, icons } from 'lucide';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { initPreloader } from './js/preloader.js';
import { initTheme } from './js/theme.js';
import { initNavigation } from './js/navigation.js';
import { initCursor } from './js/cursor.js';
import { initAnimations } from './js/animations.js';
import { initCardEffects } from './js/cardEffects.js';
import { initIcard } from './js/icard.js';
import { initModals } from './js/modals.js';
import { initCommandPalette } from './js/commandPalette.js';
import { initProjects } from './js/projects.js';
import { initSkills } from './js/skills.js';
import { initContact } from './js/contact.js';
import { fetchGitHubStats } from './js/github.js';

function renderLucideIcons() {
  createIcons({ icons });
}

// Global exposure for dynamic markup rendering
window.lucide = { createIcons: renderLucideIcons };

// ─── Code-Split Dynamic Feature Loaders ───

function initPdfViewerLazy() {
  let pdfInitialized = false;
  async function launchPdf() {
    const { initPdfViewer, openPdfModal } = await import('./js/pdfViewer.js');
    if (!pdfInitialized) {
      pdfInitialized = true;
      initPdfViewer();
    }
    openPdfModal();
  }

  document.querySelectorAll('.btn-open-pdf, #btnNavCv, #btnOpenPdfHero').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      launchPdf();
    });
  });
}

function initTerminalLazy() {
  let terminalInitialized = false;
  async function launchTerminal() {
    if (!terminalInitialized) {
      terminalInitialized = true;
      const { initTerminal } = await import('./js/terminal.js');
      initTerminal();
    }
    const modal = document.getElementById('terminalModal');
    const card = document.getElementById('terminalCard');
    const input = document.getElementById('terminalInput');
    if (modal && card) {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      card.classList.remove('scale-95');
      card.classList.add('scale-100');
      if (input) setTimeout(() => input.focus(), 60);
    }
  }

  const cliBtn = document.getElementById('cliModalBtn');
  if (cliBtn) {
    cliBtn.addEventListener('click', launchTerminal);
  }

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '`') {
      e.preventDefault();
      launchTerminal();
    }
  });

  window.openTerminalCli = launchTerminal;
}

function initAiAssistantLazy() {
  let aiInitialized = false;
  const toggleBtn = document.getElementById('aiChatToggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', async () => {
      if (!aiInitialized) {
        aiInitialized = true;
        const { initAiAssistant } = await import('./js/aiAssistant.js');
        initAiAssistant();
      }
    }, { once: true });
  }
}

function initMermaidLazy() {
  let mermaidLoaded = false;
  async function loadAndRunMermaid() {
    if (mermaidLoaded) return;
    try {
      const module = await import('https://cdn.jsdelivr.net/npm/mermaid@10.8.0/dist/mermaid.esm.min.mjs');
      const mermaid = module.default || module;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose'
      });
      await mermaid.run({ querySelector: '.mermaid' });
      mermaidLoaded = true;
    } catch (err) {
      console.warn('Mermaid dynamic load error:', err);
    }
  }

  document.querySelectorAll('details').forEach((det) => {
    if (det.querySelector('.mermaid')) {
      det.addEventListener('toggle', () => {
        if (det.open) loadAndRunMermaid();
      });
    }
  });
}

// Lazy-load Three.js scenes to ensure instant First Contentful Paint (FCP)
async function load3DScenes() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  try {
    const [
      { initHeroNeuralNetwork },
      { init3DHeroBg },
      { init3DGlobe },
      { initSkillsFloatingIcons },
      { initConnectGlobe },
      { initScroll3DScene }
    ] = await Promise.all([
      import('./js/three/heroMesh.js'),
      import('./js/three/heroGeometry.js'),
      import('./js/three/rotatingGlobe.js'),
      import('./js/three/skillsShapes.js'),
      import('./js/three/connectGlobe.js'),
      import('./js/three/scrollBackground.js')
    ]);

    const scrollCanvas = document.getElementById('scroll-3d-bg');
    if (scrollCanvas) initScroll3DScene(scrollCanvas);

    const particlesCanvas = document.getElementById('particles-canvas');
    if (particlesCanvas) initHeroNeuralNetwork(particlesCanvas);

    const hero3dCanvas = document.getElementById('hero-3d-bg');
    if (hero3dCanvas) init3DHeroBg(hero3dCanvas);

    const globeCanvas = document.getElementById('globe-canvas');
    if (globeCanvas) init3DGlobe(globeCanvas);

    const skillsCanvas = document.getElementById('skills-canvas');
    if (skillsCanvas) initSkillsFloatingIcons(skillsCanvas);

    const connectCanvas = document.getElementById('connect-canvas');
    if (connectCanvas) initConnectGlobe(connectCanvas);
  } catch (err) {
    console.warn('Three.js scene initialization info:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Icons immediately
  renderLucideIcons();

  // 2. Initialize AOS (Animate on Scroll)
  try {
    AOS.init({
      duration: 600,
      once: true,
      offset: 30,
      disable: 'mobile'
    });
  } catch (e) {}

  // 3. Initialize Core Theme
  initTheme();

  // 4. Initialize Preloader
  initPreloader(() => {
    renderLucideIcons();
  });

  // 5. Initialize Navigation & ScrollSpy
  initNavigation();

  // 6. Initialize Custom Neon Cursor & Light Spotlights
  initCursor();

  // 7. Initialize Dynamic Typings, Scramble & Counters
  initAnimations();

  // 8. Initialize Unified 3D Tilt & Specular Card Effects
  initCardEffects();

  // 9. Initialize 3D Flipping ICARD Badge
  initIcard();

  // 10. Initialize Modals
  initModals();

  // 11. Initialize Command Palette
  initCommandPalette();

  // 12. Initialize Projects Filtering & Sandbox
  initProjects();

  // 13. Initialize Skills Tabs & Progress
  initSkills();

  // 14. Initialize Contact Form & Clipboard
  initContact();

  // 15. Dynamic Feature Trigger Listeners (Code-Split)
  initPdfViewerLazy();
  initTerminalLazy();
  initAiAssistantLazy();
  initMermaidLazy();

  // 16. Fetch Live GitHub Stats
  fetchGitHubStats();

  // 17. Asynchronously mount 3D WebGL scenes during browser idle time
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(load3DScenes, { timeout: 2000 });
  } else {
    setTimeout(load3DScenes, 200);
  }
});
