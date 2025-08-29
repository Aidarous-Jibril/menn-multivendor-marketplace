// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//    remotePatterns: [
//       { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
//    ]
//   },
// };

// export default nextConfig;




/** @type {import('next').NextConfig} */
const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${NEXT_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
