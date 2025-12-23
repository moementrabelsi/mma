const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

// Categories
router.get('/categories', publicController.getCategories);
router.get('/categories/:id', publicController.getCategoryById);

// Subcategories
router.get('/subcategories', publicController.getSubcategories);
router.get('/subcategories/:id', publicController.getSubcategoryById);

// Products
router.get('/products', publicController.getProducts);
router.get('/products/:id', publicController.getProductById);

// Product filters (legacy endpoints for compatibility)
router.get('/filters/types', publicController.getProductTypes);
router.get('/filters/usages', publicController.getProductUsages);
// New endpoints
router.get('/products/types', publicController.getProductTypes);
router.get('/products/usages', publicController.getProductUsages);

module.exports = router;

