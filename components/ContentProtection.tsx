"use client";

import { useEffect } from "react";

/**
 * Makes casual copying and saving harder. It cannot stop screenshots or
 * DevTools, and it changes nothing in the HTML that search engines and AI
 * crawlers read (no content is hidden or removed).
 *
 * - Images (site-wide): no right-click menu, no drag-to-desktop, no
 *   long-press "save image" menu on phones.
 * - Blog posts: copy / cut are blocked inside anything marked `.no-copy`
 *   (selection itself is also disabled for it in globals.css).
 */
export default function ContentProtection() {
  useEffect(() => {
    const isImageTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      if (target.closest("img")) return true;
      // Full-bleed photo links (the hero carousel) whose <img> has
      // pointer-events: none, so the click lands on the <a> instead.
      const link = target.closest("a");
      return !!link && !link.textContent?.trim() && !!link.querySelector("img");
    };

    const onContextMenu = (e: MouseEvent) => {
      if (isImageTarget(e.target)) e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => {
      if (isImageTarget(e.target)) e.preventDefault();
    };
    const onCopyCut = (e: ClipboardEvent) => {
      const node = window.getSelection()?.anchorNode;
      const el = node instanceof Element ? node : node?.parentElement;
      const active = document.activeElement;
      const inField =
        active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
      if (!inField && el?.closest(".no-copy")) e.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("copy", onCopyCut);
    document.addEventListener("cut", onCopyCut);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("copy", onCopyCut);
      document.removeEventListener("cut", onCopyCut);
    };
  }, []);

  return null;
}
