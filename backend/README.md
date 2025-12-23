# MMA Agriculture Backend API

Backend API for MMA Agriculture Company Website built with Node.js and Express.js.

## Features

### Public API
- ✅ Fetch categories
- ✅ Fetch sub-categories
- ✅ Fetch products with pagination
- ✅ Search products
- ✅ Filter products (by category, subcategory, type, usage)

### Admin API (Protected)
- ✅ Admin login with JWT authentication
- ✅ CRUD operations for products
- ✅ CRUD operations for categories
- ✅ CRUD operations for sub-categories
- ✅ Secure protected routes

## Project Structure

```
backend/
├── src/
│   ├── server.js              # Main server file
│   ├── config/
│   │   ├── config.js          # Configuration
│   │   └── database.js        # Database operations
│   ├── middleware/
│   │   ├── auth.js            # Authentication middleware
│   │   └── errorHandler.js    # Error handling
│   ├── controllers/
│   │   ├── publicController.js
│   │   ├── adminController.js
│   │   └── authController.js
│   ├── routes/
│   │   ├── public.js          # Public routes
│   │   ├── admin.js           # Admin routes (protected)
│   │   └── auth.js            # Authentication routes
│   ├── services/
│   │   ├── productService.js
│   │   ├── categoryService.js
│   │   ├── subCategoryService.js
│   │   └── authService.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── Category.js
│   │   └── SubCategory.js
│   └── init.js                # Initialize default admin
├── data/
│   ├── products.json          # Products, categories, subcategories data
│   └── admins.json            # Admin users data
├── .env                       # Environment variables
├── .env.example               # Example environment file
└── package.json
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

#### POST `/api/auth/login`
Login as admin.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "username": "admin",
    "isAdmin": true
  }
}
```

#### GET `/api/auth/me`
Get current user info (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

### Public Endpoints

#### GET `/api/categories`
Get all categories.

#### GET `/api/categories/:id`
Get category by ID.

#### GET `/api/subcategories`
Get all subcategories. Optional query: `?categoryId=<id>`

#### GET `/api/subcategories/:id`
Get subcategory by ID.

#### GET `/api/products`
Get all products with filters and pagination.

**Query Parameters:**
- `category` - Filter by category ID
- `subCategory` - Filter by subcategory ID
- `type` - Filter by product type
- `usage` - Filter by product usage
- `search` - Search in name and description
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example:**
```
GET /api/products?category=seeds&search=wheat&page=1&limit=6
```

#### GET `/api/products/:id`
Get product by ID.

#### GET `/api/products/types`
Get all unique product types.

#### GET `/api/products/usages`
Get all unique product usages.

### Admin Endpoints (Protected)

All admin endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

#### Products

- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

#### Categories

- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category

#### Subcategories

- `POST /api/admin/subcategories` - Create subcategory
- `PUT /api/admin/subcategories/:id` - Update subcategory
- `DELETE /api/admin/subcategories/:id` - Delete subcategory

## Default Admin Credentials

On first startup, a default admin is created:
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **IMPORTANT:** Change the default password in production!

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After logging in, include the token in the Authorization header for protected routes:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Database

Currently uses JSON files for data storage. The structure is designed to easily migrate to a database (PostgreSQL, MongoDB, etc.) in the future.

## Security Notes

- Passwords are hashed using bcrypt
- JWT tokens expire after 24 hours (configurable)
- Admin routes are protected with authentication middleware
- CORS is enabled for frontend communication

## Future Enhancements

- [ ] Migrate to PostgreSQL or MongoDB
- [ ] Add input validation middleware
- [ ] Add rate limiting
- [ ] Add request logging
- [ ] Add API documentation (Swagger)
- [ ] Add unit tests
- [ ] Add image upload functionality
