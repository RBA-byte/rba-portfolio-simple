"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronIcon,
  CloseIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
} from "@/components/icons";
import type { GalleryImage } from "@/types";

/** Shown in the post view, top-right above the photo. */
const BRAND_NAME = "RBA Wedding Films";
const HANDLE = "refractionsbyammar";
const EASE = [0.22, 1, 0.36, 1] as const;
const DOUBLE_TAP_MS = 300;
const SWIPE_DISTANCE = 50;

/** Steady "random" number: the same photo always gets the same figure, so
 *  server and browser render identical text (no hydration mismatch). */
function seeded(seed: string, min: number, max: number) {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return min + ((hash >>> 0) % (max - min + 1));
}

const fmt = (n: number) => n.toLocaleString("en-US");

export default function BlogGallery({
  images,
  postTitle,
  postPath,
}: {
  images: GalleryImage[];
  postTitle: string;
  /** e.g. "/blog/my-post" — used for the share link. */
  postPath: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [burst, setBurst] = useState(0); // bumps to replay the heart animation
  const [toast, setToast] = useState("");
  const reduceMotion = useReducedMotion();
  const lastTap = useRef(0);
  const touchStartX = useRef<number | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const stats = images.map((img, i) => ({
    views: img.views ?? seeded(`v:${img.src}`, 640, 9400),
    likes: img.likes ?? seeded(`l:${img.src}`, 85, 2300),
  }));

  const open = openIndex !== null;
  const last = images.length - 1;

  const openAt = (i: number, trigger?: HTMLElement | null) => {
    returnFocus.current = trigger ?? null;
    setOpenIndex(i);
  };

  const close = useCallback(() => {
    setOpenIndex(null);
    returnFocus.current?.focus();
  }, []);

  const goTo = useCallback(
    (i: number) => setOpenIndex((cur) => (cur === null ? cur : Math.min(Math.max(i, 0), last))),
    [last]
  );

  // A shared link (#photo-3) opens that photo straight away.
  useEffect(() => {
    const m = window.location.hash.match(/^#photo-(\d+)$/);
    if (m) {
      const i = Number(m[1]) - 1;
      if (i >= 0 && i <= last) setOpenIndex(i);
    }
  }, [last]);

  // Lock page scroll, focus the close button, handle the keyboard.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") setOpenIndex((c) => (c === null ? c : Math.max(c - 1, 0)));
      else if (e.key === "ArrowRight") setOpenIndex((c) => (c === null ? c : Math.min(c + 1, last)));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, last]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const toggleLike = (i: number) => setLiked((cur) => ({ ...cur, [i]: !cur[i] }));

  const onImageTap = (i: number) => {
    const now = Date.now();
    if (now - lastTap.current < DOUBLE_TAP_MS) {
      lastTap.current = 0;
      setLiked((cur) => ({ ...cur, [i]: true })); // double-tap only ever likes
      setBurst((b) => b + 1);
    } else {
      lastTap.current = now;
    }
  };

  const share = async (i: number) => {
    const url = `${window.location.origin}${postPath}#photo-${i + 1}`;
    const data = { title: postTitle, text: images[i].caption, url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setToast("Link copied");
    } catch {
      /* share sheet dismissed or clipboard blocked — nothing to do */
    }
  };

  if (images.length === 0) return null;

  const current = openIndex !== null ? images[openIndex] : null;
  const isLiked = openIndex !== null && !!liked[openIndex];
  const likeCount =
    openIndex !== null ? stats[openIndex].likes + (isLiked ? 1 : 0) : 0;

  const glass =
    "glass-pill absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-paper";

  return (
    <>
      {/* ── Grid: 3 columns, 4:5 thumbnails, sharp corners ── */}
      <section aria-label="Photo gallery" className="mt-10 mb-4">
        <ul className="grid grid-cols-3 gap-[2px]">
          {images.map((img, i) => (
            <li key={img.src} className="relative aspect-[4/5] bg-ink">
              <button
                type="button"
                onClick={(e) => openAt(i, e.currentTarget)}
                aria-label={`Open photo ${i + 1} of ${images.length}: ${img.alt}`}
                className="group absolute inset-0 block h-full w-full overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 672px) 224px, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/45 to-transparent"
                />
                <span
                  className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-[0.68rem] font-medium text-white sm:text-[0.74rem]"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
                >
                  <EyeIcon className="h-3.5 w-3.5" />
                  {fmt(stats[i].views)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Instagram-style post view ── */}
      <AnimatePresence>
        {open && current && openIndex !== null && (
          <motion.div
            key="gallery-viewer"
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${openIndex + 1} of ${images.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#0b0b0c]/95 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div
              className="w-full px-0 py-3 sm:px-4"
              style={{
                // Keep the whole post (header + 4:5 photo + actions + caption)
                // inside the screen height on short windows.
                maxWidth: "min(470px, calc((100dvh - 210px) * 0.8))",
                minWidth: "min(100%, 280px)",
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
            >
              {/* Top row: close (left) · logo + name (right, outside the photo) */}
              <div className="mb-2.5 flex items-center justify-between px-3 sm:px-0">
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close photo"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-paper/90 transition-opacity hover:opacity-70"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="relative h-7 w-7 overflow-hidden rounded-full bg-ink ring-1 ring-white/15">
                    <Image src="/rba-logo.png" alt="" fill sizes="28px" className="object-cover" />
                  </span>
                  <span className="font-sans text-[0.78rem] font-medium tracking-[0.04em] text-paper">
                    {BRAND_NAME}
                  </span>
                </div>
              </div>

              {/* Photo (sharp corners) with chevrons + double-tap heart */}
              <div
                className="relative aspect-[4/5] w-full select-none overflow-hidden bg-ink"
                onClick={() => onImageTap(openIndex)}
                onTouchStart={(e) => {
                  touchStartX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  if (touchStartX.current === null) return;
                  const dx = e.changedTouches[0].clientX - touchStartX.current;
                  touchStartX.current = null;
                  if (dx <= -SWIPE_DISTANCE) goTo(openIndex + 1);
                  else if (dx >= SWIPE_DISTANCE) goTo(openIndex - 1);
                }}
              >
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  fill
                  priority
                  sizes="(min-width: 640px) 470px, 100vw"
                  className="pointer-events-none object-cover"
                />

                <AnimatePresence>
                  {openIndex > 0 && (
                    <motion.button
                      type="button"
                      aria-label="Previous photo"
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo(openIndex - 1);
                      }}
                      initial={{ opacity: 0, scale: 0.75 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.75 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={`${glass} left-2.5`}
                    >
                      <ChevronIcon className="-ml-0.5 rotate-180" />
                    </motion.button>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {openIndex < last && (
                    <motion.button
                      type="button"
                      aria-label="Next photo"
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo(openIndex + 1);
                      }}
                      initial={{ opacity: 0, scale: 0.75 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.75 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={`${glass} right-2.5`}
                    >
                      <ChevronIcon className="ml-0.5" />
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Double-tap heart: starts small, zooms in, then floats up */}
                {burst > 0 && (
                  <motion.div
                    key={burst}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.3, y: 0 }}
                    animate={
                      reduceMotion
                        ? { opacity: [0, 1, 0], scale: 1 }
                        : {
                            opacity: [0, 1, 1, 0],
                            scale: [0.3, 1.25, 1.25, 1.45],
                            y: [0, 0, 0, -190],
                          }
                    }
                    transition={{ duration: 1.1, times: [0, 0.3, 0.55, 1], ease: "easeOut" }}
                  >
                    <HeartIcon
                      filled
                      className="h-24 w-24 text-[#ff3040] drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)]"
                    />
                  </motion.div>
                )}
              </div>

              {/* Actions: heart + likes, share — left aligned */}
              <div className="mt-3 flex items-center gap-4 px-3 sm:px-0">
                <button
                  type="button"
                  onClick={() => toggleLike(openIndex)}
                  aria-pressed={isLiked}
                  aria-label={isLiked ? "Unlike photo" : "Like photo"}
                  className="flex items-center gap-2 text-paper"
                >
                  <motion.span
                    key={`${openIndex}-${isLiked}`}
                    initial={{ scale: isLiked ? 0.6 : 1 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    className={`flex ${isLiked ? "text-[#ff3040]" : "text-paper"}`}
                  >
                    <HeartIcon filled={isLiked} className="h-[1.65rem] w-[1.65rem]" />
                  </motion.span>
                  <span className="text-[0.9rem] font-medium">{fmt(likeCount)}</span>
                </button>
                <button
                  type="button"
                  onClick={() => share(openIndex)}
                  aria-label="Share photo"
                  className="flex text-paper transition-opacity hover:opacity-70"
                >
                  <ShareIcon className="h-[1.6rem] w-[1.6rem]" />
                </button>
              </div>

              {/* Handle + caption */}
              <p className="mt-2 px-3 pb-2 text-[0.88rem] font-light leading-relaxed text-paper/90 sm:px-0">
                <span className="mr-1.5 font-medium text-paper">{HANDLE}</span>
                {current.caption}
              </p>
            </div>

            <AnimatePresence>
              {toast && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass-pill pointer-events-none fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-[0.8rem] text-paper"
                >
                  {toast}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
