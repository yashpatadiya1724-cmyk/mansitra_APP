"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Wind } from "lucide-react";

export default function MiniGamesPreview() {
  const [phaseIndex, setPhaseIndex] = useState(0);

  const phases = [
    { label: "Breathe In...", duration: 4, scale: 1.5, color: "#0d9488" },
    { label: "Hold...", duration: 4, scale: 1.5, color: "#0284c7" },
    { label: "Breathe Out...", duration: 4, scale: 1.0, color: "#059669" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % phases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentPhase = phases[phaseIndex];

  return (
    <div className="w-full max-w-md mx-auto py-8 px-6 bg-white/80 backdrop-blur-2xl border border-black/5 rounded-3xl shadow-xl flex flex-col items-center text-center my-6">
      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full mb-4">
        <Gamepad2 size={13} className="text-emerald-700" />
        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
          App Demo · Calming Breathing Bubble
        </span>
      </div>

      <h4 className="text-base font-semibold text-black mb-1">Interactive Breathing Guide</h4>
      <p className="text-xs text-neutral-500 font-serif mb-6">Engage with soothing rhythm exercises whenever anxiety strikes</p>

      {/* Breathing Circle Container */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-6">
        <motion.div
          animate={{
            scale: currentPhase.scale,
            backgroundColor: currentPhase.color,
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="w-24 h-24 rounded-full opacity-20 absolute blur-md"
        />

        <motion.div
          animate={{
            scale: currentPhase.scale,
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-teal-700 to-emerald-400 text-white flex flex-col items-center justify-center shadow-lg"
        >
          <Wind size={22} className="animate-pulse" />
        </motion.div>
      </div>

      {/* Phase Label Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phaseIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className="bg-neutral-100 border border-black/5 px-4 py-1.5 rounded-full text-xs font-bold text-teal-900"
        >
          {currentPhase.label}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
