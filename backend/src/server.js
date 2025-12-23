const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize default admin
const initialize = require('./init');
const { initDatabase, migrateData } = require('./config/initDatabase');

// Import routes
const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

// Import error handler
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Export for Vercel serverless functions
module.exports = app;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api', (req, res) => {
  res.json({ 
    message: 'MMA Agriculture API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

// Start server
app.listen(PORT, async () => {
  try {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
    
    // Initialize database
    await initDatabase();
    await migrateData();
    
    // Initialize default admin
    await initialize();
    
    console.log('✅ Backend fully initialized');
  } catch (error) {
    console.error('❌ Error during initialization:', error);
    console.error('⚠️  Server started but some features may not work correctly');
  }
});

module.exports = app;

