const { query } = require('../config/db');
const Category = require('../models/Category');
const { v4: uuidv4 } = require('uuid');

class CategoryService {
  // Get all categories
  async getAll() {
    try {
      const result = await query('SELECT * FROM categories ORDER BY name');
      return result.rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description || '',
        image: row.image || '',
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Get category by ID
  async getById(id) {
    try {
      const result = await query('SELECT * FROM categories WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return null;
      }
      const row = result.rows[0];
      return {
        id: row.id,
        name: row.name,
        description: row.description || '',
        image: row.image || '',
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  }

  // Create category
  async create(categoryData) {
    try {
      const category = new Category({
        ...categoryData,
        id: categoryData.id || uuidv4()
      });

      category.validate();

      await query(
        `INSERT INTO categories (id, name, description, image, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          category.id,
          category.name,
          category.description || '',
          category.image || '',
          category.createdAt,
          category.updatedAt
        ]
      );

      return category.toJSON();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  // Update category
  async update(id, updateData) {
    try {
      const existing = await this.getById(id);
      if (!existing) {
        throw new Error('Category not found');
      }

      const category = new Category({
        ...existing,
        ...updateData,
        id: existing.id,
        updatedAt: new Date().toISOString()
      });

      category.validate();

      await query(
        `UPDATE categories 
         SET name = $1, description = $2, image = $3, updated_at = $4
         WHERE id = $5`,
        [
          category.name,
          category.description || '',
          category.image || '',
          category.updatedAt,
          category.id
        ]
      );

      return category.toJSON();
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  // Delete category
  async delete(id) {
    try {
      // Check if category is used by products
      const productsResult = await query(
        'SELECT COUNT(*) FROM products WHERE category = $1',
        [id]
      );
      
      if (parseInt(productsResult.rows[0].count) > 0) {
        throw new Error(`Cannot delete category: ${productsResult.rows[0].count} product(s) are using it`);
      }

      const result = await query('DELETE FROM categories WHERE id = $1', [id]);
      
      if (result.rowCount === 0) {
        throw new Error('Category not found');
      }

      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
}

module.exports = new CategoryService();
