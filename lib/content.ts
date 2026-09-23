import type { HeroSlide, SocialLinks, StudioInfo } from "@/types";

/**
 * All editorial copy and image references live here so the brand's
 * photography and words can be swapped in one place.
 *
 * Each hero photo needs TWO crops:
 *   - mobile:  a portrait/vertical crop (tall) for phone screens
 *   - desktop: a landscape/horizontal crop (wide) for tablets and up
 * This avoids a tall portrait photo being stretched across a wide
 * desktop screen, or vice versa.
 *
 * Each hero photo also has a `slug` — tapping/clicking it opens the
 * matching post at /blog/[slug]. The blog posts themselves live in
 * lib/blogPosts.ts and reuse these same photos as their featured image.
 *
 * To use your own photographs: drop both crops of each photo into
 * /public/images and change the src values below to
 * "/images/your-file.jpg". The placeholders point at picsum.photos
 * purely so the site renders correctly before real photography is
 * added — replace them before launch.
 */

export const heroImages: HeroSlide[] = [
  {
    slug: "golden-hour-vows",
    mobile: "/images/wedding-01.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-01d/2400/1350",
    alt: "Bride and groom silhouetted against golden evening light",
  },
  {
    slug: "the-details-that-matter",
    mobile: "/images/wedding-02.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-02d/2400/1350",
    alt: "Close detail of a bridal bouquet and hand",
  },
  {
    slug: "an-evening-in-lahore",
    mobile: "/images/wedding-03.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-03d/2400/1350",
    alt: "Wide shot of a wedding venue at dusk",
  },
  {
    slug: "candid-and-unposed",
    mobile: "/images/wedding-04.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-04d/2400/1350",
    alt: "Candid portrait of the couple laughing together",
  },
  {
    slug: "the-venue-we-fell-for",
    mobile: "/images/wedding-05.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-05d/2400/1350",
    alt: "Architectural detail of the ceremony setting",
  },
];

export const brand = {
  titleLine1: "Cinematic Weddings",
  titleLine2: "by RBA Films & Photography",
  aboutLabel: "ABOUT US",
  contactLabel: "CONTACT",
  journalLabel: "JOURNAL",
};

export const aboutCopy = {
  heading: "ABOUT US",
  paragraphs: [
    "RBA Films & Photography documents weddings the way a film director frames a story — through light, restraint and the moments that happen when no one is performing for the camera.",
    "Based between Lahore and destinations across Pakistan, the studio works with a small number of weddings each season, shooting on a blend of film and digital to keep every frame quiet, considered and unmistakably real.",
  ],
};

export const contactCopy = {
  heading: "LET'S CREATE SOMETHING BEAUTIFUL",
  subheading:
    "Tell us a little about your day. We reply personally, usually within 48 hours.",
  thankYou: {
    heading: "THANK YOU",
    body: "Thank you for reaching out to RBA Films & Photography. Our team will contact you shortly.",
  },
};

/**
 * Edit these with your real WhatsApp number (in international format,
 * no + or spaces, e.g. 923001234567) and Instagram handle.
 */
export const socialLinks: SocialLinks = {
  whatsapp: "https://wa.me/923001234567",
  instagram: "https://instagram.com/rbafilmsandphotography",
};

/**
 * Studio details for the "visit us" section and local SEO (Google
 * Business Profile). Replace the address, phone, and the Google Maps
 * links below with your real ones:
 *
 *   1. Search your studio on Google Maps, click "Share", then "Embed
 *      a map", and copy the src="..." URL into mapEmbedSrc.
 *   2. Copy the regular share link into mapsLink (used for the
 *      "Get Directions" button).
 */
export const studio: StudioInfo = {
  name: "RBA Films & Photography Studio",
  addressLines: ["12 MM Alam Road", "Gulberg III, Lahore, Pakistan"],
  phoneDisplay: "+92 300 1234567",
  phoneHref: "tel:+923001234567",
  mapEmbedSrc:
    "https://www.google.com/maps?q=Gulberg+III+Lahore+Pakistan&output=embed",
  mapsLink: "https://maps.google.com/?q=Gulberg+III+Lahore+Pakistan",
};
