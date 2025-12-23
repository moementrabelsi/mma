const authService = require('./services/authService');

// Initialize default admin on startup
const initialize = async () => {
  try {
    await authService.initializeDefaultAdmin();
  } catch (error) {
    console.error('Error initializing default admin:', error);
  }
};

module.exports = initialize;



