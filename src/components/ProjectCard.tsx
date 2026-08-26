import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

export interface ProjectCardProps {
  title?: string;
  description?: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
  image?: string;
}

/**
 * Modern 3D Tilt Project Card Component with Specular Lighting Effect (TypeScript)
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  title = "Retail Guard",
  description = "AI-powered SaaS inventory and store management system designed to optimize retail operations, track product shelf lives, and deliver predictive sales insights.",
  techStack = ["React", "Node.js", "Tailwind CSS", "Framer Motion", "Firebase"],
  liveUrl = "https://example.com",
  githubUrl = "https://github.com/AyushGaurav4529",
  badge = "Featured Project",
  image = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth non-re-rendering mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth physics-based tilt and reset
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  // Map normalized mouse coordinates (-0.5 to 0.5) to rotation degrees (-12deg to +12deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Dynamic glow coordinates matching cursor relative percentage
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowOpacity = useMotionValue(0);

  // Combined radial gradient background motion value for specular sheen
  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(550px circle at ${gx} ${gy}, rgba(16, 185, 129, 0.18), rgba(255, 255, 255, 0.08) 30%, transparent 80%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
    glowOpacity.set(1);
  };

  const handleMouseLeave = () => {
    // Reset position smoothly back to center flat state
    x.set(0);
    y.set(0);
    glowOpacity.set(0);
  };

  return (
    <div className="w-full max-w-md p-4" style={{ perspective: "1000px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative group w-full rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 p-6 shadow-2xl transition-all duration-200 hover:border-emerald-500/40 hover:shadow-emerald-500/10 cursor-pointer overflow-hidden"
      >
        {/* Dynamic Specular Lighting & Glow Overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-10"
          style={{
            opacity: glowOpacity,
            background: glowBackground,
          }}
        />

        {/* Card Content - Elevated on Z-axis for 3D depth */}
        <div
          className="relative z-20 flex flex-col h-full space-y-4"
          style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}
        >
          {/* Project Preview Image */}
          {image && (
            <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/5">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
              
              {badge && (
                <div className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold font-mono tracking-wider text-emerald-400 bg-emerald-950/80 backdrop-blur-md rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  {badge}
                </div>
              )}
            </div>
          )}

          {/* Project Title & Description */}
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-200">
              {title}
            </h3>
            <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-mono font-medium text-neutral-300 bg-white/5 border border-white/10 rounded-md hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-300 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Card Footer Action Links */}
          <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/10">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors py-1.5 px-2.5 rounded-md hover:bg-white/5"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-neutral-900 bg-emerald-400 hover:bg-emerald-300 px-3.5 py-1.5 rounded-lg shadow-lg shadow-emerald-500/20 transition-all duration-200 group-hover:shadow-emerald-500/40"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
