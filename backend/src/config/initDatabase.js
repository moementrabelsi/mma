const { query, pool } = require('./db');
const fs = require('fs');
const path = require('path');

// Initialize database schema
const initDatabase = async () => {
  try {
    console.log('📦 Initializing database schema...');
    
    // Test connection first
    await query('SELECT 1');
    
    // Read and execute schema SQL
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Split SQL into individual statements
    // Handle multi-line statements and comments
    const statements = schemaSQL
      .split(/;\s*\n/)
      .map(s => s.trim())
      .filter(s => {
        // Remove empty lines and comments
        const cleaned = s.replace(/--.*$/gm, '').trim();
        return cleaned.length > 0 && !cleaned.startsWith('--');
      });
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await query(statement);
        } catch (error) {
          // Ignore "already exists" errors
          if (!error.message.includes('already exists') && 
              !error.message.includes('duplicate') &&
              !error.message.includes('does not exist')) {
            console.warn('Schema statement warning:', error.message.substring(0, 100));
          }
        }
      }
    }
    
    console.log('✅ Database schema initialized');
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    if (error.message.includes('password authentication')) {
      console.error('⚠️  Check your database credentials in .env file');
    } else if (error.message.includes('does not exist')) {
      console.error('⚠️  Database does not exist. Create it with: CREATE DATABASE mma_agriculture;');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('⚠️  Cannot connect to PostgreSQL. Make sure it is running.');
    }
    throw error;
  }
};

// Migrate data from JSON to database
const migrateData = async () => {
  try {
    console.log('🔄 Migrating data from JSON to database...');
    
    const dataPath = path.join(__dirname, '../../data/products.json');
    if (!fs.existsSync(dataPath)) {
      console.log('⚠️  No products.json found, skipping migration');
      return;
    }
    
    const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // Check if data already exists (only migrate if completely empty)
    const categoryCount = await query('SELECT COUNT(*) FROM categories');
    const productCount = await query('SELECT COUNT(*) FROM products');
    
    if (parseInt(categoryCount.rows[0].count) > 0 || parseInt(productCount.rows[0].count) > 0) {
      console.log('✅ Data already exists in database, skipping migration...');
      console.log(`   Categories: ${categoryCount.rows[0].count}, Products: ${productCount.rows[0].count}`);
      return;
    }
    
    // Migrate categories
    if (jsonData.categories && jsonData.categories.length > 0) {
      for (const category of jsonData.categories) {
        await query(
          `INSERT INTO categories (id, name, description, image, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (id) DO NOTHING`,
          [
            category.id,
            category.name,
            category.description || '',
            category.image || '',
            category.createdAt || new Date().toISOString(),
            category.updatedAt || new Date().toISOString()
          ]
        );
      }
      console.log(`✅ Migrated ${jsonData.categories.length} categories`);
    }
    
    // Migrate subcategories
    if (jsonData.subCategories && jsonData.subCategories.length > 0) {
      for (const subcat of jsonData.subCategories) {
        await query(
          `INSERT INTO subcategories (id, name, category_id, description, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (id) DO NOTHING`,
          [
            subcat.id,
            subcat.name,
            subcat.categoryId,
            subcat.description || '',
            subcat.createdAt || new Date().toISOString(),
            subcat.updatedAt || new Date().toISOString()
          ]
        );
      }
      console.log(`✅ Migrated ${jsonData.subCategories.length} subcategories`);
    }
    
    // Migrate products
    if (jsonData.products && jsonData.products.length > 0) {
      for (const product of jsonData.products) {
        await query(
          `INSERT INTO products (id, name, category, sub_category, description, image, price, in_stock, attributes, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           ON CONFLICT (id) DO NOTHING`,
          [
            product.id,
            product.name,
            product.category,
            product.subCategory,
            product.description,
            product.image,
            product.price || 0,
            product.inStock !== undefined ? product.inStock : true,
            JSON.stringify(product.attributes || {}),
            product.createdAt || new Date().toISOString(),
            product.updatedAt || new Date().toISOString()
          ]
        );
      }
      console.log(`✅ Migrated ${jsonData.products.length} products`);
    }
    
    console.log('✅ Data migration completed');
  } catch (error) {
    console.error('❌ Error migrating data:', error.message);
    throw error;
  }
};

module.exports = {
  initDatabase,
  migrateData
};
