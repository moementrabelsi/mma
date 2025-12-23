const productService = require('../services/productService');
const categoryService = require('../services/categoryService');
const subCategoryService = require('../services/subCategoryService');

// Get all categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAll();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// Get category by ID
const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.getById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// Get all subcategories
const getSubcategories = async (req, res, next) => {
  try {
    const { categoryId } = req.query;
    const subcategories = await subCategoryService.getAll(categoryId);
    
    res.json({
      success: true,
      data: subcategories
    });
  } catch (error) {
    next(error);
  }
};

// Get subcategory by ID
const getSubcategoryById = async (req, res, next) => {
  try {
    const subcategory = await subCategoryService.getById(req.params.id);
    
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found'
      });
    }

    res.json({
      success: true,
      data: subcategory
    });
  } catch (error) {
    next(error);
  }
};

// Get all products with filters and pagination
const getProducts = async (req, res, next) => {
  try {
    const filters = {
      category: req.query.category,
      subCategory: req.query.subCategory,
      type: req.query.type,
      usage: req.query.usage,
      search: req.query.search,
      page: req.query.page,
      limit: req.query.limit
    };

    const result = await productService.getAll(filters);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
};

// Get product by ID
const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Get product types
const getProductTypes = async (req, res, next) => {
  try {
    const types = await productService.getTypes();
    res.json({
      success: true,
      data: types
    });
  } catch (error) {
    next(error);
  }
};

// Get product usages
const getProductUsages = async (req, res, next) => {
  try {
    const usages = await productService.getUsages();
    res.json({
      success: true,
      data: usages
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  getSubcategories,
  getSubcategoryById,
  getProducts,
  getProductById,
  getProductTypes,
  getProductUsages
};

