# 🗄️ Configuration de la Base de Données PostgreSQL

## Prérequis

1. **Installer PostgreSQL**
   - Téléchargez depuis: https://www.postgresql.org/download/
   - Ou utilisez Docker: `docker run --name postgres-mma -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`

## Configuration

### 1. Créer la base de données

Connectez-vous à PostgreSQL:
```bash
psql -U postgres
```

Créez la base de données:
```sql
CREATE DATABASE mma_agriculture;
\q
```

### 2. Configurer les variables d'environnement

Le fichier `.env` contient déjà la configuration par défaut:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mma_agriculture
DB_USER=postgres
DB_PASSWORD=postgres
```

**⚠️ Modifiez le mot de passe en production!**

### 3. Démarrer le serveur backend

Le serveur va automatiquement:
1. Créer les tables si elles n'existent pas
2. Migrer les données depuis `data/products.json` (si disponible)
3. Créer l'admin par défaut

```bash
cd backend
npm install
npm run dev
```

## Structure de la Base de Données

### Tables

1. **categories**
   - `id` (VARCHAR) - Primary Key
   - `name` (VARCHAR)
   - `description` (TEXT)
   - `image` (TEXT)
   - `created_at`, `updated_at` (TIMESTAMP)

2. **subcategories**
   - `id` (VARCHAR) - Primary Key
   - `name` (VARCHAR)
   - `category_id` (VARCHAR) - Foreign Key → categories
   - `description` (TEXT)
   - `created_at`, `updated_at` (TIMESTAMP)

3. **products**
   - `id` (VARCHAR) - Primary Key
   - `name` (VARCHAR)
   - `category` (VARCHAR) - Foreign Key → categories
   - `sub_category` (VARCHAR) - Foreign Key → subcategories
   - `description` (TEXT)
   - `image` (TEXT)
   - `price` (DECIMAL)
   - `in_stock` (BOOLEAN)
   - `attributes` (JSONB) - Pour stocker type, usage, etc.
   - `created_at`, `updated_at` (TIMESTAMP)

4. **admins**
   - `id` (VARCHAR) - Primary Key
   - `username` (VARCHAR) - Unique
   - `password` (VARCHAR) - Hashé avec bcrypt
   - `is_admin` (BOOLEAN)
   - `created_at`, `updated_at` (TIMESTAMP)

## Migration des Données

Les données existantes dans `data/products.json` seront automatiquement migrées lors du premier démarrage.

## Vérification

Pour vérifier que tout fonctionne:

```sql
-- Se connecter à la base
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

## Docker (Optionnel)

Si vous préférez utiliser Docker:

```bash
# Démarrer PostgreSQL
docker run --name postgres-mma \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=mma_agriculture \
  -p 5432:5432 \
  -d postgres:15

# Vérifier que le conteneur tourne
docker ps

# Arrêter
docker stop postgres-mma

# Redémarrer
docker start postgres-mma
```

## Dépannage

### Erreur: "password authentication failed"
- Vérifiez le mot de passe dans `.env`
- Vérifiez que PostgreSQL est démarré

### Erreur: "database does not exist"
- Créez la base de données manuellement (voir étape 1)

### Erreur: "connection refused"
- Vérifiez que PostgreSQL est démarré
- Vérifiez le port (par défaut 5432)
- Vérifiez les paramètres de connexion dans `.env`



