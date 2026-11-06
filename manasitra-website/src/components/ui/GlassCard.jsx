"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEmotionTheme } from "@/context/ThemeContext";

export default function GlassCard({ children, className, glowColor }) {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Theme-specific glow colors
  const resolvedGlow = glowColor || (isDark ? "rgba(16, 185, 129, 0.25)" : "rgba(45, 212, 191, 0.15)");

  // Theme-specific shadow styles
  const lightShadow = isHovered
    ? `0 20px 40px -10px ${resolvedGlow}, inset 0 0 0 1px rgba(0,0,0,0.06)`
    : "0 4px 6px -1px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(0,0,0,0.04)";

  const darkShadow = isHovered
    ? `0 20px 60px -10px ${resolvedGlow}, 0 0 30px rgba(16,185,129,0.1), inset 0 0 0 1px rgba(16,185,129,0.3)`
    : "0 4px 20px -4px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.06)";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        y: isHovered ? -10 : 0,
        boxShadow: isDark ? darkShadow : lightShadow,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "magnetic-card relative overflow-hidden rounded-3xl backdrop-blur-md transition-all duration-500",
        isDark
          ? "bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-emerald-500/30"
          : "bg-white/60 border border-black/[0.04] hover:bg-white/80",
        className
      )}
    >
      {/* Moving Glow — Light: soft white, Dark: emerald radial glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.15) 0%, transparent 60%)"
            : "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 50%)",
          mixBlendMode: isDark ? "screen" : "overlay",
        }}
      />

      {/* Content */}
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
