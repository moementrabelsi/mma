const fs = require('fs');
const path = require('path');

// Database file paths
const DATA_DIR = path.join(__dirname, '../../data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');

// Initialize data files if they don't exist
const ensureDataFiles = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Initialize products.json if it doesn't exist
  if (!fs.existsSync(PRODUCTS_FILE)) {
    const initialData = {
      categories: [],
      subCategories: [],
      products: []
    };
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(initialData, null, 2));
  }

  // Initialize admins.json if it doesn't exist
  if (!fs.existsSync(ADMINS_FILE)) {
    const initialAdmins = {
      admins: []
    };
    fs.writeFileSync(ADMINS_FILE, JSON.stringify(initialAdmins, null, 2));
  }
};

// Read data from file
const readData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    throw error;
  }
};

// Write data to file
const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    throw error;
  }
};

// Database operations
const db = {
  // Products data
  getProductsData: () => readData(PRODUCTS_FILE),
  saveProductsData: (data) => writeData(PRODUCTS_FILE, data),

  // Admins data
  getAdminsData: () => readData(ADMINS_FILE),
  saveAdminsData: (data) => writeData(ADMINS_FILE, data),

  // Initialize
  init: () => {
    ensureDataFiles();
    console.log('✅ Database files initialized');
  }
};

// Initialize on module load
db.init();

module.exports = db;



