import type { HeroSlide, SocialLinks, StudioInfo, WeddingPackage } from "@/types";

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
    slug: "luxury-cinematic-wedding-photography-lahore",
    mobile: "/images/rba-bride-groom-waleema-cinematic-wedding-lahore.webp",
    desktop: "/images/rba-bride-groom-waleema-cinematic-wedding-lahore-landscape.webp",
    alt: "Luxury Walima couple embracing in smoke during a cinematic wedding portrait in Lahore",
  },
  {
    slug: "the-details-that-matter",
    mobile: "/images/rba-bride-groom-waleema-cinematic-wedding-lahore-02.webp",
    desktop: "/images/rba-bride-groom-waleema-cinematic-wedding-lahore-landscape-02.webp",
    alt: "Close detail of a bridal bouquet and hand",
  },
  {
    slug: "an-evening-in-lahore",
    mobile: "/images/rba-beautiful-bride-cinematic-wedding-shoot.webp",
    desktop: "/images/rba-beautiful-bride-cinematic-wedding-shoot-landscape.webp",
    alt: "Wide shot of a wedding venue at dusk",
  },
  {
    slug: "candid-and-unposed",
    mobile: "/images/rba-beautiful-bride-groom-mehndi-cinematic-wedding-lahore.webp",
    desktop: "/images/rba-beautiful-bride-groom-mehndi-cinematic-wedding-lahore-landscape.webp",
    alt: "Candid portrait of the couple laughing together",
  },
  {
    slug: "the-venue-we-fell-for",
    mobile: "/images/rba-beautiful-bride-groom-baraat-shoot-cinematic-wedding-lahore.webp",
    desktop: "/images/rba-beautiful-bride-groom-baraat-shoot-cinematic-wedding-lahore-landscape.webp",
    alt: "Architectural detail of the ceremony setting",
  },
   {
    slug: "the-venue-we-fell-for-2",
    mobile: "/images/rba-beautiful-bride-groom-waleema-outdoor-shoot-cinematic-wedding-lahore.webp",
    desktop: "/images/rba-beautiful-bride-groom-waleema-outdoor-shoot-cinematic-wedding-lahore-landscape.webp",
    alt: "Architectural detail of the ceremony setting",
  },
   {
    slug: "the-venue-we-fell-for-3",
    mobile: "/images/rba-beautiful-bride-groom-baraat-gs-production-cinematic-wedding-lahore.webp",
    desktop: "/images/rba-beautiful-bride-groom-baraat-gs-production-cinematic-wedding-lahore-landscape.webp",
    alt: "Architectural detail of the ceremony setting",
  },
   {
    slug: "the-venue-we-fell-for-4",
    mobile: "/images/rba-beautiful-bride-baraat-gs-production-cinematic-wedding-lahore.webp",
    desktop: "/images/rba-beautiful-couple-baraat-gs-production-cinematic-wedding-lahore-landscape.webp",
    alt: "Architectural detail of the ceremony setting",
  },
   {
    slug: "the-venue-we-fell-for-5",
    mobile: "/images/rba-beautiful-bride-groom-mehndi-outdoor-intimate-shoot-cinematic-weddings-lahore.webp",
    desktop: "/images/rba-beautiful-bride-groom-mehndi-outdoor-intimate-shoot-cinematic-weddings-lahore-landscape.webp",
    alt: "Architectural detail of the ceremony setting",
  },
   {
    slug: "the-venue-we-fell-for-6",
    mobile: "/images/rba-beautiful-bride-baraat-shoot-cinematic-weddings-lahore.webp",
    desktop: "/images/rba-beautiful-bride-baraat-shoot-cinematic-weddings-lahore-landscape.webp",
    alt: "Architectural detail of the ceremony setting",
  },
   {
    slug: "the-venue-we-fell-for-7",
    mobile: "/images/rba-beautiful-bride-groom-baraat-outdoor-intimate-shoot-cinematic-weddings-lahore.webp",
    desktop: "/images/rba-beautiful-bride-groom-baraat-outdoor-intimate-shoot-cinematic-weddings-lahore-landscape.webp",
    alt: "Architectural detail of the ceremony setting",
  },
  
];

export const brand = {
  titleLine1: "CINEMATIC WEDDINGS",
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
 * Wedding coverage tiers shown in the Packages section. Edit the
 * prices and features freely — the layout scales to however many
 * features each package lists.
 */
export const weddingPackages: WeddingPackage[] = [
  {
    name: "Basic",
    price: "PKR 30,000 per Day",
    features: [
      "4 hours of coverage",
      "1 photographer",
	  "1 videographer",
      "Unlimied Softcopies",
      "Edited Event Video",
	  "Event Highlights",
    ],
  },
  {
    name: "Silver",
    price: "PKR 60,000 per Day",
    features: [
      "4 hours of coverage",
      "2 photographers",
      "2 videographer",
      "Printed Album",
      "Edited Event Video",
	  "Event Highlights",
    ],
  },
  {
    name: "Premium",
    price: "PKR 90,000 per Day",
    features: [
      "Full-day coverage",
      "Professional Photography",
	  "Cinematic Videography",
      "Drone Coverage",
      "Signature Album",
      "Cinematic wedding film",
      "Experienced Team",
    ],
  },
];

/**
 * Edit these with your real WhatsApp number (in international format,
 * no + or spaces, e.g. 923001234567) and Instagram handle.
 */
export const socialLinks: SocialLinks = {
  whatsapp: "https://wa.me/923356726627",
  instagram: "https://instagram.com/refractionsbyammar",
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
  addressLines: ["27a Hadayatullah Block", "Mustafa Town, Lahore, Pakistan"],
  phoneDisplay: "+92 33 567 26627 (AMMAR)",
  phoneHref: "tel:+923356726627",
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.9944909011406!2d74.27165717701077!3d31.49683524830199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190332cb69c019%3A0xa138dbce98ccd68f!2sThe%20Refractions%20Studio%20%7C%20Refractions%20By%20Ammar!5e0!3m2!1sen!2s!4v1790275549241!5m2!1sen!2s",
  mapsLink: "https://maps.app.goo.gl/kJiGf2ZNFciTLfjw9",
};
