import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const sans = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cinematic Weddings | RBA Films & Photography",
  description:
    "RBA Films & Photography — editorial wedding films and photography, based in Lahore.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#131210",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>

      
      {/* Google Ads */}
 
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18460277173"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-18460277173');
</script>
      
    </html>
  );
}
