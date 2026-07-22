"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useEmotionTheme } from "@/context/ThemeContext";

export default function PhoneMockup() {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const [currentScreen, setCurrentScreen] = useState(0);

  const dayScreens = [
    "linear-gradient(135deg, #0d9488, #5eead4)",
    "linear-gradient(135deg, #0284c7, #38bdf8)",
    "linear-gradient(135deg, #059669, #34d399)"
  ];

  const nightScreens = [
    "linear-gradient(135deg, #0f172a, #0f766e)",
    "linear-gradient(135deg, #090d16, #1e1b4b)",
    "linear-gradient(135deg, #030712, #047857)"
  ];

  const activeScreens = isDark ? nightScreens : dayScreens;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % activeScreens.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [activeScreens.length]);

  return (
    <div ref={containerRef} className="w-full h-[580px] flex items-center justify-center perspective-[1200px]">
      <motion.div
        style={{
          rotateX,
          rotateY,
          y,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-[280px] h-[560px] rounded-[42px] border-[8px] shadow-2xl flex flex-col overflow-hidden transition-all duration-700 ${
          isDark 
            ? "bg-neutral-950 border-neutral-800 shadow-[0_25px_60px_rgba(0,0,0,0.8)]" 
            : "bg-white border-neutral-200 shadow-[0_25px_60px_rgba(0,0,0,0.15)]"
        }`}
      >
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
          <div className={`w-24 h-5 rounded-b-xl transition-colors duration-700 ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`} />
        </div>

        {/* Screen */}
        <div className="relative flex-1 w-full h-full overflow-hidden rounded-[34px]">
          {/* Light Reflection */}
          <motion.div 
            className="absolute inset-0 z-10 pointer-events-none opacity-30"
            style={{
              background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 25%, transparent 30%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
          />

          {/* Screen Content */}
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full flex flex-col items-center justify-center p-6 text-white"
            style={{ background: activeScreens[currentScreen] }}
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-6 shadow-md"
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-4 w-3/4 bg-white/30 rounded-full mb-4"
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="h-3 w-1/2 bg-white/30 rounded-full"
            />
            
            <div className="absolute bottom-8 inset-x-6 flex gap-2">
              <div className="h-11 w-full bg-white/20 backdrop-blur-md rounded-xl" />
              <div className="h-11 w-11 shrink-0 bg-white/20 backdrop-blur-md rounded-xl" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
