//productController.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const mongoose = require('mongoose');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("../utils/cloudinary");

const Product = require("../models/productModel");
const Sale = require("../models/saleModel");
const Vendor = require("../models/vendorModel");
const MainCategory = require("../models/mainCategory");
const SubCategory = require("../models/subCategory");
const SubSubCategory = require("../models/subSubCategory");

// Create product
const createProduct = catchAsyncErrors(async (req, res, next) => {
  const { mainCategory, subCategory, subSubCategory, brand, attributes, vendorId, isFeatured,  } = req.body;

  try {
      const vendor = await Vendor.findById(vendorId);

      if (!vendor) {
          return res.status(400).json({ message: "Vendor Id is invalid!" });
      }

      // Function to find category by ID or name (case insensitive)
      const findCategory = async (model, value) => {
        if (mongoose.Types.ObjectId.isValid(value)) {
            // Search by _id if value is a valid ObjectId
            return model.findById(value);
        } else {
            // Search by name or slug (case insensitive) if value is not an ObjectId
            return model.findOne({ slug: new RegExp(`^${value}$`, 'i') });
        }
    };
    

      // Find categories by ID or name
      const existingMainCategory = await findCategory(MainCategory, mainCategory);
      const existingSubCategory = await findCategory(SubCategory, subCategory);
      const existingSubSubCategory = await findCategory(SubSubCategory, subSubCategory);

      if (!existingMainCategory || !existingSubCategory || !existingSubSubCategory) {
          return res.status(400).json({ message: "Invalid category, subcategory, or sub-subcategory ID or name" });
      }

      const images = await uploadImages(req.body.images);

      // Create product data
      const productData = {
          name: req.body.name,
          description: req.body.description,
          mainCategory: existingMainCategory.slug, 
          subCategory: existingSubCategory.slug,
          subSubCategory: existingSubSubCategory.slug,
          brand: brand,
          originalPrice: req.body.originalPrice,
          discountPrice: req.body.discountPrice,
          stock: req.body.stock,
          vendorId: vendorId,
          vendor: {
              name: vendor.name,
              avatar: vendor.avatar,
              createdAt: vendor.createdAt,
              address: vendor.address,
              phoneNumber: vendor.phoneNumber,
              email: vendor.email,
              zipCode: vendor.zipCode,
              reviews: vendor.reviews,
          },
          isFeatured: isFeatured,
          attributes: new Map(Object.entries(attributes)),
          images: images,
      };

      const product = await Product.create(productData);

      res.status(201).json({
          success: true,
          msg: "Product created successfully",
          product,
      });

    } catch (error) {
      const errorMessage = error.message.includes("Unsupported image format")
        ? error.message
        : "Server error";
    
      return res.status(500).json({ message: errorMessage, error: error.message });
    }    
});

const uploadImages = async (images) => {
  console.log("IMAGES:", images);

  if (!Array.isArray(images)) {
    throw new Error("Images should be an array of URLs, file paths, or Base64 strings.");
  }

  const imagesLinks = [];
  const allowedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tiff'];

  for (let i = 0; i < images.length; i++) {
    let imagePath = images[i];

    if (imagePath.startsWith("data:image")) {
      const base64Data = imagePath.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");

      try {
        const resizedImagePath = `uploads/resized-${Date.now()}-${i}.png`;
        await sharp(buffer)
          .resize(1600, 1600) 
          .png({ quality: 100 }) // Use PNG to preserve transparency
          .toFile(resizedImagePath);

        const result = await cloudinary.uploader.upload(resizedImagePath, {
          folder: "products",
          background_removal: "cloudinary_ai", // 🔥 Remove background
          format: "png", // Keep it transparent
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });

        fs.unlinkSync(resizedImagePath);
      } catch (error) {
        console.error("Error processing Base64 image", error);
        throw new Error("Error resizing or uploading Base64 image to Cloudinary.");
      }
    } else {
      const fileExtension = path.extname(imagePath).toLowerCase();
      if (!allowedFormats.includes(fileExtension)) {
        throw new Error(`Unsupported file format: ${fileExtension}`);
      }

      try {
        const resizedImagePath = `uploads/resized-${Date.now()}-${i}.png`;
        await sharp(imagePath)
          .resize(1600, 1600)
          .png({ quality: 100 }) // Keep high quality and transparency
          .toFile(resizedImagePath);

        const result = await cloudinary.uploader.upload(resizedImagePath, {
          folder: "products",
          background_removal: "cloudinary_ai", // 🔥 AI removes background
          format: "png", // Preserve transparency
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });

        fs.unlinkSync(resizedImagePath);
      } catch (error) {
        console.error("Error processing image", error);
        throw new Error("Error resizing or uploading image to Cloudinary.");
      }
    }
  }

  return imagesLinks;
};


