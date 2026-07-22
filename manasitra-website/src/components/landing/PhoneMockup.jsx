"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function PhoneMockup() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Rotate phone based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Simulate screens changing
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [
    "linear-gradient(135deg, #0d9488, #5eead4)",
    "linear-gradient(135deg, #111827, #374151)",
    "linear-gradient(135deg, #be123c, #fda4af)"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [screens.length]);

  return (
    <div ref={containerRef} className="w-full h-[600px] flex items-center justify-center perspective-[1200px]">
      <motion.div
        style={{
          rotateX,
          rotateY,
          y,
          transformStyle: "preserve-3d",
        }}
        className="relative w-[280px] h-[580px] rounded-[40px] bg-neutral-900 border-[8px] border-neutral-800 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
          <div className="w-24 h-6 bg-neutral-800 rounded-b-xl"></div>
        </div>

        {/* Screen */}
        <div className="relative flex-1 w-full h-full bg-black overflow-hidden rounded-[32px]">
          {/* Light Reflection */}
          <motion.div 
            className="absolute inset-0 z-10 pointer-events-none opacity-30"
            style={{
              background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 25%, transparent 30%)",
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
          />

          {/* Screen Content */}
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full flex flex-col items-center justify-center p-6 text-white"
            style={{ background: screens[currentScreen] }}
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-6"
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="h-4 w-3/4 bg-white/20 rounded-full mb-4"
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-3 w-1/2 bg-white/20 rounded-full"
            />
            
            <div className="absolute bottom-10 inset-x-6 flex gap-2">
              <div className="h-12 w-full bg-white/20 backdrop-blur-md rounded-xl"></div>
              <div className="h-12 w-12 shrink-0 bg-white/20 backdrop-blur-md rounded-xl"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
