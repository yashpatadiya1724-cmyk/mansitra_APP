"use client";

import Navbar from "@/shared/components/navbar";
import MultiLayerBackground from "@/components/landing/MultiLayerBackground";
import { useEmotionTheme } from "@/context/ThemeContext";
import Footer from "@/shared/components/footer";

export default function PrivacyPolicyPage() {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";

  return (
    <main className={`min-h-screen relative font-sans transition-colors duration-700 ${
      isDark ? "text-neutral-200 bg-[#0d131f]" : "text-neutral-800 bg-[#faf9f8]"
    }`}>
      <MultiLayerBackground />
      <Navbar />
      
      <section className="relative pt-40 pb-24 px-6 max-w-4xl mx-auto z-10 min-h-screen">
        <h1 className={`text-4xl md:text-6xl font-medium mb-8 transition-colors duration-700 ${
          isDark ? "text-white" : "text-black"
        }`}>Privacy & Terms</h1>
        <p className={`text-xl font-serif mb-12 transition-colors duration-700 ${
          isDark ? "text-neutral-300" : "text-neutral-600"
        }`}>
          Your privacy is our utmost priority. Mansitra is built on the foundation of anonymity and trust.
        </p>

        <div className={`space-y-8 transition-colors duration-700 ${
          isDark ? "text-neutral-400" : "text-neutral-600"
        }`}>
          {[
            {
              title: "1. Absolute Privacy",
              desc: "We do not track, store, or sell your personal conversations. Any data processed by our AI companion is ephemeral and is not tied back to your real-world identity."
            },
            {
              title: "2. Data Collection",
              desc: "Minimal login information (if any) is collected strictly for active user counting and basic service functionality. We do not require your real name, phone number, or social media accounts to use the core companion features."
            },
            {
              title: "3. Terms of Use",
              desc: "Mansitra is designed as a supplementary emotional wellness tool. It is not a substitute for professional clinical therapy or emergency medical services. By using Mansitra, you agree to these terms and understand the scope of our AI's capabilities."
            }
          ].map((section, idx) => (
            <div key={idx} className={`p-8 rounded-3xl backdrop-blur-xl transition-colors duration-700 ${
              isDark 
                ? "bg-white/[0.04] border border-white/10" 
                : "bg-white/80 border border-black/5 shadow-sm"
            }`}>
              <h2 className={`text-2xl font-semibold mb-4 transition-colors duration-700 ${
                isDark ? "text-white" : "text-black"
              }`}>{section.title}</h2>
              <p className="leading-relaxed">{section.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
