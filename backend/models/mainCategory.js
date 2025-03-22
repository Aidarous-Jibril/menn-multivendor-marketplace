// // models/mainCategory.js
// const mongoose = require("mongoose")

// const mainCategorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   slug: { type: String, required: true, unique: true },
//   imageUrl: { type: String, required: false }, // Add imageUrl field
//   subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }]
// });

// module.exports = mongoose.model('MainCategory', mainCategorySchema);



// models/mainCategory.js
const mongoose = require("mongoose");

const mainCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  imageUrl: { type: String }, // Make imageUrl optional
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }]
});

module.exports = mongoose.model('MainCategory', mainCategorySchema);
