// src/js/skills.js
// Interactive Skill Category Tabs & Animated Skill Progress Bars

import { playUiSound } from './audio.js';

export function initSkills() {
  // 1. Skill Category Tabs
  const tabBtns = document.querySelectorAll('.skill-tab-btn');
  const categoryBlocks = document.querySelectorAll('.skill-category-block');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      playUiSound(850, 0.05);

      tabBtns.forEach((b) => {
        b.classList.remove('active-tab', 'border-neon', 'bg-neon', 'text-dark', 'shadow-[0_0_12px_rgba(16,185,129,0.3)]');
        b.classList.add('border-darkBorder', 'bg-darkCard', 'text-textSecondary');
      });

      btn.classList.add('active-tab', 'border-neon', 'bg-neon', 'text-dark', 'shadow-[0_0_12px_rgba(16,185,129,0.3)]');
      btn.classList.remove('border-darkBorder', 'bg-darkCard', 'text-textSecondary');

      categoryBlocks.forEach((block) => {
        const cat = block.getAttribute('data-skill-cat') || '';
        if (tab === 'all' || cat === tab) {
          block.classList.remove('hidden');
        } else {
          block.classList.add('hidden');
        }
      });
    });
  });

  // 2. Skill Progress Bars with IntersectionObserver
  const skillBarFillEls = document.querySelectorAll('.skill-bar-fill');
  if (skillBarFillEls.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetWidth = entry.target.getAttribute('data-progress') || '85%';
          entry.target.style.width = targetWidth;
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillBarFillEls.forEach((bar) => skillObserver.observe(bar));
  }
}
