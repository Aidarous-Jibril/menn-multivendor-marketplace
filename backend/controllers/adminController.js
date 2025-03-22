const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const Vendor = require("../models/vendorModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const MainCategory = require("../models/mainCategory");
const SubCategory = require('../models/subCategory');
const SubSubCategory = require('../models/subSubCategory');
const CouponCode = require("../models/couponCodeModel");
const orderModel = require("../models/orderModel");
const createAdminToken = require("../utils/adminToken");

// Admin Registration (Optional: If you want to create admin manually)
const registerAdmin = expressAsyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin already exists
        let admin = await Admin.findOne({ email });
        if (admin) return res.status(400).json({ message: "Admin already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin
        admin = new Admin({ email, password: hashedPassword });
        await admin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin Login
const loginAdmin = expressAsyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
  
      if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      // Create JWT token and set it in the cookie
      createAdminToken(res, admin._id); 
   
      // Send response with admin data (without password)
      res.json({
        admin: { id: admin._id, email: admin.email, role: admin.role }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Get Admin Profile
const getAdminProfile = expressAsyncHandler(async (req, res) => {

    try {
        const admin = await Admin.findById(req.admin.id).select("-password");
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// -------------- USER MANAGEMENT --------------
// Get all users
const getAllUsers = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find();  
        res.json(users); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single user by ID
const getUserById = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Edit user details
const editUser = expressAsyncHandler(async (req, res) => {
    console.log("Body", req.body)
    console.log("ID", req.params)
    const user = await User.findById(req.params.id);

    if (user) {
        Object.assign(user, req.body);
        await user.save();
        res.json({ message: "User updated successfully", user });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Delete user
const deleteUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
        res.json({ message: "User deleted successfully" });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});


// -------------- VENDOR MANAGEMENT --------------
// Get all vendors
const getAllVendors = expressAsyncHandler(async (req, res) => {
    const vendors = await Vendor.find();
    res.json(vendors);
});

// Get single vendor by ID
const getVendorById = expressAsyncHandler(async (req, res) => {
    console.log("ID:", req.params.id)
    const vendor = await Vendor.findById(req.params.id);
    console.log("vendor is being fetched:",vendor)

    if (vendor) {
        res.json(vendor);
    } else {
        res.status(404).json({ message: "Vendor not found" });
    }
});

// Update vendor details
const updateVendor = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("ID:", id)
    console.log("BODY:", req.body)
    const { name, email, phoneNumber, address, zipCode, avatar } = req.body;  

    const vendor = await Vendor.findById(id);
    
    if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
    }

    vendor.name = name || vendor.name;
    vendor.email = email || vendor.email;
    vendor.phoneNumber = phoneNumber || vendor.phoneNumber;
    vendor.address = address || vendor.address;
    vendor.zipCode = zipCode || vendor.zipCode;
    vendor.avatar = avatar || vendor.avatar;  // If avatar is provided, update it

    try {
        await vendor.save();
        res.json({ message: "Vendor updated successfully", vendor });
    } catch (error) {
        res.status(500).json({ message: "Failed to update vendor" });
    }
});

// Delete vendor
const deleteVendor = expressAsyncHandler(async (req, res) => {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    if (vendor) {
        res.json({ message: "Vendor deleted successfully" });
    } else {
        res.status(404).json({ message: "Vendor not found" });
    }
});

// Block vendor registration
const blockVendor = expressAsyncHandler(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);

    if (vendor) {
        console.log("VENDOR:", vendor)
        vendor.isBlocked = true;  // Add a flag to block the vendor
        await vendor.save();
        res.json({ message: "Vendor blocked successfully", vendor });
    } else {
        res.status(404).json({ message: "Vendor not found" });
    }
});

// Unblock vendor registration
const unblockVendor = expressAsyncHandler(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);

    if (vendor) {
        vendor.isBlocked = false;  // Set vendor as unblocked
        await vendor.save();
        res.json({ message: "Vendor unblocked successfully", vendor });
    } else {
        res.status(404).json({ message: "Vendor not found" });
    }
});


// -------------- ORDER MANAGEMENT --------------
// Get all orders
const getAllOrders = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find()
        .populate("user")
        .populate("items.productId"); // ✅ Correct field name
    res.json(orders);
});

// Get single order by ID
const getOrderById = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate("user")
        .populate("items.productId"); // ✅ Correct field name
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

