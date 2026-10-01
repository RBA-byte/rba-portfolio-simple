import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * AI *training* crawlers: blocked. Blocking these only stops your content
 * being used to train models — it has no effect on Google/Bing rankings
 * or on AI answer engines that cite you.
 * (Google-Extended is only an opt-out token; it never affects Google Search
 * or AI Overviews.)
 */
const TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "meta-externalagent",
];

/**
 * AI *search / citation* crawlers: explicitly allowed so your pages can be
 * found and cited in ChatGPT, Claude and Perplexity answers.
 */
const AI_SEARCH_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Googlebot, Bingbot and every other normal crawler fall under this.
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      // A bot that has its own group ignores the "*" group, so repeat the
      // same rules for the AI search bots.
      { userAgent: AI_SEARCH_BOTS, allow: "/", disallow: ["/api/"] },
      { userAgent: TRAINING_BOTS, disallow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
