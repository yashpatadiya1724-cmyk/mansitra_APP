"use client";

import { useState } from "react";
import { 
  Plus, Smile, Gamepad2, Volume2, 
  PanelLeftClose, PanelLeft, Sparkles, ShieldCheck, Home
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MultiLayerBackground from "@/components/landing/MultiLayerBackground";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useEmotionTheme } from "@/context/ThemeContext";

export default function ChatLayoutClient({ children }) {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { href: "/chat", label: "AI Companion", icon: Sparkles },
    { href: "/chat/mood", label: "Mood Tracker", icon: Smile },
    { href: "/chat/games", label: "Calming Tools", icon: Gamepad2 },
    { href: "/chat/voice", label: "Voice Companion", icon: Volume2 },
  ];

  return (
    <div className={`flex h-screen w-full font-sans overflow-hidden relative transition-colors duration-700 ${
      isDark ? "bg-[#0d131f] text-neutral-200" : "bg-[#faf9f8] text-[#333333]"
    }`}>
      <MultiLayerBackground />
      
      {/* Sidebar */}
      <aside 
        className={`
          flex flex-col backdrop-blur-2xl transition-all duration-300 ease-in-out shrink-0 h-full relative z-30 shadow-xl
          ${sidebarOpen ? "w-[270px] translate-x-0" : "w-0 -translate-x-full opacity-0"}
          ${isDark
            ? "bg-white/[0.04] border-r border-white/[0.08]"
            : "bg-white/80 border-r border-black/5"
          }
        `}
      >
        {/* Sidebar Header */}
        <div className={`p-4 border-b transition-colors duration-700 ${isDark ? "border-white/5" : "border-black/5"}`}>
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
              M
            </div>
            <div>
              <span className={`font-bold text-base block leading-none transition-colors duration-700 ${isDark ? "text-white" : "text-black"}`}>Mansitra</span>
              <span className={`text-[10px] font-semibold uppercase tracking-wider transition-colors duration-700 ${isDark ? "text-emerald-400" : "text-teal-700"}`}>AI Companion App</span>
            </div>
          </Link>

          <button 
            onClick={() => window.location.href = "/chat"}
            className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-md transition-all active:scale-95 ${
              isDark
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-black hover:bg-neutral-800 text-white"
            }`}
          >
            <span className="flex items-center gap-2">
              <Plus size={14} />
              New Conversation
            </span>
            <Sparkles size={12} className={isDark ? "text-emerald-200" : "text-teal-400"} />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <h3 className={`text-[10px] font-bold mb-2 px-3 uppercase tracking-widest ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>Wellness Suite</h3>
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                        isActive 
                          ? isDark
                            ? "bg-emerald-600/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.1)] border border-emerald-500/20"
                            : "bg-teal-800 text-white shadow-md"
                          : isDark
                            ? "text-neutral-400 hover:bg-white/5 hover:text-white"
                            : "text-neutral-600 hover:bg-black/5 hover:text-black"
                      }`}
                    >
                      <Icon size={16} className={isActive ? (isDark ? "text-emerald-400" : "text-teal-300") : (isDark ? "text-neutral-500" : "text-neutral-500")} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={`px-3 py-3 rounded-2xl transition-all duration-700 ${
            isDark
              ? "bg-emerald-500/5 border border-emerald-500/15"
              : "bg-emerald-50/70 border border-emerald-200/50"
          }`}>
            <div className={`flex items-center gap-2 mb-1 font-bold text-xs ${isDark ? "text-emerald-400" : "text-emerald-900"}`}>
              <ShieldCheck size={14} className={isDark ? "text-emerald-400" : "text-emerald-700"} />
              <span>Zero-Knowledge Privacy</span>
            </div>
            <p className={`text-[11px] leading-relaxed font-serif ${isDark ? "text-emerald-300/60" : "text-emerald-800/80"}`}>
              No chat logs or personal data stored on servers.
            </p>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className={`p-3 border-t flex flex-col gap-2 transition-colors duration-700 ${isDark ? "border-white/5" : "border-black/5"}`}>
          <div className="px-3">
            <ThemeToggle />
          </div>
          <Link 
            href="/" 
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              isDark ? "text-neutral-400 hover:bg-white/5 hover:text-white" : "text-neutral-600 hover:bg-black/5 hover:text-black"
            }`}
          >
            <Home size={15} />
            Back to Home Page
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative h-full z-10">
        {/* Top Navbar */}
        <header className={`h-14 flex items-center justify-between px-4 sticky top-0 backdrop-blur-xl z-20 transition-all duration-700 ${
          isDark
            ? "bg-[#0d131f]/60 border-b border-white/5"
            : "bg-white/60 border-b border-black/5"
        }`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-xl transition-colors ${
                isDark ? "hover:bg-white/5 text-neutral-400" : "hover:bg-black/5 text-neutral-600"
              }`}
              title="Toggle Sidebar"
            >
              {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
            </button>

            {!sidebarOpen && (
              <Link href="/" className={`font-bold flex items-center gap-2 text-sm ${isDark ? "text-white" : "text-black"}`}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white ${isDark ? "bg-emerald-600" : "bg-teal-800"}`}>
                  M
                </div>
                Mansitra AI
              </Link>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all duration-700 ${
              isDark
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                : "bg-emerald-50 border border-emerald-200/60 text-emerald-800"
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI Connected</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
}
