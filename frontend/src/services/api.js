import axios from 'axios';

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
  const response = await api.get('/categories');
  // Handle new API format { success: true, data: ... }
  return response.data.data !== undefined ? response.data.data : response.data;
};

export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/${id}`);
  // Handle new API format { success: true, data: ... }
  return response.data.data !== undefined ? response.data.data : response.data;
};

// Subcategories
export const getSubcategories = async (categoryId = null) => {
  const response = await api.get('/subcategories', {
    params: categoryId ? { categoryId } : {},
  });
  // Handle new API format { success: true, data: ... }
  return response.data.data !== undefined ? response.data.data : response.data;
};

export const getSubcategoryById = async (id) => {
  const response = await api.get(`/subcategories/${id}`);
  // Handle new API format { success: true, data: ... }
  return response.data.data !== undefined ? response.data.data : response.data;
};

// Products
export const getProducts = async (filters = {}) => {
  const response = await api.get('/products', {
    params: filters,
  });
  // Handle both old format (array) and new format (object with products and pagination)
  if (Array.isArray(response.data)) {
    return { products: response.data, pagination: {} };
  }
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  // Handle new API format { success: true, data: ... }
  return response.data.data !== undefined ? response.data.data : response.data;
};

// Filters
export const getProductTypes = async () => {
  try {
    const response = await api.get('/filters/types');
    // Handle new API format
    return response.data.data !== undefined ? response.data.data : response.data;
  } catch (error) {
    // Fallback to new endpoint
    const response = await api.get('/products/types');
    return response.data.data !== undefined ? response.data.data : response.data;
  }
};

export const getProductUsages = async () => {
  try {
    const response = await api.get('/filters/usages');
    // Handle new API format
    return response.data.data !== undefined ? response.data.data : response.data;
  } catch (error) {
    // Fallback to new endpoint
    const response = await api.get('/products/usages');
    return response.data.data !== undefined ? response.data.data : response.data;
  }
};

export default api;

