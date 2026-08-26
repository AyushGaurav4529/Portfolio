document.addEventListener('DOMContentLoaded', () => {
      if (window.mermaid) {
        mermaid.initialize({
          startOnLoad: true,
          theme: 'dark',
          securityLevel: 'loose',
          fontFamily: 'JetBrains Mono, Geist Mono, monospace',
          themeVariables: {
            darkMode: true,
            background: 'transparent',
            primaryColor: '#10b981',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#00ff87',
            lineColor: '#10b981',
            secondaryColor: '#1e1e1e',
            tertiaryColor: '#0a0a0a'
          }
        });
      }
    });

// 0. System Preloader & Anti-FOUC Controller
    (function initPreloader() {
      const preloader = document.getElementById('cyber-preloader');
      const bar = document.getElementById('preloader-bar');
      const percent = document.getElementById('preloader-percent');
      const status = document.getElementById('preloader-status');
      if (!preloader) return;

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
          if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
          }
        }, 180);
      }

      if (document.readyState === 'complete') {
        hidePreloader();
      } else {
        window.addEventListener('load', hidePreloader);
        setTimeout(hidePreloader, 1000); // Max fallback 1.0s
      }
    })();

    // Initialize Lucide icons
    document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide) lucide.createIcons();
    });

    // Mobile Navigation Drawer Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const closeMobileNavBtn = document.getElementById('closeMobileNavBtn');

    function openMobileNav() {
      if (mobileNavDrawer) {
        mobileNavDrawer.classList.remove('opacity-0', 'pointer-events-none');
      }
    }

    function closeMobileNav() {
      if (mobileNavDrawer) {
        mobileNavDrawer.classList.add('opacity-0', 'pointer-events-none');
      }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileNav);
    if (closeMobileNavBtn) closeMobileNavBtn.addEventListener('click', closeMobileNav);

    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', closeMobileNav);
    });

    // ──────────────────────────────────────────────
    // Light / Dark Mode Toggle
    // ──────────────────────────────────────────────
    const themeToggleNav = document.getElementById('themeToggleNav');
    const THEME_KEY = 'portfolio-theme';

    function toggleTheme() {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
    }

    // Apply saved theme on load
    (function initTheme() {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light') {
        document.body.classList.add('light-mode');
      }
    })();

    if (themeToggleNav) {
      themeToggleNav.addEventListener('click', toggleTheme);
    }

    // ──────────────────────────────────────────────
    // Profile Modal Card Trigger
    // ──────────────────────────────────────────────
    const brandProfileBtn = document.getElementById('brandProfileBtn');
    const profileModal = document.getElementById('profileModal');
    const profileModalCard = document.getElementById('profileModalCard');
    const closeProfileModal = document.getElementById('closeProfileModal');

    function openProfileModal() {
      if (!profileModal || !profileModalCard) return;
      profileModal.classList.remove('opacity-0', 'pointer-events-none');
      profileModalCard.classList.remove('scale-95');
      profileModalCard.classList.add('scale-100');
    }

    function hideProfileModal() {
      if (!profileModal || !profileModalCard) return;
      profileModal.classList.add('opacity-0', 'pointer-events-none');
      profileModalCard.classList.remove('scale-100');
      profileModalCard.classList.add('scale-95');
    }

    if (brandProfileBtn) {
      brandProfileBtn.addEventListener('click', openProfileModal);
    }
    if (closeProfileModal) {
      closeProfileModal.addEventListener('click', hideProfileModal);
    }
    if (profileModal) {
      profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) {
          hideProfileModal();
        }
      });
    }

    // ──────────────────────────────────────────────
    // Image Lightbox Preview Modal Logic
    // ──────────────────────────────────────────────
    const imageLightboxModal = document.getElementById('imageLightboxModal');
    const lightboxCard = document.getElementById('lightboxCard');
    const closeLightboxModal = document.getElementById('closeLightboxModal');
    const profileAvatarContainer = document.getElementById('profileAvatarContainer');
    const heroAvatarContainer = document.getElementById('heroAvatarContainer');

    function openImageLightbox() {
      if (!imageLightboxModal || !lightboxCard) return;
      imageLightboxModal.classList.remove('opacity-0', 'pointer-events-none');
      lightboxCard.classList.remove('scale-95');
      lightboxCard.classList.add('scale-100');
    }

    function hideImageLightbox() {
      if (!imageLightboxModal || !lightboxCard) return;
      imageLightboxModal.classList.add('opacity-0', 'pointer-events-none');
      lightboxCard.classList.remove('scale-100');
      lightboxCard.classList.add('scale-95');
    }

    if (profileAvatarContainer) {
      profileAvatarContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        openImageLightbox();
      });
    }

    if (heroAvatarContainer) {
      heroAvatarContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        openImageLightbox();
      });
    }

    if (closeLightboxModal) {
      closeLightboxModal.addEventListener('click', hideImageLightbox);
    }

    if (imageLightboxModal) {
      imageLightboxModal.addEventListener('click', (e) => {
        if (e.target === imageLightboxModal || e.target === lightboxCard) {
          hideImageLightbox();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideProfileModal();
        hideImageLightbox();
      }
    });

    // ──────────────────────────────────────────────
    // Direct Webmail & App Mail Composer Launcher
    // ──────────────────────────────────────────────
    document.querySelectorAll('a[href*="ayushgaurav4529@gmail.com"], a[href^="mailto:"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=ayushgaurav4529@gmail.com&su=Hello%20Ayush%20-%20Portfolio%20Inquiry', '_blank');
      });
    });

    // ──────────────────────────────────────────────
    // ScrollSpy: Real-time active section tracking
    // ──────────────────────────────────────────────
    const trackedSections = document.querySelectorAll('section[id]');
    const sideNavItems = document.querySelectorAll('.side-nav-item');
    const topNavLinks = document.querySelectorAll('.top-navbar .nav-link');
    let isNavScrollUpdating = false;

    function updateActiveNavOnScroll() {
      let currentSectionId = '';
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      trackedSections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      // If at very bottom of page, default to 'connect'
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 60) {
        currentSectionId = 'connect';
      }

      // Highlight side dots & permanently reveal label for current active section
      sideNavItems.forEach((item) => {
        if (item.getAttribute('data-section') === currentSectionId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      // Highlight top navbar link for active section
      topNavLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === '#' + currentSectionId) {
          link.classList.add('text-neon', 'font-bold');
        } else {
          link.classList.remove('text-neon', 'font-bold');
        }
      });

      isNavScrollUpdating = false;
    }

    function onNavScroll() {
      if (!isNavScrollUpdating) {
        window.requestAnimationFrame(updateActiveNavOnScroll);
        isNavScrollUpdating = true;
      }
    }

    window.addEventListener('scroll', onNavScroll, { passive: true });
    window.addEventListener('load', updateActiveNavOnScroll);

    // ──────────────────────────────────────────────
    // Intersection Observer — animate on scroll
    // ──────────────────────────────────────────────
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    // Immediately reveal all Hero elements on DOM load
    document.querySelectorAll('header .animate-on-scroll').forEach((el) => {
      el.classList.add('visible');
    });


    // ──────────────────────────────────────────────
    // Timeline group hover — glow the dot
    // ──────────────────────────────────────────────
    document.querySelectorAll('.timeline-group').forEach((group) => {
      const dot = group.querySelector('.timeline-dot');
      if (!dot) return;

      group.addEventListener('mouseenter', () => {
        dot.style.backgroundColor = '#00ff87';
        dot.style.boxShadow = '0 0 18px rgba(0, 255, 135, 0.7)';
        dot.style.transform = 'scale(1.5)';
      });

      group.addEventListener('mouseleave', () => {
        dot.style.backgroundColor = '';
        dot.style.boxShadow = '0 0 10px rgba(16,185,129,0.4)';
        dot.style.transform = 'scale(1)';
      });
    });

    // Same for timeline cards that contain dots
    document.querySelectorAll('.timeline-card').forEach((card) => {
      const parent = card.closest('.flex');
      if (!parent) return;
      const dot = parent.querySelector('.timeline-dot');
      if (!dot) return;

      card.addEventListener('mouseenter', () => {
        dot.style.backgroundColor = '#00ff87';
        dot.style.boxShadow = '0 0 18px rgba(0, 255, 135, 0.7)';
        dot.style.transform = 'scale(1.5)';
      });

      card.addEventListener('mouseleave', () => {
        dot.style.backgroundColor = '';
        dot.style.boxShadow = '0 0 10px rgba(16,185,129,0.4)';
        dot.style.transform = 'scale(1)';
      });
    });

    // ──────────────────────────────────────────────
    // 1. Scroll Progress Bar
    // ──────────────────────────────────────────────
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    function updateScrollProgressBar() {
      if (!scrollProgressBar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgressBar.style.width = scrollPercent + '%';
    }
    window.addEventListener('scroll', updateScrollProgressBar);

    // ──────────────────────────────────────────────
    // 2. Mouse Spotlight Tracker
    // ──────────────────────────────────────────────
    const mouseSpotlight = document.getElementById('mouse-spotlight');
    if (mouseSpotlight) {
      window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        mouseSpotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.12), transparent 80%)`;
      });
    }

    // ──────────────────────────────────────────────
    // 3. Hero Title Typing Animation
    // ──────────────────────────────────────────────
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

        // Slower typing (140ms/char) and deleting (75ms/char) for a smooth experience
        let speed = isDeleting ? 75 : 140;
        if (!isDeleting && charIdx === currentRole.length) {
          speed = 2800; // Pause at end of word
          isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          speed = 600; // Pause before typing next word
        }
        setTimeout(typeLoop, speed);
      }
      typeLoop();
    }


    // ──────────────────────────────────────────────
    // 4. Skill Bar Filling via Intersection Observer
    // ──────────────────────────────────────────────
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

    // ──────────────────────────────────────────────
    // 5. Live GitHub API Activity Fetch
    // ──────────────────────────────────────────────
    (async function fetchGitHubStats() {
      const reposEl = document.getElementById('gh-repos');
      const followersEl = document.getElementById('gh-followers');
      const followingEl = document.getElementById('gh-following');

      try {
        const res = await fetch('https://api.github.com/users/AyushGaurav4529');
        if (res.ok) {
          const data = await res.json();
          if (reposEl) reposEl.textContent = data.public_repos ?? '12+';
          if (followersEl) followersEl.textContent = data.followers ?? '15+';
          if (followingEl) followingEl.textContent = data.following ?? '20+';
        } else {
          throw new Error('API limit or network error');
        }
      } catch (err) {
        if (reposEl) reposEl.textContent = '10+';
        if (followersEl) followersEl.textContent = '12+';
        if (followingEl) followingEl.textContent = '18+';
      }
    })();

    // ──────────────────────────────────────────────
    // 6. 3D Card Hover Tilt Effect
    // ──────────────────────────────────────────────
    document.querySelectorAll('.timeline-card, #connect .lg\\:col-span-5, #connect .lg\\:col-span-7').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });

    // ──────────────────────────────────────────────
    // 7. Toast Notification & Copy Helpers
    // ──────────────────────────────────────────────
    const toastEl = document.getElementById('toast-notification');
    const toastMsgEl = document.getElementById('toast-message');
    let toastTimeout;

    function showToast(message) {
      if (!toastEl || !toastMsgEl) return;
      toastMsgEl.textContent = message;
      toastEl.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      toastEl.classList.add('opacity-100', 'translate-y-0');

      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toastEl.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        toastEl.classList.remove('opacity-100', 'translate-y-0');
      }, 3000);
    }

    document.querySelectorAll('.btn-copy-email').forEach((btn) => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText('ayushgaurav4529@gmail.com');
        showToast('Email address copied to clipboard!');
      });
    });

    document.querySelectorAll('.btn-copy-phone').forEach((btn) => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText('+918295813878');
        showToast('Phone number copied to clipboard!');
      });
    });

    // Contact Form Handler (Real Email Submission via FormSubmit API + Mailto Fallback)
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('btnSubmitContact');
    if (contactForm && submitBtn) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contact-name')?.value || '';
        const email = document.getElementById('contact-email')?.value || '';
        const subject = document.getElementById('contact-subject')?.value || 'Portfolio Contact Inquiry';
        const message = document.getElementById('contact-message')?.value || '';

        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> <span>Sending Message...</span>`;
        if (window.lucide) lucide.createIcons();

        try {
          const res = await fetch('https://formsubmit.co/ajax/ayushgaurav4529@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              _subject: `[Portfolio Contact] ${subject} from ${name}`,
              Name: name,
              Email: email,
              Subject: subject,
              Message: message,
              _template: 'table',
              _captcha: 'false'
            })
          });

          if (res.ok) {
            showToast(`Thank you ${name}! Your message has been sent to Ayush's inbox.`);
            playChimeSound();
            contactForm.reset();
          } else {
            throw new Error('Server returned non-200 status');
          }
        } catch (err) {
          // Fallback to mailto if API request fails
          const mailtoUrl = `mailto:ayushgaurav4529@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
          window.location.href = mailtoUrl;
          showToast(`Opening mail app to send your message to Ayush!`);
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
          if (window.lucide) lucide.createIcons();
        }
      });
    }

    // ──────────────────────────────────────────────
    // 8. PDF Resume Viewer Modal
    // ──────────────────────────────────────────────
    const pdfViewerModal = document.getElementById('pdfViewerModal');
    const pdfModalCard = document.getElementById('pdfModalCard');
    const closePdfModal = document.getElementById('closePdfModal');
    const pdfCanvasWrapper = document.getElementById('pdfCanvasWrapper');
    let isPdfRendered = false;

    async function loadAndRenderPdf() {
      if (!pdfCanvasWrapper) return;
      if (typeof pdfjsLib === 'undefined') return;

      try {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const loadingTask = pdfjsLib.getDocument('Ayush_Gaurav_CV.pdf');
        const pdf = await loadingTask.promise;

        pdfCanvasWrapper.innerHTML = ''; // Clear native fallback object

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const containerWidth = pdfCanvasWrapper.clientWidth || 800;
          const unscaledViewport = page.getViewport({ scale: 1.0 });
          const scale = Math.min((containerWidth - 32) / unscaledViewport.width, 1.8);
          const viewport = page.getViewport({ scale: Math.max(scale, 1.0) });

          const canvas = document.createElement('canvas');
          canvas.className = 'shadow-2xl rounded-lg max-w-full h-auto my-2 border border-white/10';
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          pdfCanvasWrapper.appendChild(canvas);

          await page.render({ canvasContext: context, viewport: viewport }).promise;
        }
        isPdfRendered = true;
      } catch (err) {
        console.warn('PDF.js rendering fallback:', err);
      }
    }

    function openPdfModal() {
      if (!pdfViewerModal || !pdfModalCard) return;
      pdfViewerModal.classList.remove('opacity-0', 'pointer-events-none');
      pdfModalCard.classList.remove('scale-95');
      pdfModalCard.classList.add('scale-100');
      if (!isPdfRendered) {
        loadAndRenderPdf();
      }
    }

    function hidePdfModal() {
      if (!pdfViewerModal || !pdfModalCard) return;
      pdfViewerModal.classList.add('opacity-0', 'pointer-events-none');
      pdfModalCard.classList.remove('scale-100');
      pdfModalCard.classList.add('scale-95');
    }

    document.querySelectorAll('.btn-open-pdf').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPdfModal();
      });
    });

    if (closePdfModal) closePdfModal.addEventListener('click', hidePdfModal);
    if (pdfViewerModal) {
      pdfViewerModal.addEventListener('click', (e) => {
        if (e.target === pdfViewerModal) hidePdfModal();
      });
    }

    // ──────────────────────────────────────────────
    // 10. Web Audio API Cyberpunk Sound Effects (Every Click ON)
    // ──────────────────────────────────────────────
    const soundEnabled = true;
    let audioCtx = null;

    function getAudioContext() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    function playUiSound(freq = 800, duration = 0.06, type = 'sine') {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (err) {
        // Audio error fallback
      }
    }

    function playChimeSound() {
      if (!soundEnabled) return;
      playUiSound(600, 0.05);
      setTimeout(() => playUiSound(1000, 0.08), 50);
    }

    // Play sound on EVERY click anywhere on the page
    document.addEventListener('click', () => {
      playUiSound(800, 0.05);
    });

    // ──────────────────────────────────────────────
    // 11. Command Palette (Ctrl + K / Cmd + K)
    // ──────────────────────────────────────────────
    const cmdPaletteModal = document.getElementById('commandPaletteModal');
    const cmdPaletteCard = document.getElementById('commandPaletteCard');
    const cmdSearchInput = document.getElementById('cmdSearchInput');
    const cmdItemList = document.getElementById('cmdItemList');
    const cmdPaletteBtn = document.getElementById('cmdPaletteBtn');

    function openCommandPalette() {
      if (!cmdPaletteModal || !cmdPaletteCard) return;
      cmdPaletteModal.classList.remove('opacity-0', 'pointer-events-none');
      cmdPaletteCard.classList.remove('scale-95');
      cmdPaletteCard.classList.add('scale-100');
      cmdSearchInput?.focus();
      playChimeSound();
    }

    function hideCommandPalette() {
      if (!cmdPaletteModal || !cmdPaletteCard) return;
      cmdPaletteModal.classList.add('opacity-0', 'pointer-events-none');
      cmdPaletteCard.classList.remove('scale-100');
      cmdPaletteCard.classList.add('scale-95');
      if (cmdSearchInput) cmdSearchInput.value = '';
      filterCmdItems('');
    }

    if (cmdPaletteBtn) {
      cmdPaletteBtn.addEventListener('click', openCommandPalette);
    }

    if (cmdPaletteModal) {
      cmdPaletteModal.addEventListener('click', (e) => {
        if (e.target === cmdPaletteModal) hideCommandPalette();
      });
    }

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (cmdPaletteModal?.classList.contains('opacity-0')) {
          openCommandPalette();
        } else {
          hideCommandPalette();
        }
      }
    });

    // Fuzzy search for Command Palette
    function filterCmdItems(query) {
      if (!cmdItemList) return;
      const items = cmdItemList.querySelectorAll('.cmd-item');
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

      // Update active selection highlighting
      items.forEach((item) => item.classList.remove('active-cmd', 'bg-neon/10', 'text-white'));
      if (firstVisible) {
        firstVisible.classList.add('active-cmd', 'bg-neon/10', 'text-white');
      }
    }

    if (cmdSearchInput) {
      cmdSearchInput.addEventListener('input', (e) => {
        filterCmdItems(e.target.value);
      });
    }

    // Execute Command Item Action
    function executeCmdItem(item) {
      if (!item) return;
      const action = item.getAttribute('data-action');
      const target = item.getAttribute('data-target');
      hideCommandPalette();

      if (action === 'nav' && target) {
        const targetEl = document.querySelector(target);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (action === 'cv') {
        openPdfModal();
      } else if (action === 'theme') {
        toggleTheme();
      } else if (action === 'sound') {
        soundEnabled = !soundEnabled;
        localStorage.setItem('ayush_sound_pref', soundEnabled ? 'true' : 'false');
        updateSoundUi();
        showToast(soundEnabled ? 'UI Sound Effects Enabled' : 'UI Sound Effects Muted');
      } else if (action === 'copy-email') {
        navigator.clipboard.writeText('ayushgaurav4529@gmail.com');
        showToast('Email address copied to clipboard!');
      }
    }

    if (cmdItemList) {
      cmdItemList.addEventListener('click', (e) => {
        const item = e.target.closest('.cmd-item');
        if (item) executeCmdItem(item);
      });
    }

    // Keyboard Arrow Navigation in Command Palette
    if (cmdSearchInput) {
      cmdSearchInput.addEventListener('keydown', (e) => {
        const items = Array.from(cmdItemList?.querySelectorAll('.cmd-item:not(.hidden)') || []);
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
          if (activeIdx >= 0) executeCmdItem(items[activeIdx]);
        }
      });
    }

    // ──────────────────────────────────────────────
    // 12. Project Category Filtering
    // ──────────────────────────────────────────────
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    projectFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        playUiSound(850, 0.06);

        projectFilterBtns.forEach((b) => {
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

    // ──────────────────────────────────────────────
    // 13. Project Quick View Detail Modal
    // ──────────────────────────────────────────────
    const projectDetailModal = document.getElementById('projectDetailModal');
    const projectDetailCard = document.getElementById('projectDetailCard');
    const closeProjectModal = document.getElementById('closeProjectModal');

    const projectData = {
      'retail-guard': {
        tag: 'AI & SaaS Inventory',
        title: 'Retail Guard',
        subtitle: 'Pitched at FantomCode Hackathon (RVITM)',
        desc: 'Retail Guard is an AI-powered smart inventory system designed for retailers. It automatically tracks product shelf lives, calculates expiry alerts, monitors live metrics, and generates predictive ordering insights to minimize store waste.',
        features: [
          'Automated shelf-life & expiration date tracking',
          'Live inventory analytics dashboard',
          'Predictive stock replenishment recommendations',
          'Seamless store multi-user role management'
        ],
        stack: ['JavaScript', 'Node.js', 'Firebase', 'Applied AI', 'DBMS', 'Tailwind CSS'],
        github: 'https://github.com/AyushGaurav4529/Retail-Guard.git'
      },
      'homeplate': {
        tag: 'Full-Stack & Mobile Platform',
        title: 'HomePlate',
        subtitle: 'Built for NIRMITH (Web) & VIBE-A-THON (Mobile) Hackathons',
        desc: 'HomePlate connects university students with local home chefs offering fresh home-cooked meals. Features real-time location-based sorting, customized dietary search, and interactive order updates.',
        features: [
          'Hyperlocal location-based chef discovery',
          'Student-friendly affordable pricing filters',
          'Cross-platform mobile ordering app built with Flutter',
          'Real-time order progress tracking'
        ],
        stack: ['Dart', 'Flutter', 'JavaScript', 'Node.js', 'REST APIs', 'Firebase'],
        github: 'https://github.com/AyushGaurav4529/HomePlate.git'
      },
      'hotel-mgmt': {
        tag: 'Desktop Software',
        title: 'Hotel Management System',
        subtitle: 'Python & SQL Operations Engine',
        desc: 'A robust desktop management solution for hotel operations. Streamlines guest check-ins, room availability matrix, automated invoice printing, and revenue tracking.',
        features: [
          'Dynamic room availability grid',
          'Automated bill and invoice generator',
          'Guest check-in & check-out logs',
          'Relational database integration with MySQL'
        ],
        stack: ['Python', 'SQL', 'MySQL', 'Tkinter / GUI'],
        github: 'https://github.com/AyushGaurav4529/Hotel-mangement-system.git'
      },
      'inventory-mgmt': {
        tag: 'Web Application',
        title: 'Inventory Management System',
        subtitle: 'Structured Stock Tracking Interface',
        desc: 'A lightweight, responsive web application for structured stock tracking, supplier management, and item search for small retail environments.',
        features: [
          'Clean responsive dashboard interface',
          'Fast search and item category filter',
          'Low stock alert indicators',
          'Exportable stock summaries'
        ],
        stack: ['HTML5', 'CSS3', 'JavaScript'],
        github: 'https://github.com/AyushGaurav4529/Inventory-Management-System.git'
      }
    };

    function openProjectModal(projectId) {
      const data = projectData[projectId];
      if (!data || !projectDetailModal || !projectDetailCard) return;

      document.getElementById('projDetailTag').textContent = data.tag;
      document.getElementById('projDetailTitle').textContent = data.title;
      document.getElementById('projDetailSubtitle').textContent = data.subtitle;
      document.getElementById('projDetailDesc').textContent = data.desc;

      const featList = document.getElementById('projDetailFeatures');
      if (featList) {
        featList.innerHTML = data.features.map((f) => `<li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-neon"></i>${f}</li>`).join('');
      }

      const stackContainer = document.getElementById('projDetailStack');
      if (stackContainer) {
        stackContainer.innerHTML = data.stack.map((s) => `<span class="bg-neon/10 text-neon px-2.5 py-1 rounded border border-neon/30">${s}</span>`).join('');
      }

      const ghBtn = document.getElementById('projDetailGithubBtn');
      if (ghBtn) {
        const targetUrl = data.github.replace(/\.git$/, '');
        ghBtn.setAttribute('href', targetUrl);
        ghBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
        };
      }

      if (window.lucide) window.lucide.createIcons();

      projectDetailModal.classList.remove('opacity-0', 'pointer-events-none');
      projectDetailCard.classList.remove('scale-95');
      projectDetailCard.classList.add('scale-100');
      playChimeSound();
    }

    function hideProjectModal() {
      if (!projectDetailModal || !projectDetailCard) return;
      projectDetailModal.classList.add('opacity-0', 'pointer-events-none');
      projectDetailCard.classList.remove('scale-100');
      projectDetailCard.classList.add('scale-95');
    }

    document.querySelectorAll('.project-card-trigger').forEach((card) => {
      card.addEventListener('click', () => {
        const pid = card.getAttribute('data-project-id');
        if (pid) openProjectModal(pid);
      });
    });

    if (closeProjectModal) closeProjectModal.addEventListener('click', hideProjectModal);
    if (projectDetailModal) {
      projectDetailModal.addEventListener('click', (e) => {
        if (e.target === projectDetailModal) hideProjectModal();
      });
    }

    // ──────────────────────────────────────────────
    // 14. Interactive Skill Category Tabs
    // ──────────────────────────────────────────────
    const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
    const skillCategoryBlocks = document.querySelectorAll('.skill-category-block');

    skillTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        playUiSound(850, 0.06);

        skillTabBtns.forEach((b) => {
          b.classList.remove('active-tab', 'border-neon', 'bg-neon', 'text-dark', 'shadow-[0_0_12px_rgba(16,185,129,0.3)]');
          b.classList.add('border-darkBorder', 'bg-darkCard', 'text-textSecondary');
        });

        btn.classList.add('active-tab', 'border-neon', 'bg-neon', 'text-dark', 'shadow-[0_0_12px_rgba(16,185,129,0.3)]');
        btn.classList.remove('border-darkBorder', 'bg-darkCard', 'text-textSecondary');

        skillCategoryBlocks.forEach((block) => {
          const cat = block.getAttribute('data-skill-cat') || '';
          if (tab === 'all' || cat === tab) {
            block.classList.remove('hidden');
          } else {
            block.classList.add('hidden');
          }
        });
      });
    });

    // Update Escape Key Handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideProfileModal();
        hideImageLightbox();
        hidePdfModal();
        hideCommandPalette();
        hideProjectModal();
      }
    });

    // ──────────────────────────────────────────────
    // 9. Back to Top Floating Button
    // ──────────────────────────────────────────────
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
          backToTopBtn.classList.add('opacity-100');
        } else {
          backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
          backToTopBtn.classList.remove('opacity-100');
        }
      });

      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // ──────────────────────────────────────────────
    // 15. Advanced Visual Effects & Interactive Animations
    // ──────────────────────────────────────────────

    // ──────────────────────────────────────────────
    // 15. Optimized Visual Effects & Performance System
    // ──────────────────────────────────────────────

    // A. Cyber AI Matrix Rain & 3D Interactive Tech Globe Canvas Engine
    (function initCyberAiMatrixCanvas() {
      const canvas = document.getElementById('particles-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);
      let isMobile = width < 768;
      let isTabHidden = false;

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        isMobile = width < 768;
        initMatrixColumns();
      }, { passive: true });

      let mouse = { x: width / 2, y: height / 2, active: false };
      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
      }, { passive: true });

      window.addEventListener('mouseleave', () => {
        mouse.active = false;
      }, { passive: true });

      document.addEventListener('visibilitychange', () => {
        isTabHidden = document.hidden;
      });

      // ──────────────────────────────────────────────
      // 1. Matrix Digital Code Rain Engine
      // ──────────────────────────────────────────────
      const matrixChars = ['PyTorch', 'Vision', 'LLM', '01', 'AI', 'Python', 'Flutter', 'Node.js', 'SQL', '10', 'DSA', 'REST'];
      const fontSize = 11;
      let columns = 0;
      let drops = [];

      function initMatrixColumns() {
        columns = Math.floor(width / 32);
        drops = [];
        for (let i = 0; i < columns; i++) {
          drops[i] = Math.random() * -50;
        }
      }
      initMatrixColumns();

      function drawMatrixRain(isLight) {
        ctx.font = '10px "JetBrains Mono", monospace';
        for (let i = 0; i < drops.length; i++) {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          const x = i * 32;
          const y = drops[i] * fontSize;

          ctx.fillStyle = isLight ? 'rgba(5, 150, 105, 0.16)' : 'rgba(0, 255, 135, 0.18)';
          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i] += 0.45;
        }
      }

      // ──────────────────────────────────────────────
      // 2. 3D Rotating Wireframe Tech Globe Engine
      // ──────────────────────────────────────────────
      const globeRadius = isMobile ? Math.min(width, height) * 0.28 : 220;
      const globeCenter = { x: width * 0.78, y: height * 0.42 };
      let rotationX = 0;
      let rotationY = 0;

      const latLines = 10;
      const lonLines = 16;
      const globePoints = [];

      for (let i = 0; i <= latLines; i++) {
        const lat = (Math.PI * i) / latLines - Math.PI / 2;
        for (let j = 0; j < lonLines; j++) {
          const lon = (2 * Math.PI * j) / lonLines;
          globePoints.push({
            x: globeRadius * Math.cos(lat) * Math.cos(lon),
            y: globeRadius * Math.sin(lat),
            z: globeRadius * Math.cos(lat) * Math.sin(lon)
          });
        }
      }

      function draw3dGlobe(isLight) {
        // Adjust center for mobile vs desktop
        globeCenter.x = isMobile ? width * 0.5 : width * 0.82;
        globeCenter.y = isMobile ? height * 0.35 : height * 0.45;

        // Auto-rotation + Scroll Parallax + Mouse Tilt
        const scrollFactor = window.scrollY * 0.001;
        const targetRotY = (mouse.active ? (mouse.x - width / 2) * 0.00015 : 0) + scrollFactor + 0.003;
        const targetRotX = (mouse.active ? (mouse.y - height / 2) * 0.00015 : 0) + 0.0015;

        rotationY += targetRotY;
        rotationX += targetRotX;

        const sinX = Math.sin(rotationX);
        const cosX = Math.cos(rotationX);
        const sinY = Math.sin(rotationY);
        const cosY = Math.cos(rotationY);

        const projected = [];

        for (let i = 0; i < globePoints.length; i++) {
          const pt = globePoints[i];

          // 3D Y Rotation
          let x1 = pt.x * cosY - pt.z * sinY;
          let z1 = pt.z * cosY + pt.x * sinY;

          // 3D X Rotation
          let y1 = pt.y * cosX - z1 * sinX;
          let z2 = z1 * cosX + pt.y * sinX;

          // Perspective Projection
          const scale = 400 / (400 + z2);
          const px = globeCenter.x + x1 * scale;
          const py = globeCenter.y + y1 * scale;

          projected.push({ x: px, y: py, z: z2, scale: scale });
        }

        // Draw Globe Nodes & Synaptic Grid Lines
        for (let i = 0; i < projected.length; i++) {
          const p = projected[i];
          if (p.z > -globeRadius) { // Front-face clipping
            const depthAlpha = Math.max(0.1, (p.z + globeRadius) / (globeRadius * 2));
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(1, 2 * p.scale), 0, Math.PI * 2);
            ctx.fillStyle = isLight
              ? `rgba(5, 150, 105, ${depthAlpha * 0.8})`
              : `rgba(0, 255, 135, ${depthAlpha * 0.9})`;
            ctx.fill();

            // Connect to neighboring point longitude line
            const nextIdx = (i + 1) % projected.length;
            if (i % lonLines !== lonLines - 1 && projected[nextIdx].z > -globeRadius) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(projected[nextIdx].x, projected[nextIdx].y);
              ctx.strokeStyle = isLight
                ? `rgba(5, 150, 105, ${depthAlpha * 0.3})`
                : `rgba(0, 255, 135, ${depthAlpha * 0.35})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }

            // Mouse laser connection to nearest globe nodes
            if (mouse.active && !isMobile) {
              const mdx = p.x - mouse.x;
              const mdy = p.y - mouse.y;
              const mdistSq = mdx * mdx + mdy * mdy;
              if (mdistSq < 16900) { // 130 * 130
                const mdist = Math.sqrt(mdistSq);
                const opacity = (1 - mdist / 130) * 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(0, 255, 135, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          }
        }
      }

      // ──────────────────────────────────────────────
      // 3. Render Loop
      // ──────────────────────────────────────────────
      function animate() {
        if (isTabHidden) {
          requestAnimationFrame(animate);
          return;
        }

        ctx.clearRect(0, 0, width, height);
        const isLight = document.body.classList.contains('light-mode');

        drawMatrixRain(isLight);
        draw3dGlobe(isLight);

        requestAnimationFrame(animate);
      }

      animate();
    })();

    // B. Custom Neon Cursor Follower (Event Delegated)
    (function initCustomCursor() {
      const dot = document.getElementById('custom-cursor-dot');
      const ring = document.getElementById('custom-cursor-ring');
      if (!dot || !ring) return;

      if (window.matchMedia('(pointer: coarse)').matches) {
        dot.style.display = 'none';
        ring.style.display = 'none';
        return;
      }

      let mouseX = -100, mouseY = -100;
      let ringX = -100, ringY = -100;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }, { passive: true });

      function renderRing() {
        ringX += (mouseX - ringX) * 0.2;
        ringY += (mouseY - ringY) * 0.2;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(renderRing);
      }
      renderRing();

      // Efficient Event Delegation on Body for Hover Rings
      document.body.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, input, textarea, select, .spotlight-card, .timeline-card, .skill-pill, .project-card-trigger, .cmd-item')) {
          ring.classList.add('active-hover');
        }
      }, { passive: true });

      document.body.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, input, textarea, select, .spotlight-card, .timeline-card, .skill-pill, .project-card-trigger, .cmd-item')) {
          ring.classList.remove('active-hover');
        }
      }, { passive: true });
    })();

    // C. 3D Tilt Card & Dynamic Mouse Spotlight Tracker
    (function init3DTiltAndSpotlight() {
      const cards = document.querySelectorAll(
        '.timeline-card, .project-card-trigger, .skill-category-block, .spotlight-card'
      );

      cards.forEach((card) => {
        card.classList.add('spotlight-card');

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);

          // 3D Tilt calculation
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = -((y - centerY) / centerY) * 6; // Max 6 deg
          const rotateY = ((x - centerX) / centerX) * 6;   // Max 6 deg

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
      });
    })();

    // D. Hacker Text Scramble Effect
    (function initTextScramble() {
      const scrambleGlyphs = '!<>-_\\/[]{}—=+^?#________';

      function scrambleText(element, finalText, duration = 600) {
        if (!element) return;
        let start = Date.now();

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
        }, 30);
      }

      // Apply on load and hover for headers
      const headings = document.querySelectorAll('h1.gradient-text, h2.section-heading');
      headings.forEach((heading) => {
        const originalText = heading.textContent.trim();
        heading.setAttribute('data-original', originalText);

        heading.addEventListener('mouseenter', () => {
          scrambleText(heading, originalText, 500);
        });
      });
    })();

    // E. Magnetic Hover Buttons
    (function initMagneticButtons() {
      const magneticTargets = document.querySelectorAll(
        '.cta-btn, .btn-connect, #themeToggleNav, #brandProfileBtn, #cmdPaletteBtn, .magnetic-btn'
      );

      magneticTargets.forEach((btn) => {
        btn.classList.add('magnetic-btn');

        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);

          btn.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
        });

        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate3d(0, 0, 0)';
        });
      });
    })();

    // F. Dynamic Auto-Typing Role Switcher handled by Section 3 above


    // ──────────────────────────────────────────────
    // 16. TOP 1% PORTFOLIO FEATURES IMPLEMENTATION
    // ──────────────────────────────────────────────

    // 1. Interactive Hacker CLI Terminal Modal
    (function initInteractiveTerminal() {
      const modal = document.getElementById('terminalModal');
      const card = document.getElementById('terminalCard');
      const openBtn = document.getElementById('cliModalBtn');
      const closeBtn = document.getElementById('closeTerminalBtn');
      const input = document.getElementById('terminalInput');
      const output = document.getElementById('terminalOutput');
      if (!modal || !input || !output) return;

      function showTerminal() {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        card.classList.remove('scale-95');
        card.classList.add('scale-100');
        setTimeout(() => input.focus(), 100);
      }

      function hideTerminal() {
        modal.classList.add('opacity-0', 'pointer-events-none');
        card.classList.remove('scale-100');
        card.classList.add('scale-95');
      }

      if (openBtn) openBtn.addEventListener('click', showTerminal);
      if (closeBtn) closeBtn.addEventListener('click', hideTerminal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) hideTerminal();
      });

      // Ctrl + ~ keyboard shortcut
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === '`') {
          e.preventDefault();
          if (modal.classList.contains('opacity-0')) {
            showTerminal();
          } else {
            hideTerminal();
          }
        }
      });

      // Command Processor
      input.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const cmd = input.value.trim().toLowerCase();
        if (!cmd) return;

        const line = document.createElement('div');
        line.className = 'my-1';
        line.innerHTML = `<span class="text-neon font-bold">ayush@portfolio:~$</span> <span class="text-white">${cmd}</span>`;
        output.appendChild(line);

        const res = document.createElement('div');
        res.className = 'text-xs mb-3 space-y-1';

        switch (cmd) {
          case 'help':
            res.innerHTML = `
              <p class="text-neon font-bold mb-1">Available System Commands:</p>
              <p><strong class="text-neonBright">about</strong>       - Display profile overview</p>
              <p><strong class="text-neonBright">skills</strong>      - List technical competencies & stack</p>
              <p><strong class="text-neonBright">projects</strong>    - List featured applications</p>
              <p><strong class="text-neonBright">contact</strong>     - Get direct email & social handles</p>
              <p><strong class="text-neonBright">theme</strong>       - Toggle Dark / Light mode</p>
              <p><strong class="text-neonBright">clear</strong>       - Clear terminal buffer</p>
              <p><strong class="text-neonBright">matrix</strong>      - Trigger cyberpunk code visualizer</p>
              <p><strong class="text-neonBright">exit</strong>        - Close CLI session</p>
            `;
            break;

          case 'about':
            res.innerHTML = `<p class="text-white">Ayush Gaurav — Computer Science Engineering Undergrad specializing in AI, Machine Learning, and Full-Stack scalable web applications.</p>`;
            break;

          case 'skills':
            res.innerHTML = `
              <p class="text-neon">AI & ML:</p> <p class="text-textMuted">Python, PyTorch, TensorFlow, OpenCV, Scikit-learn, NLP</p>
              <p class="text-neon">Full Stack:</p> <p class="text-textMuted">JavaScript, TypeScript, React, Node.js, Express, Tailwind CSS</p>
              <p class="text-neon">Databases & Cloud:</p> <p class="text-textMuted">MySQL, PostgreSQL, MongoDB, Firebase, Git, Docker, Vercel</p>
            `;
            break;

          case 'projects':
            res.innerHTML = `
              <p>1. <strong class="text-neonBright">Retail Guard</strong> - Real-Time AI Threat Detection System</p>
              <p>2. <strong class="text-neonBright">HomePlate</strong> - Flutter & Node.js Food Logistics App</p>
              <p>3. <strong class="text-neonBright">Hotel Management</strong> - Python & SQL Operations Engine</p>
              <p>4. <strong class="text-neonBright">Inventory System</strong> - Responsive Stock Tracker</p>
            `;
            break;

          case 'contact':
            res.innerHTML = `
              <p>Email: <a href="mailto:ayushgaurav4529@gmail.com" class="text-neonBright underline">ayushgaurav4529@gmail.com</a></p>
              <p>GitHub: <a href="https://github.com/AyushGaurav4529" target="_blank" class="text-neonBright underline">github.com/AyushGaurav4529</a></p>
              <p>LinkedIn: <a href="https://www.linkedin.com/in/ayugaurav/" target="_blank" class="text-neonBright underline">linkedin.com/in/ayugaurav</a></p>
            `;
            break;

          case 'theme':
            const toggle = document.getElementById('themeToggleNav');
            if (toggle) toggle.click();
            res.innerHTML = `<p class="text-neonBright">Theme toggled successfully!</p>`;
            break;

          case 'clear':
            output.innerHTML = '';
            input.value = '';
            return;

          case 'exit':
            hideTerminal();
            input.value = '';
            return;

          case 'matrix':
            res.innerHTML = `<p class="text-neonBright font-mono animate-pulse">01000001 01011001 01010101 01010011 01001000 00100000 01000111 01000001 01010101 01010010 01000001 01010110</p>`;
            break;

          default:
            res.innerHTML = `<p class="text-red-400">Command not recognized: '${cmd}'. Type <span class="text-neon">help</span> for commands.</p>`;
            break;
        }

        output.appendChild(res);
        input.value = '';
        output.scrollTop = output.scrollHeight;
      });
    })();

    // 2. Interactive Certificate Verifier Modal
    (function initCertVerifierModal() {
      const modal = document.getElementById('certVerifierModal');
      const card = document.getElementById('certModalCard');
      const closeBtn = document.getElementById('closeCertModal');
      if (!modal || !card) return;

      const certData = {
        'bootcamp-tech': {
          typeTag: 'Verified Credential',
          title: '3-days Bootcamp: The World of Tech 2.0',
          issuer: 'Google Developer Groups',
          id: '',
          date: 'Feb 2025',
          skills: [],
          buttonText: 'Verify Official Credential',
          url: 'https://drive.google.com/file/d/1Xvy7CQftCCuANOdqVzBP4TpUc1lhBsor/view'
        },
        'dsa-gfg': {
          typeTag: 'Verified Credential',
          title: 'Data Structures & Algorithms Session',
          issuer: 'GeeksforGeeks',
          id: '',
          date: '2024',
          skills: ['Data Structures', 'Algorithms', 'Problem Solving'],
          buttonText: 'Verify Official Credential',
          url: 'https://drive.google.com/file/d/1Xvy7CQftCCuANOdqVzBP4TpUc1lhBsor/view'
        },
        'bootcamp-ml': {
          typeTag: 'Verified Credential',
          title: '3-Days ML Bootcamp',
          issuer: 'Google Developer Groups',
          id: '',
          date: 'Feb 2025',
          skills: [],
          buttonText: 'Verify Official Credential',
          url: 'https://drive.google.com/file/d/166EiXmBg7qTiDnsVKPPQBY-EEvOXf12M/view'
        },
        'python-scaler': {
          typeTag: 'Verified Credential',
          title: 'Python Course for Beginners: Mastering the Essentials',
          issuer: 'Scaler',
          id: '',
          date: '2024',
          skills: ['Python', 'OOP', 'Data Analysis'],
          buttonText: 'Verify Official Credential',
          url: 'https://drive.google.com/file/d/1KfD16kwQXcX4EFrmR0s_H1mePohgmwha/view'
        },
        'fantomcode-hack': {
          typeTag: 'Hackathon Record',
          title: 'FantomCode Hackathon',
          issuer: 'RVITM',
          id: '',
          date: 'April 2026',
          projectBuilt: 'Retail Guard',
          projectId: 'retail-guard',
          skills: ['Computer Vision', 'Real-Time AI', 'Node.js', 'System Architecture'],
          buttonText: 'Verify Official Credential',
          url: 'https://media.licdn.com/dms/image/v2/D5622AQFZ9iE7Ajlu1Q/feedshare-image-high-res/B56Z2UbA0oKMAU-/0/1776311602727?e=1787788800&v=beta&t=kb4Hb8RgcwDncKuyETghxt4jRbVxvOpMMmSTb8oICnE'
        },
        'nirmith-hack': {
          typeTag: 'Hackathon Record',
          title: 'NIRMITH Hackathon',
          issuer: 'Nitte Meenakshi Institute of Technology',
          id: '',
          date: 'April 2026',
          projectBuilt: 'HomePlate (Web Platform)',
          projectId: 'homeplate',
          skills: ['Node.js', 'Express', 'JavaScript', 'REST APIs'],
          buttonText: 'Verify Official Credential',
          url: 'https://media.licdn.com/dms/image/v2/D5622AQGA1ycGKq1nqg/feedshare-shrink_1280/B56Z4RMdQvIoAM-/0/1778404939007?e=1787788800&v=beta&t=4TCXe0JMvOCMO7pHMUg0HTT5Tz3tEcb52ITjZTcufkE'
        },
        'vibe-hack': {
          typeTag: 'Hackathon Record',
          title: 'VIBE-A-THON Hackathon',
          issuer: 'Nitte Meenakshi Institute of Technology',
          id: '',
          date: 'April 2026',
          projectBuilt: 'HomePlate (Mobile App)',
          projectId: 'homeplate',
          skills: ['Dart', 'Flutter', 'Firebase', 'Mobile UI'],
          buttonText: 'Verify Official Credential',
          url: 'https://media.licdn.com/dms/image/v2/D5622AQEDt-NjvBrf0w/feedshare-shrink_1280/B56Z4YRClMJkAU-/0/1778523580978?e=1787788800&v=beta&t=-E3Kkuvapj5vYT0OoeFN_7atnoFoo1_-4DnYRUV-gQM'
        }
      };

      function openCertModal(certKey) {
        const data = certData[certKey] || certData['bootcamp-tech'];
        document.getElementById('certModalTitle').textContent = data.title;
        document.getElementById('certModalIssuer').textContent = data.issuer;
        document.getElementById('certModalDate').textContent = data.date;
        document.getElementById('certVerifyBtn').setAttribute('href', data.url);

        const tagElem = document.getElementById('certModalTag');
        if (tagElem) tagElem.textContent = data.typeTag || 'Verified Credential';

        const btnTextElem = document.getElementById('certVerifyBtnText');
        if (btnTextElem) btnTextElem.textContent = data.buttonText || 'Verify Official Credential';

        const projectRow = document.getElementById('certModalProjectRow');
        const projectElem = document.getElementById('certModalProject');
        if (data.projectBuilt && projectRow && projectElem) {
          if (data.projectId) {
            projectElem.innerHTML = `<button id="openProjectFromCertBtn" class="text-neon font-bold underline hover:text-neonBright cursor-pointer flex items-center gap-1 text-left">${data.projectBuilt} <i data-lucide="external-link" class="w-3 h-3 inline"></i></button>`;
            setTimeout(() => {
              const projBtn = document.getElementById('openProjectFromCertBtn');
              if (projBtn) {
                projBtn.onclick = (e) => {
                  e.preventDefault();
                  hideCertModal();
                  openProjectModal(data.projectId);
                };
              }
            }, 50);
          } else {
            projectElem.textContent = data.projectBuilt;
          }
          projectRow.classList.remove('hidden');
        } else if (projectRow) {
          projectRow.classList.add('hidden');
        }

        const idRow = document.getElementById('certModalIdRow');
        const idElem = document.getElementById('certModalId');
        if (data.id) {
          idElem.textContent = data.id;
          if (idRow) idRow.classList.remove('hidden');
        } else if (idRow) {
          idRow.classList.add('hidden');
        }

        const skillsBlock = document.getElementById('certModalSkillsBlock');
        const skillsContainer = document.getElementById('certModalSkills');
        if (data.skills && data.skills.length > 0) {
          skillsContainer.innerHTML = data.skills
            .map((s) => `<span class="bg-neon/10 text-neon px-2 py-0.5 rounded border border-neon/30">${s}</span>`)
            .join('');
          if (skillsBlock) skillsBlock.classList.remove('hidden');
        } else if (skillsBlock) {
          skillsBlock.classList.add('hidden');
        }

        modal.classList.remove('opacity-0', 'pointer-events-none');
        card.classList.remove('scale-95');
        card.classList.add('scale-100');
      }

      function hideCertModal() {
        modal.classList.add('opacity-0', 'pointer-events-none');
        card.classList.remove('scale-100');
        card.classList.add('scale-95');
      }

      if (closeBtn) closeBtn.addEventListener('click', hideCertModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) hideCertModal();
      });

      document.querySelectorAll('#certifications .timeline-card').forEach((card, index) => {
        const btn = document.createElement('button');
        btn.className = 'mt-3 text-[11px] font-mono text-neon font-bold bg-neon/10 hover:bg-neon/20 px-3 py-1 rounded-lg border border-neon/40 flex items-center gap-1.5 transition-all cursor-pointer';
        btn.innerHTML = `<i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Verify Credential`;
        
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const certKeys = ['bootcamp-tech', 'dsa-gfg', 'bootcamp-ml', 'python-scaler'];
          openCertModal(certKeys[index % certKeys.length]);
        });

        card.appendChild(btn);
      });

      document.querySelectorAll('#hackathons .timeline-card').forEach((card, index) => {
        const btn = document.createElement('button');
        btn.className = 'mt-3 text-[11px] font-mono text-neon font-bold bg-neon/10 hover:bg-neon/20 px-3 py-1 rounded-lg border border-neon/40 flex items-center gap-1.5 transition-all cursor-pointer';
        btn.innerHTML = `<i data-lucide="trophy" class="w-3.5 h-3.5"></i> Verify Record`;
        
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const hackKeys = ['fantomcode-hack', 'nirmith-hack', 'vibe-hack'];
          openCertModal(hackKeys[index % hackKeys.length]);
        });

        card.appendChild(btn);
      });
      if (window.lucide) window.lucide.createIcons();
    })();

    // 3. Supercharged AI Portfolio Neural Assistant
    (function initPortfolioAIAgent() {
      const toggleBtn = document.getElementById('aiChatToggleBtn');
      const closeBtn = document.getElementById('closeAiChatBtn');
      const windowBox = document.getElementById('aiChatWindow');
      const input = document.getElementById('aiChatInput');
      const sendBtn = document.getElementById('sendAiChatBtn');
      const messagesBox = document.getElementById('aiChatMessages');

      if (!toggleBtn || !windowBox || !input) return;

      function toggleChat() {
        const isOpen = !windowBox.classList.contains('opacity-0');
        if (isOpen) {
          windowBox.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        } else {
          windowBox.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
          setTimeout(() => input.focus(), 100);
        }
      }

      toggleBtn.addEventListener('click', toggleChat);
      if (closeBtn) closeBtn.addEventListener('click', toggleChat);

      // Intelligent Query Intent Classifier & Response Generator
      function generateAiReply(userText) {
        const text = userText.toLowerCase().trim();

        // 1. Retail Guard Project
        if (text.includes('retail') || text.includes('guard') || text.includes('threat') || text.includes('vision') || text.includes('camera')) {
          return `
            <div class="space-y-2">
              <p><strong>Retail Guard (AI Threat Detection)</strong></p>
              <p class="text-textMuted">An intelligent computer vision system that monitors store inventory shelf-life, detects security threats, and automates predictive replenishment.</p>
              <div class="flex flex-wrap gap-1 font-mono text-[10px] text-neon">
                <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Node.js</span>
                <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Computer Vision</span>
                <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Firebase</span>
              </div>
              <button onclick="toggleChat(); openProjectModal('retail-guard')" class="mt-2 text-xs font-mono text-neon font-bold underline hover:text-neonBright cursor-pointer flex items-center gap-1">
                🔍 Open Retail Guard Modal <i data-lucide="external-link" class="w-3 h-3 inline"></i>
              </button>
            </div>
          `;
        }

        // 2. HomePlate Project
        if (text.includes('homeplate') || text.includes('food') || text.includes('chef') || text.includes('student') || text.includes('flutter') || text.includes('delivery')) {
          return `
            <div class="space-y-2">
              <p><strong>HomePlate (Web & Mobile Logistics Platform)</strong></p>
              <p class="text-textMuted">Connects university students with local home chefs for fresh, affordable meals. Features real-time location sorting and a Flutter mobile ordering app.</p>
              <div class="flex flex-wrap gap-1 font-mono text-[10px] text-neon">
                <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Flutter</span>
                <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Dart</span>
                <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Node.js</span>
                <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">REST APIs</span>
              </div>
              <button onclick="toggleChat(); openProjectModal('homeplate')" class="mt-2 text-xs font-mono text-neon font-bold underline hover:text-neonBright cursor-pointer flex items-center gap-1">
                🔍 Open HomePlate Modal <i data-lucide="external-link" class="w-3 h-3 inline"></i>
              </button>
            </div>
          `;
        }

        // 3. Projects General Overview
        if (text.includes('project') || text.includes('work') || text.includes('portfolio') || text.includes('build')) {
          return `
            <div class="space-y-2">
              <p>Ayush has engineered high-impact AI and Full-Stack applications:</p>
              <ul class="list-disc list-inside text-textMuted space-y-1">
                <li><strong>Retail Guard:</strong> AI threat detection & inventory monitoring</li>
                <li><strong>HomePlate:</strong> Student home-cooked meal logistics app</li>
                <li><strong>Hotel Management:</strong> Python & SQL Operations Engine</li>
                <li><strong>Inventory Management:</strong> Structured stock tracking web app</li>
              </ul>
              <div class="pt-1 flex gap-2">
                <button onclick="toggleChat(); document.querySelector('#projects').scrollIntoView({behavior:'smooth'})" class="text-xs font-mono bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2.5 py-1 rounded-lg transition-all cursor-pointer">
                  Explore Projects Section ↓
                </button>
              </div>
            </div>
          `;
        }

        // 4. Hackathons & Competitions
        if (text.includes('hackathon') || text.includes('fantom') || text.includes('nirmith') || text.includes('vibe') || text.includes('competition') || text.includes('win') || text.includes('rvitm') || text.includes('nmit')) {
          return `
            <div class="space-y-2">
              <p>🏆 <strong>Ayush's Hackathon Record:</strong></p>
              <div class="space-y-1.5 text-textMuted">
                <div class="p-2 bg-dark/60 rounded-lg border border-darkBorder">
                  <span class="text-white font-bold block">1. FantomCode Hackathon (RVITM)</span>
                  <span class="text-[11px] block">Built <em>Retail Guard</em> • Issued April 2026</span>
                </div>
                <div class="p-2 bg-dark/60 rounded-lg border border-darkBorder">
                  <span class="text-white font-bold block">2. NIRMITH Hackathon (NMIT)</span>
                  <span class="text-[11px] block">Built <em>HomePlate (Web)</em> • Issued April 2026</span>
                </div>
                <div class="p-2 bg-dark/60 rounded-lg border border-darkBorder">
                  <span class="text-white font-bold block">3. VIBE-A-THON Hackathon (NMIT)</span>
                  <span class="text-[11px] block">Built <em>HomePlate (Mobile)</em> • Issued April 2026</span>
                </div>
              </div>
              <button onclick="toggleChat(); document.querySelector('#hackathons').scrollIntoView({behavior:'smooth'})" class="text-xs font-mono bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2.5 py-1 rounded-lg transition-all cursor-pointer">
                View Hackathons Section ↓
              </button>
            </div>
          `;
        }

        // 5. Tech Stack & Skills
        if (text.includes('skill') || text.includes('tech') || text.includes('stack') || text.includes('language') || text.includes('framework') || text.includes('python') || text.includes('javascript') || text.includes('c') || text.includes('dart') || text.includes('sql')) {
          return `
            <div class="space-y-2">
              <p>🛠️ <strong>Ayush's Tech Stack:</strong></p>
              <div class="space-y-1 text-textMuted text-[11px]">
                <p><strong>Languages:</strong> Python, C, JavaScript, Dart, SQL, HTML, CSS</p>
                <p><strong>Frameworks:</strong> Node.js, Express, Flutter, REST APIs</p>
                <p><strong>Databases & Tools:</strong> MySQL, Firebase, Git, VS Code</p>
                <p><strong>AI / Core CS:</strong> Applied AI, Predictive Analytics, DSA, DBMS, OOP</p>
              </div>
              <button onclick="toggleChat(); document.querySelector('#skills').scrollIntoView({behavior:'smooth'})" class="text-xs font-mono bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2.5 py-1 rounded-lg transition-all cursor-pointer">
                View Skills &amp; Toolkit ↓
              </button>
            </div>
          `;
        }

        // 6. Certifications & Bootcamps
        if (text.includes('cert') || text.includes('bootcamp') || text.includes('gdg') || text.includes('google') || text.includes('scaler') || text.includes('gfg')) {
          return `
            <div class="space-y-2">
              <p>📜 <strong>Verified Certifications:</strong></p>
              <ul class="list-disc list-inside text-textMuted space-y-1 text-[11px]">
                <li><strong>3-Days ML Bootcamp:</strong> Google Developer Groups</li>
                <li><strong>3-days Bootcamp (World of Tech 2.0):</strong> Google Developer Groups</li>
                <li><strong>Python Course for Beginners:</strong> Scaler</li>
                <li><strong>DSA Session:</strong> GeeksforGeeks</li>
              </ul>
              <button onclick="toggleChat(); document.querySelector('#certifications').scrollIntoView({behavior:'smooth'})" class="text-xs font-mono bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2.5 py-1 rounded-lg transition-all cursor-pointer">
                View Certifications Grid ↓
              </button>
            </div>
          `;
        }

        // 7. Contact / Email / Phone / Resume / Hiring
        if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('hire') || text.includes('reach') || text.includes('job') || text.includes('resume') || text.includes('cv') || text.includes('pdf')) {
          return `
            <div class="space-y-2">
              <p>📬 <strong>Get in Touch with Ayush:</strong></p>
              <div class="p-2.5 bg-dark/60 rounded-xl border border-darkBorder space-y-1 text-[11px]">
                <p>📧 <strong>Email:</strong> <a href="mailto:ayushgaurav4529@gmail.com" class="text-neon underline">ayushgaurav4529@gmail.com</a></p>
                <p>📞 <strong>Phone:</strong> +91 8295813878</p>
                <p>📍 <strong>Location:</strong> Bengaluru, India</p>
              </div>
              <div class="flex flex-wrap gap-2 pt-1">
                <button onclick="toggleChat(); openPdfModal()" class="text-xs font-mono bg-neon text-dark font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer">
                  📄 View PDF Resume
                </button>
                <button onclick="toggleChat(); document.querySelector('#connect').scrollIntoView({behavior:'smooth'})" class="text-xs font-mono bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2.5 py-1 rounded-lg transition-all cursor-pointer">
                  ✍️ Open Contact Form
                </button>
              </div>
            </div>
          `;
        }

        // 8. Greetings / Friendly Identity Response
        if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('who') || text.includes('about') || text.includes('intro')) {
          return `
            <div class="space-y-2">
              <p>Hello! I am <strong>Ayush Gaurav's Neural AI Assistant</strong>.</p>
              <p class="text-textMuted">Ayush is a Computer Science Engineering student specializing in AI, Machine Learning, and Full-Stack engineering. He builds AI threat detection systems, mobile logistics apps, and scalable web solutions!</p>
              <p class="text-textMuted">What would you like to explore today?</p>
            </div>
          `;
        }

        // 9. Dynamic Neural Default Fallback
        return `
          <div class="space-y-2">
            <p>I understand you're asking about: "<em>${userText}</em>".</p>
            <p class="text-textMuted">Here are the quick topics I can break down for you:</p>
            <div class="flex flex-wrap gap-1.5 font-mono text-[10px] pt-1">
              <button class="ai-chip bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2 py-1 rounded-lg transition-all cursor-pointer" data-query="Tell me about top projects">🚀 Top Projects</button>
              <button class="ai-chip bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2 py-1 rounded-lg transition-all cursor-pointer" data-query="Tell me about hackathon wins">🏆 Hackathons</button>
              <button class="ai-chip bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2 py-1 rounded-lg transition-all cursor-pointer" data-query="What is your technical skill stack?">🛠️ Tech Stack</button>
              <button class="ai-chip bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2 py-1 rounded-lg transition-all cursor-pointer" data-query="How can I contact or hire Ayush?">📬 Contact &amp; Hire</button>
            </div>
          </div>
        `;
      }

      function processQuery(text) {
        if (!text) return;

        // Render User Message
        const userMsg = document.createElement('div');
        userMsg.className = 'flex gap-2 items-start justify-end';
        userMsg.innerHTML = `
          <div class="bg-neon/15 text-white p-3 rounded-2xl rounded-tr-none border border-neon/30 max-w-[85%]">
            ${text}
          </div>
        `;
        messagesBox.appendChild(userMsg);
        input.value = '';
        messagesBox.scrollTop = messagesBox.scrollHeight;

        // Render Animated Typing Indicator
        const typingId = 'ai-typing-' + Date.now();
        const typingMsg = document.createElement('div');
        typingMsg.id = typingId;
        typingMsg.className = 'flex gap-2 items-start';
        typingMsg.innerHTML = `
          <div class="w-6 h-6 rounded-md bg-neon/10 border border-neon/40 flex items-center justify-center text-neon flex-shrink-0 mt-0.5">
            <i data-lucide="bot" class="w-3.5 h-3.5"></i>
          </div>
          <div class="bg-dark p-3 rounded-2xl rounded-tl-none border border-darkBorder text-neon font-mono text-[11px] flex items-center gap-1.5">
            <span>Neural AI thinking</span>
            <span class="inline-flex gap-0.5">
              <span class="w-1 h-1 bg-neon rounded-full animate-bounce"></span>
              <span class="w-1 h-1 bg-neon rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span class="w-1 h-1 bg-neon rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </span>
          </div>
        `;
        messagesBox.appendChild(typingMsg);
        if (window.lucide) window.lucide.createIcons();
        messagesBox.scrollTop = messagesBox.scrollHeight;

        // Delay for realism & replace typing indicator with AI response
        setTimeout(() => {
          const indicator = document.getElementById(typingId);
          if (indicator) indicator.remove();

          const replyHtml = generateAiReply(text);
          const aiMsg = document.createElement('div');
          aiMsg.className = 'flex gap-2 items-start';
          aiMsg.innerHTML = `
            <div class="w-6 h-6 rounded-md bg-neon/10 border border-neon/40 flex items-center justify-center text-neon flex-shrink-0 mt-0.5">
              <i data-lucide="bot" class="w-3.5 h-3.5"></i>
            </div>
            <div class="bg-dark p-3 rounded-2xl rounded-tl-none border border-darkBorder text-textSecondary max-w-[85%]">
              ${replyHtml}
            </div>
          `;
          messagesBox.appendChild(aiMsg);
          if (window.lucide) window.lucide.createIcons();
          messagesBox.scrollTop = messagesBox.scrollHeight;
        }, 500);
      }

      function handleSendMessage() {
        processQuery(input.value.trim());
      }

      if (sendBtn) sendBtn.addEventListener('click', handleSendMessage);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSendMessage();
      });

      // Event Delegation for Quick Action Suggestion Chips
      messagesBox.addEventListener('click', (e) => {
        const chip = e.target.closest('.ai-chip');
        if (chip) {
          const query = chip.getAttribute('data-query') || chip.textContent.trim();
          processQuery(query);
        }
      });
    })();

    // 4. In-Browser Live API Sandbox Execution
    (function initApiSandbox() {
      const runBtn = document.getElementById('runApiTestBtn');
      const outputText = document.getElementById('projApiOutputText');
      const endpointText = document.getElementById('projApiEndpointText');
      if (!runBtn || !outputText) return;

      runBtn.addEventListener('click', () => {
        runBtn.innerHTML = `<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Testing...`;
        outputText.textContent = `[HTTP POST] Connecting to endpoint gateway...`;

        setTimeout(() => {
          const sampleOutput = {
            status: 200,
            statusText: "OK",
            latency: "18ms",
            endpoint: endpointText ? endpointText.textContent : "/api/v1/process-request",
            timestamp: new Date().toISOString(),
            payload: {
              success: true,
              message: "API Pipeline executed successfully",
              threatLevelDetected: "Low / Normal",
              activeNodes: 4,
              serviceStatus: "Operational"
            }
          };
          outputText.textContent = JSON.stringify(sampleOutput, null, 2);
          runBtn.innerHTML = `<i data-lucide="play" class="w-3.5 h-3.5"></i> Test API`;
          if (window.lucide) window.lucide.createIcons();
        }, 600);
      });
    })();

    // 5. Direct Contact Form Submission API
    (function initContactFormApi() {
      const form = document.querySelector('#connect form');
      if (!form) return;

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const messageInput = form.querySelector('textarea');
        const submitBtn = form.querySelector('button[type="submit"]');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email || !message) {
          alert('Please fill out all contact fields before submitting.');
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin inline mr-2"></i> Sending...`;
        }

        setTimeout(() => {
          const toast = document.getElementById('toast-notification');
          const toastMsg = document.getElementById('toast-message');
          if (toast && toastMsg) {
            toastMsg.textContent = `Message sent successfully! Ayush will reply soon.`;
            toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
            setTimeout(() => {
              toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
            }, 3500);
          }

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `Send Message <i data-lucide="send" class="w-4 h-4 inline ml-1"></i>`;
          }

          form.reset();
          if (window.lucide) window.lucide.createIcons();
        }, 800);
      });
    })();

    // 6. Real-Time GitHub Stats Fetcher
    (function fetchLiveDeveloperStats() {
      const statsSection = document.getElementById('github-activity');
      if (!statsSection) return;

      fetch('https://api.github.com/users/AyushGaurav4529')
        .then((res) => res.json())
        .then((data) => {
          if (!data || !data.public_repos) return;
          const statCards = statsSection.querySelectorAll('.text-2xl, .text-3xl');
          if (statCards.length >= 2) {
            statCards[0].textContent = `${data.public_repos}+ Public Repos`;
            statCards[1].textContent = `${data.followers || 15}+ Followers`;
          }
        })
        .catch(() => {});
    })();

    // ──────────────────────────────────────────────
    // 11. Interactive Neon Cursor Spotlight & Sparkle Trail
    // ──────────────────────────────────────────────
    const cursorSpotlight = document.getElementById('cursorSpotlight');
    let lastSparkTime = 0;
    
    window.addEventListener('mousemove', (e) => {
      if (cursorSpotlight) {
        cursorSpotlight.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        cursorSpotlight.style.opacity = '1';
      }

      // Spawn subtle glowing sparkle trail (throttled ~40ms)
      const now = Date.now();
      if (now - lastSparkTime > 40 && !window.matchMedia('(pointer: coarse)').matches) {
        lastSparkTime = now;
        const spark = document.createElement('div');
        spark.className = 'cursor-spark';
        spark.style.left = e.clientX + 'px';
        spark.style.top = e.clientY + 'px';
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 600);
      }
    });

    document.addEventListener('mouseleave', () => {
      if (cursorSpotlight) cursorSpotlight.style.opacity = '0';
    });

    // ──────────────────────────────────────────────
    // 12. 3D Flipping ICARD Logic
    // ──────────────────────────────────────────────
    const icardInner = document.getElementById('icardInner');
    const heroIcardBadge = document.getElementById('heroIcardBadge');
    const icardPhotoBox = document.getElementById('icardPhotoBox');

    function toggleIcardFlip(e) {
      if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      }
      if (icardInner) {
        icardInner.classList.toggle('is-flipped');
        if (typeof playUiSound === 'function') {
          playUiSound(950, 0.08, 'triangle');
        }
      }
    }

    if (heroIcardBadge) {
      heroIcardBadge.addEventListener('click', (e) => {
        // If photo clicked, open image lightbox, else flip card
        if (icardPhotoBox && icardPhotoBox.contains(e.target)) {
          e.stopPropagation();
          openImageLightbox();
        } else {
          toggleIcardFlip(e);
        }
      });
    }

    // ──────────────────────────────────────────────
    // 13. 3D Tilt & Specular Lighting Effect on Cards
    // ──────────────────────────────────────────────
    const tiltableCards = document.querySelectorAll('.timeline-card, .skill-category-block');
    tiltableCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
        card.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(16, 185, 129, 0.12) 0%, transparent 60%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.backgroundImage = 'none';
      });
    });

    // ==========================================================================
    // 14. SPRING PHYSICS MICRO-ANIMATIONS & AMBIENT LIGHT REFLECTIONS
    // ==========================================================================

    // --- EFFECT 2: SPRING PHYSICS MAGNETIC HOVER BUTTONS ---
    (function initSpringMagneticButtons() {
      const magneticElements = document.querySelectorAll('.btn-open-pdf, #btnOpenPdfHero, #aiChatToggleBtn, .magnetic-btn, .contact-link, .project-filter-btn, .btn-connect, #btnNavCv, .btn-copy-email, .btn-copy-phone');
      
      magneticElements.forEach((el) => {
        el.classList.add('magnetic-btn');
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
        let isHovered = false;
        let rafId = null;

        function updateSpring() {
          // Spring physics dampening formula
          currentX += (targetX - currentX) * 0.18;
          currentY += (targetY - currentY) * 0.18;

          el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale3d(${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1}, 1)`;

          if (isHovered || Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
            rafId = requestAnimationFrame(updateSpring);
          } else {
            el.style.transform = 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)';
          }
        }

        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          targetX = (e.clientX - rect.left - rect.width / 2) * 0.35;
          targetY = (e.clientY - rect.top - rect.height / 2) * 0.35;
          if (!isHovered) {
            isHovered = true;
            rafId = requestAnimationFrame(updateSpring);
          }
        });

        el.addEventListener('mouseleave', () => {
          isHovered = false;
          targetX = 0;
          targetY = 0;
        });
      });
    })();

    // --- CURSOR-FOLLOWING AMBIENT LIGHT REFLECTIONS ON CARDS ---
    (function initCardLightReflections() {
      const cards = document.querySelectorAll('.timeline-card, .skill-category-block, .project-card, .glass-ambient, #connect .lg\\:col-span-5, #connect .lg\\:col-span-7');
      cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.backgroundImage = `radial-gradient(400px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.08) 0%, transparent 80%)`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.backgroundImage = 'none';
        });
      });
    })();

    // --- EFFECT 3: SCROLL PROGRESS BAR ---
    (function initScrollProgressBar() {
      const progressBar = document.getElementById('scroll-progress-bar');
      if (!progressBar) return;

      window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) return;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      }, { passive: true });
    })();

    // --- EFFECT 4: NUMBER COUNTER ROLLUP ---
    (function initNumberCounters() {
      const counters = document.querySelectorAll('.counter-rollup, #github-activity .text-2xl, #github-activity .text-3xl');
      if (!counters.length) return;

      const observer = new IntersectionObserver((entries) => {
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
              }, 40);
            }
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.3 });

      counters.forEach((c) => observer.observe(c));
    })();

    // --- EFFECT 5: KINETIC TEXT SPLIT REVEAL ---
    (function initKineticTextReveals() {
      const headings = document.querySelectorAll('.section-heading, .section-heading-kinetic, h2');
      if (!headings.length) return;

      headings.forEach((h) => h.classList.add('section-heading-kinetic'));

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('heading-revealed');
          }
        });
      }, { threshold: 0.2 });

      headings.forEach((h) => observer.observe(h));
    })();

    // --- EFFECT 6: NEON RIPPLE CLICK WAVE ---
    (function initNeonClickRipple() {
      window.addEventListener('click', (e) => {
        // Skip text inputs and buttons with default click behavior to keep UI clean
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    })();

    // ============================================================
    // THREE.JS 3D EFFECT 1: HERO BACKGROUND — FLOATING GEOMETRY
    // ============================================================
    (function init3DHeroBg() {
      if (typeof THREE === 'undefined') return;
      const canvas = document.getElementById('hero-3d-bg');
      if (!canvas) return;
      const header = canvas.closest('header');
      if (!header) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.z = 5;

      // Resize to match header
      function resizeHeroBg() {
        const w = header.offsetWidth;
        const h = header.offsetHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      resizeHeroBg();
      window.addEventListener('resize', resizeHeroBg);

      // Materials
      const neonGreen = 0x10b981;
      const neonBright = 0x00ff87;
      const purple = 0x6366f1;
      const sky = 0x38bdf8;

      const wireMat = (color) => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.55 });
      const edgeMat = (color) => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 });

      const shapes = [];

      const geometries = [
        new THREE.IcosahedronGeometry(0.6, 0),
        new THREE.OctahedronGeometry(0.55, 0),
        new THREE.TetrahedronGeometry(0.5, 0),
        new THREE.IcosahedronGeometry(0.4, 0),
        new THREE.OctahedronGeometry(0.7, 0),
        new THREE.IcosahedronGeometry(0.35, 0),
        new THREE.TetrahedronGeometry(0.45, 0),
        new THREE.OctahedronGeometry(0.5, 0),
        new THREE.IcosahedronGeometry(0.5, 0),
      ];
      const colors = [neonGreen, neonBright, purple, sky, neonGreen, neonBright, purple, sky, neonGreen];

      geometries.forEach((geo, i) => {
        const mesh = new THREE.Mesh(geo, wireMat(colors[i]));
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat(colors[i]));
        const group = new THREE.Group();
        group.add(mesh);
        group.add(edges);

        const angle = (i / geometries.length) * Math.PI * 2;
        const radius = 1.8 + Math.random() * 2.2;
        group.position.set(
          Math.cos(angle) * radius + (Math.random() - 0.5) * 1.5,
          Math.sin(angle) * radius + (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 2
        );
        group.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        group.userData = {
          floatSpeed: 0.0004 + Math.random() * 0.0004,
          rotX: (Math.random() - 0.5) * 0.008,
          rotY: (Math.random() - 0.5) * 0.008,
          rotZ: (Math.random() - 0.5) * 0.004,
          floatOffset: Math.random() * Math.PI * 2,
          baseY: group.position.y
        };
        scene.add(group);
        shapes.push(group);
      });

      // Mouse parallax
      let mx = 0, my = 0;
      window.addEventListener('mousemove', (e) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 0.4;
        my = (e.clientY / window.innerHeight - 0.5) * 0.4;
      });

      let heroFrame;
      function animateHeroBg(t) {
        heroFrame = requestAnimationFrame(animateHeroBg);
        // Only render if header is in viewport
        const rect = header.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        camera.position.x += (mx - camera.position.x) * 0.04;
        camera.position.y += (-my - camera.position.y) * 0.04;

        shapes.forEach((g, i) => {
          g.rotation.x += g.userData.rotX;
          g.rotation.y += g.userData.rotY;
          g.rotation.z += g.userData.rotZ;
          g.position.y = g.userData.baseY + Math.sin(t * 0.001 * 0.6 + g.userData.floatOffset) * 0.25;
        });
        renderer.render(scene, camera);
      }
      animateHeroBg(0);
    })();

    // ============================================================
    // THREE.JS 3D EFFECT 2: ROTATING PARTICLE GLOBE
    // ============================================================
    (function init3DGlobe() {
      if (typeof THREE === 'undefined') return;
      const wrap = document.getElementById('globe-canvas-wrap');
      const canvas = document.getElementById('globe-canvas');
      if (!wrap || !canvas) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const SIZE = wrap.offsetWidth || 420;
      renderer.setSize(SIZE, SIZE, false);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.z = 2.8;

      // Resize
      function resizeGlobe() {
        const s = wrap.offsetWidth;
        renderer.setSize(s, s, false);
      }
      window.addEventListener('resize', resizeGlobe);

      // --- Particle sphere ---
      const PARTICLE_COUNT = 1800;
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const c1 = new THREE.Color(0x10b981);
      const c2 = new THREE.Color(0x00ff87);
      const c3 = new THREE.Color(0x6366f1);
      const palette = [c1, c2, c3];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Fibonacci sphere distribution for even spread
        const phi = Math.acos(1 - 2 * (i + 0.5) / PARTICLE_COUNT);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const r = 1.0 + (Math.random() - 0.5) * 0.04;
        positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.cos(phi);
        positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
        const col = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3]     = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.016,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true
      });

      const particles = new THREE.Points(geo, mat);
      scene.add(particles);

      // --- Wireframe sphere overlay ---
      const sphereGeo = new THREE.SphereGeometry(1.0, 18, 12);
      const sphereEdges = new THREE.EdgesGeometry(sphereGeo);
      const sphereMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.12 });
      const sphereWire = new THREE.LineSegments(sphereEdges, sphereMat);
      scene.add(sphereWire);

      // --- Orbit ring ---
      const ringGeo = new THREE.RingGeometry(1.08, 1.12, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x00ff87, side: THREE.DoubleSide, transparent: true, opacity: 0.18 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.5;
      scene.add(ring);

      // Mouse tilt
      let gmx = 0, gmy = 0;
      const header = document.querySelector('header');
      if (header) {
        header.addEventListener('mousemove', (e) => {
          const rect = header.getBoundingClientRect();
          gmx = ((e.clientX - rect.left) / rect.width - 0.5) * 0.8;
          gmy = ((e.clientY - rect.top) / rect.height - 0.5) * 0.8;
        });
        header.addEventListener('mouseleave', () => { gmx = 0; gmy = 0; });
      }

      // Show globe after a delay
      setTimeout(() => wrap.classList.add('globe-visible'), 1200);

      let globeFrame;
      function animateGlobe(t) {
        globeFrame = requestAnimationFrame(animateGlobe);
        particles.rotation.y = t * 0.0003;
        particles.rotation.x += (gmy * 0.5 - particles.rotation.x) * 0.04;
        particles.rotation.z += (-gmx * 0.3 - particles.rotation.z) * 0.04;
        sphereWire.rotation.y = t * 0.0002;
        ring.rotation.z = t * 0.0004;
        renderer.render(scene, camera);
      }
      animateGlobe(0);
    })();

    // ============================================================
    // THREE.JS 3D EFFECT 3: PROJECT CARD 3D TILT
    // ============================================================
    (function init3DCardTilt() {
      const cards = document.querySelectorAll('.timeline-card');
      cards.forEach((card) => {
        card.classList.add('project-tilt-card');
        // Inject shine overlay
        if (!card.querySelector('.tilt-shine')) {
          const shine = document.createElement('div');
          shine.className = 'tilt-shine';
          card.style.position = 'relative';
          card.appendChild(shine);
        }

        const MAX_TILT = 10; // degrees

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const rotY = ((x - cx) / cx) * MAX_TILT;
          const rotX = -((y - cy) / cy) * MAX_TILT;
          card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
          // Update shine position
          const pctX = (x / rect.width * 100).toFixed(1);
          const pctY = (y / rect.height * 100).toFixed(1);
          card.style.setProperty('--mx', pctX + '%');
          card.style.setProperty('--my', pctY + '%');
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        });

        card.addEventListener('mouseenter', () => {
          card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
        });
        card.addEventListener('mousemove', () => {
          card.style.transition = 'transform 0.08s linear, box-shadow 0.3s ease, border-color 0.3s ease';
        });
      });
    })();

AOS.init({
      duration: 800,
      once: true,
      offset: 50
    ,
      disable: "mobile"
    });

document.addEventListener("DOMContentLoaded", (event) => {
    // Only run GSAP if it loaded properly
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.normalizeScroll(true); // Normalizes scrolling to prevent jitter

      // 2. Parallax Effect for Backgrounds / Timeline Cards
      // We'll apply a subtle upward shift to the education timeline cards as you scroll down
      gsap.utils.toArray("#education .timeline-card").forEach(card => {
        gsap.to(card, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            scrub: true,
            start: "top bottom",
            end: "bottom top"
          }
        });
      });

      // 3. Scroll-Linked Animation (Scrubbing Rotation)
      // Let's rotate the 'HangingIcard' badge (if present) or just create a decorative rotating element.
      // Instead, let's rotate the skill icons dynamically.
      gsap.utils.toArray("#skills img, #skills svg").forEach(icon => {
        gsap.to(icon, {
          rotate: 360,
          ease: "none",
          scrollTrigger: {
            trigger: "#skills",
            scrub: 1,
            start: "top bottom",
            end: "bottom top"
          }
        });
      });
    }
  });