import Navbar from "@/shared/components/navbar";
import MultiLayerBackground from "@/components/landing/MultiLayerBackground";

export const metadata = {
  title: "Contact Us — Mansitra",
  description: "Get in touch with the Mansitra team. We are here to support students and address any questions or concerns.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen relative font-sans text-neutral-800 dark:text-neutral-200">
      <MultiLayerBackground />
      <Navbar />
      
      <section className="relative pt-40 pb-24 px-6 max-w-3xl mx-auto z-10 min-h-screen">
        <h1 className="text-4xl md:text-6xl font-medium mb-8 text-black dark:text-white">Contact Us</h1>
        <p className="text-xl font-serif text-neutral-600 dark:text-neutral-300 mb-12">
          We would love to hear from you. Whether you have feedback, questions, or just want to say hi, reach out to us.
        </p>

        <div className="p-8 rounded-3xl bg-white/60 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 backdrop-blur-xl mb-12">
          <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">Get In Touch</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            For inquiries, feedback, or support, please reach out to us via email or our social media channels.
          </p>
          <a href="mailto:support@mansitra.in" className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full transition-colors">
            Email Support
          </a>
        </div>

        <div className="p-8 rounded-3xl bg-amber-50/50 dark:bg-amber-500/5 border border-amber-200/50 dark:border-amber-500/20 backdrop-blur-xl">
          <h3 className="text-xl font-semibold mb-3 text-amber-900 dark:text-amber-200">Emergency Helplines</h3>
          <p className="text-amber-800 dark:text-amber-300 mb-4 text-sm">
            Mansitra is an AI companion and not a replacement for professional help. If you are in a crisis, please contact these free helplines in India:
          </p>
          <ul className="list-disc pl-5 text-sm text-amber-800 dark:text-amber-300 space-y-2">
            <li><strong>iCall (TISS):</strong> 9152987821</li>
            <li><strong>Vandrevala Foundation:</strong> 1860-2662-345</li>
            <li><strong>AASRA:</strong> 9820466627</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
