import Navbar from "@/shared/components/navbar";
import MultiLayerBackground from "@/components/landing/MultiLayerBackground";

export const metadata = {
  title: "Privacy Policy — Mansitra",
  description: "Privacy policy and terms of service for Mansitra. Learn how we protect your data and ensure your anonymity.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen relative font-sans text-neutral-800 dark:text-neutral-200">
      <MultiLayerBackground />
      <Navbar />
      
      <section className="relative pt-40 pb-24 px-6 max-w-4xl mx-auto z-10 min-h-screen">
        <h1 className="text-4xl md:text-6xl font-medium mb-8 text-black dark:text-white">Privacy & Terms</h1>
        <p className="text-xl font-serif text-neutral-600 dark:text-neutral-300 mb-12">
          Your privacy is our utmost priority. Mansitra is built on the foundation of anonymity and trust.
        </p>

        <div className="space-y-8 text-neutral-600 dark:text-neutral-400">
          <div className="p-8 rounded-3xl bg-white/60 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">1. Absolute Privacy</h2>
            <p className="leading-relaxed">
              We do not track, store, or sell your personal conversations. Any data processed by our AI companion is ephemeral and is not tied back to your real-world identity.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/60 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">2. Data Collection</h2>
            <p className="leading-relaxed">
              Minimal login information (if any) is collected strictly for active user counting and basic service functionality. We do not require your real name, phone number, or social media accounts to use the core companion features.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/60 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">3. Terms of Use</h2>
            <p className="leading-relaxed">
              Mansitra is designed as a supplementary emotional wellness tool. It is not a substitute for professional clinical therapy or emergency medical services. By using Mansitra, you agree to these terms and understand the scope of our AI's capabilities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
