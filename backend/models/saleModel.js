// const mongoose = require("mongoose");

// const reviewSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.Mixed }, 
//   rating: { type: Number, required: true },
//   comment: { type: String, required: true },
//   productId: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const eventSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     slug: { type: String, required: false, unique: true },

//     description: { type: String, required: true },
//     mainCategory: { type: String, required: true },
//     subCategory: { type: String, required: true },
//     subSubCategory: { type: String, required: true },
//     brand: { type: String, required: false },
//     originalPrice: { type: Number, required: false },
//     discountPrice: { type: Number, required: true },
//     saleStart: { type: Date },
//     saleEnd: { type: Date },
//     stock: { type: Number, required: true },
//     vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },

//     isFeatured: { type: Boolean, default: false },
//     images: [{ url: { type: String, required: true } }],
//     attributes: { type: Map, of: String },
//     reviews: [reviewSchema], 
//     numReviews: { type: Number, default: 0 }, 
//     rating: { type: Number, default: 0 }, 
//   },
//   { timestamps: true }
// );


// module.exports = mongoose.model("Event", eventSchema);


const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.Mixed },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  productId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const saleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: false, unique: true },
    description: { type: String, required: true },
    mainCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    subSubCategory: { type: String, required: true },
    brand: { type: String, required: false },
    originalPrice: { type: Number, required: false },
    discountPrice: { type: Number, required: true },
    saleStart: { type: Date },
    saleEnd: { type: Date },
    stock: { type: Number, required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    isFeatured: { type: Boolean, default: false },
    images: [{ url: { type: String, required: true } }],
    attributes: { type: Map, of: String },
    reviews: [reviewSchema],
    numReviews: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
