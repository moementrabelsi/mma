const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');
const config = require('../config/config');
const { v4: uuidv4 } = require('uuid');

class AuthService {
  // Initialize default admin if no admins exist
  async initializeDefaultAdmin() {
    try {
      const result = await query('SELECT COUNT(*) FROM admins');
      const count = parseInt(result.rows[0].count);
      
      if (count === 0) {
        const hashedPassword = await bcrypt.hash(config.defaultAdminPassword, 10);
        
        await query(
          `INSERT INTO admins (id, username, password, is_admin, created_at)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            uuidv4(),
            config.defaultAdminUsername,
            hashedPassword,
            true,
            new Date().toISOString()
          ]
        );
        
        console.log('✅ Default admin created:');
        console.log(`   Username: ${config.defaultAdminUsername}`);
        console.log(`   Password: ${config.defaultAdminPassword}`);
        console.log('⚠️  Please change the default password in production!');
      }
    } catch (error) {
      console.error('Error initializing default admin:', error);
      throw error;
    }
  }

  // Login
  async login(username, password) {
    try {
      const result = await query('SELECT * FROM admins WHERE username = $1', [username]);
      
      if (result.rows.length === 0) {
        throw new Error('Invalid credentials');
      }

      const admin = result.rows[0];
      const isValidPassword = await bcrypt.compare(password, admin.password);
      
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: admin.id, 
          username: admin.username,
          isAdmin: admin.is_admin 
        },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
      );

      return {
        token,
        user: {
          id: admin.id,
          username: admin.username,
          isAdmin: admin.is_admin
        }
      };
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  // Create admin (for future use)
  async createAdmin(username, password) {
    try {
      // Check if admin already exists
      const existingResult = await query('SELECT id FROM admins WHERE username = $1', [username]);
      if (existingResult.rows.length > 0) {
        throw new Error('Admin already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const result = await query(
        `INSERT INTO admins (id, username, password, is_admin, created_at)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, username, is_admin`,
        [
          uuidv4(),
          username,
          hashedPassword,
          true,
          new Date().toISOString()
        ]
      );

      const admin = result.rows[0];
      return {
        id: admin.id,
        username: admin.username,
        isAdmin: admin.is_admin
      };
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  }

  // Change password
  async changePassword(adminId, oldPassword, newPassword) {
    try {
      const result = await query('SELECT * FROM admins WHERE id = $1', [adminId]);
      
      if (result.rows.length === 0) {
        throw new Error('Admin not found');
      }

      const admin = result.rows[0];
      const isValidPassword = await bcrypt.compare(oldPassword, admin.password);
      
      if (!isValidPassword) {
        throw new Error('Current password is incorrect');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      await query(
        'UPDATE admins SET password = $1, updated_at = $2 WHERE id = $3',
        [hashedPassword, new Date().toISOString(), adminId]
      );

      return true;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }
}

module.exports = new AuthService();
