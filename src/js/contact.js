// src/js/contact.js
// Contact Form Submission (Vercel Serverless Function Consumer with Spam Protection & Fallback)

import { playChimeSound } from './audio.js';

let toastTimeout = null;

export function showToast(message) {
  const toastEl = document.getElementById('toast-notification');
  const toastMsgEl = document.getElementById('toast-message');
  if (!toastEl || !toastMsgEl) return;

  toastMsgEl.textContent = message;
  toastEl.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
  toastEl.classList.add('opacity-100', 'translate-y-0');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    toastEl.classList.remove('opacity-100', 'translate-y-0');
  }, 3500);
}

export function initContact() {
  // 1. Copy Buttons
  document.querySelectorAll('.btn-copy-email').forEach((btn) => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText('ayushgaurav4529@gmail.com');
      showToast('Email address copied to clipboard!');
      playChimeSound();
    });
  });

  document.querySelectorAll('.btn-copy-phone').forEach((btn) => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText('+918295813878');
      showToast('Phone number copied to clipboard!');
      playChimeSound();
    });
  });

  // Track initial load timestamp for anti-bot speed check
  const formLoadTime = Date.now();
  const timestampInput = document.getElementById('contact-timestamp');
  if (timestampInput) {
    timestampInput.value = formLoadTime.toString();
  }

  // 2. Contact Form Handler (Vercel Serverless Function with Fallback)
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('btnSubmitContact');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value?.trim() || '';
      const email = document.getElementById('contact-email')?.value?.trim() || '';
      const subject = document.getElementById('contact-subject')?.value?.trim() || 'Portfolio Contact Inquiry';
      const message = document.getElementById('contact-message')?.value?.trim() || '';
      const gotcha = document.getElementById('contact-gotcha')?.value || '';

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-dark animate-ping inline-block"></span>
          <span>Sending via Serverless Gateway...</span>
        </span>
      `;

      let sentSuccessfully = false;

      // Primary Attempt: Vercel Serverless API (/api/contact)
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message,
            _gotcha: gotcha,
            timestamp: formLoadTime
          })
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          sentSuccessfully = true;
          showToast(data.message || `Thank you, ${name}! Your message has been sent to Ayush.`);
          playChimeSound();
          contactForm.reset();
        } else if (res.status === 429) {
          showToast(data.error || 'Too many submissions. Please wait a few minutes.');
          sentSuccessfully = true; // Handled
        }
      } catch (apiErr) {
        console.warn('Serverless contact endpoint unreachable, attempting fallback:', apiErr);
      }

      // Secondary Fallback: Direct FormSubmit if Serverless function is unavailable
      if (!sentSuccessfully) {
        try {
          const fallbackRes = await fetch('https://formsubmit.co/ajax/ayushgaurav4529@gmail.com', {
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

          if (fallbackRes.ok) {
            showToast(`Thank you, ${name}! Your message has been sent to Ayush.`);
            playChimeSound();
            contactForm.reset();
            sentSuccessfully = true;
          } else {
            throw new Error('Fallback failed');
          }
        } catch (fallbackErr) {
          // Final Fallback: Native Mailto Link
          const mailtoUrl = `mailto:ayushgaurav4529@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
          window.location.href = mailtoUrl;
          showToast('Opening your default email client to send message!');
        }
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    });
  }
}
