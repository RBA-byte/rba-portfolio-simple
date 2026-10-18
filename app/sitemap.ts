import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogPosts";
import { absoluteUrl } from "@/lib/site";
import { galleryPages } from "@/lib/galleryPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = blogPosts
    .map((post) => post.updatedAt ?? post.publishedAt)
    .sort()
    .pop();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latest ? new Date(latest) : new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
      ...galleryPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: new Date(page.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: page.images.map((img) => absoluteUrl(img.src)),
    })),
    
    {
      url: absoluteUrl("/blog"),
      lastModified: latest ? new Date(latest) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/faq"),
      lastModified: latest ? new Date(latest) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: post.role === "pillar" ? 0.9 : post.role === "support" ? 0.7 : 0.5,
    })),
  ];
}
