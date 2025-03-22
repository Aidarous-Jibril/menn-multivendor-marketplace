const express = require("express");
const { isAdmin } = require("../middleware/authMiddleware"); 
const {
     registerAdmin, 
    loginAdmin, 
    getAdminProfile,
    getAllUsers, 
    getUserById,
    editUser, 
    deleteUser, 
    getAllVendors,
    getVendorById, 
    updateVendor, 
    deleteVendor, 
    blockVendor,
    unblockVendor,
    getAllProducts,
    getProductById,
    approveProduct,
    editProduct,
    deleteProduct,
    getAllOrders,
    getOrderById,
    deleteOrder,
    updateOrderStatus,
    updateOrder,
    refundOrder,
    getUserOrders,
    getAllCategories,
    addCategory,
    getCategoryById,
    editCategory,
    deleteCategory,
    getAllSubCategories,
    createSubCategory,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
    getAllSubSubCategories,
    createSubSubCategory,
    getSubSubCategoryById,
    updateSubSubCategory,
    deleteSubSubCategory,
    getAllCoupons,
    getCouponById,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    createSale,
    getAllSales,
    getSaleById,
    updateSale,
    deleteSale,
 } = require("../controllers/adminController");

const router = express.Router();

// Admin
router.post("/register", registerAdmin); 
router.post("/login", loginAdmin);
router.get("/profile", isAdmin, getAdminProfile); 

// User Management
router.get("/users", isAdmin, getAllUsers);
router.get("/users/:id", isAdmin, getUserById);
router.put("/users/:id", isAdmin, editUser);
router.delete("/users/:id", isAdmin, deleteUser);

// Vendor Management
router.get("/vendors", isAdmin, getAllVendors);
router.get("/vendors/:id", isAdmin, getVendorById);
router.put("/vendors/:id", isAdmin, updateVendor);
router.delete("/vendors/:id", isAdmin, deleteVendor);
router.patch("/vendors/:id/block", isAdmin, blockVendor);  
router.patch("/vendors/:id/unblock", isAdmin, unblockVendor);  

// Order Management
router.get("/orders", isAdmin, getAllOrders);
router.get("/orders/:id", isAdmin, getOrderById);
router.get("/orders/user/:userId", isAdmin, getUserOrders);  
router.put("/orders/:id/status", isAdmin, updateOrderStatus);
router.put("/orders/:id", isAdmin, updateOrder);
router.patch("/orders/:id/refund", isAdmin, refundOrder);
router.delete("/orders/:id", isAdmin, deleteOrder);

// Product Management
router.get("/products", isAdmin, getAllProducts);
router.get("/products/:id", isAdmin, getProductById);
router.patch("/products/:id/approve", isAdmin, approveProduct);
router.put("/products/:id", isAdmin, editProduct);
router.delete("/products/:id", isAdmin, deleteProduct);

// Category Management
router.get("/categories", isAdmin, getAllCategories);
router.post("/categories", isAdmin, addCategory);
router.get("/categories/:id", isAdmin, getCategoryById);
router.put("/categories/:id", isAdmin, editCategory);
router.delete("/categories/:id", isAdmin, deleteCategory);

// SubCategory Management
router.get("/subcategories", isAdmin, getAllSubCategories);
router.post("/subcategories", isAdmin, createSubCategory);
router.get("/subcategories/:id", isAdmin, getSubCategoryById);
router.put("/subcategories/:id", isAdmin, updateSubCategory);
router.delete("/subcategories/:id", isAdmin, deleteSubCategory);

// Sub-SubCategory Management
router.get("/subsubcategories", isAdmin, getAllSubSubCategories);
router.post("/subsubcategories", isAdmin, createSubSubCategory);
router.get("/subsubcategories/:id", isAdmin, getSubSubCategoryById);
router.put("/subsubcategories/:id", isAdmin, updateSubSubCategory); 
router.delete("/subsubcategories/:id", isAdmin, deleteSubSubCategory);

// Coupon Management
router.get("/coupons", isAdmin, getAllCoupons);
router.get("/coupons/:id", isAdmin, getCouponById);
router.post("/coupons", isAdmin, addCoupon);
router.put("/coupons/:id", isAdmin, updateCoupon);
router.delete("/coupons/:id", isAdmin, deleteCoupon);

// Sale Management
router.post("/sales", isAdmin, createSale);
router.get("/sales", isAdmin, getAllSales);
router.get("/sales/:id", isAdmin, getSaleById);
router.put("/sales/:id", isAdmin, updateSale);
router.delete("/sales/:id", isAdmin, deleteSale);

module.exports = router;


