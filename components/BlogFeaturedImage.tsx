import Image from "next/image";
import type { ResponsiveImage } from "@/types";

export default function BlogFeaturedImage({
  image,
  title,
}: {
  image: ResponsiveImage;
  title: string;
}) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
      <Image
        src={image.desktop}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover grayscale"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />

      <div className="absolute inset-x-0 bottom-0 px-2 pb-7 text-center sm:pb-10">
        <h1
          className="font-display text-[2.6rem] leading-[1.02] text-white xs:text-[3rem] sm:text-[4.2rem] md:text-[5rem]"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
