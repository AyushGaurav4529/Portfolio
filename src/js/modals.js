// src/js/modals.js
// Modal Dialogs: Profile, Image Lightbox, Project Details & Certificate Verifier

import { playChimeSound, playUiSound } from './audio.js';

// ─── 1. Profile Modal ───
export function openProfileModal() {
  const modal = document.getElementById('profileModal');
  const card = document.getElementById('profileModalCard');
  if (!modal || !card) return;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  card.classList.remove('scale-95');
  card.classList.add('scale-100');
  playChimeSound();
}

export function hideProfileModal() {
  const modal = document.getElementById('profileModal');
  const card = document.getElementById('profileModalCard');
  if (!modal || !card) return;
  modal.classList.add('opacity-0', 'pointer-events-none');
  card.classList.remove('scale-100');
  card.classList.add('scale-95');
}

// ─── 2. Image Lightbox Modal ───
export function openImageLightbox() {
  const modal = document.getElementById('imageLightboxModal');
  const card = document.getElementById('lightboxCard');
  if (!modal || !card) return;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  card.classList.remove('scale-95');
  card.classList.add('scale-100');
  playChimeSound();
}

export function hideImageLightbox() {
  const modal = document.getElementById('imageLightboxModal');
  const card = document.getElementById('lightboxCard');
  if (!modal || !card) return;
  modal.classList.add('opacity-0', 'pointer-events-none');
  card.classList.remove('scale-100');
  card.classList.add('scale-95');
}

// ─── 3. Project Detail Quick View Modal ───
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

export function openProjectModal(projectId) {
  const data = projectData[projectId];
  const modal = document.getElementById('projectDetailModal');
  const card = document.getElementById('projectDetailCard');
  if (!data || !modal || !card) return;

  const tagEl = document.getElementById('projDetailTag');
  const titleEl = document.getElementById('projDetailTitle');
  const subtitleEl = document.getElementById('projDetailSubtitle');
  const descEl = document.getElementById('projDetailDesc');
  const featList = document.getElementById('projDetailFeatures');
  const stackContainer = document.getElementById('projDetailStack');
  const ghBtn = document.getElementById('projDetailGithubBtn');

  if (tagEl) tagEl.textContent = data.tag;
  if (titleEl) titleEl.textContent = data.title;
  if (subtitleEl) subtitleEl.textContent = data.subtitle;
  if (descEl) descEl.textContent = data.desc;

  if (featList) {
    featList.innerHTML = data.features
      .map((f) => `<li class="flex items-center gap-2"><span class="text-neon">✓</span> ${f}</li>`)
      .join('');
  }

  if (stackContainer) {
    stackContainer.innerHTML = data.stack
      .map((s) => `<span class="bg-neon/10 text-neon px-2.5 py-1 rounded border border-neon/30">${s}</span>`)
      .join('');
  }

  if (ghBtn) {
    const targetUrl = data.github.replace(/\.git$/, '');
    ghBtn.setAttribute('href', targetUrl);
    ghBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    };
  }

  modal.classList.remove('opacity-0', 'pointer-events-none');
  card.classList.remove('scale-95');
  card.classList.add('scale-100');
  playChimeSound();
}

export function hideProjectModal() {
  const modal = document.getElementById('projectDetailModal');
  const card = document.getElementById('projectDetailCard');
  if (!modal || !card) return;
  modal.classList.add('opacity-0', 'pointer-events-none');
  card.classList.remove('scale-100');
  card.classList.add('scale-95');
}

