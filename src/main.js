// src/main.js
// Main Application Entrypoint — Performance-Optimized Modular Architecture

import './css/main.css';

import {
  createIcons,
  Activity,
  ArrowRight,
  ArrowUp,
  Award,
  BadgeCheck,
  BookOpen,
  Bot,
  Brain,
  Building2,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronsDown,
  Code,
  Code2,
  Command,
  Copy,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileText,
  FolderGit2,
  GitCommit,
  GitFork,
  Home,
  Info,
  Layers,
  Mail,
  Maximize2,
  Menu,
  Moon,
  Package,
  PackageCheck,
  Phone,
  Play,
  Search,
  Send,
  ShieldCheck,
  Sliders,
  Smartphone,
  Sparkles,
  Sun,
  SunMoon,
  Terminal,
  TrendingUp,
  Trophy,
  User,
  Utensils,
  X,
  Zap
} from 'lucide';
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

// Explicit icon map — only what is used, keeps tree-shaking effective
const icons = {
  Activity, ArrowRight, ArrowUp, Award, BadgeCheck, BookOpen, Bot, Brain,
  Building2, CheckCircle, CheckCircle2, ChevronDown, ChevronRight, ChevronsDown,
  Code, Code2, Command, Copy, Cpu, Database, Download, ExternalLink, FileText,
  FolderGit2, GitCommit, GitFork, Home, Info, Layers, Mail, Maximize2, Menu, Moon,
  Package, PackageCheck, Phone, Play, Search, Send, ShieldCheck, Sliders,
  Smartphone, Sparkles, Sun, SunMoon, Terminal, TrendingUp, Trophy, User,
  Utensils, X, Zap
};

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

// Lazy-load Three.js scenes per section with IntersectionObserver
function load3DScenes() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const isLowPower = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || window.innerWidth <= 768;

  // 1. Hero 3D Scenes (Neural Network Particles)
  const particlesCanvas = document.getElementById('particles-canvas');
  if (particlesCanvas) {
    import('./js/three/heroMesh.js').then(({ initHeroNeuralNetwork }) => {
      initHeroNeuralNetwork(particlesCanvas);
    }).catch(() => {});
  }

  // Only load heavy secondary hero geometry if not low-power / desktop
  const hero3dCanvas = document.getElementById('hero-3d-bg');
  if (hero3dCanvas && !isLowPower) {
    import('./js/three/heroGeometry.js').then(({ init3DHeroBg }) => {
      init3DHeroBg(hero3dCanvas);
    }).catch(() => {});
  }

  // 2. Full-page scroll background: load only on desktop and only after user starts scrolling
  const scrollCanvas = document.getElementById('scroll-3d-bg');
  if (scrollCanvas && !isLowPower) {
    let scrollLoaded = false;
    const triggerScrollLoad = () => {
      if (scrollLoaded) return;
      scrollLoaded = true;
      window.removeEventListener('scroll', triggerScrollLoad);
      import('./js/three/scrollBackground.js').then(({ initScroll3DScene }) => {
        initScroll3DScene(scrollCanvas);
      }).catch(() => {});
    };
    window.addEventListener('scroll', triggerScrollLoad, { passive: true, once: true });
  }

  // 3. Below-the-fold 3D Scenes: Load on-demand as sections approach viewport
  function lazyLoadOnIntersect(elementId, loader) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        loader();
      }
    }, { rootMargin: '350px 0px', threshold: 0.01 });
    observer.observe(el);
  }

  // Skills floating shapes
  const skillsCanvas = document.getElementById('skills-canvas');
  if (skillsCanvas) {
    lazyLoadOnIntersect('skills', () => {
      import('./js/three/skillsShapes.js').then(({ initSkillsFloatingIcons }) => {
        initSkillsFloatingIcons(skillsCanvas);
      }).catch(() => {});
    });
  }

  // Education rotating globe
  const globeCanvas = document.getElementById('globe-canvas');
  if (globeCanvas) {
    lazyLoadOnIntersect('education', () => {
      import('./js/three/rotatingGlobe.js').then(({ init3DGlobe }) => {
        init3DGlobe(globeCanvas);
      }).catch(() => {});
    });
  }

  // Connect globe
  const connectCanvas = document.getElementById('connect-canvas');
  if (connectCanvas) {
    lazyLoadOnIntersect('connect', () => {
      import('./js/three/connectGlobe.js').then(({ initConnectGlobe }) => {
        initConnectGlobe(connectCanvas);
      }).catch(() => {});
    });
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
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(load3DScenes, { timeout: 1000 });
    } else {
      setTimeout(load3DScenes, 50);
    }
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
});
