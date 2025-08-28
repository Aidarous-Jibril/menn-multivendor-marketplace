/** @type {import('next').NextConfig} */
const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      // { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      // { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      // { protocol: "https", hostname: "plus.unsplash.com", pathname: "/**" },
      // { protocol: "https", hostname: "i.pinimg.com", pathname: "/**" },
      // { protocol: "https", hostname: "images.ctfassets.net", pathname: "/**" },
      // { protocol: "https", hostname: "storage.googleapis.com", pathname: "/**" },
      // { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" },
      // { protocol: "https", hostname: "media.istockphoto.com", pathname: "/**" },
      // { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      // { protocol: "https", hostname: "media.bluestonepim.com", pathname: "/**" },
      // { protocol: "https", hostname: "static-images.remax.com", pathname: "/**" },
      // { protocol: "https", hostname: "encrypted-tbn0.gstatic.com", pathname: "/**" },
      // { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
    ],
    // Optional: let optimized images be cached a bit by the image optimizer
    minimumCacheTTL: 60, // seconds
  },

  async rewrites() {
    return [
      {
        source: "/api/:path((?!auth).*)",
        destination: `${NEXT_API_URL}/api/:path*`,
      },
    ];
  },

  compress: true,
};

export default nextConfig;
