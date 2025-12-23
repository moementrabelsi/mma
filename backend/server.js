const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load product data
const dataPath = path.join(__dirname, 'data', 'products.json');
let productData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// API Routes

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'Agriculture Company API is running!' });
});

// Get all categories
app.get('/api/categories', (req, res) => {
  res.json(productData.categories);
});

// Get category by ID
app.get('/api/categories/:id', (req, res) => {
  const category = productData.categories.find(c => c.id === req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

// Get all subcategories
app.get('/api/subcategories', (req, res) => {
  const { categoryId } = req.query;
  let subcategories = productData.subCategories;
  
  if (categoryId) {
    subcategories = subcategories.filter(sc => sc.categoryId === categoryId);
  }
  
  res.json(subcategories);
});

// Get subcategory by ID
app.get('/api/subcategories/:id', (req, res) => {
  const subcategory = productData.subCategories.find(sc => sc.id === req.params.id);
  if (subcategory) {
    res.json(subcategory);
  } else {
    res.status(404).json({ message: 'Subcategory not found' });
  }
});

// Get all products with advanced filtering and search
app.get('/api/products', (req, res) => {
  const { category, subCategory, search, type, usage, inStock, page, limit } = req.query;
  let products = [...productData.products];

  // Filter by category
  if (category) {
    products = products.filter(p => p.category === category);
  }

  // Filter by subcategory
  if (subCategory) {
    products = products.filter(p => p.subCategory === subCategory);
  }

  // Search by name or description
  if (search) {
    const searchLower = search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower)
    );
  }

  // Filter by type attribute
  if (type) {
    products = products.filter(p => 
      p.attributes && p.attributes.type && 
      p.attributes.type.toLowerCase() === type.toLowerCase()
    );
  }

  // Filter by usage attribute
  if (usage) {
    products = products.filter(p => 
      p.attributes && p.attributes.usage && 
      p.attributes.usage.toLowerCase().includes(usage.toLowerCase())
    );
  }

  // Filter by stock status
  if (inStock !== undefined) {
    const stockStatus = inStock === 'true';
    products = products.filter(p => p.inStock === stockStatus);
  }

  // Pagination
  const totalProducts = products.length;
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;
  const paginatedProducts = products.slice(startIndex, endIndex);

  // Return paginated results with metadata
  res.json({
    products: paginatedProducts,
    pagination: {
      currentPage: pageNumber,
      totalPages: Math.ceil(totalProducts / limitNumber),
      totalProducts: totalProducts,
      limit: limitNumber,
      hasNextPage: endIndex < totalProducts,
      hasPrevPage: pageNumber > 1
    }
  });
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const product = productData.products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Get product types (for filter dropdown)
app.get('/api/filters/types', (req, res) => {
  const types = [...new Set(
    productData.products
      .filter(p => p.attributes && p.attributes.type)
      .map(p => p.attributes.type)
  )];
  res.json(types);
});

// Get product usage options (for filter dropdown)
app.get('/api/filters/usages', (req, res) => {
  const usages = [...new Set(
    productData.products
      .filter(p => p.attributes && p.attributes.usage)
      .map(p => p.attributes.usage)
  )];
  res.json(usages);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 Agriculture API Server running on http://localhost:${PORT}`);
  console.log(`📦 Loaded ${productData.products.length} products`);
  console.log(`📁 ${productData.categories.length} categories`);
  console.log(`📂 ${productData.subCategories.length} subcategories`);
});

