"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Shield, Gamepad2, Lock, Globe, Volume2, Sparkles } from "lucide-react";

import Navbar from "@/shared/components/navbar";
import PageLoadSequence from "../components/animations/PageLoadSequence";
import MultiLayerBackground from "../components/landing/MultiLayerBackground";
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
      // Wave path animation
      gsap.to(".wave-path", {
        x: -100,
        duration: 3,
        repeat: -1,
        ease: "linear",
      });

      // Stats count up
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
    <div ref={containerRef} className="min-h-screen bg-[#faf9f8] text-[#333333] font-sans selection:bg-teal-100 selection:text-teal-900 relative">
      
      {showSplash && <PageLoadSequence onFinish={() => setShowSplash(false)} />}
      
      {/* Top Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-700 z-[9000] origin-left shadow-[0_0_10px_#5eead4]"
        style={{ width: progressBarWidth }}
      />

      {/* Global Background */}
      <MultiLayerBackground />
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 min-h-[90vh] flex items-center justify-center border-b border-black/5 overflow-hidden">
        <HeroSpotlight />
        <Hero3D />
        
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial="hidden"
            animate={!showSplash ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-teal-200/50 px-4 py-1.5 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(45,212,191,0.2)] transition-all">
              <Shield size={14} className="text-teal-700" />
              <span className="text-[11px] font-semibold tracking-widest uppercase">
                <ShinyText>100% Private & Anonymous</ShinyText>
              </span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-black text-balance leading-[1.1]">
              <SplitText text="Your Private AI Companion" className="justify-center" />
            </h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-neutral-600 leading-relaxed max-w-lg mx-auto font-serif">
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
            
            <motion.p variants={fadeInUp} className="text-xs text-neutral-400 font-medium mt-4 tracking-wide uppercase">
              Supports Android 8.0+ and iOS 15.0+ • Completely Free
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="w-full h-12 overflow-hidden bg-white/50 backdrop-blur-sm relative z-10 border-b border-black/5">
        <svg viewBox="0 0 1000 50" className="absolute w-[200%] h-full opacity-30">
          <path className="wave-path" d="M0,25 Q125,50 250,25 T500,25 T750,25 T1000,25" fill="none" stroke="url(#wave-gradient)" strokeWidth="2" />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="50%" stopColor="#5eead4" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Stats Bar */}
      <section className="bg-white/80 backdrop-blur-xl border-b border-black/5 py-16 relative z-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-black/5">
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
              <p className="font-serif text-4xl font-medium text-teal-900 mb-2">
                {stat.prefix}<span className="stat-number" data-val={stat.num}>0</span>{stat.suffix}
              </p>
              <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Mansitra Section */}
      <section className="py-32 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-2xl mb-20"
          >
            <motion.span variants={fadeInUp} className="text-[10px] font-semibold text-teal-700 uppercase tracking-widest block mb-6">01 — Overview</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl font-medium tracking-tight mb-8 text-black">What is Mansitra?</motion.h2>
            <motion.p variants={fadeInUp} className="text-neutral-600 text-xl leading-relaxed mb-6 font-serif">
              Mansitra (मनसित्र) combines the Sanskrit words <strong>Mana</strong> (mind) and <strong>Mitra</strong> (friend). It is a trustworthy, non-judgmental friend for every student navigating the pressures of academic life in India.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-neutral-500 text-base leading-relaxed mb-12">
              Built at the intersection of AI engineering, psychology, and human-centered design, Mansitra is a secure, privacy-first emotional wellness platform that uses real-time AI conversation and culturally-aware support to help students manage stress and anxiety.
            </motion.p>
          </motion.div>

          {/* Interactive Chat Demo Component */}
          <div className="mb-20">
            <InteractiveChatDemo />
          </div>

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
                  <BorderBeam duration={8 + i * 2} />
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-100 transition-all duration-300">
                    <feature.icon size={22} />
                  </div>
                  <h3 className="text-base font-semibold text-black mb-3">{feature.title}</h3>
                  <p className="text-neutral-500 leading-relaxed text-sm">{feature.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-32 bg-white/40 backdrop-blur-2xl relative border-y border-black/5 z-10">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl mb-20"
          >
            <span className="text-[10px] font-semibold text-rose-600 uppercase tracking-widest block mb-6">02 — The Crisis</span>
            <h2 className="text-4xl font-medium tracking-tight mb-8 text-black">A Crisis Hiding in Plain Sight</h2>
            <p className="text-neutral-600 text-xl leading-relaxed font-serif">
              India has one of the world's largest student populations — yet mental health support remains critically underdeveloped. Stigma, affordability, and privacy concerns create a barrier that prevents students from seeking help.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: "🧠", title: "Stigma & Silence", desc: "Over 80% of students facing mental distress never speak about it due to fear of judgment from family, peers, and society." },
              { emoji: "🔒", title: "Privacy Fears", desc: "Students distrust digital platforms with sensitive emotional data, fearing data tracking, logs, or social exposure." },
              { emoji: "💸", title: "Inaccessibility", desc: "Professional therapy is unaffordable or unavailable to the majority of Indian students, especially in Tier 2 and Tier 3 cities." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.15 }}
                className="bg-white/90 backdrop-blur-xl border border-black/5 p-8 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500"
              >
                <span className="text-3xl mb-6 block drop-shadow-md">{item.emoji}</span>
                <h4 className="text-base font-semibold text-black mb-3">{item.title}</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design and Development Process */}
      <section className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-semibold text-teal-700 uppercase tracking-widest block mb-4">03 — Designed with Empathy</span>
            <h2 className="text-4xl font-medium tracking-tight mb-6 text-black">How Mansitra Was Built</h2>
            <p className="text-neutral-500 text-lg font-serif">
              We mapped user personas, simplified the visual load, and created safe AI prompts to build a product designed explicitly around student stress.
            </p>
          </div>

          {/* Aceternity Tracing Beam Wrapper */}
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
                    <span className="font-serif text-4xl text-teal-200 group-hover:text-teal-400 transition-colors italic block mb-4">{step.num}</span>
                    <h4 className="text-lg font-semibold text-black mb-3">{step.title}</h4>
                    <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </TracingBeam>
        </div>
      </section>

      {/* Impact & Future Vision */}
      <section className="py-32 bg-[#0B0F19] text-white relative overflow-hidden z-10 rounded-[40px] mx-4 md:mx-10 my-10 shadow-2xl">
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

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-20 text-center mx-auto"
          >
            <span className="text-[10px] font-semibold text-teal-400 uppercase tracking-widest block mb-4">04 — Future Vision</span>
            <h2 className="text-4xl font-medium tracking-tight mb-6 text-white">The Road Ahead</h2>
            <p className="text-neutral-400 text-xl font-serif">
              We plan to expand our features to reach students across campuses and cities in India.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "🏫 Campus Pilot Program", desc: "Partner with 5–10 colleges for a structured pilot, gathering feedback and refining the AI model on genuine student use cases." },
              { title: "🗣️ Multilingual Support", desc: "Scale local voice engines in Hindi, Tamil, Telugu, and other regional languages to speak in students' comforting native tongues." },
              { title: "👨‍⚕️ Therapist Handoff", desc: "Build a secure bridge between the AI companion and college counseling departments for seamless clinical escalation." },
              { title: "📱 Native Mobile App", desc: "Deliver a full-featured iOS and Android application with offline journaling and push-based daily resilience streaks." },
              { title: "📈 Institutional Dashboard", desc: "Anonymized aggregate insights for college counseling units to identify campus-wide stress trends without compromising student privacy." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <h4 className="text-base font-semibold text-white mb-4 group-hover:text-teal-300 transition-colors">{item.title}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hackathon Quote / Experience Section */}
      <section className="py-32 relative z-10 border-b border-black/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-widest block mb-6">06 — Hackathon Experience</span>
            <h2 className="text-4xl font-medium tracking-tight mb-8 text-black">Built Under Pressure</h2>
            <p className="text-neutral-600 text-xl leading-relaxed mb-16 font-serif">
              Developed during the <strong>Ideathon Viksit Bharat 2047</strong> at Silver Oak University. Designing stress-management tech under a high-pressure timeline gave us deep empathy for the students we seek to help.
            </p>
            <div className="relative p-12 bg-white/50 backdrop-blur-2xl rounded-3xl border border-black/5 shadow-xl">
              <span className="absolute -top-6 -left-2 text-8xl text-teal-100 font-serif leading-none">"</span>
              <p className="text-2xl italic text-neutral-600 font-serif leading-relaxed relative z-10">
                The hardest part wasn't the code — it was deciding what the AI should say when a student tells it they can't take the pressure anymore. That question, and the weight behind it, shaped every design decision we made.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Phone Mockup */}
      <section className="py-32 bg-white relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-medium tracking-tight mb-6 text-black"
            >
              Ready to find your peace?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-neutral-500 text-xl mb-10 max-w-lg mx-auto lg:mx-0 font-serif"
            >
              Download the app today. Minimal login is used purely for active user counting. Just you and your private space.
            </motion.p>
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
              <MagneticButton href="/mansitra.ipa" download variant="dark">
                <Download size={18} /> Download for iOS
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

      {/* Footer */}
      <footer className="bg-white text-neutral-500 pt-24 pb-8 border-t border-black/5 text-sm relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-transparent group">
                <img src="/logo.svg" alt="Mansitra Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-semibold text-black text-lg">Mansitra</span>
            </div>
            <p className="leading-relaxed font-serif text-base">
              Your anonymous, judgment-free AI companion. Designed to support emotional resilience and student well-being.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-6 text-base tracking-wide uppercase">Features</h4>
            <ul className="flex flex-col gap-3">
              {["Anonymous AI Chat", "10+ Regional Languages", "Calming Mini-Games", "Self-Reflection Tools"].map((link) => (
                <li key={link}><a href="#" className="hover:text-teal-700 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-teal-700 hover:after:w-full after:transition-all">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-6 text-base tracking-wide uppercase">Helplines</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col">
                <span className="text-xs text-neutral-400 mb-1">iCall (TISS)</span>
                <a href="tel:9152987821" className="text-black font-medium hover:text-teal-700 transition-colors">9152987821</a>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-neutral-400 mb-1">Vandrevala</span>
                <a href="tel:18602662345" className="text-black font-medium hover:text-teal-700 transition-colors">1860-2662-345</a>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-neutral-400 mb-1">AASRA</span>
                <a href="tel:9820466627" className="text-black font-medium hover:text-teal-700 transition-colors">9820466627</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-6 text-base tracking-wide uppercase">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://www.linkedin.com/in/yash-patadiya-973161272/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black hover:bg-teal-100 hover:text-teal-700 transition-colors">
                <LinkedinIcon size={18} />
              </a>
              <a href="https://github.com/yashpatadiya1724-cmyk" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black hover:bg-teal-100 hover:text-teal-700 transition-colors">
                <GithubIcon size={18} />
              </a>
              <a href="https://www.instagram.com/yash_patadiya_1724?igsh=bjJzZTVrZzBxcTh5" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black hover:bg-teal-100 hover:text-teal-700 transition-colors">
                <InstagramIcon size={18} />
              </a>
            </div>
            <p className="leading-relaxed text-xs">
              Developed for <strong className="text-black">Ideathon Viksit Bharat 2047</strong>
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mb-12">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-amber-50/50 backdrop-blur-md border border-amber-200/50 p-6 rounded-2xl text-xs text-amber-900 leading-relaxed text-center shadow-sm"
          >
            <strong className="block mb-2 font-semibold text-sm">⚠️ Medical Disclaimer</strong>
            Manasitra is a supportive AI companion, not a replacement for professional mental health services, therapy, or medical diagnosis. If you are experiencing a crisis, please reach out to one of the helplines listed above or seek professional help immediately.
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-6 border-t border-black/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>© {new Date().getFullYear()} Mansitra (Mann Ka Mitra). All rights reserved.</p>
          <p>
            Founded by <a href="https://github.com/yashpatadiya1724-cmyk" target="_blank" rel="noopener noreferrer" className="text-black hover:text-teal-700 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-teal-700 hover:after:w-full after:transition-all">Yash Patadiya</a> · Advised by <a href="https://github.com/utkarshbhai007" target="_blank" rel="noopener noreferrer" className="text-black hover:text-teal-700 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-teal-700 hover:after:w-full after:transition-all">Utkarsh Barad</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
