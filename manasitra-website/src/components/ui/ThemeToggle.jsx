"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useEmotionTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useEmotionTheme() || { theme: "light", toggleTheme: () => {} };
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-500 shadow-xs ${
        isDark
          ? "bg-[#141A22] border-emerald-500/30 text-emerald-300 hover:bg-[#1e2733]"
          : "bg-white border-black/10 text-neutral-700 hover:bg-neutral-50"
      }`}
      title={isDark ? "Switch to Calm Mode (Light)" : "Switch to Serenity Mode (Dark)"}
    >
      <motion.div
        animate={{ rotate: isDark ? 180 : 0, scale: [1, 1.2, 1] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Moon size={14} className="text-emerald-400 fill-emerald-400/20" />
        ) : (
          <Sun size={14} className="text-amber-500 fill-amber-500/20" />
        )}
      </motion.div>
      <span className="hidden sm:inline text-[11px] font-bold tracking-wide">
        {isDark ? "🌌 Serenity" : "🌅 Calm"}
      </span>
    </button>
  );
}
