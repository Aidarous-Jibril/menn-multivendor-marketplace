// // models/subSubCategory.js
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const SubSubCategorySchema = new Schema({
//     name: { type: String, required: true },
//     slug: { type: String, required: true, unique: true },
//     imageUrl: { type: String, required: false }, // Add imageUrl field
//     subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true }
// });

// module.exports = mongoose.model('SubSubCategory', SubSubCategorySchema);


// models/subSubCategory.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subSubCategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  imageUrl: { type: String }, // Make imageUrl optional
  subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true }
});

module.exports = mongoose.model('SubSubCategory', subSubCategorySchema);
