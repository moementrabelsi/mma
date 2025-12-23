const productService = require('../services/productService');
const categoryService = require('../services/categoryService');
const subCategoryService = require('../services/subCategoryService');

// ========== PRODUCTS ==========

// Create product
const createProduct = async (req, res, next) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Update product
const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.update(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    if (error.message === 'Product not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

// Delete product
const deleteProduct = async (req, res, next) => {
  try {
    await productService.delete(req.params.id);
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    if (error.message === 'Product not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

// ========== CATEGORIES ==========

// Create category
const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// Update category
const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.update(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Category updated successfully',
      data: category
    });
  } catch (error) {
    if (error.message === 'Category not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

// Delete category
const deleteCategory = async (req, res, next) => {
  try {
    await categoryService.delete(req.params.id);
    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    if (error.message === 'Category not found' || error.message.includes('Cannot delete')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

// ========== SUBCATEGORIES ==========

// Create subcategory
const createSubcategory = async (req, res, next) => {
  try {
    const subcategory = await subCategoryService.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Subcategory created successfully',
      data: subcategory
    });
  } catch (error) {
    if (error.message === 'Category not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

// Update subcategory
const updateSubcategory = async (req, res, next) => {
  try {
    const subcategory = await subCategoryService.update(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Subcategory updated successfully',
      data: subcategory
    });
  } catch (error) {
    if (error.message === 'Subcategory not found' || error.message === 'Category not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

// Delete subcategory
const deleteSubcategory = async (req, res, next) => {
  try {
    await subCategoryService.delete(req.params.id);
    res.json({
      success: true,
      message: 'Subcategory deleted successfully'
    });
  } catch (error) {
    if (error.message === 'Subcategory not found' || error.message.includes('Cannot delete')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

module.exports = {
  // Products
  createProduct,
  updateProduct,
  deleteProduct,
  // Categories
  createCategory,
  updateCategory,
  deleteCategory,
  // Subcategories
  createSubcategory,
  updateSubcategory,
  deleteSubcategory
};

