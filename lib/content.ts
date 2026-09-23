import type { ResponsiveImage } from "@/types";

/**
 * All editorial copy and image references live here so the brand's
 * photography and words can be swapped in one place.
 *
 * Each hero photo needs TWO crops:
 *   - mobile:  a portrait/vertical crop (tall) for phone screens
 *   - desktop: a landscape/horizontal crop (wide) for tablets and up
 * This avoids a tall portrait photo being stretched across a wide
 * desktop screen, or vice versa.
 *
 * To use your own photographs: drop both crops of each photo into
 * /public/images and change the src values below to
 * "/images/your-file.jpg". The placeholders point at picsum.photos
 * purely so the site renders correctly before real photography is
 * added — replace them before launch.
 */

export const heroImages: ResponsiveImage[] = [
  {
    mobile: "/images/wedding-01.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-01d/2400/1350",
    alt: "Bride and groom silhouetted against golden evening light",
  },
  {
    mobile: "/images/wedding-02.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-02d/2400/1350",
    alt: "Close detail of a bridal bouquet and hand",
  },
  {
    mobile: "/images/wedding-03.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-03d/2400/1350",
    alt: "Wide shot of a wedding venue at dusk",
  },
  {
    mobile: "/images/wedding-04.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-04d/2400/1350",
    alt: "Candid portrait of the couple laughing together",
  },
  {
    mobile: "/images/wedding-05.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-05d/2400/1350",
    alt: "Architectural detail of the ceremony setting",
  },
  {
    mobile: "/images/wedding-06.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-05d/2400/1350",
    alt: "Architectural detail of the ceremony setting",
  },
  {
    mobile: "/images/wedding-07.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-05d/2400/1350",
    alt: "Architectural detail of the ceremony setting",
  },
  {
    mobile: "/images/wedding-08.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-05d/2400/1350",
    alt: "Architectural detail of the ceremony setting",
  },
  {
    mobile: "/images/wedding-09.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-05d/2400/1350",
    alt: "Architectural detail of the ceremony setting",
  },
  {
    mobile: "/images/wedding-10.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-05d/2400/1350",
    alt: "Architectural detail of the ceremony setting",
  },
  {
    mobile: "/images/wedding-11.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-05d/2400/1350",
    alt: "Architectural detail of the ceremony setting",
  },
  {
    mobile: "/images/wedding-12.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-05d/2400/1350",
    alt: "Architectural detail of the ceremony setting",
  },
  {
    mobile: "/images/wedding-13.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-05d/2400/1350",
    alt: "Architectural detail of the ceremony setting",
  },
  {
    mobile: "/images/wedding-14.jpg",
    desktop: "https://picsum.photos/seed/rba-wedding-05d/2400/1350",
    alt: "Architectural detail of the ceremony setting",
  },
 
];

export const brand = {
  titleLine1: "Cinematic Weddings",
  titleLine2: "by RBA Films & Photography",
  aboutLabel: "ABOUT US",
  contactLabel: "CONTACT",
};

export const aboutCopy = {
  heading: "ABOUT US",
  paragraphs: [
    "RBA Films & Photography documents weddings the way a film director frames a story — through light, restraint and the moments that happen when no one is performing for the camera.",
    "Based between Lahore and destinations across Pakistan, the studio works with a small number of weddings each season, shooting on a blend of film and digital to keep every frame quiet, considered and unmistakably real.",
  ],
};

export const contactCopy = {
  heading: "LET'S CREATE SOMETHING BEAUTIFUL",
  subheading:
    "Tell us a little about your day. We reply personally, usually within 48 hours.",
  thankYou: {
    heading: "THANK YOU",
    body: "Thank you for reaching out to RBA Films & Photography. Our team will contact you shortly.",
  },
};
