/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Remote pattern used only for the placeholder editorial photography.
    // Once you drop your own files into /public/images, you can delete
    // this block entirely and swap the heroImages / aboutImage paths in
    // lib/content.ts to local "/images/..." paths.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
