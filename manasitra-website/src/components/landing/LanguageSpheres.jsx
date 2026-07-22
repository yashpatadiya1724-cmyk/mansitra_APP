"use client";

import { motion } from "framer-motion";
import { Globe, Sparkles } from "lucide-react";

export default function LanguageSpheres() {
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
    <div className="w-full max-w-4xl mx-auto py-12 px-6 my-10 relative overflow-hidden flex flex-col items-center">
      <div className="text-center mb-10">
        <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block mb-2">Culturally Aware Support</span>
        <h3 className="text-2xl font-medium text-black">Express Yourself in 10+ Indian Languages</h3>
      </div>

      <div className="relative w-full h-[260px] flex items-center justify-center">
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
          className="w-28 h-28 rounded-full bg-gradient-to-tr from-teal-700 via-emerald-500 to-teal-300 flex flex-col items-center justify-center text-white z-10 shadow-2xl"
        >
          <Sparkles size={28} className="animate-spin text-white mb-1" style={{ animationDuration: "8s" }} />
          <span className="text-[11px] font-bold tracking-widest uppercase">AI Sphere</span>
        </motion.div>

        {/* Orbiting Language Bubbles */}
        {languages.map((lang, idx) => {
          const angle = (idx / languages.length) * (Math.PI * 2);
          const radius = 110; // distance from center
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={idx}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: [x, x * 1.05, x],
                y: [y, y * 1.05, y],
                opacity: 1,
              }}
              transition={{
                duration: 3 + (idx % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.1,
              }}
              whileHover={{ scale: 1.25 }}
              className="absolute z-20 bg-white/90 backdrop-blur-md border border-teal-200/60 shadow-lg px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer"
            >
              <span className="text-sm font-bold text-teal-900">{lang.name}</span>
              <span className="text-[10px] text-neutral-400 font-semibold uppercase">({lang.label})</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
