/**
 * Single source of truth for the production domain. Used for canonical URLs,
 * sitemap, Open Graph and structured data. If the domain changes, change it
 * here (or set NEXT_PUBLIC_SITE_URL in your host's environment settings).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rbaweddingfilms.com"
).replace(/\/$/, "");

export const SITE_NAME = "RBA Films & Photography";

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Crawlable links rendered (visually hidden) on the homepage, because the
 * homepage is a full-screen carousel with no visible text links. Keep in sync
 * with the pillar posts in lib/blog/*.ts.
 */
export const homepageCrawlLinks: { href: string; label: string }[] = [
  { href: "/blog", label: "Wedding photography journal" },
  { href: "/faq", label: "Wedding photography FAQs" },
  {
    href: "/blog/wedding-photographer-in-lahore-guide",
    label: "Wedding photographer in Lahore: how to choose",
  },
  {
    href: "/blog/wedding-photography-in-lahore-styles-seasons",
    label: "Wedding photography in Lahore: styles, seasons and what to expect",
  },
  {
    href: "/blog/planning-a-luxury-wedding-in-lahore",
    label: "Planning a luxury wedding in Lahore",
  },
  {
    href: "/blog/what-makes-a-wedding-film-cinematic",
    label: "What makes a wedding film cinematic",
  },
  {
    href: "/blog/best-wedding-photography-locations-in-lahore",
    label: "Best wedding photography locations in Lahore",
  },
  {
    href: "/blog/how-much-does-wedding-photography-cost-in-lahore",
    label: "Wedding photography cost in Lahore",
  },
];
