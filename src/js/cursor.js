// src/js/cursor.js
// Custom Neon Cursor Follower, Dynamic Spotlight & Sparkle Trail

export function initCursor() {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  const cursorSpotlight = document.getElementById('cursorSpotlight');
  const mouseSpotlight = document.getElementById('mouse-spotlight');

  if (isTouchDevice) {
    if (dot) dot.style.display = 'none';
    if (ring) ring.style.display = 'none';
    if (cursorSpotlight) cursorSpotlight.style.display = 'none';
    return;
  }

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let lastSparkTime = 0;
  let isMouseActive = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseActive = true;

    if (dot) {
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }

    if (cursorSpotlight) {
      cursorSpotlight.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      cursorSpotlight.style.opacity = '1';
    }

    if (mouseSpotlight) {
      mouseSpotlight.style.background = `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(16, 185, 129, 0.12), transparent 80%)`;
    }

    // Spawn subtle glowing sparkle trail (throttled to max 1 spark per 45ms)
    const now = Date.now();
    if (now - lastSparkTime > 45) {
      lastSparkTime = now;
      const spark = document.createElement('div');
      spark.className = 'cursor-spark';
      spark.style.left = mouseX + 'px';
      spark.style.top = mouseY + 'px';
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }
  }, { passive: true });

  // Fluid Lerp loop for ring
  function renderRing() {
    if (isMouseActive) {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
    }
    requestAnimationFrame(renderRing);
  }
  renderRing();

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

  // Neon Ripple click effect
  window.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
}
