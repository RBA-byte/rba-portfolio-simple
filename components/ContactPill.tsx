"use client";

import { socialLinks, studio } from "@/lib/content";
import { InstagramIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

/** Exported so GoToTopButton can match this exactly. */
export const FLOATING_BUTTON_SIZE = 50;

const WHATSAPP_MESSAGE =
  "Hi, I was browsing your website and i wanted to Enquire about your wedding packages.";

/** Home page scrolls inside its own container, so scroll there directly when we can. */
function goToContact(event: React.MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById("contact");
  if (!target) return; // other pages (blog, faq): fall through to href="/#contact"
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth" });
}

export default function ContactPill({
  tone = "light",
}: {
  /** "dark" is for bright backgrounds (e.g. the Visit Us section). */
  tone?: "light" | "dark";
}) {
  return (
    <div
      className="fixed z-50 flex flex-col items-center"
      style={{
        right: "max(1.1rem, env(safe-area-inset-right))",
        bottom: "max(1.1rem, env(safe-area-inset-bottom))",
      }}
    >
      <a
        href="/#contact"
        onClick={goToContact}
        className="mb-1.5 text-[0.62rem] font-medium tracking-[0.2em] text-white transition-opacity hover:opacity-70"
        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.45)" }}
      >
        BOOK NOW
      </a>

      <div
        className={`flex items-center overflow-hidden rounded-full ${
          tone === "dark" ? "glass-pill-dark" : "glass-pill"
        }`}
        style={{ height: FLOATING_BUTTON_SIZE }}
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
        href={`${socialLinks.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
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

      <span aria-hidden="true" className="h-5 w-px bg-white/30" />

      <a
        href={studio.phoneHref}
        aria-label="Call us"
        onClick={(event) => {
          event.preventDefault();

          const callback = () => {
            window.location.href = studio.phoneHref;
          };

          if (typeof window.gtag === "function") {
            window.gtag("event", "conversion", {
              send_to: "AW-18460277173/tbH4COr9moUdELXzxeJE",
              value: 1.0,
              currency: "PKR",
              event_callback: callback as unknown as string,
            });

            setTimeout(callback, 1000);
          } else {
            callback();
          }
        }}
        className="flex h-full items-center justify-center px-3.5 text-white/90 transition-opacity hover:opacity-70"
      >
        <PhoneIcon className="h-[19px] w-[19px]" />
      </a>
      </div>
    </div>
  );
}
