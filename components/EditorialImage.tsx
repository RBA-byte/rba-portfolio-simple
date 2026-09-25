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
  /** The single, unedited source photo — reused for every layer. */
  src: string;
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
  /** CSS aspect-ratio, e.g. "3/4" */
  aspectRatio?: string;
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

/**
 * Procedural, monochrome film-grain layer (SVG feTurbulence data URI —
 * no texture asset needed). Opacity is the only thing that changes per
 * instance, so this stays a constant rather than being rebuilt per render.
 */
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function EditorialImage({
  src,
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
  draggableSquare = true,
  initialSquareX = 50,
  initialSquareY = 50,
  enableSnap = false,
  enableParallax = true,
  backgroundParallax = 0.08,
  squareParallax = 0.04,
  titleParallax = 0.025,
  priority = false,
}: EditorialImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Imperatively positioned — mutated directly via .style, never through
  // React state, so dragging and scrolling never trigger a re-render.
  const squareOuterRef = useRef<HTMLDivElement>(null);
  const windowImgRef = useRef<HTMLImageElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
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

  // Moves the square to a normalized (x,y) position and shifts the
  // "window" image by the exact opposite amount, so whatever the square
  // reveals lines up pixel-for-pixel with the blurred layer beneath it —
  // the "clear window on the same photo" effect.
  const applyPosition = useCallback(
    (x: number, y: number) => {
      const clampedX = Math.min(1, Math.max(0, x));
      const clampedY = Math.min(1, Math.max(0, y));
      posRef.current = { x: clampedX, y: clampedY };

      const maxLeft = Math.max(0, size.width - squareSizePx);
      const maxTop = Math.max(0, size.height - squareSizePx);
      const left = clampedX * maxLeft;
      const top = clampedY * maxTop;

      if (squareOuterRef.current) {
        squareOuterRef.current.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      }
      if (windowImgRef.current) {
        windowImgRef.current.style.transform = `translate3d(${-left}px, ${-top}px, 0)`;
      }
    },
    [size.width, size.height, squareSizePx]
  );

  // Re-clamp/re-place on measurement changes (mount, resize, orientation).
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
    const maxTop = Math.max(0, size.height - squareSizePx);
    const left = e.clientX - containerRect.left - dragOffsetRef.current.x;
    const top = e.clientY - containerRect.top - dragOffsetRef.current.y;
    const x = maxLeft > 0 ? left / maxLeft : 0;
    const y = maxTop > 0 ? top / maxTop : 0;
    requestAnimationFrame(() => applyPosition(x, y));
  };

  const finishDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const square = squareOuterRef.current;
    if (square) {
      square.style.transition = "";
      if (square.hasPointerCapture(e.pointerId)) {
        square.releasePointerCapture(e.pointerId);
      }
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
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-hidden bg-ink"
      style={{ aspectRatio }}
    >
      {/* 1. Blurred, black & white full-frame background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="scale-[1.12] object-cover"
          style={{
            objectPosition: `${focalPointX}% ${focalPointY}%`,
            filter: bgFilter,
          }}
        />
      </motion.div>

      {/* 2. Sharp center square — a "window" revealing the same photo */}
      {size.width > 0 && (
        <motion.div style={{ y: squareY }} className="absolute inset-0">
          <div
            ref={squareOuterRef}
            role={draggableSquare ? "slider" : undefined}
            aria-label={draggableSquare ? "Move featured image frame" : undefined}
            aria-orientation={draggableSquare ? "horizontal" : undefined}
            tabIndex={draggableSquare ? 0 : undefined}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            onKeyDown={handleKeyDown}
            className={`absolute left-0 top-0 overflow-hidden border border-white/90 ${
              draggableSquare ? "touch-none cursor-grab active:cursor-grabbing" : ""
            }`}
            style={{ width: squareSizePx, height: squareSizePx }}
          >
            <Image
              ref={windowImgRef}
              src={src}
              alt={alt || title}
              width={Math.round(size.width)}
              height={Math.round(size.height)}
              priority={priority}
              className="pointer-events-none absolute left-0 top-0 max-w-none"
              style={{
                width: size.width,
                height: size.height,
                objectFit: "cover",
                objectPosition: `${focalPointX}% ${focalPointY}%`,
                filter: sharpFilter,
              }}
              draggable={false}
            />
          </div>
        </motion.div>
      )}

      {/* 3. Procedural film grain */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay transform-gpu"
        style={{ opacity: grainOpacity, backgroundImage: GRAIN_URL }}
      />

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

      {/* 5. Large editorial title */}
      <motion.div
        style={{ y: titleY, left: titleLeft, bottom: titleBottom }}
        initial={reducedMotion ? undefined : { opacity: 0, y: 14 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="pointer-events-none absolute z-10 max-w-[92%]"
      >
        <h2
          className="text-white"
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 300,
            letterSpacing: "-0.045em",
            fontSize: "clamp(48px, 12vw, 150px)",
            lineHeight: 0.95,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h2>
      </motion.div>
    </div>
  );
}
