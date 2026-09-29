import type { BlogBlock, ResponsiveImage } from "@/types";

/** Short builders so post files stay readable. Inline links: [text](/blog/slug) */
export const h = (text: string): BlogBlock => ({ type: "heading", text });
export const h3 = (text: string): BlogBlock => ({ type: "subheading", text });
export const p = (text: string): BlogBlock => ({ type: "paragraph", text });
export const ul = (items: string[]): BlogBlock => ({ type: "list", items });
export const ol = (items: string[]): BlogBlock => ({
  type: "list",
  items,
  ordered: true,
});

/**
 * Placeholder featured image for a post. To replace it, drop your own files
 * into /public/images/blog/ using the same names:
 *   <slug>.webp            portrait crop  (1200 x 1600)
 *   <slug>-landscape.webp  landscape crop (1600 x 1200)
 * Then update the `alt` text here if the photo changes meaningfully.
 */
export function blogImage(slug: string, alt: string): ResponsiveImage {
  return {
    mobile: `/images/blog/${slug}.webp`,
    desktop: `/images/blog/${slug}-landscape.webp`,
    alt,
  };
}
