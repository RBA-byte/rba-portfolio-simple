"use client";

import { studio } from "@/lib/content";

export default function StudioSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: studio.name,
    telephone: studio.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: studio.addressLines[0],
      addressLocality: studio.addressLines.slice(1).join(", "),
    },
    url: studio.mapsLink,
  };

  return (
    <section
      id="studio"
      className="relative flex h-full w-full items-center justify-center bg-paper px-6 text-ink sm:px-10"
    >
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-14">
        <div className="order-2 flex flex-col items-start text-left sm:order-1">
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            VISIT THE STUDIO
          </h2>
          <div className="mt-5 h-px w-10 bg-ink/30" />

          <address className="mt-6 max-w-[30ch] text-[0.95rem] font-light not-italic leading-relaxed text-ink/75">
            {studio.name}
            <br />
            {studio.addressLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </address>

          <a
            href={studio.phoneHref}
            className="mt-4 text-[0.95rem] font-light text-ink/85 underline decoration-ink/30 underline-offset-4"
          >
            {studio.phoneDisplay}
          </a>

          <a
            href={studio.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 border border-ink px-6 py-3 text-[0.72rem] font-medium tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            GET DIRECTIONS
          </a>
        </div>

        <div className="relative order-1 aspect-[4/3] w-full overflow-hidden sm:order-2">
          <iframe
            src={studio.mapEmbedSrc}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map showing the location of ${studio.name}`}
          />
        </div>
      </div>
    </section>
  );
}
