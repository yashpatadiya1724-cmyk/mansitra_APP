"use client";

import Navbar from "@/shared/components/navbar";
import MultiLayerBackground from "@/components/landing/MultiLayerBackground";
import { useEmotionTheme } from "@/context/ThemeContext";

export default function ContactPage() {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

  return (
    <main className={`min-h-screen relative font-sans transition-colors duration-700 ${
      isDark ? "text-neutral-200 bg-[#0d131f]" : "text-neutral-800 bg-[#faf9f8]"
    }`}>
      <MultiLayerBackground />
      <Navbar />
      
      <section className="relative pt-40 pb-24 px-6 max-w-3xl mx-auto z-10 min-h-screen">
        <h1 className={`text-4xl md:text-6xl font-medium mb-8 transition-colors duration-700 ${
          isDark ? "text-white" : "text-black"
        }`}>Contact Us</h1>
        <p className={`text-xl font-serif mb-12 transition-colors duration-700 ${
          isDark ? "text-neutral-300" : "text-neutral-600"
        }`}>
          We would love to hear from you. Whether you have feedback, questions, or just want to say hi, reach out to us.
        </p>

        <div className={`p-8 rounded-3xl backdrop-blur-xl mb-12 transition-colors duration-700 ${
          isDark 
            ? "bg-white/[0.04] border border-white/10" 
            : "bg-white/80 border border-black/5 shadow-sm"
        }`}>
          <h3 className={`text-xl font-semibold mb-4 transition-colors duration-700 ${
            isDark ? "text-white" : "text-black"
          }`}>Get In Touch</h3>
          <p className={`mb-6 transition-colors duration-700 ${
            isDark ? "text-neutral-400" : "text-neutral-600"
          }`}>
            For inquiries, feedback, or support, please reach out to us via email or our social media channels.
          </p>
          <a href="mailto:support@mansitra.in" className={`inline-block px-6 py-3 rounded-full transition-colors ${
            isDark 
              ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
              : "bg-teal-600 hover:bg-teal-700 text-white"
          }`}>
            Email Support
          </a>
        </div>

        <div className={`p-8 rounded-3xl backdrop-blur-xl transition-colors duration-700 ${
          isDark 
            ? "bg-amber-500/5 border border-amber-500/20" 
            : "bg-amber-50 border border-amber-200/50 shadow-sm"
        }`}>
          <h3 className={`text-xl font-semibold mb-3 transition-colors duration-700 ${
            isDark ? "text-amber-200" : "text-amber-900"
          }`}>Emergency Helplines</h3>
          <p className={`text-sm mb-4 transition-colors duration-700 ${
            isDark ? "text-amber-300/80" : "text-amber-800"
          }`}>
            Mansitra is an AI companion and not a replacement for professional help. If you are in a crisis, please contact these free helplines in India:
          </p>
          <ul className={`list-disc pl-5 text-sm space-y-2 transition-colors duration-700 ${
            isDark ? "text-amber-300/80" : "text-amber-800"
          }`}>
            <li><strong className={isDark ? "text-amber-200" : "text-amber-900"}>iCall (TISS):</strong> 9152987821</li>
            <li><strong className={isDark ? "text-amber-200" : "text-amber-900"}>Vandrevala Foundation:</strong> 1860-2662-345</li>
            <li><strong className={isDark ? "text-amber-200" : "text-amber-900"}>AASRA:</strong> 9820466627</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
