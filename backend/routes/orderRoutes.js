const express = require("express");
const router = express.Router();
const { getVendorOrders, getSingleOrder, updateOrderStatus, deleteOrder, createOrder, getUserOrders, refundOrder,} = require("../controllers/orderController");
const { isVendor, isAuthenticated } = require("../middleware/authMiddleware");

router.post("/", createOrder);  

// Fetch all orders for a specific vendor
router.get("/vendor-orders/:vendorId", isVendor, getVendorOrders);

// Fetch details of a single order
router.get("/:orderId", isVendor, getSingleOrder);

// Update order status (vendor only)
router.put("/update-status/:orderId", isVendor, updateOrderStatus);

// Delete an order (vendor only)
router.delete("/:orderId", isVendor, deleteOrder);

// Fetch all orders for a specific user
router.get("/user-orders/:userId", isAuthenticated, getUserOrders);

// Requset Refund order
router.put("/refund/:orderId", isAuthenticated, refundOrder);


module.exports = router;
