import { useState, useEffect, type FormEvent } from 'react';
import { 
  X, 
  Package, 
  MapPin, 
  ShoppingCart, 
  LogOut, 
  CheckCircle2, 
  Truck, 
  ExternalLink, 
  Calendar,
  CreditCard,
  Building2,
  Store,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useAuth, type UserAddress } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './AccountModal.css';

const MEXICAN_STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 
  'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 
  'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 
  'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 
  'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

export const AccountModal = () => {
  const { 
    currentUser, 
    isAccountModalOpen, 
    closeAccountModal, 
    logout, 
    updateProfile 
  } = useAuth();
  
  const { items, totalPrice, openCart } = useCart();
  
  const [activeTab, setActiveTab] = useState<'orders' | 'address' | 'cart'>('orders');
  const [addressSavedToast, setAddressSavedToast] = useState(false);

  // Address form state
  const [addressForm, setAddressForm] = useState<UserAddress>({
    calle: '',
    colonia: '',
    ciudad: '',
    estado: '',
    cp: ''
  });
  const [phone, setPhone] = useState('');

  // Sync address form with user data
  useEffect(() => {
    if (currentUser) {
      if (currentUser.address) {
        setAddressForm(currentUser.address);
      }
      if (currentUser.phone) {
        setPhone(currentUser.phone);
      }
    }
  }, [currentUser]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAccountModalOpen) {
        closeAccountModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAccountModalOpen, closeAccountModal]);

  // Lock body scroll
  useEffect(() => {
    if (isAccountModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAccountModalOpen]);

  if (!isAccountModalOpen || !currentUser) return null;

  const handleAddressSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateProfile({
      phone,
      address: addressForm
    });
    setAddressSavedToast(true);
    setTimeout(() => setAddressSavedToast(false), 3000);
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getPaymentMethodLabel = (method: 'card' | 'oxxo' | 'transfer') => {
    switch (method) {
      case 'card':
        return { label: 'Tarjeta de Crédito / Débito', icon: <CreditCard size={15} /> };
      case 'oxxo':
        return { label: 'Efectivo en OXXO', icon: <Store size={15} /> };
      case 'transfer':
        return { label: 'Transferencia Banamex SPEI', icon: <Building2 size={15} /> };
    }
  };

  return (
    <div className="account-modal-backdrop" onClick={closeAccountModal} role="dialog" aria-modal="true">
      <div className="account-modal-container" onClick={e => e.stopPropagation()}>
        
        {/* Close Button */}
        <button 
          className="account-modal-close" 
          onClick={closeAccountModal}
          aria-label="Cerrar ventana de cuenta"
        >
          <X size={20} />
        </button>

        {/* User Card Header */}
        <div className="account-header">
          <div className="account-user-info">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="account-avatar-img" />
            ) : (
              <div className="account-avatar-placeholder">
                {getInitials(currentUser.name)}
              </div>
            )}
            <div className="account-user-meta">
              <div className="account-name-badge">
                <h2 className="account-user-name">{currentUser.name}</h2>
                <span className="account-role-tag">Cliente Megatrol</span>
              </div>
              <p className="account-user-email">{currentUser.email}</p>
              {currentUser.phone && (
                <p className="account-user-phone">📞 {currentUser.phone}</p>
              )}
            </div>
          </div>

          <button 
            type="button" 
            className="account-logout-btn" 
            onClick={logout}
            title="Cerrar sesión de esta cuenta"
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="account-tabs">
          <button
            type="button"
            className={`account-tab-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package size={18} />
            <span>Mis Pedidos</span>
            {currentUser.orders?.length > 0 && (
              <span className="account-tab-badge">{currentUser.orders.length}</span>
            )}
          </button>

          <button
            type="button"
            className={`account-tab-item ${activeTab === 'address' ? 'active' : ''}`}
            onClick={() => setActiveTab('address')}
          >
            <MapPin size={18} />
            <span>Dirección de Envío</span>
          </button>

          <button
            type="button"
            className={`account-tab-item ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            <ShoppingCart size={18} />
            <span>Carrito Guardado</span>
            {items.length > 0 && (
              <span className="account-tab-badge">{items.length}</span>
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="account-modal-body">
          
          {/* TAB 1: MIS PEDIDOS */}
          {activeTab === 'orders' && (
            <div className="account-orders-section">
              {(!currentUser.orders || currentUser.orders.length === 0) ? (
                <div className="account-empty-state">
                  <div className="empty-icon-wrap">
                    <Package size={40} />
                  </div>
                  <h3>No tienes pedidos registrados</h3>
                  <p>Cuando realices una compra con tu cuenta, podrás rastrear tus pedidos y descargar tus comprobantes aquí.</p>
                  <Link 
                    to="/tienda" 
                    className="account-primary-link" 
                    onClick={closeAccountModal}
                  >
                    <span>Ir a la Tienda</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              ) : (
                <div className="account-orders-list">
                  {currentUser.orders.map((order, idx) => {
                    const payInfo = getPaymentMethodLabel(order.paymentMethod);
                    const isBanamex = order.paymentMethod === 'transfer';
                    const waText = encodeURIComponent(
                      `Hola Distribuidora de Megatrol, quisiera dar seguimiento a mi pedido ${order.orderNumber} a nombre de ${order.customerName}.`
                    );

                    return (
                      <div key={order.orderNumber || idx} className="account-order-card">
                        <div className="order-card-header">
                          <div className="order-id-group">
                            <span className="order-number-title">Pedido {order.orderNumber}</span>
                            <span className="order-date">
                              <Calendar size={13} />
                              {order.date}
                            </span>
                          </div>
                          <div className="order-status-pill">
                            <span className="order-status-dot"></span>
                            {order.status || 'Confirmado'}
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="order-items-table">
                          {order.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="order-item-row">
                              <div className="order-item-info">
                                <span className="order-item-name">{item.name}</span>
                                {item.variant && (
                                  <span className="order-item-variant">{item.variant}</span>
                                )}
                              </div>
                              <div className="order-item-pricing">
                                <span className="order-item-qty">x{item.qty}</span>
                                <span className="order-item-price">
                                  ${(item.price * item.qty).toLocaleString('es-MX')} MXN
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer Details */}
                        <div className="order-summary-row">
                          <div className="order-meta-left">
                            <div className="order-payment-tag">
                              {payInfo.icon}
                              <span>{payInfo.label}</span>
                            </div>
                            {order.address && (
                              <div className="order-address-snippet">
                                <Truck size={13} />
                                <span>Envío a: {order.address.calle}, {order.address.ciudad}</span>
                              </div>
                            )}
                          </div>
                          <div className="order-total-block">
                            <span className="order-total-label">Total pagado:</span>
                            <span className="order-total-amount">
                              ${order.total.toLocaleString('es-MX')} MXN
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="order-actions-row">
                          <a
                            href={`https://wa.me/525536206854?text=${waText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="order-wa-btn"
                          >
                            <span>💬 {isBanamex ? 'Enviar comprobante por WhatsApp' : 'Consultar estatus por WhatsApp'}</span>
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MI DIRECCIÓN DE ENVÍO */}
          {activeTab === 'address' && (
            <form className="account-address-form" onSubmit={handleAddressSubmit}>
              <div className="address-banner">
                <Sparkles size={18} className="address-banner-icon" />
                <div>
                  <strong>Dirección Predeterminada</strong>
                  <p>Esta dirección se autocompletará en la pantalla de pago para agilizar tus futuras compras.</p>
                </div>
              </div>

              {addressSavedToast && (
                <div className="account-toast-success">
                  <CheckCircle2 size={18} />
                  <span>¡Dirección guardada exitosamente en tu perfil!</span>
                </div>
              )}

              <div className="account-form-grid">
                <div className="account-field-full">
                  <label htmlFor="acc-calle">Calle, Número Exterior e Interior *</label>
                  <input
                    id="acc-calle"
                    type="text"
                    placeholder="Ej. Av. Insurgentes Sur 1602, Piso 4"
                    value={addressForm.calle}
                    onChange={e => setAddressForm({ ...addressForm, calle: e.target.value })}
                    required
                  />
                </div>

                <div className="account-field-full">
                  <label htmlFor="acc-colonia">Colonia *</label>
                  <input
                    id="acc-colonia"
                    type="text"
                    placeholder="Ej. Crédito Constructor"
                    value={addressForm.colonia}
                    onChange={e => setAddressForm({ ...addressForm, colonia: e.target.value })}
                    required
                  />
                </div>

                <div className="account-field-half">
                  <label htmlFor="acc-ciudad">Ciudad / Municipio *</label>
                  <input
                    id="acc-ciudad"
                    type="text"
                    placeholder="Ej. Benito Juárez"
                    value={addressForm.ciudad}
                    onChange={e => setAddressForm({ ...addressForm, ciudad: e.target.value })}
                    required
                  />
                </div>

                <div className="account-field-half">
                  <label htmlFor="acc-cp">Código Postal (C.P.) *</label>
                  <input
                    id="acc-cp"
                    type="text"
                    placeholder="Ej. 03940"
                    maxLength={5}
                    value={addressForm.cp}
                    onChange={e => setAddressForm({ ...addressForm, cp: e.target.value })}
                    required
                  />
                </div>

                <div className="account-field-half">
                  <label htmlFor="acc-estado">Estado *</label>
                  <select
                    id="acc-estado"
                    value={addressForm.estado}
                    onChange={e => setAddressForm({ ...addressForm, estado: e.target.value })}
                    required
                  >
                    <option value="">Selecciona tu estado</option>
                    {MEXICAN_STATES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="account-field-half">
                  <label htmlFor="acc-phone">Teléfono de Entrega</label>
                  <input
                    id="acc-phone"
                    type="tel"
                    placeholder="Ej. 55 1234 5678"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="account-form-actions">
                <button type="submit" className="account-save-btn">
                  Guardar Cambios de Dirección
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: MI CARRITO GUARDADO */}
          {activeTab === 'cart' && (
            <div className="account-cart-section">
              {items.length === 0 ? (
                <div className="account-empty-state">
                  <div className="empty-icon-wrap">
                    <ShoppingCart size={40} />
                  </div>
                  <h3>Tu carrito está vacío</h3>
                  <p>Los productos que agregues a tu carrito se mantendrán sincronizados con tu cuenta.</p>
                  <Link 
                    to="/tienda" 
                    className="account-primary-link" 
                    onClick={closeAccountModal}
                  >
                    <span>Explorar Catálogo</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              ) : (
                <div className="account-cart-list">
                  <div className="account-cart-items">
                    {items.map(it => (
                      <div key={it.id} className="account-cart-item">
                        <img src={it.activeImage} alt={it.product.name} className="account-cart-thumb" />
                        <div className="account-cart-meta">
                          <h4>{it.product.name}</h4>
                          <span className="account-cart-variant">
                            {[it.selectedAroma, it.selectedPresentation].filter(Boolean).join(' • ') || 'Estándar'}
                          </span>
                          <span className="account-cart-qty">Cantidad: {it.quantity}</span>
                        </div>
                        <div className="account-cart-pricing">
                          <strong>${((it.unitPrice ?? it.product.price) * it.quantity).toLocaleString('es-MX')} MXN</strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="account-cart-checkout-box">
                    <div className="account-cart-subtotal">
                      <span>Total estimado:</span>
                      <strong>${totalPrice.toLocaleString('es-MX')} MXN</strong>
                    </div>
                    <div className="account-cart-actions">
                      <button 
                        type="button" 
                        className="account-cart-view-btn"
                        onClick={() => { closeAccountModal(); openCart(); }}
                      >
                        Abrir Carrito
                      </button>
                      <Link 
                        to="/checkout" 
                        className="account-checkout-btn"
                        onClick={closeAccountModal}
                      >
                        Proceder al Pago
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
