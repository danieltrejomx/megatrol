import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const shipping = totalPrice >= 599 ? 0 : 99;
  const total = totalPrice + shipping;

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'oxxo' | 'transfer'>('card');
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', telefono: '',
    calle: '', colonia: '', ciudad: '', estado: '', cp: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate('/orden-confirmada');
  };

  return (
    <div className="checkout-page container">
      <div className="checkout-steps">
        <span className="step-done">✅ Carrito</span>
        <span className="step-arrow">→</span>
        <span className="step-active">📋 Datos</span>
        <span className="step-arrow">→</span>
        <span className="step-pending">✔️ Confirmación</span>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        {/* Left: Form */}
        <div className="checkout-form">
          {/* Shipping */}
          <div className="form-section">
            <h2>📦 Datos de Envío</h2>
            <div className="form-row">
              <input name="nombre" placeholder="Nombre *" required value={form.nombre} onChange={handleChange} />
              <input name="apellido" placeholder="Apellido *" required value={form.apellido} onChange={handleChange} />
            </div>
            <input name="email" type="email" placeholder="Correo electrónico *" required value={form.email} onChange={handleChange} />
            <input name="telefono" type="tel" placeholder="Teléfono / WhatsApp *" required value={form.telefono} onChange={handleChange} />
            <input name="calle" placeholder="Calle y número *" required value={form.calle} onChange={handleChange} />
            <input name="colonia" placeholder="Colonia *" required value={form.colonia} onChange={handleChange} />
            <div className="form-row">
              <input name="ciudad" placeholder="Ciudad *" required value={form.ciudad} onChange={handleChange} />
              <input name="cp" placeholder="C.P. *" required value={form.cp} onChange={handleChange} />
            </div>
            <select name="estado" required value={form.estado} onChange={handleChange}>
              <option value="">Estado *</option>
              {['Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Ciudad de México','Coahuila','Colima','Durango','Estado de México','Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora','Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'].map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>

          {/* Payment */}
          <div className="form-section">
            <h2>💳 Método de Pago</h2>
            <div className="payment-methods">
              {([
                { key: 'card', label: '💳 Tarjeta de Crédito / Débito', sub: 'Visa, Mastercard, Amex' },
                { key: 'oxxo', label: '🏪 Pago en OXXO', sub: 'Recibirás un código de referencia' },
                { key: 'transfer', label: '🏦 Transferencia / SPEI', sub: 'Envío confirmado al recibir pago' },
              ] as const).map(m => (
                <label key={m.key} className={`payment-option ${paymentMethod === m.key ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={m.key}
                    checked={paymentMethod === m.key}
                    onChange={() => setPaymentMethod(m.key)}
                  />
                  <div>
                    <strong>{m.label}</strong>
                    <span>{m.sub}</span>
                  </div>
                </label>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div className="card-fields">
                <input placeholder="Número de tarjeta *" maxLength={19} required />
                <div className="form-row">
                  <input placeholder="MM/AA *" maxLength={5} required />
                  <input placeholder="CVV *" maxLength={4} required />
                </div>
                <input placeholder="Nombre en la tarjeta *" required />
              </div>
            )}
            {paymentMethod === 'oxxo' && (
              <div className="oxxo-info">
                <p>✅ Al confirmar tu pedido recibirás un <strong>código de pago</strong> en tu correo. Tienes <strong>48 horas</strong> para realizar el pago en cualquier OXXO.</p>
              </div>
            )}
            {paymentMethod === 'transfer' && (
              <div className="oxxo-info">
                <p>🏦 Al confirmar tu pedido te enviaremos los datos de la cuenta bancaria. Tu pedido se procesará una vez confirmado el pago.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="checkout-summary">
          <h2>🧾 Tu Pedido</h2>
          <div className="checkout-items">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="checkout-item">
                <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '6px' }} />
                <div className="checkout-item-detail">
                  <span>{product.name}</span>
                  <span className="checkout-item-qty">× {quantity}</span>
                </div>
                <span className="checkout-item-price">${(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="checkout-totals">
            <div><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
            <div>
              <span>Envío</span>
              <span style={{ color: shipping === 0 ? 'var(--color-primary-dark)' : 'inherit', fontWeight: shipping === 0 ? 700 : 400 }}>
                {shipping === 0 ? '¡Gratis!' : `$${shipping}.00`}
              </span>
            </div>
            <div className="checkout-total-final">
              <span>Total</span><span>${total.toFixed(2)} MXN</span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary confirm-btn">
            ✅ Confirmar Pedido
          </button>
          <p className="secure-text">🔒 Tus datos están protegidos con cifrado SSL</p>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
