import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-page">
      {/* Page Header */}
      <div className="contact-header">
        <div className="container">
          <h1 className="page-title">Contactez-nous</h1>
          <p className="page-subtitle">
            Entrez en contact avec notre équipe - nous sommes là pour vous aider
          </p>
        </div>
      </div>

      <section className="contact-content section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>Entrez en contact</h2>
              <p className="contact-intro">
                Vous avez des questions sur nos produits ou services ? Nous serions ravis de vous entendre. 
                Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-detail-content">
                    <h3>Email</h3>
                    <a href="mailto:info@mma.com">info@mma.com</a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <FaPhone />
                  </div>
                  <div className="contact-detail-content">
                    <h3>Téléphone</h3>
                    <a href="tel:+15551234567">+1 (555) 123-4567</a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-detail-content">
                    <h3>Adresse</h3>
                    <p>123 Farm Road<br />Agriculture City, AC 12345</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <FaClock />
                  </div>
                  <div className="contact-detail-content">
                    <h3>Heures d'ouverture</h3>
                    <p>Lundi - Vendredi : 8h00 - 18h00<br />Samedi : 9h00 - 16h00<br />Dimanche : Fermé</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>Envoyez-nous un message</h2>
              
              {submitted && (
                <div className="success-message">
                  Merci pour votre message ! Nous vous répondrons bientôt.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Nom complet *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Jean Dupont"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Adresse email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jean@exemple.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Numéro de téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Sujet *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Demande de renseignements"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Dites-nous comment nous pouvons vous aider..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184132576123!2d-73.98811768459398!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation MMA Agriculture"
            className="map-iframe"
          ></iframe>
          <div className="map-overlay-info">
            <div className="map-info-card">
              <h3>Visitez notre emplacement</h3>
              <p>123 Farm Road<br />Agriculture City, AC 12345</p>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=123+Farm+Road+Agriculture+City+AC+12345" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary btn-small"
              >
                Obtenir les directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

