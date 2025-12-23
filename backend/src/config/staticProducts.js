/**
 * Static products that are always available in the catalog
 * These are in addition to the dynamic products from the database
 */

const staticProducts = [
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
    isStatic: true,
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
    isStatic: true,
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
    isStatic: true,
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
    isStatic: true,
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
    isStatic: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

module.exports = staticProducts;

