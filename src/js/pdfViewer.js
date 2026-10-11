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
        <object aria-label="Ayush Gaurav Resume PDF" class="w-full h-full border-0 bg-white" data="Ayush_Gaurav_CV.pdf" title="Ayush Gaurav Resume PDF" type="application/pdf">
          <iframe class="w-full h-full border-0 bg-white" src="Ayush_Gaurav_CV.pdf#toolbar=0" title="Ayush Gaurav Resume PDF">
            <div class="p-8 text-center text-white flex flex-col items-center justify-center h-full gap-4">
              <p class="text-gray-300">Unable to preview PDF directly in your browser.</p>
              <a href="Ayush_Gaurav_CV.pdf" target="_blank" class="px-5 py-2.5 bg-neon text-dark font-bold rounded-lg shadow-lg">Open PDF in New Tab</a>
            </div>
          </iframe>
        </object>
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

