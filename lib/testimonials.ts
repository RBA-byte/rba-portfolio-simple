import { heroImages, studio } from "@/lib/content";
import type { Testimonial } from "@/types";

/**
 * Link shown at the bottom of every review card.
 * TODO: replace with your Google Business Profile "reviews" link
 * (Google Business Profile → "Ask for reviews" → copy the link).
 * Until then it points at the studio's Google Maps listing.
 */
export const GOOGLE_REVIEWS_URL = studio.mapsLink;

/**
 * PLACEHOLDER reviews. Replace each entry with a real client's review
 * before launch. For photos, drop files into /public/images/testimonials/
 * and set `image` to "/images/testimonials/your-file.webp"
 * (portrait or square works best; the top ~55% of the card is shown).
 *
 * Keep quotes to roughly 100-130 characters so they fit the card.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Hira & Usman",
    rating: 5,
    quote:
      "The best wedding photographer in Lahore. Our Baraat and Walima photos feel like stills from a film.",
    image: heroImages[0].mobile,
    alt: "Hira and Usman, wedding photography clients in Lahore",
  },
  {
    name: "Sana & Bilal",
    rating: 5,
    quote:
      "Cinematic wedding films that made us cry all over again. A calm, professional team across all three events.",
    image: heroImages[3].mobile,
    alt: "Sana and Bilal, cinematic wedding film clients in Lahore",
  },
  {
    name: "Ayesha & Hamza",
    rating: 5,
    quote:
      "Mehndi to Walima, every candid moment was captured. Our wedding photography album in Lahore is pure art.",
    image: heroImages[5].mobile,
    alt: "Ayesha and Hamza, Mehndi and Walima photography clients in Lahore",
  },
  {
    name: "Maham & Faizan",
    rating: 5,
    quote:
      "Luxury wedding videography in Lahore without the fuss. Delivered early and beautifully edited.",
    image: heroImages[8].mobile,
    alt: "Maham and Faizan, wedding videography clients in Lahore",
  },
  {
    name: "Noor & Ahmed",
    rating: 5,
    quote:
      "Elegant, unobtrusive and so talented. We would book RBA again for any wedding shoot in Lahore.",
    image: heroImages[9].mobile,
    alt: "Noor and Ahmed, wedding shoot clients in Lahore",
  },
  {
    name: "Zainab & Hassan",
    rating: 5,
    quote:
      "Our Nikah and Baraat coverage was flawless. Honestly the most trusted wedding photographers in Lahore.",
    image: heroImages[6].mobile,
    alt: "Zainab and Hassan, Nikah and Baraat photography clients in Lahore",
  },
];
