"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Smile, Meh, Frown, Sparkles, TrendingUp, Calendar, ShieldCheck, Plus, Check, Brain, Award } from "lucide-react";
import BorderBeam from "@/components/ui/BorderBeam";
import { useEmotionTheme } from "@/context/ThemeContext";

export default function MoodPage() {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

  const [selectedMood, setSelectedMood] = useState(2);
  const [journalNote, setJournalNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([
    { id: 1, date: "Today, 4:30 PM", mood: "Calm & Focused", note: "Felt a lot lighter after completing my study session and talking to Mansitra." },
    { id: 2, date: "Yesterday", mood: "Hopeful & Strong", note: "Took a walk outside and practiced 4-7-8 breathing." }
  ]);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  const moods = [
    { id: 0, label: "Overwhelmed", icon: Frown, color: "#e11d48", bg: "#fff1f2", score: 1 },
    { id: 1, label: "Anxious", icon: Meh, color: "#d97706", bg: "#fffbeb", score: 2 },
    { id: 2, label: "Calm & Focused", icon: Smile, color: "#059669", bg: "#ecfdf5", score: 4 },
    { id: 3, label: "Hopeful & Strong", icon: Sparkles, color: "#0284c7", bg: "#f0f9ff", score: 5 },
  ];

  const currentMood = moods[selectedMood];

  const handleSaveEntry = () => {
    if (!journalNote.trim()) return;
    const newEntry = {
      id: Date.now(),
      date: "Just Now",
      mood: currentMood.label,
      note: journalNote,
    };
    setSavedNotes([newEntry, ...savedNotes]);
    setJournalNote("");
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 3000);
  };

  const weekDays = [
    { day: "Mon", score: 4, label: "Calm" },
    { day: "Tue", score: 2, label: "Anxious" },
    { day: "Wed", score: 5, label: "Strong" },
    { day: "Thu", score: 4, label: "Calm" },
    { day: "Fri", score: 5, label: "Hopeful" },
    { day: "Sat", score: 3, label: "Okay" },
    { day: "Sun", score: 4, label: "Calm" },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 md:p-10 pb-32">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-2 border transition-all duration-700 ${
              isDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-200/60"
            }`}>
              <TrendingUp size={14} className={isDark ? "text-emerald-400" : "text-emerald-700"} />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-emerald-300" : "text-emerald-800"}`}>Personal Mood Hub</span>
            </div>
            <h1 className={`text-3xl font-bold tracking-tight transition-colors duration-700 ${isDark ? "text-white" : "text-black"}`}>Mood Tracker & Reflection Journal</h1>
            <p className={`text-xs font-serif mt-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>Track your emotional balance and discover daily resilience trends</p>
          </div>

          <div className={`flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-2xl border shadow-xs transition-all duration-700 ${
            isDark ? "bg-white/[0.04] border-white/10" : "bg-white/90 border-black/5"
          }`}>
            <Award size={16} className={isDark ? "text-emerald-400" : "text-emerald-600"} />
            <span className={`text-xs font-bold ${isDark ? "text-white" : "text-black"}`}>Streak: 7 Days Active</span>
          </div>
        </div>

        {/* AI Insight Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-3xl shadow-xl flex items-center gap-4 relative overflow-hidden transition-all duration-700 ${
            isDark
              ? "bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 border border-emerald-500/20 text-white"
              : "bg-gradient-to-r from-teal-900 via-emerald-800 to-teal-950 text-white"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Brain size={24} className="text-emerald-300 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">AI CBT Insight</span>
            <p className="text-xs sm:text-sm text-neutral-100 font-serif leading-relaxed">
              &quot;Your calm levels have increased by <strong>35%</strong> over the past week! Regular evening check-ins are building lasting resilience.&quot;
            </p>
          </div>
        </motion.div>

        {/* Current Mood Check-In Widget */}
        <div className={`backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden transition-all duration-700 ${
          isDark ? "bg-white/[0.04] border border-white/[0.08]" : "bg-white/80 border border-black/5"
        }`}>
          <BorderBeam size={250} duration={8} colorFrom={isDark ? "#10b981" : "#5eead4"} colorTo={isDark ? "#6366f1" : "#0d9488"} />

          <h2 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}>How are you feeling right now?</h2>
          <p className={`text-xs font-serif mb-6 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>Select your current emotional state to record today&apos;s entry</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {moods.map((m) => {
              const isSelected = selectedMood === m.id;
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMood(m.id)}
                  className={`p-5 rounded-3xl border transition-all flex flex-col items-center gap-2 text-center ${
                    isSelected
                      ? isDark
                        ? "border-emerald-400 scale-105 shadow-[0_0_20px_rgba(16,185,129,0.2)] bg-white/10"
                        : "border-teal-600 scale-105 shadow-md bg-white"
                      : isDark
                        ? "border-white/10 bg-white/[0.02] hover:bg-white/5"
                        : "border-black/5 bg-neutral-50/80 hover:bg-neutral-100/80"
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : m.bg }}>
                    <Icon size={24} style={{ color: isDark ? '#34d399' : m.color }} />
                  </div>
                  <span className={`text-xs font-bold mt-1 ${isDark ? "text-white" : "text-black"}`}>{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Journal Input */}
          <div className={`border rounded-2xl p-4 flex flex-col gap-3 transition-all duration-700 ${
            isDark ? "bg-white/[0.02] border-white/10" : "bg-neutral-50/80 border-black/5"
          }`}>
            <label className={`text-xs font-bold ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>Add a quick note or journal entry (Optional):</label>
            <textarea
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              placeholder="What made you feel this way today?..."
              className={`w-full border rounded-xl p-3 text-xs outline-none min-h-[70px] resize-none transition-all duration-700 ${
                isDark
                  ? "bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500/50"
                  : "bg-white border-black/5 text-black placeholder:text-neutral-400 focus:border-teal-600/50"
              }`}
            />
            <div className="flex items-center justify-between pt-1">
              <div className={`flex items-center gap-1.5 text-[11px] font-medium ${isDark ? "text-emerald-400" : "text-emerald-800"}`}>
                <ShieldCheck size={13} className={isDark ? "text-emerald-400" : "text-emerald-700"} />
                <span>Encrypted locally in browser session</span>
              </div>
              <button
                onClick={handleSaveEntry}
                disabled={!journalNote.trim()}
                className={`text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 ${
                  isDark
                    ? "bg-emerald-600 hover:bg-emerald-500 disabled:bg-white/5 disabled:text-neutral-600"
                    : "bg-black hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400"
                }`}
              >
                <Plus size={14} />
                <span>Save Entry</span>
              </button>
            </div>
            {showSavedMsg && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-xs font-bold flex items-center gap-1 ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>
                <Check size={14} />
                <span>Mood & Note Saved Successfully!</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Weekly Mood Heatmap */}
        <div className={`backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-xl border transition-all duration-700 ${
          isDark ? "bg-white/[0.04] border-white/[0.08]" : "bg-white/80 border-black/5"
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={18} className={isDark ? "text-emerald-400" : "text-teal-700"} />
              <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-black"}`}>Weekly Mood Overview</h3>
            </div>
            <span className="text-xs text-neutral-400 font-serif">Past 7 Days</span>
          </div>

          <div className="grid grid-cols-7 gap-3 text-center">
            {weekDays.map((w, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className={`w-full h-24 rounded-2xl relative overflow-hidden flex items-end justify-center p-1 ${
                  isDark ? "bg-white/5" : "bg-neutral-100"
                }`}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(w.score / 5) * 100}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className={`w-full rounded-xl ${
                      isDark ? "bg-gradient-to-t from-emerald-600 to-teal-400" : "bg-gradient-to-t from-teal-700 to-emerald-400"
                    }`}
                  />
                </div>
                <span className={`text-xs font-bold ${isDark ? "text-white" : "text-black"}`}>{w.day}</span>
                <span className="text-[10px] text-neutral-400 font-medium">{w.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Journal Entries */}
        <div className={`backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-xl border transition-all duration-700 ${
          isDark ? "bg-white/[0.04] border-white/[0.08]" : "bg-white/80 border-black/5"
        }`}>
          <h3 className={`text-base font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>Recent Reflection Entries</h3>
          <div className="space-y-3">
            {savedNotes.map((entry) => (
              <div key={entry.id} className={`p-4 rounded-2xl border flex flex-col gap-1 text-left transition-all duration-700 ${
                isDark ? "bg-white/[0.02] border-white/10" : "bg-neutral-50/80 border-black/5"
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? "text-emerald-400" : "text-teal-800"}`}>{entry.mood}</span>
                  <span className="text-[10px] text-neutral-400">{entry.date}</span>
                </div>
                <p className={`text-xs font-serif leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>{entry.note}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
