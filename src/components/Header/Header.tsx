import { Link, useNavigate } from 'react-router-dom';
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
          <Link to="/">
            <h2>Megatrol</h2>
          </Link>
        </div>

        <nav className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <Link to="/tienda" onClick={() => setMobileOpen(false)}>Tienda</Link>
          <Link to="/ciencia" onClick={() => setMobileOpen(false)}>Nuestra Ciencia</Link>
          <Link to="/blog" onClick={() => setMobileOpen(false)}>Blog</Link>
          <Link to="/nosotros" onClick={() => setMobileOpen(false)}>Conoce a Inobazz</Link>
          <Link to="/distribuidores" onClick={() => setMobileOpen(false)}>Distribuidores</Link>
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
