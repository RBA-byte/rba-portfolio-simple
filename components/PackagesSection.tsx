"use client";

import { useRef, useState } from "react";
import SectionBackdrop from "@/components/SectionBackdrop";
import { weddingPackages } from "@/lib/content";
import type { ResponsiveImage } from "@/types";

export default function PackagesSection({ image }: { image: ResponsiveImage }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.max(0, Math.min(weddingPackages.length - 1, next)));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section
      id="packages"
      className="relative flex h-full w-full items-center justify-center overflow-y-auto px-6 text-paper sm:px-10"
    >
      <SectionBackdrop image={image} />

      <div className="relative z-10 my-auto w-full max-w-md py-16">
        <div
          className="rounded-sm border border-paper/10 px-6 py-9 sm:px-10 sm:py-12"
          style={{
            background: "rgba(19,18,16,0.42)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          <div className="text-center">
            <h2 className="font-display text-2xl leading-snug sm:text-3xl">
              WEDDING PACKAGES
            </h2>
            <p className="mx-auto mt-4 max-w-[30ch] text-[0.85rem] font-light text-paper/70">
              Three ways to work with us — swipe to compare coverage.
            </p>
          </div>

          {/* Smooth, native momentum + snap scrolling gives the natural
              ease-in/ease-out feel without hand-rolled animation. */}
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="no-scrollbar mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
          >
            {weddingPackages.map((pkg) => (
              <div
                key={pkg.name}
                className="w-full flex-shrink-0 snap-center rounded-sm border border-paper/15 bg-ink/45 px-6 py-8 text-center"
              >
                <span className="text-[0.68rem] font-medium tracking-[0.24em] text-paper/60">
                  {pkg.name.toUpperCase()}
                </span>
                <div className="mt-3 font-display text-[2rem] leading-none text-paper">
                  {pkg.price}
                </div>
                <ul className="mx-auto mt-6 flex max-w-[22ch] flex-col gap-2.5">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-[0.85rem] font-light leading-snug text-paper/80"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {weddingPackages.map((pkg, i) => (
              <button
                key={pkg.name}
                type="button"
                aria-label={`Show the ${pkg.name} package`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-5 bg-paper" : "w-1.5 bg-paper/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
