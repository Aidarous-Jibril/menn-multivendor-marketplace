const { Readable } = require("stream");
const validator = require("validator");
const asyncHandler = require("express-async-handler");
const Vendor = require("../models/vendorModel");
const createVendorToken = require("../utils/vendorToken");
const cloudinary = require("../utils/cloudinary");
const Product = require("../models/productModel");
const Notification = require("../models/notificationModel");
const VendorNotification = require("../models/vendorNotificationModel"); 


// Register a new vendor with file upload
const registerVendor = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, address, zipCode, password } = req.body;

  try {
    const vendorExists = await Vendor.findOne({ email });
    if (vendorExists) {
      throw new Error("Email already in use for another vendor");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Please enter a valid email");
    }
    if (!validator.isStrongPassword(password, { minLength: 8 })) {
      throw new Error(
        "Password is not strong enough. It should be at least 8 characters long."
      );
    }

    // Set default avatar data
    const defaultAvatarData = {
      url: "https://seeklogo.com/images/T/the-store-logo-3710C107B8-seeklogo.com.png",
      public_id: "avatars/kacnydlwszkwq4udegdi",
    };

    // Upload the default avatar to Cloudinary
    const result = await cloudinary.uploader.upload(defaultAvatarData.url, {
      folder: "avatars",
    });

    const avatarData = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    const newVendor = {
      name,
      email,
      password,
      avatar: avatarData,
      address,
      phoneNumber,
      zipCode,
    };

    const vendor = await Vendor.create(newVendor);

    // Generate JWT token
    const token = createVendorToken(res, vendor._id);
    // ✅ Create a notification for admins when new user registers
    await Notification.create({
      type: "new_vendor",
      message: `👤 New vendor registered: ${name}`,
    });

    res.status(201).json({
      success: true,
      token,
      msg: "Vendor registered successfully",
      vendor,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Log in a vendor
const loginVendor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.login(email, password);
    if (!vendor) {
      throw new Error("Invalid vendor credentials");
    }

    createVendorToken(res, vendor._id);

    res.status(200).json({
      success: true,
      vendor,
      msg: "vendor logged in successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Log out a vendor
const logoutVendor = asyncHandler(async (req, res) => {
  res.cookie("vendor_token", null, {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// Get all vendors
const getAllVendors = asyncHandler(async (req, res) => {
  try {
    const vendors = await Vendor.find().select("-password"); // Exclude the password field
    res.status(200).json({ success: true, vendors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get vendor profile information
const getVendorInfo = asyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select("-password");
    if (!vendor) {
      throw new Error("Invalid vendor ID");
    }

    res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update vendor profile
const updateVendorProfile = asyncHandler(async (req, res) => {
  try {

    const vendor = await Vendor.findById(req.body.id); 
    if (!vendor) {
      return res.status(404).json({ message: "vendor not found" });
    }
    // Update vendor fields with provided data or retain existing values
    vendor.name = req.body.name || vendor.name;
    vendor.description = req.body.description || vendor.description;
    vendor.address = req.body.address || vendor.address;  
    vendor.phoneNumber = req.body.phoneNumber || vendor.phoneNumber;
    vendor.zipCode = req.body.zipCode || vendor.zipCode;
    vendor.email = req.body.email || vendor.email;

    await vendor.save();


    res.status(200).json({
      success: true,
      vendor,
      message: "vendor profile updated successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update vendor avatar
const updateVendorAvatar = asyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    if (req.file) {
      // Delete existing avatar from Cloudinary
      if (vendor.avatar?.public_id) {
        await cloudinary.uploader.destroy(vendor.avatar.public_id);
      }

      // Upload new avatar to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars",
        width: 150,
      });

      vendor.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    await vendor.save();

    res.status(200).json({
      success: true,
      vendor,
      message: "Avatar updated successfully",
    });
  } catch (error) {
    console.error("Error updating vendor avatar:", error);
    res.status(500).json({ error: error.message });
  }
});

// Combined function to get product count and average rating for a vendor
const getVendorStatistics = asyncHandler(async (req, res) => {
  try {
    const vendorId = req.params.id;

    // Get the product count
    const productCount = await Product.countDocuments({ vendorId });

    // Get the total rating and number of reviews
    const products = await Product.find({ vendorId });
    let totalRating = 0;
    let reviewCount = 0;

    products.forEach(product => {
      if (product.reviews.length > 0) {
        reviewCount += product.reviews.length;
        product.reviews.forEach(review => {
          totalRating += review.rating;
        });
      }
    });

    const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

    res.status(200).json({
      success: true,
      productCount,
      averageRating,
      reviewCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//create & update bank info
const createOrUpdateBankInfo = asyncHandler(async (req, res) => {

  try {
    const { vendorId } = req.params;
    const { accountHolderName, bankName, bankAccountNumber, iban } = req.body;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found." });

    vendor.vendorBankInfo = { accountHolderName, bankName, bankAccountNumber, iban };
    await vendor.save();

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error.", error });
  }
});

// Get all notifications for a vendor
const getVendorNotifications = asyncHandler(async (req, res) => {
  const vendorId = req.vendor?._id || req.query.vendorId;
  if (!vendorId) {
    return res.status(400).json({ message: "Vendor ID required" });
  }

  const notifications = await VendorNotification.find({ vendor: vendorId }).sort({ createdAt: -1 });
  res.status(200).json({ notifications });
});

// Get unread count for vendor
const getVendorNotificationCount = asyncHandler(async (req, res) => {
  const vendorId = req.vendor?._id || req.query.vendorId;

  if (!vendorId) {
    return res.status(400).json({ message: "Vendor ID required" });
  }

  const count = await VendorNotification.countDocuments({ vendor: vendorId, isRead: false });
  res.status(200).json({ count });
});

// Mark a vendor notification as read
const markVendorNotificationAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await VendorNotification.findByIdAndUpdate(id, { isRead: true });
  res.status(200).json({ message: "Vendor notification marked as read" });
});

// Delete a vendor notification
const deleteVendorNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await VendorNotification.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: "Notification not found" });
  }

  res.status(200).json({ message: "Notification deleted successfully" });
});


module.exports = {
  registerVendor,
  loginVendor,
  logoutVendor,
  getAllVendors,
  getVendorInfo,
  updateVendorProfile,
  updateVendorAvatar,
  getVendorStatistics,
  createOrUpdateBankInfo,
  getVendorNotifications,
  getVendorNotificationCount,
  markVendorNotificationAsRead,
  deleteVendorNotification
};
