# 🚀 Guide de Démarrage du Backend - Solution au 404

## Problème: Erreur 404 sur `/api/auth/login`

L'erreur 404 signifie que le backend ne trouve pas la route. Cela arrive généralement quand:
1. L'ancien serveur (`backend/server.js`) est utilisé au lieu du nouveau (`backend/src/server.js`)
2. Le backend n'est pas démarré
3. Le backend est démarré mais avec une erreur

## ✅ Solution Rapide

### Étape 1: Arrêter tous les processus Node
```powershell
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

### Étape 2: Aller dans le dossier backend
```powershell
cd C:\Users\trabe\OneDrive\Documents\GitHub\mma\backend
```

### Étape 3: Démarrer le nouveau serveur
```powershell
node src/server.js
```

Vous devriez voir:
```
🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
✅ Default admin created:
   Username: admin
   Password: admin123
```

### Étape 4: Tester dans le navigateur
Ouvrez: `http://localhost:5000/api`

Vous devriez voir:
```json
{
  "message": "MMA Agriculture API is running!",
  "version": "1.0.0",
  "timestamp": "..."
}
```

## 🔧 Alternative: Utiliser les scripts

### Windows (PowerShell)
```powershell
cd backend
.\START_SERVER.ps1
```

### Windows (CMD)
```cmd
cd backend
START_SERVER.bat
```

### Avec npm
```bash
cd backend
npm run dev
```

## ⚠️ Important

- **Utilisez toujours** `node src/server.js` (le nouveau serveur modulaire)
- **Ne pas utiliser** `node server.js` (l'ancien serveur sans authentification)
- Le nouveau serveur a toutes les routes: `/api/auth/login`, `/api/admin/*`, etc.

## 🐛 Dépannage

### Le port 5000 est déjà utilisé
Modifiez `backend/.env`:
```
PORT=5001
```

Puis mettez à jour `frontend/src/pages/AdminLogin.js`:
```javascript
const response = await fetch('http://localhost:5001/api/auth/login', {
```

### Erreur "Cannot find module"
```bash
cd backend
npm install
```

### Vérifier que le serveur fonctionne
Testez dans le navigateur: `http://localhost:5000/api/auth/login` (devrait retourner une erreur 400, pas 404)

## 📝 Identifiants par défaut

- **Username:** `admin`
- **Password:** `admin123`

⚠️ Changez ces identifiants en production!



