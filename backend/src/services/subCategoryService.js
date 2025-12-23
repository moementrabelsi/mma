const { query } = require('../config/db');
const SubCategory = require('../models/SubCategory');
const { v4: uuidv4 } = require('uuid');

class SubCategoryService {
  // Get all subcategories
  async getAll(categoryId = null) {
    try {
      let result;
      if (categoryId) {
        result = await query(
          'SELECT * FROM subcategories WHERE category_id = $1 ORDER BY name',
          [categoryId]
        );
      } else {
        result = await query('SELECT * FROM subcategories ORDER BY name');
      }
      
      return result.rows.map(row => ({
        id: row.id,
        name: row.name,
        categoryId: row.category_id,
        description: row.description || '',
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }));
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  }

  // Get subcategory by ID
  async getById(id) {
    try {
      const result = await query('SELECT * FROM subcategories WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return null;
      }
      const row = result.rows[0];
      return {
        id: row.id,
        name: row.name,
        categoryId: row.category_id,
        description: row.description || '',
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };
    } catch (error) {
      console.error('Error fetching subcategory:', error);
      throw error;
    }
  }

  // Create subcategory
  async create(subCategoryData) {
    try {
      // Verify category exists
      const categoryResult = await query('SELECT id FROM categories WHERE id = $1', [subCategoryData.categoryId]);
      if (categoryResult.rows.length === 0) {
        throw new Error('Category not found');
      }

      const subCategory = new SubCategory({
        ...subCategoryData,
        id: subCategoryData.id || uuidv4()
      });

      subCategory.validate();

      await query(
        `INSERT INTO subcategories (id, name, category_id, description, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          subCategory.id,
          subCategory.name,
          subCategory.categoryId,
          subCategory.description || '',
          subCategory.createdAt,
          subCategory.updatedAt
        ]
      );

      return subCategory.toJSON();
    } catch (error) {
      console.error('Error creating subcategory:', error);
      throw error;
    }
  }

  // Update subcategory
  async update(id, updateData) {
    try {
      const existing = await this.getById(id);
      if (!existing) {
        throw new Error('Subcategory not found');
      }

      // If categoryId is being updated, verify it exists
      if (updateData.categoryId) {
        const categoryResult = await query('SELECT id FROM categories WHERE id = $1', [updateData.categoryId]);
        if (categoryResult.rows.length === 0) {
          throw new Error('Category not found');
        }
      }

      const subCategory = new SubCategory({
        ...existing,
        ...updateData,
        id: existing.id,
        updatedAt: new Date().toISOString()
      });

      subCategory.validate();

      await query(
        `UPDATE subcategories 
         SET name = $1, category_id = $2, description = $3, updated_at = $4
         WHERE id = $5`,
        [
          subCategory.name,
          subCategory.categoryId,
          subCategory.description || '',
          subCategory.updatedAt,
          subCategory.id
        ]
      );

      return subCategory.toJSON();
    } catch (error) {
      console.error('Error updating subcategory:', error);
      throw error;
    }
  }

  // Delete subcategory
  async delete(id) {
    try {
      // Check if subcategory is used by products
      const productsResult = await query(
        'SELECT COUNT(*) FROM products WHERE sub_category = $1',
        [id]
      );
      
      if (parseInt(productsResult.rows[0].count) > 0) {
        throw new Error(`Cannot delete subcategory: ${productsResult.rows[0].count} product(s) are using it`);
      }

      const result = await query('DELETE FROM subcategories WHERE id = $1', [id]);
      
      if (result.rowCount === 0) {
        throw new Error('Subcategory not found');
      }

      return true;
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      throw error;
    }
  }
}

module.exports = new SubCategoryService();
