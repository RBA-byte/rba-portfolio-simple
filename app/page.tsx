"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import StudioSection from "@/components/StudioSection";
import { heroImages } from "@/lib/content";
import type { SectionId } from "@/types";

export default function Page() {
  const storyRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const studioRef = useRef<HTMLElement>(null);
  const [section, setSection] = useState<SectionId>("hero");

  // Lifted up (rather than kept local to HeroCarousel) so About/Contact
  // can show the same photo the visitor was last looking at, and so it
  // survives scrolling away and back to the hero.
  const [heroIndex, setHeroIndex] = useState(0);
  const activeImage = heroImages[heroIndex];

  useEffect(() => {
    const root = storyRef.current;
    const targets: [SectionId, HTMLElement | null][] = [
      ["hero", heroRef.current],
      ["about", aboutRef.current],
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

  return (
    <main className="relative">
      <Header section={section} />
      <div ref={storyRef} className="scroll-story">
        <section ref={heroRef} className="relative h-full w-full">
          <HeroCarousel
            index={heroIndex}
            onIndexChange={setHeroIndex}
            onContinue={scrollToAbout}
          />
        </section>
        <section ref={aboutRef} className="h-full w-full">
          <AboutSection image={activeImage} />
        </section>
        <section ref={contactRef} className="h-full w-full">
          <ContactSection image={activeImage} />
        </section>
        <section ref={studioRef} className="h-full w-full">
          <StudioSection />
        </section>
      </div>
    </main>
  );
}
