import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  FileText, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Store, 
  Building2, 
  Receipt, 
  Lock, 
  CheckCircle2,
  Copy
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { markProductsAsPurchased } from '../../data/reviews';
import { MEGATROL_BANK_DETAILS } from '../../data/bankDetails';
import './Checkout.css';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const shipping = totalPrice >= 599 ? 0 : 99;
  const total = totalPrice + shipping;

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'oxxo' | 'transfer'>('card');
  const [copiedClabe, setCopiedClabe] = useState(false);
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', telefono: '',
    calle: '', colonia: '', ciudad: '', estado: '', cp: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCopyClabe = () => {
    navigator.clipboard.writeText(MEGATROL_BANK_DETAILS.clabe);
    setCopiedClabe(true);
    setTimeout(() => setCopiedClabe(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length > 0) {
      markProductsAsPurchased(items.map(i => i.product.id));
    }
    const orderNumber = `MEG-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData = {
      orderNumber,
      customerName: `${form.nombre} ${form.apellido}`.trim(),
      email: form.email,
      phone: form.telefono,
      total,
      shipping,
      paymentMethod,
      items: items.map(it => ({
        name: it.product.name,
        qty: it.quantity,
        price: it.unitPrice ?? it.product.price,
        variant: [it.selectedAroma, it.selectedPresentation].filter(Boolean).join(' • ')
      })),
      date: new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    try {
      sessionStorage.setItem('megatrol_last_order', JSON.stringify(orderData));
    } catch (err) {
      console.warn(err);
    }
    clearCart();
    navigate('/orden-confirmada', { state: orderData });
  };

  return (
    <div className="checkout-page container">
      <div className="checkout-steps">
        <span className="step-done"><Check size={14} /> Carrito</span>
        <span className="step-arrow">→</span>
        <span className="step-active"><FileText size={14} /> Datos</span>
        <span className="step-arrow">→</span>
        <span className="step-pending"><ShieldCheck size={14} /> Confirmación</span>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        {/* Left: Form */}
        <div className="checkout-form">
          {/* Shipping */}
          <div className="form-section">
            <h2>
              <Truck size={20} />
              <span>Datos de Envío</span>
            </h2>
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
            <h2>
              <CreditCard size={20} />
              <span>Método de Pago</span>
            </h2>
            <div className="payment-methods">
              {([
                { key: 'card', label: 'Tarjeta de Crédito / Débito', sub: 'Visa, Mastercard, Amex', icon: CreditCard },
                { key: 'oxxo', label: 'Pago en OXXO', sub: 'Recibirás un código de referencia', icon: Store },
                { key: 'transfer', label: 'Transferencia / SPEI', sub: 'Envío confirmado al recibir pago', icon: Building2 },
              ] as const).map(m => {
                const Icon = m.icon;
                return (
                  <label key={m.key} className={`payment-option ${paymentMethod === m.key ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value={m.key}
                      checked={paymentMethod === m.key}
                      onChange={() => setPaymentMethod(m.key)}
                    />
                    <div className="payment-option-body">
                      <div className="payment-option-title">
                        <Icon size={18} />
                        <strong>{m.label}</strong>
                      </div>
                      <span>{m.sub}</span>
                    </div>
                  </label>
                );
              })}
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
                <p>
                  <CheckCircle2 size={16} />
                  <span>Al confirmar tu pedido recibirás un <strong>código de pago</strong> en tu correo. Tienes <strong>48 horas</strong> para realizar el pago en cualquier OXXO.</span>
                </p>
              </div>
            )}
            {paymentMethod === 'transfer' && (
              <div className="bank-transfer-details-card">
                <div className="bank-card-header">
                  <div className="bank-header-badge">
                    <Building2 size={20} />
                    <span>Datos para Transferencia / SPEI</span>
                  </div>
                  <span className="bank-guarantee-pill">Sin Comisiones · Inmediato</span>
                </div>

                <div className="bank-details-box">
                  <div className="bank-detail-row">
                    <span className="bank-label">Beneficiario / Titular:</span>
                    <div className="bank-value-group">
                      <strong className="bank-beneficiary-name">{MEGATROL_BANK_DETAILS.beneficiary}</strong>
                      <span className="bank-dist-tag">{MEGATROL_BANK_DETAILS.distributorName}</span>
                    </div>
                  </div>

                  <div className="bank-detail-row">
                    <span className="bank-label">Banco Destino:</span>
                    <strong className="bank-name-badge">{MEGATROL_BANK_DETAILS.bankName}</strong>
                  </div>

                  <div className="bank-detail-row clabe-row-highlight">
                    <span className="bank-label">CLABE Interbancaria (18 dígitos):</span>
                    <div className="clabe-code-container">
                      <code className="clabe-digits">{MEGATROL_BANK_DETAILS.clabe}</code>
                      <button
                        type="button"
                        className="btn-copy-clabe"
                        onClick={handleCopyClabe}
                        title="Copiar CLABE al portapapeles"
                      >
                        {copiedClabe ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedClabe ? '¡Copiada!' : 'Copiar CLABE'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="bank-detail-row">
                    <span className="bank-label">Monto exacto a transferir:</span>
                    <strong className="bank-amount-to-pay">${total.toFixed(2)} MXN</strong>
                  </div>

                  <div className="bank-detail-row">
                    <span className="bank-label">Concepto sugerido:</span>
                    <span className="bank-concept-hint">
                      {form.nombre ? `Pago ${form.nombre.trim()}` : 'Tu Nombre o Teléfono'}
                    </span>
                  </div>
                </div>

                <div className="bank-instructions-note">
                  <div className="bank-note-item">
                    <CheckCircle2 size={16} className="bank-check-icon" />
                    <span>Transfiere desde la app de tu banco favorito (BBVA, Banamex, Santander, Banorte, Mercado Pago, Nu, etc.).</span>
                  </div>
                  <div className="bank-note-item">
                    <CheckCircle2 size={16} className="bank-check-icon" />
                    <span>Al confirmar tu pedido obtendrás tu número de orden y botón directo para enviar tu comprobante por WhatsApp al <strong>(55) 3620 6854</strong>.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="checkout-summary">
          <h2>
            <Receipt size={20} />
            <span>Tu Pedido</span>
          </h2>
          <div className="checkout-items">
            {items.map((item) => {
              const variantTags = [item.selectedAroma, item.selectedPresentation].filter(Boolean);
              const variantLabel = variantTags.length > 0 ? variantTags.join(' • ') : null;
              const price = item.unitPrice ?? item.product.price;
              const img = item.activeImage || item.product.image;
              return (
                <div key={item.id} className="checkout-item">
                  <img src={img} alt={item.product.name} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '6px' }} />
                  <div className="checkout-item-detail">
                    <span>{item.product.name}</span>
                    {variantLabel && <small className="checkout-item-variant">{variantLabel}</small>}
                    <span className="checkout-item-qty">× {item.quantity}</span>
                  </div>
                  <span className="checkout-item-price">${(price * item.quantity).toFixed(2)}</span>
                </div>
              );
            })}
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
            <ShieldCheck size={18} />
            <span>Confirmar Pedido</span>
          </button>
          <p className="secure-text">
            <Lock size={14} />
            <span>Tus datos están protegidos con cifrado SSL</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
