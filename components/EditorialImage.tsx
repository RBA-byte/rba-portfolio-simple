"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export interface EditorialImageMeta {
  photographer?: string;
  model?: string;
  collection?: string;
  location?: string;
  issue?: string;
  category?: string;
}

export interface EditorialImageProps {
  /**
   * The unedited source photo. If srcMobile/srcDesktop aren't given,
   * this single image is used for every layer at every breakpoint.
   */
  src?: string;
  /** Portrait crop shown below the md (768px) breakpoint. */
  srcMobile?: string;
  /** Landscape/wide crop shown at md (768px) and above. */
  srcDesktop?: string;
  decorativeTitle?: string
  title: string;
  alt?: string;
  /** 0–100. Where the subject sits in the source photo. */
  focalPointX?: number;
  focalPointY?: number;
  /** px */
  blur?: number;
  /** % of the container's width */
  centerSquareSize?: number;
  grainOpacity?: number;
  grayscale?: boolean;
  /** % */
  contrast?: number;
  titleLeft?: string;
  titleBottom?: string;
  showMeta?: boolean;
  meta?: EditorialImageMeta;
  /** CSS aspect-ratio below the md breakpoint, e.g. "3/4" */
  aspectRatio?: string;
  /** CSS aspect-ratio at md and above. Defaults to aspectRatio (no change). */
  desktopAspectRatio?: string;
  draggableSquare?: boolean;
  /** 0–100 starting position of the square */
  initialSquareX?: number;
  initialSquareY?: number;
  enableSnap?: boolean;
  enableParallax?: boolean;
  backgroundParallax?: number;
  squareParallax?: number;
  titleParallax?: number;
  priority?: boolean;
  /** Camera-style readout shown below the viewfinder frame. */
  shutterSpeed?: string;
  aperture?: string;
  iso?: string;
  /** Small center focus crosshair inside the frame. Default on. */
  enableCrosshair?: boolean;
  /** Brief crosshair pulse when the viewfinder is released. Default on. */
  enableFocusAnimation?: boolean;
  /** Optional tiny label above the settings, e.g. "AF-C". Off by default. */
  focusMode?: string;
  /** Optional tiny red REC indicator. Off by default; stays monochrome otherwise. */
  recording?: boolean;

}

const EASE = [0.22, 1, 0.36, 1] as const;

const SNAP_POINTS = [
  { x: 0.25, y: 0.25 },
  { x: 0.5, y: 0.25 },
  { x: 0.75, y: 0.25 },
  { x: 0.25, y: 0.5 },
  { x: 0.5, y: 0.5 },
  { x: 0.75, y: 0.5 },
  { x: 0.25, y: 0.75 },
  { x: 0.5, y: 0.75 },
  { x: 0.75, y: 0.75 },
];
const SNAP_THRESHOLD = 0.06;
const KEY_STEP = 0.02;
const KEY_STEP_LARGE = 0.08;
/** Reserved space (px) below the frame for the settings readout, used
 * when clamping the viewfinder's vertical drag range so the settings
 * text never gets pushed outside the composition. */
const SETTINGS_BLOCK_HEIGHT = 28;

/**
 * Procedural, monochrome film-grain layer (SVG feTurbulence data URI —
 * no texture asset needed).
 */
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Grain({ opacity }: { opacity: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 mix-blend-overlay transform-gpu"
      style={{ opacity, backgroundImage: GRAIN_URL }}
    />
  );
}

