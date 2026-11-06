"use client";

import { motion } from "framer-motion";
import { Mic, Volume2 } from "lucide-react";

export default function VoiceCompanionVisualizer() {
  return (
    <div className="w-full max-w-md mx-auto py-8 px-6 bg-white/70 backdrop-blur-2xl border border-black/5 rounded-3xl shadow-xl flex flex-col items-center text-center my-8">
      <div className="relative mb-6">
        {/* Pulsing rings */}
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-teal-400/30 -z-10"
        />
        <motion.div
          animate={{ scale: [1, 2.3, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
          className="absolute inset-0 rounded-full bg-teal-300/20 -z-10"
        />

        <div className="w-16 h-16 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-lg">
          <Mic size={26} className="animate-pulse" />
        </div>
      </div>

      <h4 className="text-base font-semibold text-black mb-1">Hands-Free Voice Companion</h4>
      <p className="text-xs text-neutral-500 max-w-xs mb-6 font-serif">
        Speak naturally and listen to comforting, hands-free dialogue in your native tongue.
      </p>

      {/* Live Waveform Bars */}
      <div className="flex items-center gap-1.5 h-10 px-6 py-2 bg-teal-50/80 border border-teal-100 rounded-full">
        <Volume2 size={16} className="text-teal-700 mr-2" />
        {[0.6, 1.2, 0.4, 1.5, 0.9, 1.3, 0.5, 1.1, 0.7].map((height, i) => (
          <motion.div
            key={i}
            className="w-1 bg-teal-600 rounded-full"
            animate={{
              height: [`${height * 8}px`, `${height * 24}px`, `${height * 8}px`],
            }}
            transition={{
              duration: 1 + (i % 3) * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
