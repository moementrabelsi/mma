/**
 * Script to clear ALL data from database (products, subcategories, categories)
 * Run with: node src/scripts/clearAllData.js
 * 
 * WARNING: This will delete all data!
 */

require('dotenv').config();
const { query, pool } = require('../config/db');

const clearAllData = async () => {
  try {
    console.log('🗑️  Clearing ALL data from database...\n');
    console.log('⚠️  WARNING: This will delete all products, subcategories, and categories!\n');
    
    // Count before deletion
    const productsCount = await query('SELECT COUNT(*) as count FROM products');
    const subcategoriesCount = await query('SELECT COUNT(*) as count FROM subcategories');
    const categoriesCount = await query('SELECT COUNT(*) as count FROM categories');
    
    console.log('📊 Data before deletion:');
    console.log(`   Products: ${productsCount.rows[0].count}`);
    console.log(`   Subcategories: ${subcategoriesCount.rows[0].count}`);
    console.log(`   Categories: ${categoriesCount.rows[0].count}\n`);
    
    // Delete in correct order (products first, then subcategories, then categories)
    const productsResult = await query('DELETE FROM products');
    console.log(`✅ Deleted ${productsResult.rowCount} product(s)`);
    
    const subcategoriesResult = await query('DELETE FROM subcategories');
    console.log(`✅ Deleted ${subcategoriesResult.rowCount} subcategorie(s)`);
    
    const categoriesResult = await query('DELETE FROM categories');
    console.log(`✅ Deleted ${categoriesResult.rowCount} categorie(s)\n`);
    
    // Count after deletion
    const afterProducts = await query('SELECT COUNT(*) as count FROM products');
    const afterSubcategories = await query('SELECT COUNT(*) as count FROM subcategories');
    const afterCategories = await query('SELECT COUNT(*) as count FROM categories');
    
    console.log('📊 Data after deletion:');
    console.log(`   Products: ${afterProducts.rows[0].count}`);
    console.log(`   Subcategories: ${afterSubcategories.rows[0].count}`);
    console.log(`   Categories: ${afterCategories.rows[0].count}`);
    
    console.log('\n✅ All data cleared successfully');
    console.log('ℹ️  Note: Data will NOT be re-migrated automatically on next server restart');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

clearAllData();



