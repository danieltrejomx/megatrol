import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './Shop.css';

const filters = [
  { key: 'all', label: '🐾 Todos los Productos' },
  { key: 'Línea Megatrol', label: '🌿 Línea Megatrol (Antiparasitarios)' },
  { key: 'Pequeñas Especies', label: '🐕 Pequeñas Especies (Salud y Cuidado)' },
  { key: 'farmaceuticos', label: '💊 Farmacéuticos y Salud' },
  { key: 'multivitaminicos', label: '🦴 Vitaminas y Suplementos' },
  { key: 'dermocosmeticos', label: '🧴 Shampoos y Dermocosmética' },
];

const Shop = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const filteredProducts = products.filter(product => {
    const matchesFilter = selectedFilter === 'all' ||
      product.line === selectedFilter ||
      product.category === selectedFilter ||
      (selectedFilter === 'dermocosmeticos' && (product.category === 'dermocosmeticos' || product.category === 'dermatologicos'));
    const matchesSearch = searchTerm.trim() === '' ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.species && product.species.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getFilterCount = (key: string) => {
    if (key === 'all') return products.length;
    if (key === 'Línea Megatrol' || key === 'Pequeñas Especies') {
      return products.filter(p => p.line === key).length;
    }
    if (key === 'dermocosmeticos') {
      return products.filter(p => p.category === 'dermocosmeticos' || p.category === 'dermatologicos').length;
    }
    return products.filter(p => p.category === key).length;
  };

  return (
    <div className="shop-page container">
      {/* Header Banner */}
      <div className="shop-header">
        <span className="shop-badge">Catálogo Oficial Inobazz Pharma</span>
        <h1>Catálogo para Perros y Gatos</h1>
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
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>
      </div>

      <div className="shop-layout">
        {/* Sidebar Categories */}
        <aside className="shop-sidebar">
          <div className="sidebar-section">
            <h3>Categorías</h3>
            <div className="filter-buttons">
              {filters.map((f) => (
                <button
                  key={f.key}
                  className={`filter-btn ${selectedFilter === f.key ? 'active' : ''}`}
                  onClick={() => setSelectedFilter(f.key)}
                >
                  <span>{f.label}</span>
                  <span className="count-badge">
                    {getFilterCount(f.key)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-promo">
            <h4>🚚 Envíos a todo México</h4>
            <p>Envío gratis en compras mayores a $599 MXN. Despacho en 24 a 48 horas.</p>
            <Link to="/distribuidores" className="distributor-link">¿Ventas por mayoreo? Solicita catálogo aquí →</Link>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="shop-main">
          <div className="shop-results-header">
            <span>Mostrando <strong>{filteredProducts.length}</strong> de {products.length} productos</span>
            {selectedFilter !== 'all' && (
              <button className="reset-filter-btn" onClick={() => setSelectedFilter('all')}>
                Mostrar todos ✕
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-products-found">
              <span className="no-products-icon">🔍</span>
              <h3>No se encontraron productos</h3>
              <p>Intenta con otro término de búsqueda o selecciona otra categoría.</p>
              <button className="btn btn-primary" onClick={() => { setSelectedFilter('all'); setSearchTerm(''); }}>
                Ver Todos los Productos
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => navigate(`/producto/${product.slug}`)}
                >
                  {product.tag && <span className="product-card-tag">{product.tag}</span>}
                  
                  <div className="product-card-image-wrap">
                    <img src={product.image} alt={product.name} className="product-card-img" />
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
                        <span>🐾 {product.species}</span>
                      </div>
                    )}

                    <div className="product-card-bottom">
                      <div className="product-card-price">
                        <span className="price-label">Precio</span>
                        <span className="price-amount">${product.price.toFixed(2)} <small>MXN</small></span>
                      </div>

                      <div className="product-card-actions">
                        <button
                          className="btn btn-primary btn-sm-view"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/producto/${product.slug}`);
                          }}
                        >
                          Ver Detalles
                        </button>
                        <button
                          className="btn btn-cart-quick"
                          title="Agregar al carrito"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                        >
                          🛒
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
