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
    name: "Samie & Khadija",
    rating: 5,
    quote:
      "...the experience was completely different. First of all, their previous work was genuinely exceptional. More importantly, Ammar understood exactly what we wanted and was willing to accommodate our requirements...",
    image: "/images/testimonials/samie-khadija-rba-cinematic-wedding-testimonial.webp",
    alt: "Samie and Khadija, walima wedding photography clients in Lahore",
  },
  {
    name: "Faisal & Maria",
    rating: 5,
    quote:
      "They captured more than just moments - they preserved the emotions and memories of the day. The quality of both the videos and pictures exceeded expectations and was truly outstanding.",
    image: "/images/testimonials/faisal-maria-rba-cinematic-wedding-testimonial.webp",
    alt: "Faisal and Maria, cinematic wedding film clients in Lahore",
  },
  {
    name: "Sonia & Nasir",
    rating: 5,
    quote:
      "Mehndi to Walima, every candid moment was captured. Our wedding photography album is pure art.",
    image: "/images/testimonials/sonia-nasir-rba-cinematic-wedding-testimonial.webp",
    alt: "Sonia and Nasir, Mehndi and Walima photography clients in Lahore",
  },
  {
    name: "Faisal & Farrah",
    rating: 4,
    quote:
      "Luxury wedding videography in Lahore without the fuss. Delivered early and beautifully edited.",
    image: "/images/testimonials/faisal-farrah-rba-cinematic-wedding-testimonial.webp",
    alt: "Faisal and Farah, wedding videography clients in Lahore",
  },
  {
    name: "Aafia & Umair",
    rating: 5,
    quote:
      "They captured the pictures and videos beautifully and even the albums were made very nicely.",
    image: "/images/testimonials/aafia-umair-rba-cinematic-wedding-testimonial.webp",
    alt: "Aafia and Umair, wedding shoot clients in Lahore",
  },
  {
    name: "Aaima",
    rating: 5,
    quote:
      "My engagement coverage was flawless. Honestly the most trusted wedding photographers in Lahore.",
    image: "/images/testimonials/faisa-imran-rba-cinematic-wedding-testimonial.webp",
    alt: "Aaima, Engagement photography clients in Lahore",
  },
];
