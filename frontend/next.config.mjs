// const nextConfig = {
//   experimental: {
//     appDir: false, // ✅ Turn OFF App Router
//   },
//   images: {
//     domains: [
//       'res.cloudinary.com',
//       'images.pexels.com',
//       'images.unsplash.com',
//       'i.pinimg.com',
//       'images.ctfassets.net',
//       'storage.googleapis.com',
//     ],
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://localhost:8000/api/:path*', // Proxy to Backend
//       },
//     ];
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'images.pexels.com',
      'images.unsplash.com',
      'i.pinimg.com',
      'images.ctfassets.net',
      'storage.googleapis.com',
      'lh3.googleusercontent.com' ,
      'media.istockphoto.com', 
      'placehold.co',
      'media.bluestonepim.com',
      'static-images.remax.com',
      'encrypted-tbn0.gstatic.com',
      'plus.unsplash.com'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path((?!auth).*)', // ✅ exclude NextAuth routes
        destination: 'http://localhost:8000/api/:path*', // ✅ proxy everything EXCEPT /api/auth/*
      },
    ];
  },
};

export default nextConfig;
