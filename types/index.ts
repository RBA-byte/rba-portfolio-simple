export type SectionId = "hero" | "about" | "packages" | "contact" | "studio";

/** A photo with a portrait crop for phones and a landscape crop for wider screens. */
export interface ResponsiveImage {
  mobile: string;
  desktop: string;
  alt: string;
}

/** A hero carousel photo that also links out to its own blog post. */
export interface HeroSlide extends ResponsiveImage {
  slug: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  location: string;
}

export interface ContactFormErrors {
  name?: string;
  phone?: string;
}

export interface SocialLinks {
  whatsapp: string;
  instagram: string;
}

export interface StudioInfo {
  name: string;
  addressLines: string[];
  /** Neighborhood/area only — e.g. "Mustafa Town". Folded into streetAddress in the schema. */
  neighborhood: string;
  /** City only — e.g. "Lahore". Used for the address schema's addressLocality. */
  addressLocality: string;
  /** Province/state only — e.g. "Punjab". Used for addressRegion. */
  addressRegion: string;
  /** ISO 3166-1 alpha-2 country code — e.g. "PK". Used for addressCountry. */
  addressCountry: string;
  /** Optional: add once confirmed (sources disagree for Mustafa Town). */
  postalCode?: string;
  phoneDisplay: string;
  phoneHref: string;
  /** Google Maps "embed" URL used inside an <iframe>. */
  mapEmbedSrc: string;
  /** Regular Google Maps link, used for "Get directions". */
  mapsLink: string;
}

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean };

/** A single question/answer shown on /faq and (randomly) inside blog posts. */
export interface FaqItem {
  /** URL-safe id — used as the #anchor on the /faq page. */
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  /** Topic tags used to prefer relevant questions inside blog posts. */
  tags: string[];
}

export type FaqCategory =
  | "Booking & Pricing"
  | "Coverage & Team"
  | "Photography Style"
  | "Films & Videography"
  | "Wedding Events"
  | "Locations & Venues"
  | "Delivery & Albums"
  | "Pre-Wedding & Couple Shoots";

export type BlogCluster =
  | "Choosing a Photographer"
  | "Wedding Photography"
  | "Luxury Weddings"
  | "Cinematic Films"
  | "Lahore Locations"
  | "Studio Stories";

export interface BlogPost {
  slug: string;
  decorativeTitle?: string;
  title: string;
  /** Shorter <title> tag (aim for 60 characters or fewer). Falls back to `title`. */
  seoTitle?: string;
  metaDescription: string;
  /** Short summary used on related-post cards. */
  excerpt: string;
  featuredImage: ResponsiveImage;
  publishedAt: string;
  updatedAt?: string;
  blocks: BlogBlock[];
  /** Topic cluster this post belongs to. */
  cluster: BlogCluster;
  /** "pillar" = long-form hub page; "support" = narrower article that links up to a pillar. */
  role: "pillar" | "support" | "story";
  /** For support posts: slug of the pillar they belong to. */
  pillarSlug?: string;
  /** Hand-picked related posts (shown first in "More from the Journal"). */
  relatedSlugs?: string[];
  /** The single keyword this page is meant to rank for. Never reuse across posts. */
  primaryKeyword?: string;
  /** Used to pick relevant FAQs for the random FAQ block. */
  faqTags?: string[];
}

export interface PhotographerBio {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface WeddingPackage {
  name: string;
  price: string;
  features: string[];
}

