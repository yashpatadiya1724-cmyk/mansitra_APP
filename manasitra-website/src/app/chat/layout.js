"use client";

import { useState } from "react";
import { 
  Plus, Smile, Gamepad2, Volume2, 
  Settings, User, PanelLeftClose, PanelLeft, Sparkles, ShieldCheck, Home, Sprout
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MultiLayerBackground from "@/components/landing/MultiLayerBackground";

export default function ChatLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { href: "/chat", label: "AI Companion", icon: Sparkles },
    { href: "/chat/mood", label: "Mood Tracker", icon: Smile },
    { href: "/chat/games", label: "Calming Tools", icon: Gamepad2 },
    { href: "/chat/voice", label: "Voice Companion", icon: Volume2 },
  ];

  return (
    <div className="flex h-screen w-full bg-[#faf9f8] text-[#333333] font-sans overflow-hidden relative">
      <MultiLayerBackground />
      
      {/* Sidebar */}
      <aside 
        className={`
          flex flex-col bg-white/80 backdrop-blur-2xl transition-all duration-300 ease-in-out border-r border-black/5
          ${sidebarOpen ? "w-[270px] translate-x-0" : "w-0 -translate-x-full opacity-0"}
          shrink-0 h-full relative z-30 shadow-xl
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-black/5">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
              M
            </div>
            <div>
              <span className="font-bold text-black text-base block leading-none">Mansitra</span>
              <span className="text-[10px] text-teal-700 font-semibold uppercase tracking-wider">AI Companion App</span>
            </div>
          </Link>

          <button 
            onClick={() => window.location.href = "/chat"}
            className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-2xl text-xs font-semibold shadow-md transition-all active:scale-95"
          >
            <span className="flex items-center gap-2">
              <Plus size={14} />
              New Conversation
            </span>
            <Sparkles size={12} className="text-teal-400" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <h3 className="text-[10px] font-bold text-neutral-400 mb-2 px-3 uppercase tracking-widest">Wellness Suite</h3>
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
                          ? "bg-teal-800 text-white shadow-md" 
                          : "text-neutral-600 hover:bg-black/5 hover:text-black"
                      }`}
                    >
                      <Icon size={16} className={isActive ? "text-teal-300" : "text-neutral-500"} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="px-3 py-3 bg-emerald-50/70 border border-emerald-200/50 rounded-2xl">
            <div className="flex items-center gap-2 mb-1 text-emerald-900 font-bold text-xs">
              <ShieldCheck size={14} className="text-emerald-700" />
              <span>Zero-Knowledge Privacy</span>
            </div>
            <p className="text-[11px] text-emerald-800/80 leading-relaxed font-serif">
              No chat logs or personal data stored on servers.
            </p>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-black/5 flex flex-col gap-1">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-neutral-600 hover:bg-black/5 hover:text-black transition-colors"
          >
            <Home size={15} />
            Back to Home Page
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative h-full z-10">
        {/* Top Navbar */}
        <header className="h-14 flex items-center justify-between px-4 sticky top-0 bg-white/60 backdrop-blur-xl border-b border-black/5 z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-black/5 rounded-xl text-neutral-600 transition-colors"
              title="Toggle Sidebar"
            >
              {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
            </button>

            {!sidebarOpen && (
              <Link href="/" className="font-bold text-black flex items-center gap-2 text-sm">
                <div className="w-6 h-6 rounded-lg bg-teal-800 text-white flex items-center justify-center text-xs font-bold">
                  M
                </div>
                Mansitra AI
              </Link>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full text-[11px] font-bold text-emerald-800">
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
