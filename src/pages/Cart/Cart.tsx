import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Truck,
  Package 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { parsePresentations, getAromaEmoji } from '../../data/products';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, updateItemVariant, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart-empty container">
        <div className="cart-empty-icon-wrap">
          <ShoppingCart size={54} strokeWidth={1.5} />
        </div>
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos para comenzar tu compra.</p>
        <Link to="/tienda" className="btn btn-primary">Ver Productos</Link>
      </div>
    );
  }

  const shipping = totalPrice >= 599 ? 0 : 99;

  return (
    <div className="cart-page container">
      <h1>Tu Carrito <span>({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span></h1>

      <div className="cart-layout">
        {/* Items List */}
        <div className="cart-items">
          {items.map((item) => {
            const { product, quantity, selectedPresentation, selectedAroma, unitPrice, activeImage } = item;
            const presentations = parsePresentations(product.presentation);
            const aromas = product.aromas || [];
            const currentPres = selectedPresentation || presentations[0];
            const currentAroma = selectedAroma || aromas[0];
            const currentPrice = unitPrice ?? product.price;
            const currentImg = activeImage || product.image;

            return (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img
                    src={currentImg}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div className="cart-item-info">
                  <h3>{product.name}</h3>
                  <p className="cart-item-desc">{product.desc}</p>

                  {/* Selector de Aromas */}
                  {aromas.length > 0 && (
                    <div className="cart-variant-selector">
                      <span className="cart-variant-label">
                        <Sparkles size={13} />
                        <span>Aroma:</span>
                      </span>
                      <div className="cart-variant-pills">
                        {aromas.map((aroma) => {
                          const isSelected = currentAroma === aroma;
                          return (
                            <button
                              key={aroma}
                              type="button"
                              className={`cart-pill-btn ${isSelected ? 'active' : ''}`}
                              onClick={() => updateItemVariant(item.id, currentPres, aroma)}
                            >
                              <span className="pill-emoji">{getAromaEmoji(aroma)}</span>
                              <span>{aroma}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Selector de Presentaciones */}
                  {presentations.length > 1 && (
                    <div className="cart-variant-selector">
                      <span className="cart-variant-label">
                        <Package size={13} />
                        <span>Presentación:</span>
                      </span>
                      <div className="cart-variant-pills">
                        {presentations.map((pres) => {
                          const isSelected = currentPres === pres;
                          const presPrice = product.presentationPrices?.[pres];
                          const priceText = typeof presPrice === 'number' ? ` ($${presPrice})` : '';
                          return (
                            <button
                              key={pres}
                              type="button"
                              className={`cart-pill-btn ${isSelected ? 'active' : ''}`}
                              onClick={() => updateItemVariant(item.id, pres, currentAroma)}
                            >
                              <span>{pres}</span>
                              {priceText && <small className="pill-price-tag">{priceText}</small>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="cart-item-actions">
                    <div className="quantity-selector-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, quantity - 1)}
                        disabled={quantity <= 1}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, quantity + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={14} />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
                <div className="cart-item-price">
                  <span className="item-total">${(currentPrice * quantity).toFixed(2)}</span>
                  <span className="item-unit">${currentPrice.toFixed(2)} c/u</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Resumen del Pedido</h2>

          <div className="summary-lines">
            {items.map((item) => {
              const variantTags = [item.selectedAroma, item.selectedPresentation].filter(Boolean);
              const variantLabel = variantTags.length > 0 ? ` (${variantTags.join(' • ')})` : '';
              const price = item.unitPrice ?? item.product.price;
              return (
                <div key={item.id} className="summary-line">
                  <span>
                    {item.product.name}
                    {variantLabel && <small className="summary-variant-badge">{variantLabel}</small>}
                    {' '}× {item.quantity}
                  </span>
                  <span>${(price * item.quantity).toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          <div className="summary-divider" />

          <div className="summary-line">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Envío</span>
            <span className={shipping === 0 ? 'free-shipping' : ''}>
              {shipping === 0 ? '¡Gratis!' : `$${shipping}.00`}
            </span>
          </div>
          {shipping > 0 && (
            <p className="shipping-note">
              <Sparkles size={14} />
              <span>Agrega ${(599 - totalPrice).toFixed(2)} más para envío gratis</span>
            </p>
          )}

          <div className="summary-divider" />
          <div className="summary-line total-line">
            <span>Total</span>
            <span>${(totalPrice + shipping).toFixed(2)} MXN</span>
          </div>

          <button className="btn btn-primary checkout-btn" onClick={() => navigate('/checkout')}>
            Proceder al Pago →
          </button>

          <Link to="/tienda" className="continue-shopping">← Seguir comprando</Link>

          <div className="secure-badges">
            <span><ShieldCheck size={14} /> Pago seguro</span>
            <span><CreditCard size={14} /> Tarjeta / OXXO</span>
            <span><Truck size={14} /> Envío rastreable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
