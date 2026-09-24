"use client";

import Image from "next/image";
import type { ResponsiveImage } from "@/types";

/**
 * Full-bleed backdrop for About/Contact that reuses whichever hero
 * photo the visitor was last looking at — blurred, darkened, and
 * given a film-grain texture so it reads as atmosphere, not a photo
 * you're meant to study.
 */
export default function SectionBackdrop({ image }: { image: ResponsiveImage }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 scale-110 blur-md transform-gpu">
        <Image
          src={image.mobile}
          alt=""
          fill
          sizes="100vw"
          className="object-cover md:hidden"
        />
        <Image
          src={image.desktop}
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover md:block"
        />
      </div>
      <div className="absolute inset-0 bg-ink/60" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
