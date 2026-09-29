// src/js/preloader.js
// System Startup Cyber Preloader & Anti-FOUC Controller

export function initPreloader(onComplete) {
  const preloader = document.getElementById('cyber-preloader');
  const bar = document.getElementById('preloader-bar');
  const percent = document.getElementById('preloader-percent');
  const status = document.getElementById('preloader-status');
  if (!preloader) {
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  const logMessages = [
    'Loading neural weights & shaders...',
    'Initializing high-frequency renderer...',
    'Establishing socket mesh...',
    'Optimizing visual DOM trees...',
    'System Operational. Opening UI...'
  ];

  let progress = 0;
  let msgIndex = 0;

  const timer = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 12;
    if (progress > 95) progress = 95;

    if (bar) bar.style.width = progress + '%';
    if (percent) percent.textContent = progress + '%';

    if (status && progress % 25 === 0 && msgIndex < logMessages.length - 1) {
      msgIndex++;
      status.textContent = logMessages[msgIndex];
    }

    if (progress >= 95) clearInterval(timer);
  }, 45);

  function hidePreloader() {
    clearInterval(timer);
    if (bar) bar.style.width = '100%';
    if (percent) percent.textContent = '100%';
    if (status) status.textContent = 'SYSTEM OPERATIONAL';
    setTimeout(() => {
      preloader.classList.add('loaded');
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }, 150);
  }

  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader, { once: true });
    setTimeout(hidePreloader, 800); // 800ms max fallback
  }
}