// ─── 4. Certificate & Credential Verifier Modal ───
const certData = {
  'bootcamp-tech': {
    typeTag: 'Verified Credential',
    title: '3-days Bootcamp: The World of Tech 2.0',
    issuer: 'Google Developer Groups',
    date: 'Feb 2025',
    skills: ['Cloud Computing', 'Web Technologies', 'AI Foundations'],
    buttonText: 'Verify Official Credential',
    url: 'https://drive.google.com/file/d/1Xvy7CQftCCuANOdqVzBP4TpUc1lhBsor/view'
  },
  'dsa-gfg': {
    typeTag: 'Verified Credential',
    title: 'Data Structures & Algorithms Session',
    issuer: 'GeeksforGeeks',
    date: '2024',
    skills: ['Data Structures', 'Algorithms', 'Problem Solving'],
    buttonText: 'Verify Official Credential',
    url: 'https://drive.google.com/file/d/1Xvy7CQftCCuANOdqVzBP4TpUc1lhBsor/view'
  },
  'bootcamp-ml': {
    typeTag: 'Verified Credential',
    title: '3-Days ML Bootcamp',
    issuer: 'Google Developer Groups',
    date: 'Feb 2025',
    skills: ['Machine Learning', 'Python', 'Neural Models'],
    buttonText: 'Verify Official Credential',
    url: 'https://drive.google.com/file/d/166EiXmBg7qTiDnsVKPPQBY-EEvOXf12M/view'
  },
  'python-scaler': {
    typeTag: 'Verified Credential',
    title: 'Python Course for Beginners: Mastering the Essentials',
    issuer: 'Scaler',
    date: '2024',
    skills: ['Python', 'OOP', 'Data Analysis'],
    buttonText: 'Verify Official Credential',
    url: 'https://drive.google.com/file/d/1KfD16kwQXcX4EFrmR0s_H1mePohgmwha/view'
  },
  'fantomcode-hack': {
    typeTag: 'Hackathon Record',
    title: 'FantomCode Hackathon',
    issuer: 'RVITM',
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
    date: 'April 2026',
    projectBuilt: 'HomePlate (Mobile App)',
    projectId: 'homeplate',
    skills: ['Dart', 'Flutter', 'Firebase', 'Mobile UI'],
    buttonText: 'Verify Official Credential',
    url: 'https://media.licdn.com/dms/image/v2/D5622AQEDt-NjvBrf0w/feedshare-shrink_1280/B56Z4YRClMJkAU-/0/1778523580978?e=1787788800&v=beta&t=-E3Kkuvapj5vYT0OoeFN_7atnoFoo1_-4DnYRUV-gQM'
  }
};

export function openCertModal(certKey) {
  const data = certData[certKey] || certData['bootcamp-tech'];
  const modal = document.getElementById('certVerifierModal');
  const card = document.getElementById('certModalCard');
  if (!modal || !card) return;

  const titleEl = document.getElementById('certModalTitle');
  const issuerEl = document.getElementById('certModalIssuer');
  const dateEl = document.getElementById('certModalDate');
  const verifyBtn = document.getElementById('certVerifyBtn');
  const tagEl = document.getElementById('certModalTag');
  const btnTextEl = document.getElementById('certVerifyBtnText');
  const projectRow = document.getElementById('certModalProjectRow');
  const projectEl = document.getElementById('certModalProject');
  const skillsBlock = document.getElementById('certModalSkillsBlock');
  const skillsContainer = document.getElementById('certModalSkills');

  if (titleEl) titleEl.textContent = data.title;
  if (issuerEl) issuerEl.textContent = data.issuer;
  if (dateEl) dateEl.textContent = data.date;
  if (verifyBtn) verifyBtn.setAttribute('href', data.url);
  if (tagEl) tagEl.textContent = data.typeTag || 'Verified Credential';
  if (btnTextEl) btnTextEl.textContent = data.buttonText || 'Verify Official Credential';

  if (data.projectBuilt && projectRow && projectEl) {
    if (data.projectId) {
      projectEl.innerHTML = `<button id="openProjectFromCertBtn" class="text-neon font-bold underline hover:text-neonBright cursor-pointer flex items-center gap-1 text-left">${data.projectBuilt} ↗</button>`;
      setTimeout(() => {
        const btn = document.getElementById('openProjectFromCertBtn');
        if (btn) {
          btn.onclick = (e) => {
            e.preventDefault();
            hideCertModal();
            openProjectModal(data.projectId);
          };
        }
      }, 50);
    } else {
      projectEl.textContent = data.projectBuilt;
    }
    projectRow.classList.remove('hidden');
  } else if (projectRow) {
    projectRow.classList.add('hidden');
  }

  if (data.skills && data.skills.length > 0 && skillsBlock && skillsContainer) {
    skillsContainer.innerHTML = data.skills
      .map((s) => `<span class="bg-neon/10 text-neon px-2 py-0.5 rounded border border-neon/30">${s}</span>`)
      .join('');
    skillsBlock.classList.remove('hidden');
  } else if (skillsBlock) {
    skillsBlock.classList.add('hidden');
  }

  modal.classList.remove('opacity-0', 'pointer-events-none');
  card.classList.remove('scale-95');
  card.classList.add('scale-100');
  playChimeSound();
}

