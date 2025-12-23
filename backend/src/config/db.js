const { Pool } = require('pg');

// Create PostgreSQL connection pool
// Support for connection string (Vercel Postgres, Supabase, etc.)
const getPoolConfig = () => {
  // If connection string is provided (Vercel Postgres, Supabase, etc.)
  if (process.env.DATABASE_URL || process.env.POSTGRES_URL) {
    return {
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    };
  }

  // Fallback to individual connection parameters
  return {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'mma_agriculture',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };
};

const pool = new Pool(getPoolConfig());

// Test connection on first query
let isConnected = false;

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  // Don't exit in production, just log the error
  if (process.env.NODE_ENV === 'development') {
    console.error('⚠️  Make sure PostgreSQL is running and configured correctly');
  }
});

// Helper function to execute queries
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    
    // Log connection on first successful query
    if (!isConnected) {
      console.log('✅ Connected to PostgreSQL database');
      isConnected = true;
    }
    
    // Only log slow queries in development
    if (process.env.NODE_ENV === 'development' && duration > 100) {
      console.log('Executed query', { text: text.substring(0, 100), duration, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.error('Database query error:', error.message);
    throw error;
  }
};

// Helper function to get a client from the pool
const getClient = async () => {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;
  
  // Set a timeout of 5 seconds
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!');
  }, 5000);
  
  // Monkey patch the query method to log the query
  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };
  
  client.release = () => {
    clearTimeout(timeout);
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  
  return client;
};

module.exports = {
  pool,
  query,
  getClient
};
