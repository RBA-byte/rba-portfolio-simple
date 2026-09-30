import type {
  HeroSlide,
  PhotographerBio,
  SocialLinks,
  StudioInfo,
  WeddingPackage,
} from "@/types";

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
    slug: "ezza-hammad-walima-shoot-quaid-e-azam-library",
    mobile: "/images/rba-bride-groom-waleema-cinematic-wedding-lahore.webp",
    desktop: "/images/rba-bride-groom-waleema-cinematic-wedding-lahore-landscape.webp",
    alt: "Ezza and Hammad embracing in smoke during their cinematic walima portrait shoot at Quaid-e-Azam Library, Lahore",
  },
  {
    slug: "ezza-hammad-cinematic-walima-portraits-lahore",
    mobile: "/images/rba-bride-groom-waleema-cinematic-wedding-lahore-02.webp",
    desktop: "/images/rba-bride-groom-waleema-cinematic-wedding-lahore-landscape-02.webp",
    alt: "A second angle of Ezza and Hammad's cinematic walima portraits among the columns of Quaid-e-Azam Library, Lahore",
  },
  {
    slug: "zainab-bridal-reception-portrait-glass-rim-light",
    mobile: "/images/rba-beautiful-bride-cinematic-wedding-shoot.webp",
    desktop: "/images/rba-beautiful-bride-cinematic-wedding-shoot-landscape.webp",
    alt: "Bride Zainab lit by rim light passing through a glass flower vase before her wedding reception in Lahore",
  },
  {
    slug: "faisal-farrah-mehndi-couple-shoot-lahore",
    mobile: "/images/rba-beautiful-bride-groom-mehndi-cinematic-wedding-lahore.webp",
    desktop: "/images/rba-beautiful-bride-groom-mehndi-cinematic-wedding-lahore-landscape.webp",
    alt: "Groom Faisal seated on a decorated swing with bride Farrah resting on his lap during their mehndi couple shoot in Lahore",
  },
  {
    slug: "samie-khadija-baraat-couple-shoot-h-square-studio",
    mobile: "/images/rba-beautiful-bride-groom-baraat-shoot-cinematic-wedding-lahore.webp",
    desktop: "/images/rba-beautiful-bride-groom-baraat-shoot-cinematic-wedding-lahore-landscape.webp",
    alt: "Samie and Khadija posing for their baraat couple shoot inside H-Square Production's studio in Lahore",
  },
  {
    slug: "samie-khadija-walima-shoot-aureum-grand-bahria-town",
    mobile: "/images/rba-beautiful-bride-groom-waleema-outdoor-shoot-cinematic-wedding-lahore.webp",
    desktop: "/images/rba-beautiful-bride-groom-waleema-outdoor-shoot-cinematic-wedding-lahore-landscape.webp",
    alt: "Samie and Khadija's walima couple portrait outside Aureum Grand in Bahria Town, Lahore",
  },
  {
    slug: "maria-faisal-baraat-couple-shoot-gs-productions",
    mobile: "/images/rba-beautiful-bride-groom-baraat-gs-production-cinematic-wedding-lahore.webp",
    desktop: "/images/rba-beautiful-bride-groom-baraat-gs-production-cinematic-wedding-lahore-landscape.webp",
    alt: "An intimate baraat couple portrait of Maria and Faisal at GS Productions in Gulberg, Lahore",
  },
  {
    slug: "maria-faisal-library-portraits-gs-productions",
    mobile: "/images/rba-beautiful-bride-baraat-gs-production-cinematic-wedding-lahore.webp",
    desktop: "/images/rba-beautiful-couple-baraat-gs-production-cinematic-wedding-lahore-landscape.webp",
    alt: "Maria and Faisal posing in the library-themed studio set at GS Productions, Lahore",
  },
  {
    slug: "mahnoor-aliee-mehndi-sunset-shoot-kabeer-studio",
    mobile: "/images/rba-beautiful-bride-groom-mehndi-outdoor-intimate-shoot-cinematic-weddings-lahore.webp",
    desktop: "/images/rba-beautiful-bride-groom-mehndi-outdoor-intimate-shoot-cinematic-weddings-lahore-landscape.webp",
    alt: "Mahnoor and Aliee's mehndi couple portrait lit by sunset light through the trees at Kabeer Studio, Lahore",
  },
  {
    slug: "hafsa-bridal-campaign-shoot-lahore",
    mobile: "/images/rba-beautiful-bride-baraat-shoot-cinematic-weddings-lahore.webp",
    desktop: "/images/rba-beautiful-bride-baraat-shoot-cinematic-weddings-lahore-landscape.webp",
    alt: "Bridal campaign portrait of model Hafsa, styled and lit for a baraat shoot in Lahore",
  },
  {
    slug: "mahnoor-aliee-baraat-shoot-gs-productions",
    mobile: "/images/rba-beautiful-bride-groom-baraat-outdoor-intimate-shoot-cinematic-weddings-lahore.webp",
    desktop: "/images/rba-beautiful-bride-groom-baraat-outdoor-intimate-shoot-cinematic-weddings-lahore-landscape.webp",
    alt: "Mahnoor and Aliee posing for their baraat shoot at GS Productions in Gulberg, Lahore",
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
    "RBA Films & Photography is a Lahore-based wedding photography studio built around one idea: weddings should be photographed like films, through light, restraint, and the moments that happen when no one is performing for the camera.",
    "Behind the camera is Ammar, a security systems engineer by profession and photographer by passion. Capturing light, color, and candid moments since childhood, he has spent 6+ years documenting weddings across Lahore, blending an engineer’s precision with an artist’s eye for emotion.",
    "His work has earned the Sony Best Retoucher Award, presented by photographer and Sony ambassador Mr. Kashif Rashid, along with two-time Best Photographer honors at the All Pakistan Photography Competition. Today, RBA creates refined wedding photography and cinematic wedding films for couples celebrating luxury weddings in Lahore.",
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
      "Unlimited Softcopies",
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
  addressLines: ["27a, Hadayatullah Block", "Mustafa Town, Lahore, Pakistan"],
	 // Used for the address schema (StudioSection.tsx) — kept separate from
  // addressLines above so the JSON-LD always has proper, distinct fields
  // instead of parsing the display string.
  neighborhood: "Mustafa Town",
  addressLocality: "Lahore",
  addressRegion: "Punjab",
  addressCountry: "PK",
  postalCode: "54790",
  phoneDisplay: "+92 33 567 26627 (AMMAR)",
  phoneHref: "tel:+923356726627",
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.9944909011406!2d74.27165717701077!3d31.49683524830199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190332cb69c019%3A0xa138dbce98ccd68f!2sThe%20Refractions%20Studio%20%7C%20Refractions%20By%20Ammar!5e0!3m2!1sen!2s!4v1790275549241!5m2!1sen!2s",
  mapsLink: "https://maps.app.goo.gl/kJiGf2ZNFciTLfjw9",
};
/**
 * Shown in the bio block at the end of every blog post — an E-E-A-T
 * signal (real author, real credentials) that search engines weigh for
 * this kind of content. Replace with your own details and a real photo.
 */
export const photographerBio: PhotographerBio = {
  name: "Syed Ammar",
  role: "Founder & Lead Photographer, RBA Films & Photography",
  bio: "A Sony Best Retoucher Award winner and two-time Best Photographer honoree at the All Pakistan Photography Competition, Ammar has spent 6+ years photographing candid, cinematic weddings across Lahore.",
  avatar: "/images/rba-syed-ammar-bio-studio-owner.webp",
};
