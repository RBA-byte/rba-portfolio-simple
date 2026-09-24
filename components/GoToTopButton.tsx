"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FLOATING_BUTTON_SIZE } from "@/components/ContactPill";

const EASE = [0.22, 1, 0.36, 1] as const;

function ArrowUp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 19V5M12 5l-6 6M12 5l6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GoToTopButton({
  visible,
  onClick,
  tone = "light",
}: {
  visible: boolean;
  onClick: () => void;
  /** "dark" is for bright backgrounds (e.g. the Visit Us section). */
  tone?: "light" | "dark";
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={onClick}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: EASE }}
          className={`fixed z-50 flex items-center justify-center rounded-full text-white/90 transition-opacity hover:opacity-70 ${
            tone === "dark" ? "glass-pill-dark" : "glass-pill"
          }`}
          style={{
            left: "max(1.1rem, env(safe-area-inset-left))",
            bottom: "max(1.1rem, env(safe-area-inset-bottom))",
            height: FLOATING_BUTTON_SIZE,
            width: FLOATING_BUTTON_SIZE,
          }}
        >
          <ArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