// const uploadImages = async (images) => {
//   console.log("IMAGES:", images);

//   if (!Array.isArray(images)) {
//     throw new Error("Images should be an array of URLs, file paths, or Base64 strings.");
//   }

//   const imagesLinks = [];
//   const allowedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tiff'];

//   for (let i = 0; i < images.length; i++) {
//     let imagePath = images[i];

//     // Check if the image is a Base64 string
//     if (imagePath.startsWith("data:image")) {
//       const base64Data = imagePath.split(",")[1]; // Extract the Base64 part
//       const buffer = Buffer.from(base64Data, "base64"); // Decode Base64 to buffer

//       try {
//         // Resize the image using Sharp
//         const resizedImagePath = `uploads/resized-${Date.now()}-${i}.jpeg`;
//         await sharp(buffer)
//           .resize(2600, 3400) 
//           .jpeg({ quality: 90 }) 
//           .toFile(resizedImagePath);

//         // Upload the resized image to Cloudinary
//         const result = await cloudinary.uploader.upload(resizedImagePath, {
//           folder: "products",
//         });

//         imagesLinks.push({
//           public_id: result.public_id,
//           url: result.secure_url,
//         });

//         // Delete the local resized file
//         fs.unlinkSync(resizedImagePath);
//       } catch (error) {
//         console.error("Error processing Base64 image", error);
//         throw new Error("Error resizing or uploading Base64 image to Cloudinary.");
//       }
//     } else {
//       // Handle regular URLs or file paths
//       const fileExtension = path.extname(imagePath).toLowerCase();
//       if (!allowedFormats.includes(fileExtension)) {
//         throw new Error(`Unsupported file format: ${fileExtension}`);
//       }

//       try {
//         const resizedImagePath = `uploads/resized-${Date.now()}-${i}.jpeg`;
//         await sharp(imagePath)
//           .resize(800, 800)
//           .jpeg({ quality: 90 })
//           .toFile(resizedImagePath);

//         const result = await cloudinary.uploader.upload(resizedImagePath, {
//           folder: "products",
//         });

//         imagesLinks.push({
//           public_id: result.public_id,
//           url: result.secure_url,
//         });

//         fs.unlinkSync(resizedImagePath);
//       } catch (error) {
//         console.error("Error processing image", error);
//         throw new Error("Error resizing or uploading image to Cloudinary.");
//       }
//     }
//   }

//   return imagesLinks;
// };


// // Function to upload images to cloudinary
// const uploadImages = async (images) => {
//   console.log(" Upload Images function", images)
//   if (!Array.isArray(images)) {
//     throw new Error("Images should be an array of URLs or file paths.");
//   }

//   const imagesLinks = [];
//   for (let i = 0; i < images.length; i++) {
//     const imagePath = images[i]; // Expecting images[i] to be a string URL or file path
//     if (typeof imagePath !== 'string') {
//       throw new Error("Each image should be a URL or file path string.");
//     }

//     try {
//       const result = await cloudinary.uploader.upload(imagePath, {
//         folder: "products",
//       });
//       imagesLinks.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     } catch (uploadError) {
//       console.error('ERROR_UPLOADING_IMAGE', uploadError);
//       throw new Error('Error uploading image to Cloudinary.');
//     }
//   }
//   return imagesLinks;
// };

