import type { Metadata } from "next";
import Link from "next/link";
import BlogHeader from "@/components/BlogHeader";
import ContactPill from "@/components/ContactPill";
import { faqs, faqsByCategory } from "@/lib/faqs";
import { pillarPosts } from "@/lib/blogPosts";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import { socialLinks } from "@/lib/content";

const description =
  "Answers to common questions about wedding photography and cinematic wedding films in Lahore: pricing, packages, booking, coverage, Mehndi, Nikah, Baraat and Walima, albums and delivery.";

export const metadata: Metadata = {
  title: "Wedding Photography FAQs: Pricing, Packages & Booking in Lahore",
  description,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Wedding Photography FAQs | RBA Films & Photography",
    description,
    type: "website",
    url: "/faq",
    siteName: SITE_NAME,
  },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "FAQ", item: absoluteUrl("/faq") },
    ],
  };

  return (
    <div className="min-h-screen bg-[#22242a] text-[#e8e8e8]">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <BlogHeader label="FAQ" />
      <ContactPill />

      <main className="mx-auto max-w-2xl px-6 pb-20 pt-28 sm:px-10 sm:pt-32">
        <nav aria-label="Breadcrumb" className="mb-6 text-[0.72rem] font-light text-[#e8e8e8]/50">
          <Link href="/" className="hover:text-[#e8e8e8]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>FAQ</span>
        </nav>

        <h1 className="font-display text-3xl leading-tight sm:text-4xl">
          Wedding Photography &amp; Film FAQs
        </h1>
        <p className="mt-5 text-[0.98rem] font-light leading-relaxed text-[#e8e8e8]/80">
          Everything couples ask us before booking a wedding photographer and filmmaker in Lahore.
          Can&apos;t find your question?{" "}
          <Link href="/#contact" className="underline decoration-white/30 underline-offset-4 hover:text-[#e8e8e8]">
            Contact us
          </Link>{" "}
          or{" "}
          <a
            href={socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/30 underline-offset-4 hover:text-[#e8e8e8]"
          >
            message us on WhatsApp
          </a>
          .
        </p>

        {/* Jump links */}
        <nav aria-label="FAQ categories" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-y border-white/10 py-5 text-[0.75rem] font-light uppercase tracking-[0.12em] text-[#e8e8e8]/70">
          {faqsByCategory.map((group) => (
            <a
              key={group.category}
              href={`#${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="underline decoration-transparent underline-offset-4 transition-colors hover:text-[#e8e8e8] hover:decoration-white/40"
            >
              {group.category}
            </a>
          ))}
        </nav>

        {faqsByCategory.map((group) => (
          <section
            key={group.category}
            id={group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            className="scroll-mt-24"
          >
            <h2 className="mb-6 mt-14 font-display text-2xl leading-snug sm:text-[1.7rem]">
              {group.category}
            </h2>
            <div className="flex flex-col gap-8">
              {group.items.map((faq) => (
                <div key={faq.id} id={faq.id} className="scroll-mt-24">
                  <h3 className="text-[1rem] font-medium text-[#e8e8e8]">{faq.question}</h3>
                  <p className="mt-2 text-[0.95rem] font-light leading-relaxed text-[#e8e8e8]/75">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Guides */}
        <section className="mt-16 border-t border-white/10 pt-10">
          <h2 className="font-display text-2xl leading-snug sm:text-[1.7rem]">
            Read the guides
          </h2>
          <ul className="mt-5 flex flex-col gap-3 text-[0.95rem] font-light text-[#e8e8e8]/80">
            {pillarPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="underline decoration-white/30 underline-offset-4 hover:text-[#e8e8e8]"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14 border-t border-white/10 pt-10 text-center">
          <p className="font-display text-xl sm:text-2xl">Ready to plan your wedding?</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.78rem] font-light uppercase tracking-[0.14em] text-[#e8e8e8]/80">
            <Link href="/#packages" className="underline decoration-white/30 underline-offset-4 hover:text-[#e8e8e8]">
              View Packages
            </Link>
            <Link href="/#contact" className="underline decoration-white/30 underline-offset-4 hover:text-[#e8e8e8]">
              Contact Us
            </Link>
            <Link href="/blog" className="underline decoration-white/30 underline-offset-4 hover:text-[#e8e8e8]">
              Journal
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
