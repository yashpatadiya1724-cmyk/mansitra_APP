"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Mic, MicOff, Sparkles, Globe, ShieldCheck, PhoneCall, PhoneOff } from "lucide-react";
import BorderBeam from "@/components/ui/BorderBeam";
import { useEmotionTheme } from "@/context/ThemeContext";

export default function VoicePage() {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedLang, setSelectedLang] = useState("Hindi");
  const [callStatus, setCallStatus] = useState("Tap to start hands-free voice companion");

  const languages = ["Hindi", "English", "Gujarati", "Marathi", "Tamil", "Telugu", "Bengali"];

  const toggleCall = () => {
    if (isCallActive) {
      setIsCallActive(false);
      setCallStatus("Voice Companion Disconnected");
    } else {
      setIsCallActive(true);
      setCallStatus("Listening to your voice...");
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 md:p-10 pb-32 flex flex-col items-center justify-center text-center">
      <div className="max-w-2xl w-full space-y-8">
        
        {/* Header Badge */}
        <div>
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-3 border transition-all duration-700 ${
            isDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-teal-50 border-teal-200/60"
          }`}>
            <Volume2 size={14} className={`animate-pulse ${isDark ? "text-emerald-400" : "text-teal-700"}`} />
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-emerald-300" : "text-teal-800"}`}>Hands-Free Voice Mode</span>
          </div>
          <h1 className={`text-3xl font-bold tracking-tight transition-colors duration-700 ${isDark ? "text-white" : "text-black"}`}>Talk to Mansitra Naturally</h1>
          <p className={`text-xs font-serif mt-1 ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>Speak comfortably in your native language with zero typing required</p>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Globe size={14} className="text-neutral-400 mr-1" />
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedLang === lang
                  ? isDark ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "bg-teal-800 text-white shadow-md"
                  : isDark ? "bg-white/[0.04] border border-white/10 text-neutral-400 hover:text-white" : "bg-white/80 border border-black/5 text-neutral-600 hover:text-black"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Main Voice Orb Card */}
        <div className={`backdrop-blur-2xl rounded-3xl p-10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[340px] transition-all duration-700 ${
          isDark
            ? "bg-white/[0.04] border border-white/[0.08]"
            : "bg-white/80 border border-black/5"
        }`}>
          <BorderBeam size={250} duration={8} colorFrom={isDark ? "#10b981" : "#5eead4"} colorTo={isDark ? "#6366f1" : "#0d9488"} />

          {/* Pulsing Mic Rings */}
          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            {isCallActive && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className={`w-32 h-32 rounded-full border-2 absolute ${isDark ? "border-emerald-400/40" : "border-teal-500/40"}`}
                />
                <motion.div
                  animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className={`w-32 h-32 rounded-full border-2 absolute ${isDark ? "border-emerald-500/30" : "border-emerald-400/30"}`}
                />
              </>
            )}

            {/* Central Orb */}
            <motion.div
              animate={{ scale: isCallActive ? [1, 1.12, 1] : 1 }}
              transition={{ duration: 2, repeat: isCallActive ? Infinity : 0, ease: "easeInOut" }}
              className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-white shadow-2xl z-10 transition-all duration-500 ${
                isCallActive
                  ? isDark
                    ? "bg-gradient-to-tr from-emerald-700 via-emerald-500 to-teal-400 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                    : "bg-gradient-to-tr from-teal-800 via-emerald-500 to-teal-300"
                  : isDark ? "bg-white/10" : "bg-neutral-800"
              }`}
            >
              {isCallActive ? (
                <Sparkles size={36} className="animate-spin text-white" style={{ animationDuration: "6s" }} />
              ) : (
                <Mic size={36} className={isDark ? "text-neutral-500" : "text-neutral-400"} />
              )}
            </motion.div>
          </div>

          {/* Status Message */}
          <AnimatePresence mode="wait">
            <motion.div
              key={callStatus}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-black"}`}>{callStatus}</h3>
              <p className={`text-xs font-serif ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>Selected Language: {selectedLang}</p>
            </motion.div>
          </AnimatePresence>

          {/* Live Waveform */}
          {isCallActive && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 h-6 mt-6">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, 22, 4] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.05 }}
                  className={`w-1 rounded-full ${isDark ? "bg-emerald-400" : "bg-emerald-500"}`}
                />
              ))}
            </motion.div>
          )}

          {/* Call Controls */}
          <div className="flex items-center gap-4 mt-8">
            {isCallActive && (
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full border transition-all shadow-md ${
                  isMuted
                    ? "bg-amber-100 border-amber-300 text-amber-900"
                    : isDark ? "bg-white/5 border-white/10 text-neutral-300" : "bg-white border-black/5 text-neutral-700"
                }`}
                title="Mute Mic"
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            )}

            <button
              onClick={toggleCall}
              className={`px-8 py-4 rounded-full font-bold text-sm text-white shadow-xl flex items-center gap-2 transition-all active:scale-95 ${
                isCallActive
                  ? "bg-rose-600 hover:bg-rose-700"
                  : isDark ? "bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]" : "bg-teal-800 hover:bg-teal-900"
              }`}
            >
              {isCallActive ? (
                <>
                  <PhoneOff size={18} />
                  <span>End Voice Session</span>
                </>
              ) : (
                <>
                  <PhoneCall size={18} />
                  <span>Start Voice Companion</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Privacy Note */}
        <div className={`inline-flex items-center gap-2 text-xs backdrop-blur-md px-4 py-2 rounded-full border transition-all duration-700 ${
          isDark
            ? "text-neutral-400 bg-white/[0.04] border-white/10"
            : "text-neutral-500 bg-white/70 border-black/5"
        }`}>
          <ShieldCheck size={14} className={isDark ? "text-emerald-400" : "text-teal-700"} />
          <span>Real-time voice audio is processed anonymously without saving audio logs.</span>
        </div>

      </div>
    </div>
  );
}
