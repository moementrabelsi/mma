const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const authController = require('../controllers/authController');

// Login
router.post('/login', authController.login);

// Get current user (protected)
router.get('/me', authenticateToken, authController.getMe);

module.exports = router;



