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
    slug: "luxury-cinematic-wedding-photography-lahore",
    title: "AFTERGLOW",
    metaDescription:
      "Discover the art of luxury cinematic wedding photography in Lahore, from atmospheric Walima portraits to timeless, editorial wedding storytelling.",
    featuredImage: heroImage("luxury-cinematic-wedding-photography-lahore"),
    publishedAt: "2026-06-12",
    blocks: [
      {
        type: "heading",
        text: "Luxury Cinematic Wedding Photography in Lahore: The Walima Edit",
      },
	  
	  {
        type: "paragraph",
        text: "A Walima carries a different kind of energy. After the celebrations, rituals, colour and movement of the wedding days, there is often a quieter elegance to the reception—the couple, the atmosphere, the details and the emotions taking centre stage. For couples looking for luxury wedding photography in Lahore, a Walima offers an opportunity to create photographs that feel less like conventional event coverage and more like frames from a cinematic story.",
      },
      {
        type: "heading",
        text: "Creating a Cinematic Walima",
      },
      {
        type: "paragraph",
        text: "Cinematic wedding photography is not simply about making an image look dramatic. It is about creating an atmosphere The use of controlled light, carefully considered composition, movement, depth and colour can transform an ordinary moment into something visually expressive. Smoke, haze and atmospheric elements can add another layer of depth, allowing light to become part of the composition itself. In a portrait like this, the couple becomes the centre of the frame while the surrounding atmosphere creates separation and dimension.",
      },
      {
        type: "paragraph",
        text: "Luxury photography is often associated with elaborate venues, couture, florals and grand décor. But the feeling of luxury can also come from restraint. Clean compositions. Intentional lighting. Elegant posing. Beautiful skin tones. Subtle movement. Rather than photographing every moment in the same way, a cinematic approach allows certain images to breathe. The result is a wedding gallery that feels cohesive and considered rather than simply a collection of event photographs.",
      },
      {
        type: "heading",
        text: "The Editorial Influence",
      },
      {
        type: "paragraph",
        text: "There is a growing appreciation for editorial wedding photography in Lahore, particularly among couples who want their wedding photographs to feel contemporary while still retaining the character of a Pakistani celebration. Editorial photography brings attention to composition, styling, light and expression. Combined with cinematic wedding storytelling, it can create portraits that feel timeless rather than tied to a particular trend. A Walima portrait is particularly suited to this approach. The evening setting, formal attire and refined atmosphere naturally lend themselves to a more sophisticated visual language.",
      },
	  
	   {
        type: "heading",
        text: "Capturing the Couple, Not Just the Event",
      },
      {
        type: "paragraph",
        text: "Wedding photography should ultimately be about the people. The venue will change. The décor will eventually be dismantled. The flowers will disappear. What remains are the photographs that bring the feeling of the evening back. A cinematic wedding photographer looks for those moments of connection—the way a couple holds each other, a glance between them, a quiet pause between celebrations. These moments don't need to be forced. They need to be noticed.",
      },
	  
	   {
        type: "heading",
        text: "Cinematic Wedding Photography in Lahore",
      },
      {
        type: "paragraph",
        text: "Lahore weddings have their own visual character. From traditional ceremonies and vibrant Mehndis to formal Baraats and elegant Walimas, every celebration has a different rhythm. Our approach at RBA Films & Photography is to combine the emotion of documentary photography with the visual language of cinema and editorial portraiture. The goal isn't simply to document what happened. It is to create photographs and films that allow you to remember how it felt. For couples searching for a luxury wedding photographer in Lahore who approaches weddings through cinematic storytelling, the Walima can become more than the final event of the celebrations. It can become the beginning of the story you keep.",
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
