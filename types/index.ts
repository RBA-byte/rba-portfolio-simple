export type SectionId = "hero" | "about" | "contact";

/** A photo with a portrait crop for phones and a landscape crop for wider screens. */
export interface ResponsiveImage {
  mobile: string;
  desktop: string;
  alt: string;
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
