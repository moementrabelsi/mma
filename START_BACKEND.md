# 🚀 Guide de Démarrage du Backend

## Problème: "Erreur de connexion au serveur"

Cette erreur signifie que le backend n'est pas en cours d'exécution ou n'est pas accessible.

## Solution: Démarrer le Backend

### Option 1: Démarrer manuellement

1. Ouvrez un terminal dans le dossier `backend`
2. Exécutez la commande:
```bash
cd backend
npm run dev
```

Vous devriez voir:
```
🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
✅ Default admin created:
   Username: admin
   Password: admin123
```

### Option 2: Vérifier si le backend est déjà en cours d'exécution

Vérifiez si un processus Node.js écoute sur le port 5000:
```bash
# Windows PowerShell
netstat -ano | findstr :5000

# Ou vérifier les processus Node
Get-Process -Name node -ErrorAction SilentlyContinue
```

### Option 3: Utiliser le script de démarrage

Si vous avez des problèmes, essayez:
```bash
cd backend
node src/server.js
```

## Vérification

Une fois le backend démarré, testez l'API:
```bash
# Dans un navigateur ou avec curl
http://localhost:5000/api
```

Vous devriez voir:
```json
{
  "message": "MMA Agriculture API is running!",
  "version": "1.0.0",
  "timestamp": "..."
}
```

## Port déjà utilisé?

Si le port 5000 est déjà utilisé, modifiez le fichier `backend/.env`:
```
PORT=5001
```

Puis mettez à jour l'URL dans `frontend/src/pages/AdminLogin.js`:
```javascript
const response = await fetch('http://localhost:5001/api/auth/login', {
```

## Identifiants par défaut

- **Username:** `admin`
- **Password:** `admin123`

⚠️ Changez ces identifiants en production!



