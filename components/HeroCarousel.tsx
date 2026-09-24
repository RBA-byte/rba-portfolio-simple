"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { heroImages } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 300;
/** Pointer has to move less than this (px) to still count as a tap, not a swipe. */
const TAP_TOLERANCE = 8;

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 9l7 7 7-7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroCarousel({
  index,
  onIndexChange,
  onContinue,
}: {
  index: number;
  onIndexChange: (next: number) => void;
  onContinue: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const router = useRouter();
  // Tracked natively (not via Framer's drag events) so a tap can be told
  // apart from a swipe regardless of which slide is currently active.
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, []);

  const lastIndex = heroImages.length - 1;

  const goTo = (next: number) => {
    onIndexChange(Math.max(0, Math.min(lastIndex, next)));
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) {
      goTo(index + 1);
    } else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) {
      goTo(index - 1);
    }
  };

  // The full draggable range across every slide — NOT per-slide. Pinning
  // this to {left:0, right:0} (the previous bug) forced the track back
  // toward slide 0 the instant a drag began, no matter which slide was
  // active, producing a visible flash back to the first photo.
  const maxOffset = lastIndex * width;

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (slug: string) => (e: React.PointerEvent) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const distance = Math.hypot(e.clientX - start.x, e.clientY - start.y);
    // Only a genuine tap (barely any movement) opens the post — anything
    // further was a swipe intended to change slides, not follow a link.
    if (distance < TAP_TOLERANCE) {
      router.push(`/blog/${slug}`);
    }
  };

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-ink">
      <motion.div
        className="flex h-full cursor-grab touch-pan-y active:cursor-grabbing"
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: -maxOffset, right: 0 }}
        dragElastic={0.06}
        onDragEnd={handleDragEnd}
        animate={{ x: -index * width }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {heroImages.map((image, i) => (
          <div
            key={image.slug}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp(image.slug)}
            role="link"
            tabIndex={0}
            aria-label={`Read the story behind this photograph: ${image.alt}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                router.push(`/blog/${image.slug}`);
              }
            }}
            className="relative h-full w-full flex-shrink-0 cursor-pointer"
          >
            {/* Portrait crop for phones */}
            <Image
              src={image.mobile}
              alt={image.alt}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              sizes="100vw"
              className="pointer-events-none object-cover md:hidden"
              draggable={false}
            />
            {/* Landscape crop for tablets/desktop */}
            <Image
              src={image.desktop}
              alt={image.alt}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              sizes="100vw"
              className="pointer-events-none hidden object-cover md:block"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>

      {/* Subtle overlay for typography legibility, not a heavy darken */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />

      {/* Left arrow: hidden on first image, fades in with a slight zoom */}
      <AnimatePresence>
        {index > 0 && (
          <motion.button
            type="button"
            aria-label="Previous photograph"
            onClick={() => goTo(index - 1)}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="glass-pill absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-paper sm:left-6"
          >
            <ChevronRight className="-ml-0.5 rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Right arrow: hidden at the last image */}
      <AnimatePresence>
        {index < lastIndex && (
          <motion.button
            type="button"
            aria-label="Next photograph"
            onClick={() => goTo(index + 1)}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="glass-pill absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-paper sm:right-6"
          >
            <ChevronRight className="ml-0.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Continue scrolling indicator */}
      <motion.button
        type="button"
        aria-label="Scroll to About Us"
        onClick={onContinue}
        className="absolute bottom-[max(1.9rem,env(safe-area-inset-bottom))] left-1/2 z-10 -translate-x-1/2 text-paper/85"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown />
      </motion.button>
    </div>
  );
}
