// src/redux/slices/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Check if window is defined (to avoid SSR issues)
const isBrowser = () => typeof window !== "undefined";

// Get Admin Info from LocalStorage
const getAdminInfoFromStorage = () => {
  if (isBrowser()) {
    const adminInfo = localStorage.getItem("adminInfo");
    return adminInfo ? JSON.parse(adminInfo) : null;
  }
  return null;
};

// Admin Login
export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/admin/login", adminData, {
        withCredentials: true,
      });
      if (isBrowser()) {
        localStorage.setItem("adminInfo", JSON.stringify(data.admin));
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);
// Admin Logout
export const logoutAdmin = createAsyncThunk(
  "admin/logoutAdmin",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get("/api/admin/logout", {
        withCredentials: true,
      });
      if (isBrowser()) {
        localStorage.removeItem("adminInfo");
      }
      return "Logged out successfully";
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Logout failed");
    }
  }
);

// -------------- USER ACTIONS --------------
// Fetch All Users
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/admin/users", {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch users"
      );
    }
  }
);
// Edit User
export const editUser = createAsyncThunk(
  "admin/editUser",
  async ({ id, updatedUser }, { rejectWithValue }) => {
    console.log("updatedUser", updatedUser);
    try {
      const { data } = await axios.put(`/api/admin/users/${id}`, updatedUser, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to update user"
      );
    }
  }
);
// Delete User
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/admin/users/${userId}`, {
        withCredentials: true,
      });
      return { userId, message: data.message }; // Return userId and message for handling in reducers
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to delete user"
      );
    }
  }
);
// Add the new action to fetch orders for a user
export const fetchUserOrders = createAsyncThunk(
  "admin/fetchUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/admin/orders/user/${userId}`, {
        withCredentials: true,
      });
      return data; // Return the orders data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch orders"
      );
    }
  }
);

// -------------- VENDOR ACTIONS --------------
// Fetch all vendors
export const fetchAllVendors = createAsyncThunk(
  "admin/fetchAllVendors",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/admin/vendors", {
        withCredentials: true,
      });
      console.log("vendors:", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch vendors"
      );
    }
  }
);
// Fetch Single vendor
export const fetchVendorById = createAsyncThunk(
  "admin/fetchVendorById",
  async (vendorId, { rejectWithValue }) => {
    try {
      console.log("VENDOR ID:", vendorId);
      const { data } = await axios.get(`/api/admin/vendors/${vendorId}`, {
        withCredentials: true,
      });
      return data; // Return vendor data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch vendor"
      );
    }
  }
);
// Update Vendor
export const updateVendor = createAsyncThunk(
  "admin/updateVendor",
  async ({ id, updatedVendor }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/admin/vendors/${id}`, updatedVendor, {
        withCredentials: true,
      });
      return data;  // Return the updated vendor
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update vendor"
      );
    }
  }
);

// Block Vendor
export const blockVendor = createAsyncThunk(
  "admin/blockVendor",
  async (vendorId, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `/api/admin/vendors/${vendorId}/block`,
        {},
        {
          withCredentials: true,
        }
      );
      return data; // Return updated vendor data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to block vendor"
      );
    }
  }
);
// Unblock Vendor
export const unblockVendor = createAsyncThunk(
  "admin/unblockVendor",
  async (vendorId, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `/api/admin/vendors/${vendorId}/unblock`,
        {},
        {
          withCredentials: true,
        }
      );
      return data; // Return updated vendor data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to unblock vendor"
      );
    }
  }
);

// -------------- ORDER ACTIONS --------------
// Fetch all orders
export const fetchOrders = createAsyncThunk(
  "admin/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/admin/orders");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Fetch a single order by ID
export const fetchSingleOrder = createAsyncThunk(
  "admin/fetchSingleOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/admin/orders/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Update order status
export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/admin/orders/${id}/status`, {
        status,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update order thunk
export const updateOrder = createAsyncThunk(
  "admin/updateOrder", 
  async ({ id, updatedOrder }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/admin/orders/${id}`, updatedOrder); 
      return data; // Return the updated order data
    } catch (error) {
      return rejectWithValue(error.response.data.message); 
    }
  }
);

// Delete an order
export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async ({ id }, { rejectWithValue }) => { 
    console.log("ID:", id)
    try {
      const { data } = await axios.delete(`/api/admin/orders/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Process refund COMEBACK???????????????????????????
export const refundOrder = createAsyncThunk(
  "admin/refundOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/api/admin/orders/${id}/refund`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// -------------- PRODUCTS ACTIONS --------------
// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "admin/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/admin/products", {
        withCredentials: true,
      });
      return data; // Return products data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch products"
      );
    }
  }
);
// Fetch single product
export const fetchSingleProduct = createAsyncThunk(
  "admin/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/admin/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Edit product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ productId, updatedProduct }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/admin/products/${productId}`,  
        updatedProduct, 
        { withCredentials: true }
      );
      return data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to edit product"
      );
    }
  }
);
// Delete product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/admin/products/${productId}`, {
        withCredentials: true,
      });
      return data; // Return success message for deletion
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to delete product"
      );
    }
  }
);
// -------------- CATEGORY ACTIONS --------------

