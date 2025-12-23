/**
 * Script to check database connection and count rows
 * Run with: node src/scripts/checkDatabase.js
 */

require('dotenv').config();
const { query, pool } = require('../config/db');

const checkDatabase = async () => {
  try {
    console.log('🔍 Checking database connection and data...\n');
    
    // Test connection
    await query('SELECT 1');
    console.log('✅ Database connection successful\n');
    
    // Check database name
    const dbResult = await query('SELECT current_database()');
    console.log(`📊 Connected to database: ${dbResult.rows[0].current_database}\n`);
    
    // Count rows in each table
    console.log('📈 Row counts:');
    console.log('─'.repeat(50));
    
    const tables = ['categories', 'subcategories', 'products', 'admins'];
    
    for (const table of tables) {
      try {
        const result = await query(`SELECT COUNT(*) as count FROM ${table}`);
        const count = parseInt(result.rows[0].count);
        console.log(`  ${table.padEnd(20)} : ${count} row(s)`);
      } catch (error) {
        console.log(`  ${table.padEnd(20)} : ❌ Table does not exist`);
      }
    }
    
    console.log('─'.repeat(50));
    
    // Show sample products
    const productsResult = await query('SELECT id, name, category FROM products LIMIT 5');
    if (productsResult.rows.length > 0) {
      console.log('\n📦 Sample products:');
      productsResult.rows.forEach((row, index) => {
        console.log(`  ${index + 1}. ${row.name} (ID: ${row.id.substring(0, 8)}...) - Category: ${row.category}`);
      });
    } else {
      console.log('\n⚠️  No products found in database');
    }
    
    console.log('\n✅ Check completed');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.message.includes('password authentication')) {
      console.error('⚠️  Check your database credentials in .env file');
    } else if (error.message.includes('does not exist')) {
      console.error('⚠️  Database does not exist. Create it with: CREATE DATABASE mma_agriculture;');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('⚠️  Cannot connect to PostgreSQL. Make sure it is running.');
    }
    process.exit(1);
  } finally {
    await pool.end();
  }
};

checkDatabase();



