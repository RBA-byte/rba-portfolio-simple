import EditorialImage from "@/components/EditorialImage";
import type { ResponsiveImage } from "@/types";

export default function BlogFeaturedImage({
  image,
  title,
  decorativeTitle,
}: {
  image: ResponsiveImage;
  title: string;
  decorativeTitle?: string;
}) {
  return (
    <EditorialImage
      srcMobile={image.mobile}
      srcDesktop={image.desktop}
      title={title}
      decorativeTitle={decorativeTitle}
      alt={image.alt}
      aspectRatio="3/4"
      desktopAspectRatio="4/3"
      priority
    />
  );
}
