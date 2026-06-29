"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  // If the user presses escape, we can skip it.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleFinish = () => {
    setIsVisible(false);
    setTimeout(() => {
      onFinish();
    }, 800); // Wait for fade out animation
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Skip Button */}
          <button 
            onClick={handleFinish}
            className="absolute top-6 right-6 z-[101] text-white/50 hover:text-white bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md transition-all border border-white/10"
          >
            Skip Intro
          </button>

          {/* Video */}
          <video
            src="/splash.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleFinish}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
