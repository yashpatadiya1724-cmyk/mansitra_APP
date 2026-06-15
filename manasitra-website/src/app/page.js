"use client";

import { motion } from "framer-motion";
import { Download, Shield, Gamepad2, Heart, Lock, User, CheckCircle2 } from "lucide-react";

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
      <section className="relative pt-36 pb-20 overflow-hidden">
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
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-balance">
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
            className="relative mx-auto lg:ml-auto w-full max-w-[320px] aspect-[1/2] bg-[var(--background)] border-[8px] border-[var(--surface-2)] rounded-[48px] shadow-2xl overflow-hidden"
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

      {/* About Manasitra Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What is Manasitra?</h2>
            <p className="text-[var(--text-2)] text-lg leading-relaxed">
              Manasitra was created to be a safe haven. A place where you can share your deepest thoughts without the fear of judgment, data mining, or privacy breaches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: "Absolute Privacy", desc: "No sign-ups, no cloud sync, no tracking. Everything you type stays exactly where it belongs: on your device." },
              { icon: Gamepad2, title: "Calming Tools", desc: "When words aren't enough, engage with interactive mini-games designed to ground your senses and relieve anxiety." },
              { icon: Heart, title: "Emotional Support", desc: "Track your daily moods, build resilience streaks, and receive thoughtful, empathetic responses whenever you need them." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:border-teal-400 transition-colors">
                <div className="w-14 h-14 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center mb-6">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[var(--text-2)] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Creator Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="bg-white p-8 sm:p-12 rounded-[40px] border border-slate-200 shadow-xl relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
            
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="w-32 h-32 shrink-0 rounded-full bg-gradient-to-tr from-[var(--primary)] to-blue-400 p-1">
                <div className="w-full h-full rounded-full border-4 border-[var(--surface)] overflow-hidden bg-[var(--surface-2)]">
                  <img src="/creator.jpg" alt="Yash - Creator of Manasitra" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-2">Meet the Creator</h2>
                <h3 className="text-xl text-[var(--primary)] font-bold mb-4">Yash</h3>
                <p className="text-[var(--text-2)] text-lg leading-relaxed mb-6">
                  "I built Manasitra because I realized that sometimes, the hardest thing to do is simply talk to someone. We worry about being judged, being a burden, or just not being understood. I wanted to create a tool that is always there—a silent, supportive friend that genuinely cares about your mental well-being while fiercely protecting your privacy."
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold bg-[var(--surface-2)] border border-[var(--border)] px-4 py-2 rounded-full">
                    <CheckCircle2 size={16} className="text-[var(--primary)]" /> Built with Care
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold bg-[var(--surface-2)] border border-[var(--border)] px-4 py-2 rounded-full">
                    <CheckCircle2 size={16} className="text-[var(--primary)]" /> Privacy First
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--primary-soft)] border-t border-[var(--primary)]/10 text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Ready to find your peace?</h2>
        <p className="text-[var(--text-2)] text-lg mb-8 max-w-xl mx-auto">
          Download the app today. No account creation, no subscriptions. Just you and your private space.
        </p>
        <a href="/app-debug.apk" download className="inline-flex items-center justify-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary)]/90 transition-transform active:scale-95 px-10 py-5 rounded-full text-white font-bold shadow-xl shadow-[var(--primary)]/20 text-lg">
          <Download size={24} />
          Download for Android
        </a>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-slate-200 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Manasitra (Mann Ka Mitra). Created by Yash.</p>
        <p className="mt-2">Not a substitute for professional mental health care.</p>
      </footer>
    </div>
  );
}