// Get all products of a store
const getVendorAllProducts = catchAsyncErrors(async (req, res) => {
  try {
    const vendorId = req.params.vendorId;

    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      return res.status(400).json({ message: "Invalid vendor ID" });
    }

    const products = await Product.find({vendorId}); 

    if (products.length === 0) {
      return res.status(200).json({ success: true, products: [] }); 
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

// Delete product
const deleteProduct = catchAsyncErrors(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    console.log("PRODUCT:", product);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: "Product not found" });
  }
});

// Update product
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, originalPrice, discountPrice, stock, brand, mainCategory, subCategory, subSubCategory } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      stock,
      originalPrice,
      discountPrice,
      brand,
      mainCategory,
      subCategory,
      subSubCategory,
    }, { new: true });
      console.log("UPDATED Product:", updatedProduct)
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// Get all products
const getAllProducts = catchAsyncErrors(async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Get a single product by ID
const getProductById = catchAsyncErrors(async (req, res) => {
  console.log("ID:", req.params.id)
  try {
    const product = await Product.findById(req.params.id)
      .populate({
        path: 'mainCategory',
        select: 'name'
      });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Fetch products by subSubCategorySlug
const getProductsBySubSubCategory = catchAsyncErrors(async (req, res) => {
  const { subSubCategory } = req.query;

  try {
    const products = await Product.find({ subSubCategory: new RegExp(`^${subSubCategory}$`, 'i') });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found in this sub-subcategory." });
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching products." });
  }
});

// // Create product review
// const createProductReview = catchAsyncErrors(async (req, res) => {
//   console.log("req.body:", req.body);
//   const { user, rating, comment, productId } = req.body;

//   if (!rating) {
//     return res.status(400).json({ message: "Rating is required" });
//   }

//   const product = await Product.findById(productId);
//   if (!product) {
//     product = await Sale.findById(productId); // Check in SaleProduct
//   }
// console.log("product:", product)
//   if (product) {
//     // Ensure reviews is initialized as an array if it's undefined
//     if (!Array.isArray(product.reviews)) {
//       product.reviews = [];
//     }
//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user._id.toString() === user._id
//       // (r) => console.log("ReEVIEWS ID:", r.user._id)
//     );

//     if (alreadyReviewed) {
//       return res.status(400).json({ message: "Product already reviewed" });
//     }

//     const review = {
//       user,
//       rating: Number(rating),
//       comment,
//       productId,
//     };

//     product.reviews.push(review);
//     product.numReviews = product.reviews.length;

//     // Calculate average rating
//     product.rating =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       product.reviews.length;

//     await product.save();
//     return res
//       .status(201)
//       .json({ success: true, message: "Product reviewed successfully" });
//   } else {
//     return res.status(404).json({ message: "Product not found" });
//   }
// });

const createProductReview = catchAsyncErrors(async (req, res) => {
  const { user, rating, comment, productId } = req.body;

  if (!rating) {
    return res.status(400).json({ message: "Rating is required" });
  }

  // Find the product in either Product or SaleProduct collection
  let product = await Product.findById(productId);
  if (!product) {
    product = await Sale.findById(productId); // Check in SaleProduct
  }
  if (product) {
    if (!Array.isArray(product.reviews)) {
      product.reviews = [];
    }
    
    const alreadyReviewed = product.reviews.find(
      (r) => r.user._id.toString() === user._id
    );
    
    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }
    
    const review = {
      user,
      rating: Number(rating),
      comment,
      productId,
    };
    
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    
    // Calculate average rating
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    console.log("product in backend:", product)

    await product.save();
    return res
      .status(201)
      .json({ success: true, message: "Product reviewed successfully" });
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
});

module.exports = {
  createProduct,
  getVendorAllProducts,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  createProductReview,
  getProductsBySubSubCategory,
};


