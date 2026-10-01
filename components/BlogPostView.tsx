import Link from "next/link";
import Image from "next/image";
import BlogHeader from "@/components/BlogHeader";
import BlogFeaturedImage from "@/components/BlogFeaturedImage";
import ContactPill from "@/components/ContactPill";
import RelatedPosts from "@/components/RelatedPosts";
import RichText from "@/components/RichText";
import FaqBlock from "@/components/FaqBlock";
import { photographerBio, socialLinks, studio } from "@/lib/content";
import type { BlogPost, FaqItem } from "@/types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Server component: the post data, related posts and the randomly picked
 * FAQs are all resolved in app/blog/[slug]/page.tsx and passed in, so the
 * full blog library is never shipped to the browser.
 */
export default function BlogPostView({
  post,
  publishedDisplay,
  related,
  faqs,
  pillar,
}: {
  post: BlogPost;
  publishedDisplay: string;
  related: BlogPost[];
  faqs: FaqItem[];
  /** For support posts: the pillar guide this post belongs to. */
  pillar?: BlogPost;
}) {
  const headings = post.blocks.filter((block) => block.type === "heading");
  const showToc = post.role === "pillar" && headings.length >= 5;

  return (
    <div className="no-copy min-h-screen bg-[#22242a] text-[#e8e8e8]">
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
          <Link href="/blog" className="hover:text-[#e8e8e8]">
            Journal
          </Link>
        </nav>

        {/* The real, crawlable page heading — the large text on the
            photo above is decorative only (see EditorialImage). */}
        <h1 className="font-display text-3xl leading-tight text-[#e8e8e8] sm:text-4xl">
          {post.title}
        </h1>

        <p className="mb-8 mt-4 text-[0.72rem] font-light uppercase tracking-[0.16em] text-[#e8e8e8]/50">
          <time dateTime={post.publishedAt}>{publishedDisplay}</time>
          <span className="mx-2">·</span>
          <span>{post.cluster}</span>
        </p>

        {/* Support posts point up to their pillar guide */}
        {pillar && (
          <p className="mb-8 border-l border-white/20 pl-4 text-[0.85rem] font-light leading-relaxed text-[#e8e8e8]/70">
            Part of our guide:{" "}
            <Link
              href={`/blog/${pillar.slug}`}
              className="underline decoration-white/30 underline-offset-4 hover:text-[#e8e8e8]"
            >
              {pillar.title}
            </Link>
          </p>
        )}

        {/* "In this guide" — jump links for the long pillar posts */}
        {showToc && (
          <nav aria-label="In this guide" className="mb-10 border border-white/10 px-5 py-5">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#e8e8e8]/60">
              In this guide
            </p>
            <ol className="mt-3 flex flex-col gap-1.5 text-[0.88rem] font-light text-[#e8e8e8]/80">
              {headings.map((block) => (
                <li key={block.text}>
                  <a
                    href={`#${slugify(block.text)}`}
                    className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-white/40"
                  >
                    {block.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {post.blocks.map((block, i) => {
          switch (block.type) {
            case "heading":
              return (
                <h2
                  key={i}
                  id={slugify(block.text)}
                  className="mb-4 mt-10 scroll-mt-24 font-display text-2xl leading-snug text-[#e8e8e8] first:mt-0 sm:text-[1.7rem]"
                >
                  {block.text}
                </h2>
              );
            case "subheading":
              return (
                <h3 key={i} className="mb-3 mt-7 font-display text-xl leading-snug text-[#e8e8e8]">
                  {block.text}
                </h3>
              );
            case "list": {
              const ListTag = block.ordered ? "ol" : "ul";
              return (
                <ListTag
                  key={i}
                  className={`mb-6 flex flex-col gap-2.5 pl-5 text-[0.98rem] font-light leading-relaxed text-[#e8e8e8]/85 marker:text-[#e8e8e8]/40 ${
                    block.ordered ? "list-decimal" : "list-disc"
                  }`}
                >
                  {block.items.map((item) => (
                    <li key={item}>
                      <RichText text={item} />
                    </li>
                  ))}
                </ListTag>
              );
            }
            default:
              return (
                <p key={i} className="mb-5 text-[0.98rem] font-light leading-relaxed text-[#e8e8e8]/85">
                  <RichText text={block.text} />
                </p>
              );
          }
        })}

        {/* 3–4 random FAQs, each linking to the full /faq page */}
        <FaqBlock faqs={faqs} />

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
