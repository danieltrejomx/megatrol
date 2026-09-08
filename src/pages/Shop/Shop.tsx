import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  PawPrint, 
  Leaf, 
  Pill, 
  Bone, 
  Sparkles, 
  Truck, 
  Search, 
  X, 
  ShoppingCart,
  ShieldCheck,
  Zap,
  ChevronDown,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { products, type Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ProductModal } from '../../components/ProductModal/ProductModal';
import './Shop.css';

const filters = [
  { key: 'all', label: 'Todos los Productos', icon: PawPrint },
  { key: 'Megatrol Shower', label: 'Megatrol Shower', icon: Sparkles },
  { key: 'Megatrol Talco', label: 'Megatrol Talco', icon: Leaf },
  { key: 'Línea Megadoxi', label: 'Línea Megadoxi', icon: Pill },
  { key: 'Plagatrol', label: 'Plagatrol', icon: ShieldCheck },
  { key: 'Línea Megatrol', label: 'Spray y Jabón Megatrol', icon: Zap },
  { key: 'Salud y Suplementos', label: 'Salud y Suplementos', icon: Bone },
];

const Shop = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth <= 900 : false
  );
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Detect window width to only enable category drawer breakdown on mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (!mobile) {
        setExpandedCategories([]);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Open modal if URL specifies ?producto=slug or ?p=slug
  useEffect(() => {
    const slug = searchParams.get('producto') || searchParams.get('p');
    if (slug) {
      const found = products.find(p => p.slug === slug);
      if (found) setModalProduct(found);
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setModalProduct(null);
    if (searchParams.get('producto') || searchParams.get('p')) {
      navigate('/tienda', { replace: true });
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesFilter = selectedFilter === 'all' || product.line === selectedFilter;
    const matchesSearch = searchTerm.trim() === '' ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.species && product.species.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getFilterCount = (key: string) => {
    if (key === 'all') return products.length;
    return products.filter(p => p.line === key).length;
  };

  const renderProductCard = (product: Product) => {
    const isFav = isFavorite(product.id);
    return (
      <div
        key={product.id}
        className="product-card"
        onClick={() => setModalProduct(product)}
      >
        <div className="product-card-image-wrap">
          {product.tag && <span className="product-card-tag">{product.tag}</span>}
          <img src={product.image} alt={product.name} className="product-card-img" />
          <button
            type="button"
            className={`product-card-fav-btn ${isFav ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            aria-label={isFav ? "Quitar de favoritos" : "Guardar en favoritos"}
            title={isFav ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            <Heart size={18} fill={isFav ? "#f43f5e" : "none"} color={isFav ? "#f43f5e" : "#64748b"} />
          </button>
        </div>

      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-card-line">{product.line}</span>
          {product.presentation && (
            <span className="product-card-pres">{product.presentation}</span>
          )}
        </div>

        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-desc">{product.desc}</p>

        {product.species && (
          <div className="product-card-species">
            <PawPrint size={13} />
            <span>{product.species}</span>
          </div>
        )}

        <div className="product-card-bottom">
          <div className="product-card-price-card">
            <div className="price-info-group">
              <span className="price-eyebrow">Precio Oficial</span>
              <div className="price-value-row">
                <span className="price-currency-sign">$</span>
                <span className="price-digits">{product.price.toFixed(2)}</span>
                <span className="price-currency-suffix">MXN</span>
              </div>
            </div>
          </div>

          <div className="product-card-actions">
            <button
              type="button"
              className="btn btn-shop-buy"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1, undefined, undefined, false);
                navigate('/carrito');
              }}
            >
              <Zap size={14} />
              <span>Comprar Ahora</span>
            </button>
            <button
              type="button"
              className={`btn btn-shop-cart ${addedId === product.id ? 'added' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
                setAddedId(product.id);
                setTimeout(() => setAddedId(null), 1600);
              }}
            >
              {addedId === product.id ? (
                <>
                  <CheckCircle2 size={15} />
                  <span>¡Añadido!</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={15} />
                  <span>Añadir al Carrito</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="shop-page container">
      {/* Header Banner */}
      <div className="shop-header banner-tienda">
        <span className="shop-badge">Catálogo Oficial Inobazz Pharma</span>
        <h1>Catálogo</h1>
        <p>Soluciones ecológicas, nutricionales y farmacéuticas de grado veterinario para la salud y bienestar de tu mascota.</p>
        
        {/* Search Bar */}
        <div className="shop-search-bar">
          <input
            type="text"
            placeholder="Buscar por nombre, beneficio o ingrediente (ej. spray, neem, shampoo, vitaminas)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')} title="Limpiar búsqueda">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="shop-layout">
        {/* Sidebar Categories with Accordion Breakdown */}
        <aside className="shop-sidebar">
          <div className="sidebar-section">
            <h3>Categorías</h3>
            <div className="filter-buttons">
              {filters.map((f) => {
                const Icon = f.icon;
                const isAll = f.key === 'all';
                const isExpanded = expandedCategories.includes(f.key);
                const categoryProducts = isAll 
                  ? [] 
                  : products.filter(p => p.line === f.key);

                return (
                  <div 
                    key={f.key} 
                    className={`category-accordion-item ${isMobile && isExpanded && !isAll ? 'is-expanded' : ''}`}
                  >
                    <button
                      type="button"
                      className={`filter-btn ${selectedFilter === f.key ? 'active' : ''}`}
                      onClick={() => {
                        if (isAll) {
                          setSelectedFilter('all');
                          setExpandedCategories([]);
                        } else {
                          setSelectedFilter(f.key);
                          if (isMobile) {
                            setExpandedCategories(prev => 
                              prev.includes(f.key) && selectedFilter === f.key 
                                ? [] 
                                : [f.key]
                            );
                          } else {
                            setExpandedCategories([]);
                          }
                        }
                      }}
                    >
                      <span className="filter-btn-label">
                        <Icon size={15} />
                        <span>{f.label}</span>
                      </span>
                      <span className="filter-btn-meta">
                        <span className="count-badge">{getFilterCount(f.key)}</span>
                        {isMobile && !isAll && (
                          <ChevronDown 
                            size={14} 
                            className={`accordion-arrow ${isExpanded ? 'open' : ''}`} 
                          />
                        )}
                      </span>
                    </button>

                    {/* Desglose inmediato de productos en la categoría: ÚNICAMENTE EN MÓVIL */}
                    {isMobile && !isAll && isExpanded && categoryProducts.length > 0 && (
                      <div className="category-drawer-products">
                        {categoryProducts.map((p) => (
                          <div
                            key={p.id}
                            className="drawer-product-row"
                            onClick={() => setModalProduct(p)}
                            title={`Ver detalles de ${p.name}`}
                          >
                            <img src={p.image} alt={p.name} className="drawer-product-img" />
                            <div className="drawer-product-details">
                              <span className="drawer-product-title">{p.name}</span>
                              <span className="drawer-product-price">${p.price.toFixed(2)} MXN</span>
                            </div>
                            <button
                              type="button"
                              className={`drawer-add-btn ${addedId === p.id ? 'added' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(p);
                                setAddedId(p.id);
                                setTimeout(() => setAddedId(null), 1500);
                              }}
                              title="Añadir al carrito"
                            >
                              <ShoppingCart size={11} />
                              <span>{addedId === p.id ? '✓' : 'Añadir'}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sidebar-promo">
            <div className="sidebar-promo-title">
              <Truck size={18} />
              <h4>Envíos a todo México</h4>
            </div>
            <p>Envío gratis en compras mayores a $599 MXN. Despacho en 24 a 48 horas.</p>
            <Link to="/distribuidores" className="distributor-link">¿Ventas por mayoreo? Solicita catálogo aquí →</Link>
          </div>
        </aside>

        {/* Product Grid / Category Breakdown */}
        <main className="shop-main">
          <div className="shop-results-header">
            <span>
              {searchTerm.trim() ? (
                <>Resultados para "<strong>{searchTerm}</strong>": <strong>{filteredProducts.length}</strong> productos</>
              ) : selectedFilter === 'all' ? (
                <>Mostrando <strong>{products.length}</strong> productos desglosados por categoría</>
              ) : (
                <>Mostrando <strong>{filteredProducts.length}</strong> productos en <strong>{selectedFilter}</strong></>
              )}
            </span>
            {(selectedFilter !== 'all' || searchTerm.trim() !== '') && (
              <button 
                type="button" 
                className="reset-filter-btn" 
                onClick={() => { setSelectedFilter('all'); setSearchTerm(''); setExpandedCategories([]); }}
              >
                <span>Mostrar todos</span>
                <X size={14} />
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-products-found">
              <div className="no-products-icon-wrap">
                <Search size={36} />
              </div>
              <h3>No se encontraron productos</h3>
              <p>Intenta con otro término de búsqueda o selecciona otra categoría.</p>
              <button className="btn btn-primary" onClick={() => { setSelectedFilter('all'); setSearchTerm(''); setExpandedCategories([]); }}>
                Ver Todos los Productos
              </button>
            </div>
          ) : selectedFilter === 'all' && searchTerm.trim() === '' ? (
            /* Desglose completo por categoría con cabeceras */
            <div className="shop-grouped-sections">
              {filters
                .filter(f => f.key !== 'all')
                .map(cat => {
                  const catProducts = products.filter(p => p.line === cat.key);
                  if (catProducts.length === 0) return null;
                  const Icon = cat.icon;
                  return (
                    <section key={cat.key} className="shop-category-block">
                      <div className="shop-category-block-header">
                        <div className="category-block-title">
                          <div className="category-block-icon-wrap">
                            <Icon size={18} />
                          </div>
                          <h2>{cat.label}</h2>
                        </div>
                        <span className="category-block-count">
                          {catProducts.length} {catProducts.length === 1 ? 'producto' : 'productos'}
                        </span>
                      </div>
                      <div className="product-grid">
                        {catProducts.map(renderProductCard)}
                      </div>
                    </section>
                  );
                })}
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map(renderProductCard)}
            </div>
          )}
        </main>
      </div>

      {/* Pantalla Emergente de Producto (Product Detail Modal) */}
      <ProductModal product={modalProduct} onClose={handleCloseModal} />
    </div>
  );
};

export default Shop;
