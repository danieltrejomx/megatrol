import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
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

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/" className="logo-link" onClick={() => setMobileOpen(false)}>
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
          <NavLink to="/" end onClick={() => setMobileOpen(false)}>Inicio</NavLink>
          <NavLink to="/tienda" onClick={() => setMobileOpen(false)}>Tienda</NavLink>
          <NavLink to="/ciencia" onClick={() => setMobileOpen(false)}>Nuestra Ciencia</NavLink>
          <NavLink to="/blog" onClick={() => setMobileOpen(false)}>Blog</NavLink>
          <NavLink to="/nosotros" onClick={() => setMobileOpen(false)}>Conoce a Inobazz</NavLink>
          <NavLink to="/distribuidores" onClick={() => setMobileOpen(false)}>Distribuidores</NavLink>

          <div className="mobile-menu-footer">
            <Link to="/tienda" className="btn btn-primary mobile-menu-cta" onClick={() => setMobileOpen(false)}>
              <span>Ver Catálogo Completo</span>
              <ArrowRight size={16} />
            </Link>
            <a 
              href="https://wa.me/525536206854?text=Hola,%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20los%20productos%20Megatrol" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mobile-menu-wa"
              onClick={() => setMobileOpen(false)}
            >
              <MessageCircle size={16} />
              <span>Atención por WhatsApp</span>
            </a>
          </div>
        </nav>

        <div className="header-actions">
          <button className="cart-btn" aria-label="Carrito de compras" onClick={() => { setMobileOpen(false); navigate('/carrito'); }}>
            <ShoppingCart size={24} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
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
