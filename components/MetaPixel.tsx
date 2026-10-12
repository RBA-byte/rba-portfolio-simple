
"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export default function MetaPixel() {
 const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "661247305392171";
  const pathname = usePathname();
  const [initialized, setInitialized] = useState(false);
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (!initialized) {
      lastPath.current = pathname;
      return;
    }

    if (lastPath.current !== pathname) {
      window.fbq?.("track", "PageView");
      lastPath.current = pathname;
    }
  }, [pathname, initialized]);

  if (!pixelId) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
        `,
      }}
      onReady={() => {
        window.fbq?.("init", pixelId);
        window.fbq?.("track", "PageView");
        setInitialized(true);
      }}
    />
  );
}
