import { heroImages } from "@/lib/content";
import type { BlogPost } from "@/types";

/**
 * Each blog post below is the template — copy an object in this array
 * to add a new post. `slug` must match a hero photo's slug in
 * lib/content.ts for the carousel image to link here; if you add a
 * post that isn't tied to a carousel photo, just point featuredImage
 * at any ResponsiveImage instead of reusing heroImages.find(...).
 *
 * `blocks` controls the article body: a "heading" renders as an <h2>
 * (good for SEO structure), a "paragraph" renders as a normal
 * paragraph. `excerpt` shows on related-post cards. `faqs` is
 * optional — when present, it renders a visible Q&A block and also
 * generates FAQPage structured data for that post.
 */

function heroImage(slug: string) {
  const match = heroImages.find((image) => image.slug === slug);
  if (!match) {
    throw new Error(`No hero image found for slug "${slug}"`);
  }
  return match;
}

export const blogPosts: BlogPost[] = [
    {
    slug: "luxury-cinematic-wedding-photography-lahore",
      decorativeTitle: "Golden Hour",
    title: "The Details That Matter",
    metaDescription:
      "Why RBA Films & Photography spends the first hour of every wedding on details most guests never notice.",
    excerpt:
      "Before a single guest arrives, we're usually already working — on the ring box, the invitation suite, the flowers still being arranged.",
    featuredImage: heroImage("luxury-cinematic-wedding-photography-lahore"),
    publishedAt: "2026-05-30",
    blocks: [
      {
        type: "paragraph",
        text: "Before a single guest arrives, we're usually already working — on the ring box, the invitation suite, the flowers still being arranged.",
      },
      {
        type: "heading",
        text: "Small things, shot deliberately",
      },
      {
        type: "paragraph",
        text: "These frames rarely make the highlight reel guests see first, but they're often the ones a couple returns to years later — the handwriting on a card, a grandmother's bracelet, a still-wet coat of nail polish.",
      },
      {
        type: "paragraph",
        text: "We treat them with the same care as the ceremony itself, because they're part of the same story.",
      },
    ],
    faqs: [
      {
        question: "What should I have ready for detail shots?",
        answer:
          "Rings, invitations, both pairs of shoes, any heirloom jewelry, and perfume bottles — laid out, not still in their boxes — give us the most to work with in a short amount of time.",
      },
      {
        question: "How long does detail photography take?",
        answer:
          "Usually 30–45 minutes at the very start of the day, before hair and makeup finishes, so it doesn't compete with anything else on the schedule.",
      },
    ],
  },
  {
    slug: "the-details-that-matter",
    title: "The Details That Matter",
    metaDescription:
      "Why RBA Films & Photography spends the first hour of every wedding on details most guests never notice.",
    excerpt:
      "Before a single guest arrives, we're usually already working — on the ring box, the invitation suite, the flowers still being arranged.",
    featuredImage: heroImage("the-details-that-matter"),
    publishedAt: "2026-05-30",
    blocks: [
      {
        type: "paragraph",
        text: "Before a single guest arrives, we're usually already working — on the ring box, the invitation suite, the flowers still being arranged.",
      },
      {
        type: "heading",
        text: "Small things, shot deliberately",
      },
      {
        type: "paragraph",
        text: "These frames rarely make the highlight reel guests see first, but they're often the ones a couple returns to years later — the handwriting on a card, a grandmother's bracelet, a still-wet coat of nail polish.",
      },
      {
        type: "paragraph",
        text: "We treat them with the same care as the ceremony itself, because they're part of the same story.",
      },
    ],
    faqs: [
      {
        question: "What should I have ready for detail shots?",
        answer:
          "Rings, invitations, both pairs of shoes, any heirloom jewelry, and perfume bottles — laid out, not still in their boxes — give us the most to work with in a short amount of time.",
      },
      {
        question: "How long does detail photography take?",
        answer:
          "Usually 30–45 minutes at the very start of the day, before hair and makeup finishes, so it doesn't compete with anything else on the schedule.",
      },
    ],
  },
  {
    slug: "an-evening-in-lahore",
    title: "An Evening in Lahore",
    metaDescription:
      "A behind-the-scenes look at a dusk wedding venue in Lahore, photographed by RBA Films & Photography.",
    excerpt:
      "Lahore at dusk has a particular quality of light — dust and warmth in the air, string lights just starting to compete with the sky.",
    featuredImage: heroImage("an-evening-in-lahore"),
    publishedAt: "2026-05-14",
    blocks: [
      {
        type: "paragraph",
        text: "Lahore at dusk has a particular quality of light — dust and warmth in the air, the call to prayer somewhere in the distance, string lights just starting to compete with the sky.",
      },
      {
        type: "heading",
        text: "Shooting a venue as its own character",
      },
      {
        type: "paragraph",
        text: "A wedding venue isn't just a backdrop. We walk it hours before guests arrive, looking for the angles that will make it feel the way it actually feels to stand in.",
      },
    ],
    faqs: [
      {
        question: "Do you scout wedding venues in Lahore before the event?",
        answer:
          "Yes, whenever possible we walk the venue in the days before the wedding, at the same time of day the event will happen, so we already know where the light will be.",
      },
      {
        question: "Which Lahore venues photograph well at dusk?",
        answer:
          "Anywhere with open sky to the west and minimal harsh overhead lighting tends to work best — we're happy to advise once you share your shortlist.",
      },
    ],
  },
  {
    slug: "candid-and-unposed",
    title: "Candid & Unposed",
    metaDescription:
      "How RBA Films & Photography captures genuine, unposed moments during a wedding day.",
    excerpt:
      "The best reaction shots happen when no one's being told where to stand. We stay close, stay quiet, and shoot continuously.",
    featuredImage: heroImage("candid-and-unposed"),
    publishedAt: "2026-04-22",
    blocks: [
      {
        type: "paragraph",
        text: "The best reaction shots happen when no one's being told where to stand. Our approach leans heavily on staying close, staying quiet, and shooting continuously through the moments that can't be repeated.",
      },
      {
        type: "heading",
        text: "Directing less, watching more",
      },
      {
        type: "paragraph",
        text: "We'll always ask for a few intentional portraits during the day — but the rest of the time, our job is mostly to notice, not to direct.",
      },
    ],
    faqs: [
      {
        question: "Will you still take posed family portraits?",
        answer:
          "Yes — we always block out time for the formal family and couple portraits your family will want. Candid coverage runs alongside that, not instead of it.",
      },
      {
        question: "Is candid photography more expensive than traditional coverage?",
        answer:
          "No, it's included in every package. It's a shooting style, not an add-on — see our Packages section for exactly what's covered at each tier.",
      },
    ],
  },
  {
    slug: "the-venue-we-fell-for",
    title: "The Venue We Fell For",
    metaDescription:
      "RBA Films & Photography on shooting architectural detail at a wedding ceremony setting.",
    excerpt:
      "Some venues photograph themselves — arched doorways, worn stone, a courtyard that catches light differently every hour.",
    featuredImage: heroImage("the-venue-we-fell-for"),
    publishedAt: "2026-04-02",
    blocks: [
      {
        type: "paragraph",
        text: "Some venues photograph themselves. This was one of them — arched doorways, worn stone, a courtyard that catches light differently every hour.",
      },
      {
        type: "heading",
        text: "Letting architecture lead the frame",
      },
      {
        type: "paragraph",
        text: "When a space has this much character, our job shifts from creating interest to simply not getting in its way.",
      },
    ],
    faqs: [
      {
        question: "Can you help us choose a wedding venue in Lahore?",
        answer:
          "We often accompany couples on venue visits once they've narrowed it down to a few options, purely from a light and photography standpoint.",
      },
      {
        question: "How much does wedding photography cost in Lahore?",
        answer:
          "Wedding photography prices in Lahore depend on the number of events, hours of coverage, team size, photography and cinematography requirements, albums, and other deliverables. At RBA Films & Photography, we create packages around your wedding rather than offering a one-size-fits-all solution. Contact us with your wedding dates and events for a customized quote.",
      },
       {
        question: "How far in advance should I book a wedding photographer in Lahore?",
        answer:
          "We recommend booking your wedding photographer in Lahore as early as possible once your wedding dates are confirmed. Popular dates, particularly during the October–March wedding season, can be reserved several months in advance. If your date is already fixed, get in touch with us to check availability.",
      },
       {
        question: "What is included in your wedding photography packages?",
        answer:
          "Our wedding photography packages can include photography, cinematic wedding films, multiple photographers and videographers, bridal and couple portraits, edited photographs, highlight films and premium albums, depending on the package selected. We can also customize coverage around your Mehndi, Nikah, Baraat and Walima.",
      },
       {
        question: "Do you cover Mehndi, Nikah, Baraat and Walima?",
        answer:
          "Yes. RBA Films & Photography provides wedding photography and cinematography for Mehndi, Mayun, Nikah, Baraat, Walima, Rukhsati and other wedding celebrations. We can cover individual events or create a complete visual story across multiple days.",
      },
       {
        question: "Do you provide both wedding photography and cinematic wedding videography?",
        answer:
          "Yes. RBA Films & Photography offers both wedding photography and cinematic wedding films. Our photography focuses on genuine moments, portraits and details, while our films combine visual storytelling, movement, music and the atmosphere of your celebration into a cinematic wedding story.",
      },
       {
        question: "What photography style do you specialize in?",
        answer:
          "Our approach combines candid wedding photography, refined portraits and cinematic visual storytelling. We aim to capture genuine interactions while also creating carefully composed portraits and atmospheric images that feel timeless rather than overly posed or heavily stylized.",
      },
       {
        question: "Will the photographer personally shoot my wedding?",
        answer:
          "We believe the creative vision should remain consistent from the first consultation to the wedding day. Your photography coverage is handled by our professional RBA team according to the package and requirements agreed upon during booking. We discuss the assigned team with you before your wedding so there are no surprises.",
      },
       {
        question: "How many photographers and videographers will cover my wedding?",
        answer:
          "The number of photographers and videographers depends on the size of your wedding, number of events and coverage requirements. Smaller celebrations may require a more intimate team, while larger multi-event weddings benefit from additional shooters to capture simultaneous moments, family interactions and different perspectives.",
      },
       {
        question: "How long does it take to receive wedding photographs and videos?",
        answer:
          "After your wedding, our team carefully selects and edits your photographs and films. Final delivery time depends on the number of events and selected package. Your agreed delivery timeline will be discussed and confirmed during booking.",
      },

      {
        question: "Do you offer pre-wedding and couple photography in Lahore?",
        answer:
          "Yes. We offer pre-wedding and couple photography sessions in Lahore. These sessions give couples an opportunity to create more relaxed portraits outside the pace of the wedding day, with locations, styling, lighting and visual direction planned around your preferred aesthetic.",
      },

      {
        question: "How do I book RBA Films & Photography for my wedding?",
        answer:
          "Booking your wedding photography with RBA Films & Photography starts with checking the availability of your date. Share your wedding date, venue and events with us, and we'll discuss your requirements and recommend suitable coverage. Once you decide to proceed, your date is secured according to the booking terms provided by our studio.",
      },

       {
        question: "Do you provide wedding albums?",
        answer:
          "Yes. Premium wedding albums can be included in selected RBA Films & Photography packages. Our album process includes image selection, design and professional printing, with the final format and specifications discussed according to your package.",
      },
      
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

/** Up to `limit` other posts, for the related-posts carousel. */
export function getRelatedPosts(currentSlug: string, limit = 4) {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}
