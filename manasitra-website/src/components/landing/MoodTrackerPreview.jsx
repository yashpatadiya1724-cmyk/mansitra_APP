"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Meh, Frown, Sparkles, TrendingUp } from "lucide-react";

export default function MoodTrackerPreview() {
  const [selectedMood, setSelectedMood] = useState(2); // 0: Low, 1: Okay, 2: Calm, 3: Energetic

  const moods = [
    { id: 0, label: "Overwhelmed", icon: Frown, color: "#e11d48", bg: "#fff1f2" },
    { id: 1, label: "Anxious", icon: Meh, color: "#d97706", bg: "#fffbeb" },
    { id: 2, label: "Calm & Focused", icon: Smile, color: "#059669", bg: "#ecfdf5" },
    { id: 3, label: "Hopeful & Strong", icon: Sparkles, color: "#0284c7", bg: "#f0f9ff" },
  ];

  const currentMood = moods[selectedMood];

  return (
    <div className="w-full max-w-md mx-auto py-8 px-6 bg-white/80 backdrop-blur-2xl border border-black/5 rounded-3xl shadow-xl flex flex-col items-center text-center my-6">
      <div className="flex items-center gap-2 bg-teal-50 border border-teal-200/60 px-3 py-1 rounded-full mb-4">
        <TrendingUp size={13} className="text-teal-700" />
        <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest">
          App Demo · Mood Tracking & Insights
        </span>
      </div>

      <h4 className="text-base font-semibold text-black mb-1">How are you feeling right now?</h4>
      <p className="text-xs text-neutral-500 font-serif mb-6">Select your mood to see real-time emotional trend tracking</p>

      {/* Mood Selector Buttons */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {moods.map((m) => {
          const isSelected = selectedMood === m.id;
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedMood(m.id)}
              className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1 ${
                isSelected
                  ? "border-teal-500 scale-110 shadow-md"
                  : "border-black/5 bg-neutral-50 hover:bg-neutral-100"
              }`}
              style={{ backgroundColor: isSelected ? m.bg : undefined }}
            >
              <Icon size={22} style={{ color: m.color }} />
            </button>
          );
        })}
      </div>

      {/* Dynamic Mood Card Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMood}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full p-4 rounded-2xl border border-black/5 flex items-center justify-between shadow-xs"
          style={{ backgroundColor: currentMood.bg }}
        >
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider block text-neutral-400">Current Mood</span>
            <h5 className="text-sm font-bold text-black">{currentMood.label}</h5>
          </div>
          <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-black/5 text-xs font-semibold text-teal-900 shadow-2xs">
            <Sparkles size={13} className="text-teal-600" />
            <span>Streak: +1 Day</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
