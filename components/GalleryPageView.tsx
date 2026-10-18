import Link from "next/link";
import BlogHeader from "@/components/BlogHeader";
import BlogGallery from "@/components/BlogGallery";
import ContactPill from "@/components/ContactPill";
import { faqs } from "@/lib/faqs";
import { galleryPages, type GalleryPage } from "@/lib/galleryPages";
import { photographerBio, socialLinks } from "@/lib/content";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

const link = "underline decoration-white/30 underline-offset-4 hover:text-[#e8e8e8]";
const h2 = "mt-12 font-display text-2xl leading-snug sm:text-[1.7rem]";

/**
 * One gallery page, built entirely from an entry in lib/galleryPages.ts.
 * Used by app/gallery/[slug]/page.tsx and the root-level main page.
 */
export default function GalleryPageView({ page }: { page: GalleryPage }) {
  const url = absoluteUrl(page.path);
  const year = new Date().getFullYear();
  const pageFaqs = (page.faqIds ?? [])
    .map((id) => faqs.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));
  const otherGalleries = galleryPages.filter((p) => p.path !== page.path).slice(0, 6);

  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${url}#gallery`,
    name: page.h1,
    description: page.description,
    url,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#business` },
    primaryImageOfPage: { "@type": "ImageObject", contentUrl: absoluteUrl(page.images[0].src) },
    image: page.images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(img.src),
      url: absoluteUrl(img.src),
      name: img.alt,
      caption: img.caption,
      description: img.caption,
      width: 1080,
      height: 1350,
      creator: { "@type": "Person", name: photographerBio.name },
      creditText: SITE_NAME,
      copyrightNotice: `© ${year} ${SITE_NAME}`,
    })),
  };

  // Home › Gallery › This page
  const crumbs = [
    { name: "Home", item: absoluteUrl("/") },
    { name: "Gallery", item: absoluteUrl("/gallery") },
    { name: page.h1, item: url },
  ];
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  };

  return (
    <div className="min-h-screen bg-[#22242a] text-[#e8e8e8]">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }} />
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
          <Link href="/gallery" className="hover:text-[#e8e8e8]">
            Gallery
          </Link>
          <span className="mx-2">/</span>
          <span>{page.h1}</span>
        </nav>

        <h1 className="font-display text-3xl leading-tight sm:text-4xl">{page.h1}</h1>
        <p className="mt-5 text-[0.98rem] font-light leading-relaxed text-[#e8e8e8]/80">{page.intro}</p>

        {/* Instagram-style grid + post view (same component as the blog) */}
        <h2 className={h2}>{page.galleryHeading}</h2>
        <BlogGallery images={page.images} postTitle={page.h1} postPath={page.path} />

        {page.sections?.map((section) => (
          <section key={section.heading}>
            <h2 className={h2}>{section.heading}</h2>
            {section.paragraphs.map((text, i) => (
              <p key={i} className="mt-4 text-[0.95rem] font-light leading-relaxed text-[#e8e8e8]/80">
                {text}
              </p>
            ))}
          </section>
        ))}

        {page.guides && page.guides.length > 0 && (
          <section>
            <h2 className={h2}>Planning Your Wedding Photography</h2>
            <ul className="mt-4 flex flex-col gap-3 text-[0.95rem] font-light text-[#e8e8e8]/80">
              {page.guides.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className={link}>
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {pageFaqs.length > 0 && (
          <div className="mt-12 border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl leading-snug sm:text-[1.7rem]">Frequently Asked Questions</h2>
            <div className="mt-6 flex flex-col gap-6">
              {pageFaqs.map((faq) => (
                <div key={faq.id}>
                  <h3 className="text-[0.98rem] font-medium">
                    <Link
                      href={`/faq#${faq.id}`}
                      className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-white/40"
                    >
                      {faq.question}
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-[0.92rem] font-light leading-relaxed text-[#e8e8e8]/75">{faq.answer}</p>
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
        )}

        {/* Auto-generated links to the other gallery pages */}
        {otherGalleries.length > 0 && (
          <section className="mt-12 border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl leading-snug sm:text-[1.7rem]">More Galleries</h2>
            <ul className="mt-4 flex flex-col gap-3 text-[0.95rem] font-light text-[#e8e8e8]/80">
              {otherGalleries.map((g) => (
                <li key={g.path}>
                  <Link href={g.path} className={link}>
                    {g.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-14 border-t border-white/10 pt-10 text-center">
          <p className="font-display text-xl sm:text-2xl">Ready to plan your wedding?</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.78rem] font-light uppercase tracking-[0.14em] text-[#e8e8e8]/80">
            <Link href="/#packages" className={link}>
              View Packages
            </Link>
            <Link href="/#contact" className={link}>
              Contact Us
            </Link>
            <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className={link}>
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
