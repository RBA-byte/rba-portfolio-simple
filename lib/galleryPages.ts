import type { Metadata } from "next";
import type { GalleryImage } from "@/types";
import { SITE_NAME } from "@/lib/site";

/**
 * ─────────────────────────  GALLERY PAGES  ─────────────────────────
 *
 * Every gallery page on the site is one entry in `galleryPages` below.
 * To add a page: copy the commented-out template at the bottom of this
 * file, fill it in, and upload its photos. That's it — the page, its
 * sitemap entry, structured data, the /gallery index and the "More
 * galleries" links are all generated from this list. No new folder, no
 * new page file.
 *
 * ADDRESS (`path`)
 *  Always "/gallery/<something>", e.g. "/gallery/mehndi-photography-lahore".
 *  Lowercase, words separated by hyphens, no spaces.
 *
 * PHOTOS
 *  - 1080 x 1350 (4:5) files in /public/images/gallery/, with descriptive
 *    names such as "mehndi-couple-portrait-lahore.webp".
 *  - Keep the count a multiple of 3 (9, 12, 18, 24…) so the last row of
 *    the 3-column grid is full.
 *  - `alt` = what is literally in the photo (Google Images reads it).
 *    `caption` = the short line shown in the post view. Make every alt
 *    and caption different — repeated text is a spam signal.
 *  - `views` / `likes` are optional; leave them out for steady made-up
 *    numbers.
 *
 * ─────────────  KEEPING PAGES FROM COMPETING (SEO)  ─────────────
 * Google ranks ONE page per search. If two pages go after the same search,
 * they split the ranking and both do worse. So every search has one owner:
 *
 *   Search                                        Owner
 *   wedding photographer in Lahore               → /gallery/wedding-photographer-in-lahore
 *   wedding photography Lahore                   → /gallery/wedding-photographer-in-lahore
 *   wedding photographer Lahore                  → /gallery/wedding-photographer-in-lahore
 *   how to choose a wedding photographer Lahore  → blog guide (…-lahore-guide)
 *   wedding photography styles / what to expect  → blog guide (…-styles-seasons)
 *   cinematic wedding photographer in Lahore     → homepage
 *
 * Add a row here for every new page BEFORE you build it. Rules:
 *  1. One topic per page: an event (Mehndi), an area (DHA, Gulberg), a
 *     service (pre-wedding). Never the broad phrases above.
 *  2. Don't put the broad phrase in a narrower page's title or H1: use
 *     "Mehndi Photography in Lahore", not "Wedding Photographer in Lahore".
 *  3. Own photos and own text for every page. No copied intros.
 *  4. The checks below stop the build if two pages share a path, title,
 *     H1 or description, and warn about the smaller mistakes.
 */

export interface GalleryPageSection {
  heading: string;
  /** One string per paragraph. */
  paragraphs: string[];
}

export interface GalleryPage {
  /** Full address. See the notes above. */
  path: string;
  /** Short name used in the "More galleries" list and the /gallery index. */
  navLabel: string;
  /** The <title>. Aim for ≤ 60 characters. This replaces the site-wide
   *  " | RBA Films & Photography" suffix, so add a brand if you want one. */
  title: string;
  /** Meta description, about 150–160 characters. */
  description: string;
  /** The page heading (H1). */
  h1: string;
  /** Opening paragraph under the heading. */
  intro: string;
  /** Heading above the photo grid. */
  galleryHeading: string;
  images: GalleryImage[];
  /** Optional text blocks shown under the gallery. */
  sections?: GalleryPageSection[];
  /** Optional "read more" links to blog guides (use real blog URLs). */
  guides?: { href: string; label: string }[];
  /** Ids from lib/faqs.ts to show on the page (optional). */
  faqIds?: string[];
  /** YYYY-MM-DD — used as the sitemap "last modified" date. */
  updated: string;
}

