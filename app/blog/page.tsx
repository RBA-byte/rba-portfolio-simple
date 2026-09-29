import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BlogHeader from "@/components/BlogHeader";
import ContactPill from "@/components/ContactPill";
import { clusterOrder, getPostsByCluster } from "@/lib/blogPosts";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const description =
  "Wedding photography and film guides for Lahore: choosing a photographer, pricing and packages, styles and seasons, luxury weddings, cinematic films and the best locations and venues.";

export const metadata: Metadata = {
  title: "Wedding Photography Journal: Guides for Lahore Weddings",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Wedding Photography Journal | RBA Films & Photography",
    description,
    type: "website",
    url: "/blog",
    siteName: SITE_NAME,
  },
};

const clusterIntro: Record<string, string> = {
  "Choosing a Photographer":
    "How to choose, compare and book a wedding photographer in Lahore.",
  "Wedding Photography":
    "Styles, seasons, light and what each wedding event asks of your photographer.",
  "Luxury Weddings":
    "Planning a luxury wedding, and what a premium package really includes.",
  "Cinematic Films":
    "The craft behind cinematic wedding films, and how they differ from a wedding video.",
  "Lahore Locations":
    "Where to shoot: locations, venues and neighbourhoods across Lahore.",
  "Studio Stories": "Notes from the studio and from the wedding day.",
};

export default function BlogIndexPage() {
  const groups = clusterOrder
    .map((cluster) => ({ cluster, posts: getPostsByCluster(cluster) }))
    .filter((group) => group.posts.length > 0);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RBA Films & Photography Journal",
    description,
    url: absoluteUrl("/blog"),
    hasPart: groups.flatMap((group) =>
      group.posts.map((post) => ({
        "@type": "Article",
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
      }))
    ),
  };

  return (
    <div className="min-h-screen bg-[#22242a] text-[#e8e8e8]">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <BlogHeader />
      <ContactPill />

      <main className="mx-auto max-w-5xl px-6 pb-20 pt-28 sm:px-10 sm:pt-32">
        <nav aria-label="Breadcrumb" className="mb-6 text-[0.72rem] font-light text-[#e8e8e8]/50">
          <Link href="/" className="hover:text-[#e8e8e8]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Journal</span>
        </nav>

        <h1 className="font-display text-3xl leading-tight sm:text-5xl">
          Wedding Photography Journal
        </h1>
        <p className="mt-5 max-w-2xl text-[1rem] font-light leading-relaxed text-[#e8e8e8]/80">
          Guides from RBA Films &amp; Photography on choosing a wedding photographer in Lahore,
          what it costs, how the styles differ and where the light is best. Questions?{" "}
          <Link href="/faq" className="underline decoration-white/30 underline-offset-4 hover:text-[#e8e8e8]">
            Read the FAQs
          </Link>
          .
        </p>

        {groups.map((group) => (
          <section key={group.cluster} className="mt-16">
            <h2 className="font-display text-2xl sm:text-[1.9rem]">{group.cluster}</h2>
            <p className="mt-2 text-[0.9rem] font-light text-[#e8e8e8]/60">
              {clusterIntro[group.cluster]}
            </p>
            <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {group.posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                    <Image
                      src={post.featuredImage.desktop}
                      alt={post.featuredImage.alt}
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
                      className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {post.role === "pillar" && (
                    <span className="mt-4 block text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[#e8e8e8]/55">
                      Complete guide
                    </span>
                  )}
                  <h3 className={`font-display text-lg leading-snug text-[#e8e8e8] ${post.role === "pillar" ? "mt-1.5" : "mt-4"}`}>
                    {post.title}
                  </h3>
                  <p className="mt-1.5 text-[0.85rem] font-light leading-relaxed text-[#e8e8e8]/70">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
