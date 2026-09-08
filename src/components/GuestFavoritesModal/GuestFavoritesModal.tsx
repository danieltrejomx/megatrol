import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  X, 
  ShoppingCart, 
  Zap, 
  Trash2, 
  ArrowRight, 
  UserCheck, 
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { products, parsePresentations } from '../../data/products';
import './GuestFavoritesModal.css';

export const GuestFavoritesModal: React.FC = () => {
  const { 
    favorites, 
    toggleFavorite, 
    isGuestFavoritesOpen, 
    closeGuestFavorites, 
    openAuthModal 
  } = useAuth();

  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [addedIds, setAddedIds] = useState<{ [id: number]: boolean }>({});

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isGuestFavoritesOpen) {
        closeGuestFavorites();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGuestFavoritesOpen, closeGuestFavorites]);

  // Lock body scroll when open
  useEffect(() => {
    if (isGuestFavoritesOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isGuestFavoritesOpen]);

  if (!isGuestFavoritesOpen) return null;

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  const handleAddToCart = (prod: typeof products[0]) => {
    const presList = parsePresentations(prod.presentation);
    const defaultPres = presList.length > 0 ? presList[0] : undefined;
    const defaultAroma = prod.aromas && prod.aromas.length > 0 ? prod.aromas[0] : undefined;

    addToCart(prod, 1, defaultPres, defaultAroma, true);
    setAddedIds(prev => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [prod.id]: false }));
    }, 1500);
  };

  const handleBuyNow = (prod: typeof products[0]) => {
    const presList = parsePresentations(prod.presentation);
    const defaultPres = presList.length > 0 ? presList[0] : undefined;
    const defaultAroma = prod.aromas && prod.aromas.length > 0 ? prod.aromas[0] : undefined;

    addToCart(prod, 1, defaultPres, defaultAroma, false);
    closeGuestFavorites();
    navigate('/carrito');
  };

  const handleExploreShop = () => {
    closeGuestFavorites();
    navigate('/tienda');
  };

  const handleLoginToSync = () => {
    closeGuestFavorites();
    openAuthModal('login');
  };

  return createPortal(
    <div 
      className="guest-fav-backdrop" 
      onClick={closeGuestFavorites} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="guest-fav-title"
    >
      <div className="guest-fav-card" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="guest-fav-header">
          <div className="guest-fav-header-info">
            <div className="guest-fav-icon-pill">
              <Heart size={18} fill="#f43f5e" color="#f43f5e" />
              <span>Modo Invitado</span>
            </div>
            <h2 id="guest-fav-title" className="guest-fav-title">Mis Productos Favoritos</h2>
            <p className="guest-fav-subtitle">
              Guardados en este dispositivo para comprar sin cuenta. Si deseas verlos en otros equipos, puedes iniciar sesión.
            </p>
          </div>
          <button 
            type="button"
            className="guest-fav-close" 
            onClick={closeGuestFavorites}
            aria-label="Cerrar favoritos"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="guest-fav-body">
          {favoriteProducts.length === 0 ? (
            <div className="guest-fav-empty">
              <div className="guest-fav-empty-icon">
                <Heart size={44} color="#94a3b8" />
              </div>
              <h3>Aún no has guardado productos en favoritos</h3>
              <p>
                Toca el corazón en cualquier producto del catálogo o carrusel para guardarlo aquí y consultarlo cuando desees comprar sin necesidad de registrarte.
              </p>
              <button 
                type="button" 
                className="btn-guest-fav-explore" 
                onClick={handleExploreShop}
              >
                <span>Explorar Tienda y Catálogo</span>
                <ArrowRight size={17} />
              </button>
            </div>
          ) : (
            <>
              {/* Product Grid */}
              <div className="guest-fav-grid">
                {favoriteProducts.map(prod => {
                  const presList = parsePresentations(prod.presentation);
                  const firstPres = presList.length > 0 ? presList[0] : '';
                  const price = firstPres && prod.presentationPrices?.[firstPres] !== undefined
                    ? prod.presentationPrices[firstPres]
                    : prod.price;
                  const isPending = price === 'pendiente' || price === 0 || price === null;
                  const isAdded = addedIds[prod.id];

                  return (
                    <div key={prod.id} className="guest-fav-item">
                      <div 
                        className="guest-fav-img-wrap"
                        onClick={() => {
                          closeGuestFavorites();
                          navigate(`/producto/${prod.slug}`);
                        }}
                        style={{ cursor: 'pointer' }}
                        title={`Ver detalles de ${prod.name}`}
                      >
                        <img src={prod.image} alt={prod.name} className="guest-fav-img" />
                        <button
                          type="button"
                          className="guest-fav-remove-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(prod.id);
                          }}
                          title="Eliminar de favoritos"
                          aria-label={`Eliminar ${prod.name} de favoritos`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="guest-fav-details">
                        <span className="guest-fav-line">{prod.line}</span>
                        <h4 
                          className="guest-fav-name"
                          onClick={() => {
                            closeGuestFavorites();
                            navigate(`/producto/${prod.slug}`);
                          }}
                          style={{ cursor: 'pointer' }}
                          title={`Ver detalles de ${prod.name}`}
                        >
                          {prod.name}
                        </h4>
                        <div className="guest-fav-specs">
                          {prod.species && <span className="guest-spec-tag">🐾 {prod.species}</span>}
                          {firstPres && <span className="guest-spec-tag">📦 {firstPres}</span>}
                        </div>

                        <div className="guest-fav-price-row">
                          {isPending ? (
                            <span className="guest-price-pending">Precio Pendiente</span>
                          ) : (
                            <span className="guest-price-val">
                              ${typeof price === 'number' ? price.toFixed(2) : prod.price.toFixed(2)}
                              <small> MXN</small>
                            </span>
                          )}
                        </div>

                        <div className="guest-fav-actions">
                          <button
                            type="button"
                            className={`btn-guest-add-cart ${isAdded ? 'added' : ''}`}
                            onClick={() => handleAddToCart(prod)}
                          >
                            {isAdded ? (
                              <>
                                <CheckCircle2 size={15} />
                                <span>¡Añadido!</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart size={15} />
                                <span>Añadir</span>
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            className="btn-guest-buy-now"
                            onClick={() => handleBuyNow(prod)}
                          >
                            <Zap size={15} />
                            <span>Comprar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sync Account Banner */}
              <div className="guest-fav-sync-card">
                <div className="guest-fav-sync-content">
                  <div className="guest-fav-sync-icon">
                    <UserCheck size={22} />
                  </div>
                  <div>
                    <strong>¿Prefieres sincronizar tus favoritos en una cuenta?</strong>
                    <p>Inicia sesión o regístrate en segundos para conservar tus productos guardados en cualquier celular o computadora.</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-guest-sync-login"
                  onClick={handleLoginToSync}
                >
                  <span>Iniciar Sesión / Crear Cuenta</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default GuestFavoritesModal;
