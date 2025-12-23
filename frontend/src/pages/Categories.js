import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryById, getSubcategories } from '../services/api';
import { FaBox } from 'react-icons/fa';
import './Categories.css';

const Categories = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [categoryData, subcategoriesData] = await Promise.all([
          getCategoryById(categoryId),
          getSubcategories(categoryId)
        ]);
        
        // Handle new API format { success: true, data: ... }
        const cat = categoryData.data !== undefined ? categoryData.data : categoryData;
        setCategory(cat);
        const subcats = subcategoriesData.data !== undefined ? subcategoriesData.data : subcategoriesData;
        setSubcategories(subcats);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Échec du chargement des données de catégorie. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

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

  if (!category) {
    return (
      <div className="container">
        <div className="error-message">Catégorie introuvable</div>
      </div>
    );
  }

  return (
    <div className="categories-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/">Accueil</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/catalog">Catalogue</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{category.name}</span>
        </div>
      </div>

      {/* Category Header */}
      <section className="category-header">
        <div className="category-header-bg">
          <img src={category.image} alt={category.name} />
          <div className="category-header-overlay"></div>
        </div>
        <div className="container">
          <div className="category-header-content">
            <h1 className="page-title">{category.name}</h1>
            <p className="page-subtitle">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="subcategories-section section">
        <div className="container">
          <h2 className="section-title">Parcourir par sous-catégorie</h2>
          
          {subcategories.length === 0 ? (
            <p className="no-results">Aucune sous-catégorie trouvée dans cette catégorie.</p>
          ) : (
            <div className="subcategories-grid">
              {subcategories.map((subcategory) => (
                <Link
                  to={`/subcategories/${subcategory.id}`}
                  key={subcategory.id}
                  className="subcategory-card"
                >
                  <div className="subcategory-icon">
                    <FaBox />
                  </div>
                  <h3>{subcategory.name}</h3>
                  <p>{subcategory.description}</p>
                  <span className="subcategory-link">
                    Voir les produits →
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* View All Products Button */}
          <div className="view-all-container">
            <Link to={`/catalog?category=${categoryId}`} className="btn btn-primary">
              Voir tous les produits de {category.name}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;

