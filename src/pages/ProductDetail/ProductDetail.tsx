import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductBySlug } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

const parsePresentations = (presentationStr?: string): string[] => {
  if (!presentationStr) return [];
  const items = presentationStr
    .split(/,|\sy\s/gi)
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length > 0 ? items : [presentationStr];
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProductBySlug(slug || '');

  const presentations = parsePresentations(product?.presentation);
  const [selectedPresentation, setSelectedPresentation] = useState<string>('');
  
  const aromas = product?.aromas || [];
  const [selectedAroma, setSelectedAroma] = useState<string>('');

  // Set initial selected presentation when product loads
  if (product && !selectedPresentation && presentations.length > 0) {
    setSelectedPresentation(presentations[0]);
  }

  if (!product) {
    return (
      <div className="not-found container">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o ha sido movido.</p>
        <Link to="/tienda" className="btn btn-primary">Ver todos los productos</Link>
      </div>
    );
  }

  const activeImage =
    (selectedAroma && product.aromaImages?.[selectedAroma]) ||
    (selectedPresentation && product.presentationImages?.[selectedPresentation]) ||
    product.image;

  const isNoImagePresentation =
    selectedPresentation.toLowerCase().includes('galón') ||
    selectedPresentation.toLowerCase().includes('galon');

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/carrito');
  };

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb container">
        <Link to="/">Inicio</Link> / <Link to="/tienda">Tienda</Link> / <span>{product.line}</span> / <span>{product.name}</span>
      </div>

      <div className="container product-detail-container">
        {/* Left: Image */}
        <div className="product-image-section">
          <div className="product-main-image">
            {product.tag && <span className="product-tag-lg">{product.tag}</span>}
            {isNoImagePresentation ? (
              <div className="no-image-placeholder">
                <span className="no-image-icon">📦</span>
                <p className="no-image-title">{product.name}</p>
                <p className="no-image-subtitle">Presentación: <strong>{selectedPresentation}</strong></p>
                <small className="no-image-note">Sin imagen disponible para esta presentación</small>
              </div>
            ) : (
              <img src={activeImage} alt={product.name} className="product-detail-img" />
            )}
          </div>
          
          <div className="product-specs-summary">
            {product.species && (
              <div className="spec-badge">
                <strong>Especies:</strong> {product.species}
              </div>
            )}
            {product.presentation && (
              <div className="spec-badge">
                <strong>Presentación activa:</strong> {selectedPresentation || product.presentation}
              </div>
            )}
            {aromas.length > 0 && selectedAroma && (
              <div className="spec-badge">
                <strong>Aroma seleccionado:</strong> {selectedAroma}
              </div>
            )}
          </div>
          
          <p className="product-image-note">🔒 Compra 100% segura · Envío garantizado a toda la República</p>
        </div>

        {/* Right: Info */}
        <div className="product-info-section">
          <div className="product-header-badges">
            <span className="product-category-label">{product.line}</span>
            {product.species && <span className="species-pill">🐾 {product.species}</span>}
          </div>

          <h1>{product.name}</h1>

          <div className="product-rating">
            {'⭐'.repeat(5)}
            <span>(48 reseñas verificadas)</span>
          </div>

          <div className="product-price-display">
            <span className="current-price">${product.price.toFixed(2)} MXN</span>
            {product.id === 5 && <span className="original-price">$877.00 MXN</span>}
            {product.tag === 'Oferta' && <span className="discount-badge">¡Ahorra 32%!</span>}
          </div>

          <p className="product-description">{product.longDesc}</p>

          {/* Interactive Presentation Selector */}
          {presentations.length > 1 && (
            <div className="presentation-selector-block">
              <span className="presentation-selector-label">📦 Elige la Presentación:</span>
              <div className="presentation-buttons-group">
                {presentations.map((pres) => {
                  const isSelected = selectedPresentation === pres;
                  return (
                    <button
                      key={pres}
                      type="button"
                      className={`presentation-option-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedPresentation(pres)}
                    >
                      <span className="radio-dot"></span>
                      {pres}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Interactive Aroma Selector */}
          {aromas.length > 0 && (
            <div className="aroma-selector-block">
              <span className="aroma-selector-label">🌸 Elige el Aroma / Fragancia:</span>
              <div className="aroma-buttons-group">
                {aromas.map((aroma) => {
                  const isSelected = selectedAroma === aroma;
                  return (
                    <button
                      key={aroma}
                      type="button"
                      className={`aroma-option-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedAroma(aroma)}
                    >
                      {aroma}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Key Specs Card */}
          <div className="product-technical-specs">
            {product.presentation && (
              <div className="tech-spec-row">
                <span className="tech-spec-label">📦 Presentaciones:</span>
                <span className="tech-spec-val">{product.presentation}</span>
              </div>
            )}
            {product.administration && (
              <div className="tech-spec-row">
                <span className="tech-spec-label">💉 Vía de Administración:</span>
                <span className="tech-spec-val">{product.administration}</span>
              </div>
            )}
            {product.formula && (
              <div className="tech-spec-row">
                <span className="tech-spec-label">🔬 Fórmula Activa:</span>
                <span className="tech-spec-val">{product.formula}</span>
              </div>
            )}
          </div>

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="product-benefits">
              <h3>Beneficios y Propiedades Clave</h3>
              <ul>
                {product.benefits.map((b, i) => (
                  <li key={i}><span className="check">✅</span> {b}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="product-actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <button
              className={`btn btn-outline-primary add-to-cart-btn ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? '✅ ¡Agregado al Carrito!' : '🛒 Agregar al Carrito'}
            </button>

            <button className="btn btn-primary buy-now-btn" onClick={handleBuyNow}>
              ⚡ Comprar Ahora
            </button>
          </div>

          {/* Payment Info */}
          <div className="payment-info">
            <div className="payment-item">💳 Tarjetas de crédito / débito / SPEI</div>
            <div className="payment-item">🏪 Pago en OXXO Pay</div>
            <div className="payment-item">📦 Envío nacional 3-5 días hábiles</div>
            <div className="payment-item">🚚 Envío Gratis en pedidos desde $599</div>
          </div>
        </div>
      </div>

      {/* Extended Indications & How to Use Section */}
      <div className="how-to-use-section">
        <div className="container technical-details-grid">
          {product.indications && (
            <div className="tech-detail-card">
              <h2>📋 Indicaciones Terapéuticas</h2>
              <p>{product.indications}</p>
            </div>
          )}
          <div className="tech-detail-card">
            <h2>🧪 Modo de Uso y Dosificación</h2>
            <p>{product.howToUse}</p>
          </div>
          {product.formula && (
            <div className="tech-detail-card full-width">
              <h2>🌿 Composición y Fórmula Completa</h2>
              <p>{product.formula}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
