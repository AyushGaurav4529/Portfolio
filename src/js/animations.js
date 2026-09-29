// src/js/animations.js
// Hero Dynamic Typing, Scramble Effect, Counter Rollup & Kinetic Reveals

export function initAnimations() {
  // 1. Hero Role – static text (no typewriter)
  const typingTextEl = document.getElementById('hero-typing-text');
  if (typingTextEl) {
    typingTextEl.textContent = 'AI & Full Stack Developer';
  }


  // 3. Number Counter Rollup with IntersectionObserver
  const counters = document.querySelectorAll('.counter-rollup, #github-activity .text-2xl, #github-activity .text-3xl');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent || '';
          const match = text.match(/\d+/);
          if (match) {
            const targetNum = parseInt(match[0], 10);
            const suffix = text.replace(match[0], '');
            let current = 0;
            const step = Math.max(1, Math.floor(targetNum / 25));
            const timer = setInterval(() => {
              current += step;
              if (current >= targetNum) {
                current = targetNum;
                clearInterval(timer);
              }
              el.textContent = `${current}${suffix}`;
            }, 35);
          }
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    counters.forEach((c) => counterObserver.observe(c));
  }

  // 4. Kinetic Heading Split Reveal
  const kineticHeadings = document.querySelectorAll('.section-heading, .section-heading-kinetic, h2');
  if (kineticHeadings.length > 0) {
    kineticHeadings.forEach((h) => h.classList.add('section-heading-kinetic'));

    const kineticObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('heading-revealed');
          kineticObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    kineticHeadings.forEach((h) => kineticObserver.observe(h));
  }

  // 5. Scroll Reveals
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    scrollObserver.observe(el);
  });

  // Reveal hero elements immediately
  document.querySelectorAll('header .animate-on-scroll').forEach((el) => {
    el.classList.add('visible');
  });
}
