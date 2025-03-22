const express = require('express');
const router = express.Router();
const {
  createProduct,
  getVendorAllProducts,
  deleteProduct,
  getAllProducts,
  createProductReview,
  getProductById,
  getProductsBySubSubCategory,
  updateProduct,
} = require('../controllers/productController');
const multer = require('multer');
const path = require('path');
const { isVendor } = require('../middleware/authMiddleware');

// Configure multer to use memory storage
const storage = multer.memoryStorage();  

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB per file
    fieldSize: 25 * 1024 * 1024, // 25 MB for fields (text, etc.)
    files: 5, // Limit the number of files uploaded to 5
  },
  fileFilter: function (req, file, cb) {
    // You can add file type validation here if needed
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed (jpeg, jpg, png)'));
    }
  }
});


router.get('/:id', getProductById);
router.get('/', async (req, res, next) => {
  console.log("Received query parameters:", req.query);  
  if (req.query.subSubCategory) {
    console.log("subSubCategory found, calling controller");
    return getProductsBySubSubCategory(req, res, next); 
  }
  console.log("No subSubCategory, fetching all products");
  return getAllProducts(req, res, next);  
});


router.get('/:vendorId/products', getVendorAllProducts);
router.post('/create-product',isVendor,  upload.array("images", 5), createProduct); 
router.delete('/:id', isVendor, deleteProduct);
router.put("/update-product/:id", isVendor, updateProduct); 
router.post('/reviews', createProductReview);


module.exports = router;
