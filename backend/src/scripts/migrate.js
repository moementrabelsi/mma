/**
 * Migration script to initialize database and migrate data from JSON
 * Run with: node src/scripts/migrate.js
 */

require('dotenv').config();
const { initDatabase, migrateData } = require('../config/initDatabase');
const { pool } = require('../config/db');

const runMigration = async () => {
  try {
    console.log('🚀 Starting database migration...\n');
    
    // Initialize schema
    await initDatabase();
    
    // Migrate data
    await migrateData();
    
    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

runMigration();



