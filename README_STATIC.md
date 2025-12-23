# 🌐 Frontend Statique - Sans Backend

Le frontend peut maintenant fonctionner **sans backend** en utilisant des données statiques intégrées.

## ✅ Fonctionnalités Disponibles (Mode Statique)

- ✅ **Catalogue de produits** - 10 produits statiques
- ✅ **Catégories** - 4 catégories (Graines, Équipement, Engrais, Pesticides)
- ✅ **Sous-catégories** - 12 sous-catégories
- ✅ **Recherche de produits** - Recherche par nom et description
- ✅ **Filtres** - Par catégorie, sous-catégorie, type, usage, prix
- ✅ **Tri** - Par nom, prix croissant/décroissant
- ✅ **Pagination** - 6 produits par page
- ✅ **Détails produits** - Avec galerie d'images multiples
- ✅ **Pages** - Accueil, Catalogue, Catégories, À propos, Contact

## 🚫 Fonctionnalités Non Disponibles (Mode Statique)

- ❌ **Panel Admin** - Nécessite un backend
- ❌ **Gestion CRUD** - Nécessite un backend
- ❌ **Authentification** - Nécessite un backend

## 📦 Utilisation

### Mode Statique (Par Défaut)

Le frontend utilise automatiquement les données statiques si `REACT_APP_API_URL` n'est pas défini.

```bash
cd frontend
npm install
npm start
```

Le site fonctionnera avec les données statiques intégrées.

### Mode avec Backend

Pour utiliser avec un backend, définissez la variable d'environnement :

```bash
# Windows (PowerShell)
$env:REACT_APP_API_URL="http://localhost:5000"

# Linux/Mac
export REACT_APP_API_URL="http://localhost:5000"

# Ou créez un fichier .env dans frontend/
REACT_APP_API_URL=http://localhost:5000
```

## 📁 Structure des Données Statiques

Les données sont définies dans `frontend/src/data/staticData.js` :

- **categories** : Liste des catégories
- **subcategories** : Liste des sous-catégories
- **staticProducts** : Liste des produits (10 produits)
- **filterProducts()** : Fonction de filtrage
- **paginateProducts()** : Fonction de pagination

## 🔧 Ajouter des Produits Statiques

Éditez `frontend/src/data/staticData.js` et ajoutez vos produits dans le tableau `staticProducts` :

```javascript
{
  id: 'static-11',
  name: 'Nouveau Produit',
  category: 'seeds',
  subCategory: 'vegetable-seeds',
  description: 'Description du produit',
  images: ['url-image-1.jpg', 'url-image-2.jpg'],
  image: 'url-image-1.jpg',
  price: 29.99,
  inStock: true,
  attributes: {
    type: 'organic',
    usage: 'home-garden'
  }
}
```

## 🚀 Déploiement sur Vercel (Mode Statique)

1. **Sans configuration spéciale** - Le frontend fonctionnera automatiquement en mode statique
2. **Pas besoin de backend** - Tout fonctionne côté client
3. **Déploiement simple** :
   ```bash
   cd frontend
   vercel
   ```

## 📝 Notes

- Les données statiques sont chargées instantanément (pas de requêtes réseau)
- Tous les filtres et la recherche fonctionnent côté client
- La pagination est gérée localement
- Les images utilisent des URLs Unsplash (externes)

## 🔄 Migration vers Backend

Si vous voulez ajouter un backend plus tard :

1. Définissez `REACT_APP_API_URL` avec l'URL de votre backend
2. Le frontend utilisera automatiquement l'API au lieu des données statiques
3. Les données statiques serviront de fallback si l'API échoue

