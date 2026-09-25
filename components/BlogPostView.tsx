"use client";

import BlogHeader from "@/components/BlogHeader";
import BlogFeaturedImage from "@/components/BlogFeaturedImage";
import ContactPill from "@/components/ContactPill";
import type { BlogPost } from "@/types";

export default function BlogPostView({
  post,
  publishedDisplay,
}: {
  post: BlogPost;
  publishedDisplay: string;
}) {
  return (
    <div className="min-h-screen bg-[#22242a] text-[#e8e8e8]">
      <BlogHeader />
      <ContactPill />

      {/* Edge-to-edge on mobile; padded on both sides on desktop. The
          image's own 3/4 aspect ratio (set in BlogFeaturedImage) stays
          the same at every breakpoint. */}
      <div className="md:mx-auto md:max-w-5xl md:px-10 md:pt-8">
        <BlogFeaturedImage image={post.featuredImage} title={post.title} />
      </div>

      <article className="mx-auto max-w-2xl px-6 py-12 sm:px-10 sm:py-16">
        <p className="mb-8 text-[0.72rem] font-light uppercase tracking-[0.16em] text-[#e8e8e8]/50">
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
      </article>
    </div>
  );
}
