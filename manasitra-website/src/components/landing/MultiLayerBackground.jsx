"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useEmotionTheme } from "@/context/ThemeContext";

export default function MultiLayerBackground() {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-700 ${
      isDark ? "bg-[#0d131f]" : "bg-[#faf9f8]"
    }`}>
      {/* Light Mode: Warm Morning Sunlight & Soft Cream Aura */}
      {!isDark && (
        <>
          <motion.div
            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-40"
            style={{
              background: "radial-gradient(circle at center, #ccfbf1 0%, transparent 60%)",
              backgroundSize: "200% 200%",
            }}
          />
          {/* Floating warm dust particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => {
              const r1 = Math.sin((i + 1) * 12.9898) * 43758.5453;
              const left = ((r1 - Math.floor(r1)) * 100).toFixed(2);
              const top = ((r1 * 2 - Math.floor(r1 * 2)) * 100).toFixed(2);
              return (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-amber-400/40 rounded-full"
                  style={{ left: `${left}%`, top: `${top}%` }}
                  animate={{ y: [0, -25, 0], opacity: [0.1, 0.6, 0.1] }}
                  transition={{ duration: 6 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
                />
              );
            })}
          </div>
        </>
      )}

      {/* Dark Mode: Deep Space Aurora & Glowing Star Constellations */}
      {isDark && (
        <>
          {/* Aurora Light Waves */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at top, #0f766e 0%, #030712 70%)",
              backgroundSize: "200% 200%",
            }}
          />

          {/* Star Constellation Grid */}
          <div className="absolute inset-0">
            {[...Array(40)].map((_, i) => {
              const r1 = Math.sin((i + 1) * 12.9898) * 43758.5453;
              const r2 = Math.sin((i + 40) * 78.233) * 43758.5453;
              const left = ((r1 - Math.floor(r1)) * 100).toFixed(2);
              const top = ((r2 - Math.floor(r2)) * 100).toFixed(2);

              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-teal-300 rounded-full shadow-[0_0_8px_#5eead4]"
                  style={{ left: `${left}%`, top: `${top}%` }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
                  transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.1 }}
                />
              );
            })}
          </div>

          {/* Futuristic Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </>
      )}

      {/* Shared Noise Layer */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      />
    </div>
  );
}
