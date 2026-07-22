"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LanguageSpheres() {
  const [radius, setRadius] = useState(110);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(75);
      } else {
        setRadius(115);
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const languages = [
    { name: "हिंदी", label: "Hindi" },
    { name: "ગુજરાતી", label: "Gujarati" },
    { name: "தமிழ்", label: "Tamil" },
    { name: "తెలుగు", label: "Telugu" },
    { name: "मराठी", label: "Marathi" },
    { name: "English", label: "English" },
    { name: "বাংলা", label: "Bengali" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 my-10 relative overflow-hidden flex flex-col items-center">
      <div className="text-center mb-10">
        <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block mb-2">Culturally Aware Support</span>
        <h3 className="text-xl sm:text-2xl font-medium text-black">Express Yourself in 10+ Indian Languages</h3>
      </div>

      <div className="relative w-full h-[280px] flex items-center justify-center">
        {/* Central AI Glowing Sphere */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              "0 0 30px 10px rgba(45, 212, 191, 0.2)",
              "0 0 50px 20px rgba(45, 212, 191, 0.4)",
              "0 0 30px 10px rgba(45, 212, 191, 0.2)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-teal-700 via-emerald-500 to-teal-300 flex flex-col items-center justify-center text-white z-10 shadow-2xl shrink-0"
        >
          <Sparkles size={24} className="animate-spin text-white mb-1" style={{ animationDuration: "8s" }} />
          <span className="text-[9px] sm:text-[11px] font-bold tracking-widest uppercase">AI Sphere</span>
        </motion.div>

        {/* Orbiting Language Bubbles */}
        {languages.map((lang, idx) => {
          const angle = (idx / languages.length) * (Math.PI * 2);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={idx}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: [x, x * 1.04, x],
                y: [y, y * 1.04, y],
                opacity: 1,
              }}
              transition={{
                duration: 3 + (idx % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.1,
              }}
              whileHover={{ scale: 1.2 }}
              className="absolute z-20 bg-white/90 backdrop-blur-md border border-teal-200/60 shadow-lg px-2.5 py-1 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 cursor-pointer"
            >
              <span className="text-xs sm:text-sm font-bold text-teal-900">{lang.name}</span>
              <span className="text-[8px] sm:text-[10px] text-neutral-400 font-semibold uppercase">({lang.label})</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
