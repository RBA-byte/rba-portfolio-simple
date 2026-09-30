"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { HomeIcon } from "@/components/icons";
import { brand } from "@/lib/content";

// How far (in px) the visitor needs to scroll before the shadow reaches
// its full strength. Clamped — it never keeps growing past this.
const SHADOW_SCROLL_RANGE = 70;
const GAP = "1.1rem"; // equal gap: edge→button, button→title, title→edge

export default function BlogHeader({
  label = brand.journalLabel,
}: {
  /** Left-hand label in the pill — defaults to JOURNAL. */
  label?: string;
}) {
  const { scrollY } = useScroll();
  const shadowStrength = useTransform(scrollY, [0, SHADOW_SCROLL_RANGE], [0, 0.32]);
  const boxShadow = useMotionTemplate`0 10px 24px rgba(10,10,10,${shadowStrength})`;

  const glass = {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 flex items-center"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingLeft: GAP,
        paddingRight: GAP,
        gap: GAP,
      }}
    >
      <motion.div style={{ boxShadow }} className="my-3 shrink-0 rounded-full">
        <Link
          href="/"
          aria-label="Back to the homepage"
          style={glass}
          className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-opacity hover:opacity-80"
        >
          <HomeIcon className="h-5 w-5" />
        </Link>
      </motion.div>

      <motion.div
        style={{ boxShadow }}
        className="relative my-3 flex min-w-0 flex-1 items-center justify-center rounded-full px-5 py-2.5"
      >
        <div style={glass} className="absolute inset-0 -z-10 rounded-full" />
          <div className="flex items-baseline gap-2 truncate">
          <span
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.55)" }}
            className="font-sans text-[0.68rem] font-medium tracking-[0.22em] text-paper sm:text-[0.78rem]"
          >
            {label}
          </span>
          <span
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.55)" }}
            className="text-paper/40"
          >
            |
          </span>
          <span
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.55)" }}
            className="truncate font-sans text-[0.68rem] font-light tracking-[0.18em] text-paper/75 sm:text-[0.78rem]"
          >
            {brand.titleLine2.toUpperCase()}
          </span>
        </div>
      </motion.div>
    </header>
  );
}
