import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Bodoni_Moda, Poppins } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { heroImages } from "@/lib/content";
import ContentProtection from "@/components/ContentProtection";
import { Analytics } from "@vercel/analytics/next";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const sans = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const homeTitle = "Cinematic Wedding Photographer in Lahore | RBA Films & Photography";
const homeDescription =
  "RBA Films & Photography: luxury cinematic wedding photography and wedding films in Lahore. Candid, editorial coverage of Mehndi, Nikah, Baraat and Walima. Packages from PKR 30,000 per day.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeTitle,
    // Inner pages (blog, FAQ) supply just their own title.
    template: "%s | RBA Films & Photography",
  },
  description: homeDescription,
  // Every inner page sets its own canonical; this one is the homepage's.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_PK",
    url: "/",
    title: homeTitle,
    description: homeDescription,
    images: [{ url: heroImages[0].desktop, alt: heroImages[0].alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [heroImages[0].desktop],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-visual",
  themeColor: "#131210",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <ContentProtection />
        {children}
        <Analytics />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18460277173" strategy="lazyOnload"
        />

        <Script id="google-ads-tag">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18460277173');
          `}
        </Script>
      </body>
    </html>
  );
}
