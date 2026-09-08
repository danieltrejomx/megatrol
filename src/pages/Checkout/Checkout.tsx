import { useState, useEffect } from 'react';
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
  Copy,
  User as UserIcon,
  Loader2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { markProductsAsPurchased } from '../../data/reviews';
import { MEGATROL_BANK_DETAILS } from '../../data/bankDetails';
import { lookupPostalCode, MEXICAN_STATES } from '../../services/postalCodeService';
import './Checkout.css';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { currentUser, isAuthenticated, openAuthModal, addOrder } = useAuth();
  const navigate = useNavigate();
  const shipping = totalPrice >= 599 ? 0 : 99;
  const total = totalPrice + shipping;

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'oxxo' | 'transfer'>('card');
  const [copiedClabe, setCopiedClabe] = useState(false);
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', telefono: '',
    calle: '', colonia: '', ciudad: '', estado: '', cp: '',
  });
  const [cpLoading, setCpLoading] = useState(false);
  const [cpSuccess, setCpSuccess] = useState(false);
  const [availableColonias, setAvailableColonias] = useState<string[]>([]);
  const [manualColonia, setManualColonia] = useState(false);

  // Auto-fill from authenticated user profile
  useEffect(() => {
    if (currentUser) {
      const nameParts = currentUser.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      setForm(prev => ({
        ...prev,
        nombre: prev.nombre || firstName,
        apellido: prev.apellido || lastName,
        email: prev.email || currentUser.email,
        telefono: prev.telefono || currentUser.phone || '',
        calle: prev.calle || currentUser.address?.calle || '',
        colonia: prev.colonia || currentUser.address?.colonia || '',
        ciudad: prev.ciudad || currentUser.address?.ciudad || '',
        estado: prev.estado || currentUser.address?.estado || '',
        cp: prev.cp || currentUser.address?.cp || '',
      }));
    }
  }, [currentUser]);

  const handleCpChange = async (newCp: string) => {
    const clean = newCp.replace(/\D/g, '').slice(0, 5);
    setForm(prev => ({ ...prev, cp: clean }));
    setCpSuccess(false);

    if (clean.length === 5) {
      setCpLoading(true);
      try {
        const result = await lookupPostalCode(clean);
        if (result) {
          setForm(prev => ({
            ...prev,
            cp: clean,
            estado: result.estado || prev.estado,
            ciudad: result.ciudad || prev.ciudad,
            colonia: result.colonias.length === 1 ? result.colonias[0] : (prev.colonia || result.colonias[0] || ''),
          }));
          setAvailableColonias(result.colonias);
          setManualColonia(false);
          setCpSuccess(true);
        }
      } catch {
        // Silent fallback
      } finally {
        setCpLoading(false);
      }
    } else {
      setAvailableColonias([]);
    }
  };

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
    const formattedDate = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
    const orderItems = items.map(it => ({
      name: it.product.name,
      qty: it.quantity,
      price: it.unitPrice ?? it.product.price,
      variant: [it.selectedAroma, it.selectedPresentation].filter(Boolean).join(' • ')
    }));

    const orderData = {
      orderNumber,
      customerName: `${form.nombre} ${form.apellido}`.trim(),
      email: form.email,
      phone: form.telefono,
      total,
      shipping,
      paymentMethod,
      items: orderItems,
      date: formattedDate,
      status: 'Confirmado' as const,
      address: {
        calle: form.calle,
        colonia: form.colonia,
        ciudad: form.ciudad,
        estado: form.estado,
        cp: form.cp
      }
    };

    // Save into authenticated user profile if logged in
    if (isAuthenticated && currentUser) {
      addOrder(orderData);
    }

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
          {/* Account Status / Login Banner */}
          {isAuthenticated && currentUser ? (
            <div className="checkout-auth-banner checkout-auth-logged">
              <div className="checkout-auth-info">
                <CheckCircle2 size={20} className="checkout-auth-icon-success" />
                <div>
                  <strong>Comprando como {currentUser.name}</strong>
                  <p>Tus datos de contacto y dirección de envío se cargaron automáticamente desde tu cuenta.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="checkout-auth-banner checkout-auth-guest">
              <div className="checkout-auth-info">
                <UserIcon size={20} className="checkout-auth-icon-info" />
                <div>
                  <strong>¿Ya tienes una cuenta Megatrol?</strong>
                  <p>Inicia sesión para autocompletar tu dirección y guardar este pedido en tu historial.</p>
                </div>
              </div>
              <button 
                type="button" 
                className="checkout-auth-btn"
                onClick={() => openAuthModal('login')}
              >
                Iniciar Sesión
              </button>
            </div>
          )}

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
            
            <div className="form-row" style={{ alignItems: 'flex-start' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>C.P. *</span>
                  {cpLoading && (
                    <span className="cp-badge-loading">
                      <Loader2 size={12} className="cp-spin" /> Buscando...
                    </span>
                  )}
                  {cpSuccess && (
                    <span className="cp-badge-success">
                      <Check size={12} /> Detectado
                    </span>
                  )}
                </div>
                <input
                  name="cp"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ej. 03940"
                  maxLength={5}
                  required
                  value={form.cp}
                  onChange={e => handleCpChange(e.target.value)}
                />
              </div>

              <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Colonia *</span>
                  {availableColonias.length > 0 && (
                    <button
                      type="button"
                      className="cp-toggle-colonia-btn"
                      onClick={() => setManualColonia(!manualColonia)}
                    >
                      {manualColonia ? 'Elegir de lista' : 'Escribir otra'}
                    </button>
                  )}
                </div>
                {availableColonias.length > 0 && !manualColonia ? (
                  <select
                    name="colonia"
                    required
                    value={form.colonia}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona tu colonia</option>
                    {availableColonias.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    name="colonia"
                    placeholder="Colonia *"
                    required
                    value={form.colonia}
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>

            <div className="form-row">
              <input name="ciudad" placeholder="Ciudad / Municipio *" required value={form.ciudad} onChange={handleChange} />
              <select name="estado" required value={form.estado} onChange={handleChange}>
                <option value="">Estado *</option>
                {MEXICAN_STATES.map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment */}
          <div className="form-section">
            <h2>
              <CreditCard size={20} />
              <span>Método de Pago</span>
            </h2>
            <div className="payment-methods">
              {/* Option 1: Tarjeta de Crédito / Débito */}
              <div className={`payment-method-group ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <div className="payment-option-body">
                    <div className="payment-option-title">
                      <CreditCard size={18} />
                      <strong>Tarjeta de Crédito / Débito</strong>
                    </div>
                    <span>Visa, Mastercard, Amex</span>
                  </div>
                </label>

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
              </div>

              {/* Option 2: Pago en OXXO */}
              <div className={`payment-method-group ${paymentMethod === 'oxxo' ? 'selected' : ''}`}>
                <label className={`payment-option ${paymentMethod === 'oxxo' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="oxxo"
                    checked={paymentMethod === 'oxxo'}
                    onChange={() => setPaymentMethod('oxxo')}
                  />
                  <div className="payment-option-body">
                    <div className="payment-option-title">
                      <Store size={18} />
                      <strong>Pago en OXXO</strong>
                    </div>
                    <span>Recibirás un código de referencia</span>
                  </div>
                </label>

                {paymentMethod === 'oxxo' && (
                  <div className="oxxo-info">
                    <p>
                      <CheckCircle2 size={16} />
                      <span>Al confirmar tu pedido recibirás un <strong>código de pago</strong> en tu correo. Tienes <strong>48 horas</strong> para realizar el pago en cualquier OXXO.</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Option 3: Transferencia / SPEI */}
              <div className={`payment-method-group ${paymentMethod === 'transfer' ? 'selected' : ''}`}>
                <label className={`payment-option ${paymentMethod === 'transfer' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={paymentMethod === 'transfer'}
                    onChange={() => setPaymentMethod('transfer')}
                  />
                  <div className="payment-option-body">
                    <div className="payment-option-title">
                      <Building2 size={18} />
                      <strong>Transferencia / SPEI</strong>
                    </div>
                    <span>Envío confirmado al recibir pago</span>
                  </div>
                </label>

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
                        <strong className="bank-beneficiary-name">{MEGATROL_BANK_DETAILS.beneficiary}</strong>
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
