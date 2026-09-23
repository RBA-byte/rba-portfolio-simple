"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import type { SectionId } from "@/types";

const SECTION_ORDER: SectionId[] = ["hero", "about", "contact"];

export default function Page() {
  const storyRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [section, setSection] = useState<SectionId>("hero");

  useEffect(() => {
    const root = storyRef.current;
    const targets: [SectionId, HTMLElement | null][] = [
      ["hero", heroRef.current],
      ["about", aboutRef.current],
      ["contact", contactRef.current],
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
          <HeroCarousel onContinue={scrollToAbout} />
        </section>
        <section ref={aboutRef} className="h-full w-full">
          <AboutSection />
        </section>
        <section ref={contactRef} className="h-full w-full">
          <ContactSection />
        </section>
      </div>
    </main>
  );
}
