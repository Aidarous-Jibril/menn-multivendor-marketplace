// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user }) {
//       try {
//         await fetch("http://localhost:8000/api/users/google-login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({
//             name: user.name,
//             email: user.email,
//             image: user.image,
//           }),
//         });
//         return true;
//       } catch (err) {
//         console.error("Google Login Failed:", err);
//         return false;
//       }
//     },
//     async jwt({ token, user }) {
//       return token;
//     },
//     async session({ session, token }) {
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const base = process.env.NEXTAUTH_URL?.replace(/\/$/, ""); // no trailing slash
        const res = await fetch(`${base}/api/users/google-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // credentials is harmless here but not required server-side
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            image: user.image,
          }),
        });
        if (!res.ok) {
          const t = await res.text().catch(() => "");
          console.error("google-login sync failed", res.status, t);
        }
      } catch (err) {
        console.error("google-login sync threw", err);
      }
      // IMPORTANT: never block OAuth, even if sync errored
      return true;
    },
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Optional: send users back to your UI on errors
  pages: {
    signIn: "/user/login",
    error: "/user/login",
  },
});

