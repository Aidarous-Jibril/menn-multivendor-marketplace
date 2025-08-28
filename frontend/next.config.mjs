/** @type {import('next').NextConfig} */
const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" },
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
