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
 * paragraph.
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
    slug: "golden-hour-vows",
    title: "Golden Hour Vows",
    metaDescription:
      "Inside a golden-hour wedding ceremony shot by RBA Films & Photography — how light shapes a wedding film.",
    featuredImage: heroImage("golden-hour-vows"),
    publishedAt: "2026-06-12",
    blocks: [
      {
        type: "paragraph",
        text: "There's a narrow window, twenty minutes at most, when the light turns the whole world the same warm colour. Every wedding we shoot is planned, quietly, around finding that window.",
      },
      {
        type: "heading",
        text: "Why timing the light matters",
      },
      {
        type: "paragraph",
        text: "A ceremony scheduled an hour later can change everything about how it's remembered on film. We work with couples and their planners ahead of time to build the day around this light, not the other way around.",
      },
      {
        type: "paragraph",
        text: "The result isn't a filter or an edit — it's simply what the evening looked like, captured while it was happening.",
      },
      {
        type: "heading",
        text: "What we look for on the day",
      },
      {
        type: "paragraph",
        text: "Open ground facing west, minimal artificial light nearby, and a couple willing to step outside for ten quiet minutes together. That's usually all it takes.",
      },
    ],
  },
  {
    slug: "the-details-that-matter",
    title: "The Details That Matter",
    metaDescription:
      "Why RBA Films & Photography spends the first hour of every wedding on details most guests never notice.",
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
  },
  {
    slug: "an-evening-in-lahore",
    title: "An Evening in Lahore",
    metaDescription:
      "A behind-the-scenes look at a dusk wedding venue in Lahore, photographed by RBA Films & Photography.",
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
  },
  {
    slug: "candid-and-unposed",
    title: "Candid & Unposed",
    metaDescription:
      "How RBA Films & Photography captures genuine, unposed moments during a wedding day.",
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
  },
  {
    slug: "the-venue-we-fell-for",
    title: "The Venue We Fell For",
    metaDescription:
      "RBA Films & Photography on shooting architectural detail at a wedding ceremony setting.",
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
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
