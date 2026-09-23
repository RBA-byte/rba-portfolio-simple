"use client";

import { motion } from "framer-motion";
import { contactCopy } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ThankYou() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col items-center text-center"
    >
      <h3 className="font-display text-3xl text-ink sm:text-4xl">
        {contactCopy.thankYou.heading}
      </h3>
      <div className="mt-5 h-px w-10 bg-ink/30" />
      <p className="mt-6 max-w-[32ch] text-[0.95rem] font-light leading-relaxed text-ink/75">
        {contactCopy.thankYou.body}
      </p>
    </motion.div>
  );
}
