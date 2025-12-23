# GreenHarvest Frontend

React application for the GreenHarvest Agriculture website.

## Available Scripts

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner.

## Project Structure

```
src/
├── components/
│   ├── Header.js         # Navigation header
│   ├── Header.css
│   ├── Footer.js         # Site footer
│   └── Footer.css
│
├── pages/
│   ├── Home.js           # Landing page
│   ├── Home.css
│   ├── Catalog.js        # Product catalog with filters
│   ├── Catalog.css
│   ├── Categories.js     # Category page
│   ├── Categories.css
│   ├── SubCategories.js  # Subcategory page
│   ├── SubCategories.css
│   ├── ProductDetail.js  # Product details
│   ├── ProductDetail.css
│   ├── About.js          # About page
│   ├── About.css
│   ├── Contact.js        # Contact page
│   └── Contact.css
│
├── services/
│   └── api.js            # API service (Axios)
│
├── App.js                # Main app with routing
├── App.css
├── index.js              # Entry point
└── index.css             # Global styles
```

## Key Features

- React Router for navigation
- Axios for API calls
- Responsive design
- CSS Grid and Flexbox layouts
- Modern UI with animations
- Search and filter functionality

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api`

Configure in `src/services/api.js` or set `REACT_APP_API_URL` environment variable.

## Styling

- Custom CSS (no framework dependencies)
- CSS Variables for theming
- Mobile-first responsive design
- Green and orange color scheme

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)



