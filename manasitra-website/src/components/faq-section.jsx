import { faqData } from "@/lib/faq-data";

export default function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Questions, answered</p>
        <h2 id="faq-heading" className="mb-10 text-4xl font-medium tracking-tight text-black">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqData.map((item) => (
            <details key={item.question} className="rounded-2xl border border-black/10 bg-white/80 p-5">
              <summary className="cursor-pointer font-semibold text-black">{item.question}</summary>
              <p className="mt-3 leading-relaxed text-neutral-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
