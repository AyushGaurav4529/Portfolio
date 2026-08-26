import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Interactive Neon Mouse Spotlight / Cursor Aura Overlay Component
 * 
 * Features:
 * - Ultra-smooth cursor tracking with Framer Motion spring physics (stiffness: 150, damping: 20)
 * - Zero React state re-renders during mouse movement (uses MotionValues)
 * - Radial gradient aura that dynamically illuminates dark glassmorphism layouts
 * - Automatically disables on touch-screen/mobile devices for optimal performance
 * - Completely un-intrusive (pointer-events-none)
 */
export default function NeonSpotlight({
  size = 600,
  color = "rgba(16, 185, 129, 0.16)",       // Core Neon Emerald Glow
  secondaryColor = "rgba(99, 102, 241, 0.12)", // Outer Indigo Aura
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Motion values for lag-free, non-re-rendering tracking
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth spring physics (stiffness: 150, damping: 20)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Center position transform (offsetting by half radius so light centers on cursor tip)
  const spotlightX = useTransform(springX, (val) => `${val - size / 2}px`);
  const spotlightY = useTransform(springY, (val) => `${val - size / 2}px`);

  useEffect(() => {
    // Check if device supports touch input or coarse pointer (mobile/tablet)
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

    const handleMouseMove = (e) => {
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

  // Don't render spotlight on touch devices to conserve battery & memory
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
}
