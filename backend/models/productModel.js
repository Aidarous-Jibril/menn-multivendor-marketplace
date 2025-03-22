// // models/productModel.js
// const mongoose = require("mongoose");

// // Define a subdocument schema for the vendor
// const vendorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   avatar: {
//     url: { type: String, required: true }
//   },
//   createdAt: { type: Date, default: Date.now },
//   address: { type: String },
//   phoneNumber: { type: String },
//   email: { type: String },
//   zipCode: { type: String },
//   reviews: [{ 
//     user: { type: mongoose.Schema.Types.Mixed }, 
//     rating: { type: Number },
//     comment: { type: String },
//     productId: { type: String },
//     createdAt: { type: Date, default: Date.now }
//   }],
// });


// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   mainCategory: { type: String, required: true },
//   subCategory: { type: String, required: true },
//   subSubCategory: { type: String, required: true },
//   brand: { type: String, required: false },
//   originalPrice: { type: Number, required: false },
//   discountPrice: { type: Number, required: true },
//   stock: { type: Number, required: true },
//   vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
//   vendor: vendorSchema, 
//   isFeatured: { type: Boolean, default: false },
//   images: [{ url: { type: String, required: true } }], // Change schema to store URLs only
//   attributes: { type: Map, of: String } // Adjust attributes if needed
// }, { timestamps: true });

// module.exports = mongoose.model("Product", productSchema);



const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.Mixed }, 
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  productId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    mainCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    subSubCategory: { type: String, required: true },
    brand: { type: String, required: false },
    originalPrice: { type: Number, required: false },
    discountPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    vendor: {
      name: { type: String, required: true },
      avatar: {
        url: { type: String, required: true }
      },
      createdAt: { type: Date, default: Date.now },
      address: { type: String },
      phoneNumber: { type: String },
      email: { type: String },
      zipCode: { type: String }
    },
    isFeatured: { type: Boolean, default: false },
    images: [{ url: { type: String, required: true } }],
    attributes: { type: Map, of: String },
    reviews: [reviewSchema],
    numReviews: { type: Number, default: 0 }, 
    rating: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
