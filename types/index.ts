export type SectionId = "hero" | "about" | "contact";

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
