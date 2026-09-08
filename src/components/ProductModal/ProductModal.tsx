import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Package,
  ShieldCheck,
  PawPrint,
  Star,
  Clock,
  Sparkles,
  FlaskConical,
  CheckCircle2,
  MessageCircle,
  ShoppingCart,
  Zap,
  CreditCard,
  Store,
  Truck,
  FileText,
  Leaf,
  AlertCircle
} from 'lucide-react';
import { type Product, parsePresentations } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './ProductModal.css';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedPresentation, setSelectedPresentation] = useState<string>('');
  const [selectedAroma, setSelectedAroma] = useState<string>('');

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      const presList = parsePresentations(product.presentation);
      setSelectedPresentation(presList.length > 0 ? presList[0] : '');
      const aromasList = product.aromas || [];
      setSelectedAroma(aromasList.length > 0 ? aromasList[0] : '');
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const presentations = parsePresentations(product.presentation);
  const aromas = product.aromas || [];

  const activeImage =
    (selectedAroma && product.aromaImages?.[selectedAroma]) ||
    (selectedPresentation && product.presentationImages?.[selectedPresentation]) ||
    product.image;

  const isNoImagePresentation =
    (!product.presentationImages || !product.presentationImages[selectedPresentation]) &&
    (selectedPresentation.toLowerCase().includes('galón') ||
     selectedPresentation.toLowerCase().includes('galon'));

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedPresentation, selectedAroma, true);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 400);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedPresentation, selectedAroma, false);
    onClose();
    navigate('/carrito');
  };

  const currentPriceRaw =
    selectedPresentation && product.presentationPrices?.[selectedPresentation] !== undefined
      ? product.presentationPrices[selectedPresentation]
      : product.price;

  const isPricePending =
    currentPriceRaw === 'pendiente' ||
    currentPriceRaw === 'Pendiente' ||
    currentPriceRaw === null ||
    currentPriceRaw === 0;

  return (
    <div 
      className="product-modal-backdrop" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="product-modal-close" 
          onClick={onClose} 
          aria-label="Cerrar detalles del producto"
          title="Cerrar (Esc)"
        >
          <X size={22} />
        </button>

        {/* Modal Scrollable Content */}
        <div className="product-modal-body">
          {/* Top Section: Media + Key Details */}
          <div className="product-modal-top-grid">
            {/* Left: Product Image & Badges */}
            <div className="product-modal-image-col">
              <div className="product-modal-img-wrap">
                {product.tag && <span className="product-modal-tag">{product.tag}</span>}
                {isNoImagePresentation ? (
                  <div className="no-image-placeholder-modal">
                    <Package size={40} />
                    <p className="no-image-modal-title">{product.name}</p>
                    <small>Presentación: <strong>{selectedPresentation}</strong></small>
                    <span className="no-image-modal-note">Sin imagen para esta presentación</span>
                  </div>
                ) : (
                  <img src={activeImage} alt={product.name} className="product-modal-main-img" />
                )}
              </div>

              {/* Specs Pills */}
              <div className="product-modal-specs-summary">
                {product.species && (
                  <span className="spec-pill">
                    <PawPrint size={13} />
                    <span><strong>Especies:</strong> {product.species}</span>
                  </span>
                )}
                {product.presentation && (
                  <span className="spec-pill">
                    <Package size={13} />
                    <span><strong>Presentación:</strong> {selectedPresentation || product.presentation}</span>
                  </span>
                )}
                {aromas.length > 0 && selectedAroma && (
                  <span className="spec-pill">
                    <Sparkles size={13} />
                    <span><strong>Aroma:</strong> {selectedAroma}</span>
                  </span>
                )}
              </div>

              <div className="product-modal-security-note">
                <ShieldCheck size={16} />
                <span>Compra 100% segura · Respaldo de Laboratorio Inobazz</span>
              </div>
            </div>

            {/* Right: Info, Price, Selectors, Actions */}
            <div className="product-modal-info-col">
              <div className="product-modal-category-bar">
                <span className="product-modal-line">{product.line}</span>
                {product.species && (
                  <span className="product-modal-species-badge">
                    <PawPrint size={12} />
                    <span>{product.species}</span>
                  </span>
                )}
              </div>

              <h2 id="product-modal-title" className="product-modal-title">{product.name}</h2>

              {/* Stars & Social Proof */}
              <div className="product-modal-rating">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span className="rating-count">(48 reseñas verificadas)</span>
              </div>

              {/* Price Banner */}
              <div className="product-modal-price-display">
                {isPricePending ? (
                  <div className="pending-price-tag-modal">
                    <Clock size={20} />
                    <span>Precio Pendiente · Próximamente</span>
                  </div>
                ) : (
                  <div className="price-row-modal">
                    <span className="price-current-modal">
                      ${typeof currentPriceRaw === 'number' ? currentPriceRaw.toFixed(2) : product.price.toFixed(2)}
                      <small> MXN</small>
                    </span>
                    {product.id === 5 && <span className="original-price-modal">$877.00 MXN</span>}
                    {product.tag === 'Oferta' && <span className="discount-badge-modal">¡Ahorra 32%!</span>}
                  </div>
                )}
              </div>

              <p className="product-modal-desc">{product.longDesc}</p>

              {/* Presentation Selector */}
              {presentations.length > 1 && (
                <div className="modal-selector-section">
                  <span className="modal-selector-label">
                    <Package size={14} />
                    <span>Selecciona la Presentación:</span>
                  </span>
                  <div className="modal-options-row">
                    {presentations.map((pres) => {
                      const isSelected = selectedPresentation === pres;
                      return (
                        <button
                          key={pres}
                          type="button"
                          className={`modal-option-chip ${isSelected ? 'active' : ''}`}
                          onClick={() => setSelectedPresentation(pres)}
                        >
                          <span className="chip-indicator"></span>
                          <span>{pres}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Aroma Selector */}
              {aromas.length > 0 && (
                <div className="modal-selector-section">
                  <span className="modal-selector-label">
                    <Sparkles size={14} />
                    <span>Selecciona la Fragancia / Aroma:</span>
                  </span>
                  <div className="modal-options-row">
                    {aromas.map((aroma) => {
                      const isSelected = selectedAroma === aroma;
                      return (
                        <button
                          key={aroma}
                          type="button"
                          className={`modal-option-chip aroma-chip ${isSelected ? 'active' : ''}`}
                          onClick={() => setSelectedAroma(aroma)}
                        >
                          <span>{aroma}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions & Quantity */}
              {isPricePending ? (
                <div className="modal-actions-box">
                  <div className="pending-notice-modal">
                    <AlertCircle size={16} />
                    <span>Precio pendiente para {selectedPresentation}. Consúltanos directamente por WhatsApp:</span>
                  </div>
                  <a
                    href={`https://wa.me/525536206854?text=Hola,%20quisiera%20consultar%20el%20precio%20de%20${encodeURIComponent(product.name)}%20en%20presentación%20${encodeURIComponent(selectedPresentation)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn-whatsapp"
                  >
                    <MessageCircle size={18} />
                    <span>Consultar Precio por WhatsApp</span>
                  </a>
                </div>
              ) : (
                <div className="modal-actions-box">
                  <div className="modal-purchase-controls">
                    <div className="modal-quantity-control">
                      <button 
                        type="button" 
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button 
                        type="button" 
                        onClick={() => setQuantity(q => q + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      type="button" 
                      className="btn-modal-buy" 
                      onClick={handleBuyNow}
                    >
                      <Zap size={16} />
                      <span>Comprar Ahora</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    className={`btn-modal-cart ${added ? 'added' : ''}`}
                    onClick={handleAddToCart}
                  >
                    {added ? (
                      <>
                        <CheckCircle2 size={18} />
                        <span>¡Añadido al Carrito!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        <span>Añadir al Carrito</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Payment Methods & Shipping */}
              <div className="modal-payment-strip">
                <div className="payment-strip-item">
                  <CreditCard size={15} />
                  <span>Tarjetas / SPEI</span>
                </div>
                <div className="payment-strip-item">
                  <Store size={15} />
                  <span>OXXO Pay</span>
                </div>
                <div className="payment-strip-item">
                  <Truck size={15} />
                  <span>Envío Gratis desde $599</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Full Technical & Veterinary Details */}
          <div className="product-modal-extended-details">
            <div className="modal-tabs-header">
              <h3>Ficha Técnica e Indicaciones Veterinarias</h3>
              <p>Información completa formulada por el equipo científico de Inobazz Pharma.</p>
            </div>

            <div className="modal-specs-grid">
              {/* Technical Attributes */}
              <div className="modal-spec-card">
                <div className="modal-spec-card-title">
                  <Package size={18} />
                  <h4>Especificaciones Básicas</h4>
                </div>
                <ul className="modal-spec-list">
                  {product.presentation && (
                    <li><strong>Presentaciones:</strong> <span>{product.presentation}</span></li>
                  )}
                  {product.administration && (
                    <li><strong>Vía de administración:</strong> <span>{product.administration}</span></li>
                  )}
                  {product.species && (
                    <li><strong>Especies recomendadas:</strong> <span>{product.species}</span></li>
                  )}
                  {product.line && (
                    <li><strong>Línea farmacéutica:</strong> <span>{product.line}</span></li>
                  )}
                </ul>
              </div>

              {/* Benefits */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="modal-spec-card">
                  <div className="modal-spec-card-title">
                    <CheckCircle2 size={18} />
                    <h4>Beneficios y Propiedades</h4>
                  </div>
                  <ul className="modal-benefits-list">
                    {product.benefits.map((b, i) => (
                      <li key={i}>
                        <CheckCircle2 size={14} className="benefit-check" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Therapeutic Indications */}
              {product.indications && (
                <div className="modal-spec-card">
                  <div className="modal-spec-card-title">
                    <FileText size={18} />
                    <h4>Indicaciones Terapéuticas</h4>
                  </div>
                  <p className="modal-spec-text">{product.indications}</p>
                </div>
              )}

              {/* Mode of Use / Dosage */}
              {product.howToUse && (
                <div className="modal-spec-card">
                  <div className="modal-spec-card-title">
                    <FlaskConical size={18} />
                    <h4>Modo de Uso y Dosificación</h4>
                  </div>
                  <p className="modal-spec-text">{product.howToUse}</p>
                </div>
              )}

              {/* Formula */}
              {product.formula && (
                <div className="modal-spec-card full-span">
                  <div className="modal-spec-card-title">
                    <Leaf size={18} />
                    <h4>Composición y Fórmula Activa</h4>
                  </div>
                  <p className="modal-spec-text">{product.formula}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
