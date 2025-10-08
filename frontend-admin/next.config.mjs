// /** @type {import('next').NextConfig} */
// const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:8000";

// const nextConfig = {
//   output: 'standalone',
//   basePath: '/admin',
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
//     ],
//   },
//   async rewrites() {
//     return [
//       { source: "/api/:path((?!auth).*)", destination: `${NEXT_API_URL}/api/:path*` },
//     ];
//   },
//   compress: true,
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const INTERNAL_API = process.env.INTERNAL_API_URL || "http://backend:8000";

const nextConfig = {
  output: "standalone",
  basePath: "/admin",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
  async rewrites() {
    return [
      // With basePath '/admin', Next will match '/admin/api/*' here automatically
      { source: "/api/:path*", destination: `${INTERNAL_API}/api/:path*` },
    ];
  },
  compress: true,
};
export default nextConfig;
