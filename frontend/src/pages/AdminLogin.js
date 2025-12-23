import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUser } from 'react-icons/fa';
import './AdminLogin.css';

const USE_STATIC_DATA = !process.env.REACT_APP_API_URL || process.env.REACT_APP_USE_STATIC === 'true';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If using static data, show message that admin panel requires backend
  if (USE_STATIC_DATA) {
    return (
      <div className="admin-login-page">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h1>Panel Admin</h1>
              <p>Non disponible en mode statique</p>
            </div>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <p>Le panel d'administration nécessite un backend pour fonctionner.</p>
              <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
                Pour activer le panel admin, configurez REACT_APP_API_URL avec l'URL de votre backend.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erreur de connexion' }));
        setError(errorData.message || `Erreur ${response.status}: ${response.statusText}`);
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.success) {
        // Store token and user info
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Échec de la connexion');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError('Impossible de se connecter au serveur. Vérifiez que le backend est démarré sur http://localhost:5000');
      } else {
        setError('Erreur de connexion au serveur: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Connexion Admin</h1>
            <p>Tableau de bord MMA Agriculture</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">
                <FaUser className="input-icon" />
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="admin"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FaLock className="input-icon" />
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-large"
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="login-footer">
            <p>Identifiants par défaut: admin / admin123</p>
            <p style={{ marginTop: '8px', fontSize: '0.75rem', color: '#999' }}>
              Assurez-vous que le backend est démarré sur le port 5000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
