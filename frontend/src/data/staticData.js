/**
 * Static data for the frontend (works without backend)
 * This includes products, categories, and subcategories
 */

// Categories
export const categories = [
  {
    id: 'seeds',
    name: 'Graines',
    description: 'Graines de qualité pour votre jardin',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400'
  },
  {
    id: 'equipment',
    name: 'Équipement',
    description: 'Outils et équipements agricoles professionnels',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'
  },
  {
    id: 'fertilizers',
    name: 'Engrais',
    description: 'Engrais naturels et organiques',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400'
  },
  {
    id: 'pesticides',
    name: 'Pesticides',
    description: 'Solutions de protection des cultures',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400'
  }
];

// Subcategories
export const subcategories = [
  // Seeds subcategories
  { id: 'vegetable-seeds', name: 'Graines de Légumes', category: 'seeds', description: 'Graines de légumes variés' },
  { id: 'fruit-seeds', name: 'Graines de Fruits', category: 'seeds', description: 'Graines de fruits' },
  { id: 'flower-seeds', name: 'Graines de Fleurs', category: 'seeds', description: 'Graines de fleurs ornementales' },
  { id: 'herb-seeds', name: 'Graines d\'Herbes', category: 'seeds', description: 'Graines d\'herbes aromatiques' },
  
  // Equipment subcategories
  { id: 'garden-tools', name: 'Outils de Jardin', category: 'equipment', description: 'Outils manuels pour le jardinage' },
  { id: 'irrigation', name: 'Irrigation', category: 'equipment', description: 'Systèmes d\'irrigation' },
  { id: 'greenhouse-equipment', name: 'Équipement de Serre', category: 'equipment', description: 'Équipements pour serres' },
  { id: 'machinery', name: 'Machinerie', category: 'equipment', description: 'Machines agricoles' },
  
  // Fertilizers subcategories
  { id: 'organic-fertilizers', name: 'Engrais Organiques', category: 'fertilizers', description: 'Engrais naturels' },
  { id: 'chemical-fertilizers', name: 'Engrais Chimiques', category: 'fertilizers', description: 'Engrais synthétiques' },
  
  // Pesticides subcategories
  { id: 'organic-pesticides', name: 'Pesticides Organiques', category: 'pesticides', description: 'Pesticides naturels' },
  { id: 'chemical-pesticides', name: 'Pesticides Chimiques', category: 'pesticides', description: 'Pesticides synthétiques' }
];

