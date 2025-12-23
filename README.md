# 🌱 GreenHarvest Agriculture Website

A modern, full-stack agriculture company website built with React and Express.js.

## ✨ Features

- **Product Catalog** - Comprehensive product browsing with categories and subcategories
- **Advanced Search** - Search products by name and description
- **Powerful Filters** - Filter by category, subcategory, type, and usage
- **Responsive Design** - Beautiful UI that works on all devices
- **Modern UI/UX** - Clean white theme with green and orange accents
- **RESTful API** - Well-structured backend with Express.js

## 🏗 Project Structure

```
root/
├── backend/          # Express.js API server
│   ├── data/         # JSON data storage
│   ├── server.js     # Main server file
│   └── package.json
│
├── frontend/         # React application
│   ├── public/       # Static files
│   ├── src/
│   │   ├── components/  # Reusable components (Header, Footer)
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service (Axios)
│   │   ├── App.js       # Main app with routing
│   │   └── index.js     # Entry point
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev
```

The API will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## 📡 API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID

### Subcategories
- `GET /api/subcategories` - Get all subcategories
- `GET /api/subcategories?categoryId=:id` - Get subcategories by category

### Products
- `GET /api/products` - Get all products (supports filters)
- `GET /api/products/:id` - Get product by ID

#### Query Parameters for Products
- `category` - Filter by category ID
- `subCategory` - Filter by subcategory ID
- `search` - Search in product name and description
- `type` - Filter by product type
- `usage` - Filter by usage type

### Filters
- `GET /api/filters/types` - Get all product types
- `GET /api/filters/usages` - Get all usage options

## 🎨 Design Theme

- **Primary Color**: Green (#4CAF50)
- **Accent Color**: Orange (#FF9800)
- **Background**: White
- **Style**: Modern, clean, professional agriculture aesthetic

## 📄 Pages

1. **Home** - Hero section, features, category overview
2. **Catalog** - Full product listing with search and filters
3. **Categories** - Category detail with subcategories
4. **Subcategories** - Subcategory products
5. **Product Detail** - Individual product information
6. **About** - Company information and values
7. **Contact** - Contact form and information

## 🛠 Technologies Used

### Frontend
- React 18
- React Router 6
- Axios
- CSS3 (Custom styling)

### Backend
- Node.js
- Express.js
- CORS
- JSON data storage

## 📦 Product Data Model

```javascript
{
  "id": "unique-id",
  "name": "Product Name",
  "category": "category-id",
  "subCategory": "subcategory-id",
  "description": "Product description",
  "price": 99.99,
  "image": "image-url",
  "inStock": true,
  "attributes": {
    "type": "Product type",
    "usage": "Usage information"
  }
}
```

## 🔄 Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication
- Shopping cart functionality
- Order management
- Admin dashboard
- Product reviews and ratings
- Payment integration

## 📝 License

This project is open source and available under the MIT License.

## 👥 Contact

For questions or support, please contact us at info@greenharvest.com

---

Built with ❤️ for modern agriculture



