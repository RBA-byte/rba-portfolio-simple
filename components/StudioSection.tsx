"use client";

import { useEffect, useState } from "react";
import { heroImages, photographerBio, socialLinks, studio } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function StudioSection({ active }: { active: boolean }) {
  const [loadMap, setLoadMap] = useState(false);
  useEffect(() => {
    if (active) setLoadMap(true);
  }, [active]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "RBA Films & Photography",
    // Our Google Business Profile is still listed under the old studio name.
    // Keep this until the GMB listing itself is renamed to match — removing
    // it before then would make Google's business records disagree with
    // each other. Delete this line once the GMB profile is updated.
    alternateName: ["Refractions By Ammar", "The Refractions Studio", "The Refractions Studio | Refractions By Ammar"],
    description:
      "Luxury cinematic wedding photography and wedding films in Lahore, Pakistan.",
    areaServed: { "@type": "City", name: "Lahore" },
    telephone: "+923356726627",
    address: {
      "@type": "PostalAddress",
      // addressLines above is just the visible, human-formatted address.
      // These structured fields (set in lib/content.ts) are what the
      // schema actually needs: a proper street, and city/region/country
      // as their own distinct properties — not one field with everything
      // crammed in.
       streetAddress: `${studio.addressLines[0]}, ${studio.neighborhood}`,
            addressLocality: studio.addressLocality,
      addressRegion: studio.addressRegion,
      addressCountry: studio.addressCountry,
      postalCode: studio.postalCode,
    },
    url: SITE_URL,
    logo: `${SITE_URL}/rba-logo.png`,
    hasMap: studio.mapsLink,
    image: SITE_URL + heroImages[0].desktop,
    priceRange: "PKR 30,000 - PKR 90,000",
    sameAs: [socialLinks.instagram, 
             "https://www.facebook.com/refractionsbyammar"
            ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.4968307,
      longitude: 74.2742321,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    // Spells out the two services the studio offers, each scoped to Lahore.
    // This doesn't feed Google's Local Business rich-result fields directly,
    // but it gives Google (and AI-search systems that read schema more
    // broadly) a clearer picture of what the business actually does.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wedding Photography & Film Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Photography in Lahore",
            serviceType: "Wedding Photography",
            areaServed: { "@type": "City", name: "Lahore" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cinematic Wedding Films in Lahore",
            serviceType: "Wedding Videography",
            areaServed: { "@type": "City", name: "Lahore" },
          },
        },
      ],
    },
    // Connects the business to its founder — same person as the byline on
    // every blog post (lib/content.ts → photographerBio).
    founder: {
      "@type": "Person",
      "@id": `${SITE_URL}/#ammar`,
      name: photographerBio.name,
      jobTitle: "Founder & Lead Photographer",
      image: SITE_URL + photographerBio.avatar,
      sameAs: [socialLinks.instagram],
      worksFor: { "@id": `${SITE_URL}/#business` },
    },
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
  onClick={(event) => {
    event.preventDefault();

    const callback = () => {
      window.location.href = studio.phoneHref;
    };

    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-18460277173/tbH4COr9moUdELXzxeJE",
        value: 1.0,
        currency: "PKR",
        event_callback: callback,
      });

      setTimeout(callback, 1000);
    } else {
      callback();
    }
  }}
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

                <div className="relative order-1 aspect-[4/3] w-full overflow-hidden bg-ink/5 sm:order-2">
          {loadMap && (
            <iframe
              src={studio.mapEmbedSrc}
              className="absolute inset-0 h-full w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing the location of ${studio.name}`}
            />
          )}
        </div>
      </div>
    </section>
  );
}
