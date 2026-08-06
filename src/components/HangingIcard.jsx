import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RotateCw,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  QrCode
} from 'lucide-react';

/**
 * Hanging 3D Flipping ID Card (ICARD) Component
 * 
 * Features:
 * - Realistic lanyard strap & metallic clip attachment
 * - Physics-based gentle pendulum/swing animation when idle/hovered
 * - 3D dual-sided flip effect with transform-style: preserve-3d
 * - Front: Photo, Verified Security Hologram, Role, University, Tech Tags
 * - Back: Contact QR Code, Detailed Stack Badges, Direct Action Links
 * - Sleek Cyberpunk Dark Glassmorphism Design
 */
export default function HangingIcard({
  name = "Ayush Gaurav",
  role = "AI & Full Stack Developer",
  institution = "Dr. AIT Bengaluru • B.E. CSBS",
  avatarUrl = "avatar.jpg",
  email = "ayushgaurav4529@gmail.com",
  githubUrl = "https://github.com/AyushGaurav4529",
  linkedinUrl = "https://www.linkedin.com/in/ayugaurav/",
  location = "Bengaluru, India",
  techStack = ["Python", "JavaScript", "React", "Node.js", "Flutter", "FastAPI", "MySQL"],
  idNumber = "AG-2026-CSBS"
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  // QR Code URL using QuickChart / Google Charts API for instant contact
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    `BEGIN:VCARD\nVERSION:3.0\nN:Gaurav;Ayush;;;\nFN:Ayush Gaurav\nTITLE:AI & Full Stack Developer\nEMAIL:${email}\nURL:${githubUrl}\nEND:VCARD`
  )}&color=10b981&bgcolor=0f172a`;

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 select-none">
      {/* 1. Lanyard Ribbon & Metallic Clip Assembly */}
      <div className="relative flex flex-col items-center z-30">
        {/* Lanyard Strap */}
        <div className="w-4 h-16 sm:h-20 bg-gradient-to-b from-emerald-950 via-emerald-800 to-emerald-950 rounded-sm border-x border-emerald-500/30 shadow-md flex items-center justify-center">
          <div className="w-1 h-full bg-emerald-500/20 border-r border-emerald-400/40" />
        </div>

        {/* Metal Lanyard Buckle / Ring */}
        <div className="w-7 h-5 -mt-1 bg-gradient-to-b from-neutral-300 via-neutral-100 to-neutral-400 rounded-sm border border-white/40 shadow-lg flex items-center justify-center z-10">
          <div className="w-3 h-2 rounded-full bg-neutral-800 border border-neutral-400" />
        </div>

        {/* Metal Carabiner Hook Hooked to Card Slot */}
        <div className="w-4 h-4 -mt-1 rounded-full border-2 border-neutral-300 bg-neutral-900 shadow-md flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* 2. Hanging Card Container with Swing & Perspective */}
      <div
        className="w-full max-w-[340px] sm:max-w-[360px] -mt-1 cursor-pointer"
        style={{ perspective: "1200px" }}
        onClick={toggleFlip}
      >
        <motion.div
          animate={{
            rotateZ: [ -1.5, 1.5, -1.5 ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.02 }}
          className="w-full"
        >
          {/* Card Slot Opening at Top of Badge */}
          <div className="mx-auto w-12 h-2.5 bg-neutral-950 rounded-full border border-neutral-700/80 mb-[-6px] relative z-20 shadow-inner flex items-center justify-center">
            <div className="w-8 h-1 bg-black rounded-full" />
          </div>

          {/* 3D Flipping Card Inner Container */}
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full h-[480px] rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.25)] border border-emerald-500/30 bg-neutral-900/90 backdrop-blur-2xl"
          >
            {/* ─── FRONT SIDE OF ICARD ─── */}
            <div
              style={{ backfaceVisibility: "hidden" }}
              className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-neutral-900/95 via-neutral-950/90 to-neutral-900/95"
            >
              {/* Subtle Grid Background Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

              {/* Holographic Header Bar */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold font-mono text-xs">
                    AG
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                      Dev Identity
                    </h4>
                    <p className="text-[10px] font-mono text-neutral-400">{idNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>VERIFIED</span>
                </div>
              </div>

              {/* Developer Avatar & Status */}
              <div className="relative z-10 flex flex-col items-center text-center my-auto space-y-3">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 shadow-lg shadow-emerald-500/20">
                    <img
                      src={avatarUrl}
                      alt={name}
                      className="w-full h-full object-cover rounded-full border-2 border-neutral-900"
                      onError={(e) => {
                        // Fallback avatar icon if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full rounded-full bg-neutral-800 items-center justify-center text-emerald-400 font-bold text-2xl">
                      AG
                    </div>
                  </div>

                  {/* Active Online Indicator */}
                  <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-neutral-900 shadow-md animate-pulse" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide flex items-center justify-center gap-1.5">
                    {name}
                    <Sparkles className="w-4 h-4 text-emerald-400 inline" />
                  </h3>
                  <p className="text-sm font-medium text-emerald-400 mt-0.5">
                    {role}
                  </p>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    {institution}
                  </p>
                </div>

                {/* Tech Highlights */}
                <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                  {["AI / ML", "Full Stack", "Mobile Apps", "REST APIs"].map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-white/5 border border-white/10 text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Front Footer: Click to Flip Action */}
              <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{location}</span>
                </div>

                <button
                  type="button"
                  onClick={toggleFlip}
                  className="flex items-center gap-1.5 font-mono text-xs font-black uppercase text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-all px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:scale-105 cursor-pointer"
                >
                  <span>FLIP CARD</span>
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ─── BACK SIDE OF ICARD ─── */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950"
            >
              {/* Back Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-400">
                  <QrCode className="w-4 h-4" />
                  <span>DIGITAL VCARD & STACK</span>
                </div>

                <span className="text-[10px] font-mono text-neutral-400">SCAN TO CONNECT</span>
              </div>

              {/* QR Code & Tech Stack Section */}
              <div className="flex flex-col items-center justify-center my-auto space-y-4 text-center">
                {/* QR Code Container */}
                <div className="p-2 bg-neutral-900 rounded-xl border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
                  <img
                    src={qrCodeUrl}
                    alt="Contact QR Code"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-lg bg-neutral-950 p-1"
                    onError={(e) => {
                      // Fallback SVG QR block if QR server is unreachable
                      e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%2310b981" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>';
                    }}
                  />
                </div>

                {/* Core Tech Badges Grid */}
                <div className="w-full">
                  <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Core Technical Stack
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Action Links & Flip Return Button */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/40 text-neutral-300 hover:text-emerald-400 transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/40 text-neutral-300 hover:text-emerald-400 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/40 text-neutral-300 hover:text-emerald-400 transition-colors"
                    aria-label="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={toggleFlip}
                  className="flex items-center gap-1.5 font-mono text-xs font-black uppercase text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-all px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:scale-105 cursor-pointer"
                >
                  <span>FRONT SIDE</span>
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
