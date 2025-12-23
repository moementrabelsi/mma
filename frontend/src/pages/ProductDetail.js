import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getCategoryById, getSubcategoryById } from '../services/api';
import ProductImageGallery from '../components/ProductImageGallery';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const productData = await getProductById(productId);
        // Handle new API format { success: true, data: ... }
        const product = productData.data !== undefined ? productData.data : productData;
        
        if (!product) {
          setError('Produit introuvable');
          return;
        }
        
        setProduct(product);
        
        // Try to fetch category and subcategory, but don't fail if they don't exist (for static products)
        try {
          const categoryData = await getCategoryById(product.category);
          // Handle new API format
          const cat = categoryData.data !== undefined ? categoryData.data : categoryData;
          if (cat) {
            setCategory(cat);
          }
        } catch (error) {
          console.warn('Category not found:', error);
          // Continue without category for static products
        }
        
        try {
          const subcategoryData = await getSubcategoryById(product.subCategory);
          // Handle new API format
          const subcat = subcategoryData.data !== undefined ? subcategoryData.data : subcategoryData;
          if (subcat) {
            setSubcategory(subcat);
          }
        } catch (error) {
          console.warn('Subcategory not found:', error);
          // Continue without subcategory for static products
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Échec du chargement des détails du produit. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

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

  if (!product) {
    return (
      <div className="container">
        <div className="error-message">Produit introuvable</div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
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
          {subcategory && (
            <>
              <Link to={`/subcategories/${subcategory.id}`}>{subcategory.name}</Link>
              <span className="breadcrumb-separator">/</span>
            </>
          )}
          <span className="breadcrumb-current">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <section className="product-detail-section section">
        <div className="container">
          <div className="product-detail-grid">
            {/* Product Image Gallery */}
            <div className="product-detail-image">
              <ProductImageGallery 
                images={product.images || product.image} 
                productName={product.name}
              />
              {product.inStock ? (
                <span className="product-status in-stock">En stock</span>
              ) : (
                <span className="product-status out-of-stock">Rupture de stock</span>
              )}
            </div>

            {/* Product Info */}
            <div className="product-detail-info">
              <h1 className="product-detail-title">{product.name}</h1>
              
              <div className="product-price-section">
                <span className="product-detail-price">{product.price.toFixed(2)}€</span>
              </div>

              <div className="product-meta">
                {category ? (
                  <div className="product-meta-item">
                    <span className="meta-label">Catégorie :</span>
                    <Link to={`/categories/${category.id}`} className="meta-value">{category.name}</Link>
                  </div>
                ) : (
                  <div className="product-meta-item">
                    <span className="meta-label">Catégorie :</span>
                    <span className="meta-value">{product.category}</span>
                  </div>
                )}
                {subcategory ? (
                  <div className="product-meta-item">
                    <span className="meta-label">Sous-catégorie :</span>
                    <Link to={`/subcategories/${subcategory.id}`} className="meta-value">{subcategory.name}</Link>
                  </div>
                ) : (
                  <div className="product-meta-item">
                    <span className="meta-label">Sous-catégorie :</span>
                    <span className="meta-value">{product.subCategory}</span>
                  </div>
                )}
              </div>

              <div className="product-description-section">
                <h2>Description</h2>
                <p>{product.description}</p>
              </div>

              {product.attributes && Object.keys(product.attributes).length > 0 && (
                <div className="product-attributes-section">
                  <h2>Spécifications</h2>
                  <div className="attributes-list">
                    {Object.entries(product.attributes).map(([key, value]) => (
                      <div key={key} className="attribute-item">
                        <span className="attribute-label">{key}</span>
                        <span className="attribute-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="product-actions">
                <button className="btn btn-primary btn-large" disabled={!product.inStock}>
                  {product.inStock ? 'Contacter pour achat' : 'Rupture de stock'}
                </button>
                <Link to="/contact" className="btn btn-secondary btn-large">
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>

          {/* Back to Catalog */}
          <div className="back-to-catalog">
            <Link to="/catalog" className="back-link">
              ← Retour au catalogue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;

