// src/js/contact.js
// Contact Form Submission, Toast Notifications & Clipboard Copy Helpers

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
  }, 3200);
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

  // 2. Contact Form Handler (FormSubmit API with Mailto Fallback)
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('btnSubmitContact');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value || '';
      const email = document.getElementById('contact-email')?.value || '';
      const subject = document.getElementById('contact-subject')?.value || 'Portfolio Contact Inquiry';
      const message = document.getElementById('contact-message')?.value || '';

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span>`;

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
          showToast(`Thank you ${name}! Your message has been sent to Ayush.`);
          playChimeSound();
          contactForm.reset();
        } else {
          throw new Error('Server returned non-200');
        }
      } catch (err) {
        // Fallback to mailto
        const mailtoUrl = `mailto:ayushgaurav4529@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoUrl;
        showToast('Opening your email client to send the message!');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }
}
