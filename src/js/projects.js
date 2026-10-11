// src/js/projects.js
// Project Category Filtering & In-Browser Live API Sandbox Execution

import { playUiSound } from './audio.js';

export function initProjects() {
  // 1. Category Filtering
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      playUiSound(850, 0.05);

      filterBtns.forEach((b) => {
        b.classList.remove('active-filter', 'border-neon', 'bg-neon', 'text-dark', 'shadow-[0_0_12px_rgba(16,185,129,0.3)]');
        b.classList.add('border-darkBorder', 'bg-darkCard', 'text-textSecondary');
      });

      btn.classList.add('active-filter', 'border-neon', 'bg-neon', 'text-dark', 'shadow-[0_0_12px_rgba(16,185,129,0.3)]');
      btn.classList.remove('border-darkBorder', 'bg-darkCard', 'text-textSecondary');

      projectItems.forEach((item) => {
        const cat = item.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          item.classList.remove('hidden');
          item.classList.add('animate-on-scroll');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // 2. In-Browser Live API Sandbox (Code-Split via dynamic import)
  const runBtn = document.getElementById('runApiTestBtn');
  const outputText = document.getElementById('projApiOutputText');
  const endpointText = document.getElementById('projApiEndpointText');

  if (runBtn && outputText) {
    runBtn.addEventListener('click', async () => {
      const { runApiSandboxTest } = await import('./apiSandbox.js');
      runApiSandboxTest(runBtn, outputText, endpointText);
    });
  }
}
