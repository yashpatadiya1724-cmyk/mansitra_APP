"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MultiLayerBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#faf9f8] pointer-events-none">
      {/* Layer 1: Very slow radial gradient */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at center, #ccfbf1 0%, transparent 60%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Layer 2: Floating blurred blobs */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-teal-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.04]"
      />
      <motion.div
        animate={{
          x: [0, -60, 60, 0],
          y: [0, 60, -60, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-rose-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-[0.03]"
      />

      {/* Layer 3: Tiny glowing particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => {
          const r1 = Math.sin((i + 1) * 12.9898) * 43758.5453;
          const r2 = Math.sin((i + 20) * 78.233) * 43758.5453;
          const r3 = Math.sin((i + 40) * 45.164) * 43758.5453;
          const left = ((r1 - Math.floor(r1)) * 100).toFixed(2);
          const top = ((r2 - Math.floor(r2)) * 100).toFixed(2);
          const duration = 5 + (r3 - Math.floor(r3)) * 5;
          const delay = (r1 - Math.floor(r1)) * 3;

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-teal-400 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                boxShadow: "0 0 10px 2px rgba(45, 212, 191, 0.4)",
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.5, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Layer 4: Animated light rays */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay opacity-30"
        style={{
          background: "conic-gradient(from 0deg at 50% -20%, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)",
        }}
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 5: Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      />
    </div>
  );
}
