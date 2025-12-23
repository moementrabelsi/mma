const authService = require('../services/authService');

// Login
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    const result = await authService.login(username, password);
    
    res.json({
      success: true,
      message: 'Login successful',
      ...result
    });
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

// Get current user info
const getMe = (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,
      username: req.user.username,
      isAdmin: req.user.isAdmin
    }
  });
};

module.exports = {
  login,
  getMe
};



