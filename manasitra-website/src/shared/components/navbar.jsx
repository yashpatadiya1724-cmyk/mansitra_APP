"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useEmotionTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const pathname = usePathname();
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? isDark
            ? "py-3 bg-[#0d131f]/80 backdrop-blur-2xl border-b border-emerald-500/10 shadow-[0_10px_30px_rgba(0,0,0,0.3),0_1px_0_rgba(16,185,129,0.1)]"
            : "py-3 bg-[#faf9f8]/80 backdrop-blur-xl border-b border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-8 h-8 rounded-lg bg-transparent flex items-center justify-center overflow-hidden"
          >
            <img src="/logo.svg" alt="Mansitra Logo" className="w-full h-full object-cover" />
          </motion.div>
          <div>
            <h1 className={`font-semibold text-lg tracking-tight leading-none transition-colors duration-700 ${
              isDark ? "text-white group-hover:text-emerald-400" : "text-black group-hover:text-teal-700"
            }`}>Mansitra</h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className={`hidden sm:flex items-center gap-1.5 backdrop-blur-md p-1.5 rounded-full border shadow-sm transition-all duration-700 ${
          isDark
            ? "bg-white/[0.04] border-white/[0.08]"
            : "bg-white/60 border-black/5"
        }`}>
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About Us" },
            { href: "/chat", label: "Try Web App" },
          ].map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
                  isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="navbar-active"
                    className={`absolute inset-0 rounded-full z-0 transition-colors duration-700 ${
                      isDark ? "bg-white/10 shadow-[0_0_10px_rgba(16,185,129,0.1)]" : "bg-black/5"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${active && isDark ? "text-emerald-300" : active ? "text-black" : ""}`}>{item.label}</span>
              </Link>
            );
          })}

          <ThemeToggle />

          <a
            href="/mansitra.apk"
            download
            className={`ml-1 flex items-center gap-1.5 transition-all px-4 py-2 rounded-full text-xs font-semibold text-white shadow-sm hover:scale-105 ${
              isDark
                ? "bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                : "bg-black hover:bg-neutral-800"
            }`}
          >
            <Download size={13} />
            Get App
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 focus:outline-none transition-colors ${
              isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`sm:hidden backdrop-blur-2xl px-6 py-4 flex flex-col gap-2 overflow-hidden transition-all duration-700 ${
              isDark
                ? "bg-[#0d131f]/95 border-b border-white/10"
                : "bg-[#faf9f8]/95 border-b border-black/10"
            }`}
          >
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${
                isActive("/")
                  ? isDark ? "text-emerald-300 bg-white/10" : "text-black bg-black/5"
                  : isDark ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-black"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${
                isActive("/about")
                  ? isDark ? "text-emerald-300 bg-white/10" : "text-black bg-black/5"
                  : isDark ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-black"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/chat"
              onClick={() => setIsOpen(false)}
              className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${
                isDark ? "text-neutral-400 hover:text-white hover:bg-white/5" : "text-neutral-500 hover:text-black hover:bg-black/5"
              }`}
            >
              Try Web App
            </Link>
            <a
              href="/mansitra.apk"
              download
              onClick={() => setIsOpen(false)}
              className={`mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white w-full shadow-sm transition-colors ${
                isDark
                  ? "bg-emerald-600 hover:bg-emerald-500"
                  : "bg-black hover:bg-neutral-800"
              }`}
            >
              <Download size={14} />
              Get the App
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
