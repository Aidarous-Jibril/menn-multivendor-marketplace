const express = require('express');
const router = express.Router();
const {
    createCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory
} = require('../controllers/mainCategoryController')


// Create a new category
router.post('/create-category', createCategory);

// Get all categories
router.get('/', getCategories);

// Get a single category by ID
router.get('/:id', getCategoryById);

// Update a category by ID
router.put('/:id', updateCategory);

// Delete a category by ID
router.delete('/:id', deleteCategory);

module.exports = router;