export default function EditorialImage({
  src,
  srcMobile,
  srcDesktop,
  decorativeTitle,
  title,
  alt,
  focalPointX = 50,
  focalPointY = 50,
  blur = 20,
  centerSquareSize = 42,
  grainOpacity = 0.12,
  grayscale = true,
  contrast = 108,
  titleLeft = "4%",
  titleBottom = "3%",
  showMeta = false,
  meta,
  aspectRatio = "3/4",
  desktopAspectRatio,
  draggableSquare = true,
  initialSquareX = 50,
  initialSquareY = 50,
  enableSnap = false,
  enableParallax = true,
  backgroundParallax = 0.08,
  squareParallax = 0.04,
  titleParallax = 0.025,
  priority = false,
  shutterSpeed = "1/125",
  aperture = "F2.8",
  iso = "ISO 400",
  enableCrosshair = true,
  enableFocusAnimation = true,
  focusMode,
  recording = false,
}: EditorialImageProps) {
  const mobileSrc = srcMobile ?? src;
  const desktopSrc = srcDesktop ?? src;
  if (!mobileSrc || !desktopSrc) {
    throw new Error("EditorialImage needs either `src`, or both `srcMobile` and `srcDesktop`.");
  }

  const containerRef = useRef<HTMLDivElement>(null);
  // Imperatively positioned — mutated directly via .style, never through
  // React state, so dragging and scrolling never trigger a re-render.
  // Now wraps the WHOLE viewfinder group (frame + crosshair + settings),
  // not just the square, so they all move together as one object.
  const squareOuterRef = useRef<HTMLDivElement>(null);
  // Two window images (mobile/desktop crop) so whichever is visible at
  // the current breakpoint stays in sync with the drag position.
  const windowImgRefMobile = useRef<HTMLImageElement>(null);
  const windowImgRefDesktop = useRef<HTMLImageElement>(null);
  // Crosshair element, nudged with a brief scale pulse on release via a
  // CSS animation class (imperative — no state per interaction).
  const crosshairRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  // The decorative title's font-size, auto-fit to the measured text so a
  // long title never overflows the frame (see the measurement effect
  // below). Null until the first measurement completes.
  const titleTextRef = useRef<HTMLParagraphElement>(null);
  const [titleFontSize, setTitleFontSize] = useState<number | null>(null);
  // Only flips twice per drag gesture (start/end), not per pointermove,
  // so this is safe as state — it drives the subtle "focusing" brighten.
  const [isDragging, setIsDragging] = useState(false);
  const reducedMotion = useReducedMotion();

  // Normalized 0..1 square position, kept outside React state.
  const posRef = useRef({ x: initialSquareX / 100, y: initialSquareY / 100 });
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const hasHintedRef = useRef(false);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(el);
    setSize({ width: el.clientWidth, height: el.clientHeight });
    return () => observer.disconnect();
  }, []);

  const squareSizePx = Math.round(size.width * (centerSquareSize / 100));

  // Auto-fits the decorative title to the container's actual width so a
  // long title can never overflow the frame — the old approach (a
  // viewport-relative clamp() with white-space: nowrap) had no way to
  // account for the specific string length, so longer titles could spill
  // past the edge. This measures the real rendered width at a candidate
  // size and scales it down if needed, matching the "one line, shrink
  // rather than wrap" behavior from the original brief.
  useEffect(() => {
    const el = titleTextRef.current;
    if (!el || size.width === 0) return;

    const measure = () => {
      // Start from the same scale the old clamp() used, but relative to
      // this component's own measured width rather than the viewport —
      // more correct once this can sit inside a padded desktop wrapper.
      const candidate = Math.min(150, Math.max(48, size.width * 0.12));
      el.style.fontSize = `${candidate}px`;
      const available = size.width * 0.92; // matches the max-w-[92%] wrapper
      const natural = el.scrollWidth;
      const fitted =
        natural > available ? Math.max(24, candidate * (available / natural)) : candidate;
      setTitleFontSize(fitted);
    };

    measure();
    // Re-measure once the real display font has actually loaded — before
    // that, the browser measures against a fallback font and the fit
    // can be slightly off.
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decorativeTitle, title, size.width]);

  // Moves the square to a normalized (x,y) position and shifts the
  // "window" image(s) by the exact opposite amount, so whatever the
  // square reveals lines up pixel-for-pixel with the blurred layer
  // beneath it — the "clear window on the same photo" effect. Both the
  // mobile and desktop window images are kept in sync even though only
  // one is visible at a time, so nothing is out of place if the
  // breakpoint changes mid-interaction.
  const applyPosition = useCallback(
    (x: number, y: number) => {
      const clampedX = Math.min(1, Math.max(0, x));
      const clampedY = Math.min(1, Math.max(0, y));
      posRef.current = { x: clampedX, y: clampedY };

      const maxLeft = Math.max(0, size.width - squareSizePx);
      // Reserve room below the frame for the settings readout — the
      // settings count as part of the viewfinder's bounding box, so the
      // whole group (not just the square) must stay inside the image.
      const groupHeight = squareSizePx + SETTINGS_BLOCK_HEIGHT;
      const maxTop = Math.max(0, size.height - groupHeight);
      const left = clampedX * maxLeft;
      const top = clampedY * maxTop;

      if (squareOuterRef.current) {
        squareOuterRef.current.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      }
      const windowTransform = `translate3d(${-left}px, ${-top}px, 0)`;
      if (windowImgRefMobile.current) windowImgRefMobile.current.style.transform = windowTransform;
      if (windowImgRefDesktop.current) windowImgRefDesktop.current.style.transform = windowTransform;
    },
    [size.width, size.height, squareSizePx]
  );

  // Re-clamp/re-place on measurement changes (mount, resize, orientation,
  // or switching between the mobile/desktop aspect ratio).
  useLayoutEffect(() => {
    applyPosition(posRef.current.x, posRef.current.y);
  }, [applyPosition]);

  // A one-time, extremely subtle nudge so the square quietly signals
  // it's draggable — center, a few px right, back, settle. No overlay,
  // no localStorage; it simply never repeats within this mounted instance.
  useEffect(() => {
    if (!draggableSquare || reducedMotion || hasHintedRef.current || size.width === 0) {
      return;
    }
    hasHintedRef.current = true;
    const startX = posRef.current.x;
    const travel = Math.max(1, size.width - squareSizePx);
    const nudge = 5 / travel;
    const timers = [
      setTimeout(() => applyPosition(startX + nudge, posRef.current.y), 500),
      setTimeout(() => applyPosition(startX - nudge, posRef.current.y), 900),
      setTimeout(() => applyPosition(startX, posRef.current.y), 1300),
    ];
    return () => timers.forEach(clearTimeout);
    // Only re-arm if the measured width changes before it's fired once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width]);

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggableSquare) return;
    const square = squareOuterRef.current;
    if (!square) return;
    square.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    setIsDragging(true);
    square.style.transition = "none";

    const squareRect = square.getBoundingClientRect();
    // Preserve the grab offset so the square doesn't jump to re-center
    // under the pointer the instant the drag starts.
    dragOffsetRef.current = {
      x: e.clientX - squareRect.left,
      y: e.clientY - squareRect.top,
    };
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const maxLeft = Math.max(0, size.width - squareSizePx);
    const groupHeight = squareSizePx + SETTINGS_BLOCK_HEIGHT;
    const maxTop = Math.max(0, size.height - groupHeight);
    const left = e.clientX - containerRect.left - dragOffsetRef.current.x;
    const top = e.clientY - containerRect.top - dragOffsetRef.current.y;
    const x = maxLeft > 0 ? left / maxLeft : 0;
    const y = maxTop > 0 ? top / maxTop : 0;
    requestAnimationFrame(() => applyPosition(x, y));
  };

  const finishDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    const square = squareOuterRef.current;
    if (square) {
      square.style.transition = "";
      if (square.hasPointerCapture(e.pointerId)) {
        square.releasePointerCapture(e.pointerId);
      }
    }
    // Brief, subtle "focus lock" pulse on the crosshair — restarts the
    // CSS animation by toggling the class off and back on, avoiding any
    // React state/re-render for it.
    if (enableFocusAnimation && enableCrosshair && !reducedMotion && crosshairRef.current) {
      const el = crosshairRef.current;
      el.classList.remove("viewfinder-focus-pulse");
      // Force a reflow so removing/re-adding the class actually restarts it.
      void el.offsetWidth;
      el.classList.add("viewfinder-focus-pulse");
    }
    if (!enableSnap) return;

    const { x, y } = posRef.current;
    let nearest: { x: number; y: number } | null = null;
    let nearestDist = Infinity;
    for (const point of SNAP_POINTS) {
      const dist = Math.hypot(point.x - x, point.y - y);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = point;
      }
    }
    if (nearest && nearestDist < SNAP_THRESHOLD) {
      if (square) square.style.transition = "transform 0.4s cubic-bezier(0.22,1,0.36,1)";
      applyPosition(nearest.x, nearest.y);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!draggableSquare) return;
    const step = e.shiftKey ? KEY_STEP_LARGE : KEY_STEP;
    let { x, y } = posRef.current;
    if (e.key === "ArrowLeft") x -= step;
    else if (e.key === "ArrowRight") x += step;
    else if (e.key === "ArrowUp") y -= step;
    else if (e.key === "ArrowDown") y += step;
    else return;
    e.preventDefault();
    applyPosition(x, y);
  };

  // Scroll parallax driven entirely by Framer's own motion values — no
  // React state or re-renders on scroll.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const parallaxActive = enableParallax && !reducedMotion;
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    parallaxActive ? [`${-backgroundParallax * 100}%`, `${backgroundParallax * 100}%`] : ["0%", "0%"]
  );
  const squareY = useTransform(
    scrollYProgress,
    [0, 1],
    parallaxActive ? [`${-squareParallax * 100}%`, `${squareParallax * 100}%`] : ["0%", "0%"]
  );
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    parallaxActive ? [`${-titleParallax * 100}%`, `${titleParallax * 100}%`] : ["0%", "0%"]
  );

  const sharpFilter = `${grayscale ? "grayscale(100%) " : ""}contrast(${contrast}%)`;
  const bgFilter = `${grayscale ? "grayscale(100%) " : ""}blur(${blur}px) contrast(${Math.max(
    100,
    contrast - 3
  )}%)`;

  return (
    <div ref={containerRef} className="editorial-frame relative w-full select-none overflow-hidden bg-ink">
      {/* Responsive aspect ratio: mobile below md (768px), desktop at
          and above it. Uses a scoped stylesheet (rather than a Tailwind
          class built from the prop) since these values are dynamic. */}
      <style jsx>{`
        .editorial-frame {
          aspect-ratio: ${aspectRatio};
        }
        @media (min-width: 768px) {
          .editorial-frame {
            aspect-ratio: ${desktopAspectRatio ?? aspectRatio};
          }
        }
      `}</style>

      {/* 1. Blurred, black & white full-frame background, with its own
          grain layered directly on top so it's clearly visible over the
          blur rather than depending on the composition's overall grain. */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src={mobileSrc}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="scale-[1.12] object-cover md:hidden"
          style={{ objectPosition: `${focalPointX}% ${focalPointY}%`, filter: bgFilter }}
        />
        <Image
          src={desktopSrc}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="hidden scale-[1.12] object-cover md:block"
          style={{ objectPosition: `${focalPointX}% ${focalPointY}%`, filter: bgFilter }}
        />
        <Grain opacity={grainOpacity} />
      </motion.div>

      {/* 2. Camera viewfinder — a "window" revealing the same photo,
          plus a center crosshair and a settings readout. The outer
          group (squareOuterRef) is the single draggable object; the
          frame, crosshair and settings all move with it as one unit. */}
      {size.width > 0 && (
        <motion.div style={{ y: squareY }} className="absolute inset-0">
          <div
            ref={squareOuterRef}
            role={draggableSquare ? "slider" : undefined}
            aria-label={draggableSquare ? "Move camera viewfinder" : undefined}
            aria-orientation={draggableSquare ? "horizontal" : undefined}
            tabIndex={draggableSquare ? 0 : undefined}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            onKeyDown={handleKeyDown}
            className={`absolute left-0 top-0 flex flex-col items-center ${
              draggableSquare ? "touch-none cursor-grab active:cursor-grabbing" : ""
            }`}
            style={{ width: squareSizePx }}
          >
            {/* Frame — clips the sharp photo layers; only this part has
                the border, so it still reads as a clean square. */}
            <div
              className="relative overflow-hidden border transition-colors duration-200"
              style={{
                width: squareSizePx,
                height: squareSizePx,
                borderColor: isDragging ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.85)",
                borderWidth: 1,
              }}
            >
              <Image
                ref={windowImgRefMobile}
                src={mobileSrc}
                alt={alt || title}
                width={Math.round(size.width)}
                height={Math.round(size.height)}
                className="pointer-events-none absolute left-0 top-0 max-w-none md:hidden"
                style={{
                  width: size.width,
                  height: size.height,
                  objectFit: "cover",
                  objectPosition: `${focalPointX}% ${focalPointY}%`,
                  filter: sharpFilter,
                }}
                draggable={false}
              />
              <Image
                ref={windowImgRefDesktop}
                src={desktopSrc}
                alt={alt || title}
                width={Math.round(size.width)}
                height={Math.round(size.height)}
                className="pointer-events-none absolute left-0 top-0 hidden max-w-none md:block"
                style={{
                  width: size.width,
                  height: size.height,
                  objectFit: "cover",
                  objectPosition: `${focalPointX}% ${focalPointY}%`,
                  filter: sharpFilter,
                }}
                draggable={false}
              />

              {/* Center focus crosshair — thin, stationary relative to
                  the frame, moves with the group. */}
              {enableCrosshair && (
                <div
                  ref={crosshairRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
                  style={{ width: 18, height: 18, opacity: isDragging ? 0.95 : 0.8 }}
                >
                  <span
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
                    style={{ width: 18, height: 1 }}
                  />
                  <span
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
                    style={{ width: 1, height: 18 }}
                  />
                </div>
              )}
            </div>

            {/* Optional tiny label (e.g. "AF-C") + REC indicator, off by default */}
            {(focusMode || recording) && (
              <div
                className="mt-1 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/70 transition-opacity duration-200"
                style={{ opacity: isDragging ? 0.9 : 0.7 }}
              >
                {recording && (
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    REC
                  </span>
                )}
                {focusMode && <span>{focusMode}</span>}
              </div>
            )}

            {/* Camera settings readout — shutter speed / aperture / ISO */}
            <div
              className="mt-1.5 select-none whitespace-nowrap font-mono text-[9px] tracking-[0.1em] text-white transition-opacity duration-200 sm:text-[10px]"
              style={{ opacity: isDragging ? 0.9 : 0.75 }}
            >
              {shutterSpeed}&nbsp;&nbsp;&nbsp;{aperture}&nbsp;&nbsp;&nbsp;{iso}
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. Procedural film grain over the whole composition */}
      <Grain opacity={grainOpacity} />

      {/* 4. Optional, understated editorial meta labels — off by default */}
      {showMeta && meta && (
        <div className="pointer-events-none absolute inset-0 z-10">
          {meta.category && (
            <span className="absolute left-[4%] top-[4%] text-[0.62rem] font-light uppercase tracking-[0.22em] text-white/80">
              {meta.category}
            </span>
          )}
          {meta.issue && (
            <span className="absolute right-[4%] top-[4%] text-[0.62rem] font-light uppercase tracking-[0.22em] text-white/80">
              {meta.issue}
            </span>
          )}
          {meta.photographer && (
            <span className="absolute bottom-[4%] left-[4%] text-[0.6rem] font-light uppercase tracking-[0.18em] text-white/70">
              {meta.photographer}
            </span>
          )}
          {(meta.model || meta.location || meta.collection) && (
            <span className="absolute bottom-[4%] right-[4%] text-right text-[0.6rem] font-light uppercase tracking-[0.18em] text-white/70">
              {[meta.model, meta.collection, meta.location].filter(Boolean).join(" \u2014 ")}
            </span>
          )}
        </div>
      )}

      {/* 5. Large editorial title — purely decorative. It repeats the
          real page heading visually over the photo (Vogue-style), but
          is aria-hidden and not a real <h1>/<h2> so it doesn't collide
          with the actual document heading structure; the caller (the
          blog template) renders the real, crawlable <h1> separately. */}
      <motion.div
        style={{ y: titleY, left: titleLeft, bottom: titleBottom }}
        initial={reducedMotion ? undefined : { opacity: 0, y: 14 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="pointer-events-none absolute z-10 max-w-[92%] overflow-hidden"
      >
        <p
          ref={titleTextRef}
          aria-hidden="true"
          className="font-display text-white"
          style={{
            letterSpacing: "-0.01em",
            fontSize: titleFontSize ? `${titleFontSize}px` : "clamp(48px, 12vw, 150px)",
            lineHeight: 0.95,
            whiteSpace: "nowrap",
            visibility: titleFontSize ? "visible" : "hidden",
          }}
        >
          {decorativeTitle ?? title}
        </p>
      </motion.div>
    </div>
  );
}
