import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubcategoryById, getCategoryById, getProducts } from '../services/api';
import { FaBox } from 'react-icons/fa';
import './SubCategories.css';

const SubCategories = () => {
  const { subcategoryId } = useParams();
  const [subcategory, setSubcategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const subcategoryData = await getSubcategoryById(subcategoryId);
        // Handle new API format { success: true, data: ... }
        const subcat = subcategoryData.data !== undefined ? subcategoryData.data : subcategoryData;
        setSubcategory(subcat);
        
        const categoryData = await getCategoryById(subcat.categoryId);
        // Handle new API format
        const cat = categoryData.data !== undefined ? categoryData.data : categoryData;
        setCategory(cat);
        
        const response = await getProducts({ subCategory: subcategoryId });
        // Handle both old format (array) and new format (object with products)
        setProducts(Array.isArray(response) ? response : (response.products || []));
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Échec du chargement des données de sous-catégorie. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subcategoryId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!subcategory) {
    return (
      <div className="container">
        <div className="error-message">Sous-catégorie introuvable</div>
      </div>
    );
  }

  return (
    <div className="subcategories-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/">Accueil</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/catalog">Catalogue</Link>
          <span className="breadcrumb-separator">/</span>
          {category && (
            <>
              <Link to={`/categories/${category.id}`}>{category.name}</Link>
              <span className="breadcrumb-separator">/</span>
            </>
          )}
          <span className="breadcrumb-current">{subcategory.name}</span>
        </div>
      </div>

      {/* Subcategory Header */}
      <section className="subcategory-header">
        <div className="container">
          <h1 className="page-title">{subcategory.name}</h1>
          <p className="page-subtitle">{subcategory.description}</p>
          {category && (
            <p className="category-info">
              Catégorie : <Link to={`/categories/${category.id}`}>{category.name}</Link>
            </p>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section section">
        <div className="container">
          <div className="products-header">
            <h2>Produits ({products.length})</h2>
          </div>

          {products.length === 0 ? (
            <div className="no-products">
              <div className="no-products-icon">
                <FaBox />
              </div>
              <h3>Aucun produit trouvé</h3>
              <p>Il n'y a actuellement aucun produit dans cette sous-catégorie.</p>
              <Link to="/catalog" className="btn btn-primary">
                Parcourir tous les produits
              </Link>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="product-card"
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {product.inStock ? (
                      <span className="product-badge in-stock">En stock</span>
                    ) : (
                      <span className="product-badge out-of-stock">Rupture de stock</span>
                    )}
                  </div>
                  <div className="product-content">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">
                      {product.description.substring(0, 80)}...
                    </p>
                    <div className="product-footer">
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <span className="product-link">Voir les détails →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SubCategories;

