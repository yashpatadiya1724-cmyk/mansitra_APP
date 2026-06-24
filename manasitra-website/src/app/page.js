"use client";

import { motion } from "framer-motion";
import { Download, Shield, Gamepad2, Heart, Lock, User, CheckCircle2, Globe, Volume2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[14px] bg-transparent flex items-center justify-center overflow-hidden">
              <img src="/icon-192.png" alt="Manasitra Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-none">Manasitra</h1>
              <p className="text-[10px] uppercase tracking-widest text-[var(--text-3)] font-bold mt-1">Mann Ka Mitra</p>
            </div>
          </div>
          <a href="/app-debug.apk" download className="hidden sm:flex items-center gap-2 bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors px-5 py-2.5 rounded-full text-sm font-bold text-[var(--foreground)] shadow-sm">
            <Download size={16} />
            Get the App
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)]/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 bg-[var(--primary-soft)] border border-[var(--primary)]/20 px-4 py-2 rounded-full w-max">
              <Shield size={14} className="text-[var(--primary)]" />
              <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wide">100% Private & Anonymous</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-balance">
              Your Private <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-blue-400">
                AI Companion
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-[var(--text-2)] leading-relaxed max-w-lg">
              Manasitra is a judgment-free space designed to help you navigate life's challenges. Track your mood, express your feelings, and play calming mini-games.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a href="/app-debug.apk" download className="inline-flex items-center justify-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary)]/90 transition-transform active:scale-95 px-8 py-4 rounded-full text-white font-bold shadow-lg shadow-[var(--primary)]/20">
                <Download size={20} />
                Download APK
              </a>
              <div className="inline-flex items-center justify-center gap-3 bg-[var(--surface)] border border-[var(--border)] px-8 py-4 rounded-full text-[var(--foreground)] font-bold shadow-sm">
                No Login Required
              </div>
            </div>
            <p className="text-sm text-[var(--text-3)] font-medium mt-2">
              For Android Devices • 100% Free
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto lg:ml-auto w-full max-w-[280px] sm:max-w-[320px] aspect-[1/2] bg-[var(--background)] border-[8px] border-[var(--surface-2)] rounded-[48px] shadow-2xl overflow-hidden"
          >
            {/* Mockup Screen content */}
            <div className="w-full h-full bg-[var(--surface-2)] p-4 flex flex-col">
              <div className="w-full flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--primary)]"></div>
                  <div className="w-3 h-3 rounded-full bg-[var(--border-2)]"></div>
                </div>
                <div className="w-1/3 h-5 bg-[var(--background)] rounded-full"></div>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                <div className="w-3/4 p-4 bg-[var(--primary)] text-white rounded-2xl rounded-tr-sm self-end shadow-sm">
                  <div className="w-full h-2 bg-white/30 rounded-full mb-2"></div>
                  <div className="w-2/3 h-2 bg-white/30 rounded-full"></div>
                </div>
                
                <div className="w-3/4 p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl rounded-tl-sm self-start shadow-sm">
                  <div className="w-full h-2 bg-[var(--text-3)] rounded-full mb-2"></div>
                  <div className="w-5/6 h-2 bg-[var(--text-3)] rounded-full mb-2"></div>
                  <div className="w-1/2 h-2 bg-[var(--text-3)] rounded-full"></div>
                </div>
              </div>

              <div className="w-full h-14 bg-[var(--background)] rounded-[24px] border border-[var(--border)] mt-4 p-2 flex gap-2">
                <div className="flex-1 h-full bg-[var(--surface-2)] rounded-[18px]"></div>
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] shrink-0"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-50 border-b border-slate-200 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-display text-4xl font-extrabold text-[var(--primary)] mb-1">300M+</p>
            <p className="text-xs text-[var(--text-3)] font-bold uppercase tracking-wider">Students in India</p>
          </div>
          <div>
            <p className="font-display text-4xl font-extrabold text-[var(--primary)] mb-1">1 in 5</p>
            <p className="text-xs text-[var(--text-3)] font-bold uppercase tracking-wider">Face Mental Health Issues</p>
          </div>
          <div>
            <p className="font-display text-4xl font-extrabold text-[var(--primary)] mb-1">&lt;10%</p>
            <p className="text-xs text-[var(--text-3)] font-bold uppercase tracking-wider">Seek Professional Help</p>
          </div>
          <div>
            <p className="font-display text-4xl font-extrabold text-[var(--primary)] mb-1">24/7</p>
            <p className="text-xs text-[var(--text-3)] font-bold uppercase tracking-wider">AI Companion Access</p>
          </div>
        </div>
      </section>

      {/* About Manasitra Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest block mb-3">01 — Overview</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What is Manasitra?</h2>
            <p className="text-[var(--text-2)] text-lg leading-relaxed mb-6">
              Manasitra (मनसित्र) combines the Sanskrit words <strong>Mana</strong> (mind) and <strong>Mitra</strong> (friend). It is a trustworthy, non-judgmental friend for every student navigating the pressures of academic life in India.
            </p>
            <p className="text-[var(--text-2)] text-base leading-relaxed">
              Built at the intersection of AI engineering, psychology, and human-centered design, Manasitra is a secure, privacy-first emotional wellness platform that uses real-time AI conversation and culturally-aware support to help students manage stress and anxiety.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Lock, title: "Absolute Privacy", desc: "Minimal email login is used only for active user counting. No personal data, chat history, or journals are collected or stored." },
              { icon: Globe, title: "10+ Indian Languages", desc: "Chat naturally in regional languages like Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, and more." },
              { icon: Gamepad2, title: "Calming Tools", desc: "Engage with an interactive breathing bubble, grounding guide, focus puzzles, and mood canvas to relieve anxiety instantly." },
              { icon: Volume2, title: "Voice Companion", desc: "Speak and listen with hands-free voice companion mode, allowing a more natural comforting dialogue." }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-[32px] border border-slate-200 shadow-sm hover:border-teal-400 transition-colors">
                <div className="w-14 h-14 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center mb-6">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[var(--text-2)] leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[120px] -z-0"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest block mb-3">02 — The Crisis</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">A Crisis Hiding in Plain Sight</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              India has one of the world's largest student populations — yet mental health support remains critically underdeveloped. Stigma, affordability, and privacy concerns create a barrier that prevents students from seeking help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <span className="text-3xl mb-4 block">🧠</span>
              <h4 className="text-lg font-bold text-red-400 mb-2">Stigma & Silence</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Over 80% of students facing mental distress never speak about it due to fear of judgment from family, peers, and society.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <span className="text-3xl mb-4 block">🔒</span>
              <h4 className="text-lg font-bold text-red-400 mb-2">Privacy Fears</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Students distrust digital platforms with sensitive emotional data, fearing data tracking, logs, or social exposure.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <span className="text-3xl mb-4 block">💸</span>
              <h4 className="text-lg font-bold text-red-400 mb-2">Inaccessibility</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Professional therapy is unaffordable or unavailable to the majority of Indian students, especially in Tier 2 and Tier 3 cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design and Development Process */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest block mb-3">03 — Designed with Empathy</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How Manasitra Was Built</h2>
            <p className="text-[var(--text-2)] text-lg">
              We mapped user personas, simplified the visual load, and created safe AI prompts to build a product designed explicitly around student stress.
            </p>
          </div>

          <div className="border border-slate-200 rounded-[32px] overflow-hidden divide-y divide-slate-200">
            {[
              { num: "01", title: "User Research & Personas", desc: "Studied the emotional journeys of Indian students — IIT/NIT aspirants, college-goers, and placement-year stress. Identified trust barriers and privacy expectations." },
              { num: "02", title: "Tone & Visual Palette", desc: "Selected calm sage greens, soft warm gradients, and clean typography. The interface minimizes cognitive load for emotionally exhausted users." },
              { num: "03", title: "Core AI Conversation", desc: "Engineered strict system prompts incorporating Cognitive Behavioral Therapy (CBT) principles, active listening, and deep sensitivity to Indian academic pressures." },
              { num: "04", title: "Privacy Architecture", desc: "Implemented zero-knowledge encrypted database triggers, session-only volatile memory, and a layout that allows completely anonymous, login-free usage." }
            ].map((step, idx) => (
              <div key={idx} className="p-8 flex gap-6 items-start">
                <span className="font-display text-3xl font-bold text-slate-300 leading-none shrink-0">{step.num}</span>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-[var(--text-2)] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Future Vision */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest block mb-3">04 — Future Vision</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Road Ahead for Manasitra</h2>
            <p className="text-[var(--text-2)] text-lg">
              We plan to expand our features to reach students across campuses and cities in India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "🏫 Campus Pilot Program", desc: "Partner with 5–10 colleges for a structured pilot, gathering feedback and refining the AI model on genuine student use cases." },
              { title: "🗣️ Extended Multilingual Support", desc: "Scale local voice engines in Hindi, Tamil, Telugu, and other regional languages to speak in students' comforting native tongues." },
              { title: "👨‍⚕️ Therapist Handoff Module", desc: "Build a secure bridge between the AI companion and college counseling departments for seamless clinical escalation." },
              { title: "📱 Native Mobile App", desc: "Deliver a full-featured iOS and Android application with offline journaling and push-based daily resilience streaks." },
              { title: "📈 Institutional Dashboard", desc: "Anonymized aggregate insights for college counseling units to identify campus-wide stress trends without compromising student privacy." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-[var(--text-2)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Team Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest block mb-3">05 — Team & Mentorship</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Meet the Minds Behind Manasitra</h2>
            <p className="text-[var(--text-2)] text-lg max-w-xl mx-auto">
              The passionate team working together to build a safe, empathetic mental health companion for students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Founder Card */}
            <div className="bg-white p-8 sm:p-10 rounded-[40px] border border-slate-200 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row gap-6 items-center text-center sm:text-left mb-6">
                  <div className="w-24 h-24 shrink-0 rounded-full bg-gradient-to-tr from-[var(--primary)] to-blue-400 p-1">
                    <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-slate-100">
                      <img src="/creator.jpg" alt="Yash Patadiya" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Yash Patadiya</h3>
                    <p className="text-[var(--primary)] font-bold text-sm">Founder & Lead Developer</p>
                  </div>
                </div>
                <p className="text-[var(--text-2)] text-base leading-relaxed mb-6 italic">
                  "I built Manasitra because I realized that sometimes, the hardest thing to do is simply talk to someone. We worry about being judged, being a burden, or just not being understood. I wanted to create a tool that is always there—a silent, supportive friend that genuinely cares about your mental well-being while fiercely protecting your privacy."
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  <a href="https://github.com/yashpatadiya1724-cmyk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-full text-[11px] transition-colors shadow-sm">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/yash-patadiya-973161272/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold px-3 py-1.5 rounded-full text-[11px] transition-colors shadow-sm">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a href="https://www.instagram.com/yash_patadiya_1724?igsh=bjJzZTVrZzBxcTh5" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#e1306c] hover:bg-[#d82d64] text-white font-bold px-3 py-1.5 rounded-full text-[11px] transition-colors shadow-sm">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Advisor Card */}
            <div className="bg-white p-8 sm:p-10 rounded-[40px] border border-slate-200 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row gap-6 items-center text-center sm:text-left mb-6">
                  <div className="w-24 h-24 shrink-0 rounded-full bg-gradient-to-tr from-teal-400 to-blue-400 p-1">
                    <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-slate-100">
                      <img src="/utkarsh.jpg" alt="Utkarsh Barad" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Utkarsh Barad</h3>
                    <p className="text-[var(--primary)] font-bold text-sm">Project Mentor & Main Advisor</p>
                  </div>
                </div>
                <p className="text-[var(--text-2)] text-base leading-relaxed mb-6 italic">
                  "Guiding Manasitra has been an inspiring journey. Mental health resources need to be accessible, completely private, and culturally relevant. By combining advanced AI models with direct client privacy layers, we are empowering students to seek guidance anonymously and confidently, creating a safer digital space for self-reflection."
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  <a href="https://github.com/utkarshbhai007" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-full text-[11px] transition-colors shadow-sm">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/utkarsh-barad/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold px-3 py-1.5 rounded-full text-[11px] transition-colors shadow-sm">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a href="https://www.instagram.com/utkarsh_955?igsh=ajVja2ZqbnlraTVj" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#e1306c] hover:bg-[#d82d64] text-white font-bold px-3 py-1.5 rounded-full text-[11px] transition-colors shadow-sm">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Executive Card */}
            <div className="bg-white p-8 sm:p-10 rounded-[40px] border border-slate-200 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row gap-6 items-center text-center sm:text-left mb-6">
                  <div className="w-24 h-24 shrink-0 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 p-1">
                    <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-slate-100">
                      <img src="/harshil.jpg" alt="Harshil Vaghela" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Harshil Vaghela</h3>
                    <p className="text-[var(--primary)] font-bold text-sm">Social Media Executive</p>
                  </div>
                </div>
                <p className="text-[var(--text-2)] text-base leading-relaxed mb-6 italic">
                  "Connecting with our community online is all about building trust and showing that no one has to go through tough times alone. Through Manasitra's social platforms, I want to create a warm, inviting space where every student feels seen, heard, and supported. Let's make mental health conversations normal and friendly!"
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#e1306c] hover:bg-[#d82d64] text-white font-bold px-3 py-1.5 rounded-full text-[11px] transition-colors shadow-sm">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
          </div>
          </div>
        </div>
      </section>

      {/* Hackathon Quote / Experience Section */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-3">06 — Hackathon Experience</span>
          <h2 className="text-3xl font-bold mb-6">Built Under Pressure — Just Like Our Users</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Developed during the <strong className="text-white">Ideathon Viksit Bharat 2047</strong> at Silver Oak University. Designing stress-management tech under a high-pressure timeline gave us deep empathy for the students we seek to help.
          </p>
          <div className="bg-white/5 border-l-4 border-amber-400 p-8 rounded-r-3xl text-left max-w-3xl mx-auto">
            <p className="text-lg italic text-slate-200 font-serif leading-relaxed">
              "The hardest part wasn't the code — it was deciding what the AI should say when a student tells it they can't take the pressure anymore. That question, and the weight behind it, shaped every design decision we made."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--primary-soft)] border-t border-[var(--primary)]/10 text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Ready to find your peace?</h2>
        <p className="text-[var(--text-2)] text-lg mb-8 max-w-xl mx-auto">
          Download the app today. Minimal login is used purely for active user counting. Just you and your private space.
        </p>
        <a href="/app-debug.apk" download className="inline-flex items-center justify-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary)]/90 transition-transform active:scale-95 px-10 py-5 rounded-full text-white font-bold shadow-xl shadow-[var(--primary)]/20 text-lg">
          <Download size={24} />
          Download for Android
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[10px] overflow-hidden bg-transparent">
                <img src="/icon-192.png" alt="Manasitra Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-lg text-white">Manasitra</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your anonymous, judgment-free AI companion. Designed to support emotional resilience and student well-being.
            </p>
          </div>

          {/* Core Features */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Features</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              <li>Anonymous AI Chat</li>
              <li>10+ Regional Languages</li>
              <li>Calming Mini-Games</li>
              <li>Self-Reflection Tools</li>
            </ul>
          </div>

          {/* Quick Helplines */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Helplines</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              <li className="flex justify-between">
                <span>iCall (TISS):</span>
                <a href="tel:9152987821" className="text-teal-400 font-semibold hover:underline">9152987821</a>
              </li>
              <li className="flex justify-between">
                <span>Vandrevala:</span>
                <a href="tel:18602662345" className="text-teal-400 font-semibold hover:underline">1860-2662-345</a>
              </li>
              <li className="flex justify-between">
                <span>AASRA:</span>
                <a href="tel:9820466627" className="text-teal-400 font-semibold hover:underline">9820466627</a>
              </li>
            </ul>
          </div>

          {/* Initiative */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Initiative</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Developed for <strong className="text-slate-200">Ideathon Viksit Bharat 2047</strong> at Silver Oak University to bridge the student mental health support gap.
            </p>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="bg-slate-800/50 border border-slate-700/60 p-4 rounded-2xl text-xs text-slate-400 leading-relaxed text-center">
            <strong className="text-amber-400 block mb-1">⚠️ Medical Disclaimer</strong>
            Manasitra is a supportive AI companion, not a replacement for professional mental health services, therapy, or medical diagnosis. If you are experiencing a crisis, please reach out to one of the helplines listed above or seek professional help immediately.
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 border-t border-slate-800/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Manasitra (Mann Ka Mitra). All rights reserved.</p>
          <p>
            Founded by <a href="https://github.com/yashpatadiya1724-cmyk" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 underline">Yash Patadiya</a> · Advised by <a href="https://github.com/utkarshbhai007" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 underline">Utkarsh Barad</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
