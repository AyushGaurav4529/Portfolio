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
  const trackedSections = document.querySelectorAll('section[id]');
  const sideNavItems = document.querySelectorAll('.side-nav-item');
  const topNavLinks = document.querySelectorAll('.top-navbar .nav-link');
  let isNavScrollUpdating = false;

  function updateActiveNavOnScroll() {
    let currentSectionId = '';
    // Use mid-viewport as the trigger point for better accuracy
    const scrollPosition = window.scrollY + window.innerHeight * 0.5;

    trackedSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Activate "connect" when near the bottom of the page (last section is short)
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
      currentSectionId = 'connect';
    }

    sideNavItems.forEach((item) => {
      if (item.getAttribute('data-section') === currentSectionId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

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

  // Initial call on load
  updateScrollProgress();
  updateActiveNavOnScroll();
  updateBackToTop();
}
