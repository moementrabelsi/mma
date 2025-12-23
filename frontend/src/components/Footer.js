import React from 'react';
import { Link } from 'react-router-dom';
import { FaSeedling, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import logo from '../assets/mma-removebg-preview.png';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-section">
        <Link to="/" className="logo">
          <img src={logo} alt="MMA Logo" className="logo-image" />
        </Link>
          <p className="footer-description">
            Votre partenaire de confiance en agriculture moderne. Produits de qualité pour une agriculture durable.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Liens rapides</h4>
          <ul className="footer-links">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/catalog">Catalogue de produits</Link></li>
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Produits</h4>
          <ul className="footer-links">
            <li><Link to="/catalog?category=seeds">Graines et plantation</Link></li>
            <li><Link to="/catalog?category=fertilizers">Engrais</Link></li>
            <li><Link to="/catalog?category=equipment">Équipement</Link></li>
            <li><Link to="/catalog?category=pesticides">Pesticides</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Informations de contact</h4>
          <ul className="footer-contact">
            <li>
              <FaEnvelope /> info@mma.com
            </li>
            <li>
              <FaPhone /> +1 (555) 123-4567
            </li>
            <li>
              <FaMapMarkerAlt /> 123 Farm Road, Agriculture City
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} MMA Agriculture. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

