// src/js/cardEffects.js
// High-Performance 3D Card Tilt, Specular Sheen & Magnetic Hover Buttons

export function initCardEffects() {
  const cards = document.querySelectorAll(
    '.timeline-card, .project-card-trigger, .skill-category-block, .spotlight-card'
  );

  cards.forEach((card) => {
    card.classList.add('spotlight-card', 'project-tilt-card');

    // Ensure specular shine overlay is present
    if (!card.querySelector('.tilt-shine')) {
      const shine = document.createElement('div');
      shine.className = 'tilt-shine';
      card.appendChild(shine);
    }

    let rect = null;
    let rafId = null;
    let mouseX = 0;
    let mouseY = 0;

    function applyTilt() {
      if (!rect) return;
      const x = mouseX - rect.left;
      const y = mouseY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Subtle and smooth max 6deg tilt
      const rotY = ((x - cx) / cx) * 6;
      const rotX = -((y - cy) / cy) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;

      // Specular glare position percentage & pixel vars
      const pctX = ((x / rect.width) * 100).toFixed(1);
      const pctY = ((y / rect.height) * 100).toFixed(1);
      card.style.setProperty('--mx', `${pctX}%`);
      card.style.setProperty('--my', `${pctY}%`);
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      rafId = null;
    }

    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
    });

    card.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rect) rect = card.getBoundingClientRect();

      if (!rafId) {
        rafId = requestAnimationFrame(applyTilt);
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      rect = null;
      card.style.transition = 'transform 0.4s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // Spring Physics Magnetic Hover Buttons
  const magneticElements = document.querySelectorAll(
    '.btn-open-pdf, #btnOpenPdfHero, #aiChatToggleBtn, .magnetic-btn, .contact-link, .project-filter-btn, .btn-connect, #btnNavCv, .btn-copy-email, .btn-copy-phone, #themeToggleNav, #brandProfileBtn, #cmdPaletteBtn'
  );

  magneticElements.forEach((el) => {
    el.classList.add('magnetic-btn');
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let isHovered = false;
    let rafId = null;

    function updateSpring() {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;

      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`;

      if (isHovered || Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(updateSpring);
      } else {
        el.style.transform = 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)';
        rafId = null;
      }
    }

    el.addEventListener('mousemove', (e) => {
      const bRect = el.getBoundingClientRect();
      targetX = (e.clientX - bRect.left - bRect.width / 2) * 0.3;
      targetY = (e.clientY - bRect.top - bRect.height / 2) * 0.3;
      if (!isHovered) {
        isHovered = true;
        if (!rafId) rafId = requestAnimationFrame(updateSpring);
      }
    }, { passive: true });

    el.addEventListener('mouseleave', () => {
      isHovered = false;
      targetX = 0;
      targetY = 0;
    });
  });
}
