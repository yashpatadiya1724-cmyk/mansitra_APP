"use client";

import { motion } from "framer-motion";
import { User, Lock, Database, Trash2, CheckCircle2 } from "lucide-react";

export default function PrivacyFlowAnimation() {
  const steps = [
    { icon: User, label: "User Input", color: "#0d9488" },
    { icon: Lock, label: "256-bit Encryption", color: "#0284c7" },
    { icon: Database, label: "Session Memory", color: "#6366f1" },
    { icon: Trash2, label: "Auto Delete", color: "#e11d48" },
    { icon: CheckCircle2, label: "Zero Trace", color: "#10b981" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6 bg-white/60 backdrop-blur-2xl border border-black/5 rounded-3xl shadow-xl">
      <div className="text-center mb-8">
        <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block mb-2">Zero-Knowledge Architecture</span>
        <h3 className="text-xl font-medium text-black">How Your Data Stays 100% Private</h3>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
        {/* Animated Connecting Line */}
        <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-neutral-200 -translate-y-1/2 z-0">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-500 via-indigo-500 to-emerald-500"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            className="relative z-10 flex flex-col items-center group text-center"
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="w-14 h-14 rounded-2xl bg-white border border-black/10 shadow-md flex items-center justify-center mb-3 transition-colors group-hover:border-teal-400"
              style={{ color: step.color }}
            >
              <step.icon size={22} />
            </motion.div>
            <span className="text-xs font-semibold text-black">{step.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
