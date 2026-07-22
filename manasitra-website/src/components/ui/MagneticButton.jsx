"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEmotionTheme } from "@/context/ThemeContext";

export default function MagneticButton({ 
  children, 
  className, 
  onClick, 
  variant = "dark",
  href,
  download
}) {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDarkTheme = theme === "dark";

  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const isDark = variant === "dark";
  const isTeal = variant === "teal";
  
  // --- LIGHT THEME STYLES ---
  let bgClass, hoverShadow;

  if (!isDarkTheme) {
    // CALM (LIGHT) — soft, minimal, nature
    if (isDark) {
      bgClass = "bg-black/90 border-black/10 text-white";
      hoverShadow = "0 10px 30px -10px rgba(0,0,0,0.3)";
    } else if (isTeal) {
      bgClass = "bg-teal-700/90 border-teal-500/30 text-white";
      hoverShadow = "0 10px 30px -10px rgba(15,118,110,0.4)";
    } else {
      bgClass = "bg-white/80 border-black/10 text-black";
      hoverShadow = "0 10px 30px -10px rgba(0,0,0,0.1)";
    }
  } else {
    // SERENITY (DARK) — glass, glow, emerald, futuristic
    if (isDark) {
      bgClass = "bg-white/[0.06] border-emerald-500/30 text-white backdrop-blur-xl";
      hoverShadow = "0 10px 40px -10px rgba(16,185,129,0.4), 0 0 20px rgba(16,185,129,0.15)";
    } else if (isTeal) {
      bgClass = "bg-emerald-600/90 border-emerald-400/40 text-white";
      hoverShadow = "0 10px 40px -10px rgba(16,185,129,0.5), 0 0 25px rgba(52,211,153,0.2)";
    } else {
      bgClass = "bg-white/[0.04] border-white/10 text-white/90 backdrop-blur-xl";
      hoverShadow = "0 10px 30px -10px rgba(255,255,255,0.08)";
    }
  }

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      download={download}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: mouseXSpring,
        y: mouseYSpring,
      }}
      animate={{
        scale: isHovered ? 1.05 : 1,
        boxShadow: isHovered ? hoverShadow : "0 4px 6px -1px rgba(0,0,0,0.05)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm backdrop-blur-md transition-all duration-500 overflow-hidden border",
        bgClass,
        className
      )}
    >
      {/* Hover Gradient Sweep — different per theme */}
      <motion.div 
        className={cn(
          "absolute inset-0 z-0 opacity-0",
          isDarkTheme
            ? "bg-gradient-to-tr from-emerald-500/0 via-emerald-400/15 to-emerald-500/0"
            : "bg-gradient-to-tr from-white/0 via-white/20 to-white/0"
        )}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? ["-100%", "100%"] : "-100%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="relative z-10 flex items-center gap-2"
        animate={{ y: isHovered ? -2 : 0 }}
      >
        {children}
      </motion.div>
    </Component>
  );
}
