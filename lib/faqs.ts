import { weddingPackages } from "@/lib/content";
import type { FaqCategory, FaqItem } from "@/types";

/**
 * Every FAQ lives here — this is the only place to add or edit them.
 *
 *  - /faq shows all of them, grouped by `category`.
 *  - Each blog post shows 3–4 random ones (see pickFaqs) that link back to /faq.
 *  - `tags` make the random pick favour relevant questions. A post's `faqTags`
 *    (lib/blog/*.ts) are matched against these.
 *
 * These answers speak for the studio — please read them once and adjust
 * anything that doesn't match how you actually work.
 */

const packageSummary = weddingPackages
  .map((pkg) => `${pkg.name} at ${pkg.price}`)
  .join(", ");

export const faqCategories: FaqCategory[] = [
  "Booking & Pricing",
  "Coverage & Team",
  "Photography Style",
  "Films & Videography",
  "Wedding Events",
  "Locations & Venues",
  "Delivery & Albums",
  "Pre-Wedding & Couple Shoots",
];

export const faqs: FaqItem[] = [
  // ───────────── Booking & Pricing ─────────────
  {
    id: "wedding-photography-cost-lahore",
    category: "Booking & Pricing",
    question: "How much does wedding photography cost in Lahore?",
    answer:
      "Wedding photography prices in Lahore depend on the number of events, hours of coverage, team size, photography and cinematography requirements, albums, and other deliverables. At RBA Films & Photography, we create packages around your wedding rather than offering a one-size-fits-all solution. Contact us with your wedding dates and events for a customized quote.",
    tags: ["pricing", "packages", "choosing", "budget"],
  },
  {
    id: "rba-package-prices",
    category: "Booking & Pricing",
    question: "What are your wedding package prices?",
    answer: `Our published packages are ${packageSummary}. They differ in hours of coverage, team size, albums, drone coverage and film deliverables, and each can be tailored to your events. Send us your dates and events for an exact quote.`,
    tags: ["pricing", "packages", "budget", "luxury"],
  },
  {
    id: "how-far-in-advance-to-book",
    category: "Booking & Pricing",
    question: "How far in advance should I book a wedding photographer in Lahore?",
    answer:
      "We recommend booking your wedding photographer in Lahore as early as possible once your wedding dates are confirmed. Popular dates, particularly during the October–March wedding season, can be reserved several months in advance. If your date is already fixed, get in touch with us to check availability.",
    tags: ["booking", "timeline", "choosing", "season"],
  },
  {
    id: "how-to-book-rba",
    category: "Booking & Pricing",
    question: "How do I book RBA Films & Photography for my wedding?",
    answer:
      "Booking your wedding photography with RBA Films & Photography starts with checking the availability of your date. Share your wedding date, venue and events with us, and we'll discuss your requirements and recommend suitable coverage. Once you decide to proceed, your date is secured according to the booking terms provided by our studio.",
    tags: ["booking", "timeline", "choosing"],
  },
  {
    id: "wedding-season-lahore",
    category: "Booking & Pricing",
    question: "When is the wedding season in Lahore?",
    answer:
      "Most Lahore weddings take place between October and March, when the weather is cooler and outdoor events are comfortable. That is also when photographers' calendars fill fastest, so the most popular dates are usually booked well ahead.",
    tags: ["season", "booking", "timeline", "light"],
  },
  {
    id: "travel-outside-lahore",
    category: "Booking & Pricing",
    question: "Do you photograph weddings outside Lahore?",
    answer:
      "We are based in Lahore and most of our work is here. If your wedding is in another city or a destination, contact us with your dates and location and we'll confirm availability and discuss any travel arrangements.",
    tags: ["locations", "booking", "destination"],
  },

  // ───────────── Coverage & Team ─────────────
  {
    id: "packages-included",
    category: "Coverage & Team",
    question: "What is included in your wedding photography packages?",
    answer:
      "Our wedding photography packages can include photography, cinematic wedding films, multiple photographers and videographers, bridal and couple portraits, edited photographs, highlight films and premium albums, depending on the package selected. We can also customize coverage around your Mehndi, Nikah, Baraat and Walima.",
    tags: ["packages", "pricing", "luxury", "choosing"],
  },
  {
    id: "team-size",
    category: "Coverage & Team",
    question: "How many photographers and videographers will cover my wedding?",
    answer:
      "The number of photographers and videographers depends on the size of your wedding, number of events and coverage requirements. Smaller celebrations may require a more intimate team, while larger multi-event weddings benefit from additional shooters to capture simultaneous moments, family interactions and different perspectives.",
    tags: ["team", "packages", "choosing", "events"],
  },
  {
    id: "who-shoots-my-wedding",
    category: "Coverage & Team",
    question: "Will the photographer personally shoot my wedding?",
    answer:
      "We believe the creative vision should remain consistent from the first consultation to the wedding day. Your photography coverage is handled by our professional RBA team according to the package and requirements agreed upon during booking. We discuss the assigned team with you before your wedding so there are no surprises.",
    tags: ["team", "choosing", "booking"],
  },
  {
    id: "drone-coverage",
    category: "Coverage & Team",
    question: "Do you offer drone coverage?",
    answer:
      "Drone coverage is included in our Premium package. Drone use also depends on venue permission and local rules, so we confirm it with you and the venue in advance.",
    tags: ["packages", "luxury", "film", "venues"],
  },
  {
    id: "multi-day-luxury-weddings",
    category: "Coverage & Team",
    question: "Can you cover a large, multi-day or luxury wedding?",
    answer:
      "Yes. We can cover individual events or create a complete visual story across multiple days, with team size and coverage hours planned around your schedule. For larger weddings we plan additional shooters so simultaneous moments are not missed.",
    tags: ["luxury", "events", "team", "packages"],
  },
  {
    id: "shot-list",
    category: "Coverage & Team",
    question: "Can we give you a list of family groupings and must-have moments?",
    answer:
      "Yes, and we encourage it. Share the family groupings, key people and moments that matter most to you before the wedding. We build the formal portraits around that list and keep the rest of the day flexible for candid moments.",
    tags: ["planning", "candid", "choosing", "family"],
  },
  {
    id: "bad-weather-plan",
    category: "Coverage & Team",
    question: "What happens if the weather is bad on the wedding day?",
    answer:
      "We talk through a backup plan with you in advance, including covered or indoor spots for portraits and adjusted timings, so a change in the weather doesn't leave gaps in your coverage.",
    tags: ["planning", "light", "venues", "season"],
  },
  {
    id: "prepare-for-wedding-photos",
    category: "Coverage & Team",
    question: "How can we prepare for our wedding photography?",
    answer:
      "Share your event schedule and venue details early, agree a realistic timeline with a little buffer for portraits, lay out rings, invitations, shoes and jewelry ahead of the detail shots, and nominate one family member who can help gather relatives for group photographs.",
    tags: ["planning", "details", "timeline", "family"],
  },

  // ───────────── Photography Style ─────────────
  {
    id: "photography-style",
    category: "Photography Style",
    question: "What photography style do you specialize in?",
    answer:
      "Our approach combines candid wedding photography, refined portraits and cinematic visual storytelling. We aim to capture genuine interactions while also creating carefully composed portraits and atmospheric images that feel timeless rather than overly posed or heavily stylized.",
    tags: ["style", "candid", "cinematic", "choosing", "luxury"],
  },
  {
    id: "candid-vs-traditional",
    category: "Photography Style",
    question: "What is the difference between candid and traditional wedding photography?",
    answer:
      "Traditional photography is organized and posed: family groupings, formal couple portraits and set-up shots. Candid photography documents unposed moments and reactions as they happen. Most weddings need both, which is why we shoot the formal portraits your family will want alongside continuous candid coverage.",
    tags: ["style", "candid", "cinematic", "traditional", "choosing"],
  },
  {
    id: "posed-family-portraits",
    category: "Photography Style",
    question: "Will you still take posed family portraits?",
    answer:
      "Yes — we always block out time for the formal family and couple portraits your family will want. Candid coverage runs alongside that, not instead of it.",
    tags: ["style", "candid", "traditional", "family"],
  },
  {
    id: "candid-cost",
    category: "Photography Style",
    question: "Is candid photography more expensive than traditional coverage?",
    answer:
      "No, it's included in every package. It's a shooting style, not an add-on — see our Packages section for exactly what's covered at each tier.",
    tags: ["style", "candid", "pricing", "packages"],
  },
  {
    id: "best-time-of-day",
    category: "Photography Style",
    question: "What is the best time of day for wedding photography in Lahore?",
    answer:
      "The hour before sunset — golden hour — gives the softest, warmest light for couple portraits, so where possible we plan portraits around it. Because most Lahore weddings run into the evening, we also plan for indoor and artificial light so the photographs stay consistent from afternoon to night.",
    tags: ["light", "timeline", "style", "locations", "season"],
  },
  {
    id: "editing-and-color",
    category: "Photography Style",
    question: "How do you edit and color grade wedding photographs?",
    answer:
      "Editing is part of every package. Images are selected, edited and color graded for a consistent, natural look across every event and lighting condition, and our films are edited and graded with the same visual approach.",
    tags: ["style", "cinematic", "luxury", "film", "delivery"],
  },
  {
    id: "detail-shots-ready",
    category: "Photography Style",
    question: "What should I have ready for detail shots?",
    answer:
      "Rings, invitations, both pairs of shoes, any heirloom jewelry, and perfume bottles — laid out, not still in their boxes — give us the most to work with in a short amount of time.",
    tags: ["details", "planning", "luxury", "style"],
  },
  {
    id: "detail-shots-time",
    category: "Photography Style",
    question: "How long does detail photography take?",
    answer:
      "Usually 30–45 minutes at the very start of the day, before hair and makeup finishes, so it doesn't compete with anything else on the schedule.",
    tags: ["details", "planning", "timeline"],
  },

  // ───────────── Films & Videography ─────────────
  {
    id: "photography-and-videography",
    category: "Films & Videography",
    question: "Do you provide both wedding photography and cinematic wedding videography?",
    answer:
      "Yes. RBA Films & Photography offers both wedding photography and cinematic wedding films. Our photography focuses on genuine moments, portraits and details, while our films combine visual storytelling, movement, music and the atmosphere of your celebration into a cinematic wedding story.",
    tags: ["film", "cinematic", "packages", "choosing"],
  },
  {
    id: "what-is-cinematic-film",
    category: "Films & Videography",
    question: "What is a cinematic wedding film?",
    answer:
      "A cinematic wedding film is shot and edited like a short film rather than a recording of the day: deliberate composition and camera movement, controlled light, sound and music chosen to carry emotion, and color grading that gives the whole story one consistent look.",
    tags: ["film", "cinematic", "style", "luxury"],
  },
  {
    id: "highlight-vs-full-video",
    category: "Films & Videography",
    question: "What is the difference between a highlight film and a full wedding video?",
    answer:
      "A highlight film is a short, edited story of the best moments across your wedding. A full or event video documents a whole event from start to finish. Which of these is included depends on the package you choose, and we can advise on the right mix for your events.",
    tags: ["film", "cinematic", "packages", "events"],
  },

  // ───────────── Wedding Events ─────────────
  {
    id: "cover-mehndi-nikah-baraat-walima",
    category: "Wedding Events",
    question: "Do you cover Mehndi, Nikah, Baraat and Walima?",
    answer:
      "Yes. RBA Films & Photography provides wedding photography and cinematography for Mehndi, Mayun, Nikah, Baraat, Walima, Rukhsati and other wedding celebrations. We can cover individual events or create a complete visual story across multiple days.",
    tags: ["events", "mehndi", "nikah", "baraat", "walima", "packages"],
  },

  // ───────────── Locations & Venues ─────────────
  {
    id: "venue-scouting",
    category: "Locations & Venues",
    question: "Do you scout wedding venues in Lahore before the event?",
    answer:
      "Yes, whenever possible we walk the venue in the days before the wedding, at the same time of day the event will happen, so we already know where the light will be.",
    tags: ["venues", "locations", "light", "planning"],
  },
  {
    id: "venues-at-dusk",
    category: "Locations & Venues",
    question: "Which Lahore venues photograph well at dusk?",
    answer:
      "Anywhere with open sky to the west and minimal harsh overhead lighting tends to work best — we're happy to advise once you share your shortlist.",
    tags: ["venues", "locations", "light"],
  },
  {
    id: "help-choose-venue",
    category: "Locations & Venues",
    question: "Can you help us choose a wedding venue in Lahore?",
    answer:
      "We often accompany couples on venue visits once they've narrowed it down to a few options, purely from a light and photography standpoint.",
    tags: ["venues", "locations", "planning", "luxury"],
  },
  {
    id: "portrait-locations-lahore",
    category: "Locations & Venues",
    question: "Where can we do couple portraits in Lahore?",
    answer:
      "Popular choices include historic sites such as Shalimar Gardens, Lahore Fort and the Walled City, landscaped parks and gardens, and private venues or farmhouses. Some public and heritage sites have rules for professional shoots, so we help you check permissions and timings first.",
    tags: ["locations", "venues", "couple", "pre-wedding", "light"],
  },

  // ───────────── Delivery & Albums ─────────────
  {
    id: "delivery-time",
    category: "Delivery & Albums",
    question: "How long does it take to receive wedding photographs and videos?",
    answer:
      "After your wedding, our team carefully selects and edits your photographs and films. Final delivery time depends on the number of events and selected package. Your agreed delivery timeline will be discussed and confirmed during booking.",
    tags: ["delivery", "packages", "timeline", "film"],
  },
  {
    id: "wedding-albums",
    category: "Delivery & Albums",
    question: "Do you provide wedding albums?",
    answer:
      "Yes. Premium wedding albums can be included in selected RBA Films & Photography packages. Our album process includes image selection, design and professional printing, with the final format and specifications discussed according to your package.",
    tags: ["delivery", "packages", "luxury", "albums"],
  },

  // ───────────── Pre-Wedding & Couple Shoots ─────────────
  {
    id: "pre-wedding-couple-shoots",
    category: "Pre-Wedding & Couple Shoots",
    question: "Do you offer pre-wedding and couple photography in Lahore?",
    answer:
      "Yes. We offer pre-wedding and couple photography sessions in Lahore. These sessions give couples an opportunity to create more relaxed portraits outside the pace of the wedding day, with locations, styling, lighting and visual direction planned around your preferred aesthetic.",
    tags: ["pre-wedding", "couple", "locations", "style"],
  },
  {
    id: "bridal-portraits",
    category: "Pre-Wedding & Couple Shoots",
    question: "Do you photograph bridal portraits?",
    answer:
      "Yes. Bridal and couple portraits can be included in our packages, and we plan the light, location and pacing so the bride's portraits feel calm and natural rather than rushed between events.",
    tags: ["bridal", "couple", "style", "packages", "luxury"],
  },
];

export const faqsByCategory = faqCategories
  .map((category) => ({
    category,
    items: faqs.filter((faq) => faq.category === category),
  }))
  .filter((group) => group.items.length > 0);

function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Picks 3 or 4 random FAQs for a blog post, preferring ones whose tags
 * overlap the post's `faqTags`, then filling any gap with random others.
 *
 * This runs on the server when a post page is generated (and again whenever
 * the page revalidates — see `revalidate` in app/blog/[slug]/page.tsx), so the
 * FAQ text on the page and the FAQPage structured data always match.
 */
export function pickFaqs(tags: string[] = [], max = 4): FaqItem[] {
  const count = Math.random() < 0.5 ? 3 : Math.min(4, max);
  const wanted = new Set(tags);
  const relevant = shuffle(
    faqs.filter((faq) => faq.tags.some((tag) => wanted.has(tag)))
  );
  const rest = shuffle(faqs.filter((faq) => !relevant.includes(faq)));
  return [...relevant, ...rest].slice(0, count);
}
