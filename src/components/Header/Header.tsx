import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
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

        <nav className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <NavLink to="/" end onClick={() => setMobileOpen(false)}>Inicio</NavLink>
          <NavLink to="/tienda" onClick={() => setMobileOpen(false)}>Tienda</NavLink>
          <NavLink to="/ciencia" onClick={() => setMobileOpen(false)}>Nuestra Ciencia</NavLink>
          <NavLink to="/blog" onClick={() => setMobileOpen(false)}>Blog</NavLink>
          <NavLink to="/nosotros" onClick={() => setMobileOpen(false)}>Conoce a Inobazz</NavLink>
          <NavLink to="/distribuidores" onClick={() => setMobileOpen(false)}>Distribuidores</NavLink>
        </nav>

        <div className="header-actions">
          <button className="cart-btn" aria-label="Carrito de compras" onClick={() => navigate('/carrito')}>
            <ShoppingCart size={24} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
          <button className="mobile-menu-btn" aria-label="Menú" onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
