// src/js/pdfViewer.js
// Lazy-Loaded In-Browser PDF Resume Viewer Modal (Optimized for iOS Safari & Cross-Platform)

import { playChimeSound } from './audio.js';

let isPdfRendered = false;

// Helper to detect iOS Safari / iPadOS
function isIosDevice() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

export async function loadAndRenderPdf() {
  const pdfCanvasWrapper = document.getElementById('pdfCanvasWrapper');
  if (!pdfCanvasWrapper) return;

  // Apply iOS inertial touch scrolling
  pdfCanvasWrapper.style.webkitOverflowScrolling = 'touch';

  // Dynamically load pdf.js only when needed
  if (typeof window.pdfjsLib === 'undefined') {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  const pdfjsLib = window.pdfjsLib;

  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    const loadingTask = pdfjsLib.getDocument('Ayush_Gaurav_CV.pdf');
    const pdf = await loadingTask.promise;

    pdfCanvasWrapper.innerHTML = '';

    const isIos = isIosDevice();

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const containerWidth = pdfCanvasWrapper.clientWidth || (window.innerWidth > 768 ? 760 : window.innerWidth - 32);
      const unscaledViewport = page.getViewport({ scale: 1.0 });

      // iOS Safari has strict canvas RAM bounds (~4096px / 16MB). Safely clamp viewport scale.
      const maxAllowedScale = isIos ? 1.35 : 1.75;
      const calculatedScale = Math.min((containerWidth - 24) / unscaledViewport.width, maxAllowedScale);
      const scale = Math.max(calculatedScale, 0.85);

      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      canvas.className = 'shadow-2xl rounded-lg max-w-full h-auto my-2 border border-white/10 block mx-auto';
      const context = canvas.getContext('2d', { willReadFrequently: false });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      pdfCanvasWrapper.appendChild(canvas);

      await page.render({ canvasContext: context, viewport }).promise;
    }
    isPdfRendered = true;
  } catch (err) {
    console.warn('PDF.js rendering fallback for iOS/Browser:', err);
    // iOS Safari native embed fallback with Open & Download CTA
    pdfCanvasWrapper.innerHTML = `
      <div class="p-8 text-center text-white flex flex-col items-center justify-center h-full gap-4 max-w-md mx-auto">
        <div class="w-12 h-12 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center text-neon font-bold text-xl mb-1">
          📄
        </div>
        <h4 class="text-base font-bold text-white">Ayush Gaurav — Official Resume</h4>
        <p class="text-gray-300 text-xs leading-relaxed">Preview is fully accessible directly in Safari. You can open it in a dedicated tab or download the PDF file below.</p>
        <div class="flex flex-wrap gap-3 justify-center pt-2">
          <a href="Ayush_Gaurav_CV.pdf" target="_blank" rel="noopener" class="px-5 py-2.5 bg-neon hover:bg-neonBright text-dark font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5">
            <span>Open in New Tab ↗</span>
          </a>
          <a href="Ayush_Gaurav_CV.pdf" download="Ayush_Gaurav_CV.pdf" class="px-5 py-2.5 bg-darkCard hover:bg-dark border border-neon/40 text-neon font-bold text-xs rounded-xl transition-all flex items-center gap-1.5">
            <span>Download PDF ↓</span>
          </a>
        </div>
      </div>
    `;
  }
}

export function openPdfModal() {
  const modal = document.getElementById('pdfViewerModal');
  const card = document.getElementById('pdfModalCard');
  const wrapper = document.getElementById('pdfCanvasWrapper');
  if (!modal || !card) return;

  document.body.style.overflow = 'hidden';
  modal.removeAttribute('inert');
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.remove('opacity-0', 'pointer-events-none');
  card.classList.remove('scale-95');
  card.classList.add('scale-100');
  playChimeSound();

  if (!isPdfRendered && wrapper) {
    if (!wrapper.querySelector('iframe')) {
      wrapper.innerHTML = `
        <div class="p-6 text-center text-textMuted text-xs flex items-center justify-center gap-2 h-40">
          <span class="w-2 h-2 rounded-full bg-neon animate-ping inline-block"></span>
          <span>Initializing PDF resume engine...</span>
        </div>
      `;
    }
    loadAndRenderPdf();
  }

  const closeBtn = document.getElementById('closePdfModal');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
}

export function hidePdfModal() {
  const modal = document.getElementById('pdfViewerModal');
  const card = document.getElementById('pdfModalCard');
  if (!modal || !card) return;

  document.body.style.overflow = '';
  modal.setAttribute('inert', '');
  modal.setAttribute('aria-hidden', 'true');
  modal.classList.add('opacity-0', 'pointer-events-none');
  card.classList.remove('scale-100');
  card.classList.add('scale-95');
}

export function initPdfViewer() {
  const closeBtn = document.getElementById('closePdfModal');
  const modal = document.getElementById('pdfViewerModal');

  if (modal) {
    modal.setAttribute('inert', '');
    modal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.btn-open-pdf').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPdfModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', hidePdfModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hidePdfModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hidePdfModal();
  });
}
