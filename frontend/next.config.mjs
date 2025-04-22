// const nextConfig = {
//   images: {
//     domains: ['res.cloudinary.com', 'images.pexels.com', 'images.unsplash.com', 'i.pinimg.com', 'images.ctfassets.net', 'storage.googleapis.com' ],
//   },
//     async rewrites() {
//       return [
//         {
//           source: '/api/:path*',
//           destination: 'http://localhost:8000/api/:path*', // Proxy to Backend
//         },
//       ];
//     },
//   };
  
//   export default nextConfig;


const nextConfig = {
  experimental: {
    appDir: false, // ✅ Turn OFF App Router
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'images.pexels.com',
      'images.unsplash.com',
      'i.pinimg.com',
      'images.ctfassets.net',
      'storage.googleapis.com',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
