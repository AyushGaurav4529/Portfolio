// src/js/icard.js
// Hanging 3D Flipping ID Card (ICARD) Logic

import { playUiSound } from './audio.js';
import { openImageLightbox } from './modals.js';

export function initIcard() {
  const icardInner = document.getElementById('icardInner');
  const heroIcardBadge = document.getElementById('heroIcardBadge');
  const icardPhotoBox = document.getElementById('icardPhotoBox');

  function toggleFlip(e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    if (icardInner) {
      icardInner.classList.toggle('is-flipped');
      playUiSound(900, 0.06, 'triangle');
    }
  }

  if (heroIcardBadge) {
    heroIcardBadge.addEventListener('click', (e) => {
      // If photo avatar was clicked, open lightbox instead of flipping
      if (icardPhotoBox && icardPhotoBox.contains(e.target)) {
        e.stopPropagation();
        openImageLightbox();
      } else {
        toggleFlip(e);
      }
    });
  }

  // Also bind any direct flip buttons inside the card
  document.querySelectorAll('.btn-flip-icard').forEach((btn) => {
    btn.addEventListener('click', toggleFlip);
  });
}
