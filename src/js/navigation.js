// src/js/navigation.js
// Navigation, Mobile Drawer, ScrollSpy & Back to Top

export function initNavigation() {
  // 1. Mobile Drawer Navigation
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

  // 2. Direct Webmail & App Mail Composer Launcher
  document.querySelectorAll('a[href*="ayushgaurav4529@gmail.com"], a[href^="mailto:"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=ayushgaurav4529@gmail.com&su=Hello%20Ayush%20-%20Portfolio%20Inquiry', '_blank');
    });
  });

  // 3. Scroll Progress Bar
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  let isScrollProgressUpdating = false;

  function updateScrollProgress() {
    if (scrollProgressBar) {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
    }
    isScrollProgressUpdating = false;
  }

  // 4. ScrollSpy: Real-time active section tracking (RAF Throttled)
  const SECTION_ORDER = [
    'hero',
    'summary',
    'education',
    'projects',
    'certifications',
    'hackathons',
    'skills',
    'github-activity',
    'testimonials',
    'connect'
  ];

  const sideNavItems = document.querySelectorAll('.side-nav-item');
  const topNavLinks = document.querySelectorAll('.top-navbar .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  let isNavScrollUpdating = false;
  let activeSectionId = '';

  function getTrackedSections() {
    const sections = [];
    SECTION_ORDER.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sections.push(el);
    });
    // Collect any other section with an ID on the page
    document.querySelectorAll('section[id]').forEach((el) => {
      if (!sections.includes(el)) sections.push(el);
    });
    return sections;
  }

  function setActiveSectionUI(currentSectionId) {
    if (!currentSectionId) return;
    activeSectionId = currentSectionId;

    // 1. Left Side Navigation Items
    sideNavItems.forEach((item) => {
      const section = item.getAttribute('data-section');
      if (section === currentSectionId) {
        item.classList.add('active');
        item.setAttribute('aria-current', 'true');
      } else {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
      }
    });

    // 2. Top Navigation Links
    topNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === '#' + currentSectionId) {
        link.classList.add('text-neon', 'font-bold');
        link.classList.remove('text-textSecondary');
      } else {
        link.classList.remove('text-neon', 'font-bold');
        link.classList.add('text-textSecondary');
      }
    });

    // 3. Mobile Navigation Links
    mobileNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === '#' + currentSectionId) {
        link.classList.add('border-neon', 'text-neon');
        link.classList.remove('border-darkBorder');
      } else {
        link.classList.remove('border-neon', 'text-neon');
        link.classList.add('border-darkBorder');
      }
    });
  }

  function determineActiveSection() {
    const trackedSections = getTrackedSections();
    if (!trackedSections.length) return '';

    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // 1. Top of page -> Hero / Home
    if (scrollY < 120) {
      return trackedSections[0]?.id || 'hero';
    }

    // 2. Bottom of page -> Connect (Contact)
    if (scrollY + viewportHeight >= docHeight - 80) {
      return 'connect';
    }

    // 3. Focal line: the natural eye-reading focus line below the sticky top navbar
    const focalPoint = Math.min(240, Math.max(120, viewportHeight * 0.3));

    // Find section containing the focalPoint
    for (let i = 0; i < trackedSections.length; i++) {
      const sec = trackedSections[i];
      const rect = sec.getBoundingClientRect();
      if (rect.top <= focalPoint && rect.bottom > focalPoint) {
        return sec.id;
      }
    }

    // 4. Fallback: section with largest visible height on screen
    let bestId = '';
    let maxVisibleHeight = -1;

    trackedSections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      if (visibleHeight > maxVisibleHeight && visibleHeight > 50) {
        maxVisibleHeight = visibleHeight;
        bestId = sec.id;
      }
    });

    return bestId || activeSectionId || 'hero';
  }

  function updateActiveNavOnScroll() {
    const currentId = determineActiveSection();
    if (currentId) {
      setActiveSectionUI(currentId);
    }
    isNavScrollUpdating = false;
  }

  // Instant response on clicking side nav items
  sideNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      const sec = item.getAttribute('data-section');
      if (sec) {
        setActiveSectionUI(sec);
      }
    });
  });

  // 5. Back to Top Floating Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  let isBackToTopUpdating = false;

  function updateBackToTop() {
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    }
    isBackToTopUpdating = false;
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Single unified scroll listener driving RAF updates
  window.addEventListener('scroll', () => {
    if (!isScrollProgressUpdating) {
      isScrollProgressUpdating = true;
      requestAnimationFrame(updateScrollProgress);
    }
    if (!isNavScrollUpdating) {
      isNavScrollUpdating = true;
      requestAnimationFrame(updateActiveNavOnScroll);
    }
    if (!isBackToTopUpdating) {
      isBackToTopUpdating = true;
      requestAnimationFrame(updateBackToTop);
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!isNavScrollUpdating) {
      isNavScrollUpdating = true;
      requestAnimationFrame(updateActiveNavOnScroll);
    }
  }, { passive: true });

  // Initial call on load
  updateScrollProgress();
  updateActiveNavOnScroll();
  updateBackToTop();
}
