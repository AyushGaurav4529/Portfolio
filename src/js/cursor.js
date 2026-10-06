// src/js/cursor.js
// Custom Neon Cursor Follower, Dynamic Spotlight & Hardware-Accelerated Lerp

export function initCursor() {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  const cursorSpotlight = document.getElementById('cursorSpotlight');
  const mouseSpotlight = document.getElementById('mouse-spotlight');

  if (isTouchDevice || prefersReduced) {
    if (dot) dot.style.display = 'none';
    if (ring) ring.style.display = 'none';
    if (cursorSpotlight) cursorSpotlight.style.display = 'none';
    return;
  }

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let isMouseActive = false;
  let ringRafId = null;

  function updateCursorPos(x, y) {
    if (dot) {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    }
    if (cursorSpotlight) {
      cursorSpotlight.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      cursorSpotlight.style.opacity = '1';
    }
    if (mouseSpotlight) {
      mouseSpotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.12), transparent 80%)`;
    }
  }

  let mouseMoveScheduled = false;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseActive = true;

    if (!mouseMoveScheduled) {
      mouseMoveScheduled = true;
      requestAnimationFrame(() => {
        updateCursorPos(mouseX, mouseY);
        mouseMoveScheduled = false;
      });
    }

    if (!ringRafId && !document.hidden) {
      ringRafId = requestAnimationFrame(renderRing);
    }
  }, { passive: true });

  // Fluid Lerp loop for ring - stops when settled to eliminate idle CPU usage
  function renderRing() {
    if (document.hidden) {
      ringRafId = null;
      return;
    }

    const dx = mouseX - ringX;
    const dy = mouseY - ringY;
    ringX += dx * 0.22;
    ringY += dy * 0.22;

    if (ring) {
      ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;
    }

    if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
      ringRafId = requestAnimationFrame(renderRing);
    } else {
      ringRafId = null;
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && ringRafId) {
      cancelAnimationFrame(ringRafId);
      ringRafId = null;
    }
  });

  // Event delegation on body for hover states
  document.body.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, input, textarea, select, .spotlight-card, .timeline-card, .skill-pill, .project-card-trigger, .cmd-item, .magnetic-btn, .cursor-pointer')) {
      if (ring) ring.classList.add('active-hover');
    }
  }, { passive: true });

  document.body.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, input, textarea, select, .spotlight-card, .timeline-card, .skill-pill, .project-card-trigger, .cmd-item, .magnetic-btn, .cursor-pointer')) {
      if (ring) ring.classList.remove('active-hover');
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    if (cursorSpotlight) cursorSpotlight.style.opacity = '0';
  });
}
