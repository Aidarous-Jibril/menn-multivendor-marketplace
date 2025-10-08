// // server.js (minimal changes)
const colors = require("colors");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const http = require("http");

// Routes
const userRoutes = require("./routes/userRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const mainCategoryRoutes = require("./routes/mainCategoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const subSubCategoryRoutes = require("./routes/subSubCategoryRoutes");
const saleRoutes = require("./routes/saleRoutes");
const brandRoutes = require("./routes/brandRoutes");
const couponRoutes = require("./routes/couponCodeRoutes");
const stripePaymentRoutes = require("./routes/stripePaymentRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const siteSettingRoutes = require("./routes/siteSettingRoutes");
const contactRoutes = require("./routes/contactRoutes");
const healthRoutes = require("./routes/healthRoutes");

// DB
connectDB();

const app = express();
const server = http.createServer(app);

// trust nginx proxy
app.set("trust proxy", 1);

// ---- CORS (keep it early) ----
const allowedOrigins = [
  "http://localhost:8080", // edge
  "http://127.0.0.1:8080",
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true); // SSR/cURL
    if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      return cb(null, true);
    }
    return cb(new Error("CORS not allowed for this origin"));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // preflight

// ---- Parsers & static ----
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// ---- API ----
app.use("/api/users", userRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", mainCategoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/sub-subcategories", subSubCategoryRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payment", stripePaymentRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/settings", siteSettingRoutes);
app.use("/api/support", contactRoutes);
app.use("/api/health", healthRoutes);

// ---- Start ----
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan.bold);
});

module.exports = app;


// // server.js
// const colors = require("colors");
// const path = require("path");
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// require("dotenv").config();
// const connectDB = require("./config/db");
// const http = require("http");

// // --- API Routes ---
// const userRoutes = require("./routes/userRoutes");
// const vendorRoutes = require("./routes/vendorRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const productRoutes = require("./routes/productRoutes");
// const mainCategoryRoutes = require("./routes/mainCategoryRoutes");
// const subCategoryRoutes = require("./routes/subCategoryRoutes");
// const subSubCategoryRoutes = require("./routes/subSubCategoryRoutes");
// const saleRoutes = require("./routes/saleRoutes");
// const brandRoutes = require("./routes/brandRoutes");
// const couponRoutes = require("./routes/couponCodeRoutes");
// const stripePaymentRoutes = require("./routes/stripePaymentRoutes");
// const conversationRoutes = require("./routes/conversationRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const siteSettingRoutes = require("./routes/siteSettingRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const healthRoutes = require("./routes/healthRoutes");

// // --- Connect database ---
// connectDB();

// const app = express();
// const server = http.createServer(app);

// // Trust reverse proxy (nginx) so req.secure and x-forwarded-* are respected
// app.set("trust proxy", 1);

// // ----------------------
// // CORS (put FIRST)
// // ----------------------
// const defaultOrigins = [
//   "http://localhost:8080", // edge entry
//   "http://127.0.0.1:8080",
//   "http://localhost:3000", // store
//   "http://localhost:3001", // admin
// ];

// const envOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL]
//   .filter(Boolean);

// // Optionally allow a comma-separated list via ALLOWED_ORIGINS
// const extraList = (process.env.ALLOWED_ORIGINS || "")
//   .split(",")
//   .map((s) => s.trim())
//   .filter(Boolean);

// const ALLOWED_ORIGINS = [...new Set([...defaultOrigins, ...envOrigins, ...extraList])];

// const corsOptions = {
//   origin(origin, cb) {
//     // allow SSR/cURL/server-to-server (no Origin header)
//     if (!origin) return cb(null, true);
//     if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
//     // allow vercel previews if you use them
//     if (/\.vercel\.app$/.test(origin)) return cb(null, true);
//     return cb(new Error("CORS not allowed for this origin"));
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));
// // handle preflight for all routes
// app.options("*", cors(corsOptions));

// // ----------------------
// // Parsers & static
// // ----------------------
// app.use(cookieParser());
// app.use(bodyParser.json({ limit: "10mb" }));
// app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// // ----------------------
// // API routes
// // ----------------------
// app.use("/api/users", userRoutes);
// app.use("/api/vendors", vendorRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/categories", mainCategoryRoutes);
// app.use("/api/subcategories", subCategoryRoutes);
// app.use("/api/sub-subcategories", subSubCategoryRoutes);
// app.use("/api/sales", saleRoutes);
// app.use("/api/brands", brandRoutes);
// app.use("/api/coupons", couponRoutes);
// app.use("/api/payment", stripePaymentRoutes);
// app.use("/api/conversations", conversationRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/settings", siteSettingRoutes);
// app.use("/api/support", contactRoutes);
// app.use("/api/health", healthRoutes);

// // ----------------------
// // Error handler for CORS denials (returns 403 instead of 500)
// // ----------------------
// app.use((err, req, res, next) => {
//   if (err && err.message === "CORS not allowed for this origin") {
//     return res.status(403).json({ message: err.message });
//   }
//   return next(err);
// });

// // ----------------------
// // Start server
// // ----------------------
// const PORT = process.env.PORT || 8000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`.cyan.bold);
//   // Optional: log allowed origins for debugging
//   // console.log("CORS allowlist:", ALLOWED_ORIGINS);
// });

// module.exports = app;
