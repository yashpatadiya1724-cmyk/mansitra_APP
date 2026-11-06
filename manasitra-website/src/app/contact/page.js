"use client";

import Navbar from "@/shared/components/navbar";
import MultiLayerBackground from "@/components/landing/MultiLayerBackground";
import { useEmotionTheme } from "@/context/ThemeContext";
import Footer from "@/shared/components/footer";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

  return (
    <main className={`min-h-screen relative font-sans transition-colors duration-700 ${
      isDark ? "text-neutral-200 bg-[#0d131f]" : "text-neutral-800 bg-[#faf9f8]"
    }`}>
      <MultiLayerBackground />
      <Navbar />
      
      <section className="relative pt-40 pb-24 px-6 max-w-4xl mx-auto z-10 min-h-screen">
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-6xl font-medium mb-6 transition-colors duration-700 ${
            isDark ? "text-white" : "text-black"
          }`}>Contact Us</h1>
          <p className={`text-xl font-serif max-w-2xl mx-auto transition-colors duration-700 ${
            isDark ? "text-neutral-300" : "text-neutral-600"
          }`}>
            We would love to hear from you. Whether you have feedback, questions, or just want to say hi, reach out to us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Email Support Card */}
          <div className={`p-8 rounded-3xl backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 ${
            isDark 
              ? "bg-white/[0.04] border border-white/10 hover:border-emerald-500/30 shadow-lg shadow-black/20" 
              : "bg-white/80 border border-black/5 shadow-sm hover:shadow-md"
          }`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
              isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-teal-50 text-teal-700"
            }`}>
              <Mail size={24} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-700 ${
              isDark ? "text-white" : "text-black"
            }`}>Email Us</h3>
            <p className={`mb-6 text-sm leading-relaxed transition-colors duration-700 ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}>
              For any inquiries or technical support, drop us an email and we'll get back to you as soon as possible.
            </p>
            <a 
              href="mailto:yashpatadiya1724@gmail.com" 
              className={`inline-flex items-center gap-2 font-medium transition-colors ${
                isDark ? "text-emerald-400 hover:text-emerald-300" : "text-teal-700 hover:text-teal-800"
              }`}
            >
              yashpatadiya1724@gmail.com
            </a>
          </div>

          {/* WhatsApp/Phone Card */}
          <div className={`p-8 rounded-3xl backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 ${
            isDark 
              ? "bg-white/[0.04] border border-white/10 hover:border-emerald-500/30 shadow-lg shadow-black/20" 
              : "bg-white/80 border border-black/5 shadow-sm hover:shadow-md"
          }`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
              isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-teal-50 text-teal-700"
            }`}>
              <MessageCircle size={24} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-700 ${
              isDark ? "text-white" : "text-black"
            }`}>Call or WhatsApp</h3>
            <p className={`mb-6 text-sm leading-relaxed transition-colors duration-700 ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}>
              Reach out to us directly for urgent inquiries or partnership opportunities.
            </p>
            <a 
              href="https://wa.me/919662572826" 
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 font-medium transition-colors ${
                isDark ? "text-emerald-400 hover:text-emerald-300" : "text-teal-700 hover:text-teal-800"
              }`}
            >
              +91 96625 72826
            </a>
          </div>
        </div>

        {/* Emergency Helplines (Full Width) */}
        <div className={`p-8 rounded-3xl backdrop-blur-xl transition-colors duration-700 text-center ${
          isDark 
            ? "bg-amber-500/5 border border-amber-500/20" 
            : "bg-amber-50 border border-amber-200/50 shadow-sm"
        }`}>
          <h3 className={`text-xl font-semibold mb-3 transition-colors duration-700 ${
            isDark ? "text-amber-200" : "text-amber-900"
          }`}>Emergency Helplines</h3>
          <p className={`text-sm mb-6 max-w-2xl mx-auto transition-colors duration-700 ${
            isDark ? "text-amber-300/80" : "text-amber-800"
          }`}>
            Mansitra is an AI companion and not a replacement for professional help. If you are in a crisis, please contact these free helplines in India:
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
            <div className={`flex flex-col ${isDark ? "text-amber-300/80" : "text-amber-800"}`}>
              <span className="text-xs uppercase tracking-wider mb-1 font-semibold opacity-70">iCall (TISS)</span>
              <a href="tel:9152987821" className={`text-lg font-medium ${isDark ? "text-amber-200" : "text-amber-900"}`}>9152987821</a>
            </div>
            <div className={`flex flex-col ${isDark ? "text-amber-300/80" : "text-amber-800"}`}>
              <span className="text-xs uppercase tracking-wider mb-1 font-semibold opacity-70">Vandrevala Foundation</span>
              <a href="tel:18602662345" className={`text-lg font-medium ${isDark ? "text-amber-200" : "text-amber-900"}`}>1860-2662-345</a>
            </div>
            <div className={`flex flex-col ${isDark ? "text-amber-300/80" : "text-amber-800"}`}>
              <span className="text-xs uppercase tracking-wider mb-1 font-semibold opacity-70">AASRA</span>
              <a href="tel:9820466627" className={`text-lg font-medium ${isDark ? "text-amber-200" : "text-amber-900"}`}>9820466627</a>
            </div>
          </div>
        </div>

      </section>
      
      <Footer />
    </main>
  );
}
