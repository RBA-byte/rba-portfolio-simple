export type SectionId = "hero" | "about" | "contact" | "studio";

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
  phoneDisplay: string;
  phoneHref: string;
  /** Google Maps "embed" URL used inside an <iframe>. */
  mapEmbedSrc: string;
  /** Regular Google Maps link, used for "Get directions". */
  mapsLink: string;
}

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  featuredImage: ResponsiveImage;
  publishedAt: string;
  blocks: BlogBlock[];
}