// Static Products
export const staticProducts = [
  {
    id: 'static-1',
    name: 'Premium Organic Seeds Collection',
    category: 'seeds',
    subCategory: 'vegetable-seeds',
    description: 'Collection complète de graines biologiques premium pour votre jardin. Inclut des variétés rares et des semences certifiées bio. Cette collection exclusive comprend des variétés anciennes et modernes, toutes certifiées biologiques et adaptées à différents climats.',
    images: [
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800',
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500',
    price: 45.99,
    inStock: true,
    attributes: {
      type: 'organic',
      usage: 'home-garden'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'static-2',
    name: 'Professional Garden Tool Set',
    category: 'equipment',
    subCategory: 'garden-tools',
    description: 'Ensemble professionnel d\'outils de jardinage de qualité supérieure. Parfait pour les jardiniers expérimentés. Comprend des outils en acier inoxydable avec poignées ergonomiques en bois dur.',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
    price: 89.50,
    inStock: true,
    attributes: {
      type: 'professional',
      usage: 'commercial'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'static-3',
    name: 'Natural Fertilizer Premium',
    category: 'fertilizers',
    subCategory: 'organic-fertilizers',
    description: 'Engrais naturel premium à base d\'ingrédients organiques. Idéal pour une croissance saine et durable. Formule enrichie en nutriments essentiels pour un développement optimal des plantes.',
    images: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800',
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500',
    price: 32.75,
    inStock: true,
    attributes: {
      type: 'organic',
      usage: 'home-garden'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'static-4',
    name: 'Eco-Friendly Pest Control Spray',
    category: 'pesticides',
    subCategory: 'organic-pesticides',
    description: 'Spray de contrôle des nuisibles respectueux de l\'environnement. Sans produits chimiques agressifs. Formule à base d\'ingrédients naturels, sûr pour les plantes et les animaux domestiques.',
    images: [
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800',
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500',
    price: 24.99,
    inStock: true,
    attributes: {
      type: 'organic',
      usage: 'home-garden'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'static-5',
    name: 'Deluxe Greenhouse Kit',
    category: 'equipment',
    subCategory: 'greenhouse-equipment',
    description: 'Kit de serre de luxe avec tous les accessoires nécessaires. Parfait pour les cultures toute l\'année. Structure robuste en aluminium avec panneaux en polycarbonate résistants aux intempéries.',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800',
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
    price: 299.99,
    inStock: true,
    attributes: {
      type: 'premium',
      usage: 'commercial'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Additional products
  {
    id: 'static-6',
    name: 'Tomate Graines Bio',
    category: 'seeds',
    subCategory: 'vegetable-seeds',
    description: 'Graines de tomates biologiques, variété ancienne. Rendement élevé et saveur exceptionnelle.',
    images: [
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500',
    price: 8.99,
    inStock: true,
    attributes: {
      type: 'organic',
      usage: 'home-garden'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'static-7',
    name: 'Système d\'Irrigation Automatique',
    category: 'equipment',
    subCategory: 'irrigation',
    description: 'Système d\'irrigation automatique avec programmateur. Économise l\'eau et maintient vos plantes en parfaite santé.',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
    price: 149.99,
    inStock: true,
    attributes: {
      type: 'professional',
      usage: 'commercial'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'static-8',
    name: 'Engrais NPK 15-15-15',
    category: 'fertilizers',
    subCategory: 'chemical-fertilizers',
    description: 'Engrais équilibré NPK pour une croissance optimale. Convient à tous types de plantes.',
    images: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500',
    price: 18.50,
    inStock: true,
    attributes: {
      type: 'chemical',
      usage: 'commercial'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'static-9',
    name: 'Graines de Fleurs Mélange',
    category: 'seeds',
    subCategory: 'flower-seeds',
    description: 'Mélange de graines de fleurs pour un jardin coloré toute l\'année. Inclut 20 variétés différentes.',
    images: [
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500',
    price: 12.99,
    inStock: true,
    attributes: {
      type: 'organic',
      usage: 'home-garden'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'static-10',
    name: 'Pulvérisateur Professionnel',
    category: 'equipment',
    subCategory: 'garden-tools',
    description: 'Pulvérisateur à pression pour traitement des plantes. Capacité 5L, poignée ergonomique.',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
    price: 35.00,
    inStock: true,
    attributes: {
      type: 'professional',
      usage: 'home-garden'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Helper function to filter products
export const filterProducts = (products, filters = {}) => {
  let filtered = [...products];

  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  // Filter by subCategory
  if (filters.subCategory) {
    filtered = filtered.filter(p => p.subCategory === filters.subCategory);
  }

  // Filter by type
  if (filters.type) {
    filtered = filtered.filter(p => p.attributes?.type === filters.type);
  }

  // Filter by usage
  if (filters.usage) {
    filtered = filtered.filter(p => p.attributes?.usage === filters.usage);
  }

  // Filter by price range
  if (filters.minPrice !== undefined && filters.minPrice !== null && filters.minPrice !== '') {
    filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice));
  }
  if (filters.maxPrice !== undefined && filters.maxPrice !== null && filters.maxPrice !== '') {
    filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice));
  }

  // Search by name or description
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }

  // Sort
  if (filters.sortBy) {
    if (filters.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    }
  }

  return filtered;
};

// Helper function for pagination
export const paginateProducts = (products, page = 1, limit = 6) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(products.length / limit),
      totalProducts: products.length,
      limit: limit
    }
  };
};

