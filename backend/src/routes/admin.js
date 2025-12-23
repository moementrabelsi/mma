const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// All admin routes require authentication
router.use(authenticateToken);
router.use(requireAdmin);

// Products CRUD
router.post('/products', adminController.createProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

// Categories CRUD
router.post('/categories', adminController.createCategory);
router.put('/categories/:id', adminController.updateCategory);
router.delete('/categories/:id', adminController.deleteCategory);

// Subcategories CRUD
router.post('/subcategories', adminController.createSubcategory);
router.put('/subcategories/:id', adminController.updateSubcategory);
router.delete('/subcategories/:id', adminController.deleteSubcategory);

module.exports = router;



