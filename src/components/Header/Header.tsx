import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X, User as UserIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { totalItems, openCart } = useCart();
  const { currentUser, isAuthenticated, openAuthModal, openAccountModal } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleHomeClick = () => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.documentElement.scrollTo?.({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleNavClick = (path: string) => {
    setMobileOpen(false);
    if (window.location.pathname === path) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      document.documentElement.scrollTo?.({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const handleAccountClick = () => {
    setMobileOpen(false);
    if (isAuthenticated) {
      openAccountModal();
    } else {
      openAuthModal('login');
    }
  };

  const userFirstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Mi Cuenta';

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/" className="logo-link" onClick={handleHomeClick}>
            <div className="logo-brand-mark">
              <span className="logo-letter">M</span>
              <div className="logo-accent-line"></div>
            </div>
            <div className="logo-text-group">
              <h2 className="logo-title">Megatrol</h2>
              <span className="logo-subline">LÍNEA VETERINARIA</span>
            </div>
          </Link>
        </div>

        {/* Mobile backdrop */}
        {mobileOpen && (
          <div 
            className="mobile-backdrop" 
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}

        <nav className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {/* Mobile User Card at top of drawer */}
          <div className="mobile-user-section">
            {isAuthenticated && currentUser ? (
              <button 
                type="button" 
                className="mobile-user-card"
                onClick={handleAccountClick}
              >
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="mobile-user-avatar" />
                ) : (
                  <div className="mobile-user-avatar-placeholder">
                    {currentUser.name.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="mobile-user-details">
                  <strong>{currentUser.name}</strong>
                  <span>Ver mis pedidos y perfil →</span>
                </div>
              </button>
            ) : (
              <button 
                type="button" 
                className="mobile-login-btn"
                onClick={handleAccountClick}
              >
                <UserIcon size={18} />
                <span>Iniciar Sesión / Crear Cuenta</span>
              </button>
            )}
          </div>

          <NavLink to="/" end onClick={handleHomeClick}>Inicio</NavLink>
          <NavLink to="/tienda" onClick={() => handleNavClick('/tienda')}>Tienda</NavLink>
          <NavLink to="/ciencia" onClick={() => handleNavClick('/ciencia')}>Nuestra Ciencia</NavLink>
          <NavLink to="/blog" onClick={() => handleNavClick('/blog')}>Blog</NavLink>
          <NavLink to="/nosotros" onClick={() => handleNavClick('/nosotros')}>Conoce a Inobazz</NavLink>
          <NavLink to="/distribuidores" onClick={() => handleNavClick('/distribuidores')}>Distribuidores</NavLink>
        </nav>

        <div className="header-actions">
          {/* Account Button */}
          <button 
            type="button"
            className="header-account-btn" 
            onClick={handleAccountClick}
            aria-label={isAuthenticated ? `Mi Cuenta (${currentUser?.name})` : "Iniciar Sesión"}
            title={isAuthenticated ? `Mi Cuenta (${currentUser?.name})` : "Iniciar Sesión"}
          >
            {isAuthenticated && currentUser ? (
              <div className="header-user-pill">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="header-avatar-mini" />
                ) : (
                  <span className="header-avatar-initial">
                    {currentUser.name.slice(0, 1).toUpperCase()}
                  </span>
                )}
                <span className="header-username-text">{userFirstName}</span>
              </div>
            ) : (
              <div className="header-guest-pill">
                <UserIcon size={18} />
                <span className="header-guest-text">Iniciar Sesión</span>
              </div>
            )}
          </button>

          {/* Cart Button */}
          <button className="cart-btn" aria-label="Carrito de compras" onClick={() => { setMobileOpen(false); openCart(); }}>
            <ShoppingCart size={24} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>

          {/* Mobile menu toggle */}
          <button 
            className="mobile-menu-btn" 
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"} 
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
