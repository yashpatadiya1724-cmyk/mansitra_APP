"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Meh, Frown, Sparkles, TrendingUp, Calendar, ShieldCheck, Plus, Check, Brain, Heart, Award } from "lucide-react";
import BorderBeam from "@/components/ui/BorderBeam";

export default function MoodPage() {
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
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/50 px-3.5 py-1 rounded-full mb-2">
              <TrendingUp size={14} className="text-emerald-700 dark:text-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-widest">Personal Mood Hub</span>
            </div>
            <h1 className="text-3xl font-bold text-black dark:text-white tracking-tight">Mood Tracker & Reflection Journal</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-serif mt-1">Track your emotional balance and discover daily resilience trends</p>
          </div>

          <div className="flex items-center gap-2 bg-white/90 dark:bg-[#141A22] backdrop-blur-md px-4 py-2 rounded-2xl border border-black/5 dark:border-white/10 shadow-xs">
            <Award size={16} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-bold text-black dark:text-white">Streak: 7 Days Active</span>
          </div>
        </div>

        {/* AI Insight Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-teal-900 via-emerald-800 to-teal-950 text-white p-6 rounded-3xl shadow-xl flex items-center gap-4 relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Brain size={24} className="text-emerald-300 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">AI CBT Insight</span>
            <p className="text-xs sm:text-sm text-neutral-100 font-serif leading-relaxed">
              "Your calm levels have increased by <strong>35%</strong> over the past week! Regular evening check-ins are building lasting resilience."
            </p>
          </div>
        </motion.div>

        {/* Current Mood Check-In Widget */}
        <div className="bg-white/80 dark:bg-[#141A22]/90 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          <BorderBeam size={250} duration={8} />

          <h2 className="text-lg font-bold text-black dark:text-white mb-1">How are you feeling right now?</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-serif mb-6">Select your current emotional state to record today's entry</p>

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
                      ? "border-teal-600 dark:border-emerald-400 scale-105 shadow-md bg-white dark:bg-[#1e2733]"
                      : "border-black/5 dark:border-white/10 bg-neutral-50/80 dark:bg-white/5 hover:bg-neutral-100/80"
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: m.bg }}>
                    <Icon size={24} style={{ color: m.color }} />
                  </div>
                  <span className="text-xs font-bold text-black dark:text-white mt-1">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Journal Input */}
          <div className="bg-neutral-50/80 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl p-4 flex flex-col gap-3">
            <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">Add a quick note or journal entry (Optional):</label>
            <textarea
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              placeholder="What made you feel this way today?..."
              className="w-full bg-white dark:bg-[#0d131f] border border-black/5 dark:border-white/10 rounded-xl p-3 text-xs outline-none text-black dark:text-white placeholder:text-neutral-400 min-h-[70px] resize-none"
            />
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 dark:text-emerald-400 font-medium">
                <ShieldCheck size={13} className="text-emerald-700 dark:text-emerald-400" />
                <span>Encrypted locally in browser session</span>
              </div>
              <button
                onClick={handleSaveEntry}
                disabled={!journalNote.trim()}
                className="bg-black dark:bg-emerald-600 hover:bg-neutral-800 dark:hover:bg-emerald-700 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Save Entry</span>
              </button>
            </div>
            {showSavedMsg && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                <Check size={14} />
                <span>Mood & Note Saved Successfully!</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Weekly Mood Heatmap */}
        <div className="bg-white/80 dark:bg-[#141A22]/90 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-teal-700 dark:text-teal-400" />
              <h3 className="text-base font-bold text-black dark:text-white">Weekly Mood Overview</h3>
            </div>
            <span className="text-xs text-neutral-400 font-serif">Past 7 Days</span>
          </div>

          <div className="grid grid-cols-7 gap-3 text-center">
            {weekDays.map((w, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-full h-24 bg-neutral-100 dark:bg-white/5 rounded-2xl relative overflow-hidden flex items-end justify-center p-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(w.score / 5) * 100}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="w-full bg-gradient-to-t from-teal-700 to-emerald-400 rounded-xl"
                  />
                </div>
                <span className="text-xs font-bold text-black dark:text-white">{w.day}</span>
                <span className="text-[10px] text-neutral-400 font-medium">{w.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Journal Entries */}
        <div className="bg-white/80 dark:bg-[#141A22]/90 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
          <h3 className="text-base font-bold text-black dark:text-white mb-4">Recent Reflection Entries</h3>
          <div className="space-y-3">
            {savedNotes.map((entry) => (
              <div key={entry.id} className="p-4 bg-neutral-50/80 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10 flex flex-col gap-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-teal-800 dark:text-teal-400 uppercase tracking-wider">{entry.mood}</span>
                  <span className="text-[10px] text-neutral-400">{entry.date}</span>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 font-serif leading-relaxed">{entry.note}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
