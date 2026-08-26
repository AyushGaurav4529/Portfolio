import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface NeonSpotlightProps {
  size?: number;
  color?: string;
  secondaryColor?: string;
}

/**
 * Interactive Neon Mouse Spotlight / Cursor Aura Overlay Component in TypeScript
 */
export const NeonSpotlight: React.FC<NeonSpotlightProps> = ({
  size = 600,
  color = "rgba(16, 185, 129, 0.16)",
  secondaryColor = "rgba(99, 102, 241, 0.12)",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const spotlightX = useTransform(springX, (val) => `${val - size / 2}px`);
  const spotlightY = useTransform(springY, (val) => `${val - size / 2}px`);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;

      if (isTouch) {
        setIsTouchDevice(true);
        return;
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-30 overflow-hidden"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        x: spotlightX,
        y: spotlightY,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="w-full h-full rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle at center, ${color} 0%, ${secondaryColor} 40%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
};

export default NeonSpotlight;
