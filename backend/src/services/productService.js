const { query } = require('../config/db');
const Product = require('../models/Product');
const { v4: uuidv4 } = require('uuid');
const staticProducts = require('../config/staticProducts');

class ProductService {
  // Get all products with optional filters
  async getAll(filters = {}) {
    try {
      let whereConditions = [];
      let queryParams = [];
      let paramIndex = 1;

      // Build WHERE clause
      if (filters.category) {
        whereConditions.push(`category = $${paramIndex}`);
        queryParams.push(filters.category);
        paramIndex++;
      }

      if (filters.subCategory) {
        whereConditions.push(`sub_category = $${paramIndex}`);
        queryParams.push(filters.subCategory);
        paramIndex++;
      }

      if (filters.type) {
        whereConditions.push(`attributes->>'type' = $${paramIndex}`);
        queryParams.push(filters.type);
        paramIndex++;
      }

      if (filters.usage) {
        whereConditions.push(`attributes->>'usage' = $${paramIndex}`);
        queryParams.push(filters.usage);
        paramIndex++;
      }

      if (filters.search) {
        whereConditions.push(`(LOWER(name) LIKE $${paramIndex} OR LOWER(description) LIKE $${paramIndex + 1})`);
        const searchTerm = `%${filters.search.toLowerCase()}%`;
        queryParams.push(searchTerm, searchTerm);
        paramIndex += 2;
      }

      // Price filter
      if (filters.minPrice !== undefined && filters.minPrice !== null && filters.minPrice !== '') {
        whereConditions.push(`price >= $${paramIndex}`);
        queryParams.push(parseFloat(filters.minPrice));
        paramIndex++;
      }

      if (filters.maxPrice !== undefined && filters.maxPrice !== null && filters.maxPrice !== '') {
        whereConditions.push(`price <= $${paramIndex}`);
        queryParams.push(parseFloat(filters.maxPrice));
        paramIndex++;
      }

      const whereClause = whereConditions.length > 0 
        ? `WHERE ${whereConditions.join(' AND ')}`
        : '';

      // Pagination
      const page = parseInt(filters.page) || 1;
      const limit = parseInt(filters.limit) || 10;
      const offset = (page - 1) * limit;

      // Get ALL products from database (without pagination, we'll paginate after combining with static)
      const result = await query(
        `SELECT * FROM products ${whereClause} ORDER BY name`,
        queryParams
      );

      const dbProducts = result.rows.map(row => {
        // Check if attributes contain images array
        const attributes = row.attributes || {};
        const images = attributes.images || (row.image ? [row.image] : []);
        
        return {
          id: row.id,
          name: row.name,
          category: row.category,
          subCategory: row.sub_category,
          description: row.description,
          image: row.image,
          images: images,
          price: parseFloat(row.price),
          inStock: row.in_stock,
          attributes: attributes,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          isStatic: false
        };
      });

      // Get static products and apply filters
      let filteredStaticProducts = [...staticProducts];

      // Apply filters to static products
      if (filters.category) {
        filteredStaticProducts = filteredStaticProducts.filter(p => p.category === filters.category);
      }
      if (filters.subCategory) {
        filteredStaticProducts = filteredStaticProducts.filter(p => p.subCategory === filters.subCategory);
      }
      if (filters.type) {
        filteredStaticProducts = filteredStaticProducts.filter(p => p.attributes?.type === filters.type);
      }
      if (filters.usage) {
        filteredStaticProducts = filteredStaticProducts.filter(p => p.attributes?.usage === filters.usage);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredStaticProducts = filteredStaticProducts.filter(p => 
          p.name.toLowerCase().includes(searchLower) || 
          p.description.toLowerCase().includes(searchLower)
        );
      }
      if (filters.minPrice !== undefined && filters.minPrice !== null && filters.minPrice !== '') {
        filteredStaticProducts = filteredStaticProducts.filter(p => p.price >= parseFloat(filters.minPrice));
      }
      if (filters.maxPrice !== undefined && filters.maxPrice !== null && filters.maxPrice !== '') {
        filteredStaticProducts = filteredStaticProducts.filter(p => p.price <= parseFloat(filters.maxPrice));
      }

      // Combine database products with static products
      const allProducts = [...dbProducts, ...filteredStaticProducts];

      // Sort products based on sortBy filter
      if (filters.sortBy === 'price-asc') {
        allProducts.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'price-desc') {
        allProducts.sort((a, b) => b.price - a.price);
      } else {
        // Default: sort by name
        allProducts.sort((a, b) => a.name.localeCompare(b.name));
      }

      // Calculate total count including static products
      const totalProductsWithStatic = allProducts.length;

      // Apply pagination to combined results
      const paginatedProducts = allProducts.slice(offset, offset + limit);

      return {
        products: paginatedProducts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalProductsWithStatic / limit),
          totalProducts: totalProductsWithStatic,
          limit: limit,
          hasNextPage: offset + limit < totalProductsWithStatic,
          hasPrevPage: page > 1
        }
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Get product by ID
  async getById(id) {
    try {
      // First check static products
      const staticProduct = staticProducts.find(p => p.id === id);
      if (staticProduct) {
        return {
          id: staticProduct.id,
          name: staticProduct.name,
          category: staticProduct.category,
          subCategory: staticProduct.subCategory,
          description: staticProduct.description,
          image: staticProduct.image,
          images: staticProduct.images || (staticProduct.image ? [staticProduct.image] : []),
          price: staticProduct.price,
          inStock: staticProduct.inStock,
          attributes: staticProduct.attributes || {},
          createdAt: staticProduct.createdAt,
          updatedAt: staticProduct.updatedAt,
          isStatic: true
        };
      }

      // If not found in static products, check database
      const result = await query('SELECT * FROM products WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return null;
      }
      const row = result.rows[0];
      const attributes = row.attributes || {};
      const images = attributes.images || (row.image ? [row.image] : []);
      
      return {
        id: row.id,
        name: row.name,
        category: row.category,
        subCategory: row.sub_category,
        description: row.description,
        image: row.image,
        images: images,
        price: parseFloat(row.price),
        inStock: row.in_stock,
        attributes: attributes,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        isStatic: false
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Create product
  async create(productData) {
    try {
      const product = new Product({
        ...productData,
        id: productData.id || uuidv4()
      });

      product.validate();

      await query(
        `INSERT INTO products (id, name, category, sub_category, description, image, price, in_stock, attributes, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          product.id,
          product.name,
          product.category,
          product.subCategory,
          product.description,
          product.image,
          product.price,
          product.inStock,
          JSON.stringify(product.attributes || {}),
          product.createdAt,
          product.updatedAt
        ]
      );

      return product.toJSON();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Update product
  async update(id, updateData) {
    try {
      const existing = await this.getById(id);
      if (!existing) {
        throw new Error('Product not found');
      }

      const product = new Product({
        ...existing,
        ...updateData,
        id: existing.id,
        updatedAt: new Date().toISOString()
      });

      product.validate();

      await query(
        `UPDATE products 
         SET name = $1, category = $2, sub_category = $3, description = $4, 
             image = $5, price = $6, in_stock = $7, attributes = $8, updated_at = $9
         WHERE id = $10`,
        [
          product.name,
          product.category,
          product.subCategory,
          product.description,
          product.image,
          product.price,
          product.inStock,
          JSON.stringify(product.attributes || {}),
          product.updatedAt,
          product.id
        ]
      );

      return product.toJSON();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Delete product
  async delete(id) {
    try {
      const result = await query('DELETE FROM products WHERE id = $1', [id]);
      
      if (result.rowCount === 0) {
        throw new Error('Product not found');
      }

      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Get product types (unique values from attributes.type)
  async getTypes() {
    try {
      const result = await query(
        `SELECT DISTINCT attributes->>'type' as type 
         FROM products 
         WHERE attributes->>'type' IS NOT NULL AND attributes->>'type' != ''
         ORDER BY type`
      );
      return result.rows.map(row => row.type).filter(Boolean);
    } catch (error) {
      console.error('Error fetching product types:', error);
      throw error;
    }
  }

  // Get product usages (unique values from attributes.usage)
  async getUsages() {
    try {
      const result = await query(
        `SELECT DISTINCT attributes->>'usage' as usage 
         FROM products 
         WHERE attributes->>'usage' IS NOT NULL AND attributes->>'usage' != ''
         ORDER BY usage`
      );
      return result.rows.map(row => row.usage).filter(Boolean);
    } catch (error) {
      console.error('Error fetching product usages:', error);
      throw error;
    }
  }
}

module.exports = new ProductService();
