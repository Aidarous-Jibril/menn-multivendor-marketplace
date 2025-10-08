// /** @type {import('next').NextConfig} */
// const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// const nextConfig = {
//   output: 'standalone',
//   images: {
//     formats: ["image/avif", "image/webp"],
//     remotePatterns: [
//       { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
//       { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" },
//     ],
//     minimumCacheTTL: 60,
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path((?!auth).*)",
//         destination: `${NEXT_API_URL}/api/:path*`,
//       },
//     ];
//   },
//   compress: true,
// };
// export default nextConfig;


/** @type {import('next').NextConfig} */
const INTERNAL_API = process.env.INTERNAL_API_URL || "http://backend:8000";

const nextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" },
    ],
    minimumCacheTTL: 60,
  },
  async rewrites() {
    return [
      // SSR/server fetches go straight to the backend container
      { source: "/api/:path*", destination: `${INTERNAL_API}/api/:path*` },
    ];
  },
  compress: true,
};
export default nextConfig;
