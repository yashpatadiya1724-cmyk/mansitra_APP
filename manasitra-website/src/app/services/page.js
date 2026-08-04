"use client";

import Navbar from "@/shared/components/navbar";
import MultiLayerBackground from "@/components/landing/MultiLayerBackground";
import { useEmotionTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { Lock, Globe, Gamepad2, Volume2, ShieldCheck, Sparkles, Brain, Coins } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import BorderBeam from "@/components/ui/BorderBeam";

import InteractiveChatDemo from "@/components/landing/InteractiveChatDemo";
import MoodTrackerPreview from "@/components/landing/MoodTrackerPreview";
import MiniGamesPreview from "@/components/landing/MiniGamesPreview";
import InteractiveJourney from "@/components/landing/InteractiveJourney";
import HopeGarden from "@/components/landing/HopeGarden";
import LanguageSpheres from "@/components/landing/LanguageSpheres";
import VoiceCompanionVisualizer from "@/components/landing/VoiceCompanionVisualizer";
import PrivacyFlowAnimation from "@/components/landing/PrivacyFlowAnimation";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } }
};

export default function ServicesPage() {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

  return (
    <main className={`min-h-screen relative font-sans transition-colors duration-700 ${
      isDark ? "text-neutral-200 bg-[#0d131f]" : "text-neutral-800 bg-[#faf9f8]"
    }`}>
      <MultiLayerBackground />
      <Navbar />
      
      <section className="relative pt-40 pb-24 px-6 max-w-5xl mx-auto z-10 min-h-screen">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.h1 variants={fadeInUp} className={`text-4xl md:text-6xl font-medium mb-8 transition-colors duration-700 ${
            isDark ? "text-white" : "text-black"
          }`}>
            Features & Tools
          </motion.h1>
          <motion.p variants={fadeInUp} className={`text-xl font-serif max-w-2xl mx-auto transition-colors duration-700 ${
            isDark ? "text-neutral-300" : "text-neutral-600"
          }`}>
            Discover the tools we built to help you navigate stress, anxiety, and daily challenges.
          </motion.p>
        </motion.div>

        {/* Feature Cards Grid (Copied from Home Page) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[
            { icon: Lock, title: "Absolute Privacy", desc: "Minimal email login is used only for active user counting. No personal data, chat history, or journals are collected or stored." },
            { icon: Globe, title: "10+ Indian Languages", desc: "Chat naturally in regional languages like Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, and more." },
            { icon: Gamepad2, title: "Calming Tools", desc: "Engage with an interactive breathing bubble, grounding guide, focus puzzles, and mood canvas to relieve anxiety instantly." },
            { icon: Volume2, title: "Voice Companion", desc: "Speak and listen with hands-free voice companion mode, allowing a more natural comforting dialogue." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <GlassCard className="h-full p-8 group relative overflow-hidden">
                {isDark && <BorderBeam duration={8 + i * 2} colorFrom="#10b981" colorTo="#6366f1" />}
                {!isDark && <BorderBeam duration={8 + i * 2} />}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 ${
                  isDark
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    : "bg-teal-50 text-teal-700"
                }`}>
                  <feature.icon size={22} />
                </div>
                <h3 className={`text-base font-semibold mb-3 transition-colors duration-700 ${
                  isDark ? "text-white group-hover:text-emerald-300" : "text-black"
                }`}>{feature.title}</h3>
                <p className={`leading-relaxed text-sm transition-colors duration-700 ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                }`}>{feature.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Interactive Features Sections */}
        <div className="space-y-24">
          <div>
            <h2 className={`text-3xl font-medium mb-12 text-center transition-colors duration-700 ${isDark ? 'text-white' : 'text-black'}`}>Anonymous AI Companion</h2>
            <InteractiveChatDemo />
          </div>

          <div>
            <h2 className={`text-3xl font-medium mb-12 text-center transition-colors duration-700 ${isDark ? 'text-white' : 'text-black'}`}>Emotional Wellness</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <MoodTrackerPreview />
              <MiniGamesPreview />
            </div>
          </div>

          <div>
            <h2 className={`text-3xl font-medium mb-12 text-center transition-colors duration-700 ${isDark ? 'text-white' : 'text-black'}`}>Your Healing Journey</h2>
            <InteractiveJourney />
          </div>

          <div>
            <h2 className={`text-3xl font-medium mb-12 text-center transition-colors duration-700 ${isDark ? 'text-white' : 'text-black'}`}>The Hope Garden</h2>
            <HopeGarden />
          </div>

          <div>
            <h2 className={`text-3xl font-medium mb-12 text-center transition-colors duration-700 ${isDark ? 'text-white' : 'text-black'}`}>Multilingual Support</h2>
            <LanguageSpheres />
          </div>

          <div>
            <h2 className={`text-3xl font-medium mb-12 text-center transition-colors duration-700 ${isDark ? 'text-white' : 'text-black'}`}>Hands-free Voice</h2>
            <VoiceCompanionVisualizer />
          </div>

          <div>
            <h2 className={`text-3xl font-medium mb-12 text-center transition-colors duration-700 ${isDark ? 'text-white' : 'text-black'}`}>Privacy & Security</h2>
            <PrivacyFlowAnimation />
          </div>
        </div>

      </section>
    </main>
  );
}
