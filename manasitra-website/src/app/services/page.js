import Navbar from "@/shared/components/navbar";
import MultiLayerBackground from "@/components/landing/MultiLayerBackground";

export const metadata = {
  title: "Features & Services — Mansitra",
  description: "Explore the features and services offered by Mansitra, including our anonymous AI companion, multilingual support, calming mini-games, and mood tracking.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen relative font-sans text-neutral-800 dark:text-neutral-200">
      <MultiLayerBackground />
      <Navbar />
      
      <section className="relative pt-40 pb-24 px-6 max-w-5xl mx-auto z-10 min-h-screen">
        <h1 className="text-4xl md:text-6xl font-medium mb-8 text-black dark:text-white">Features & Tools</h1>
        <p className="text-xl font-serif text-neutral-600 dark:text-neutral-300 mb-12">
          Discover the tools we built to help you navigate stress, anxiety, and daily challenges.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Anonymous AI Chat",
              desc: "A judgment-free space to vent, express yourself, and find clarity without fear of exposure."
            },
            {
              title: "10+ Regional Languages",
              desc: "Chat comfortably in Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, and more."
            },
            {
              title: "Calming Mini-Games",
              desc: "Interactive grounding exercises and puzzles to quickly relieve panic and regain focus."
            },
            {
              title: "Self-Reflection Tools",
              desc: "Track your emotional well-being without any logs tracking back to your real identity."
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/60 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 backdrop-blur-xl">
              <h3 className="text-xl font-semibold mb-3 text-black dark:text-white">{feature.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
