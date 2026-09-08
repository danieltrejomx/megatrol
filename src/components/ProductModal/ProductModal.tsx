import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  AlertCircle,
  Lock,
  UserCheck,
  Heart,
  Share2,
  Check
} from 'lucide-react';
import { type Product, parsePresentations } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import {
  getReviewsForProduct,
  addReviewToProduct,
  hasUserPurchasedProduct,
  verifyPastPurchase,
  type Review
} from '../../data/reviews';
import './ProductModal.css';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedPresentation, setSelectedPresentation] = useState<string>('');
  const [selectedAroma, setSelectedAroma] = useState<string>('');

  // Reviews and tab state
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hasPurchased, setHasPurchased] = useState<boolean>(false);
  const [isWritingReview, setIsWritingReview] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [authorCity, setAuthorCity] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewPresentation, setReviewPresentation] = useState('');
  const [formSubmittedSuccess, setFormSubmittedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const reviewsSectionRef = useRef<HTMLDivElement>(null);

  const handleShareProduct = async () => {
    if (!product) return;
    const url = `${window.location.origin}/producto/${product.slug}`;
    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: `${product.name} | Megatrol`,
          text: product.desc,
          url: url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2400);
      } catch {
        // Fallback
      }
    }
  };

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      const presList = parsePresentations(product.presentation);
      setSelectedPresentation(presList.length > 0 ? presList[0] : '');
      const aromasList = product.aromas || [];
      setSelectedAroma(aromasList.length > 0 ? aromasList[0] : '');
      setQuantity(1);
      setAdded(false);

      // Reviews & purchase status
      const prodReviews = getReviewsForProduct(product.id);
      setReviews(prodReviews);
      setHasPurchased(hasUserPurchasedProduct(product.id));
      setIsWritingReview(false);
      setFormSubmittedSuccess(false);
      setVerifyCode('');
      setVerifyError('');
      setReviewPresentation(presList.length > 0 ? presList[0] : '');
      setActiveTab('specs');
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
    navigate('/carrito');
  };

  const handleGoToReviews = () => {
    setActiveTab('reviews');
    setTimeout(() => {
      reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  const handleVerifyPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    if (!verifyCode.trim()) {
      setVerifyError('Por favor ingresa tu número de pedido o correo.');
      return;
    }
    const success = verifyPastPurchase(verifyCode, product.id);
    if (success) {
      setHasPurchased(true);
      setVerifyError('');
      setIsWritingReview(true);
    } else {
      setVerifyError('Ingresa al menos 4 caracteres (ej. Nº de pedido MEG-1234 o tu correo registrado).');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    if (!authorName.trim() || !reviewTitle.trim() || !reviewComment.trim()) {
      alert('Por favor completa tu nombre, título y comentario.');
      return;
    }

    const created = addReviewToProduct(product.id, {
      author: authorName,
      city: authorCity,
      rating: newRating,
      title: reviewTitle,
      comment: reviewComment,
      presentation: reviewPresentation || selectedPresentation || undefined
    });

    setReviews([created, ...reviews]);
    setFormSubmittedSuccess(true);
    setIsWritingReview(false);
    setAuthorName('');
    setAuthorCity('');
    setReviewTitle('');
    setReviewComment('');
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const currentPriceRaw =
    selectedPresentation && product.presentationPrices?.[selectedPresentation] !== undefined
      ? product.presentationPrices[selectedPresentation]
      : product.price;

  const isPricePending =
    currentPriceRaw === 'pendiente' ||
    currentPriceRaw === 'Pendiente' ||
    currentPriceRaw === null ||
    currentPriceRaw === 0;

  return createPortal(
    <div 
      className="product-modal-backdrop" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Header Actions (Favorite, Share & Close) */}
        <div className="product-modal-top-actions">
          <button
            type="button"
            className={`product-modal-share-btn ${copiedLink ? 'copied' : ''}`}
            onClick={handleShareProduct}
            aria-label="Copiar o compartir enlace de este producto"
            title={copiedLink ? "¡Enlace copiado al portapapeles!" : "Compartir o copiar enlace de este producto"}
          >
            {copiedLink ? <Check size={18} color="#059669" /> : <Share2 size={18} color="#475569" />}
            {copiedLink && <span className="share-copied-badge">¡Copiado!</span>}
          </button>
          <button
            type="button"
            className={`product-modal-fav-btn ${isFavorite(product.id) ? 'active' : ''}`}
            onClick={() => toggleFavorite(product.id)}
            aria-label={isFavorite(product.id) ? "Quitar de favoritos" : "Guardar en favoritos"}
            title={isFavorite(product.id) ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            <Heart size={20} fill={isFavorite(product.id) ? "#f43f5e" : "none"} color={isFavorite(product.id) ? "#f43f5e" : "#475569"} />
          </button>
          <button 
            className="product-modal-close" 
            onClick={onClose} 
            aria-label="Cerrar detalles del producto"
            title="Cerrar (Esc)"
          >
            <X size={22} />
          </button>
        </div>

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
                <button
                  type="button"
                  className="product-modal-link-pill"
                  onClick={handleShareProduct}
                  title="Copiar enlace directo de este producto"
                >
                  <Share2 size={11} />
                  <span>{copiedLink ? '¡Enlace copiado!' : `/producto/${product.slug}`}</span>
                </button>
              </div>

              <h2 id="product-modal-title" className="product-modal-title">{product.name}</h2>

              {/* Stars & Social Proof - Clickable to open reviews */}
              <button
                type="button"
                className="product-modal-rating clickable"
                onClick={handleGoToReviews}
                title="Ver las opiniones verificadas de este producto"
              >
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span className="rating-count">({reviews.length} reseñas verificadas)</span>
                <span className="view-reviews-link">Ver opiniones ↓</span>
              </button>

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
                      const presPrice = product.presentationPrices?.[pres];
                      const priceLabel = typeof presPrice === 'number' ? ` ($${presPrice.toLocaleString('es-MX')} MXN)` : '';
                      return (
                        <button
                          key={pres}
                          type="button"
                          className={`modal-option-chip ${isSelected ? 'active' : ''}`}
                          onClick={() => setSelectedPresentation(pres)}
                        >
                          <span className="chip-indicator"></span>
                          <span>{pres}{priceLabel}</span>
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

          {/* Bottom Section: Tabs for Technical Specs & Verified Reviews */}
          <div className="product-modal-extended-details" ref={reviewsSectionRef}>
            {/* Tabs Navigation */}
            <div className="modal-tabs-navigation" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'specs'}
                className={`modal-nav-tab ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                <FileText size={17} />
                <span>Ficha Técnica e Indicaciones</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'reviews'}
                className={`modal-nav-tab ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                <Star size={17} className="star-tab-icon" />
                <span>Reseñas Verificadas ({reviews.length})</span>
                <span className="rating-pill-tab">{avgRating} ★</span>
              </button>
            </div>

            {/* TAB 1: Specs & Veterinary Info */}
            {activeTab === 'specs' && (
              <div className="modal-tab-content-panel">
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
            )}

            {/* TAB 2: Verified Reviews & Purchase Verification */}
            {activeTab === 'reviews' && (
              <div className="modal-tab-content-panel reviews-tab-panel">
                {/* Summary Score Card */}
                <div className="reviews-summary-card">
                  <div className="reviews-score-col">
                    <span className="reviews-big-number">{avgRating}</span>
                    <div className="stars-row big">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <span className="reviews-summary-sub">
                      Basado en {reviews.length} opiniones verificadas
                    </span>
                  </div>

                  <div className="reviews-trust-col">
                    <div className="trust-badge-row">
                      <ShieldCheck size={24} className="trust-icon" />
                      <div>
                        <strong>Sistema de Calificaciones 100% Auténticas</strong>
                        <p>Solo clientes con compra confirmada pueden calificar y opinar sobre este producto.</p>
                      </div>
                    </div>
                  </div>

                  <div className="reviews-action-col">
                    <button
                      type="button"
                      className="btn-open-review-form"
                      onClick={() => setIsWritingReview(!isWritingReview)}
                    >
                      <Sparkles size={16} />
                      <span>{isWritingReview ? 'Cerrar formulario' : 'Escribir una Reseña'}</span>
                    </button>
                  </div>
                </div>

                {formSubmittedSuccess && (
                  <div className="review-success-banner">
                    <CheckCircle2 size={22} />
                    <div>
                      <strong>¡Muchas gracias por tu reseña!</strong>
                      <p>Tu opinión ha sido verificada y registrada correctamente.</p>
                    </div>
                  </div>
                )}

                {/* Form or Lock Card if writing review */}
                {isWritingReview && (
                  <div className="review-composer-wrapper">
                    {hasPurchased ? (
                      /* UNLOCKED: Review Form for verified buyers */
                      <form className="review-write-form" onSubmit={handleSubmitReview}>
                        <div className="review-form-header">
                          <UserCheck size={22} className="text-emerald" />
                          <div>
                            <h4>Tu opinión como comprador verificado</h4>
                            <p>Tu testimonio ayuda a otros tutores y veterinarios a proteger a sus animales.</p>
                          </div>
                        </div>

                        <div className="form-group-rating">
                          <label>Calificación general:</label>
                          <div className="interactive-stars-row">
                            {[1, 2, 3, 4, 5].map((star) => {
                              const isFilled = (hoverRating || newRating) >= star;
                              return (
                                <button
                                  key={star}
                                  type="button"
                                  className="star-btn"
                                  onMouseEnter={() => setHoverRating(star)}
                                  onMouseLeave={() => setHoverRating(0)}
                                  onClick={() => setNewRating(star)}
                                  aria-label={`Calificar con ${star} estrellas`}
                                >
                                  <Star
                                    size={28}
                                    fill={isFilled ? '#f59e0b' : 'none'}
                                    color={isFilled ? '#f59e0b' : '#cbd5e1'}
                                  />
                                </button>
                              );
                            })}
                            <span className="rating-verbal-score">
                              {newRating === 5 && '¡Excelente, lo recomiendo totalmente!'}
                              {newRating === 4 && 'Muy buen producto, efectivo'}
                              {newRating === 3 && 'Bueno, cumple su función'}
                              {newRating === 2 && 'Regular'}
                              {newRating === 1 && 'No cumplió mis expectativas'}
                            </span>
                          </div>
                        </div>

                        <div className="form-row-two-col">
                          <div className="form-field">
                            <label htmlFor="review-author">Nombre completo o alias *</label>
                            <input
                              id="review-author"
                              type="text"
                              required
                              placeholder="Ej. Dra. Laura Pérez o Juan R."
                              value={authorName}
                              onChange={(e) => setAuthorName(e.target.value)}
                            />
                          </div>
                          <div className="form-field">
                            <label htmlFor="review-city">Ciudad / Estado (opcional)</label>
                            <input
                              id="review-city"
                              type="text"
                              placeholder="Ej. Guadalajara, Jal."
                              value={authorCity}
                              onChange={(e) => setAuthorCity(e.target.value)}
                            />
                          </div>
                        </div>

                        {presentations.length > 0 && (
                          <div className="form-field">
                            <label htmlFor="review-pres">Presentación utilizada</label>
                            <select
                              id="review-pres"
                              value={reviewPresentation}
                              onChange={(e) => setReviewPresentation(e.target.value)}
                            >
                              {presentations.map((p) => (
                                <option key={p} value={p}>{p}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        <div className="form-field">
                          <label htmlFor="review-title">Título de tu opinión *</label>
                          <input
                            id="review-title"
                            type="text"
                            required
                            placeholder="Ej. Increíble efectividad en pocas horas"
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                          />
                        </div>

                        <div className="form-field">
                          <label htmlFor="review-comment">Tu experiencia detallada *</label>
                          <textarea
                            id="review-comment"
                            rows={4}
                            required
                            placeholder="¿Cómo reaccionó tu mascota? ¿En cuánto tiempo viste resultados? Comparte detalles para ayudar a otros tutores..."
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                          ></textarea>
                        </div>

                        <div className="review-form-actions">
                          <button
                            type="button"
                            className="btn-review-cancel"
                            onClick={() => setIsWritingReview(false)}
                          >
                            Cancelar
                          </button>
                          <button type="submit" className="btn-review-submit">
                            <CheckCircle2 size={16} />
                            <span>Publicar Reseña Verificada</span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* LOCKED: Non-buyer notice with verification */
                      <div className="review-purchase-lock-card">
                        <div className="lock-icon-circle">
                          <Lock size={28} />
                        </div>
                        <div className="lock-content">
                          <h4>Solo clientes que han comprado pueden dejar una reseña</h4>
                          <p>
                            En Megatrol garantizamos la veracidad absoluta de cada testimonio. Para evitar reseñas fraudulentas o no verificadas, únicamente los compradores con orden registrada pueden calificar.
                          </p>
                          
                          <div className="lock-split-actions">
                            {/* Option 1: Verify past order */}
                            <div className="lock-action-box verify-box">
                              <span className="lock-action-title">¿Ya compraste este producto anteriormente?</span>
                              <p className="lock-action-sub">
                                Ingresa tu Nº de Pedido (ej. <strong>MEG-12345</strong>) o el correo con el que realizaste tu compra:
                              </p>
                              <form onSubmit={handleVerifyPurchase} className="verify-input-row">
                                <input
                                  type="text"
                                  placeholder="Nº Pedido o Correo..."
                                  value={verifyCode}
                                  onChange={(e) => setVerifyCode(e.target.value)}
                                  className="verify-input"
                                />
                                <button type="submit" className="btn-verify-submit">
                                  Verificar compra
                                </button>
                              </form>
                              {verifyError && <p className="verify-error-msg">{verifyError}</p>}
                            </div>

                            {/* Option 2: Buy now */}
                            <div className="lock-action-box buy-box">
                              <span className="lock-action-title">¿Aún no lo pruebas?</span>
                              <p className="lock-action-sub">
                                Adquiere {product.name} hoy y experimenta el poder de la protección botánica de grado clínico.
                              </p>
                              <button
                                type="button"
                                className="btn-lock-buy-now"
                                onClick={handleAddToCart}
                              >
                                <ShoppingCart size={16} />
                                <span>Agregar al carrito y probar</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews List */}
                <div className="reviews-list-container">
                  <h4 className="reviews-list-heading">
                    Opiniones de clientes ({reviews.length})
                  </h4>

                  <div className="reviews-items-grid">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="review-item-card">
                        <div className="review-item-header">
                          <div className="review-author-meta">
                            <div className="review-avatar">
                              {rev.avatarInitials || rev.author.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="review-author-name-row">
                                <span className="review-author-name">{rev.author}</span>
                                {rev.verifiedPurchase && (
                                  <span className="review-verified-badge" title="Compra confirmada por el sistema">
                                    <CheckCircle2 size={12} />
                                    <span>Compra Verificada</span>
                                  </span>
                                )}
                              </div>
                              <div className="review-author-sub">
                                {rev.role && <span className="author-role">{rev.role} · </span>}
                                {rev.city && <span>{rev.city} · </span>}
                                <span>{rev.date}</span>
                              </div>
                            </div>
                          </div>

                          <div className="review-rating-stars">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={i < rev.rating ? '#f59e0b' : '#e2e8f0'}
                                color={i < rev.rating ? '#f59e0b' : '#cbd5e1'}
                              />
                            ))}
                          </div>
                        </div>

                        {rev.presentation && (
                          <div className="review-presentation-tag">
                            <Package size={12} />
                            <span>Presentación: {rev.presentation}</span>
                          </div>
                        )}

                        <h5 className="review-item-title">{rev.title}</h5>
                        <p className="review-item-comment">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
