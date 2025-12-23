import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getProducts, getCategories, getSubcategories, getProductTypes, getProductUsages } from '../services/api';
import { FaBox } from 'react-icons/fa';
import './Catalog.css';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [usages, setUsages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedSubCategory, setSelectedSubCategory] = useState(searchParams.get('subCategory') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [selectedUsage, setSelectedUsage] = useState(searchParams.get('usage') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'name');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesData, typesData, usagesData] = await Promise.all([
          getCategories(),
          getProductTypes(),
          getProductUsages()
        ]);
        // Handle new API format { success: true, data: ... }
        const cats = categoriesData.data !== undefined ? categoriesData.data : (Array.isArray(categoriesData) ? categoriesData : []);
        setCategories(cats);
        const types = typesData.data !== undefined ? typesData.data : (Array.isArray(typesData) ? typesData : []);
        setTypes(types);
        const usages = usagesData.data !== undefined ? usagesData.data : (Array.isArray(usagesData) ? usagesData : []);
        setUsages(usages);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        try {
          const data = await getSubcategories(selectedCategory);
          // Handle new API format { success: true, data: ... }
          const subcats = data.data !== undefined ? data.data : (Array.isArray(data) ? data : []);
          setSubcategories(subcats);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      } else {
        setSubcategories([]);
        setSelectedSubCategory('');
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedSubCategory, selectedType, selectedUsage, sortBy]);

  // Fetch products with filters and pagination
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const filters = {
          page: currentPage,
          limit: 6
        };
        if (searchQuery) filters.search = searchQuery;
        if (selectedCategory) filters.category = selectedCategory;
        if (selectedSubCategory) filters.subCategory = selectedSubCategory;
        if (selectedType) filters.type = selectedType;
        if (selectedUsage) filters.usage = selectedUsage;
        if (sortBy) filters.sortBy = sortBy;

        const data = await getProducts(filters);
        
        // Handle both old format (array) and new format (object with products)
        if (Array.isArray(data)) {
          // Old format - array of products (fallback for compatibility)
          const totalProducts = data.length;
          const limit = 6;
          const totalPages = Math.ceil(totalProducts / limit);
          const startIndex = (currentPage - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedProducts = data.slice(startIndex, endIndex);
          
          setProducts(paginatedProducts);
          setPagination({
            currentPage: currentPage,
            totalPages: totalPages,
            totalProducts: totalProducts,
            hasNextPage: endIndex < totalProducts,
            hasPrevPage: currentPage > 1
          });
        } else if (data && data.products) {
          // New format - object with products and pagination
          setProducts(data.products || []);
          setPagination(data.pagination || {
            currentPage: currentPage,
            totalPages: 1,
            totalProducts: data.products?.length || 0,
            hasNextPage: false,
            hasPrevPage: false
          });
        } else {
          // Unexpected format
          console.error('Unexpected API response format:', data);
          setProducts([]);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalProducts: 0,
            hasNextPage: false,
            hasPrevPage: false
          });
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Échec du chargement des produits. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, selectedCategory, selectedSubCategory, selectedType, selectedUsage, sortBy, currentPage]);

  // Update URL params
  useEffect(() => {
    const params = {};
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory) params.category = selectedCategory;
    if (selectedSubCategory) params.subCategory = selectedSubCategory;
    if (selectedType) params.type = selectedType;
    if (selectedUsage) params.usage = selectedUsage;
    if (sortBy && sortBy !== 'name') params.sortBy = sortBy;
    if (currentPage > 1) params.page = currentPage;
    setSearchParams(params);
  }, [searchQuery, selectedCategory, selectedSubCategory, selectedType, selectedUsage, sortBy, currentPage, setSearchParams]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory(''); // Reset subcategory when category changes
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedType('');
    setSelectedUsage('');
    setSortBy('name');
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedSubCategory || selectedType || selectedUsage || (sortBy && sortBy !== 'name');

  return (
    <div className="catalog-page">
      {/* Page Header */}
      <div className="catalog-header">
        <div className="container">
          <h1 className="page-title">Catalogue de produits</h1>
          <p className="page-subtitle">
            Explorez notre gamme complète de produits agricoles
          </p>
        </div>
      </div>

      <div className="catalog-content container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h2>Filtres</h2>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="clear-filters-btn">
                Tout effacer
              </button>
            )}
          </div>

          {/* Search */}
          <div className="filter-group">
            <label htmlFor="search">Rechercher des produits</label>
            <input
              id="search"
              type="text"
              placeholder="Rechercher par nom ou description..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <label htmlFor="category">Catégorie</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="filter-select"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter */}
          {subcategories.length > 0 && (
            <div className="filter-group">
              <label htmlFor="subcategory">Sous-catégorie</label>
              <select
                id="subcategory"
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">Toutes les sous-catégories</option>
                {subcategories.map((subcat) => (
                  <option key={subcat.id} value={subcat.id}>
                    {subcat.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Type Filter */}
          <div className="filter-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="">Tous les types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Usage Filter */}
          <div className="filter-group">
            <label htmlFor="usage">Utilisation</label>
            <select
              id="usage"
              value={selectedUsage}
              onChange={(e) => setSelectedUsage(e.target.value)}
              className="filter-select"
            >
              <option value="">Toutes les utilisations</option>
              {usages.map((usage) => (
                <option key={usage} value={usage}>
                  {usage}
                </option>
              ))}
            </select>
          </div>

        </aside>

        {/* Products Grid */}
        <main className="products-main">
          {/* Results Header */}
          <div className="results-header">
            <p className="results-count">
              {loading ? 'Chargement...' : (
                <>
                  Affichage de {products.length} sur {pagination.totalProducts} produit{pagination.totalProducts !== 1 ? 's' : ''}
                  {pagination.totalPages > 1 && ` (Page ${pagination.currentPage} sur ${pagination.totalPages})`}
                </>
              )}
            </p>
            {/* Sort Filter */}
            <div className="sort-filter">
              <label htmlFor="sortBy">Trier par :</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="name">Nom (A-Z)</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          )}

          {/* Error State */}
          {error && <div className="error-message">{error}</div>}

          {/* No Products Found */}
          {!loading && !error && products.length === 0 && (
            <div className="no-products">
              <div className="no-products-icon">
                <FaBox />
              </div>
              <h3>Aucun produit trouvé</h3>
              <p>Essayez d'ajuster vos filtres ou votre recherche</p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="btn btn-primary">
                  Effacer les filtres
                </button>
              )}
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && products.length > 0 && (
            <>
              <div className="products-grid">
                {products.map((product) => (
                  <Link
                    to={`/products/${product.id}`}
                    key={product.id}
                    className="product-card"
                  >
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    {product.inStock ? (
                      <span className="product-badge in-stock">En stock</span>
                    ) : (
                      <span className="product-badge out-of-stock">Rupture de stock</span>
                    )}
                    </div>
                    <div className="product-content">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-description">
                        {product.description.substring(0, 80)}...
                      </p>
                      <div className="product-footer">
                        <span className="product-price">${product.price.toFixed(2)}</span>
                        <span className="product-link">Voir les détails →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="pagination-btn"
                  >
                    Précédent
                  </button>
                  
                  <div className="pagination-pages">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      if (
                        page === 1 ||
                        page === pagination.totalPages ||
                        (page >= pagination.currentPage - 1 && page <= pagination.currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`pagination-page ${page === pagination.currentPage ? 'active' : ''}`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === pagination.currentPage - 2 ||
                        page === pagination.currentPage + 2
                      ) {
                        return <span key={page} className="pagination-ellipsis">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="pagination-btn"
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Catalog;

