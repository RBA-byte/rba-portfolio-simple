"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import SectionBackdrop from "@/components/SectionBackdrop";
import { GOOGLE_REVIEWS_URL, testimonials } from "@/lib/testimonials";
import type { ResponsiveImage } from "@/types";

const GAP_PX = 16; // matches gap-4 on the track

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[13px] w-[13px]"
      fill={filled ? "#E8CC94" : "none"}
      stroke="#E8CC94"
      strokeWidth="1.4"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8L12 2.8z" />
    </svg>
  );
}

export default function TestimonialsSection({ image }: { image: ResponsiveImage }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const stepOf = (el: HTMLDivElement) => {
    const card = el.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + GAP_PX : 0;
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const step = stepOf(el);
    if (step === 0) return;
    const next = Math.round(el.scrollLeft / step);
    setActive(Math.max(0, Math.min(testimonials.length - 1, next)));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * stepOf(el), behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      className="relative min-h-[100dvh] w-full overflow-hidden text-paper"
    >
      <SectionBackdrop image={image} />

      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-center py-16">
        <div className="px-6 text-center">
          <h2 className="font-display text-2xl leading-snug sm:text-3xl">
            KIND WORDS
          </h2>
          <p className="mx-auto mt-4 max-w-[30ch] text-[0.85rem] font-light text-paper/70">
            What our couples say — swipe to read more.
          </p>
        </div>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar mt-9 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
          style={{ paddingInline: "calc(50% - min(40vw, 12rem))" }}
        >
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className="flex aspect-square w-[80vw] max-w-[24rem] flex-shrink-0 snap-center flex-col overflow-hidden rounded-lg shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
            >
              {/* Upper part: client photo, name + stars bottom-right */}
              <div className="relative basis-[55%] overflow-hidden bg-ink">
                <Image
                  src={t.image}
                  alt={t.alt}
                  fill
                  sizes="(max-width: 640px) 80vw, 384px"
                  className="object-cover object-[center_30%]"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <div className="absolute bottom-3.5 right-4 max-w-[85%] text-right">
                  <h3 className="font-display text-[1.75rem] uppercase leading-[0.95] tracking-tight text-paper">
                    {t.name}
                  </h3>
                  <div
                    role="img"
                    aria-label={`${t.rating} out of 5 stars`}
                    className="mt-2 flex justify-end gap-0.5"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} filled={n <= t.rating} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Lower part: editorial quote + Google reviews link */}
              <div className="relative flex basis-[45%] flex-col overflow-hidden bg-paper px-5 pb-4 pt-4 text-ink">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 -top-1 select-none font-display text-[7rem] leading-none text-ink/10"
                >
                  &ldquo;
                </span>
                <p className="relative line-clamp-4 pr-6 text-[0.8rem] font-light leading-snug text-ink/80">
                  {t.quote}
                </p>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-auto self-start pt-2 text-[0.6rem] font-medium tracking-[0.18em] text-ink underline decoration-ink/30 underline-offset-4 transition-opacity hover:opacity-60"
                >
                  READ MORE REVIEWS ON GOOGLE
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Show review ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-5 bg-paper" : "w-1.5 bg-paper/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
