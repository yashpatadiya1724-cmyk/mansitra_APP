"use client";

import { useState } from "react";
import { 
  Menu, Plus, Smile, Gamepad2, Volume2, 
  Settings, User, PanelLeftClose, PanelLeft
} from "lucide-react";
import Link from "next/link";

export default function ChatLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#fcfaf8] text-[#333333] font-sans overflow-hidden">
      
      {/* Sidebar */}
      <div 
        className={`
          flex flex-col bg-[#f0eee9] transition-all duration-300 ease-in-out border-r border-[#e5e3dd]
          ${sidebarOpen ? "w-[260px] translate-x-0" : "w-0 -translate-x-full opacity-0"}
          shrink-0 h-full relative z-20
        `}
      >
        {/* Sidebar Header */}
        <div className="p-3">
          <button 
            className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-transparent hover:bg-black/5 rounded-lg text-sm font-medium transition-colors"
          >
            <span className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-teal-800 text-white flex items-center justify-center text-xs font-bold">
                M
              </div>
              New chat
            </span>
            <Plus size={16} className="text-neutral-500" />
          </button>
        </div>

        {/* Features List (Mansitra Specific) */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <h3 className="text-xs font-semibold text-neutral-500 mb-2 px-2 uppercase tracking-wider">Features</h3>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/chat/mood" className="w-full flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-black/5 rounded-lg transition-colors text-left">
                <Smile size={16} className="text-neutral-500" />
                Mood Tracker
              </Link>
            </li>
            <li>
              <Link href="/chat/games" className="w-full flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-black/5 rounded-lg transition-colors text-left">
                <Gamepad2 size={16} className="text-neutral-500" />
                Calming Tools
              </Link>
            </li>
            <li>
              <Link href="/chat/voice" className="w-full flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-black/5 rounded-lg transition-colors text-left">
                <Volume2 size={16} className="text-neutral-500" />
                Voice Companion
              </Link>
            </li>
          </ul>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#e5e3dd]">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-black/5 rounded-lg transition-colors">
            <User size={16} className="text-neutral-500" />
            Profile
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-black/5 rounded-lg transition-colors">
            <Settings size={16} className="text-neutral-500" />
            Settings
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Top Navbar */}
        <header className="h-14 flex items-center justify-between px-4 sticky top-0 bg-transparent z-10">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-black/5 rounded-lg text-neutral-500 transition-colors"
              title="Toggle Sidebar"
            >
              {sidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
            </button>
            
            {!sidebarOpen && (
              <span className="font-semibold text-black flex items-center gap-2 text-sm ml-2">
                <div className="w-5 h-5 rounded bg-teal-800 text-white flex items-center justify-center text-[10px] font-bold">
                  M
                </div>
                Mansitra AI
              </span>
            )}
          </div>
          
          <Link href="/" className="text-sm font-medium text-neutral-500 hover:text-black transition-colors px-3 py-1.5 hover:bg-black/5 rounded-full">
            Back to Home
          </Link>
        </header>

        {/* Page Content (Chat UI) */}
        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
}
