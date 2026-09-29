// src/main.js
// Main Application Entrypoint — Modular Architecture

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
import { initTerminal } from './js/terminal.js';
import { initAiAssistant } from './js/aiAssistant.js';
import { initCommandPalette } from './js/commandPalette.js';
import { initProjects } from './js/projects.js';
import { initSkills } from './js/skills.js';
import { initPdfViewer } from './js/pdfViewer.js';
import { initContact } from './js/contact.js';
import { fetchGitHubStats } from './js/github.js';

function renderLucideIcons() {
  createIcons({ icons });
}

// Global exposure for dynamic markup rendering
window.lucide = { createIcons: renderLucideIcons };

// Lazy-load Three.js scenes to ensure instant First Contentful Paint (FCP)
async function load3DScenes() {
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
      duration: 750,
      once: true,
      offset: 40,
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

  // 11. Initialize Interactive Terminal
  initTerminal();

  // 12. Initialize AI Assistant
  initAiAssistant();

  // 13. Initialize Command Palette
  initCommandPalette();

  // 14. Initialize Projects Filtering & Sandbox
  initProjects();

  // 15. Initialize Skills Tabs & Progress
  initSkills();

  // 16. Initialize PDF Viewer
  initPdfViewer();

  // 17. Initialize Contact Form & Clipboard
  initContact();

  // 18. Fetch Live GitHub Stats
  fetchGitHubStats();

  // 19. Asynchronously mount 3D WebGL scenes during browser idle time
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(load3DScenes);
  } else {
    setTimeout(load3DScenes, 100);
  }
});
