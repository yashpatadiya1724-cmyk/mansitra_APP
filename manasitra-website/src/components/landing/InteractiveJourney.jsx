"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Frown, MessageSquare, Brain, Smile, Sprout, ArrowRight } from "lucide-react";

export default function InteractiveJourney() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "1. Feel Stress",
      icon: Frown,
      color: "#e11d48",
      bg: "#fff1f2",
      badge: "Heavy Mind",
      desc: "Academic pressures, exam fear, or social anxiety build up in silence.",
    },
    {
      id: 1,
      title: "2. Talk Anonymous",
      icon: MessageSquare,
      color: "#0f766e",
      bg: "#f0fdf4",
      badge: "Zero-Knowledge Chat",
      desc: "Express yourself freely without login, data tracking, or fear of judgment.",
    },
    {
      id: 2,
      title: "3. Feel Understood",
      icon: Brain,
      color: "#0284c7",
      bg: "#f0f9ff",
      badge: "Empathetic AI",
      desc: "Culturally-aware AI companion validates your emotions and guides CBT active listening.",
    },
    {
      id: 3,
      title: "4. Restore Calm",
      icon: Smile,
      color: "#059669",
      bg: "#ecfdf5",
      badge: "Inner Balance",
      desc: "Engage with breathing bubbles, grounding exercises, and soothing audio guidance.",
    },
    {
      id: 4,
      title: "5. Long-term Growth",
      icon: Sprout,
      color: "#10b981",
      bg: "#e6fffa",
      badge: "Resilience Tree",
      desc: "Track daily mood trends and build lasting emotional strength over time.",
    },
  ];

  const current = steps[activeStep];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6 my-16 bg-white/80 backdrop-blur-2xl border border-black/5 rounded-3xl shadow-xl flex flex-col items-center text-center relative overflow-hidden">
      <div className="mb-8">
        <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block mb-2">
          Interactive Journey · 5 Steps to Healing
        </span>
        <h3 className="text-3xl font-medium text-black tracking-tight">From Academic Stress to Inner Resilience</h3>
        <p className="text-xs text-neutral-500 font-serif mt-1">Click through each milestone of the emotional wellness pathway</p>
      </div>

      {/* Steps Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`px-3.5 py-2 rounded-2xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                isActive
                  ? "border-teal-600 bg-teal-800 text-white shadow-md scale-105"
                  : "border-black/5 bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              <Icon size={14} style={{ color: isActive ? "#ffffff" : step.color }} />
              <span>{step.title}</span>
              {idx < steps.length - 1 && <ArrowRight size={10} className="opacity-40 ml-1 hidden sm:inline" />}
            </button>
          );
        })}
      </div>

      {/* Active Step Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md p-6 rounded-3xl border border-black/5 shadow-md text-left flex flex-col gap-3 relative overflow-hidden"
          style={{ backgroundColor: current.bg }}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center">
              <current.icon size={20} style={{ color: current.color }} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-white rounded-full border border-black/5 text-neutral-700">
              {current.badge}
            </span>
          </div>

          <h4 className="text-lg font-bold text-black">{current.title}</h4>
          <p className="text-xs text-neutral-600 leading-relaxed font-serif">{current.desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
