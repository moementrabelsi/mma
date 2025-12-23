# 🗄️ Migration vers PostgreSQL

Le backend a été migré pour utiliser PostgreSQL au lieu de fichiers JSON.

## ⚡ Démarrage Rapide

### 1. Installer PostgreSQL

**Option A: Installation locale**
- Téléchargez: https://www.postgresql.org/download/windows/
- Installez avec les paramètres par défaut
- Notez le mot de passe que vous définissez

**Option B: Docker (Recommandé)**
```bash
docker run --name postgres-mma \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=mma_agriculture \
  -p 5432:5432 \
  -d postgres:15
```

### 2. Créer la base de données

Si vous n'utilisez pas Docker, créez la base manuellement:

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE mma_agriculture;

# Quitter
\q
```

### 3. Configurer les variables d'environnement

Ajoutez dans `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mma_agriculture
DB_USER=postgres
DB_PASSWORD=postgres
```

**⚠️ Changez le mot de passe en production!**

### 4. Démarrer le serveur

Le serveur va automatiquement:
- Créer les tables
- Migrer les données depuis `data/products.json`
- Créer l'admin par défaut

```bash
cd backend
npm install
npm run dev
```

## 📊 Structure de la Base de Données

### Tables

- **categories** - Catégories de produits
- **subcategories** - Sous-catégories (liées aux catégories)
- **products** - Produits (liés aux catégories et sous-catégories)
- **admins** - Comptes administrateurs

### Relations

- `subcategories.category_id` → `categories.id`
- `products.category` → `categories.id`
- `products.sub_category` → `subcategories.id`

## 🔄 Migration des Données

Les données existantes dans `data/products.json` sont automatiquement migrées au premier démarrage.

Pour forcer une nouvelle migration:
```bash
npm run migrate
```

## ✅ Vérification

Testez la connexion:
```sql
psql -U postgres -d mma_agriculture

-- Vérifier les tables
\dt

-- Compter les enregistrements
SELECT 
  (SELECT COUNT(*) FROM categories) as categories,
  (SELECT COUNT(*) FROM subcategories) as subcategories,
  (SELECT COUNT(*) FROM products) as products,
  (SELECT COUNT(*) FROM admins) as admins;
```

## 🐛 Dépannage

### Erreur: "password authentication failed"
- Vérifiez le mot de passe dans `.env`
- Vérifiez que PostgreSQL est démarré

### Erreur: "database does not exist"
- Créez la base: `CREATE DATABASE mma_agriculture;`

### Erreur: "connection refused"
- Vérifiez que PostgreSQL est démarré
- Vérifiez le port (5432 par défaut)
- Vérifiez les paramètres dans `.env`

### Erreur: "relation does not exist"
- Les tables n'ont pas été créées
- Redémarrez le serveur (les tables seront créées automatiquement)

## 📝 Notes

- Les fichiers JSON dans `data/` sont conservés comme backup
- La migration est idempotente (peut être exécutée plusieurs fois)
- Les données existantes ne sont pas supprimées lors d'une nouvelle migration



