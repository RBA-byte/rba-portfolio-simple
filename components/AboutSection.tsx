"use client";

import SectionBackdrop from "@/components/SectionBackdrop";
import { aboutCopy } from "@/lib/content";
import type { ResponsiveImage } from "@/types";

export default function AboutSection({ image }: { image: ResponsiveImage }) {
  return (
        <section
      id="about"
      className="relative min-h-[100dvh] w-full overflow-hidden text-paper"
    >
      <SectionBackdrop image={image} />

      {/* Scrolling happens in this inner layer so the backdrop stays pinned */}
      <div className="relative z-10 flex min-h-[100dvh] w-full items-center justify-center overflow-y-auto px-6 sm:px-10">
      

      <div className="relative z-10 my-auto flex w-full max-w-md flex-col items-center py-16 text-center">
        <h2 className="font-display text-3xl leading-tight sm:text-4xl">
          {aboutCopy.heading}
        </h2>
        <div className="mt-5 h-px w-10 bg-paper/40" />
        <div className="mt-6 flex flex-col gap-4">
          {aboutCopy.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 16)}
              className="text-[0.95rem] font-light leading-relaxed text-paper/85"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
         </div>
    </section>
  );
}
