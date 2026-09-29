// src/js/pdfViewer.js
// Lazy-Loaded In-Browser PDF Resume Viewer Modal

import { playChimeSound } from './audio.js';

let isPdfRendered = false;

export async function loadAndRenderPdf() {
  const pdfCanvasWrapper = document.getElementById('pdfCanvasWrapper');
  if (!pdfCanvasWrapper) return;

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

export function openPdfModal() {
  const modal = document.getElementById('pdfViewerModal');
  const card = document.getElementById('pdfModalCard');
  if (!modal || !card) return;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  card.classList.remove('scale-95');
  card.classList.add('scale-100');
  playChimeSound();

  if (!isPdfRendered) {
    loadAndRenderPdf();
  }
}

export function hidePdfModal() {
  const modal = document.getElementById('pdfViewerModal');
  const card = document.getElementById('pdfModalCard');
  if (!modal || !card) return;
  modal.classList.add('opacity-0', 'pointer-events-none');
  card.classList.remove('scale-100');
  card.classList.add('scale-95');
}

export function initPdfViewer() {
  const closeBtn = document.getElementById('closePdfModal');
  const modal = document.getElementById('pdfViewerModal');

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
