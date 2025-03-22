//couponCodeRoutes.js
const express = require('express')
const router = express.Router()
const {
  createCouponCode,
  getAllCouponCodes,
  deleteCouponCode,
  getCouponCodeValue,
  updateCouponCode
} = require('../controllers/couponCodeController')
const { isVendor } = require('../middleware/authMiddleware')

// Create a new coupon (POST /api/coupons/)
router.post("/create", isVendor, createCouponCode);

// Get all coupons for a vendor
router.get("/vendor/:vendorId", isVendor, getAllCouponCodes);

// Get coupon value by name
router.get("/:name/value", getCouponCodeValue);

// Delete a coupon
router.delete("/:id", isVendor, deleteCouponCode);

// Update a coupon (PUT /api/coupons/:id)
router.put("/:id", isVendor, updateCouponCode);

module.exports = router;
