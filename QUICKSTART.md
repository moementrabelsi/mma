# 🚀 Quick Start Guide

## One-Minute Setup

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 3: Start Backend Server
```bash
cd ../backend
npm run dev
```
✅ Backend running at `http://localhost:5000`

### Step 4: Start Frontend (in a new terminal)
```bash
cd frontend
npm start
```
✅ Frontend running at `http://localhost:3000`

## 🎯 Test the Application

1. **Home Page** - `http://localhost:3000/`
   - View hero section, features, and category cards
   - Click on any category to explore

2. **Catalog Page** - `http://localhost:3000/catalog`
   - Browse all 24 products
   - Try the search bar (e.g., "tomato", "organic")
   - Use filters:
     - Category dropdown
     - Subcategory dropdown
     - Type filter
     - Usage filter
   - Filters work together!

3. **Product Details**
   - Click any product to see full details
   - View price, description, specifications
   - Check stock status

4. **Categories & Subcategories**
   - Navigate through category hierarchy
   - Categories → Subcategories → Products

5. **About Page** - `http://localhost:3000/about`
   - Company mission, values, and story

6. **Contact Page** - `http://localhost:3000/contact`
   - Contact form and information

## 🔍 API Testing

Test the backend API directly:

```bash
# Get all categories
curl http://localhost:5000/api/categories

# Get all products
curl http://localhost:5000/api/products

# Search products
curl "http://localhost:5000/api/products?search=tomato"

# Filter by category
curl "http://localhost:5000/api/products?category=seeds"

# Multiple filters
curl "http://localhost:5000/api/products?category=seeds&type=Organic"
```

## 📱 Responsive Testing

The website is fully responsive! Test on:
- Desktop (1920px+)
- Laptop (1024px-1920px)
- Tablet (768px-1024px)
- Mobile (320px-768px)

## 🎨 Theme Colors

- **Primary Green**: #4CAF50
- **Primary Green Dark**: #388E3C
- **Accent Orange**: #FF9800
- **Accent Orange Dark**: #F57C00
- **White Background**: #FFFFFF

## 📦 Sample Data

The backend includes:
- 4 Categories (Seeds, Fertilizers, Equipment, Pesticides)
- 12 Subcategories
- 24 Products with images, prices, and attributes

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Backend (default 5000)
# Change PORT in backend/.env

# Frontend (default 3000)
# Will automatically ask to use different port
```

**CORS errors?**
- Make sure backend is running on port 5000
- Check `proxy` in frontend/package.json

**Module not found?**
- Run `npm install` in both frontend and backend directories

## ✨ Features to Explore

1. ✅ **Search** - Real-time product search
2. ✅ **Filters** - Multiple filters working together
3. ✅ **Categories** - Three-level navigation (Category → Subcategory → Product)
4. ✅ **Responsive** - Mobile-friendly design
5. ✅ **Clean UI** - Modern agriculture theme
6. ✅ **Stock Status** - In-stock/out-of-stock badges
7. ✅ **Breadcrumbs** - Easy navigation
8. ✅ **Smooth Animations** - Hover effects and transitions

## 🚀 Production Build

### Frontend Production Build
```bash
cd frontend
npm run build
```
Creates optimized production build in `frontend/build/`

### Backend Production
```bash
cd backend
npm start
```
Runs without nodemon for production

---

Enjoy exploring GreenHarvest Agriculture! 🌱



