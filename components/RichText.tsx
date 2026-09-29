import Link from "next/link";
import type { ReactNode } from "react";

const LINK_CLASS =
  "underline decoration-white/30 underline-offset-4 transition-colors hover:text-[#e8e8e8] hover:decoration-white/70";

/**
 * Renders plain text with inline links written as [anchor text](/path).
 * Internal paths use next/link (crawlable <a href>), external URLs open in a
 * new tab. Nothing else is interpreted, so post content stays plain text.
 */
export default function RichText({ text }: { text: string }) {
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const [, label, href] = match;
    if (href.startsWith("/")) {
      nodes.push(
        <Link key={match.index} href={href} className={LINK_CLASS}>
          {label}
        </Link>
      );
    } else {
      nodes.push(
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {label}
        </a>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
