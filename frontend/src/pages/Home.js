import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import Carousel from '../components/Carousel';
import { FaSeedling, FaTractor, FaLeaf, FaHandshake } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        // Handle new API format { success: true, data: ... }
        const categoriesArray = data.data !== undefined ? data.data : (Array.isArray(data) ? data : []);
        setCategories(categoriesArray);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="home">
      {/* Carousel Section */}
      <section className="carousel-section">
        <Carousel />
        <div className="carousel-overlay-content">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Bienvenue chez MMA Agriculture</h1>
              <p className="hero-subtitle">
                Votre partenaire de confiance pour des solutions agricoles modernes et durables
              </p>
              <div className="hero-buttons">
                <Link to="/catalog" className="btn btn-primary">
                  Parcourir le catalogue
                </Link>
                <Link to="/about" className="btn btn-secondary">
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <h2 className="section-title">Pourquoi choisir MMA ?</h2>
          <p className="section-description">
            Nous fournissons des produits et solutions agricoles de qualité supérieure pour les agriculteurs modernes
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaSeedling />
              </div>
              <h3>Qualité Premium</h3>
              <p>Uniquement les graines, engrais et équipements de la plus haute qualité pour votre ferme</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaTractor />
              </div>
              <h3>Équipement Moderne</h3>
              <p>Outils et machines agricoles de pointe pour des opérations efficaces</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaLeaf />
              </div>
              <h3>Solutions Durables</h3>
              <p>Produits écologiques qui favorisent des pratiques agricoles durables</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaHandshake />
              </div>
              <h3>Support Expert</h3>
              <p>Conseils professionnels et soutien pour tous vos besoins agricoles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section section">
        <div className="container">
          <h2 className="section-title">Explorez nos catégories de produits</h2>
          <p className="section-description">
            Parcourez notre vaste collection de produits agricoles
          </p>
          
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="categories-grid">
              {categories.map((category) => (
                <Link 
                  to={`/categories/${category.id}`} 
                  key={category.id} 
                  className="category-card"
                >
                  <div className="category-image">
                    <img src={category.image} alt={category.name} />
                    <div className="category-overlay"></div>
                  </div>
                  <div className="category-content">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <span className="category-link-text">
                      Explorer →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à transformer votre ferme ?</h2>
            <p>Découvrez notre gamme complète de solutions agricoles dès aujourd'hui</p>
            <Link to="/catalog" className="btn btn-primary btn-large">
              Voir le catalogue complet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

