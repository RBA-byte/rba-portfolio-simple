import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlogHeader from "@/components/BlogHeader";
import ContactPill from "@/components/ContactPill";
import { galleryPages } from "@/lib/galleryPages";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const description =
  "Wedding photography galleries from Lahore: Mehndi, Nikah, Baraat and Walima portraits and moments by RBA Films & Photography.";

// This index is for visitors to browse. It is kept out of Google's results
// on purpose: its title would overlap with the main gallery page's, and two
// pages for one search split the ranking. Links still pass through ("follow").
// Once you have 5+ galleries you can remove the `robots` line and give this
// page its own, different title (for example "Wedding Photo Galleries by
// Event and Location") if you want it to rank too.
export const metadata: Metadata = {
  title: "Wedding Photography Galleries",
  description,
  robots: { index: false, follow: true },
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Wedding Photography Gallery in Lahore | RBA Films & Photography",
    description,
    type: "website",
    url: "/gallery",
    siteName: SITE_NAME,
  },
};

export default function GalleryIndexPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Gallery", item: absoluteUrl("/gallery") },
    ],
  };

  return (
    <div className="min-h-screen bg-[#22242a] text-[#e8e8e8]">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <BlogHeader label="GALLERY" />
      <ContactPill />

      <main className="mx-auto max-w-2xl px-6 pb-20 pt-28 sm:px-10 sm:pt-32">
        <nav aria-label="Breadcrumb" className="mb-6 text-[0.72rem] font-light text-[#e8e8e8]/50">
          <Link href="/" className="hover:text-[#e8e8e8]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Gallery</span>
        </nav>

        <h1 className="font-display text-3xl leading-tight sm:text-4xl">Wedding Photography Gallery</h1>
        <p className="mt-5 text-[0.98rem] font-light leading-relaxed text-[#e8e8e8]/80">
          Browse our wedding photography from Lahore, grouped by event and location. Tap a gallery to
          see the photos.
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-[2px] sm:grid-cols-3">
          {galleryPages.map((page) => (
            <li key={page.path}>
              <Link href={page.path} className="group relative block aspect-[4/5] overflow-hidden bg-[#131210]">
                <Image
                  src={page.images[0].src}
                  alt={page.images[0].alt}
                  fill
                  sizes="(min-width: 672px) 224px, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"
                />
                <span
                  className="absolute inset-x-2 bottom-2 text-[0.78rem] font-medium leading-snug text-white"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
                >
                  {page.navLabel}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
