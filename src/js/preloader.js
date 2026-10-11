// src/js/preloader.js
// System Startup Cyber Preloader & Session Controller

export function initPreloader(onComplete) {
  const preloader = document.getElementById('cyber-preloader');
  if (!preloader) {
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  // 1. Check if already booted in this session
  let alreadyBooted = false;
  try {
    alreadyBooted = sessionStorage.getItem('portfolio_booted_session') === '1';
  } catch (e) {
    // sessionStorage disabled or in private browsing
    alreadyBooted = false;
  }

  if (alreadyBooted) {
    // Instantly remove to guarantee zero delay on first paint & reloads
    preloader.remove();
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  // Mark session as booted
  try {
    sessionStorage.setItem('portfolio_booted_session', '1');
  } catch (e) {}

  const bar = document.getElementById('preloader-bar');
  const percent = document.getElementById('preloader-percent');
  const status = document.getElementById('preloader-status');

  const logMessages = [
    'Loading neural weights & shaders...',
    'Initializing high-frequency renderer...',
    'Establishing socket mesh...',
    'Optimizing visual DOM trees...',
    'System Operational. Opening UI...'
  ];

  const startTime = performance.now();
  const MIN_DURATION = 900;  // 0.9s minimum
  const MAX_DURATION = 1500; // 1.5s hard maximum

  let isFinished = false;
  let progress = 0;
  let msgIndex = 0;

  const timer = setInterval(() => {
    const elapsed = performance.now() - startTime;
    const timeProgress = Math.min(1, elapsed / MIN_DURATION);
    progress = Math.min(95, Math.floor(timeProgress * 95));

    if (bar) bar.style.width = progress + '%';
    if (percent) percent.textContent = progress + '%';

    const targetMsgIdx = Math.min(logMessages.length - 2, Math.floor(timeProgress * (logMessages.length - 1)));
    if (status && targetMsgIdx !== msgIndex) {
      msgIndex = targetMsgIdx;
      status.textContent = logMessages[msgIndex];
    }

    if (elapsed >= MIN_DURATION) {
      finishPreloader();
    }
  }, 40);

  // Hard maximum safeguard
  const hardTimeout = setTimeout(() => {
    finishPreloader();
  }, MAX_DURATION);

  function finishPreloader() {
    if (isFinished) return;
    isFinished = true;
    clearInterval(timer);
    clearTimeout(hardTimeout);
    window.removeEventListener('keydown', handleSkip);
    preloader.removeEventListener('click', handleSkip);

    if (bar) bar.style.width = '100%';
    if (percent) percent.textContent = '100%';
    if (status) status.textContent = 'SYSTEM OPERATIONAL';

    // Fade out and remove from DOM
    preloader.classList.add('loaded');
    if (typeof onComplete === 'function') {
      onComplete();
    }

    setTimeout(() => {
      preloader.remove();
    }, 450);
  }

  // Skippable by click or any key
  function handleSkip() {
    finishPreloader();
  }

  window.addEventListener('keydown', handleSkip, { once: true });
  preloader.addEventListener('click', handleSkip, { once: true });

  if (document.readyState === 'complete') {
    setTimeout(finishPreloader, MIN_DURATION);
  } else {
    window.addEventListener('load', () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      setTimeout(finishPreloader, remaining);
    }, { once: true });
  }
}
