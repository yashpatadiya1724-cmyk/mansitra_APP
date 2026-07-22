"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Menu, X, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
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
          ? "py-3 bg-[#faf9f8]/80 backdrop-blur-xl border-b border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
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
            <h1 className="font-semibold text-lg text-black tracking-tight leading-none group-hover:text-teal-700 transition-colors">Mansitra</h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-1 bg-white/60 backdrop-blur-md p-1.5 rounded-full border border-black/5 shadow-sm">
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
                className="relative text-xs font-semibold px-4 py-2 rounded-full transition-colors text-neutral-600 hover:text-black"
              >
                {active && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-black/5 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}

          <a
            href="/mansitra.apk"
            download
            className="ml-2 flex items-center gap-1.5 bg-black hover:bg-neutral-800 transition-all px-4 py-2 rounded-full text-xs font-semibold text-white shadow-sm hover:scale-105"
          >
            <Download size={13} />
            Get the App
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden p-2 text-neutral-600 hover:text-black focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-[#faf9f8]/95 backdrop-blur-2xl border-b border-black/10 px-6 py-4 flex flex-col gap-2 overflow-hidden"
          >
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${
                isActive("/") ? "text-black bg-black/5" : "text-neutral-500 hover:text-black"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${
                isActive("/about") ? "text-black bg-black/5" : "text-neutral-500 hover:text-black"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/chat"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-neutral-500 hover:text-black transition-colors px-4 py-2.5 hover:bg-black/5 rounded-xl"
            >
              Try Web App
            </Link>
            <a
              href="/mansitra.apk"
              download
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 transition-colors px-4 py-2.5 rounded-xl text-sm font-medium text-white w-full shadow-sm"
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
