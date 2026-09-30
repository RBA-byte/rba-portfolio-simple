import Link from "next/link";
import type { FaqItem } from "@/types";

/**
 * A short FAQ block for blog posts. The questions are chosen deterministically
 * on the server, ranked by relevance to the post's topic (see pickFaqs in
 * lib/faqs.ts), and each links to its answer on /faq.
 */
export default function FaqBlock({ faqs }: { faqs: FaqItem[] }) {
  if (faqs.length === 0) return null;

  return (
    <div className="mt-12 border-t border-white/10 pt-10">
      <h2 className="font-display text-2xl leading-snug text-[#e8e8e8] sm:text-[1.7rem]">
        Frequently Asked Questions
      </h2>
      <div className="mt-6 flex flex-col gap-6">
        {faqs.map((faq) => (
          <div key={faq.id}>
            <h3 className="text-[0.98rem] font-medium text-[#e8e8e8]">
              <Link
                href={`/faq#${faq.id}`}
                className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-white/40"
              >
                {faq.question}
              </Link>
            </h3>
            <p className="mt-1.5 text-[0.92rem] font-light leading-relaxed text-[#e8e8e8]/75">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
      <Link
        href="/faq"
        className="mt-8 inline-block text-[0.78rem] font-light uppercase tracking-[0.14em] text-[#e8e8e8]/80 underline decoration-white/30 underline-offset-4 hover:text-[#e8e8e8]"
      >
        View all FAQs
      </Link>
    </div>
  );
}
