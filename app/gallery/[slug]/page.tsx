import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GalleryPageView from "@/components/GalleryPageView";
import {
  galleryMetadata,
  galleryPages,
  galleryPathFromSlug,
  gallerySlugFromPath,
  getGalleryPage,
} from "@/lib/galleryPages";

/**
 * Serves every gallery page listed in lib/galleryPages.ts: add an entry
 * there and the page exists. Nothing to create here.
 */
export const revalidate = 3600;
export const dynamicParams = false; // unknown slugs → 404

export function generateStaticParams() {
  return galleryPages.map((p) => ({ slug: gallerySlugFromPath(p.path) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getGalleryPage(galleryPathFromSlug(slug));
  return page ? galleryMetadata(page) : {};
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getGalleryPage(galleryPathFromSlug(slug));
  if (!page) notFound();
  return <GalleryPageView page={page} />;
}