export const galleryPages: GalleryPage[] = [
  // ───────────────────────────── MAIN PAGE ─────────────────────────────
  {
    path: "/gallery/wedding-photographer-in-lahore",
    navLabel: "Wedding photographer in Lahore",
    title: "Wedding Photographer in Lahore: Photography Gallery | RBA Films",
    description:
      "Wedding photographer in Lahore. Browse our wedding photography gallery of Mehndi, Nikah, Baraat & Walima, shot candid and cinematic by RBA Films & Photography.",
    h1: "Wedding Photographer in Lahore",
    intro:
      "RBA Films & Photography is a wedding photographer and cinematic film studio in Mustafa Town, Lahore. Led by Syed Ammar, we photograph Mehndi, Nikah, Baraat and Walima in a candid, cinematic style: real moments, careful light and colour grading that suits the day. Browse recent wedding photography from Lahore below and tap any photo to open it.",
    galleryHeading: "Recent Wedding Photography in Lahore",
    // PLACEHOLDERS: these reuse homepage photos. Replace with your own
    // 1080 x 1350 gallery files (see the notes at the top of this file).
    images: [
      {
        src: "/images/rba-beautiful-bride-groom-baraat-gs-production-cinematic-wedding-lahore.webp",
        alt: "Bride in a red velvet dupatta and groom in a cream sherwani seated beneath a chandelier at a Baraat in Lahore",
        caption: "Baraat portrait beneath the chandeliers.",
      },
      {
        src: "/images/rba-beautiful-bride-groom-baraat-outdoor-intimate-shoot-cinematic-weddings-lahore.webp",
        alt: "Wedding couple embracing inside a white pillared gazebo, groom in a cream sherwani and bride in a red and peach lehenga",
        caption: "An intimate Baraat moment, just the two of them.",
      },
      {
        src: "/images/rba-beautiful-bride-groom-mehndi-outdoor-intimate-shoot-cinematic-weddings-lahore.webp",
        alt: "Mehndi couple facing each other, groom in a beige kurta with a dark waistcoat and bride in an emerald green embroidered lehenga",
        caption: "Mehndi colours: emerald, gold and a little laughter.",
      },
      {
        src: "/images/rba-beautiful-bride-groom-baraat-shoot-cinematic-wedding-lahore.webp",
        alt: "Groom in a white sherwani and tall turban leaning toward a bride in red against a red patterned rug backdrop",
        caption: "Baraat portrait with a red-and-white palette.",
      },
      {
        src: "/images/rba-beautiful-bride-groom-mehndi-cinematic-wedding-lahore.webp",
        alt: "Couple embracing in a golden-lit room with carved jali screens during a Mehndi shoot in Lahore",
        caption: "Warm light through carved jali screens.",
      },
      {
        src: "/images/rba-beautiful-bride-groom-waleema-outdoor-shoot-cinematic-wedding-lahore.webp",
        alt: "Walima couple walking hand in hand at night in front of a lit-up grand building in Lahore",
        caption: "Walima night walk in front of the lights.",
      },
      {
        src: "/images/rba-beautiful-bride-baraat-shoot-cinematic-weddings-lahore.webp",
        alt: "Bride in a red embroidered lehenga with a dupatta seen from behind in a dark hall lit by chandeliers",
        caption: "Bridal portrait under chandelier light.",
      },
      {
        src: "/images/rba-beautiful-bride-cinematic-wedding-shoot.webp",
        alt: "Bride in a dark embroidered outfit beside a fireplace with drifting smoke and a vase of red roses",
        caption: "Smoke, roses and fireplace glow: a cinematic bridal frame.",
      },
      {
        src: "/images/rba-beautiful-bride-baraat-gs-production-cinematic-wedding-lahore.webp",
        alt: "Bride in a red bridal dress seated in a warm-lit library with wooden shelves at a Lahore Baraat",
        caption: "A quiet bridal moment in the library.",
      },
    ],
    sections: [
      {
        heading: "Wedding Photography Lahore: Every Event Covered",
        paragraphs: [
          "A Lahore wedding runs over several days, and each event looks different. We cover the Mehndi for colour and dance, the Nikah for its quiet, emotional moments, the Baraat for the entrance, the family and the decor, and the Walima for the final portraits.",
        ],
      },
      {
        heading: "Why Couples Choose RBA Films & Photography",
        paragraphs: [
          "A Sony Best Retoucher Award winner and two-time Best Photographer honoree at the All Pakistan Photography Competition, Ammar has spent 6+ years photographing candid, cinematic weddings across Lahore. Photography and cinematic wedding films come from one team, so your photos and your film share the same look and the same direction on the day.",
        ],
      },
    ],
    guides: [
      {
        href: "/blog/wedding-photographer-in-lahore-guide",
        label: "How to choose a wedding photographer in Lahore",
      },
      {
        href: "/blog/wedding-photography-in-lahore-styles-seasons",
        label: "Wedding photography in Lahore: styles, events and what to expect",
      },
      {
        href: "/blog/mehndi-nikah-baraat-walima-wedding-photography",
        label: "Mehndi, Nikah, Baraat and Walima photography",
      },
      {
        href: "/blog/how-much-does-wedding-photography-cost-in-lahore",
        label: "Wedding photography cost in Lahore",
      },
      {
        href: "/blog/best-wedding-photography-locations-in-lahore",
        label: "Best wedding photography locations in Lahore",
      },
    ],
    faqIds: [
      "wedding-photography-cost-lahore",
      "how-far-in-advance-to-book",
      "cover-mehndi-nikah-baraat-walima",
      "photography-and-videography",
    ],
    updated: "2026-10-18",
  },

  // ─────────────────────────────  TEMPLATE  ─────────────────────────────
  // To add a gallery page: copy this block ABOVE this comment (inside the
  // array), remove the `//` markers, and fill it in. Example topics: an
  // event ("Mehndi photography in Lahore"), an area ("Wedding photography
  // in DHA Lahore") or a service ("Pre-wedding shoots in Lahore").
  //
  // {
  //   path: "/gallery/mehndi-photography-lahore",
  //   navLabel: "Mehndi photography in Lahore",
  //   title: "Mehndi Photography in Lahore: Photo Gallery | RBA Films",
  //   description:
  //     "Mehndi photography in Lahore: a gallery of colourful, candid Mehndi portraits and moments by RBA Films & Photography.",
  //   h1: "Mehndi Photography in Lahore",
  //   intro: "Two or three sentences about this topic, written for people.",
  //   galleryHeading: "Mehndi Photography in Lahore: Recent Work",
  //   images: [
  //     {
  //       src: "/images/gallery/mehndi-couple-portrait-lahore.webp",
  //       alt: "What is literally in the photo",
  //       caption: "Short caption shown in the post view.",
  //     },
  //     // …9, 12, 18 or 24 photos
  //   ],
  //   sections: [{ heading: "Optional heading", paragraphs: ["Optional text."] }],
  //   guides: [{ href: "/blog/mehndi-nikah-baraat-walima-wedding-photography", label: "Our Mehndi guide" }],
  //   faqIds: ["cover-mehndi-nikah-baraat-walima"],
  //   updated: "2026-11-01",
  // },
];

