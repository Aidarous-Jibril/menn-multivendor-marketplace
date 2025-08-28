// // utils/axiosInstance.js
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g. http://localhost:8000
//   withCredentials: true,
//   headers: { "Content-Type": "application/json" },
// });

// const isVendorApi = (url = "") => url.includes("/api/vendors");

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     const status = err?.response?.status;
//     const url = err?.config?.url || "";
//     if ((status === 401 || status === 403) && isVendorApi(url) && typeof window !== "undefined") {
//       try { localStorage.removeItem("vendorInfo"); } catch {}
//       try { sessionStorage.removeItem("vendorInfo"); } catch {}
//       const { pathname, search, hash } = window.location;
//       if (!pathname.startsWith("/vendor/login")) {
//         const next = encodeURIComponent(pathname + search + hash);
//         window.location.replace(`/vendor/login?reason=expired&next=${next}`);
//       }
//     }
//     return Promise.reject(err);
//   }
// );

// export default axiosInstance;


// frontend/src/utils/axiosInstance.ts (or .js)
import axios from "axios";

/**
 * Use relative '/api' so Next.js rewrites to your Render backend:
 * - dev:   http://localhost:3000/api  -> http://localhost:8000/api
 * - prod:  https://<vercel>.app/api   -> https://<render>.onrender.com/api
 */
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,                // needed for cookie-based auth
  headers: { "Content-Type": "application/json" },
});

// Helper to spot vendor endpoints (keep your redirect logic)
const isVendorApi = (url = "") => url.includes("/api/vendors");

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const url = err?.config?.url || "";
    if ((status === 401 || status === 403) && isVendorApi(url) && typeof window !== "undefined") {
      try { localStorage.removeItem("vendorInfo"); } catch {}
      try { sessionStorage.removeItem("vendorInfo"); } catch {}
      const { pathname, search, hash } = window.location;
      if (!pathname.startsWith("/vendor/login")) {
        const next = encodeURIComponent(pathname + search + hash);
        window.location.replace(`/vendor/login?reason=expired&next=${next}`);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
