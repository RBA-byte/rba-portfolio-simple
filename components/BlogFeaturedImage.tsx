import EditorialImage from "@/components/EditorialImage";
import type { ResponsiveImage } from "@/types";

export default function BlogFeaturedImage({
  image,
  title,
}: {
  image: ResponsiveImage;
  title: string;
}) {
  return (
    <EditorialImage
      src={image.desktop}
      title={title}
      alt={image.alt}
      aspectRatio="3/4"
      priority
    />
  );
}
