import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  X, 
  Trash2, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Zap,
  Sparkles,
  Package,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { getAromaEmoji, parsePresentations } from '../../data/products';
import './CartDrawer.css';

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    updateItemVariant,
    totalItems, 
    totalPrice, 
    isCartOpen, 
    closeCart 
  } = useCart();
  
  const navigate = useNavigate();

  // Bloqueo de scroll cuando el drawer está activo
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  const freeShippingThreshold = 599;
  const isFreeShipping = totalPrice >= freeShippingThreshold;
  const amountRemaining = Math.max(0, freeShippingThreshold - totalPrice);
  const progressPercent = Math.min(100, (totalPrice / freeShippingThreshold) * 100);
  const shippingCost = items.length > 0 ? (isFreeShipping ? 0 : 99) : 0;
  const grandTotal = totalPrice + shippingCost;

  const handleGoToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleGoToCart = () => {
    closeCart();
    navigate('/carrito');
  };

  const handleExploreShop = () => {
    closeCart();
    navigate('/tienda');
  };

  return (
    <>
      {/* Backdrop oscuro translúcido */}
      <div 
        className={`cart-drawer-backdrop ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel lateral deslizable desde la derecha */}
      <aside 
        className={`cart-drawer ${isCartOpen ? 'open' : ''}`}
        aria-label="Carrito de compras lateral"
        role="dialog"
        aria-modal="true"
      >
        {/* Cabecera del Drawer */}
        <div className="cart-drawer-header">
          <div className="drawer-header-title">
            <div className="drawer-header-icon">
              <ShoppingCart size={20} />
            </div>
            <h3>Tu Carrito</h3>
            <span className="drawer-header-count">
              {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
            </span>
          </div>

          <button 
            type="button" 
            className="drawer-close-btn"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            title="Cerrar (Esc)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Barra de Progreso para Envío Gratis */}
        {items.length > 0 && (
          <div className={`drawer-shipping-notice ${isFreeShipping ? 'free' : ''}`}>
            <div className="shipping-notice-text">
              <Truck size={17} className="shipping-truck-icon" />
              {isFreeShipping ? (
                <span>¡Excelente! Tienes <strong>Envío Gratis</strong> a todo México 🎉</span>
              ) : (
                <span>
                  Te faltan <strong>${amountRemaining.toFixed(2)} MXN</strong> para <strong>Envío Gratis</strong>
                </span>
              )}
            </div>
            <div className="shipping-progress-track">
              <div 
                className="shipping-progress-fill" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Lista de productos o estado vacío */}
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="drawer-empty-icon-wrap">
                <ShoppingCart size={46} strokeWidth={1.4} />
              </div>
              <h4>Tu carrito está vacío</h4>
              <p>Agrega productos antiparasitarios ecológicos y protege a tu mascota.</p>
              <button 
                type="button"
                className="btn btn-primary drawer-empty-btn"
                onClick={handleExploreShop}
              >
                <span>Explorar Tienda</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="drawer-items-list">
              {items.map((item) => {
                const { product, quantity, selectedPresentation, selectedAroma, unitPrice, activeImage } = item;
                const currentPrice = unitPrice ?? product.price;
                const currentImg = activeImage || product.image;
                const availablePresentations = parsePresentations(product.presentation);
                const availableAromas = product.aromas || [];

                return (
                  <div key={item.id} className="drawer-item-card">
                    <div className="drawer-item-thumb">
                      <img src={currentImg} alt={product.name} />
                    </div>

                    <div className="drawer-item-details">
                      <div className="drawer-item-top">
                        <h4 className="drawer-item-name">{product.name}</h4>
                        <button
                          type="button"
                          className="drawer-item-delete"
                          onClick={() => removeFromCart(item.id)}
                          title="Eliminar del carrito"
                          aria-label={`Eliminar ${product.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {/* Variantes y selector de presentación / aroma */}
                      <div className="drawer-item-variants">
                        {availablePresentations.length > 1 ? (
                          <div className="drawer-variant-selector-wrapper" title="Cambiar presentación">
                            <Package size={11} className="drawer-select-icon" />
                            <select
                              className="drawer-variant-select"
                              value={selectedPresentation || availablePresentations[0]}
                              onChange={(e) => updateItemVariant(item.id, e.target.value, selectedAroma)}
                              aria-label={`Cambiar presentación de ${product.name}`}
                            >
                              {availablePresentations.map((pres) => {
                                const presPrice = product.presentationPrices?.[pres];
                                const priceLabel = typeof presPrice === 'number' ? ` ($${presPrice.toLocaleString('es-MX')} MXN)` : '';
                                return (
                                  <option key={pres} value={pres}>
                                    {pres}{priceLabel}
                                  </option>
                                );
                              })}
                            </select>
                            <ChevronDown size={10} className="drawer-select-arrow" />
                          </div>
                        ) : selectedPresentation ? (
                          <span className="drawer-variant-tag">
                            <Package size={11} />
                            <span>{selectedPresentation}</span>
                          </span>
                        ) : null}

                        {availableAromas.length > 1 ? (
                          <div className="drawer-variant-selector-wrapper aroma" title="Cambiar aroma">
                            <Sparkles size={11} className="drawer-select-icon" />
                            <select
                              className="drawer-variant-select"
                              value={selectedAroma || availableAromas[0]}
                              onChange={(e) => updateItemVariant(item.id, selectedPresentation, e.target.value)}
                              aria-label={`Cambiar aroma de ${product.name}`}
                            >
                              {availableAromas.map((aroma) => (
                                <option key={aroma} value={aroma}>
                                  {getAromaEmoji(aroma)} {aroma}
                                </option>
                              ))}
                            </select>
                            <ChevronDown size={10} className="drawer-select-arrow" />
                          </div>
                        ) : selectedAroma ? (
                          <span className="drawer-variant-tag aroma">
                            <Sparkles size={11} />
                            <span>{getAromaEmoji(selectedAroma)} {selectedAroma}</span>
                          </span>
                        ) : null}
                      </div>

                      <div className="drawer-item-bottom">
                        {/* Selector de cantidad compacto */}
                        <div className="drawer-qty-control">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                            disabled={quantity <= 1}
                            aria-label="Disminuir cantidad"
                          >
                            −
                          </button>
                          <span className="drawer-qty-value">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, quantity + 1)}
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>

                        {/* Precios */}
                        <div className="drawer-item-price-block">
                          <span className="drawer-item-total">
                            ${(currentPrice * quantity).toFixed(2)} MXN
                          </span>
                          {quantity > 1 && (
                            <span className="drawer-item-unit">
                              ${currentPrice.toFixed(2)} c/u
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer con Resumen y Acciones */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="drawer-summary-lines">
              <div className="drawer-summary-row">
                <span>Subtotal:</span>
                <span className="summary-val">${totalPrice.toFixed(2)} MXN</span>
              </div>
              <div className="drawer-summary-row">
                <span>Envío estimado:</span>
                <span className={`summary-val ${isFreeShipping ? 'free-tag' : ''}`}>
                  {isFreeShipping ? 'GRATIS' : `$${shippingCost.toFixed(2)} MXN`}
                </span>
              </div>
              <div className="drawer-summary-row total-row">
                <span>Total a pagar:</span>
                <span className="summary-val-total">${grandTotal.toFixed(2)} MXN</span>
              </div>
            </div>

            <div className="drawer-footer-actions">
              <button 
                type="button" 
                className="btn btn-drawer-checkout"
                onClick={handleGoToCheckout}
              >
                <Zap size={18} />
                <span>Proceder al Pago — ${grandTotal.toFixed(2)}</span>
              </button>

              <button 
                type="button" 
                className="btn btn-drawer-view-cart"
                onClick={handleGoToCart}
              >
                <ShoppingCart size={16} />
                <span>Ver Carrito Completo</span>
              </button>

              <button 
                type="button"
                className="drawer-continue-btn"
                onClick={closeCart}
              >
                <span>Continuar Comprando</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="drawer-trust-banner">
              <ShieldCheck size={14} />
              <span>Compra 100% segura • Garantía Inobazz Pharma</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
