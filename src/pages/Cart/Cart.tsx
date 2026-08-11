import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart-empty container">
        <span className="cart-empty-icon">🛒</span>
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
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="cart-item">
              <div className="cart-item-image">
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div className="cart-item-info">
                <h3>{product.name}</h3>
                <p className="cart-item-desc">{product.desc}</p>
                <div className="cart-item-actions">
                  <div className="quantity-selector-sm">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(product.id)}>🗑️ Eliminar</button>
                </div>
              </div>
              <div className="cart-item-price">
                <span className="item-total">${(product.price * quantity).toFixed(2)}</span>
                <span className="item-unit">${product.price.toFixed(2)} c/u</span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Resumen del Pedido</h2>

          <div className="summary-lines">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="summary-line">
                <span>{product.name} × {quantity}</span>
                <span>${(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
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
            <p className="shipping-note">Agrega ${(599 - totalPrice).toFixed(2)} más para envío gratis 🎁</p>
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
            <span>🔒 Pago seguro</span>
            <span>💳 Tarjeta / OXXO</span>
            <span>📦 Envío rastreable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
