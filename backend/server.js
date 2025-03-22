// const colors = require('colors');
// const path = require('path');
// const express = require('express');
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const dotenv = require('dotenv').config();
// const connectDB = require('./config/db');
// const http = require('http');
// const socketIO = require('socket.io');
// // const { createProxyMiddleware } = require('http-proxy-middleware');

// // API Routes
// const userRoutes = require('./routes/userRoutes');
// const storeRoutes = require('./routes/storeRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const productRoutes = require('./routes/productRoutes');
// const mainCategoryRoutes = require('./routes/mainCategoryRoutes');
// const subCategoryRoutes = require('./routes/subCategoryRoutes');
// const subSubCategoryRoutes = require('./routes/subSubCategoryRoutes');
// const eventRoutes = require('./routes/eventRoutes');
// const couponRoutes = require('./routes/couponCodeRoutes');
// const stripePaymentRoutes = require('./routes/stripePaymentRoutes');
// const conversationRoutes = require("./routes/conversationRoutes");
// const messageRoutes = require("./routes/messageRoutes");

// connectDB();

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:3000', // Allow requests from this origin
//   credentials: true, // Allow cookies and authorization headers to be sent
// }));

// // Proxy API requests to another server
// // app.use('/api', createProxyMiddleware({ target: 'http://localhost:8000', changeOrigin: true }));

// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// app.use('/api/users', userRoutes);
// app.use('/api/stores', storeRoutes);
// app.use("/api/orders", orderRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/categories', mainCategoryRoutes);
// app.use('/api/subcategories', subCategoryRoutes);
// app.use('/api/sub-subcategories', subSubCategoryRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/coupons', couponRoutes);
// app.use('/api/payment', stripePaymentRoutes);
// app.use('/api/conversations', conversationRoutes);
// app.use('/api/messages', messageRoutes);

// // if (process.env.NODE_ENV === 'production') {
// //   const __dirname = path.resolve();
// //   app.use('/uploads', express.static('/var/data/uploads'));
// //   app.use(express.static(path.join(__dirname, '/frontend/build')));

// //   app.get('*', (req, res) =>
// //     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
// //   );
// // } else {
// //   app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// //   app.get('/', (req, res) => {
// //     res.send('API is running....');
// //   });
// // }

// // Start the server
// const PORT = process.env.PORT || 8000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`.cyan.bold);
// });


const colors = require('colors');
const path = require('path');
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const http = require('http');
// const socketIO = require('socket.io');

// API Routes
const userRoutes = require('./routes/userRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const mainCategoryRoutes = require('./routes/mainCategoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const subSubCategoryRoutes = require('./routes/subSubCategoryRoutes');
const saleRoutes = require('./routes/saleRoutes');
const brandRoutes = require('./routes/brandRoutes');
const couponRoutes = require('./routes/couponCodeRoutes');
const stripePaymentRoutes = require('./routes/stripePaymentRoutes');
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Initialize database connection
connectDB();

// Create Express app
const app = express();
const server = http.createServer(app); // Create HTTP server

// Socket.io setup if needed
// const io = socketIO(server);

// Middleware setup
app.use(cookieParser()); // Parse cookies
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow cookies and authorization headers to be sent
}));
app.use(bodyParser.json({ limit: '10mb' })); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded requests
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); // Serve uploaded files

// API routes
app.use('/api/users', userRoutes);
app.use('/api/vendors', vendorRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', mainCategoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/sub-subcategories', subSubCategoryRoutes);
app.use('/api/sale', saleRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payment', stripePaymentRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan.bold);
});
