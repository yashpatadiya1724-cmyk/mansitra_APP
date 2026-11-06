"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function MobileBottomBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 250px on mobile
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 inset-x-4 z-[8000] sm:hidden bg-white/90 backdrop-blur-2xl border border-black/10 p-2.5 rounded-full shadow-2xl flex items-center justify-between gap-2"
        >
          <Link
            href="/chat"
            className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-sm active:scale-95 transition-transform"
          >
            <MessageCircle size={14} />
            Try Web App
          </Link>
          <a
            href="/mansitra.apk"
            download
            className="flex-1 flex items-center justify-center gap-2 bg-teal-700 text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-sm active:scale-95 transition-transform"
          >
            <Download size={14} />
            Download APK
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
