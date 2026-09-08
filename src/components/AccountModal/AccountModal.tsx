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
  ChevronDown,
  Sparkles,
  Heart,
  User,
  Pencil,
  Trash2,
  Check,
  MessageCircle
} from 'lucide-react';
import { useAuth, type UserAddress } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { products, parsePresentations, getAromaEmoji } from '../../data/products';
import { PRESET_AVATARS, UserAvatar } from '../../data/avatars';
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
    updateProfile,
    favorites,
    toggleFavorite
  } = useAuth();
  
  const { 
    items, 
    totalPrice, 
    openCart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    updateItemVariant 
  } = useCart();
  
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'profile' | 'address' | 'cart'>('orders');
  const [addressSavedToast, setAddressSavedToast] = useState(false);
  const [profileSavedToast, setProfileSavedToast] = useState(false);
  const [headerSaved, setHeaderSaved] = useState(false);

  // Address form state
  const [addressForm, setAddressForm] = useState<UserAddress>({
    calle: '',
    colonia: '',
    ciudad: '',
    estado: '',
    cp: ''
  });
  const [phone, setPhone] = useState('');

  // Profile form state (name, phone, preset avatar)
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAvatar, setEditAvatar] = useState('dog');

  // Sync address & profile form with user data
  useEffect(() => {
    if (currentUser) {
      if (currentUser.address) {
        setAddressForm(currentUser.address);
      }
      if (currentUser.phone) {
        setPhone(currentUser.phone);
        setEditPhone(currentUser.phone);
      }
      setEditName(currentUser.name || '');
      setEditAvatar(currentUser.avatar || 'dog');
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

  const handleSelectAvatar = (avatarId: string) => {
    setEditAvatar(avatarId);
    updateProfile({
      avatar: avatarId
    });
  };

  const handleProfileSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    updateProfile({
      name: editName.trim(),
      phone: editPhone.trim(),
      avatar: editAvatar
    });
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 3000);
  };

  const handleHeaderSave = () => {
    if (editName.trim()) {
      updateProfile({
        name: editName.trim(),
        phone: editPhone.trim(),
        avatar: editAvatar
      });
    }
    if (activeTab === 'address') {
      updateProfile({
        phone,
        address: addressForm
      });
      setAddressSavedToast(true);
      setTimeout(() => setAddressSavedToast(false), 3000);
    }
    setProfileSavedToast(true);
    setHeaderSaved(true);
    setTimeout(() => {
      setProfileSavedToast(false);
      setHeaderSaved(false);
    }, 2500);
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

  // Favorited products
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

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
            <div 
              className="account-avatar-wrapper" 
              onClick={() => setActiveTab('profile')} 
              title="Haz clic para cambiar tu avatar de perfil"
            >
              <UserAvatar avatarId={editAvatar || currentUser.avatar} name={editName || currentUser.name} size={68} />
              <span className="account-avatar-edit-badge" aria-label="Editar foto de perfil">
                <Pencil size={12} />
              </span>
            </div>

            <div className="account-user-meta">
              <div className="account-name-badge">
                <h2 className="account-user-name">{editName || currentUser.name}</h2>
                <span className="account-role-tag">Cliente Megatrol</span>
              </div>
              <p className="account-user-email">{currentUser.email}</p>
              {(editPhone || currentUser.phone) && (
                <p className="account-user-phone">📞 {editPhone || currentUser.phone}</p>
              )}
            </div>
          </div>

          <div className="account-header-actions">
            {activeTab === 'profile' ? (
              <button
                type="button"
                className={`account-header-save-btn ${headerSaved ? 'saved' : ''}`}
                onClick={handleHeaderSave}
                title="Guardar cambios de tu cuenta"
              >
                <Check size={14} />
                <span>{headerSaved ? '¡Guardado!' : 'Guardar Cambios'}</span>
              </button>
            ) : (
              <button
                type="button"
                className="account-header-edit-btn"
                onClick={() => setActiveTab('profile')}
                title="Editar nombre y foto de perfil"
              >
                <Pencil size={14} />
                <span>Editar Perfil</span>
              </button>
            )}
            <button 
              type="button" 
              className="account-logout-btn" 
              onClick={logout}
              title="Cerrar sesión de esta cuenta"
            >
              <LogOut size={15} />
              <span>Salir</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="account-tabs">
          <button
            type="button"
            className={`account-tab-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package size={17} />
            <span>Mis Pedidos</span>
            {currentUser.orders?.length > 0 && (
              <span className="account-tab-badge">{currentUser.orders.length}</span>
            )}
          </button>

          <button
            type="button"
            className={`account-tab-item ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <Heart size={17} />
            <span>Favoritos</span>
            {favorites.length > 0 && (
              <span className="account-tab-badge fav-badge">{favorites.length}</span>
            )}
          </button>

          <button
            type="button"
            className={`account-tab-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={17} />
            <span>Mi Perfil</span>
          </button>

          <button
            type="button"
            className={`account-tab-item ${activeTab === 'address' ? 'active' : ''}`}
            onClick={() => setActiveTab('address')}
          >
            <MapPin size={17} />
            <span>Dirección</span>
          </button>

          <button
            type="button"
            className={`account-tab-item ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            <ShoppingCart size={17} />
            <span>Carrito</span>
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

          {/* TAB 2: MIS FAVORITOS */}
          {activeTab === 'favorites' && (
            <div className="account-favorites-section">
              <div className="favorites-header-bar">
                <div className="favorites-header-text">
                  <h3>Mis Productos Guardados</h3>
                  <p>Guarda tus fórmulas Megatrol favoritas para tenerlas siempre a mano.</p>
                </div>
                <span className="favorites-counter-pill">
                  {favoriteProducts.length} {favoriteProducts.length === 1 ? 'producto' : 'productos'}
                </span>
              </div>

              {favoriteProducts.length === 0 ? (
                <div className="account-empty-state">
                  <div className="empty-icon-wrap fav-empty-wrap">
                    <Heart size={40} />
                  </div>
                  <h3>Aún no tienes productos en favoritos</h3>
                  <p>Explora nuestra tienda botánica y haz clic en el corazón de cualquier producto para guardarlo aquí.</p>
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
                <div className="account-favorites-grid">
                  {favoriteProducts.map(prod => (
                    <div key={prod.id} className="favorite-card">
                      <div className="favorite-card-img-wrap">
                        <img src={prod.image} alt={prod.name} className="favorite-card-img" />
                        <button
                          type="button"
                          className="favorite-card-remove"
                          onClick={() => toggleFavorite(prod.id)}
                          title="Quitar de favoritos"
                          aria-label="Quitar de favoritos"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="favorite-card-content">
                        <span className="favorite-card-line">{prod.line}</span>
                        <h4 className="favorite-card-title">{prod.name}</h4>
                        {prod.presentation && (
                          <span className="favorite-card-pres">{prod.presentation}</span>
                        )}
                        <div className="favorite-card-price">
                          ${prod.price.toFixed(2)} <small>MXN</small>
                        </div>

                        <div className="favorite-card-actions">
                          <button
                            type="button"
                            className="favorite-btn-add-cart"
                            onClick={() => {
                              addToCart(prod, 1);
                              openCart();
                              closeAccountModal();
                            }}
                          >
                            <ShoppingCart size={14} />
                            <span>Comprar</span>
                          </button>
                          <Link
                            to={`/tienda?producto=${prod.slug}`}
                            className="favorite-btn-details"
                            onClick={closeAccountModal}
                          >
                            Ver Detalles
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EDITAR MI PERFIL */}
          {activeTab === 'profile' && (
            <form className="account-profile-form" onSubmit={handleProfileSubmit}>

              {profileSavedToast && (
                <div className="account-toast-success">
                  <CheckCircle2 size={18} />
                  <span>¡Tu perfil y avatar han sido guardados con éxito!</span>
                </div>
              )}

              <div className="account-profile-grid">
                <div className="account-input-group">
                  <label htmlFor="edit-name" className="account-input-label">
                    <span>Nombre Completo</span>
                    <span className="account-required-star">*</span>
                  </label>
                  <div className="account-input-wrapper">
                    <User size={18} className="account-input-icon" />
                    <input
                      id="edit-name"
                      type="text"
                      className="account-input-field"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                </div>

                <div className="account-input-group">
                  <div className="account-label-row">
                    <label htmlFor="edit-phone" className="account-input-label">
                      <span>WhatsApp / Teléfono</span>
                    </label>
                    <span className="account-field-badge">
                      <MessageCircle size={11} /> WhatsApp
                    </span>
                  </div>
                  <div className="account-input-wrapper">
                    <MessageCircle size={18} className="account-input-icon whatsapp" />
                    <input
                      id="edit-phone"
                      type="tel"
                      className="account-input-field"
                      value={editPhone}
                      onChange={e => setEditPhone(e.target.value)}
                      placeholder="Ej. 55 1234 5678"
                    />
                  </div>
                  <span className="account-input-hint">
                    Para recibir confirmaciones y dar seguimiento a tus pedidos.
                  </span>
                </div>
              </div>

              <div className="account-field-full">
                <label className="avatar-section-title">Avatar</label>

                <div className="preset-avatars-grid">
                  {PRESET_AVATARS.map(avatar => {
                    const isSelected = editAvatar === avatar.id;
                    return (
                      <button
                        type="button"
                        key={avatar.id}
                        className={`preset-avatar-option ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectAvatar(avatar.id)}
                      >
                        <div 
                          className="preset-avatar-bubble"
                          style={{ background: avatar.bg, borderColor: avatar.border }}
                        >
                          {avatar.icon(38)}
                          {isSelected && (
                            <span className="preset-avatar-check">
                              <Check size={12} />
                            </span>
                          )}
                        </div>
                        <span className="preset-avatar-label">{avatar.name}</span>
                      </button>
                    );
                  })}

                  {/* Option: Initials */}
                  <button
                    type="button"
                    className={`preset-avatar-option ${editAvatar === 'initials' || !editAvatar ? 'selected' : ''}`}
                    onClick={() => handleSelectAvatar('initials')}
                  >
                    <div 
                      className="preset-avatar-bubble"
                      style={{ background: 'linear-gradient(135deg, #0084c7 0%, #0369a1 100%)', borderColor: '#0284c7' }}
                    >
                      <span style={{ color: '#fff', fontWeight: 800, fontSize: '18px' }}>
                        {(editName.slice(0, 2) || 'ME').toUpperCase()}
                      </span>
                      {(editAvatar === 'initials' || !editAvatar) && (
                        <span className="preset-avatar-check">
                          <Check size={12} />
                        </span>
                      )}
                    </div>
                    <span className="preset-avatar-label">Mis Iniciales</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 4: DIRECCIÓN DE ENVÍO */}
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
                    {items.map(it => {
                      const availablePresentations = parsePresentations(it.product.presentation);
                      const availableAromas = it.product.aromas || [];
                      const unitPrice = it.unitPrice ?? it.product.price;
                      const itemTotal = unitPrice * it.quantity;
                      const currentImg = it.activeImage || it.product.image;

                      return (
                        <div key={it.id} className="account-cart-item">
                          <img src={currentImg} alt={it.product.name} className="account-cart-thumb" />
                          <div className="account-cart-meta">
                            <div className="account-cart-item-header">
                              <h4 className="account-cart-item-title">{it.product.name}</h4>
                              <button
                                type="button"
                                className="account-cart-delete-btn"
                                onClick={() => removeFromCart(it.id)}
                                title="Eliminar producto"
                                aria-label={`Eliminar ${it.product.name} del carrito`}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>

                            {/* Selectores interactivos de presentación y aroma */}
                            <div className="account-cart-variants-selectors">
                              {availablePresentations.length > 1 ? (
                                <div className="account-variant-select-wrapper" title="Cambiar presentación">
                                  <Package size={12} className="account-variant-icon" />
                                  <select
                                    className="account-variant-select"
                                    value={it.selectedPresentation || availablePresentations[0]}
                                    onChange={(e) => updateItemVariant(it.id, e.target.value, it.selectedAroma)}
                                    aria-label={`Cambiar presentación de ${it.product.name}`}
                                  >
                                    {availablePresentations.map((pres) => {
                                      const presPrice = it.product.presentationPrices?.[pres];
                                      const priceLabel = typeof presPrice === 'number' ? ` ($${presPrice.toLocaleString('es-MX')} MXN)` : '';
                                      return (
                                        <option key={pres} value={pres}>
                                          {pres}{priceLabel}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  <ChevronDown size={11} className="account-variant-arrow" />
                                </div>
                              ) : it.selectedPresentation ? (
                                <span className="account-variant-tag">
                                  <Package size={11} />
                                  <span>{it.selectedPresentation}</span>
                                </span>
                              ) : null}

                              {availableAromas.length > 1 ? (
                                <div className="account-variant-select-wrapper aroma" title="Cambiar aroma">
                                  <Sparkles size={12} className="account-variant-icon" />
                                  <select
                                    className="account-variant-select"
                                    value={it.selectedAroma || availableAromas[0]}
                                    onChange={(e) => updateItemVariant(it.id, it.selectedPresentation, e.target.value)}
                                    aria-label={`Cambiar aroma de ${it.product.name}`}
                                  >
                                    {availableAromas.map((aroma) => (
                                      <option key={aroma} value={aroma}>
                                        {getAromaEmoji(aroma)} {aroma}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown size={11} className="account-variant-arrow" />
                                </div>
                              ) : it.selectedAroma ? (
                                <span className="account-variant-tag aroma">
                                  <Sparkles size={11} />
                                  <span>{getAromaEmoji(it.selectedAroma)} {it.selectedAroma}</span>
                                </span>
                              ) : null}
                            </div>

                            {/* Controles de cantidad y precio */}
                            <div className="account-cart-item-footer">
                              <div className="account-cart-qty-ctrl">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(it.id, it.quantity - 1)}
                                  disabled={it.quantity <= 1}
                                  aria-label="Disminuir cantidad"
                                  className="account-cart-qty-btn"
                                >
                                  −
                                </button>
                                <span className="account-cart-qty-val">{it.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(it.id, it.quantity + 1)}
                                  aria-label="Aumentar cantidad"
                                  className="account-cart-qty-btn"
                                >
                                  +
                                </button>
                              </div>

                              <div className="account-cart-pricing">
                                {it.quantity > 1 && (
                                  <span className="account-cart-unit-price">${unitPrice.toLocaleString('es-MX')} c/u</span>
                                )}
                                <strong className="account-cart-total-price">
                                  ${itemTotal.toLocaleString('es-MX')} MXN
                                </strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {(() => {
                    const freeShippingThreshold = 599;
                    const isFreeShipping = totalPrice >= freeShippingThreshold;
                    const shippingCost = items.length > 0 ? (isFreeShipping ? 0 : 99) : 0;
                    const grandTotal = totalPrice + shippingCost;
                    const amountRemaining = Math.max(0, freeShippingThreshold - totalPrice);

                    return (
                      <div className="account-cart-checkout-box">
                        <div className="account-cart-summary-breakdown">
                          <div className="account-summary-row">
                            <span className="account-summary-label">Subtotal:</span>
                            <span className="account-summary-value">${totalPrice.toLocaleString('es-MX')} MXN</span>
                          </div>
                          <div className="account-summary-row">
                            <span className="account-summary-label">
                              <Truck size={14} className="account-summary-truck" />
                              <span>Envío {isFreeShipping ? '(Gratis)' : 'Nacional'}:</span>
                            </span>
                            <span className={`account-summary-value ${isFreeShipping ? 'free' : ''}`}>
                              {isFreeShipping ? '¡Gratis!' : `$${shippingCost.toLocaleString('es-MX')} MXN`}
                            </span>
                          </div>
                          {!isFreeShipping && items.length > 0 && (
                            <div className="account-shipping-bar-notice">
                              Agrega <strong>${amountRemaining.toLocaleString('es-MX')} MXN</strong> más para <span>Envío Gratis</span>
                            </div>
                          )}
                          <div className="account-summary-row total">
                            <span className="account-summary-label">Total estimado:</span>
                            <strong className="account-summary-total">${grandTotal.toLocaleString('es-MX')} MXN</strong>
                          </div>
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
                    );
                  })()}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
