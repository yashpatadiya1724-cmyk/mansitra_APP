"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, Linkedin, Github, Instagram } from "lucide-react";
import { useEmotionTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

  return (
    <footer className={`pt-24 pb-8 text-sm relative z-10 transition-all duration-700 w-full ${
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
          }`}>Links</h4>
          <ul className="flex flex-col gap-3">
            {[
              { label: "About Us", href: "/about" },
              { label: "Features & Tools", href: "/services" },
              { label: "Contact Us", href: "/contact" },
              { label: "Privacy & Terms", href: "/privacy-policy" },
              { label: "Try Web App", href: "/chat" }
            ].map((link) => (
              <li key={link.label}><Link href={link.href} className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:transition-all ${
                isDark
                  ? "hover:text-emerald-400 after:bg-emerald-400 hover:after:w-full"
                  : "hover:text-teal-700 after:bg-teal-700 hover:after:w-full"
              }`}>{link.label}</Link></li>
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
              <Linkedin size={18} />
            </a>
            <a href="https://github.com/yashpatadiya1724-cmyk" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isDark
                ? "bg-white/5 text-white hover:bg-emerald-500/20 hover:text-emerald-400"
                : "bg-neutral-100 text-black hover:bg-teal-100 hover:text-teal-700"
            }`}>
              <Github size={18} />
            </a>
            <a href="https://www.instagram.com/yash_patadiya_1724?igsh=bjJzZTVrZzBxcTh5" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isDark
                ? "bg-white/5 text-white hover:bg-emerald-500/20 hover:text-emerald-400"
                : "bg-neutral-100 text-black hover:bg-teal-100 hover:text-teal-700"
            }`}>
              <Instagram size={18} />
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
  );
}
