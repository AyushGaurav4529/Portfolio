import type { VercelRequest, VercelResponse } from '@vercel/node';

// Rate limiter for chat endpoint
const chatRateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const CHAT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_CHAT_REQUESTS = 25;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = chatRateLimitMap.get(ip);

  if (!record || now > record.expiresAt) {
    chatRateLimitMap.set(ip, { count: 1, expiresAt: now + CHAT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_CHAT_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

// Ayush Gaurav Knowledge Base System Prompt
const SYSTEM_PROMPT = `
You are the official AI Assistant for Ayush Gaurav, an AI & Full-Stack Developer.
Ayush is a Computer Science and Business Systems (CSBS) undergrad at Dr. Ambedkar Institute of Technology (Dr. AIT), Bengaluru, India.
Key Facts:
- Projects:
  1. Retail Guard: AI smart inventory SaaS. Uses Computer Vision / YOLOv8 & Node.js for tracking product shelf life, threat detection, and automated stock replenishment. Pitched at FantomCode Hackathon (RVITM).
  2. HomePlate: Hyperlocal food delivery logistics platform. Built with Flutter, Dart, Node.js, and Firebase. Built for NIRMITH (Web) and VIBE-A-THON (Mobile) hackathons.
  3. Hotel Management System: Python desktop software with MySQL database, room availability matrix, automated invoice printing, and revenue tracking.
  4. Inventory Management System: Structured stock tracking web application using HTML5, CSS3, and JavaScript.
- Technical Skills: Python, JavaScript, TypeScript, React, Node.js, Flutter, Dart, FastAPI, MySQL, Firebase, Tailwind CSS, Three.js, Git, Applied AI/ML.
- Hackathon Awards: Finalist/Participant at FantomCode (RVITM), NIRMITH Hackathon, VIBE-A-THON.
- Contact: ayushgaurav4529@gmail.com, +91 8295813878, GitHub: https://github.com/AyushGaurav4529, LinkedIn: https://www.linkedin.com/in/ayugaurav/
Provide concise, helpful, friendly, and accurate answers about Ayush.
`.trim();

function getBuiltInKnowledgeResponse(query: string, mode: 'chat' | 'terminal'): string {
  const q = query.toLowerCase().trim();

  if (mode === 'terminal') {
    if (q.includes('project') || q.includes('work') || q.includes('repo')) {
      return `[AYUSH GAURAV - TOP PROJECTS]
1. Retail Guard (AI & SaaS Inventory): CV-driven shelf-life tracking & threat alerts. (FantomCode Hackathon)
2. HomePlate (Full-Stack & Flutter App): Hyperlocal meal logistics connecting students with home chefs. (NIRMITH & VIBE-A-THON)
3. Hotel Management System: Python + MySQL Operations & Billing engine.
4. Inventory Management: Structured stock tracking web application.
Type 'projects' or run 'open-project <id>' for deeper specs.`;
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
      return `[CORE TECHNICAL STACK]
Languages: Python, JavaScript, TypeScript, Dart, SQL, HTML5/CSS3
Frameworks & Libs: React, Node.js, Flutter, FastAPI, Tailwind CSS, Three.js, GSAP
Databases & Cloud: MySQL, Firebase Firestore, Supabase, Vercel, REST APIs
Tools: Git, GitHub, Postman, Vite, Linux CLI`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('phone')) {
      return `[CONTACT INFORMATION]
Email: ayushgaurav4529@gmail.com
Phone: +91 8295813878
GitHub: https://github.com/AyushGaurav4529
LinkedIn: https://www.linkedin.com/in/ayugaurav/
Location: Bengaluru, India`;
    }

    if (q.includes('hackathon') || q.includes('award') || q.includes('competition')) {
      return `[HACKATHON TRACK RECORD]
- FantomCode Hackathon (RVITM): Pitched Retail Guard (AI Computer Vision SaaS).
- NIRMITH Hackathon: Engineered HomePlate Web Architecture.
- VIBE-A-THON: Built HomePlate Flutter Mobile App.`;
    }

    if (q.includes('education') || q.includes('college') || q.includes('degree')) {
      return `[EDUCATION]
Bachelor of Engineering (B.E.) — Computer Science and Business Systems (CSBS)
Institution: Dr. Ambedkar Institute of Technology (Dr. AIT), Bengaluru
Focus: Scalable Software Systems, Relational DBMS, Machine Learning, Data Structures`;
    }

    return `Ayush Gaurav is an AI & Full-Stack Developer specializing in React, Node.js, Python, and Flutter.
Type 'help' to see command options or ask about projects, skills, education, or contact info.`;
  }

  // Chat Mode — Rich Markup Responses
  if (q.includes('retail') || q.includes('guard') || q.includes('shelf') || q.includes('threat')) {
    return `
      <div class="space-y-2">
        <p><strong>Retail Guard (AI Threat Detection &amp; Smart Inventory)</strong></p>
        <p class="text-textMuted text-xs">An intelligent computer vision system that monitors store inventory shelf life, detects security anomalies, and generates automated replenishment alerts.</p>
        <div class="flex flex-wrap gap-1 font-mono text-[10px] text-neon">
          <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Node.js</span>
          <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Computer Vision</span>
          <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Firebase</span>
        </div>
        <button data-action="open-retail" class="mt-2 text-xs font-mono text-neon font-bold underline hover:text-neonBright cursor-pointer flex items-center gap-1">
          🔍 View Retail Guard Architecture &amp; Specs ↗
        </button>
      </div>
    `;
  }

  if (q.includes('homeplate') || q.includes('food') || q.includes('chef') || q.includes('flutter')) {
    return `
      <div class="space-y-2">
        <p><strong>HomePlate (Hyperlocal Meal Logistics Platform)</strong></p>
        <p class="text-textMuted text-xs">Connects university students with verified home chefs for fresh, affordable meals. Features real-time location sorting and a Flutter mobile ordering application.</p>
        <div class="flex flex-wrap gap-1 font-mono text-[10px] text-neon">
          <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Flutter</span>
          <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">Dart</span>
          <span class="bg-neon/10 px-1.5 py-0.5 rounded border border-neon/30">REST APIs</span>
        </div>
        <button data-action="open-homeplate" class="mt-2 text-xs font-mono text-neon font-bold underline hover:text-neonBright cursor-pointer flex items-center gap-1">
          🔍 View HomePlate Architecture &amp; Specs ↗
        </button>
      </div>
    `;
  }

  if (q.includes('project') || q.includes('work') || q.includes('build') || q.includes('top')) {
    return `
      <div class="space-y-2">
        <p>Ayush has engineered key AI and full-stack software systems:</p>
        <ul class="list-disc list-inside text-textMuted text-xs space-y-1">
          <li><strong>Retail Guard:</strong> AI inventory shelf-life tracker &amp; threat detection</li>
          <li><strong>HomePlate:</strong> Student home-chef meal ordering mobile app (Flutter)</li>
          <li><strong>Hotel Management:</strong> Python &amp; MySQL operations system</li>
          <li><strong>Inventory Management:</strong> Fast stock tracking web application</li>
        </ul>
        <div class="pt-2 flex flex-wrap gap-2">
          <a href="#projects" class="text-xs font-mono text-neon font-bold underline">Browse Projects Section ↓</a>
        </div>
      </div>
    `;
  }

  if (q.includes('hackathon') || q.includes('win') || q.includes('competition') || q.includes('rvitm')) {
    return `
      <div class="space-y-2">
        <p>🏆 <strong>Hackathon Participations &amp; Recognition:</strong></p>
        <ul class="list-disc list-inside text-textMuted text-xs space-y-1">
          <li><strong>FantomCode Hackathon (RVITM):</strong> Pitched Retail Guard AI SaaS.</li>
          <li><strong>NIRMITH Hackathon:</strong> Built web backend logistics for HomePlate.</li>
          <li><strong>VIBE-A-THON:</strong> Engineered mobile application cross-platform client with Flutter.</li>
        </ul>
        <p class="text-xs text-neon">Ayush thrives under pressure in fast-paced collaborative builds!</p>
      </div>
    `;
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language')) {
    return `
      <div class="space-y-2">
        <p>🛠️ <strong>Ayush's Technical Stack:</strong></p>
        <div class="text-xs text-textMuted space-y-1">
          <p>• <strong>Languages:</strong> Python, JavaScript, TypeScript, Dart, SQL</p>
          <p>• <strong>Frontend:</strong> React, Tailwind CSS, Vite, HTML5, Three.js, GSAP</p>
          <p>• <strong>Backend:</strong> Node.js, Express, FastAPI, REST APIs</p>
          <p>• <strong>Mobile:</strong> Flutter, Dart</p>
          <p>• <strong>Databases &amp; Cloud:</strong> MySQL, Firebase Firestore, Supabase, Vercel</p>
        </div>
      </div>
    `;
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('reach')) {
    return `
      <div class="space-y-2">
        <p>📬 <strong>Get in Touch with Ayush:</strong></p>
        <p class="text-xs text-textMuted">Open for software engineering and AI internships or full-time roles.</p>
        <div class="space-y-1 text-xs font-mono">
          <p>✉️ <a href="mailto:ayushgaurav4529@gmail.com" class="text-neon underline">ayushgaurav4529@gmail.com</a></p>
          <p>📞 <a href="tel:+918295813878" class="text-neon underline">+91 8295813878</a></p>
          <p>💼 <a href="https://www.linkedin.com/in/ayugaurav/" target="_blank" rel="noopener" class="text-neon underline">LinkedIn Profile ↗</a></p>
          <p>🐙 <a href="https://github.com/AyushGaurav4529" target="_blank" rel="noopener" class="text-neon underline">GitHub Profile ↗</a></p>
        </div>
      </div>
    `;
  }

  if (q.includes('cv') || q.includes('resume') || q.includes('pdf')) {
    return `
      <div class="space-y-2">
        <p>📄 <strong>Ayush Gaurav's Official CV:</strong></p>
        <p class="text-xs text-textMuted">You can view his verified resume in the in-browser PDF viewer or download it directly.</p>
        <div class="flex gap-2 pt-1">
          <button class="btn-open-pdf bg-neon text-dark font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer shadow-md">Open Resume Viewer ↗</button>
          <a href="Ayush_Gaurav_CV.pdf" download="Ayush_Gaurav_CV.pdf" class="border border-neon text-neon px-3 py-1.5 rounded-lg text-xs font-mono">Download PDF</a>
        </div>
      </div>
    `;
  }

  return `
    <div class="space-y-2">
      <p>I'm Ayush's Neural AI Assistant. You can ask me about his <strong>projects</strong> (Retail Guard, HomePlate), <strong>technical skills</strong>, <strong>hackathons</strong>, or how to <strong>contact/hire</strong> him!</p>
      <div class="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono">
        <button class="ai-chip bg-neon/10 hover:bg-neon/20 text-neon px-2 py-1 rounded border border-neon/30" data-query="Tell me about top projects">🚀 Projects</button>
        <button class="ai-chip bg-neon/10 hover:bg-neon/20 text-neon px-2 py-1 rounded border border-neon/30" data-query="What is your technical skill stack?">🛠️ Tech Stack</button>
        <button class="ai-chip bg-neon/10 hover:bg-neon/20 text-neon px-2 py-1 rounded border border-neon/30" data-query="How can I contact or hire Ayush?">📬 Contact</button>
      </div>
    </div>
  `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Use POST.'
    });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket.remoteAddress || '127.0.0.1';

  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit reached. Please wait a moment before sending another query.'
    });
  }

  const { message, mode = 'chat', history = [] } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Query message cannot be empty.'
    });
  }

  const cleanQuery = message.trim();

  // 1. Check for Server-Side LLM API Key (Gemini, OpenAI, Groq)
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.LLM_API_KEY;

  if (apiKey) {
    try {
      if (process.env.GEMINI_API_KEY) {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const geminiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [
              ...history.map((h: any) => ({
                role: h.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: h.content }]
              })),
              { role: 'user', parts: [{ text: cleanQuery }] }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 350
            }
          })
        });

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return res.status(200).json({
              success: true,
              reply: reply,
              source: 'gemini-llm-proxy',
              timestamp: new Date().toISOString()
            });
          }
        }
      }
    } catch (llmErr) {
      console.warn('External LLM proxy encountered issue, falling back to local engine:', llmErr);
    }
  }

  // 2. Fallback to Serverless Knowledge Base Engine
  const knowledgeReply = getBuiltInKnowledgeResponse(cleanQuery, mode === 'terminal' ? 'terminal' : 'chat');

  return res.status(200).json({
    success: true,
    reply: knowledgeReply,
    source: 'ayush-knowledge-engine',
    timestamp: new Date().toISOString()
  });
}
