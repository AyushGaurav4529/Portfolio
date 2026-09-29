// src/js/animations.js
// Hero Dynamic Typing, Scramble Effect, Counter Rollup & Kinetic Reveals

export function initAnimations() {
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

    function typeLoop() {
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
      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }

  // 2. Hacker Text Scramble Effect
  const scrambleGlyphs = '!<>-_\\/[]{}—=+^?#________';
  function scrambleText(element, finalText, duration = 500) {
    if (!element) return;
    const start = Date.now();

    const timer = setInterval(() => {
      const timePassed = Date.now() - start;
      const progress = Math.min(timePassed / duration, 1);

      let result = '';
      for (let i = 0; i < finalText.length; i++) {
        if (finalText[i] === ' ') {
          result += ' ';
        } else if (i < Math.floor(progress * finalText.length)) {
          result += finalText[i];
        } else {
          result += scrambleGlyphs[Math.floor(Math.random() * scrambleGlyphs.length)];
        }
      }

      element.textContent = result;
      if (progress >= 1) clearInterval(timer);
    }, 28);
  }

  const headings = document.querySelectorAll('h1.gradient-text, h2.section-heading');
  headings.forEach((heading) => {
    const originalText = heading.textContent.trim();
    heading.setAttribute('data-original', originalText);

    heading.addEventListener('mouseenter', () => {
      scrambleText(heading, originalText, 450);
    });
  });

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
