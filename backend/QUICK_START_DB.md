# ⚡ Démarrage Rapide avec PostgreSQL

## 🎯 Étapes Rapides

### 1. Installer PostgreSQL

**Option A: Docker (Recommandé - Plus Simple)**
```bash
docker run --name postgres-mma \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=mma_agriculture \
  -p 5432:5432 \
  -d postgres:15
```

**Option B: Installation Locale**
- Téléchargez: https://www.postgresql.org/download/
- Installez avec les paramètres par défaut

### 2. Configurer `.env`

Ajoutez dans `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mma_agriculture
DB_USER=postgres
DB_PASSWORD=postgres
```

### 3. Démarrer le Backend

```bash
cd backend
npm install
npm run dev
```

Le serveur va automatiquement:
- ✅ Créer les tables
- ✅ Migrer les données depuis JSON
- ✅ Créer l'admin par défaut

## ✅ Vérification

Testez l'API:
```bash
# Dans le navigateur
http://localhost:5000/api

# Devrait retourner:
{
  "message": "MMA Agriculture API is running!",
  "version": "1.0.0",
  ...
}
```

## 🔑 Identifiants Admin

- **Username:** `admin`
- **Password:** `admin123`

## 🐛 Problèmes Courants

### "password authentication failed"
→ Vérifiez le mot de passe dans `.env`

### "database does not exist"
→ Si vous n'utilisez pas Docker, créez la base:
```sql
psql -U postgres
CREATE DATABASE mma_agriculture;
\q
```

### "connection refused"
→ Vérifiez que PostgreSQL est démarré

## 📚 Documentation Complète

Voir `DATABASE_SETUP.md` pour plus de détails.



