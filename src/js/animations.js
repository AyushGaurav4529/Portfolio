// src/js/animations.js
// Hero Dynamic Typing, Counter Rollup & High-Performance Kinetic Reveals

export function initAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Hero Dynamic Role Typing Loop
  const typingTextEl = document.getElementById('hero-typing-text');
  if (typingTextEl) {
    const roles = [
      'AI & Full Stack Developer',
      'Scalable Software Developer',
      'CS Engineering Undergrad',
      'Machine Learning Enthusiast',
      'Problem Solver & Open Source Contributor'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingTimer = null;

    function typeLoop() {
      if (document.hidden) {
        typingTimer = null;
        return;
      }
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        typingTextEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typingTextEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
      }

      let speed = isDeleting ? 70 : 130;
      if (!isDeleting && charIdx === currentRole.length) {
        speed = 2600; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        speed = 500; // Pause before typing next word
      }
      typingTimer = setTimeout(typeLoop, speed);
    }

    if (!prefersReduced) {
      typeLoop();
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && !typingTimer) {
          typeLoop();
        } else if (document.hidden && typingTimer) {
          clearTimeout(typingTimer);
          typingTimer = null;
        }
      });
    } else {
      typingTextEl.textContent = roles[0];
    }
  }

  // 2. Number Counter Rollup with IntersectionObserver
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
            if (prefersReduced) {
              el.textContent = `${targetNum}${suffix}`;
            } else {
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
          }
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    counters.forEach((c) => counterObserver.observe(c));
  }

  // 3. Kinetic Heading Split Reveal
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
    }, { threshold: 0.15 });

    kineticHeadings.forEach((h) => kineticObserver.observe(h));
  }

  // 4. Scroll Reveals (opacity + translateY 16px, unobserve after first reveal)
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    scrollObserver.observe(el);
  });

  // Reveal hero elements immediately
  document.querySelectorAll('header .animate-on-scroll').forEach((el) => {
    el.classList.add('visible');
  });
}
