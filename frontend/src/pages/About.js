import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaStar, FaHandshake, FaLightbulb } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="container">
          <div className="about-hero-content">
            <h1 className="page-title">À propos de MMS agricole</h1>
            <p className="page-subtitle">
              Cultiver l'excellence en agriculture moderne depuis 1995
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-image">
              <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800" alt="Our Mission" />
            </div>
            <div className="mission-content">
              <h2 className="section-title">Notre mission</h2>
              <p>
                Chez MMS agricole, nous nous consacrons à fournir aux agriculteurs et aux professionnels 
                agricoles des produits de la plus haute qualité et des solutions innovantes pour des pratiques 
                agricoles durables.
              </p>
              <p>
                Nous croyons en l'autonomisation de la communauté agricole grâce à des produits supérieurs, 
                des conseils d'experts et un engagement inébranlable envers la gestion environnementale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section values-section">
        <div className="container">
          <h2 className="section-title">Nos valeurs fondamentales</h2>
          <p className="section-description">
            Les principes qui guident tout ce que nous faisons
          </p>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FaLeaf />
              </div>
              <h3>Durabilité</h3>
              <p>
                Engagés envers des produits et pratiques écologiques qui protègent notre planète pour 
                les générations futures.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FaStar />
              </div>
              <h3>Excellence de qualité</h3>
              <p>
                Uniquement les meilleurs produits qui répondent à des normes de qualité rigoureuses et offrent 
                des résultats exceptionnels.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FaHandshake />
              </div>
              <h3>Partenariat client</h3>
              <p>
                Construire des relations durables avec nos clients grâce à la confiance, le soutien et 
                le succès partagé.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FaLightbulb />
              </div>
              <h3>Innovation</h3>
              <p>
                Faire progresser continuellement les solutions agricoles grâce à la recherche et à la technologie 
                de pointe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2 className="section-title">Notre histoire</h2>
              <p>
                Fondée en 1995, MMS agricole a commencé avec une vision simple : fournir 
                aux agriculteurs un accès à des produits agricoles de qualité supérieure qui donnent de vrais résultats.
              </p>
              <p>
                Au cours des trois dernières décennies, nous sommes passés d'un petit fournisseur local à un partenaire 
                de confiance pour des milliers d'agriculteurs de la région. Notre succès repose sur 
                un engagement inébranlable envers la qualité, l'innovation et le service client.
              </p>
              <p>
                Aujourd'hui, nous offrons une gamme complète de produits comprenant des graines de qualité supérieure, des engrais 
                biologiques, des équipements modernes et des solutions efficaces de protection des cultures. Chaque produit 
                de notre catalogue est soigneusement sélectionné et testé pour garantir qu'il répond à nos normes élevées.
              </p>
            </div>
            <div className="story-image">
              <img src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800" alt="Our Story" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">28+</div>
              <div className="stat-label">Années d'excellence</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Clients satisfaits</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Produits de qualité</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Satisfaction client</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à devenir notre partenaire ?</h2>
            <p>Découvrez comment MMS peut aider votre ferme à prospérer</p>
            <div className="cta-buttons">
              <Link to="/catalog" className="btn btn-primary btn-large">
                Parcourir les produits
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-large">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

