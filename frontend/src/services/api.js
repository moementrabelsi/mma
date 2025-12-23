import axios from 'axios';
import { 
  categories, 
  subcategories, 
  staticProducts, 
  filterProducts, 
  paginateProducts 
} from '../data/staticData';

// Check if we should use static data (no backend)
// Use static data by default unless REACT_APP_API_URL is explicitly set
const USE_STATIC_DATA = !process.env.REACT_APP_API_URL || process.env.REACT_APP_USE_STATIC === 'true';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add error interceptor for better error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Délai d\'attente de la requête. Veuillez vérifier si le serveur backend est en cours d\'exécution.';
    } else if (error.message === 'Network Error') {
      error.message = 'Impossible de se connecter au serveur. Veuillez vous assurer que le backend est en cours d\'exécution sur http://localhost:5000';
    }
    return Promise.reject(error);
  }
);

// Categories
export const getCategories = async () => {
  if (USE_STATIC_DATA) {
    return Promise.resolve(categories);
  }
  try {
    const response = await api.get('/categories');
    // Handle new API format { success: true, data: ... }
    return response.data.data !== undefined ? response.data.data : response.data;
  } catch (error) {
    // Fallback to static data if API fails
    console.warn('API failed, using static data:', error);
    return categories;
  }
};

export const getCategoryById = async (id) => {
  if (USE_STATIC_DATA) {
    const category = categories.find(c => c.id === id);
    return Promise.resolve(category || null);
  }
  try {
    const response = await api.get(`/categories/${id}`);
    // Handle new API format { success: true, data: ... }
    return response.data.data !== undefined ? response.data.data : response.data;
  } catch (error) {
    // Fallback to static data if API fails
    console.warn('API failed, using static data:', error);
    return categories.find(c => c.id === id) || null;
  }
};

// Subcategories
export const getSubcategories = async (categoryId = null) => {
  if (USE_STATIC_DATA) {
    let result = subcategories;
    if (categoryId) {
      result = subcategories.filter(s => s.category === categoryId);
    }
    return Promise.resolve(result);
  }
  try {
    const response = await api.get('/subcategories', {
      params: categoryId ? { categoryId } : {},
    });
    // Handle new API format { success: true, data: ... }
    return response.data.data !== undefined ? response.data.data : response.data;
  } catch (error) {
    // Fallback to static data if API fails
    console.warn('API failed, using static data:', error);
    let result = subcategories;
    if (categoryId) {
      result = subcategories.filter(s => s.category === categoryId);
    }
    return result;
  }
};

export const getSubcategoryById = async (id) => {
  if (USE_STATIC_DATA) {
    const subcategory = subcategories.find(s => s.id === id);
    return Promise.resolve(subcategory || null);
  }
  try {
    const response = await api.get(`/subcategories/${id}`);
    // Handle new API format { success: true, data: ... }
    return response.data.data !== undefined ? response.data.data : response.data;
  } catch (error) {
    // Fallback to static data if API fails
    console.warn('API failed, using static data:', error);
    return subcategories.find(s => s.id === id) || null;
  }
};

// Products
export const getProducts = async (filters = {}) => {
  if (USE_STATIC_DATA) {
    // Filter products
    let filtered = filterProducts(staticProducts, filters);
    
    // Paginate
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 6;
    const result = paginateProducts(filtered, page, limit);
    
    return Promise.resolve(result);
  }
  try {
    const response = await api.get('/products', {
      params: filters,
    });
    // Handle both old format (array) and new format (object with products and pagination)
    if (Array.isArray(response.data)) {
      return { products: response.data, pagination: {} };
    }
    return response.data;
  } catch (error) {
    // Fallback to static data if API fails
    console.warn('API failed, using static data:', error);
    let filtered = filterProducts(staticProducts, filters);
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 6;
    return paginateProducts(filtered, page, limit);
  }
};

export const getProductById = async (id) => {
  if (USE_STATIC_DATA) {
    const product = staticProducts.find(p => p.id === id);
    return Promise.resolve(product || null);
  }
  try {
    const response = await api.get(`/products/${id}`);
    // Handle new API format { success: true, data: ... }
    return response.data.data !== undefined ? response.data.data : response.data;
  } catch (error) {
    // Fallback to static data if API fails
    console.warn('API failed, using static data:', error);
    return staticProducts.find(p => p.id === id) || null;
  }
};

// Filters
export const getProductTypes = async () => {
  if (USE_STATIC_DATA) {
    const types = [...new Set(staticProducts.map(p => p.attributes?.type).filter(Boolean))];
    return Promise.resolve(types);
  }
  try {
    const response = await api.get('/filters/types');
    // Handle new API format
    return response.data.data !== undefined ? response.data.data : response.data;
  } catch (error) {
    try {
      // Fallback to new endpoint
      const response = await api.get('/products/types');
      return response.data.data !== undefined ? response.data.data : response.data;
    } catch (e) {
      // Fallback to static data
      console.warn('API failed, using static data:', e);
      const types = [...new Set(staticProducts.map(p => p.attributes?.type).filter(Boolean))];
      return types;
    }
  }
};

export const getProductUsages = async () => {
  if (USE_STATIC_DATA) {
    const usages = [...new Set(staticProducts.map(p => p.attributes?.usage).filter(Boolean))];
    return Promise.resolve(usages);
  }
  try {
    const response = await api.get('/filters/usages');
    // Handle new API format
    return response.data.data !== undefined ? response.data.data : response.data;
  } catch (error) {
    try {
      // Fallback to new endpoint
      const response = await api.get('/products/usages');
      return response.data.data !== undefined ? response.data.data : response.data;
    } catch (e) {
      // Fallback to static data
      console.warn('API failed, using static data:', e);
      const usages = [...new Set(staticProducts.map(p => p.attributes?.usage).filter(Boolean))];
      return usages;
    }
  }
};

export default api;

