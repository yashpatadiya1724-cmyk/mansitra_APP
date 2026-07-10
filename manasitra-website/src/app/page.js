"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Shield, Gamepad2, Lock, Globe, Volume2 } from "lucide-react";
import Link from "next/link";
import SplashScreen from "../components/SplashScreen";
import Navbar from "@/shared/components/navbar";
import Aurora from "../components/Aurora";
import FloatingLines from "../components/FloatingLines";
import Galaxy from "../components/Galaxy";

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

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

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

  return (
    <div className="min-h-screen bg-[#faf9f8] text-[#333333] font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      
      <Navbar />

      {/* Hero Section with Aurora */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 z-0 opacity-40">
          <Aurora
            colorStops={["#5eead4", "#99f6e4", "#ccfbf1"]}
            amplitude={1.2}
            blend={0.6}
          />
        </div>
        
        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-black/5 px-3 py-1 rounded-full">
              <Shield size={12} className="text-teal-700" />
              <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-widest">100% Private & Anonymous</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-black text-balance leading-tight">
              Your Private <br />
              <span className="text-teal-700 font-serif italic">AI Companion</span>
            </h1>
            
            <p className="text-lg text-neutral-600 leading-relaxed max-w-lg mx-auto">
              Mansitra is a judgment-free space designed to help you navigate life's challenges. Track your mood, express your feelings, and play calming mini-games.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-4 items-center justify-center">
              <Link href="/chat" className="inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 transition-colors px-6 py-3 rounded-full text-white font-medium text-sm shadow-sm">
                Try Web App
              </Link>
              <a href="/mansitra.apk" download className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 transition-colors px-6 py-3 rounded-full text-white font-medium text-sm">
                <Download size={16} />
                Android (.APK)
              </a>
              <a 
                href="/mansitra.ipa" 
                download 
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-black border border-black/10 font-medium px-6 py-3 rounded-full transition-colors text-sm shadow-sm"
              >
                <Download size={16} />
                iOS (.IPA)
              </a>
            </div>
            <p className="text-xs text-neutral-500 font-medium mt-2">
              Supports Android 8.0+ and iOS 15.0+ • Completely Free
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-black/5 py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-black/5">
          <div>
            <p className="font-serif text-3xl font-medium text-teal-900 mb-1">300M+</p>
            <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-widest">Students in India</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-medium text-teal-900 mb-1">1 in 5</p>
            <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-widest">Face Mental Health Issues</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-medium text-teal-900 mb-1">&lt;10%</p>
            <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-widest">Seek Professional Help</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-medium text-teal-900 mb-1">24/7</p>
            <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-widest">AI Companion Access</p>
          </div>
        </div>
      </section>

      {/* About Mansitra Section */}
      <section className="py-24 bg-[#faf9f8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] font-semibold text-teal-700 uppercase tracking-widest block mb-4">01 — Overview</span>
            <h2 className="text-3xl font-medium tracking-tight mb-6 text-black">What is Mansitra?</h2>
            <p className="text-neutral-600 text-lg leading-relaxed mb-6 font-serif">
              Mansitra (मनसित्र) combines the Sanskrit words <strong>Mana</strong> (mind) and <strong>Mitra</strong> (friend). It is a trustworthy, non-judgmental friend for every student navigating the pressures of academic life in India.
            </p>
            <p className="text-neutral-600 text-base leading-relaxed">
              Built at the intersection of AI engineering, psychology, and human-centered design, Mansitra is a secure, privacy-first emotional wellness platform that uses real-time AI conversation and culturally-aware support to help students manage stress and anxiety.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Lock, title: "Absolute Privacy", desc: "Minimal email login is used only for active user counting. No personal data, chat history, or journals are collected or stored." },
              { icon: Globe, title: "10+ Indian Languages", desc: "Chat naturally in regional languages like Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, and more." },
              { icon: Gamepad2, title: "Calming Tools", desc: "Engage with an interactive breathing bubble, grounding guide, focus puzzles, and mood canvas to relieve anxiety instantly." },
              { icon: Volume2, title: "Voice Companion", desc: "Speak and listen with hands-free voice companion mode, allowing a more natural comforting dialogue." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-black/5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mb-5">
                  <feature.icon size={18} />
                </div>
                <h3 className="text-sm font-semibold text-black mb-2">{feature.title}</h3>
                <p className="text-neutral-500 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement Section with Floating Lines */}
      <section className="py-24 bg-white relative overflow-hidden border-y border-black/5">
        <div className="absolute inset-0 z-0 opacity-20">
          <FloatingLines 
            enabledWaves={["top","middle","bottom"]}
            lineCount={4}
            lineDistance={33}
            bendRadius={8}
            bendStrength={5}
            interactive={true}
            parallax={true}
            animationSpeed={0.9}
            gradientStart="#ccfbf1"
            gradientMid="#99f6e4"
            gradientEnd="#5eead4"
          />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] font-semibold text-rose-600 uppercase tracking-widest block mb-4">02 — The Crisis</span>
            <h2 className="text-3xl font-medium tracking-tight mb-6 text-black">A Crisis Hiding in Plain Sight</h2>
            <p className="text-neutral-600 text-lg leading-relaxed font-serif">
              India has one of the world's largest student populations — yet mental health support remains critically underdeveloped. Stigma, affordability, and privacy concerns create a barrier that prevents students from seeking help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-md border border-black/5 p-6 rounded-2xl shadow-sm">
              <span className="text-2xl mb-4 block">🧠</span>
              <h4 className="text-sm font-semibold text-black mb-2">Stigma & Silence</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Over 80% of students facing mental distress never speak about it due to fear of judgment from family, peers, and society.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md border border-black/5 p-6 rounded-2xl shadow-sm">
              <span className="text-2xl mb-4 block">🔒</span>
              <h4 className="text-sm font-semibold text-black mb-2">Privacy Fears</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Students distrust digital platforms with sensitive emotional data, fearing data tracking, logs, or social exposure.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md border border-black/5 p-6 rounded-2xl shadow-sm">
              <span className="text-2xl mb-4 block">💸</span>
              <h4 className="text-sm font-semibold text-black mb-2">Inaccessibility</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Professional therapy is unaffordable or unavailable to the majority of Indian students, especially in Tier 2 and Tier 3 cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design and Development Process */}
      <section className="py-24 bg-[#faf9f8]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-[10px] font-semibold text-teal-700 uppercase tracking-widest block mb-4">03 — Designed with Empathy</span>
            <h2 className="text-3xl font-medium tracking-tight mb-6 text-black">How Mansitra Was Built</h2>
            <p className="text-neutral-600 text-lg font-serif">
              We mapped user personas, simplified the visual load, and created safe AI prompts to build a product designed explicitly around student stress.
            </p>
          </div>

          <div className="border border-black/5 rounded-3xl overflow-hidden bg-white shadow-sm">
            {[
              { num: "01", title: "User Research & Personas", desc: "Studied the emotional journeys of Indian students — IIT/NIT aspirants, college-goers, and placement-year stress. Identified trust barriers and privacy expectations." },
              { num: "02", title: "Tone & Visual Palette", desc: "Selected calm sage greens, soft warm gradients, and clean typography. The interface minimizes cognitive load for emotionally exhausted users." },
              { num: "03", title: "Core AI Conversation", desc: "Engineered strict system prompts incorporating Cognitive Behavioral Therapy (CBT) principles, active listening, and deep sensitivity to Indian academic pressures." },
              { num: "04", title: "Privacy Architecture", desc: "Implemented zero-knowledge encrypted database triggers, session-only volatile memory, and a layout that allows completely anonymous, login-free usage." }
            ].map((step, idx) => (
              <div key={idx} className={`p-8 flex gap-6 items-start ${idx !== 0 ? 'border-t border-black/5' : ''}`}>
                <span className="font-serif text-2xl text-neutral-300 italic shrink-0">{step.num}</span>
                <div>
                  <h4 className="text-sm font-semibold text-black mb-2">{step.title}</h4>
                  <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Future Vision with Galaxy Dark Mode snippet */}
      <section className="py-24 bg-[#111111] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Galaxy 
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1}
            glowIntensity={0.3}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.3}
            rotationSpeed={0.1}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.5}
            speed={1}
          />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] font-semibold text-teal-400 uppercase tracking-widest block mb-4">04 — Future Vision</span>
            <h2 className="text-3xl font-medium tracking-tight mb-6 text-white">The Road Ahead</h2>
            <p className="text-neutral-400 text-lg font-serif">
              We plan to expand our features to reach students across campuses and cities in India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "🏫 Campus Pilot Program", desc: "Partner with 5–10 colleges for a structured pilot, gathering feedback and refining the AI model on genuine student use cases." },
              { title: "🗣️ Multilingual Support", desc: "Scale local voice engines in Hindi, Tamil, Telugu, and other regional languages to speak in students' comforting native tongues." },
              { title: "👨‍⚕️ Therapist Handoff", desc: "Build a secure bridge between the AI companion and college counseling departments for seamless clinical escalation." },
              { title: "📱 Native Mobile App", desc: "Deliver a full-featured iOS and Android application with offline journaling and push-based daily resilience streaks." },
              { title: "📈 Institutional Dashboard", desc: "Anonymized aggregate insights for college counseling units to identify campus-wide stress trends without compromising student privacy." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <h4 className="text-sm font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Hackathon Quote / Experience Section */}
      <section className="py-24 bg-[#faf9f8] border-b border-black/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-widest block mb-4">06 — Hackathon Experience</span>
          <h2 className="text-3xl font-medium tracking-tight mb-6 text-black">Built Under Pressure</h2>
          <p className="text-neutral-600 text-lg leading-relaxed mb-10 font-serif">
            Developed during the <strong>Ideathon Viksit Bharat 2047</strong> at Silver Oak University. Designing stress-management tech under a high-pressure timeline gave us deep empathy for the students we seek to help.
          </p>
          <div className="border-l-2 border-teal-700 pl-6 text-left max-w-2xl mx-auto">
            <p className="text-xl italic text-neutral-500 font-serif leading-relaxed">
              "The hardest part wasn't the code — it was deciding what the AI should say when a student tells it they can't take the pressure anymore. That question, and the weight behind it, shaped every design decision we made."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center px-6">
        <h2 className="text-3xl font-medium tracking-tight mb-6 text-black">Ready to find your peace?</h2>
        <p className="text-neutral-500 text-lg mb-8 max-w-lg mx-auto font-serif">
          Download the app today. Minimal login is used purely for active user counting. Just you and your private space.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a href="/mansitra.apk" download className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 transition-colors px-6 py-3 rounded-full text-white font-medium text-sm">
            <Download size={16} />
            Download for Android
          </a>
          <a 
            href="/mansitra.ipa" 
            download 
            className="inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-medium px-6 py-3 rounded-full transition-colors text-sm shadow-sm"
          >
            <Download size={16} />
            Download for iOS
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#faf9f8] text-neutral-500 pt-16 pb-8 border-t border-black/5 text-sm">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-transparent">
                <img src="/logo.svg" alt="Mansitra Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold text-black">Mansitra</span>
            </div>
            <p className="leading-relaxed">
              Your anonymous, judgment-free AI companion. Designed to support emotional resilience and student well-being.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-4">Features</h4>
            <ul className="flex flex-col gap-2">
              <li>Anonymous AI Chat</li>
              <li>10+ Regional Languages</li>
              <li>Calming Mini-Games</li>
              <li>Self-Reflection Tools</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-4">Helplines</h4>
            <ul className="flex flex-col gap-2">
              <li className="flex justify-between">
                <span>iCall (TISS):</span>
                <a href="tel:9152987821" className="text-teal-700 font-medium hover:underline">9152987821</a>
              </li>
              <li className="flex justify-between">
                <span>Vandrevala:</span>
                <a href="tel:18602662345" className="text-teal-700 font-medium hover:underline">1860-2662-345</a>
              </li>
              <li className="flex justify-between">
                <span>AASRA:</span>
                <a href="tel:9820466627" className="text-teal-700 font-medium hover:underline">9820466627</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-4">Connect</h4>
            <ul className="flex flex-col gap-2 mb-4">
              <li><a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-700 hover:underline">LinkedIn</a></li>
              <li><a href="https://github.com/yashpatadiya1724-cmyk" target="_blank" rel="noopener noreferrer" className="hover:text-teal-700 hover:underline">GitHub</a></li>
              <li><a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-700 hover:underline">Instagram</a></li>
              <li><a href="mailto:yashpatadiya1724@gmail.com" className="hover:text-teal-700 hover:underline">Email Us</a></li>
            </ul>
            <p className="leading-relaxed text-xs">
              Developed for <strong>Ideathon Viksit Bharat 2047</strong>
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 mb-8">
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-xs text-amber-900 leading-relaxed text-center">
            <strong className="block mb-1 font-semibold">⚠️ Medical Disclaimer</strong>
            Manasitra is a supportive AI companion, not a replacement for professional mental health services, therapy, or medical diagnosis. If you are experiencing a crisis, please reach out to one of the helplines listed above or seek professional help immediately.
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 border-t border-black/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Mansitra (Mann Ka Mitra). All rights reserved.</p>
          <p>
            Founded by <a href="https://github.com/yashpatadiya1724-cmyk" target="_blank" rel="noopener noreferrer" className="hover:text-teal-700 underline">Yash Patadiya</a> · Advised by <a href="https://github.com/utkarshbhai007" target="_blank" rel="noopener noreferrer" className="hover:text-teal-700 underline">Utkarsh Barad</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
