"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Download, 
  Shield, 
  Gamepad2, 
  Lock, 
  Globe, 
  Volume2, 
  Sparkles, 
  Film,
  Brain,
  Coins,
  Building2,
  Languages,
  UserCheck,
  Smartphone,
  BarChart3,
  AlertCircle,
  ShieldCheck
} from "lucide-react";

import Navbar from "@/shared/components/navbar";
import PageLoadSequence from "../components/animations/PageLoadSequence";
import MultiLayerBackground from "../components/landing/MultiLayerBackground";
import EmotionAura from "../components/animations/EmotionAura";
import MemoryStream from "../components/landing/MemoryStream";
import Hero3D from "../components/landing/Hero3D";
import HeroSpotlight from "../components/landing/HeroSpotlight";
import MagneticButton from "../components/ui/MagneticButton";
import GlassCard from "../components/ui/GlassCard";
import PhoneMockup from "../components/landing/PhoneMockup";
import SplitText from "../components/ui/SplitText";
import ShinyText from "../components/ui/ShinyText";
import BorderBeam from "../components/ui/BorderBeam";
import TracingBeam from "../components/ui/TracingBeam";
import InteractiveChatDemo from "../components/landing/InteractiveChatDemo";
import HeartbeatWave from "../components/landing/HeartbeatWave";
import PrivacyFlowAnimation from "../components/landing/PrivacyFlowAnimation";
import LanguageSpheres from "../components/landing/LanguageSpheres";
import VoiceCompanionVisualizer from "../components/landing/VoiceCompanionVisualizer";
import HopeGarden from "../components/landing/HopeGarden";
import MoodTrackerPreview from "../components/landing/MoodTrackerPreview";
import MiniGamesPreview from "../components/landing/MiniGamesPreview";
import InteractiveJourney from "../components/landing/InteractiveJourney";
import { useEmotionTheme } from "@/context/ThemeContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Icons
const GithubIcon = ({ size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);
const LinkedinIcon = ({ size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const InstagramIcon = ({ size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

  const [showSplash, setShowSplash] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSplash]);

  useEffect(() => {
    if (showSplash || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".wave-path", {
        x: -100,
        duration: 3,
        repeat: -1,
        ease: "linear",
      });

      const stats = document.querySelectorAll(".stat-number");
      stats.forEach((stat) => {
        ScrollTrigger.create({
          trigger: stat,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(stat, { innerHTML: 0, filter: "blur(10px)" }, { 
              innerHTML: stat.dataset.val, 
              filter: "blur(0px)",
              duration: 2, 
              ease: "power3.out",
              snap: { innerHTML: 1 } 
            });
          },
          once: true
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [showSplash]);

  const { scrollYProgress } = useScroll();
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <EmotionAura>
      <div ref={containerRef} className={`min-h-screen font-sans relative transition-colors duration-700 ${
        isDark ? "text-neutral-200 selection:bg-emerald-900 selection:text-emerald-100" : "text-[#333333] selection:bg-teal-100 selection:text-teal-900"
      }`}>
        
        {showSplash && <PageLoadSequence onFinish={() => setShowSplash(false)} />}
        
        {/* Top Scroll Progress Bar */}
        <motion.div 
          className={`fixed top-0 left-0 h-1 z-[9000] origin-left transition-all duration-700 ${
            isDark
              ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 shadow-[0_0_15px_#10b981]"
              : "bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-700 shadow-[0_0_10px_#5eead4]"
          }`}
          style={{ width: progressBarWidth }}
        />

        {/* Global Background & Memory Stream */}
        <MultiLayerBackground />
        <MemoryStream />
        
        <Navbar />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* HERO SECTION */}
        {/* Light: Morning sunlight, warm, hopeful */}
        {/* Dark: Black space, AI orb, neural network, mouse spotlight */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className={`relative pt-32 pb-24 min-h-[90vh] flex items-center justify-center overflow-hidden transition-all duration-700 ${
          isDark ? "border-b border-white/5" : "border-b border-black/5"
        }`}>
          <HeroSpotlight />
          <Hero3D />
          
          <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
            <motion.div 
              initial="hidden"
              animate={!showSplash ? "visible" : "hidden"}
              variants={staggerContainer}
              className="flex flex-col items-center gap-6"
            >
              {/* Privacy Badge — Light: white glass | Dark: dark glass + emerald glow */}
              <motion.div variants={fadeInUp} className={`inline-flex items-center gap-2 backdrop-blur-md px-4 py-1.5 rounded-full transition-all duration-700 ${
                isDark
                  ? "bg-white/[0.06] border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                  : "bg-white/70 border border-teal-200/50 shadow-[0_8px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(45,212,191,0.2)]"
              }`}>
                <Shield size={14} className={isDark ? "text-emerald-400" : "text-teal-700"} />
                <span className="text-[11px] font-semibold tracking-widest uppercase">
                  <ShinyText>100% Private & Anonymous</ShinyText>
                </span>
              </motion.div>
              
              {/* Heading — different text color per theme */}
              <h1 className={`text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-balance leading-[1.1] transition-colors duration-700 ${
                isDark ? "text-white" : "text-black"
              }`}>
                <SplitText text="Your Private AI Companion" className="justify-center" />
              </h1>
              
              <motion.p variants={fadeInUp} className={`text-lg leading-relaxed max-w-lg mx-auto font-serif transition-colors duration-700 ${
                isDark ? "text-neutral-400" : "text-neutral-600"
              }`}>
                Mansitra is a judgment-free space designed to help you navigate life's challenges. Track your mood, express your feelings, and play calming mini-games.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-6 items-center justify-center">
                <MagneticButton href="/chat" variant="dark">
                  Try Web App
                </MagneticButton>
                <MagneticButton href="/mansitra.apk" download variant="teal">
                  <Download size={16} /> Android (.APK)
                </MagneticButton>
                <MagneticButton href="/mansitra.ipa" download variant="light">
                  <Download size={16} /> iOS (.IPA)
                </MagneticButton>
              </motion.div>
              
              <motion.p variants={fadeInUp} className={`text-xs font-medium mt-4 tracking-wide uppercase transition-colors duration-700 ${
                isDark ? "text-neutral-600" : "text-neutral-400"
              }`}>
                Supports Android 8.0+ and iOS 15.0+ • Completely Free
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Wave Divider */}
        <div className={`w-full h-12 overflow-hidden backdrop-blur-sm relative z-10 transition-all duration-700 ${
          isDark ? "bg-white/[0.02] border-b border-white/5" : "bg-white/50 border-b border-black/5"
        }`}>
          <svg viewBox="0 0 1000 50" className="absolute w-[200%] h-full opacity-30">
            <path className="wave-path" d="M0,25 Q125,50 250,25 T500,25 T750,25 T1000,25" fill="none" stroke={isDark ? "url(#wave-gradient-dark)" : "url(#wave-gradient)"} strokeWidth="2" />
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0f766e" />
                <stop offset="50%" stopColor="#5eead4" />
                <stop offset="100%" stopColor="#0f766e" />
              </linearGradient>
              <linearGradient id="wave-gradient-dark" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* STATS BAR */}
        {/* Light: White glass, teal text */}
        {/* Dark: Dark glass, emerald glow numbers */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className={`backdrop-blur-xl py-16 relative z-10 transition-all duration-700 ${
          isDark
            ? "bg-white/[0.03] border-b border-white/5"
            : "bg-white/80 border-b border-black/5"
        }`}>
          <div className={`max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center ${
            isDark ? "divide-x divide-white/5" : "divide-x divide-black/5"
          }`}>
            {[
              { num: "300", suffix: "M+", label: "Students in India" },
              { num: "1", suffix: " in 5", label: "Face Mental Health Issues" },
              { num: "10", suffix: "%", prefix: "<", label: "Seek Professional Help" },
              { num: "24", suffix: "/7", label: "AI Companion Access" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <p className={`font-serif text-4xl font-medium mb-2 transition-colors duration-700 ${
                  isDark ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "text-teal-900"
                }`}>
                  {stat.prefix}<span className="stat-number" data-val={stat.num}>0</span>{stat.suffix}
                </p>
                <p className={`text-[10px] font-semibold uppercase tracking-widest transition-colors duration-700 ${
                  isDark ? "text-neutral-500" : "text-neutral-500"
                }`}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ABOUT MANSITRA */}
        {/* Light: Minimal, serif text, clean spacing, nature */}
        {/* Dark: Documentary, glow headings, deeper glass cards */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-32 relative z-10">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-2xl mb-20"
            >
              <motion.span variants={fadeInUp} className={`text-[10px] font-semibold uppercase tracking-widest block mb-6 transition-colors duration-700 ${
                isDark ? "text-emerald-400" : "text-teal-700"
              }`}>01 — Overview</motion.span>
              <motion.h2 variants={fadeInUp} className={`text-4xl font-medium tracking-tight mb-8 transition-colors duration-700 ${
                isDark ? "text-white" : "text-black"
              }`}>What is Mansitra?</motion.h2>
              <motion.p variants={fadeInUp} className={`text-xl leading-relaxed mb-6 font-serif transition-colors duration-700 ${
                isDark ? "text-neutral-300" : "text-neutral-600"
              }`}>
                Mansitra (मनसित्र) combines the Sanskrit words <strong>Mana</strong> (mind) and <strong>Mitra</strong> (friend). It is a trustworthy, non-judgmental friend for every student navigating the pressures of academic life in India.
              </motion.p>
              <motion.p variants={fadeInUp} className={`text-base leading-relaxed mb-12 transition-colors duration-700 ${
                isDark ? "text-neutral-500" : "text-neutral-500"
              }`}>
                Built at the intersection of AI engineering, psychology, and human-centered design, Mansitra is a secure, privacy-first emotional wellness platform that uses real-time AI conversation and culturally-aware support to help students manage stress and anxiety.
              </motion.p>
            </motion.div>

            {/* Interactive Chat Demo Component */}
            <div className="mb-20">
              <InteractiveChatDemo />
            </div>

            {/* Interactive Mood Tracker & Mini Games Previews */}
            <div className="grid md:grid-cols-2 gap-6 my-12">
              <MoodTrackerPreview />
              <MiniGamesPreview />
            </div>

            {/* Interactive Healing Pathway Journey */}
            <InteractiveJourney />

            {/* Signature Animation 4: Hope Garden */}
            <HopeGarden />

            {/* Interactive Language Spheres Component */}
            <LanguageSpheres />

            {/* Hands-Free Voice Visualizer Component */}
            <VoiceCompanionVisualizer />

            {/* Privacy Flow Animation */}
            <div className="my-16">
              <PrivacyFlowAnimation />
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* FEATURE CARDS */}
            {/* Light: White glass, soft shadow, outline icons, sage green */}
            {/* Dark: Glass morphism, BorderBeam, glow icons, emerald hover */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* CRISIS SECTION */}
        {/* Light: White cards, soft rose/amber, clean */}
        {/* Dark: Dark glass, dramatic glow borders, deep shadows */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className={`py-32 backdrop-blur-2xl relative z-10 transition-all duration-700 ${
          isDark
            ? "bg-white/[0.02] border-y border-white/5"
            : "bg-white/40 border-y border-black/5"
        }`}>
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-2xl mb-20"
            >
              <span className={`text-[10px] font-semibold uppercase tracking-widest block mb-6 ${
                isDark ? "text-rose-400" : "text-rose-600"
              }`}>02 — The Crisis</span>
              <h2 className={`text-4xl font-medium tracking-tight mb-8 transition-colors duration-700 ${
                isDark ? "text-white" : "text-black"
              }`}>A Crisis Hiding in Plain Sight</h2>
              <p className={`text-xl leading-relaxed font-serif transition-colors duration-700 ${
                isDark ? "text-neutral-300" : "text-neutral-600"
              }`}>
                India has one of the world's largest student populations — yet mental health support remains critically underdeveloped. Stigma, affordability, and privacy concerns create a barrier that prevents students from seeking help.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Brain, color: isDark ? "text-rose-400 bg-rose-500/10 border-rose-500/20" : "text-rose-600 bg-rose-50", title: "Stigma & Silence", desc: "Over 80% of students facing mental distress never speak about it due to fear of judgment from family, peers, and society." },
                { icon: Lock, color: isDark ? "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" : "text-indigo-600 bg-indigo-50", title: "Privacy Fears", desc: "Students distrust digital platforms with sensitive emotional data, fearing data tracking, logs, or social exposure." },
                { icon: Coins, color: isDark ? "text-amber-400 bg-amber-500/10 border-amber-500/20" : "text-amber-600 bg-amber-50", title: "Inaccessibility", desc: "Professional therapy is unaffordable or unavailable to the majority of Indian students, especially in Tier 2 and Tier 3 cities." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, rotateX: 20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.15 }}
                  className={`backdrop-blur-xl p-8 rounded-3xl hover:-translate-y-2 transition-all duration-500 ${
                    isDark
                      ? "bg-white/[0.04] border border-white/[0.08] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:border-white/15 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]"
                      : "bg-white/90 border border-black/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-6 shadow-sm ${isDark ? "border" : ""}`}>
                    <item.icon size={22} />
                  </div>
                  <h4 className={`text-base font-semibold mb-3 transition-colors duration-700 ${
                    isDark ? "text-white" : "text-black"
                  }`}>{item.title}</h4>
                  <p className={`text-sm leading-relaxed transition-colors duration-700 ${
                    isDark ? "text-neutral-400" : "text-neutral-500"
                  }`}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* DESIGN PROCESS */}
        {/* Light: Soft tracing beam, minimal step cards */}
        {/* Dark: Glowing timeline, neon step numbers, glass cards */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-32 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <span className={`text-[10px] font-semibold uppercase tracking-widest block mb-4 transition-colors duration-700 ${
                isDark ? "text-emerald-400" : "text-teal-700"
              }`}>03 — Designed with Empathy</span>
              <h2 className={`text-4xl font-medium tracking-tight mb-6 transition-colors duration-700 ${
                isDark ? "text-white" : "text-black"
              }`}>How Mansitra Was Built</h2>
              <p className={`text-lg font-serif transition-colors duration-700 ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}>
                We mapped user personas, simplified the visual load, and created safe AI prompts to build a product designed explicitly around student stress.
              </p>
            </div>

            <TracingBeam>
              <div className="space-y-16 pl-6 md:pl-10">
                {[
                  { num: "01", title: "User Research & Personas", desc: "Studied the emotional journeys of Indian students — IIT/NIT aspirants, college-goers, and placement-year stress. Identified trust barriers and privacy expectations." },
                  { num: "02", title: "Tone & Visual Palette", desc: "Selected calm sage greens, soft warm gradients, and clean typography. The interface minimizes cognitive load for emotionally exhausted users." },
                  { num: "03", title: "Core AI Conversation", desc: "Engineered strict system prompts incorporating Cognitive Behavioral Therapy (CBT) principles, active listening, and deep sensitivity to Indian academic pressures." },
                  { num: "04", title: "Privacy Architecture", desc: "Implemented zero-knowledge encrypted database triggers, session-only volatile memory, and a layout that allows completely anonymous, login-free usage." }
                ].map((step, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    <GlassCard className="p-8 group hover:scale-[1.02] transition-transform">
                      <span className={`font-serif text-4xl italic block mb-4 transition-colors duration-700 ${
                        isDark
                          ? "text-emerald-500/40 group-hover:text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                          : "text-teal-200 group-hover:text-teal-400"
                      }`}>{step.num}</span>
                      <h4 className={`text-lg font-semibold mb-3 transition-colors duration-700 ${
                        isDark ? "text-white" : "text-black"
                      }`}>{step.title}</h4>
                      <p className={`text-sm leading-relaxed transition-colors duration-700 ${
                        isDark ? "text-neutral-400" : "text-neutral-500"
                      }`}>{step.desc}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </TracingBeam>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* FUTURE VISION */}
        {/* Light: Clean white cards, teal accents, minimal */}
        {/* Dark: Deep space, stars, glass cards, emerald glow */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className={`py-32 relative overflow-hidden z-10 rounded-[40px] mx-4 md:mx-10 my-10 shadow-2xl transition-all duration-700 ${
          isDark ? "bg-[#0B0F19] text-white" : "bg-gradient-to-b from-teal-50 to-white text-black border border-black/5"
        }`}>
          {/* Stars — only in dark mode */}
          {isDark && (
            <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(circle at center, #1e293b 0%, #0B0F19 70%)" }}>
              {[...Array(50)].map((_, i) => {
                const r1 = Math.sin((i + 1) * 12.9898) * 43758.5453;
                const r2 = Math.sin((i + 50) * 78.233) * 43758.5453;
                const r3 = Math.sin((i + 100) * 45.164) * 43758.5453;
                const left = ((r1 - Math.floor(r1)) * 100).toFixed(2);
                const top = ((r2 - Math.floor(r2)) * 100).toFixed(2);
                const opacity = Number((0.2 + (r3 - Math.floor(r3)) * 0.8).toFixed(2));

                return (
                  <motion.div 
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ left: `${left}%`, top: `${top}%`, opacity }}
                    animate={{ opacity: [opacity, 1, opacity] }}
                    transition={{ duration: 2 + (i % 3), repeat: Infinity }}
                  />
                );
              })}
            </div>
          )}

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-20 text-center mx-auto"
            >
              <span className={`text-[10px] font-semibold uppercase tracking-widest block mb-4 ${
                isDark ? "text-teal-400" : "text-teal-700"
              }`}>04 — Future Vision</span>
              <h2 className={`text-4xl font-medium tracking-tight mb-6 ${
                isDark ? "text-white" : "text-black"
              }`}>The Road Ahead</h2>
              <p className={`text-xl font-serif ${
                isDark ? "text-neutral-400" : "text-neutral-600"
              }`}>
                We plan to expand our features to reach students across campuses and cities in India.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Building2, title: "Campus Pilot Program", desc: "Partner with 5–10 colleges for a structured pilot, gathering feedback and refining the AI model on genuine student use cases." },
                { icon: Languages, title: "Multilingual Support", desc: "Scale local voice engines in Hindi, Tamil, Telugu, and other regional languages to speak in students' comforting native tongues." },
                { icon: UserCheck, title: "Therapist Handoff", desc: "Build a secure bridge between the AI companion and college counseling departments for seamless clinical escalation." },
                { icon: Smartphone, title: "Native Mobile App", desc: "Deliver a full-featured iOS and Android application with offline journaling and push-based daily resilience streaks." },
                { icon: BarChart3, title: "Institutional Dashboard", desc: "Anonymized aggregate insights for college counseling units to identify campus-wide stress trends without compromising student privacy." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  className={`backdrop-blur-xl p-8 rounded-3xl transition-all duration-300 group ${
                    isDark
                      ? "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                      : "bg-white/80 border border-black/5 shadow-sm hover:shadow-md hover:bg-white"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all ${
                    isDark
                      ? "bg-teal-500/10 border border-teal-500/20 text-teal-300 group-hover:bg-teal-500/20"
                      : "bg-teal-50 text-teal-700 group-hover:bg-teal-100"
                  }`}>
                    <item.icon size={20} />
                  </div>
                  <h4 className={`text-base font-semibold mb-3 transition-colors ${
                    isDark ? "text-white group-hover:text-teal-300" : "text-black"
                  }`}>{item.title}</h4>
                  <p className={`text-sm leading-relaxed ${
                    isDark ? "text-neutral-400" : "text-neutral-500"
                  }`}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* HACKATHON DOCUMENTARY */}
        {/* Light: Clean white, amber accents, minimal quote */}
        {/* Dark: Film grain, deep navy, spotlight, dramatic quote */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className={`py-32 relative z-10 overflow-hidden transition-all duration-700 ${
          isDark
            ? "bg-[#0d131f] text-white border-b border-white/10"
            : "bg-white text-black border-b border-black/5"
        }`}>
          {/* Film Grain — only dark mode */}
          {isDark && (
            <div 
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }}
            />
          )}

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 ${
                isDark
                  ? "bg-amber-500/10 border border-amber-500/30"
                  : "bg-amber-50 border border-amber-200/50"
              }`}>
                <Film size={14} className={isDark ? "text-amber-400" : "text-amber-600"} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  isDark ? "text-amber-400" : "text-amber-700"
                }`}>06 — Hackathon Experience</span>
              </div>

              <h2 className={`text-4xl md:text-5xl font-medium tracking-tight mb-8 ${
                isDark ? "text-white" : "text-black"
              }`}>Built Under Pressure</h2>
              <p className={`text-xl leading-relaxed mb-16 font-serif max-w-2xl mx-auto ${
                isDark ? "text-neutral-300" : "text-neutral-600"
              }`}>
                Developed during the <strong>Ideathon Viksit Bharat 2047</strong> at Silver Oak University. Designing stress-management tech under a high-pressure timeline gave us deep empathy for the students we seek to help.
              </p>

              <div className={`relative p-12 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden ${
                isDark
                  ? "bg-white/5 border border-white/10"
                  : "bg-amber-50/50 border border-amber-200/30"
              }`}>
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
                  className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                  style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)" }}
                />

                <span className={`absolute -top-6 -left-2 text-8xl font-serif leading-none ${
                  isDark ? "text-teal-400/20" : "text-amber-300/40"
                }`}>"</span>
                <p className={`text-2xl italic font-serif leading-relaxed relative z-10 ${
                  isDark ? "text-neutral-200" : "text-neutral-700"
                }`}>
                  The hardest part wasn't the code — it was deciding what the AI should say when a student tells it they can't take the pressure anymore. That question, and the weight behind it, shaped every design decision we made.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* CTA + PHONE MOCKUP */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* CTA + PHONE MOCKUP */}
        {/* Light: Soft warm cream, sage green badges, white phone */}
        {/* Dark: Aurora dark bg, emerald glow CTA, black phone */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className={`py-32 relative z-10 overflow-hidden transition-all duration-700 ${
          isDark ? "bg-[#0a0f1a]" : "bg-gradient-to-b from-[#faf9f8] to-white"
        }`}>
          {/* Aurora background — dark mode only */}
          {isDark && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 opacity-30"
                style={{
                  background: "radial-gradient(ellipse at top, #0f766e 0%, transparent 50%), radial-gradient(ellipse at bottom right, #4f46e5 0%, transparent 50%)",
                  backgroundSize: "200% 200%",
                }}
              />
            </div>
          )}

          <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-6 border transition-all duration-700 ${
                  isDark ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-teal-50 border-teal-200/60 text-teal-800"
                }`}
              >
                <Sparkles size={13} className={`animate-spin ${isDark ? "text-emerald-400" : "text-teal-700"}`} style={{ animationDuration: "8s" }} />
                <span className="text-[10px] font-bold uppercase tracking-widest">05 — Take Mansitra Anywhere</span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`text-5xl md:text-6xl font-medium tracking-tight mb-6 transition-colors duration-700 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Ready to find your peace?
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0 font-serif leading-relaxed transition-colors duration-700 ${
                  isDark ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                Download the app today. Minimal login is used purely for active user counting. Just you and your private, judgment-free space.
              </motion.p>

              {/* Feature Micro-Grid */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="grid grid-cols-2 gap-3 mb-10 max-w-md mx-auto lg:mx-0 text-left"
              >
                {[
                  { title: "Zero Data Logging", desc: "Encrypted ephemeral memory" },
                  { title: "Voice Companion", desc: "Hands-free regional voice" },
                  { title: "10+ Languages", desc: "Hindi, Guj, Mar, Eng & more" },
                  { title: "CBT Calming Suite", desc: "4-4-4 breathing & grounding" },
                ].map((feat, idx) => (
                  <div key={idx} className={`p-3 rounded-2xl border transition-colors duration-700 ${
                    isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-black/5 shadow-xs"
                  }`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <ShieldCheck size={13} className={isDark ? "text-emerald-400" : "text-teal-700"} />
                      <span className={`text-xs font-bold ${isDark ? "text-white" : "text-black"}`}>{feat.title}</span>
                    </div>
                    <p className={`text-[10px] font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>{feat.desc}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              >
                <MagneticButton href="/mansitra.apk" download variant="teal">
                  <Download size={18} /> Download for Android
                </MagneticButton>
                <MagneticButton href="/chat" variant="dark">
                  <Sparkles size={18} /> Open Web App Instantly
                </MagneticButton>
              </motion.div>
            </div>
            <div className="flex-1 w-full lg:w-auto">
              <PhoneMockup />
            </div>
          </div>
        </section>

        {/* ECG AI Heartbeat Wave */}
        <HeartbeatWave />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* FOOTER */}
        {/* Light: White, minimal, soft borders */}
        {/* Dark: Black glass, constellation stars, emerald links */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <footer className={`pt-24 pb-8 text-sm relative z-10 transition-all duration-700 ${
          isDark
            ? "bg-[#080c14] text-neutral-400 border-t border-white/5"
            : "bg-white text-neutral-500 border-t border-black/5"
        }`}>
          {/* Constellation stars — dark mode only */}
          {isDark && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => {
                const r1 = Math.sin((i + 1) * 12.9898) * 43758.5453;
                const r2 = Math.sin((i + 30) * 78.233) * 43758.5453;
                const left = ((r1 - Math.floor(r1)) * 100).toFixed(2);
                const top = ((r2 - Math.floor(r2)) * 100).toFixed(2);
                return (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 h-0.5 bg-white/40 rounded-full"
                    style={{ left: `${left}%`, top: `${top}%` }}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.1 }}
                  />
                );
              })}
            </div>
          )}

          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
            <div className="flex flex-col gap-6 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-transparent group">
                  <img src="/logo.svg" alt="Mansitra Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <span className={`font-semibold text-lg transition-colors duration-700 ${
                  isDark ? "text-white" : "text-black"
                }`}>Mansitra</span>
              </div>
              <p className="leading-relaxed font-serif text-base">
                Your anonymous, judgment-free AI companion. Designed to support emotional resilience and student well-being.
              </p>
            </div>

            <div>
              <h4 className={`font-semibold mb-6 text-base tracking-wide uppercase transition-colors duration-700 ${
                isDark ? "text-white" : "text-black"
              }`}>Features</h4>
              <ul className="flex flex-col gap-3">
                {["Anonymous AI Chat", "10+ Regional Languages", "Calming Mini-Games", "Self-Reflection Tools"].map((link) => (
                  <li key={link}><a href="#" className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:transition-all ${
                    isDark
                      ? "hover:text-emerald-400 after:bg-emerald-400 hover:after:w-full"
                      : "hover:text-teal-700 after:bg-teal-700 hover:after:w-full"
                  }`}>{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold mb-6 text-base tracking-wide uppercase transition-colors duration-700 ${
                isDark ? "text-white" : "text-black"
              }`}>Helplines</h4>
              <ul className="flex flex-col gap-4">
                <li className="flex flex-col">
                  <span className={`text-xs mb-1 ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>iCall (TISS)</span>
                  <a href="tel:9152987821" className={`font-medium transition-colors ${
                    isDark ? "text-white hover:text-emerald-400" : "text-black hover:text-teal-700"
                  }`}>9152987821</a>
                </li>
                <li className="flex flex-col">
                  <span className={`text-xs mb-1 ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>Vandrevala</span>
                  <a href="tel:18602662345" className={`font-medium transition-colors ${
                    isDark ? "text-white hover:text-emerald-400" : "text-black hover:text-teal-700"
                  }`}>1860-2662-345</a>
                </li>
                <li className="flex flex-col">
                  <span className={`text-xs mb-1 ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>AASRA</span>
                  <a href="tel:9820466627" className={`font-medium transition-colors ${
                    isDark ? "text-white hover:text-emerald-400" : "text-black hover:text-teal-700"
                  }`}>9820466627</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold mb-6 text-base tracking-wide uppercase transition-colors duration-700 ${
                isDark ? "text-white" : "text-black"
              }`}>Connect</h4>
              <div className="flex gap-4 mb-6">
                <a href="https://www.linkedin.com/in/yash-patadiya-973161272/" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isDark
                    ? "bg-white/5 text-white hover:bg-emerald-500/20 hover:text-emerald-400"
                    : "bg-neutral-100 text-black hover:bg-teal-100 hover:text-teal-700"
                }`}>
                  <LinkedinIcon size={18} />
                </a>
                <a href="https://github.com/yashpatadiya1724-cmyk" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isDark
                    ? "bg-white/5 text-white hover:bg-emerald-500/20 hover:text-emerald-400"
                    : "bg-neutral-100 text-black hover:bg-teal-100 hover:text-teal-700"
                }`}>
                  <GithubIcon size={18} />
                </a>
                <a href="https://www.instagram.com/yash_patadiya_1724?igsh=bjJzZTVrZzBxcTh5" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isDark
                    ? "bg-white/5 text-white hover:bg-emerald-500/20 hover:text-emerald-400"
                    : "bg-neutral-100 text-black hover:bg-teal-100 hover:text-teal-700"
                }`}>
                  <InstagramIcon size={18} />
                </a>
              </div>
              <p className="leading-relaxed text-xs">
                Developed for <strong className={isDark ? "text-white" : "text-black"}>Ideathon Viksit Bharat 2047</strong>
              </p>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="max-w-6xl mx-auto px-6 mb-12 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className={`backdrop-blur-md p-6 rounded-2xl text-xs leading-relaxed text-center shadow-sm flex items-center justify-center gap-3 transition-all duration-700 ${
                isDark
                  ? "bg-amber-500/5 border border-amber-500/20 text-amber-200"
                  : "bg-amber-50/50 border border-amber-200/50 text-amber-900"
              }`}
            >
              <AlertCircle size={16} className={`shrink-0 ${isDark ? "text-amber-400" : "text-amber-700"}`} />
              <div>
                <strong className="block mb-0.5 font-semibold text-sm">Medical Disclaimer</strong>
                Manasitra is a supportive AI companion, not a replacement for professional mental health services, therapy, or medical diagnosis. If you are experiencing a crisis, please reach out to one of the helplines listed above or seek professional help immediately.
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <div className={`max-w-6xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium relative z-10 ${
            isDark ? "border-t border-white/5" : "border-t border-black/5"
          }`}>
            <p>© {new Date().getFullYear()} Mansitra (Mann Ka Mitra). All rights reserved.</p>
            <p>
              Founded by <a href="https://github.com/yashpatadiya1724-cmyk" target="_blank" rel="noopener noreferrer" className={`relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:transition-all ${
                isDark ? "text-white hover:text-emerald-400 after:bg-emerald-400 hover:after:w-full" : "text-black hover:text-teal-700 after:bg-teal-700 hover:after:w-full"
              }`}>Yash Patadiya</a> · Advised by <a href="https://github.com/utkarshbhai007" target="_blank" rel="noopener noreferrer" className={`relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:transition-all ${
                isDark ? "text-white hover:text-emerald-400 after:bg-emerald-400 hover:after:w-full" : "text-black hover:text-teal-700 after:bg-teal-700 hover:after:w-full"
              }`}>Utkarsh Barad</a>
            </p>
          </div>
        </footer>
      </div>
    </EmotionAura>
  );
}
