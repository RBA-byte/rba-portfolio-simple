"use client";

import Link from "next/link";
import Image from "next/image";
import BlogHeader from "@/components/BlogHeader";
import BlogFeaturedImage from "@/components/BlogFeaturedImage";
import ContactPill from "@/components/ContactPill";
import RelatedPosts from "@/components/RelatedPosts";
import { photographerBio, socialLinks, studio } from "@/lib/content";
import { getRelatedPosts } from "@/lib/blogPosts";
import type { BlogPost } from "@/types";

export default function BlogPostView({
  post,
  publishedDisplay,
}: {
  post: BlogPost;
  publishedDisplay: string;
}) {
  const related = getRelatedPosts(post.slug, 4);

  return (
    <div className="min-h-screen bg-[#22242a] text-[#e8e8e8]">
      <BlogHeader />
      <ContactPill />

      {/* Edge-to-edge on mobile; padded on both sides on desktop. The
          image's own 3/4 aspect ratio (set in BlogFeaturedImage) stays
          the same at every breakpoint. */}
      <div className="md:mx-auto md:max-w-5xl md:px-10 md:pt-8">
        <BlogFeaturedImage image={post.featuredImage} title={post.title} decorativeTitle={post.decorativeTitle} />
      </div>

      <article className="mx-auto max-w-2xl px-6 py-12 sm:px-10 sm:py-16">
        {/* Visible breadcrumb trail (matches the BreadcrumbList schema) */}
        <nav aria-label="Breadcrumb" className="mb-6 text-[0.72rem] font-light text-[#e8e8e8]/50">
          <Link href="/" className="hover:text-[#e8e8e8]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Journal</span>
        </nav>

        {/* The real, crawlable page heading — the large text on the
            photo above is decorative only (see EditorialImage). */}
        <h1 className="font-display text-3xl leading-tight text-[#e8e8e8] sm:text-4xl">
          {post.title}
        </h1>

        <p className="mb-8 mt-4 text-[0.72rem] font-light uppercase tracking-[0.16em] text-[#e8e8e8]/50">
          <time dateTime={post.publishedAt}>{publishedDisplay}</time>
        </p>

        {post.blocks.map((block, i) =>
          block.type === "heading" ? (
            <h2
              key={i}
              className="mb-4 mt-10 font-display text-2xl leading-snug text-[#e8e8e8] first:mt-0 sm:text-[1.7rem]"
            >
              {block.text}
            </h2>
          ) : (
            <p
              key={i}
              className="mb-5 text-[0.98rem] font-light leading-relaxed text-[#e8e8e8]/85"
            >
              {block.text}
            </p>
          )
        )}

        {/* FAQs — visible, and mirrored as FAQPage schema in page.tsx */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="mt-12 border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl leading-snug text-[#e8e8e8] sm:text-[1.7rem]">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 flex flex-col gap-6">
              {post.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-[0.98rem] font-medium text-[#e8e8e8]">{faq.question}</h3>
                  <p className="mt-1.5 text-[0.92rem] font-light leading-relaxed text-[#e8e8e8]/75">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Internal links — packages, contact, address, and a direct
            enquiry, so every post feeds back into a booking. */}
        <div className="mt-12 border-t border-white/10 pt-10 text-center">
          <p className="font-display text-xl text-[#e8e8e8] sm:text-2xl">
            Ready to plan your wedding?
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.78rem] font-light uppercase tracking-[0.14em] text-[#e8e8e8]/80">
            <Link href="/#packages" className="underline decoration-white/30 underline-offset-4 hover:text-[#e8e8e8]">
              View Packages
            </Link>
            <Link href="/#contact" className="underline decoration-white/30 underline-offset-4 hover:text-[#e8e8e8]">
              Contact Us
            </Link>
            <Link href="/#studio" className="underline decoration-white/30 underline-offset-4 hover:text-[#e8e8e8]">
              Visit the Studio
            </Link>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/30 underline-offset-4 hover:text-[#e8e8e8]"
            >
              Enquire on WhatsApp
            </a>
          </div>
          <p className="mt-4 text-[0.78rem] font-light text-[#e8e8e8]/50">{studio.addressLines.join(", ")}</p>
        </div>

        {/* Photographer bio — a real byline for E-E-A-T */}
        <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-10">
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src={photographerBio.avatar}
              alt={photographerBio.name}
              fill
              sizes="56px"
              className="object-cover grayscale"
            />
          </div>
          <div>
            <p className="text-[0.92rem] font-medium text-[#e8e8e8]">{photographerBio.name}</p>
            <p className="text-[0.72rem] font-light uppercase tracking-[0.1em] text-[#e8e8e8]/50">
              {photographerBio.role}
            </p>
            <p className="mt-1.5 text-[0.85rem] font-light leading-relaxed text-[#e8e8e8]/70">
              {photographerBio.bio}
            </p>
          </div>
        </div>
      </article>

      <RelatedPosts posts={related} />
    </div>
  );
}
