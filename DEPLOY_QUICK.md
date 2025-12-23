# ⚡ Déploiement Rapide sur Vercel

## 🎯 Option Simple : Frontend sur Vercel + Backend sur Railway

### 1. Frontend sur Vercel (5 minutes)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer le frontend
cd frontend
vercel
```

**Ou via l'interface web :**
1. Allez sur https://vercel.com
2. "Add New Project"
3. Importez votre repo GitHub
4. **Root Directory** : `frontend`
5. **Framework** : Create React App
6. Déployez !

### 2. Backend sur Railway (5 minutes)

1. Allez sur https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Sélectionnez votre repo
4. Ajoutez une base PostgreSQL
5. Configurez les variables d'env :
   ```
   DB_HOST=${{Postgres.PGHOST}}
   DB_PORT=${{Postgres.PGPORT}}
   DB_NAME=${{Postgres.PGDATABASE}}
   DB_USER=${{Postgres.PGUSER}}
   DB_PASSWORD=${{Postgres.PGPASSWORD}}
   JWT_SECRET=changez-moi-en-production
   CORS_ORIGIN=https://votre-frontend.vercel.app
   ```

### 3. Connecter Frontend → Backend

Dans Vercel Dashboard → Settings → Environment Variables :
```
REACT_APP_API_URL=https://votre-backend.railway.app/api
```

Redéployez le frontend.

## ✅ C'est tout !

Votre site est maintenant en ligne ! 🎉

