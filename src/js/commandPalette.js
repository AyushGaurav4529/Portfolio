// src/js/commandPalette.js
// Command Palette Modal (Ctrl + K / Cmd + K)

import { playChimeSound, playUiSound, toggleSound } from './audio.js';
import { toggleTheme } from './theme.js';
import { openPdfModal } from './pdfViewer.js';
import { showToast } from './contact.js';

export function initCommandPalette() {
  const modal = document.getElementById('commandPaletteModal');
  const card = document.getElementById('commandPaletteCard');
  const searchInput = document.getElementById('cmdSearchInput');
  const itemList = document.getElementById('cmdItemList');
  const openBtn = document.getElementById('cmdPaletteBtn');

  if (!modal || !card) return;

  function openPalette() {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    card.classList.remove('scale-95');
    card.classList.add('scale-100');
    searchInput?.focus();
    playChimeSound();
  }

  function hidePalette() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
    if (searchInput) searchInput.value = '';
    filterItems('');
  }

  if (openBtn) openBtn.addEventListener('click', openPalette);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hidePalette();
  });

  // Global Ctrl+K shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('opacity-0')) {
        openPalette();
      } else {
        hidePalette();
      }
    }
    if (e.key === 'Escape' && !modal.classList.contains('opacity-0')) {
      hidePalette();
    }
  });

  function filterItems(query) {
    if (!itemList) return;
    const items = itemList.querySelectorAll('.cmd-item');
    const q = query.toLowerCase().trim();
    let firstVisible = null;

    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.includes(q)) {
        item.classList.remove('hidden');
        if (!firstVisible) firstVisible = item;
      } else {
        item.classList.add('hidden');
      }
    });

    items.forEach((item) => item.classList.remove('active-cmd', 'bg-neon/10', 'text-white'));
    if (firstVisible) {
      firstVisible.classList.add('active-cmd', 'bg-neon/10', 'text-white');
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterItems(e.target.value);
    });
  }

  function executeItem(item) {
    if (!item) return;
    const action = item.getAttribute('data-action');
    const target = item.getAttribute('data-target');
    hidePalette();

    if (action === 'nav' && target) {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'cv') {
      openPdfModal();
    } else if (action === 'theme') {
      toggleTheme();
    } else if (action === 'sound') {
      const enabled = toggleSound();
      showToast(enabled ? 'UI Sound Effects Enabled' : 'UI Sound Effects Muted');
    } else if (action === 'copy-email') {
      navigator.clipboard.writeText('ayushgaurav4529@gmail.com');
      showToast('Email address copied to clipboard!');
    }
  }

  if (itemList) {
    itemList.addEventListener('click', (e) => {
      const item = e.target.closest('.cmd-item');
      if (item) executeItem(item);
    });
  }

  // Keyboard Arrow Navigation
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      const items = Array.from(itemList?.querySelectorAll('.cmd-item:not(.hidden)') || []);
      if (!items.length) return;

      let activeIdx = items.findIndex((el) => el.classList.contains('active-cmd'));

      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        if (activeIdx >= 0) items[activeIdx].classList.remove('active-cmd', 'bg-neon/10', 'text-white');
        activeIdx = (activeIdx + 1) % items.length;
        items[activeIdx].classList.add('active-cmd', 'bg-neon/10', 'text-white');
        items[activeIdx].scrollIntoView({ block: 'nearest' });
        playUiSound(900, 0.04);
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        if (activeIdx >= 0) items[activeIdx].classList.remove('active-cmd', 'bg-neon/10', 'text-white');
        activeIdx = (activeIdx - 1 + items.length) % items.length;
        items[activeIdx].classList.add('active-cmd', 'bg-neon/10', 'text-white');
        items[activeIdx].scrollIntoView({ block: 'nearest' });
        playUiSound(900, 0.04);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIdx >= 0) executeItem(items[activeIdx]);
      }
    });
  }
}
