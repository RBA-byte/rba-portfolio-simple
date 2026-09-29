import { choosingPosts } from "@/lib/blog/choosing";
import { craftPosts } from "@/lib/blog/craft";
import { luxuryPosts, cinematicPosts } from "@/lib/blog/luxury-cinematic";
import { locationPosts } from "@/lib/blog/locations";
import { storyPosts } from "@/lib/blog/stories";
import type { BlogCluster, BlogPost } from "@/types";

/**
 * How the Journal is organised
 * ────────────────────────────
 * Each topic cluster has ONE pillar post (long-form hub, 1,200+ words) and
 * several supporting posts that link up to it. Add new posts to the matching
 * file in lib/blog/, or copy any object and set its `cluster`, `role` and
 * `pillarSlug`. Rules that keep the SEO clean:
 *   - one primaryKeyword per post, never reused (prevents cannibalisation)
 *   - every support post sets `pillarSlug` and links to its pillar in the body
 *   - inline links use [anchor text](/blog/slug)
 *   - FAQs are NOT written per post any more — edit lib/faqs.ts instead
 *
 * The five "story" posts below are the ones the homepage carousel links to
 * (their slugs must match the hero photos in lib/content.ts).
 */



export const blogPosts: BlogPost[] = [
  ...choosingPosts,
  ...craftPosts,
  ...luxuryPosts,
  ...cinematicPosts,
  ...locationPosts,
  ...storyPosts,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const pillarPosts = blogPosts.filter((post) => post.role === "pillar");

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

/** Support posts that belong to a pillar, newest first. */
export function getPillarChildren(pillarSlug: string) {
  return blogPosts.filter((post) => post.pillarSlug === pillarSlug);
}

/** Posts grouped by cluster, pillar first — used by the /blog index. */
export const clusterOrder: BlogCluster[] = [
  "Choosing a Photographer",
  "Wedding Photography",
  "Luxury Weddings",
  "Cinematic Films",
  "Lahore Locations",
  "Studio Stories",
];

export function getPostsByCluster(cluster: BlogCluster) {
  const list = blogPosts.filter((post) => post.cluster === cluster);
  return [
    ...list.filter((post) => post.role === "pillar"),
    ...list.filter((post) => post.role !== "pillar"),
  ];
}

/**
 * Related posts, most relevant first:
 *   1. the post's own pillar (if it is a support post)
 *   2. hand-picked `relatedSlugs`
 *   3. its children (if it is a pillar) / siblings under the same pillar
 *   4. newest remaining posts
 */
export function getRelatedPosts(post: BlogPost, limit = 6) {
  const ordered: (BlogPost | undefined)[] = [];
  if (post.pillarSlug) ordered.push(getBlogPost(post.pillarSlug));
  (post.relatedSlugs ?? []).forEach((slug) => ordered.push(getBlogPost(slug)));
  if (post.role === "pillar") ordered.push(...getPillarChildren(post.slug));
  if (post.pillarSlug) ordered.push(...getPillarChildren(post.pillarSlug));
  ordered.push(...blogPosts);

  const seen = new Set<string>([post.slug]);
  const result: BlogPost[] = [];
  for (const candidate of ordered) {
    if (!candidate || seen.has(candidate.slug)) continue;
    seen.add(candidate.slug);
    result.push(candidate);
    if (result.length >= limit) break;
  }
  return result;
}
