# 🚀 Déploiement sur Vercel

Guide pour déployer le site MMA Agriculture sur Vercel.

## 📋 Prérequis

1. Compte Vercel (gratuit) : https://vercel.com
2. Git repository (GitHub, GitLab, ou Bitbucket)
3. Node.js installé localement

## 🎯 Option 1 : Déploiement Frontend + Backend sur Vercel

### Étape 1 : Préparer le Repository

Assurez-vous que votre code est poussé sur GitHub/GitLab/Bitbucket.

### Étape 2 : Configurer Vercel

1. **Connecter le repository à Vercel :**
   - Allez sur https://vercel.com
   - Cliquez sur "Add New Project"
   - Importez votre repository GitHub

2. **Configuration du projet :**
   - **Root Directory** : `frontend`
   - **Framework Preset** : Create React App
   - **Build Command** : `npm run build`
   - **Output Directory** : `build`
   - **Install Command** : `npm install`

3. **Variables d'environnement :**
   Ajoutez dans Vercel Dashboard → Settings → Environment Variables :
   ```
   REACT_APP_API_URL=/api
   NODE_ENV=production
   ```

### Étape 3 : Configurer le Backend (Vercel Serverless Functions)

Le backend sera déployé comme fonctions serverless Vercel.

**Structure nécessaire :**
```
backend/
  api/
    index.js  (point d'entrée pour Vercel)
  src/
    server.js
    ...
```

### Étape 4 : Variables d'environnement Backend

Dans Vercel Dashboard, ajoutez les variables d'environnement pour le backend :

```
DB_HOST=votre-host-postgres
DB_PORT=5432
DB_NAME=mma_agriculture
DB_USER=votre-user
DB_PASSWORD=votre-password
JWT_SECRET=votre-secret-jwt
CORS_ORIGIN=https://votre-domaine.vercel.app
```

### Étape 5 : Base de données PostgreSQL

Pour la production, utilisez un service PostgreSQL hébergé :
- **Vercel Postgres** (recommandé) : Intégré avec Vercel
- **Supabase** : Gratuit, facile à configurer
- **Railway** : PostgreSQL gratuit
- **Neon** : PostgreSQL serverless

## 🎯 Option 2 : Frontend sur Vercel + Backend séparé (Recommandé)

### Frontend sur Vercel

1. Suivez les étapes 1-2 de l'Option 1
2. Variable d'environnement :
   ```
   REACT_APP_API_URL=https://votre-backend.railway.app/api
   ```

### Backend sur Railway/Render

**Railway (Recommandé) :**
1. Allez sur https://railway.app
2. Créez un nouveau projet
3. Connectez votre repository
4. Sélectionnez le dossier `backend`
5. Railway détecte automatiquement Node.js
6. Ajoutez une base de données PostgreSQL
7. Configurez les variables d'environnement

**Render :**
1. Allez sur https://render.com
2. Créez un nouveau "Web Service"
3. Connectez votre repository
4. Configuration :
   - **Root Directory** : `backend`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Environment** : Node

## 📝 Fichiers de Configuration

### `vercel.json` (racine)
Déjà créé pour gérer le routing frontend/backend.

### `frontend/vercel.json`
Configuration spécifique au frontend React.

### `backend/vercel.json`
Configuration pour les fonctions serverless (si vous utilisez Option 1).

## 🔧 Configuration de la Base de Données

### Avec Vercel Postgres

1. Dans Vercel Dashboard → Storage → Create Database
2. Sélectionnez "Postgres"
3. Vercel créera automatiquement les variables d'environnement :
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - etc.

4. Mettez à jour `backend/src/config/db.js` pour utiliser `POSTGRES_URL` :
```javascript
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});
```

### Avec Supabase

1. Créez un projet sur https://supabase.com
2. Récupérez la connection string
3. Ajoutez dans Vercel :
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   ```

## 🚀 Déploiement

### Méthode 1 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
cd frontend
vercel

# Pour la production
vercel --prod
```

### Méthode 2 : Via GitHub (Recommandé)

1. Poussez votre code sur GitHub
2. Connectez le repository à Vercel
3. Vercel déploiera automatiquement à chaque push

## 📦 Structure Recommandée pour Vercel

```
mma/
├── frontend/          # Déployé sur Vercel
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── backend/           # Déployé séparément (Railway/Render)
│   ├── src/
│   ├── package.json
│   └── ...
└── vercel.json        # Configuration globale (si Option 1)
```

## ⚙️ Variables d'Environnement Frontend

Dans Vercel Dashboard → Settings → Environment Variables :

```
REACT_APP_API_URL=https://votre-backend.railway.app/api
```

## ⚙️ Variables d'Environnement Backend

Sur Railway/Render :

```
DB_HOST=xxx.railway.app
DB_PORT=5432
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=xxx
JWT_SECRET=votre-secret-super-securise
CORS_ORIGIN=https://votre-frontend.vercel.app
PORT=5000
NODE_ENV=production
```

## 🔍 Vérification après Déploiement

1. **Frontend** : Visitez `https://votre-projet.vercel.app`
2. **Backend** : Testez `https://votre-backend.railway.app/api`
3. **API Health** : `https://votre-backend.railway.app/api` devrait retourner un message de succès

## 🐛 Dépannage

### Erreur CORS
- Vérifiez que `CORS_ORIGIN` dans le backend correspond à l'URL du frontend

### Erreur de connexion à la base de données
- Vérifiez les variables d'environnement
- Assurez-vous que la base de données accepte les connexions externes

### Erreur 404 sur les routes API
- Vérifiez que le routing dans `vercel.json` est correct
- Vérifiez que les fonctions serverless sont bien configurées

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)

