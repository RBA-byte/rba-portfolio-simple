"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/AboutSection";
import PackagesSection from "@/components/PackagesSection";
import ContactSection from "@/components/ContactSection";
import StudioSection from "@/components/StudioSection";
import GoToTopButton from "@/components/GoToTopButton";
import ContactPill from "@/components/ContactPill";
import { heroImages, socialLinks, studio  } from "@/lib/content";
import { absoluteUrl, homepageCrawlLinks, SITE_NAME  } from "@/lib/site";
import type { SectionId } from "@/types";

/** Remembers which hero slide the visitor was on (per browser tab). */
const HERO_INDEX_KEY = "rba:heroIndex";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/") }#website`,
      url: absoluteUrl("/"),
      name: SITE_NAME,
      alternateName: "The Refractions Studio | Refractions By Ammar",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${absoluteUrl("/")}#localbusiness`,
      name: "RBA Films & Photography",
      alternateName: "The Refractions Studio | Refractions By Ammar",
      url: absoluteUrl("/"),
      logo: absoluteUrl("/rba-logo.png"),
      image: absoluteUrl(heroImages[0].desktop),
      telephone: "+923356726627",
      priceRange: "PKR",
      address: {
        "@type": "PostalAddress",
        streetAddress: "27-A, Hadayatullah Block",
        addressLocality: "Lahore",
        addressRegion: "Punjab",
        postalCode: "54790",
        addressCountry: "PK",
      },
      sameAs: [
        socialLinks.instagram,
      ],
    },
  ],
};

export default function Page() {
  const storyRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const packagesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const studioRef = useRef<HTMLElement>(null);
  const [section, setSection] = useState<SectionId>("hero");
  const [selectedPackage, setSelectedPackage] = useState("");

  // Lifted up (rather than kept local to HeroCarousel) so About/Packages/
  // Contact can show the same photo the visitor was last looking at, and
  // so it survives scrolling away and back to the hero.
  const [heroIndex, setHeroIndexState] = useState(0);
  const activeImage = heroImages[heroIndex];

  // Save the slide whenever it changes, and restore it when the visitor
  // comes back (Back button, Home button, logo link) after opening a story.
  const setHeroIndex = (next: number) => {
    setHeroIndexState(next);
    try {
      sessionStorage.setItem(HERO_INDEX_KEY, String(next));
    } catch {
      /* storage unavailable (private mode etc.) — just don't remember */
    }
  };

  useEffect(() => {
    try {
      const saved = Number(sessionStorage.getItem(HERO_INDEX_KEY));
      if (Number.isInteger(saved) && saved > 0 && saved < heroImages.length) {
        setHeroIndexState(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    const root = storyRef.current;
    const targets: [SectionId, HTMLElement | null][] = [
      ["hero", heroRef.current],
      ["about", aboutRef.current],
      ["packages", packagesRef.current],
      ["contact", contactRef.current],
      ["studio", studioRef.current],
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const match = targets.find(([, el]) => el === visible.target);
        if (match) setSection(match[0]);
      },
      { root, threshold: [0.55] }
    );

    targets.forEach(([, el]) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const bookPackage = (packageName: string) => {
    setSelectedPackage(packageName);
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Arriving from another page (blog/FAQ) via the BOOK NOW link: /#contact
  useEffect(() => {
    if (window.location.hash === "#contact") {
      contactRef.current?.scrollIntoView();
    }
  }, []);

  const scrollToTop = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {/* SEO: the homepage is a full-screen carousel with no visible text
          heading or links. These two blocks are visually hidden (screen-reader
          accessible) so search engines get a real <h1> and crawlable links to
          the Journal and FAQ. Nothing here changes what visitors see. */}
      <h1 className="sr-only">
        Cinematic Wedding Photographer in Lahore — RBA Films &amp; Photography
      </h1>
      <nav aria-label="Journal and FAQ" className="sr-only">
        <ul>
          {homepageCrawlLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Header section={section} />
      <GoToTopButton visible={section !== "hero"} onClick={scrollToTop} tone={section === "studio" ? "dark" : "light"} />
      <ContactPill tone={section === "studio" ? "dark" : "light"} />
      <div ref={storyRef} className="scroll-story">
        <section ref={heroRef} className="relative h-full w-full">
          <HeroCarousel
            index={heroIndex}
            onIndexChange={setHeroIndex}
            onContinue={scrollToAbout}
          />
        </section>
        <section ref={aboutRef} className="w-full">
          <AboutSection image={activeImage} />
        </section>
        <section ref={packagesRef} className="w-full">
          <PackagesSection image={activeImage} onBookPackage={bookPackage} />
        </section>
        <section ref={contactRef} className="w-full">
          <ContactSection
            image={activeImage}
            selectedPackage={selectedPackage}
            onPackageChange={setSelectedPackage}
          />
        </section>
        <section ref={studioRef} className="h-full w-full">
          <StudioSection active={section === "contact" || section === "studio"} />
        </section>
      </div>
    </main>
  );
}
