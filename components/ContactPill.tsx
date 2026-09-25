"use client";

import { socialLinks } from "@/lib/content";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";

/** Exported so GoToTopButton can match this exactly. */
export const FLOATING_BUTTON_SIZE = 50;

export default function ContactPill({
  tone = "light",
}: {
  /** "dark" is for bright backgrounds (e.g. the Visit Us section). */
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={`fixed z-50 flex items-center overflow-hidden rounded-full ${
        tone === "dark" ? "glass-pill-dark" : "glass-pill"
      }`}
      style={{
        right: "max(1.1rem, env(safe-area-inset-right))",
        bottom: "max(1.1rem, env(safe-area-inset-bottom))",
        height: FLOATING_BUTTON_SIZE,
      }}
    >
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on Instagram"
        className="flex h-full items-center justify-center px-3.5 text-white/90 transition-opacity hover:opacity-70"
      >
        <InstagramIcon className="h-[19px] w-[19px]" />
      </a>

      <span aria-hidden="true" className="h-5 w-px bg-white/30" />

      <a
        href={socialLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
         onClick={() => {
    window.gtag?.("event", "conversion", {
      send_to: "AW-18460277173/GwEICMSkmYUdELXzxeJE",
      value: 1.0,
      currency: "PKR",
    });
  }}
        className="flex h-full items-center justify-center px-3.5 text-white/90 transition-opacity hover:opacity-70"
      >
        <WhatsAppIcon className="h-[19px] w-[19px]" />
      </a>
    </div>
  );
}
