/**
 * Script to clear all products from database
 * Run with: node src/scripts/clearProducts.js
 */

require('dotenv').config();
const { query, pool } = require('../config/db');

const clearProducts = async () => {
  try {
    console.log('🗑️  Clearing all products from database...\n');
    
    // Count before deletion
    const beforeCount = await query('SELECT COUNT(*) as count FROM products');
    console.log(`📊 Products before deletion: ${beforeCount.rows[0].count}`);
    
    // Delete all products
    const result = await query('DELETE FROM products');
    console.log(`✅ Deleted ${result.rowCount} product(s)\n`);
    
    // Count after deletion
    const afterCount = await query('SELECT COUNT(*) as count FROM products');
    console.log(`📊 Products after deletion: ${afterCount.rows[0].count}`);
    
    console.log('\n✅ Products cleared successfully');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

clearProducts();



