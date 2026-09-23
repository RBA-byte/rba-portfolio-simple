"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { heroImages } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 300;

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.4"
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
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const lastIndex = heroImages.length - 1;

  const goTo = (next: number) => {
    setIndex(Math.max(0, Math.min(lastIndex, next)));
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

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-ink">
      <motion.div
        className="flex h-full cursor-grab touch-pan-y active:cursor-grabbing"
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.06}
        onDragEnd={handleDragEnd}
        animate={{ x: -index * width }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {heroImages.map((image, i) => (
          <div key={image.src} className="relative h-full w-full flex-shrink-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              sizes="100vw"
              className="pointer-events-none object-cover"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>

      {/* Subtle overlay for typography legibility, not a heavy darken */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />

      {/* Left arrow: hidden on first image, fades in after */}
      <AnimatePresence>
        {index > 0 && (
          <motion.button
            type="button"
            aria-label="Previous photograph"
            onClick={() => goTo(index - 1)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rotate-180 p-3 text-paper sm:left-6"
          >
            <ChevronRight />
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 p-3 text-paper sm:right-6"
          >
            <ChevronRight />
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
