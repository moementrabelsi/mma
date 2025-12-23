# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
The `.env` file is already created with default values. For production, update:
- `JWT_SECRET` - Use a strong random string
- `ADMIN_PASSWORD` - Change from default `admin123`

### 3. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 🔐 Default Admin Credentials

On first startup, a default admin is automatically created:
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Change this password in production!**

## 📡 Testing the API

### 1. Test Public Endpoints

**Get all categories:**
```bash
curl http://localhost:5000/api/categories
```

**Get products with filters:**
```bash
curl "http://localhost:5000/api/products?category=seeds&page=1&limit=6"
```

### 2. Test Admin Login

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

This returns a JWT token. Save it for protected routes.

### 3. Test Admin Endpoints

**Create a product (requires token):**
```bash
curl -X POST http://localhost:5000/api/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Test Product",
    "category": "seeds",
    "subCategory": "vegetable-seeds",
    "description": "A test product",
    "image": "https://example.com/image.jpg",
    "price": 29.99,
    "inStock": true
  }'
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── server.js              # Main entry point
│   ├── config/                 # Configuration files
│   ├── middleware/             # Express middleware
│   ├── controllers/            # Request handlers
│   ├── routes/                 # API routes
│   ├── services/               # Business logic
│   ├── models/                 # Data models
│   └── init.js                 # Initialization
├── data/                       # JSON data files
└── package.json
```

## 🔑 API Endpoints Summary

### Public Endpoints
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category by ID
- `GET /api/subcategories` - List subcategories (optional: `?categoryId=id`)
- `GET /api/subcategories/:id` - Get subcategory by ID
- `GET /api/products` - List products (with filters & pagination)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/types` - Get all product types
- `GET /api/products/usages` - Get all product usages

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user (protected)

### Admin Endpoints (Protected)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category
- `POST /api/admin/subcategories` - Create subcategory
- `PUT /api/admin/subcategories/:id` - Update subcategory
- `DELETE /api/admin/subcategories/:id` - Delete subcategory

## 🔒 Authentication

All admin endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📝 Notes

- Data is stored in JSON files (`data/products.json` and `data/admins.json`)
- The structure is designed to easily migrate to a database later
- Passwords are hashed using bcrypt
- JWT tokens expire after 24 hours (configurable in `.env`)



