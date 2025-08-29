// // utils/axiosInstance.js
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g. http://localhost:8000
//   withCredentials: true,
//   headers: {  "Content-Type": "application/json" },
// });

// export default axiosInstance;


import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "",              // <- rely on Next.js rewrites
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
