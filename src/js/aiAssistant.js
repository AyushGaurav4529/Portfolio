// src/js/aiAssistant.js
// Neural AI Portfolio Assistant Chatbot

import { openProjectModal } from './modals.js';
import { playUiSound } from './audio.js';

export function initAiAssistant() {
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
      playUiSound(750, 0.05);
    }
  }

  toggleBtn.addEventListener('click', toggleChat);
  if (closeBtn) closeBtn.addEventListener('click', toggleChat);

  function generateAiReply(userText) {
    const text = userText.toLowerCase().trim();

    // 1. Retail Guard Project
    if (text.includes('retail') || text.includes('guard') || text.includes('threat') || text.includes('vision') || text.includes('camera')) {
      return `
        <div class="space-y-2">
          <p><strong>Retail Guard (AI Threat Detection)</strong></p>
          <p class="text-textMuted text-xs">An intelligent computer vision system that monitors store inventory shelf-life, detects security threats, and automates predictive replenishment.</p>
          <div class="flex flex-wrap gap-1 font-mono text-[10px] text-neon">
            <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Node.js</span>
            <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Computer Vision</span>
            <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Firebase</span>
          </div>
          <button data-action="open-retail" class="mt-2 text-xs font-mono text-neon font-bold underline hover:text-neonBright cursor-pointer flex items-center gap-1">
            🔍 Open Retail Guard Modal ↗
          </button>
        </div>
      `;
    }

    // 2. HomePlate Project
    if (text.includes('homeplate') || text.includes('food') || text.includes('chef') || text.includes('student') || text.includes('flutter') || text.includes('delivery')) {
      return `
        <div class="space-y-2">
          <p><strong>HomePlate (Web & Mobile Logistics Platform)</strong></p>
          <p class="text-textMuted text-xs">Connects university students with local home chefs for fresh, affordable meals. Features real-time location sorting and a Flutter mobile ordering app.</p>
          <div class="flex flex-wrap gap-1 font-mono text-[10px] text-neon">
            <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Flutter</span>
            <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Dart</span>
            <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Node.js</span>
          </div>
          <button data-action="open-homeplate" class="mt-2 text-xs font-mono text-neon font-bold underline hover:text-neonBright cursor-pointer flex items-center gap-1">
            🔍 Open HomePlate Modal ↗
          </button>
        </div>
      `;
    }

    // 3. Projects General Overview
    if (text.includes('project') || text.includes('work') || text.includes('portfolio') || text.includes('build')) {
      return `
        <div class="space-y-2">
          <p>Ayush has engineered high-impact AI and Full-Stack applications:</p>
          <ul class="list-disc list-inside text-textMuted text-xs space-y-1">
            <li><strong>Retail Guard:</strong> AI threat detection & inventory monitoring</li>
            <li><strong>HomePlate:</strong> Student home-cooked meal logistics app</li>
            <li><strong>Hotel Management:</strong> Python & SQL Operations Engine</li>
            <li><strong>Inventory Management:</strong> Structured stock tracking web app</li>
          </ul>
          <div class="pt-1 flex gap-2">
            <button data-scroll="#projects" class="text-xs font-mono bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2.5 py-1 rounded-lg transition-all cursor-pointer">
              Explore Projects Section ↓
            </button>
          </div>
        </div>
      `;
    }

    // 4. Hackathons
    if (text.includes('hackathon') || text.includes('fantom') || text.includes('nirmith') || text.includes('vibe') || text.includes('competition') || text.includes('win') || text.includes('rvitm') || text.includes('nmit')) {
      return `
        <div class="space-y-2">
          <p>🏆 <strong>Ayush's Hackathon Record:</strong></p>
          <div class="space-y-1.5 text-textMuted text-xs">
            <div class="p-2 bg-dark/60 rounded-lg border border-darkBorder">
              <span class="text-white font-bold block">1. FantomCode Hackathon (RVITM)</span>
              <span class="text-[11px] block">Built <em>Retail Guard</em> • April 2026</span>
            </div>
            <div class="p-2 bg-dark/60 rounded-lg border border-darkBorder">
              <span class="text-white font-bold block">2. NIRMITH Hackathon (NMIT)</span>
              <span class="text-[11px] block">Built <em>HomePlate (Web)</em> • April 2026</span>
            </div>
            <div class="p-2 bg-dark/60 rounded-lg border border-darkBorder">
              <span class="text-white font-bold block">3. VIBE-A-THON Hackathon (NMIT)</span>
              <span class="text-[11px] block">Built <em>HomePlate (Mobile)</em> • April 2026</span>
            </div>
          </div>
          <button data-scroll="#hackathons" class="text-xs font-mono bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2.5 py-1 rounded-lg transition-all cursor-pointer">
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
          <button data-scroll="#skills" class="text-xs font-mono bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2.5 py-1 rounded-lg transition-all cursor-pointer">
            View Skills & Toolkit ↓
          </button>
        </div>
      `;
    }

    // 6. Contact / Resume
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
            <button data-scroll="#connect" class="text-xs font-mono bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2.5 py-1 rounded-lg transition-all cursor-pointer">
              ✍️ Open Contact Form
            </button>
          </div>
        </div>
      `;
    }

    // Default Fallback
    return `
      <div class="space-y-2">
        <p>I understand you're asking about: "<em>${userText}</em>".</p>
        <p class="text-textMuted text-xs">Here are quick topics you can explore:</p>
        <div class="flex flex-wrap gap-1.5 font-mono text-[10px] pt-1">
          <button class="ai-chip bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2 py-1 rounded-lg transition-all cursor-pointer" data-query="Tell me about top projects">🚀 Top Projects</button>
          <button class="ai-chip bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2 py-1 rounded-lg transition-all cursor-pointer" data-query="Tell me about hackathon wins">🏆 Hackathons</button>
          <button class="ai-chip bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2 py-1 rounded-lg transition-all cursor-pointer" data-query="What is your technical skill stack?">🛠️ Tech Stack</button>
          <button class="ai-chip bg-neon/10 hover:bg-neon/20 text-neon border border-neon/30 px-2 py-1 rounded-lg transition-all cursor-pointer" data-query="How can I contact or hire Ayush?">📬 Contact</button>
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
      <div class="bg-neon/15 text-white p-3 rounded-2xl rounded-tr-none border border-neon/30 max-w-[85%] text-xs">
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
      <div class="w-6 h-6 rounded-md bg-neon/10 border border-neon/40 flex items-center justify-center text-neon flex-shrink-0 mt-0.5 text-xs">
        🤖
      </div>
      <div class="bg-dark p-2.5 rounded-2xl rounded-tl-none border border-darkBorder text-neon font-mono text-[11px] flex items-center gap-1.5">
        <span>Neural AI thinking</span>
        <span class="inline-flex gap-0.5">
          <span class="w-1 h-1 bg-neon rounded-full animate-bounce"></span>
          <span class="w-1 h-1 bg-neon rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span class="w-1 h-1 bg-neon rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </span>
      </div>
    `;
    messagesBox.appendChild(typingMsg);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    setTimeout(() => {
      const indicator = document.getElementById(typingId);
      if (indicator) indicator.remove();

      const replyHtml = generateAiReply(text);
      const aiMsg = document.createElement('div');
      aiMsg.className = 'flex gap-2 items-start';
      aiMsg.innerHTML = `
        <div class="w-6 h-6 rounded-md bg-neon/10 border border-neon/40 flex items-center justify-center text-neon flex-shrink-0 mt-0.5 text-xs">
          🤖
        </div>
        <div class="bg-dark p-3 rounded-2xl rounded-tl-none border border-darkBorder text-textSecondary max-w-[85%] text-xs">
          ${replyHtml}
        </div>
      `;
      messagesBox.appendChild(aiMsg);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }, 400);
  }

  function handleSendMessage() {
    processQuery(input.value.trim());
  }

  if (sendBtn) sendBtn.addEventListener('click', handleSendMessage);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });

  // Event Delegation for Quick Action Suggestion Chips & Action buttons
  messagesBox.addEventListener('click', (e) => {
    const chip = e.target.closest('.ai-chip');
    if (chip) {
      const query = chip.getAttribute('data-query') || chip.textContent.trim();
      processQuery(query);
      return;
    }

    const scrollBtn = e.target.closest('[data-scroll]');
    if (scrollBtn) {
      const target = scrollBtn.getAttribute('data-scroll');
      toggleChat();
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const retailBtn = e.target.closest('[data-action="open-retail"]');
    if (retailBtn) {
      toggleChat();
      openProjectModal('retail-guard');
      return;
    }

    const homeplateBtn = e.target.closest('[data-action="open-homeplate"]');
    if (homeplateBtn) {
      toggleChat();
      openProjectModal('homeplate');
      return;
    }
  });
}
