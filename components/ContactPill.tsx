"use client";

import { socialLinks } from "@/lib/content";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";

export default function ContactPill() {
  return (
    <div
      className="fixed z-50 flex items-center overflow-hidden rounded-full"
      style={{
        right: "max(1.1rem, env(safe-area-inset-right))",
        bottom: "max(1.1rem, env(safe-area-inset-bottom))",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 10px 28px rgba(0,0,0,0.35)",
      }}
    >
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on Instagram"
        className="flex items-center justify-center p-3.5 text-white/90 transition-opacity hover:opacity-70"
      >
        <InstagramIcon className="h-[19px] w-[19px]" />
      </a>

      <span aria-hidden="true" className="h-5 w-px bg-white/30" />

      <a
        href={socialLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        className="flex items-center justify-center p-3.5 text-white/90 transition-opacity hover:opacity-70"
      >
        <WhatsAppIcon className="h-[19px] w-[19px]" />
      </a>
    </div>
  );
}
