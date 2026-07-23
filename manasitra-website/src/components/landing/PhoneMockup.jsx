"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useEmotionTheme } from "@/context/ThemeContext";
import { Sparkles, ShieldCheck, Heart, Volume2, Smile, Send, Mic, Wind, Award, Lock, MessageSquare } from "lucide-react";

export default function PhoneMockup() {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [12, -8]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const [activeScreen, setActiveScreen] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-[620px] flex items-center justify-center relative perspective-[1200px] py-6">
      
      {/* Background Ambient Glow around phone */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: isDark ? [0.25, 0.45, 0.25] : [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute w-[340px] h-[580px] rounded-[60px] blur-3xl pointer-events-none ${
          isDark
            ? "bg-gradient-to-tr from-emerald-600 via-teal-500 to-indigo-600 opacity-30"
            : "bg-gradient-to-tr from-teal-400 via-emerald-300 to-sky-300 opacity-20"
        }`}
      />

      {/* Floating Glass Badge 1 (Top Left) */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        animate={{ y: [0, -8, 0] }}
        transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        className={`hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl backdrop-blur-xl border shadow-xl absolute -left-6 top-16 z-30 transition-colors duration-700 ${
          isDark
            ? "bg-[#141A22]/90 border-emerald-500/30 text-emerald-300 shadow-[0_10px_25px_rgba(16,185,129,0.15)]"
            : "bg-white/90 border-teal-200/80 text-teal-800 shadow-lg"
        }`}
      >
        <div className={`p-1.5 rounded-xl ${isDark ? "bg-emerald-500/20" : "bg-teal-50"}`}>
          <Lock size={14} className={isDark ? "text-emerald-400" : "text-teal-700"} />
        </div>
        <div>
          <p className="text-[11px] font-bold leading-tight">100% Anonymous</p>
          <p className={`text-[9px] font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>No Chat Logs Stored</p>
        </div>
      </motion.div>

      {/* Floating Glass Badge 2 (Right Middle) */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        animate={{ y: [0, 8, 0] }}
        transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
        className={`hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl backdrop-blur-xl border shadow-xl absolute -right-6 top-52 z-30 transition-colors duration-700 ${
          isDark
            ? "bg-[#141A22]/90 border-white/10 text-white shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
            : "bg-white/90 border-black/5 text-black shadow-lg"
        }`}
      >
        <div className={`p-1.5 rounded-xl ${isDark ? "bg-amber-500/20" : "bg-amber-50"}`}>
          <Award size={14} className={isDark ? "text-amber-400" : "text-amber-600"} />
        </div>
        <div>
          <p className="text-[11px] font-bold leading-tight">7-Day Resilience Streak</p>
          <p className={`text-[9px] font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>CBT Streak Active</p>
        </div>
      </motion.div>

      {/* Floating Glass Badge 3 (Bottom Left) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        animate={{ y: [0, -6, 0] }}
        transition={{ y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-xl border shadow-xl absolute -left-4 bottom-20 z-30 transition-colors duration-700 ${
          isDark
            ? "bg-[#141A22]/90 border-teal-500/30 text-teal-300"
            : "bg-white/90 border-teal-200/80 text-teal-800"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-wider">10+ Regional Indian Languages</span>
      </motion.div>

      {/* Realistic 3D Phone Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          y,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-[295px] h-[590px] rounded-[48px] border-[10px] shadow-2xl flex flex-col overflow-hidden transition-all duration-700 ${
          isDark 
            ? "bg-[#0b0f17] border-neutral-800 shadow-[0_30px_90px_rgba(0,0,0,0.9)] ring-1 ring-white/10" 
            : "bg-white border-neutral-300 shadow-[0_30px_90px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
        }`}
      >
        {/* Dynamic Island / Camera Notch */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center items-center z-30 pointer-events-none">
          <div className={`w-28 h-5 rounded-b-2xl flex items-center justify-between px-3 transition-colors duration-700 ${
            isDark ? "bg-neutral-900 border-b border-white/5" : "bg-neutral-900"
          }`}>
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 ring-1 ring-neutral-700" />
            <div className="w-2 h-2 rounded-full bg-blue-900/60" />
          </div>
        </div>

        {/* Screen Content Wrapper */}
        <div className={`relative flex-1 w-full h-full overflow-hidden rounded-[38px] transition-colors duration-700 ${
          isDark ? "bg-[#0d131f] text-neutral-200" : "bg-[#faf9f8] text-neutral-800"
        }`}>

          {/* Realistic Dynamic Screen Glare Sweep */}
          <motion.div 
            className="absolute inset-0 z-20 pointer-events-none opacity-25"
            style={{
              background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.7) 40%, transparent 50%)",
            }}
            animate={{ x: ["-120%", "220%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />

          {/* App Header Status Bar */}
          <div className={`pt-8 px-4 pb-2 flex items-center justify-between border-b transition-colors duration-700 ${
            isDark ? "border-white/5 bg-[#0d131f]" : "border-black/5 bg-white"
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-teal-700 to-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                M
              </div>
              <span className={`text-xs font-bold ${isDark ? "text-white" : "text-black"}`}>Mansitra AI</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`text-[9px] font-semibold ${isDark ? "text-emerald-400" : "text-teal-700"}`}>Online</span>
            </div>
          </div>

          {/* Interactive Screen Tab Controls inside mockup */}
          <div className={`flex justify-around py-1.5 px-2 border-b text-[9px] font-bold uppercase tracking-wider transition-colors duration-700 ${
            isDark ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-neutral-100/60"
          }`}>
            {[
              { id: 0, label: "Chat", icon: MessageSquare },
              { id: 1, label: "Mood", icon: Smile },
              { id: 2, label: "Voice", icon: Volume2 },
              { id: 3, label: "Calm", icon: Wind },
            ].map((tab) => {
              const isActive = activeScreen === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveScreen(tab.id)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                    isActive
                      ? isDark ? "bg-emerald-500/20 text-emerald-300" : "bg-teal-800 text-white shadow-xs"
                      : isDark ? "text-neutral-500 hover:text-neutral-300" : "text-neutral-500 hover:text-black"
                  }`}
                >
                  <Icon size={10} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Animated Screen Content */}
          <div className="p-3.5 flex-1 flex flex-col justify-between h-[calc(100%-80px)] overflow-hidden relative">
            <AnimatePresence mode="wait">
              
              {/* Screen 0: AI Companion Chat Screen */}
              {activeScreen === 0 && (
                <motion.div
                  key="screen-chat"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col h-full justify-between gap-2"
                >
                  <div className="space-y-2.5 flex-1 overflow-hidden pt-1">
                    {/* User Msg */}
                    <div className="flex justify-end">
                      <div className={`px-3 py-2 text-[11px] rounded-xl max-w-[85%] leading-snug shadow-xs ${
                        isDark ? "bg-emerald-600 text-white" : "bg-black text-white"
                      }`}>
                        I&apos;m feeling overwhelmed with exam pressure...
                      </div>
                    </div>

                    {/* AI Response Msg */}
                    <div className="flex gap-2 justify-start items-start">
                      <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-teal-700 to-emerald-500 text-white flex items-center justify-center shrink-0 text-[9px] font-bold">
                        M
                      </div>
                      <div className={`px-3 py-2 text-[11px] rounded-xl max-w-[85%] leading-relaxed shadow-xs ${
                        isDark ? "bg-white/10 border border-white/10 text-neutral-200" : "bg-white border border-black/5 text-black"
                      }`}>
                        I hear you, buddy. Take a slow deep breath right now. You&apos;ve handled hard things before, and we will get through this step by step. 🌿
                      </div>
                    </div>

                    {/* AI CBT Tool suggestion pill */}
                    <div className={`p-2 rounded-xl border flex items-center gap-2 text-[10px] font-semibold transition-all ${
                      isDark ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-teal-50 border-teal-200/60 text-teal-800"
                    }`}>
                      <Sparkles size={12} className="shrink-0 text-emerald-500" />
                      <span>Suggested: 2-Min Box Breathing</span>
                    </div>
                  </div>

                  {/* Input Mock */}
                  <div className={`p-2 rounded-xl border flex items-center justify-between text-[11px] ${
                    isDark ? "bg-white/5 border-white/10 text-neutral-400" : "bg-white border-black/5 text-neutral-400"
                  }`}>
                    <span>Talk to Mansitra...</span>
                    <div className={`p-1.5 rounded-lg text-white ${isDark ? "bg-emerald-600" : "bg-teal-800"}`}>
                      <Send size={10} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Screen 1: Mood Timeline & CBT Analytics */}
              {activeScreen === 1 && (
                <motion.div
                  key="screen-mood"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col h-full justify-between gap-3 pt-1"
                >
                  <div className={`p-3 rounded-2xl border text-left space-y-1.5 ${
                    isDark ? "bg-white/5 border-white/10" : "bg-white border-black/5 shadow-xs"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold ${isDark ? "text-emerald-400" : "text-teal-700"}`}>Weekly Overview</span>
                      <span className="text-[9px] text-neutral-400">Calm +35%</span>
                    </div>
                    <div className="flex items-end justify-between h-14 pt-2 gap-1.5">
                      {[40, 25, 75, 60, 90, 50, 85].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 0.6, delay: i * 0.05 }}
                            className={`w-full rounded-md ${
                              isDark ? "bg-gradient-to-t from-emerald-600 to-teal-400" : "bg-gradient-to-t from-teal-700 to-emerald-400"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`p-3 rounded-2xl border text-left ${
                    isDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border border-emerald-200/60"
                  }`}>
                    <p className={`text-[10px] font-bold mb-0.5 ${isDark ? "text-emerald-300" : "text-emerald-900"}`}>AI CBT Insight</p>
                    <p className={`text-[10px] font-serif leading-tight ${isDark ? "text-emerald-200/80" : "text-emerald-800"}`}>
                      Evening reflections are improving your focus and sleep consistency.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Screen 2: Voice Companion */}
              {activeScreen === 2 && (
                <motion.div
                  key="screen-voice"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col h-full items-center justify-center text-center gap-4 py-2"
                >
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`w-24 h-24 rounded-full absolute border-2 ${isDark ? "border-emerald-400/40" : "border-teal-500/40"}`}
                    />
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl ${
                      isDark ? "bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]" : "bg-gradient-to-tr from-teal-800 to-emerald-500"
                    }`}>
                      <Mic size={24} className="animate-pulse" />
                    </div>
                  </div>

                  <div>
                    <p className={`text-xs font-bold ${isDark ? "text-white" : "text-black"}`}>Listening to your voice...</p>
                    <p className={`text-[9px] font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>Language: Hindi / English</p>
                  </div>

                  <div className="flex items-center gap-1 h-4">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [3, 16, 3] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                        className={`w-1 rounded-full ${isDark ? "bg-emerald-400" : "bg-teal-600"}`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Screen 3: Breathing & Calming Bubble */}
              {activeScreen === 3 && (
                <motion.div
                  key="screen-calm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col h-full items-center justify-center text-center gap-3 py-2"
                >
                  <div className="relative flex items-center justify-center w-24 h-24">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl ${
                        isDark ? "bg-gradient-to-tr from-teal-600 to-emerald-400 opacity-80" : "bg-gradient-to-tr from-teal-700 to-emerald-400"
                      }`}
                    >
                      <Wind size={22} className="animate-pulse" />
                    </motion.div>
                  </div>

                  <div>
                    <p className={`text-xs font-bold ${isDark ? "text-white" : "text-black"}`}>4-4-4 Box Breathing</p>
                    <p className={`text-[9px] font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>Inhale slow ... Hold ... Exhale</p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Bottom Home Indicator Bar */}
            <div className="w-full flex justify-center pt-2">
              <div className={`w-24 h-1 rounded-full ${isDark ? "bg-white/20" : "bg-black/20"}`} />
            </div>
          </div>

        </div>
      </motion.div>

    </div>
  );
}
