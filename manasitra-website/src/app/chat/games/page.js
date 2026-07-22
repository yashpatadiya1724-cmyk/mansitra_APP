"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Wind, Eye, Palette, Volume2, Play, Pause, Sparkles, CheckCircle2 } from "lucide-react";
import BorderBeam from "@/components/ui/BorderBeam";

export default function GamesPage() {
  const [activeTab, setActiveTab] = useState(0);

  // Breathing state
  const [breathPhase, setBreathPhase] = useState("Inhale");
  const [isBreathingActive, setIsBreathingActive] = useState(true);

  // Grounding technique state
  const [groundingStep, setGroundingStep] = useState(0);
  const groundingSteps = [
    { count: "5", sense: "Things you can SEE around you", example: "A desk lamp, a book, your hands, a window, water bottle." },
    { count: "4", sense: "Things you can TOUCH right now", example: "Your phone, soft fabric of your shirt, cool surface of desk, hair." },
    { count: "3", sense: "Things you can HEAR in the room", example: "Fan hum, distant traffic noise, bird chirping, your breathing." },
    { count: "2", sense: "Things you can SMELL", example: "Fresh air, coffee aroma, soap, pencil graphite." },
    { count: "1", sense: "Thing you can TASTE or are grateful for", example: "Mint flavor, warm tea, a comforting thought." },
  ];

  // Audio frequency state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const tools = [
    { id: 0, title: "Breathing Bubble", icon: Wind, color: "#0d9488" },
    { id: 1, title: "5-4-3-2-1 Grounding", icon: Eye, color: "#0284c7" },
    { id: 2, title: "Focus Canvas", icon: Palette, color: "#d97706" },
    { id: 3, title: "Ambient Audio", icon: Volume2, color: "#7c3aed" },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 md:p-10 pb-32">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div>
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/60 px-3.5 py-1 rounded-full mb-2">
            <Gamepad2 size={14} className="text-teal-700" />
            <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest">Interactive Calming Suite</span>
          </div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Calming Tools & Anxiety Relievers</h1>
          <p className="text-xs text-neutral-500 font-serif mt-1">Engage with sensory grounding, breathing exercises, and focus tools</p>
        </div>

        {/* Tools Tabs */}
        <div className="flex flex-wrap gap-2 bg-neutral-100/80 p-1.5 rounded-full border border-black/5">
          {tools.map((tool) => {
            const isActive = activeTab === tool.id;
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`relative px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                  isActive ? "text-white shadow-md" : "text-neutral-600 hover:text-black"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="calming-tab-bg"
                    className="absolute inset-0 bg-black rounded-full z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={15} className="relative z-10" />
                <span className="relative z-10">{tool.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tool Workspace */}
        <div className="bg-white/80 backdrop-blur-2xl border border-black/5 rounded-3xl p-6 md:p-10 shadow-xl relative min-h-[380px] flex flex-col items-center justify-center text-center overflow-hidden">
          <BorderBeam size={250} duration={8} />

          {/* Tool 0: Breathing Bubble */}
          {activeTab === 0 && (
            <div className="flex flex-col items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/50">
                4-4-4 Box Breathing
              </span>

              <div className="relative w-48 h-48 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1.5, 1],
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 rounded-full bg-gradient-to-tr from-teal-700 via-emerald-400 to-teal-200 opacity-20 absolute blur-md"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.4, 1.4, 1],
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="w-28 h-28 rounded-full bg-gradient-to-tr from-teal-800 to-emerald-500 text-white flex flex-col items-center justify-center shadow-2xl z-10"
                >
                  <Wind size={28} className="animate-pulse" />
                </motion.div>
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-black">Follow the Rhythmic Bubble</h3>
                <p className="text-xs text-neutral-500 font-serif">Inhale deeply for 4s · Hold for 4s · Exhale slowly for 4s</p>
              </div>
            </div>
          )}

          {/* Tool 1: 5-4-3-2-1 Grounding */}
          {activeTab === 1 && (
            <div className="w-full max-w-md space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200/50">
                Sensory Anxiety Reset
              </span>

              <div className="bg-sky-50/60 border border-sky-200/50 p-6 rounded-3xl text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-sky-800 font-serif">{groundingSteps[groundingStep].count}</span>
                  <span className="text-[10px] font-bold text-sky-700 uppercase tracking-widest">Step {groundingStep + 1} of 5</span>
                </div>
                <h4 className="text-base font-bold text-black">{groundingSteps[groundingStep].sense}</h4>
                <p className="text-xs text-neutral-600 font-serif leading-relaxed">
                  Examples: {groundingSteps[groundingStep].example}
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  disabled={groundingStep === 0}
                  onClick={() => setGroundingStep(groundingStep - 1)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 bg-neutral-100 rounded-full disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={() => setGroundingStep((groundingStep + 1) % 5)}
                  className="px-5 py-2 text-xs font-bold text-white bg-black rounded-full hover:bg-neutral-800 transition-all flex items-center gap-1"
                >
                  <span>{groundingStep === 4 ? "Restart Reset" : "Next Sense"}</span>
                  <CheckCircle2 size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Tool 2: Focus Canvas */}
          {activeTab === 2 && (
            <div className="flex flex-col items-center gap-6 w-full max-w-md">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/50">
                Mindful Mandala Drawing
              </span>

              <div className="w-full h-48 bg-neutral-100 rounded-3xl border border-black/5 flex items-center justify-center relative overflow-hidden group cursor-crosshair">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 border-2 border-dashed border-amber-500/40 rounded-full flex items-center justify-center"
                >
                  <div className="w-16 h-16 border-2 border-amber-400/60 rounded-full flex items-center justify-center">
                    <Sparkles size={20} className="text-amber-600" />
                  </div>
                </motion.div>
                <p className="absolute bottom-3 text-[11px] text-neutral-400 font-serif">Move your cursor to soothe your focus</p>
              </div>
            </div>
          )}

          {/* Tool 3: Ambient Audio */}
          {activeTab === 3 && (
            <div className="flex flex-col items-center gap-6 w-full max-w-md">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/50">
                Calming Sound Frequencies
              </span>

              <div className="w-full p-6 bg-purple-50/60 border border-purple-200/50 rounded-3xl flex items-center justify-between">
                <div className="text-left">
                  <h4 className="text-sm font-bold text-black">Soft Rainfall & 432Hz Waves</h4>
                  <p className="text-xs text-neutral-500 font-serif">Reduces stress & anxiety naturally</p>
                </div>
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-12 h-12 rounded-full bg-purple-800 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all"
                >
                  {isPlayingAudio ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                </button>
              </div>

              {isPlayingAudio && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 h-8">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [8, 28, 8] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1.5 bg-purple-600 rounded-full"
                    />
                  ))}
                </motion.div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
