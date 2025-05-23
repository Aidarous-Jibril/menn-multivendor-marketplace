const express = require('express');
const router = express.Router();
const {
    createCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory
} = require('../controllers/mainCategoryController')

// Define routes for main category-related operations
router.post('/create-category', createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