// Fetch main categories
export const fetchCategories = createAsyncThunk(
  'admin/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/admin/categories'); // Using axios to fetch data
      // console.log("DATA:", data);
      return data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch categories");
    }
  }
);

// Create Main Category
export const createMainCategory = createAsyncThunk(
  'admin/createMainCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/admin/categories', categoryData, {
        headers: { 'Content-Type': 'application/json' }, // Setting the content type
      });
      return data.category; // Returning the created category
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create category');
    }
  }
);

// Update Main Category
export const updateMainCategory = createAsyncThunk(
  'admin/updateMainCategory',
  async ({ categoryId, categoryData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/admin/categories/${categoryId}`, categoryData, {
        headers: { 'Content-Type': 'application/json' }, // Setting the content type
      });
      return data.category; // Returning the updated category
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update category');
    }
  }
);

// Delete Main Category
export const deleteMainCategory = createAsyncThunk(
  'admin/deleteMainCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/admin/categories/${categoryId}`); // Sending DELETE request
      return categoryId; // Returning the category ID that was deleted
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete category');
    }
  }
);

// -------------- SUB-CATEGORY ACTIONS --------------
// Fetch subcategories by category slug or fetch all subcategories
export const fetchSubcategories = createAsyncThunk(
  'admin/fetchSubcategories',
  async (mainCategoryId = null, { rejectWithValue }) => {  // Default is null if categorySlug is not provided
    try {
      let url = '/api/admin/subcategories';
      // If categorySlug is provided, append it to the URL
      if (mainCategoryId) {
        url += `?mainCategoryId=${mainCategoryId}`;
      }

      const response = await axios.get(url);
      
      // Return subcategories
      return response.data.subcategories;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch subcategories");
    }
  }
);
// Create Sub-Subcategory
export const createSubcategory = createAsyncThunk(
  'admin/createSubcategory',
  async (formData, { rejectWithValue }) => {
    console.log("Subcategory formData:", formData)
    try {
      const { data } = await axios.post('/api/admin/subcategories', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return data.subCategory;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// Update Subcategory
export const updateSubcategory = createAsyncThunk(
  'admin/updateSubcategory',
  async ({ subcategoryId, subcategoryData }, { rejectWithValue }) => {
    console.log("subcategoryId And subcategoryData ", subcategoryId, subcategoryData )
    try {
      const response = await axios.put(
        `/api/admin/subcategories/${subcategoryId}`,
        subcategoryData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      // Assuming your response data returns the updated subcategory under "subCategory"
      return response.data.subCategory;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update subcategory'
      );
    }
  }
);
// Delete Subcategory
export const deleteSubcategory = createAsyncThunk(
  'admin/deleteSubcategory',
  async (subcategoryId, { rejectWithValue }) => {
    console.log("subcategoryId:", subcategoryId)
    try {
      const response = await fetch(`/api/admin/subcategories/${subcategoryId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete subcategory');
      return subcategoryId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// -------------- SUB-SUBCATEGORY ACTIONS --------------
// Fetch sub-subcategories by subcategory slug
export const fetchSubSubcategories = createAsyncThunk(
  'admin/fetchSubSubcategories',
  async (subCategoryId, { rejectWithValue }) => {
    try {
      let url = '/api/admin/subsubcategories';  

      if (subCategoryId) {
        url += `?subCategoryId=${subCategoryId}`;
      }

      const response = await axios.get(url);  
      console.log('RESPONSE:', response)
      return response.data.subSubcategories;  
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch sub-subcategories");
    }
  }
);

// Create Sub-Subcategory
export const createSubSubcategory = createAsyncThunk(
  'admin/createSubSubcategory',
  async (formData, { rejectWithValue }) => {
    console.log("formData:", formData)
    try {
      const { data } = await axios.post('/api/admin/subsubcategories', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return data.subSubCategory;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update Sub-Subcategory
export const updateSubSubcategory = createAsyncThunk(
  'admin/updateSubSubcategory',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/admin/subsubcategories/${id}`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return data.subSubCategory;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// Delete Sub-Subcategory
export const deleteSubSubcategory = createAsyncThunk(
  'admin/deleteSubSubcategory',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/admin/subsubcategories/${id}`);
      return data; // or data.subSubCategory
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// -------------- COUPONS ACTIONS --------------
// Fetch all coupons for the admin
export const fetchAllCoupons = createAsyncThunk(
  'admin/fetchAllCoupons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/admin/coupons');
      console.log("response:",response)
      return response.data;  
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to create a new coupon
export const createCoupon = createAsyncThunk(
  'admin/createCoupon',
  async (couponData, { rejectWithValue }) => {
    console.log("couponData:", couponData)
    try {
      const response = await axios.post(`/api/admin/coupons`, couponData); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to delete a coupon
export const deleteCoupon = createAsyncThunk(
  'admin/deleteCoupon',
  async (couponId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/admin/coupons/${couponId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update an existing coupon
export const adminUpdateCoupon = createAsyncThunk(
  "admin/adminUpdateCoupon",
  async ({ couponId, couponData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/admin/coupons/${couponId}`, couponData);
      return { coupon: response.data.coupon, message: response.data.message };  // Return both coupon and message
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  adminInfo: getAdminInfoFromStorage(),
  users: [],
  vendors: [],
  userOrders: [],
  orders: [],
  singleOrder: null,
  products: [],
  singleProduct: null,
  categories: [],
  subcategories: [],
  subSubcategories: [],
  coupons: [],
  isLoading: false,
  error: null,
  successMessage: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder
      // Admin Login
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminInfo = action.payload.admin;
        state.successMessage = action.payload.msg;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Admin Logout
      .addCase(logoutAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminInfo = null;
        state.successMessage = action.payload;
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Edit User
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage =
          action.payload.message || "User updated successfully";
        const updatedUser = action.payload.user;
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter(
          (user) => user._id !== action.payload.userId
        );
        state.successMessage = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle fetching user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload || []; 
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch all vendors
      .addCase(fetchAllVendors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllVendors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vendors = action.payload;
      })
      .addCase(fetchAllVendors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Updating the full order
      .addCase(updateVendor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.vendors = state.vendors.map((vendor) =>
          vendor._id === action.payload.vendor._id ? action.payload.vendor : vendor
        );
        state.successMessage = "Vendor updated successfully!";
      })
      .addCase(updateVendor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Block Vendor
      .addCase(blockVendor.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedVendor = action.payload.vendor; // Get updated vendor
        state.vendors = state.vendors.map((vendor) =>
          vendor._id === updatedVendor._id ? updatedVendor : vendor
        );
        state.successMessage =
          action.payload.message || "Vendor blocked successfully";
      })
      .addCase(blockVendor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Unblock Vendor
      .addCase(unblockVendor.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedVendor = action.payload.vendor; 
        state.vendors = state.vendors.map((vendor) =>
          vendor._id === updatedVendor._id ? updatedVendor : vendor
        );
        state.successMessage =
          action.payload.message || "Vendor unblocked successfully";
      })
      .addCase(unblockVendor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //Orders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleOrder = action.payload; 
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order
        );
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order
        );
        state.successMessage = "Order updated successfully!";
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.meta.arg
        );
      })
      .addCase(refundOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order
        );
      })
      // Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload; 
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProduct = action.payload; 
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product._id === action.payload.product._id
            ? action.payload.product
            : product
        );
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload.productId
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      // -------------- CATEGORIES  --------------
      // Handle fetching categories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle creating category
      .addCase(createMainCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      // Handle updating category
      .addCase(updateMainCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(category => category._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      // Handle deleting category
      .addCase(deleteMainCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category._id !== action.payload);
      })
      // -------------- SUB-CATEGORIES  --------------
      // Fetch Subcategories
      .addCase(fetchSubcategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subcategories = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Subcategory
      .addCase(createSubcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSubcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subcategories.push(action.payload);
      })
      .addCase(createSubcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Subcategory
      .addCase(updateSubcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.subcategories.findIndex(
          (subcat) => subcat._id === action.payload._id
        );
        if (index !== -1) {
          state.subcategories[index] = action.payload;
        }
      })
      .addCase(updateSubcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Subcategory
      .addCase(deleteSubcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subcategories = state.subcategories.filter(subcat => subcat._id !== action.payload);
      })
      .addCase(deleteSubcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // -------------- SUB-SUBCATEGORIES  --------------
      .addCase(fetchSubSubcategories.pending, (state) => {
        state.isLoading = true;  
      })
      .addCase(fetchSubSubcategories.fulfilled, (state, action) => {
        state.isLoading = false;  
        state.subSubcategories = action.payload;  
      })
      .addCase(fetchSubSubcategories.rejected, (state, action) => {
        state.isLoading = false;  
        state.error = action.payload; 
      })
      // updateSubSubcategory
      .addCase(updateSubSubcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSubSubcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.subSubcategories.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) {
          state.subSubcategories[index] = action.payload;
        }
      })
      // createSubSubcategory
      .addCase(createSubSubcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSubSubcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subSubcategories.push(action.payload);
      })
      .addCase(createSubSubcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateSubSubcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Sub-Subcategory
      .addCase(deleteSubSubcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSubSubcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId = action.payload.subSubCategoryId;
        state.subSubcategories = state.subSubcategories.filter(
          (subSubcat) => subSubcat._id !== deletedId
        );
      })      
      .addCase(deleteSubSubcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // -------------- COUPONS  --------------
      // Handle fetchAllCoupons
      .addCase(fetchAllCoupons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupons = action.payload;  // Coupons data returned from API
      })
      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle createCoupon
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupons.push(action.payload); // Correctly adds new coupon
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle deleteCoupon
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupons = state.coupons.filter(
          (coupon) => coupon._id !== action.payload._id
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
// Handle updateCoupon
.addCase(adminUpdateCoupon.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})
.addCase(adminUpdateCoupon.fulfilled, (state, action) => {
  state.isLoading = false;
  state.coupons = state.coupons.map((coupon) =>
    coupon._id === action.payload.coupon._id ? action.payload.coupon : coupon
  );
  state.successMessage = action.payload.message; // Store the success message if you need it later
})
.addCase(adminUpdateCoupon.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
});
 
  },
});

export default adminSlice.reducer;
