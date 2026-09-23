"use client";

import { AnimatePresence, motion } from "framer-motion";
import { brand } from "@/lib/content";
import type { SectionId } from "@/types";

const EASE = [0.22, 1, 0.36, 1] as const;

const titleVariants = {
  initial: { x: -28, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 28, opacity: 0 },
};

function HeroTitle() {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="font-display text-[1.6rem] leading-none tracking-tight text-paper xs:text-[1.8rem] sm:text-[2.1rem]">
        {brand.titleLine1}
      </span>
      <span className="mt-1.5 font-sans text-[0.62rem] font-light tracking-[0.28em] text-paper/85 sm:text-[0.7rem]">
        {brand.titleLine2.toUpperCase()}
      </span>
    </div>
  );
}

function SectionTitle({ label }: { label: string }) {
  return (
    <div className="flex items-baseline gap-2 text-center">
      <span className="font-sans text-[0.68rem] font-medium tracking-[0.22em] text-paper sm:text-[0.78rem]">
        {label}
      </span>
      <span className="text-paper/40">|</span>
      <span className="font-sans text-[0.68rem] font-light tracking-[0.18em] text-paper/75 sm:text-[0.78rem]">
        RBA FILMS &amp; PHOTOGRAPHY
      </span>
    </div>
  );
}

export default function Header({ section }: { section: SectionId }) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center pt-[calc(env(safe-area-inset-top)+1.1rem)]">
      <div
        className="pointer-events-auto rounded-full px-6 py-2.5 sm:px-8 sm:py-3"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          className="relative flex min-w-[13rem] items-center justify-center overflow-hidden sm:min-w-[16rem]"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.35)" }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={section}
              variants={titleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: EASE }}
            >
              {section === "hero" && <HeroTitle />}
              {section === "about" && <SectionTitle label="ABOUT US" />}
              {section === "contact" && <SectionTitle label="CONTACT" />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
