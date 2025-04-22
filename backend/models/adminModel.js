// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Added admin name
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String }, // Optional phone number
    role: { type: String, default: 'admin' },
    avatar: {
      url: { type: String },
      public_id: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
