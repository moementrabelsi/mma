# 🚀 Guide de Déploiement Vercel

## 📦 Option Recommandée : Frontend Vercel + Backend Railway

### Étape 1 : Déployer le Frontend sur Vercel

#### Via Interface Web (Plus Simple)

1. **Préparer le repository :**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Sur Vercel :**
   - Allez sur https://vercel.com
   - Cliquez sur "Add New Project"
   - Importez votre repository GitHub
   - **Configuration :**
     - **Root Directory** : `frontend`
     - **Framework Preset** : Create React App
     - **Build Command** : `npm run build`
     - **Output Directory** : `build`
     - **Install Command** : `npm install`

3. **Variables d'environnement :**
   Dans Vercel Dashboard → Settings → Environment Variables, ajoutez :
   ```
   REACT_APP_API_URL=https://votre-backend.railway.app/api
   ```
   (Vous ajouterez cette URL après avoir déployé le backend)

4. **Déployez !**
   - Vercel déploiera automatiquement
   - Vous obtiendrez une URL comme : `https://mma-agriculture.vercel.app`

#### Via CLI

```bash
cd frontend
npm i -g vercel
vercel login
vercel
```

### Étape 2 : Déployer le Backend sur Railway

1. **Créer un compte Railway :**
   - Allez sur https://railway.app
   - Connectez-vous avec GitHub

2. **Créer un nouveau projet :**
   - Cliquez sur "New Project"
   - Sélectionnez "Deploy from GitHub repo"
   - Choisissez votre repository
   - **Root Directory** : `backend`

3. **Ajouter une base PostgreSQL :**
   - Dans votre projet Railway, cliquez sur "+ New"
   - Sélectionnez "Database" → "Add PostgreSQL"
   - Railway créera automatiquement une base de données

4. **Configurer les variables d'environnement :**
   Dans Railway → Variables, ajoutez :
   ```
   DB_HOST=${{Postgres.PGHOST}}
   DB_PORT=${{Postgres.PGPORT}}
   DB_NAME=${{Postgres.PGDATABASE}}
   DB_USER=${{Postgres.PGUSER}}
   DB_PASSWORD=${{Postgres.PGPASSWORD}}
   JWT_SECRET=votre-secret-jwt-super-securise-changez-moi
   CORS_ORIGIN=https://votre-frontend.vercel.app
   PORT=5000
   NODE_ENV=production
   ```

5. **Déployer :**
   - Railway détectera automatiquement Node.js
   - Le backend sera déployé et vous obtiendrez une URL comme : `https://mma-backend.railway.app`

6. **Mettre à jour l'URL du frontend :**
   - Retournez sur Vercel
   - Mettez à jour `REACT_APP_API_URL` avec l'URL Railway
   - Redéployez le frontend

### Étape 3 : Initialiser la Base de Données

1. **Se connecter à Railway :**
   - Cliquez sur votre service PostgreSQL
   - Ouvrez "Connect" pour voir les credentials

2. **Exécuter le script de migration :**
   ```bash
   # Localement, avec les credentials Railway
   cd backend
   DB_HOST=votre-host DB_USER=votre-user DB_PASSWORD=votre-password DB_NAME=votre-db npm run migrate
   ```

   Ou utilisez Railway CLI :
   ```bash
   railway run npm run migrate
   ```

## 🔄 Alternative : Tout sur Vercel (Avancé)

Si vous voulez déployer le backend sur Vercel aussi :

1. **Structure nécessaire :**
   ```
   backend/
     api/
       index.js  (point d'entrée serverless)
     src/
       server.js
   ```

2. **Configuration Vercel :**
   - Le fichier `vercel.json` à la racine gère déjà le routing
   - Les routes `/api/*` seront dirigées vers `backend/api/index.js`

3. **Base de données :**
   - Utilisez Vercel Postgres (Storage → Create Database)
   - Ou Supabase (gratuit)

## ✅ Vérification

1. **Frontend :** `https://votre-projet.vercel.app`
2. **Backend API :** `https://votre-backend.railway.app/api`
3. **Test :** Visitez le frontend et vérifiez que les produits se chargent

## 🐛 Dépannage

### CORS Error
- Vérifiez que `CORS_ORIGIN` dans Railway correspond à l'URL Vercel

### Database Connection Error
- Vérifiez les variables d'environnement dans Railway
- Assurez-vous que la migration a été exécutée

### API 404
- Vérifiez que `REACT_APP_API_URL` est correct dans Vercel
- Vérifiez que le backend est bien déployé sur Railway

## 📝 Notes Importantes

- **Backend sur Railway** : Gratuit jusqu'à 500 heures/mois
- **Frontend sur Vercel** : Gratuit, illimité
- **Base de données** : Railway PostgreSQL est gratuit avec limitations
- **Domaine personnalisé** : Possible sur Vercel (gratuit)

