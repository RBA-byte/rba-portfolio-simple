/**
 * All editorial copy and image references live here so the brand's
 * photography and words can be swapped in one place.
 *
 * To use your own photographs: drop files into /public/images and
 * change each src below to "/images/your-file.jpg". The placeholders
 * point at picsum.photos purely so the site renders correctly before
 * real photography is added — replace them before launch.
 */

export interface HeroImage {
  src: string;
  alt: string;
}

export const heroImages: HeroImage[] = [
  {
    src: "/images/wedding-01.jpg",
    alt: "Bride and groom silhouetted against golden evening light",
  },
  {
    src: "/images/wedding-02.jpg",
    alt: "Close detail of a bridal bouquet and hand",
  },
  {
    src: "/images/wedding-03.jpg",
    alt: "Wide shot of a wedding venue at dusk",
  },
  {
    src: "/images/wedding-04.jpg",
    alt: "Candid portrait of the couple laughing together",
  },
  {
    src: "/images/wedding-05.jpg",
    alt: "Architectural detail of the ceremony setting",
  },
];

export const aboutImage = {
  src: "/images/about-us-01.jpg",
  alt: "RBA Films & Photography on location during a wedding film shoot",
};

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
