import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/lib/blogPosts";
import { pickFaqs } from "@/lib/faqs";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import { photographerBio } from "@/lib/content";
import BlogPostView from "@/components/BlogPostView";

/**
 * Pages are pre-built, then re-generated in the background at most once an
 * hour. Each regeneration draws a fresh random set of FAQs, so the questions
 * rotate over time while the visible text and the FAQPage schema always match.
 */
export const revalidate = 3600;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const image = absoluteUrl(post.featuredImage.desktop);

  return {
    title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description: post.metaDescription,
      type: "article",
      url: `/blog/${post.slug}`,
      siteName: SITE_NAME,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [photographerBio.name],
      images: [{ url: image, alt: post.featuredImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.metaDescription,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const publishedDisplay = new Date(post.publishedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const pillar = post.pillarSlug ? getBlogPost(post.pillarSlug) : undefined;
  const related = getRelatedPosts(post, 6);
  const faqs = pickFaqs(post.faqTags ?? []);
  const url = absoluteUrl(`/blog/${post.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: [absoluteUrl(post.featuredImage.desktop)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    articleSection: post.cluster,
    ...(post.primaryKeyword ? { keywords: post.primaryKeyword } : {}),
    author: {
      "@type": "Person",
      name: photographerBio.name,
      jobTitle: photographerBio.role,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Journal", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        // eslint-disable-next-line react/no-danger
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <BlogPostView
        post={post}
        publishedDisplay={publishedDisplay}
        related={related}
        faqs={faqs}
        pillar={pillar}
      />
    </>
  );
}
