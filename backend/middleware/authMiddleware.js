const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Vendor = require('../models/vendorModel')
const Admin = require('../models/adminModel');



const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { user_token } = req.cookies;

  if (!user_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  try {
    const decoded = jwt.verify(user_token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ErrorHandler("Session expired. Please login again.", 401));
    }
    return next(new ErrorHandler("Authentication failed.", 401));
  }
});


// Vendor Authentication
const isVendor = asyncHandler(async(req, res, next) => {
  const token = req.cookies.vendor_token;
  if (!token) {
    return res.status(401).json({ error: "Vendor not authenticated. Please log in." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendor = await Vendor.findById(decoded.id).select("-password");

    if (!vendor) {
      return res.status(401).json({ error: "Vendor not found or session expired." });
    }

    req.vendor = vendor;
    next();
  } catch (error) {
    console.error("Token error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token. Please log in again." });
  }
});


// Admin Authentication
const isAdmin = asyncHandler(async (req, res, next) => {
  
  // Check token in cookies or headers
  const token = req.cookies.admin_token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("Not authorized as admin", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return next(new ErrorHandler("Admin not found", 404));
    }

    req.admin = admin;
    next();
  } catch (error) {
    return next(new ErrorHandler("Admin authentication failed.", 401));
  }
});


module.exports = { isAuthenticated, isVendor, isAdmin }
