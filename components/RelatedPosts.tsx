import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types";

export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-white/10 py-12 sm:py-16">
      <h2 className="px-6 font-display text-2xl text-[#e8e8e8] sm:px-10 sm:text-[1.7rem]">
        More from the Journal
      </h2>
      <div className="no-scrollbar mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:px-10">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group w-[78%] flex-shrink-0 snap-center sm:w-[340px]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
              <Image
                src={post.featuredImage.desktop}
                alt={post.featuredImage.alt}
                fill
                sizes="(min-width: 640px) 340px, 78vw"
                className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-display text-lg leading-snug text-[#e8e8e8]">
              {post.title}
            </h3>
            <p className="mt-1.5 text-[0.85rem] font-light leading-relaxed text-[#e8e8e8]/70">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