export function getGalleryPage(path: string): GalleryPage | undefined {
  return galleryPages.find((p) => p.path === path);
}

export const galleryPathFromSlug = (slug: string) => `/gallery/${slug}`;
export const gallerySlugFromPath = (path: string) => path.replace("/gallery/", "");

/**
 * Build-time safety net (runs whenever the list is loaded, so mistakes show
 * up while you work and block a bad deploy). Throws on anything that would
 * make two pages compete or break a page; warns on smaller slips.
 */
function checkGalleryPages(pages: GalleryPage[]) {
  const seen: Record<"path" | "title" | "h1" | "description", Map<string, string>> = {
    path: new Map(),
    title: new Map(),
    h1: new Map(),
    description: new Map(),
  };
  const photoOwner = new Map<string, string>();

  for (const page of pages) {
    if (!/^\/gallery\/[a-z0-9]+(-[a-z0-9]+)*$/.test(page.path)) {
      throw new Error(
        `Gallery page "${page.path}": the path must look like /gallery/mehndi-photography-lahore (lowercase, hyphens, no spaces).`
      );
    }
    if (page.images.length === 0) {
      throw new Error(`Gallery page "${page.path}" has no images.`);
    }
    for (const field of ["path", "title", "h1", "description"] as const) {
      const key = page[field].trim().toLowerCase();
      const other = seen[field].get(key);
      if (other) {
        throw new Error(
          `Gallery pages "${other}" and "${page.path}" have the same ${field}. Two pages with the same ${field} compete in Google: give each its own topic (see the notes at the top of lib/galleryPages.ts).`
        );
      }
      seen[field].set(key, page.path);
    }

    if (page.images.length % 3 !== 0) {
      console.warn(`[gallery] ${page.path}: ${page.images.length} photos leaves an incomplete last row; use a multiple of 3.`);
    }
    if (page.title.length > 65) {
      console.warn(`[gallery] ${page.path}: the title is ${page.title.length} characters; Google may cut it off after about 60.`);
    }
    const alts = new Set<string>();
    const captions = new Set<string>();
    for (const img of page.images) {
      if (alts.has(img.alt.trim().toLowerCase())) {
        console.warn(`[gallery] ${page.path}: repeated alt text "${img.alt}". Give every photo its own.`);
      }
      if (captions.has(img.caption.trim().toLowerCase())) {
        console.warn(`[gallery] ${page.path}: repeated caption "${img.caption}". Give every photo its own.`);
      }
      alts.add(img.alt.trim().toLowerCase());
      captions.add(img.caption.trim().toLowerCase());
      const owner = photoOwner.get(img.src);
      if (owner && owner !== page.path) {
        console.warn(`[gallery] ${img.src} is used on both ${owner} and ${page.path}. Use different photos on each page.`);
      }
      photoOwner.set(img.src, page.path);
    }
  }
}

checkGalleryPages(galleryPages);

/** <title>, description, canonical, social cards — identical for every page. */
export function galleryMetadata(page: GalleryPage): Metadata {
  const socialTitle = `${page.h1} | ${SITE_NAME}`;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: socialTitle,
      description: page.description,
      type: "website",
      url: page.path,
      siteName: SITE_NAME,
      images: page.images.slice(0, 3).map((img) => ({ url: img.src, alt: img.alt })),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: page.description,
      images: [page.images[0].src],
    },
  };
}
