import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './Shop.css';

const lines = [
  { key: 'all', label: '🌟 Todos los Productos' },
  { key: 'Línea Megatrol', label: '🌿 Línea Megatrol (Antiparasitarios)' },
  { key: 'Grandes Especies', label: '🐄 Grandes Especies (Bovinos, Equinos)' },
  { key: 'Pequeñas Especies', label: '🐕 Pequeñas Especies (Perros y Gatos)' },
  { key: 'Línea Aves', label: '🐓 Línea Aves (Aves de Corral y Combate)' },
  { key: 'Línea Urbanidad', label: '✨ Línea Urbanidad (Plagas y Sanitización)' },
  { key: 'Higiene y Salud', label: '👑 Higiene & Salud (Personal y Médico)' },
];

const Shop = () => {
  const [selectedLine, setSelectedLine] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const filteredProducts = products.filter(product => {
    const matchesLine = selectedLine === 'all' || product.line === selectedLine;
    const matchesSearch = searchTerm.trim() === '' ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.species && product.species.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesLine && matchesSearch;
  });

  return (
    <div className="shop-page container">
      {/* Header Banner */}
      <div className="shop-header">
        <span className="shop-badge">Catálogo Oficial Inobazz Pharma</span>
        <h1>Catálogo de Productos</h1>
        <p>Soluciones ecológicas, nutricionales y farmacéuticas de grado veterinario para la salud y bienestar animal.</p>
        
        {/* Search Bar */}
        <div className="shop-search-bar">
          <input
            type="text"
            placeholder="Buscar por nombre, ingrediente o especie (ej. equinos, spray, neem)..."
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
            <h3>Líneas de Producto</h3>
            <div className="filter-buttons">
              {lines.map((l) => (
                <button
                  key={l.key}
                  className={`filter-btn ${selectedLine === l.key ? 'active' : ''}`}
                  onClick={() => setSelectedLine(l.key)}
                >
                  <span>{l.label}</span>
                  <span className="count-badge">
                    {l.key === 'all'
                      ? products.length
                      : products.filter(p => p.line === l.key).length}
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
            {selectedLine !== 'all' && (
              <button className="reset-filter-btn" onClick={() => setSelectedLine('all')}>
                Mostrar todos ✕
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-products-found">
              <span className="no-products-icon">🔍</span>
              <h3>No se encontraron productos</h3>
              <p>Intenta con otro término de búsqueda o selecciona otra categoría.</p>
              <button className="btn btn-primary" onClick={() => { setSelectedLine('all'); setSearchTerm(''); }}>
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
