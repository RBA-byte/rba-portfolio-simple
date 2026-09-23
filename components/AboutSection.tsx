"use client";

import Image from "next/image";
import { aboutCopy, aboutImage } from "@/lib/content";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="flex h-full w-full flex-col items-center justify-center bg-paper px-6 text-ink sm:px-10"
    >
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-14">
        <div className="relative order-2 aspect-[4/5] w-full overflow-hidden sm:order-1">
          <Image
            src={aboutImage.src}
            alt={aboutImage.alt}
            fill
            sizes="(min-width: 640px) 40vw, 90vw"
            loading="lazy"
            className="object-cover"
          />
        </div>

        <div className="order-1 flex flex-col items-start sm:order-2">
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            {aboutCopy.heading}
          </h2>
          <div className="mt-5 h-px w-10 bg-ink/30" />
          <div className="mt-6 flex flex-col gap-4">
            {aboutCopy.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 16)}
                className="max-w-[38ch] text-[0.95rem] font-light leading-relaxed text-ink/75"
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
