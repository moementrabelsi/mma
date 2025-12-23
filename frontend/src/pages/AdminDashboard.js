import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSignOutAlt, FaBox, FaTags, FaFolder, 
  FaPlus, FaEdit, FaTrash, FaSearch 
} from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const apiCall = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          handleLogout();
          throw new Error('Session expirée. Veuillez vous reconnecter.');
        }
        throw new Error(data.message || 'Erreur API');
      }
      return data;
    } catch (error) {
      if (error.message.includes('token') || error.message.includes('401') || error.message.includes('403')) {
        handleLogout();
        throw new Error('Session expirée. Veuillez vous reconnecter.');
      }
      throw error;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Tableau de bord Admin</h1>
            <p>Bienvenue, {adminUser.username}</p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary">
            <FaSignOutAlt /> Déconnexion
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <FaBox /> Produits
        </button>
        <button
          className={`tab-button ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          <FaTags /> Catégories
        </button>
        <button
          className={`tab-button ${activeTab === 'subcategories' ? 'active' : ''}`}
          onClick={() => setActiveTab('subcategories')}
        >
          <FaFolder /> Sous-catégories
        </button>
      </nav>

      {/* Content */}
      <main className="dashboard-content">
        {error && (
          <div className="error-banner">
            {error}
            <button onClick={() => setError('')}>×</button>
          </div>
        )}

        {activeTab === 'products' && (
          <ProductsManager apiCall={apiCall} setError={setError} setLoading={setLoading} loading={loading} />
        )}
        {activeTab === 'categories' && (
          <CategoriesManager apiCall={apiCall} setError={setError} setLoading={setLoading} loading={loading} />
        )}
        {activeTab === 'subcategories' && (
          <SubCategoriesManager apiCall={apiCall} setError={setError} setLoading={setLoading} loading={loading} />
        )}
      </main>
    </div>
  );
};

// Products Manager Component
const ProductsManager = ({ apiCall, setError, setLoading, loading }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    description: '',
    image: '',
    price: '',
    inStock: true,
    attributes: { type: '', usage: '' }
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadSubcategories();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await apiCall('http://localhost:5000/api/products?limit=100');
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await apiCall('http://localhost:5000/api/categories');
      setCategories(data.data || data);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const loadSubcategories = async () => {
    try {
      const data = await apiCall('http://localhost:5000/api/subcategories');
      setSubcategories(data.data || data);
    } catch (err) {
      console.error('Error loading subcategories:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        attributes: {
          type: formData.attributes.type || undefined,
          usage: formData.attributes.usage || undefined
        }
      };

      if (editingProduct) {
        await apiCall(`http://localhost:5000/api/admin/products/${editingProduct.id}`, {
          method: 'PUT',
          body: JSON.stringify(productData),
        });
      } else {
        await apiCall('http://localhost:5000/api/admin/products', {
          method: 'POST',
          body: JSON.stringify(productData),
        });
      }

      await loadProducts();
      setShowForm(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        subCategory: '',
        description: '',
        image: '',
        price: '',
        inStock: true,
        attributes: { type: '', usage: '' }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      subCategory: product.subCategory,
      description: product.description,
      image: product.image,
      price: product.price.toString(),
      inStock: product.inStock,
      attributes: {
        type: product.attributes?.type || '',
        usage: product.attributes?.usage || ''
      }
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

    try {
      setLoading(true);
      await apiCall(`http://localhost:5000/api/admin/products/${id}`, {
        method: 'DELETE',
      });
      await loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manager-section">
      <div className="section-header">
        <h2>Gestion des Produits</h2>
        <button onClick={() => { setShowForm(true); setEditingProduct(null); }} className="btn btn-primary">
          <FaPlus /> Ajouter un produit
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => { setShowForm(false); setEditingProduct(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingProduct ? 'Modifier le produit' : 'Nouveau produit'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nom *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Catégorie *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="">Sélectionner...</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Sous-catégorie *</label>
                  <select
                    value={formData.subCategory}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    required
                  >
                    <option value="">Sélectionner...</option>
                    {subcategories
                      .filter(sc => sc.categoryId === formData.category)
                      .map(sub => (
                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Prix *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image URL *</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>En stock</label>
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows="4"
                  />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <input
                    type="text"
                    value={formData.attributes.type}
                    onChange={(e) => setFormData({
                      ...formData,
                      attributes: { ...formData.attributes, type: e.target.value }
                    })}
                  />
                </div>
                <div className="form-group">
                  <label>Usage</label>
                  <input
                    type="text"
                    value={formData.attributes.usage}
                    onChange={(e) => setFormData({
                      ...formData,
                      attributes: { ...formData.attributes, usage: e.target.value }
                    })}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => { setShowForm(false); setEditingProduct(null); }} className="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {editingProduct ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Rechercher des produits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                  Chargement...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                  Aucun produit trouvé
                </td>
              </tr>
            ) : (
              filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} alt={product.name} className="table-image" />
                  </td>
                  <td>{product.name}</td>
                  <td>{categories.find(c => c.id === product.category)?.name || product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                      {product.inStock ? 'En stock' : 'Rupture'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(product)} className="btn-icon" title="Modifier">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="btn-icon btn-danger" title="Supprimer">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Categories Manager Component
const CategoriesManager = ({ apiCall, setError, setLoading, loading }) => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await apiCall('http://localhost:5000/api/categories');
      setCategories(data.data || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingCategory) {
        await apiCall(`http://localhost:5000/api/admin/categories/${editingCategory.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiCall('http://localhost:5000/api/admin/categories', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      await loadCategories();
      setShowForm(false);
      setEditingCategory(null);
      setFormData({ name: '', description: '', image: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) return;
    try {
      setLoading(true);
      await apiCall(`http://localhost:5000/api/admin/categories/${id}`, {
        method: 'DELETE',
      });
      await loadCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manager-section">
      <div className="section-header">
        <h2>Gestion des Catégories</h2>
        <button onClick={() => { setShowForm(true); setEditingCategory(null); }} className="btn btn-primary">
          <FaPlus /> Ajouter une catégorie
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => { setShowForm(false); setEditingCategory(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => { setShowForm(false); setEditingCategory(null); }} className="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {editingCategory ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>Chargement...</td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>Aucune catégorie</td>
              </tr>
            ) : (
              categories.map(category => (
                <tr key={category.id}>
                  <td>
                    {category.image && <img src={category.image} alt={category.name} className="table-image" />}
                  </td>
                  <td>{category.name}</td>
                  <td>{category.description || '-'}</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(category)} className="btn-icon" title="Modifier">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(category.id)} className="btn-icon btn-danger" title="Supprimer">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// SubCategories Manager Component
const SubCategoriesManager = ({ apiCall, setError, setLoading, loading }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: ''
  });

  useEffect(() => {
    loadSubcategories();
    loadCategories();
  }, []);

  const loadSubcategories = async () => {
    try {
      setLoading(true);
      const data = await apiCall('http://localhost:5000/api/subcategories');
      setSubcategories(data.data || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await apiCall('http://localhost:5000/api/categories');
      setCategories(data.data || data);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingSubcategory) {
        await apiCall(`http://localhost:5000/api/admin/subcategories/${editingSubcategory.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiCall('http://localhost:5000/api/admin/subcategories', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      await loadSubcategories();
      setShowForm(false);
      setEditingSubcategory(null);
      setFormData({ name: '', categoryId: '', description: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (subcategory) => {
    setEditingSubcategory(subcategory);
    setFormData({
      name: subcategory.name,
      categoryId: subcategory.categoryId,
      description: subcategory.description || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?')) return;
    try {
      setLoading(true);
      await apiCall(`http://localhost:5000/api/admin/subcategories/${id}`, {
        method: 'DELETE',
      });
      await loadSubcategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manager-section">
      <div className="section-header">
        <h2>Gestion des Sous-catégories</h2>
        <button onClick={() => { setShowForm(true); setEditingSubcategory(null); }} className="btn btn-primary">
          <FaPlus /> Ajouter une sous-catégorie
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => { setShowForm(false); setEditingSubcategory(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingSubcategory ? 'Modifier la sous-catégorie' : 'Nouvelle sous-catégorie'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Catégorie *</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                >
                  <option value="">Sélectionner...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => { setShowForm(false); setEditingSubcategory(null); }} className="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {editingSubcategory ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>Chargement...</td>
              </tr>
            ) : subcategories.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>Aucune sous-catégorie</td>
              </tr>
            ) : (
              subcategories.map(subcategory => (
                <tr key={subcategory.id}>
                  <td>{subcategory.name}</td>
                  <td>{categories.find(c => c.id === subcategory.categoryId)?.name || subcategory.categoryId}</td>
                  <td>{subcategory.description || '-'}</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(subcategory)} className="btn-icon" title="Modifier">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(subcategory.id)} className="btn-icon btn-danger" title="Supprimer">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

