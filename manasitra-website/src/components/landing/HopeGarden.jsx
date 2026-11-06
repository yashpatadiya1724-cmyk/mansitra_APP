"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Sprout, TreeDeciduous, Flower2, ShieldCheck, RefreshCw } from "lucide-react";
import BorderBeam from "../ui/BorderBeam";

export default function HopeGarden() {
  const [activeStage, setActiveStage] = useState(3); // 0: Seed, 1: Sprout, 2: Bloom, 3: Full Tree
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const stages = [
    {
      id: 0,
      title: "1. Seed of Intent",
      desc: "A safe space to acknowledge how you feel without judgment.",
      progress: 25,
      icon: Heart,
      color: "#059669",
    },
    {
      id: 1,
      title: "2. Daily Sprout",
      desc: "Small daily check-ins build emotional awareness and resilience.",
      progress: 50,
      icon: Sprout,
      color: "#10b981",
    },
    {
      id: 2,
      title: "3. Mindful Bloom",
      desc: "Calming mini-games and grounding tools help flowers blossom.",
      progress: 75,
      icon: Flower2,
      color: "#f472b6",
    },
    {
      id: 3,
      title: "4. Resilience Tree",
      desc: "A flourishing, steady mind built on consistency and self-care.",
      progress: 100,
      icon: TreeDeciduous,
      color: "#34d399",
    },
  ];

  const currentStage = stages[activeStage];

  return (
    <div
      ref={containerRef}
      className="w-full max-w-4xl mx-auto py-12 px-6 my-12 bg-white/80 backdrop-blur-2xl border border-black/5 rounded-3xl shadow-2xl flex flex-col items-center text-center relative overflow-hidden group"
    >
      <BorderBeam size={300} duration={8} colorFrom="#34d399" colorTo="#059669" />

      {/* Header Badge */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-3.5 py-1 rounded-full mb-3 shadow-xs">
          <Heart size={13} className="text-emerald-600 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
            App Feature · Interactive Soul Garden
          </span>
        </div>
        <h3 className="text-3xl font-medium text-black tracking-tight">Your Emotional Growth Journey</h3>
        <p className="text-xs text-neutral-500 font-serif mt-1 max-w-md mx-auto">
          Watch your resilience grow in real-time as you complete daily check-ins, mini-games, and quiet reflections.
        </p>
      </div>

      {/* Interactive Stage Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-neutral-100/80 p-1.5 rounded-full border border-black/5">
        {stages.map((stage) => {
          const isActive = activeStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive ? "text-white shadow-md" : "text-neutral-600 hover:text-black"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="stage-tab-bg"
                  className="absolute inset-0 bg-teal-800 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <stage.icon size={14} className="relative z-10" />
              <span className="relative z-10">{stage.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Visualizer Display */}
      <div className="relative w-full max-w-lg h-[320px] bg-gradient-to-b from-emerald-50/40 to-teal-100/30 rounded-3xl border border-emerald-100/60 p-6 flex flex-col items-center justify-between overflow-hidden shadow-inner">
        {/* Glow Aura */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />

        {/* Top Floating App Metrics */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/5 shadow-xs">
            <ShieldCheck size={14} className="text-teal-700" />
            <span className="text-[11px] font-bold text-neutral-800">Streak: 7 Days</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/5 shadow-xs">
            <Sparkles size={14} className="text-emerald-600" />
            <span className="text-[11px] font-bold text-emerald-900">{currentStage.progress}% Growth</span>
          </div>
        </div>

        {/* SVG Tree / Sprout Growth Display */}
        <div className="relative w-full h-[200px] flex items-end justify-center z-10">
          {/* Soil Mound */}
          <div className="absolute bottom-2 w-56 h-4 bg-amber-900/30 rounded-full blur-xs" />

          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Stage 0: Seed */}
            <motion.circle
              cx="100"
              cy="175"
              r={activeStage === 0 ? 8 : 6}
              fill="#78350f"
              animate={{ scale: activeStage === 0 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Stem */}
            {activeStage >= 1 && (
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
                d="M 100 175 C 95 130, 105 110, 100 80"
                fill="none"
                stroke="#047857"
                strokeWidth="5"
                strokeLinecap="round"
              />
            )}

            {/* Leaves for Sprout (Stage 1+) */}
            {activeStage >= 1 && (
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <path d="M 100 135 C 75 125, 75 110, 100 135" fill="#10b981" />
                <path d="M 100 120 C 125 110, 125 95, 100 120" fill="#34d399" />
              </motion.g>
            )}

            {/* Flowers for Bloom (Stage 2+) */}
            {activeStage >= 2 && (
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <circle cx="80" cy="115" r="7" fill="#f472b6" />
                <circle cx="120" cy="100" r="7" fill="#fbbf24" />
                <circle cx="100" cy="80" r="9" fill="#f43f5e" />
              </motion.g>
            )}

            {/* Full Canopy for Resilience Tree (Stage 3) */}
            {activeStage === 3 && (
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <circle cx="100" cy="65" r="38" fill="#047857" opacity="0.9" />
                <circle cx="75" cy="78" r="28" fill="#10b981" opacity="0.95" />
                <circle cx="125" cy="78" r="28" fill="#34d399" opacity="0.95" />
                <circle cx="100" cy="48" r="30" fill="#6ee7b7" opacity="0.95" />

                {/* Floating Pollen / Light Particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={70 + i * 12}
                    cy={40 + (i % 3) * 15}
                    r="2.5"
                    fill="#ffffff"
                    animate={{
                      y: [-5, 5, -5],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.g>
            )}
          </svg>
        </div>

        {/* Dynamic Description Box */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-black/5 shadow-sm text-center z-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeStage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-neutral-700 font-medium"
            >
              {currentStage.desc}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
