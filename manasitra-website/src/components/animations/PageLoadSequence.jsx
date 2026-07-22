"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoadSequence({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the loader after 2.5s sequence
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)", scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#faf9f8] overflow-hidden"
      >
        {/* Ambient Sound Wave (Animated SVG) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <svg width="60" height="20" viewBox="0 0 60 20" className="opacity-50">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.rect
                key={i}
                x={i * 12}
                y="10"
                width="4"
                height="4"
                rx="2"
                fill="#0f766e" // Teal 700
                initial={{ height: 4, y: 8 }}
                animate={{ height: [4, 16, 4], y: [8, 2, 8] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Logo builds from particles (simulated with blur and scale) */}
        <motion.h1
          initial={{ filter: "blur(20px)", opacity: 0, scale: 0.9, letterSpacing: "-0.05em" }}
          animate={{ filter: "blur(0px)", opacity: 1, scale: 1, letterSpacing: "0em" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-4xl md:text-5xl font-semibold text-black tracking-tight"
        >
          Mansitra
        </motion.h1>
        
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-neutral-500 font-serif italic mt-3 text-sm"
        >
          Your private space.
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