// Delete product
const deleteOrder = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (order) {
        res.json({ message: "Order deleted successfully" });
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

// update the order status
const updateOrderStatus = expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const order = await Order.findById(id);
  
      if (order) {
        order.status = status || order.status;
        await order.save();
        res.json({ message: "Order status updated successfully", order });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

// update the full order
const updateOrder = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { status, shippingAddress, paymentInfo, totalAmount } = req.body;
        
        const order = await Order.findById(id);
        console.log("Order is:",  order)
  
      if (order) {
        order.status = status || order.status;
        order.shippingAddress = shippingAddress || order.shippingAddress;
        order.paymentInfo = paymentInfo || order.paymentInfo;
        order.totalPrice = totalAmount || order.totalPrice;
  
        await order.save();
  
        res.json({ message: "Order updated successfully", order });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
// Process refund
const refundOrder = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        if (order.isRefunded) {
            return res.status(400).json({ message: "Order is already refunded" });
        }

        order.isRefunded = true;
        await order.save();

        res.json({ message: "Order refunded successfully", order });
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

// New function to get orders by user ID
const getUserOrders = expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;
    console.log("userId:", userId);
    // Find all orders for the user and populate the necessary fields
    const orders = await orderModel.find({ user: userId })
      .populate({
        path: "user",
        model: "User", // Ensure this is the correct model
      })
      .populate({
        path: "items.productId",
        model: "Product", // Ensure this is the correct model
      });

    console.log("orders:", orders);

    // If no orders are found, return an empty array with status 200
    if (orders.length === 0) {
      return res.status(200).json([]); // Send empty array instead of 404
    }

    // If there are orders, return them
    res.json(orders);
});
 

// -------------- PRODUCT MANAGEMENT --------------
// Get all products
const getAllProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Get single product by ID with populated vendor and review user details
const getProductById = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
        .populate("vendorId")  
        .populate("reviews.user", "name email") 
        .exec();

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

// Approve product ?????????
const approveProduct = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.isApproved = true;
        await product.save();
        res.json({ message: "Product approved successfully", product });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

// Edit product details
const editProduct = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        Object.assign(product, req.body);
        await product.save();
        res.json({ message: "Product updated successfully", product });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

// Delete product
const deleteProduct = expressAsyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (product) {
        res.json({ message: "Product deleted successfully" });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

// -------------- MAIN-CATEGORY MANAGEMENT --------------
// Get all categories
const getAllCategories = expressAsyncHandler(async (req, res) => {
    try {
            const categories = await MainCategory.find()
                .populate({
                    path: 'subcategories',
                    populate: {
                        path: 'subsubcategories'
                    }
                });
            res.status(200).json(categories );
        } catch (error) {
            res.status(500).json({ msg: 'Internal Server Error' });
        }
});

// Add new category
const addCategory = expressAsyncHandler(async (req, res) => {
    const { name, slug, imageUrl } = req.body;

    const categoryExists = await MainCategory.findOne({ name });
    if (categoryExists) return res.status(400).json({ message: "Category already exists" });

    const category = new MainCategory({ name, slug, imageUrl }); 
    await category.save();

    res.status(201).json({ message: "Category added successfully", category });
});

// Delete category
const getCategoryById = expressAsyncHandler(async (req, res) => {
    const category = await MainCategory.findById(req.params.id).populate("subcategories");

    if (category) {
        res.json(category);
    } else {
        res.status(404).json({ message: "Category not found" });
    }
});

// Edit category
const editCategory = expressAsyncHandler(async (req, res) => {
    const category = await MainCategory.findById(req.params.id);

    if (category) {
        category.name = req.body.name || category.name;
        await category.save();
        res.json({ message: "Category updated successfully", category });
    } else {
        res.status(404).json({ message: "Category not found" });
    }
});

// Delete category
const deleteCategory = expressAsyncHandler(async (req, res) => {
    const category = await MainCategory.findByIdAndDelete(req.params.id);

    if (category) {
        res.json({ message: "Category deleted successfully" });
    } else {
        res.status(404).json({ message: "Category not found" });
    }
});

// -------------- SUBCATEGORY MANAGEMENT --------------
// Get SubCategories by Main Category ID or all subcategories
const getAllSubCategories = async (req, res) => {
    try {
        const { mainCategoryId } = req.query;  
        let subcategories = [];

        if (mainCategoryId) {
            const mainCategory = await MainCategory.findById(mainCategoryId);

            if (!mainCategory) {
                return res.status(404).json({ error: 'Main category not found' });
            }

            subcategories = await SubCategory.find({ mainCategory: mainCategory._id })
                .populate({ path: 'mainCategory', select: 'name slug imageUrl' }) 
                .populate('subsubcategories');  
        } else {
            subcategories = await SubCategory.find()
            .populate({ path: 'mainCategory', select: 'name slug imageUrl' })
            .populate('subsubcategories');
        }

        res.status(200).json({ subcategories, message: "Subcategories fetched successfully!" });
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};
// Add a new subcategory
const createSubCategory = expressAsyncHandler(async (req, res) => {
    const { name, slug, imageUrl, mainCategory } = req.body;
    console.log("name, slug, imageUrl, mainCategory :", name, slug, imageUrl, mainCategory )
    const subCategoryExists = await SubCategory.findOne({ slug });
    if (subCategoryExists) return res.status(400).json({ message: "Subcategory already exists" });

    const subCategory = new SubCategory({ name, slug, imageUrl, mainCategory });
    await subCategory.save();

    // ✅ Add SubCategory to MainCategory
    await MainCategory.findByIdAndUpdate(mainCategory, { $push: { subcategories: subCategory._id } });

    res.status(201).json({ message: "Subcategory added successfully", subCategory });
});

// Get Single SubCategory
const getSubCategoryById = expressAsyncHandler(async (req, res) => {
    const subCategory = await SubCategory.findById(req.params.id).populate("mainCategory").populate("subsubcategories");

    if (subCategory) {
        res.json(subCategory);
    } else {
        res.status(404).json({ message: "SubCategory not found" });
    }
});

// Update subcategory
const updateSubCategory = expressAsyncHandler(async (req, res) => {
    const subCategoryId = req.params.id;
  const subCategory = await SubCategory.findById(subCategoryId);
  if (!subCategory) return res.status(404).json({ message: "Subcategory not found" });

  subCategory.name = req.body.name || subCategory.name;
  subCategory.slug = req.body.slug || subCategory.slug;
  subCategory.imageUrl = req.body.imageUrl || subCategory.imageUrl;
  subCategory.mainCategory = req.body.mainCategory || subCategory.mainCategory;

  await subCategory.save();
  res.json({ message: "Subcategory updated successfully", subCategory });
});

// Delete subcategory
const deleteSubCategory = expressAsyncHandler(async (req, res) => {
    const subCategoryId = req.params.id;
    const subCategory = await SubCategory.findByIdAndDelete(subCategoryId);
    if (!subCategory) return res.status(404).json({ message: "Subcategory not found" });

    // ✅ Remove subCategory reference from SubCategory
    await MainCategory.findByIdAndUpdate(subCategory.mainCategory, { $pull: { subcategories: subCategory._id } });
    res.json({
        message: "Subcategory deleted successfully",
        subCategoryId: subCategory._id
    });
  });

// -------------- SUB-SUBCATEGORY MANAGEMENT --------------
// Get all sub-subcategories
const getAllSubSubCategories = expressAsyncHandler(async (req, res) => {
    try {
        const { subCategoryId } = req.query;  
        let subSubcategories = [];
        console.log("subCategoryId:", subCategoryId);  
        if (subCategoryId) {
            const subCategory = await SubCategory.findById(subCategoryId);

            if (!subCategory) {
                return res.status(404).json({ error: 'Subcategory not found' });
            }

            subSubcategories = await SubSubCategory.find({ subCategory: subCategory._id })
              .populate({ path: 'subCategory', select: 'name slug imageUrl mainCategory' })
        } else {
            subSubcategories = await SubSubCategory.find().populate('subCategory');
        }

        res.json({ subSubcategories, message: 'Sub-subcategories fetched successfully!' });
    } catch (error) {
        console.error('Error fetching sub-subcategories:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

// Create sub-subcategory
const createSubSubCategory = expressAsyncHandler(async (req, res) => {
    const { name, slug, imageUrl, subCategory } = req.body;
  console.log("name, slug, imageUrl, subCategory:", name, slug, imageUrl, subCategory)
    const newDoc = new SubSubCategory({
      name,
      slug,
      imageUrl,
      subCategory,
    });
    const saved = await newDoc.save();
    res.json({ message: 'SubSubCategory created successfully', subSubCategory: saved });
  });

// Get Single Sub-SubCategory
const getSubSubCategoryById = expressAsyncHandler(async (req, res) => {
    const subSubCategory = await SubSubCategory.findById(req.params.id).populate("subCategory");

    if (subSubCategory) {
        res.json(subSubCategory);
    } else {
        res.status(404).json({ message: "SubSubCategory not found" });
    }
});

// Update sub-subcategory
const updateSubSubCategory = expressAsyncHandler(async (req, res) => {
    const subSubCategoryId = req.params.id;
    const { name, slug, imageUrl, subCategory } = req.body;
  
    const subSubCategory = await SubSubCategory.findById(subSubCategoryId);
    if (!subSubCategory) {
      return res.status(404).json({ message: 'SubSubCategory not found' });
    }
  
    if (name) subSubCategory.name = name;
    if (slug) subSubCategory.slug = slug;
    if (imageUrl) subSubCategory.imageUrl = imageUrl;
    if (subCategory) subSubCategory.subCategory = subCategory;
  
    const updated = await subSubCategory.save();
    res.json({
      message: 'SubSubCategory updated successfully',
      subSubCategory: updated,
    });
  });
  
// Delete sub-subcategory
const deleteSubSubCategory = expressAsyncHandler(async (req, res) => {
    const subSubCategoryId = req.params.id;
    const subSubCategory = await SubSubCategory.findByIdAndDelete(subSubCategoryId);
    if (!subSubCategory) return res.status(404).json({ message: "Sub-subcategory not found" });

    // ✅ Remove SubSubCategory reference from SubCategory
    await SubCategory.findByIdAndUpdate(subSubCategory.subCategory, { $pull: { subsubcategories: subSubCategory._id } });

    res.json({
        message: "Sub-subcategory deleted successfully",
        subSubCategoryId: subSubCategory._id
    });
  });

// -------------- COUPON MANAGEMENT --------------
// Get all coupons
const getAllCoupons = expressAsyncHandler(async (req, res) => {
    const coupons = await CouponCode.find().populate("vendorId").populate("selectedProducts");
    res.json(coupons);
});

// Get single coupon by ID
const getCouponById = expressAsyncHandler(async (req, res) => {
    const coupon = await CouponCode.findById(req.params.id).populate("vendorId").populate("selectedProducts");
    if (coupon) {
        res.json(coupon);
    } else {
        res.status(404).json({ message: "Coupon not found" });
    }
});

// Add a new coupon
const addCoupon = expressAsyncHandler(async (req, res) => {
    console.log("BODY:", req.body)
    const { code, discount, type, validityStart, validityEnd, status, vendorId } = req.body;

    const couponExists = await CouponCode.findOne({ name: code });
    if (couponExists) {
        return res.status(400).json({ message: "Coupon code already exists" });
    }

    const coupon = new CouponCode({
        name: code,  
        value: discount, 
        type,
        validityStart,
        validityEnd,
        status,
        vendorId,  // Use the admin's vendor ID
    });

    await coupon.save();
    res.status(201).json({ message: "Coupon added successfully", coupon });
});

// Edit coupon
const updateCoupon = expressAsyncHandler(async (req, res) => {
    const coupon = await CouponCode.findById(req.params.id).populate("vendorId").populate("selectedProducts");
    
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    
    if (req.body.name) {
      coupon.name = req.body.name;
    }
      if (req.body.status) {
      coupon.status = req.body.status;
    }
    if (req.body.value) {
      coupon.value = parseFloat(req.body.value); 
    }
    if (req.body.type) {
      coupon.type = req.body.type;
    }
    if (req.body.validityStart) {
      coupon.validityStart = req.body.validityStart;
    }
    if (req.body.validityEnd) {
      coupon.validityEnd = req.body.validityEnd;
    }

    const updatedCoupon = await coupon.save();
    console.log("updatedCoupon:", updatedCoupon);

    res.json({ message: "Coupon updated successfully", coupon: updatedCoupon });
  });
  
// Delete coupon
const deleteCoupon = expressAsyncHandler(async (req, res) => {
    const coupon = await CouponCode.findByIdAndDelete(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    res.json({ message: "Coupon deleted successfully" });
});


// -------------- SALES MANAGEMENT --------------
// Create Sale
const createSale = async (req, res) => {
    try {
      const sale = new Sale(req.body); 
      await sale.save();
      res.status(201).json({ message: "Sale created successfully", sale });
    } catch (error) {
      console.error("Error creating sale:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // Get All Sales
  const getAllSales = async (req, res) => {
    try {
      const sales = await Sale.find();
      res.json(sales);
    } catch (error) {
      console.error("Error fetching sales:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // Get Single Sale
  const getSaleById = async (req, res) => {
    try {
      const sale = await Sale.findById(req.params.id);
      if (!sale) {
        return res.status(404).json({ message: "Sale not found" });
      }
      res.json(sale);
    } catch (error) {
      console.error("Error fetching sale:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // Update Sale
  const updateSale = async (req, res) => {
    try {
      const saleId = req.params.id;
      const sale = await Sale.findById(saleId);
      if (!sale) {
        return res.status(404).json({ message: "Sale not found" });
      }
      // Merge the request body into the existing sale doc
      Object.assign(sale, req.body);
      await sale.save();
      res.json({ message: "Sale updated successfully", sale });
    } catch (error) {
      console.error("Error updating sale:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // Delete Sale
  const deleteSale = async (req, res) => {
    try {
      const saleId = req.params.id;
      const sale = await Sale.findByIdAndDelete(saleId);
      if (!sale) {
        return res.status(404).json({ message: "Sale not found" });
      }
      res.json({ message: "Sale deleted successfully" });
    } catch (error) {
      console.error("Error deleting sale:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


module.exports = { 
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
    getAllOrders,
    getOrderById,
    deleteOrder,
    updateOrderStatus,
    updateOrder,
    refundOrder,
    getUserOrders,
    getAllProducts,
    getProductById,
    approveProduct,
    editProduct,
    deleteProduct,
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
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale,
};