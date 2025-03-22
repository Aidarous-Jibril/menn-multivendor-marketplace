const express = require('express');
const router = express.Router();
const { createSale, getAllStoreSales, deleteSale, getAllSales, getSingleSale } = require('../controllers/SaleController');
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } });

// Route for creating an Sale
router.post('/create-Sale', upload.array("images"), createSale);

// Route for fetching all Sales of a store
router.get('/vendor/:id', getAllStoreSales); // Fetch all Sales by store ID

// Route for fetching all Sales
router.get('/', getAllSales);

// Route for fetching a single Sale
router.get('/:id', getSingleSale); // Fetch single Sale by ID

// Route for deleting an Sale
router.delete('/Sale/:id', deleteSale); // Delete Sale by ID

module.exports = router;