export function hideCertModal() {
  const modal = document.getElementById('certVerifierModal');
  const card = document.getElementById('certModalCard');
  if (!modal || !card) return;
  modal.classList.add('opacity-0', 'pointer-events-none');
  card.classList.remove('scale-100');
  card.classList.add('scale-95');
}

// ─── Initialize All Modal Listeners ───
export function initModals() {
  // Profile
  const brandProfileBtn = document.getElementById('brandProfileBtn');
  const closeProfileBtn = document.getElementById('closeProfileModal');
  const profileModal = document.getElementById('profileModal');
  if (brandProfileBtn) brandProfileBtn.addEventListener('click', openProfileModal);
  if (closeProfileBtn) closeProfileBtn.addEventListener('click', hideProfileModal);
  if (profileModal) {
    profileModal.addEventListener('click', (e) => {
      if (e.target === profileModal) hideProfileModal();
    });
  }

  // Lightbox
  const profileAvatar = document.getElementById('profileAvatarContainer');
  const heroAvatar = document.getElementById('heroAvatarContainer');
  const closeLightboxBtn = document.getElementById('closeLightboxModal');
  const imageLightboxModal = document.getElementById('imageLightboxModal');
  if (profileAvatar) {
    profileAvatar.addEventListener('click', (e) => {
      e.stopPropagation();
      openImageLightbox();
    });
  }
  if (heroAvatar) {
    heroAvatar.addEventListener('click', (e) => {
      e.stopPropagation();
      openImageLightbox();
    });
  }
  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', hideImageLightbox);
  if (imageLightboxModal) {
    imageLightboxModal.addEventListener('click', (e) => {
      if (e.target === imageLightboxModal) hideImageLightbox();
    });
  }

  // Project Modal
  const closeProjectBtn = document.getElementById('closeProjectModal');
  const projectDetailModal = document.getElementById('projectDetailModal');
  if (closeProjectBtn) closeProjectBtn.addEventListener('click', hideProjectModal);
  if (projectDetailModal) {
    projectDetailModal.addEventListener('click', (e) => {
      if (e.target === projectDetailModal) hideProjectModal();
    });
  }

  document.querySelectorAll('.project-card-trigger').forEach((card) => {
    card.addEventListener('click', () => {
      const pid = card.getAttribute('data-project-id');
      if (pid) openProjectModal(pid);
    });
  });

  // Certificate Modal
  const closeCertBtn = document.getElementById('closeCertModal');
  const certModal = document.getElementById('certVerifierModal');
  if (closeCertBtn) closeCertBtn.addEventListener('click', hideCertModal);
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) hideCertModal();
    });
  }

  // Add click triggers on certifications & hackathons cards
  const certKeys = ['bootcamp-tech', 'dsa-gfg', 'bootcamp-ml', 'python-scaler'];
  document.querySelectorAll('#certifications .timeline-card').forEach((card, index) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      openCertModal(certKeys[index % certKeys.length]);
    });
  });

  const hackKeys = ['fantomcode-hack', 'nirmith-hack', 'vibe-hack'];
  document.querySelectorAll('#hackathons .timeline-card').forEach((card, index) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      openCertModal(hackKeys[index % hackKeys.length]);
    });
  });

  // Centralized ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideProfileModal();
      hideImageLightbox();
      hideProjectModal();
      hideCertModal();
    }
  });
}
