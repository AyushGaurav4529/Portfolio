// src/js/terminal.js
// Interactive Hacker CLI Terminal Modal (Ctrl + `)

import { playChimeSound, playUiSound } from './audio.js';
import { toggleTheme } from './theme.js';

export function initTerminal() {
  const modal = document.getElementById('terminalModal');
  const card = document.getElementById('terminalCard');
  const openBtn = document.getElementById('cliModalBtn');
  const closeBtn = document.getElementById('closeTerminalBtn');
  const input = document.getElementById('terminalInput');
  const output = document.getElementById('terminalOutput');

  if (!modal || !card || !input || !output) return;

  function showTerminal() {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    card.classList.remove('scale-95');
    card.classList.add('scale-100');
    setTimeout(() => input.focus(), 80);
    playChimeSound();
  }

  function hideTerminal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
    input.blur();
  }

  function toggleTerminal() {
    if (modal.classList.contains('opacity-0')) {
      showTerminal();
    } else {
      hideTerminal();
    }
  }

  if (openBtn) openBtn.addEventListener('click', showTerminal);
  if (closeBtn) closeBtn.addEventListener('click', hideTerminal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideTerminal();
  });

  // Ctrl + ` or Cmd + `
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '`') {
      e.preventDefault();
      toggleTerminal();
    }
    if (e.key === 'Escape' && !modal.classList.contains('opacity-0')) {
      hideTerminal();
    }
  });

  output.addEventListener('click', () => {
    input.focus();
  });

  function appendOutput(html) {
    const div = document.createElement('div');
    div.className = 'my-1 text-xs space-y-1';
    div.innerHTML = html;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.value.trim().toLowerCase();
    if (!cmd) return;

    playUiSound(850, 0.04);
    appendOutput(`<p><span class="text-neon font-bold">ayush@portfolio:~$</span> <span class="text-white">${cmd}</span></p>`);

    switch (cmd) {
      case 'help':
        appendOutput(`
          <p class="text-neon font-bold mb-1">Available System Commands:</p>
          <p><strong class="text-neonBright">about</strong>       - Display profile overview</p>
          <p><strong class="text-neonBright">skills</strong>      - List technical competencies & stack</p>
          <p><strong class="text-neonBright">projects</strong>    - List featured applications</p>
          <p><strong class="text-neonBright">contact</strong>     - Get direct email & social handles</p>
          <p><strong class="text-neonBright">theme</strong>       - Toggle Dark / Light mode</p>
          <p><strong class="text-neonBright">clear</strong>       - Clear terminal buffer</p>
          <p><strong class="text-neonBright">matrix</strong>      - Trigger cyberpunk code visualizer</p>
          <p><strong class="text-neonBright">exit</strong>        - Close CLI session</p>
        `);
        break;

      case 'about':
        appendOutput(`<p class="text-textSecondary">Ayush Gaurav — Computer Science Engineering Undergrad specializing in AI, Machine Learning, and Full-Stack scalable web applications.</p>`);
        break;

      case 'skills':
        appendOutput(`
          <p><span class="text-neon font-bold">AI & ML:</span> <span class="text-textSecondary">Python, PyTorch, TensorFlow, OpenCV, Scikit-learn, NLP</span></p>
          <p><span class="text-neon font-bold">Full Stack:</span> <span class="text-textSecondary">JavaScript, TypeScript, React, Node.js, Express, Tailwind CSS</span></p>
          <p><span class="text-neon font-bold">Databases & Cloud:</span> <span class="text-textSecondary">MySQL, PostgreSQL, MongoDB, Firebase, Git, Docker, Vercel</span></p>
        `);
        break;

      case 'projects':
        appendOutput(`
          <p>1. <strong class="text-neonBright">Retail Guard</strong> - Real-Time AI Threat Detection System</p>
          <p>2. <strong class="text-neonBright">HomePlate</strong> - Flutter & Node.js Food Logistics App</p>
          <p>3. <strong class="text-neonBright">Hotel Management</strong> - Python & SQL Operations Engine</p>
          <p>4. <strong class="text-neonBright">Inventory System</strong> - Responsive Stock Tracker</p>
        `);
        setTimeout(() => {
          hideTerminal();
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }, 700);
        break;

      case 'contact':
        appendOutput(`
          <p>Email: <a href="mailto:ayushgaurav4529@gmail.com" class="text-neon underline">ayushgaurav4529@gmail.com</a></p>
          <p>GitHub: <a href="https://github.com/AyushGaurav4529" target="_blank" class="text-neon underline">github.com/AyushGaurav4529</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/ayugaurav/" target="_blank" class="text-neon underline">linkedin.com/in/ayugaurav</a></p>
        `);
        break;

      case 'theme':
        toggleTheme();
        appendOutput(`<p class="text-neonBright">Theme toggled successfully!</p>`);
        break;

      case 'clear':
        output.innerHTML = '<p class="text-neon font-bold">Ayush Gaurav Terminal v2.5.0 (x86_64-portfolio-linux-gnu)</p>';
        input.value = '';
        return;

      case 'matrix':
        appendOutput(`<p class="text-neonBright font-mono animate-pulse">01000001 01011001 01010101 01010011 01001000 00100000 01000111 01000001 01010101 01010010 01000001 01010110</p>`);
        break;

      case 'sudo':
        appendOutput(`<p class="text-red-400 font-bold">nice try. This incident will be reported.</p>`);
        break;

      case 'exit':
        hideTerminal();
        input.value = '';
        return;

      default:
        appendOutput(`<p class="text-red-400">Command not recognized: '${cmd}'. Type <span class="text-neon font-bold">help</span> for commands.</p>`);
        break;
    }

    input.value = '';
  });
}
