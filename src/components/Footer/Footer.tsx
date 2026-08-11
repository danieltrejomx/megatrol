import { Link } from 'react-router-dom';
import { ArrowUp, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="back-to-top" onClick={scrollToTop}>
        Back to top <ArrowUp size={16} />
      </div>
      
      <div className="container footer-container">
        {/* Column 1: Brand & About */}
        <div className="footer-brand-col">
          <h2 className="footer-logo">Inobazz Pharma</h2>
          <p className="footer-tagline">"Innovación científica que nace desde la naturaleza"</p>
          
          <div className="footer-about">
            <h4 className="footer-heading">Contacto Corporativo</h4>
            <p style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>
              📍 <strong>Dirección:</strong> Bonanza 114, Col. Felipe Ángeles, C.P. 15310, Venustiano Carranza, CDMX, México.<br />
              📞 <strong>Teléfono:</strong> (55) 3620 6854<br />
              🌐 <strong>Web:</strong> <a href="https://www.inobazzpharma.com.mx" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-light)' }}>www.inobazzpharma.com.mx</a>
            </p>
          </div>

          <div className="social-links">
            <a href="https://facebook.com/Inobazzpharma" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com/Inobazzpharma_mx" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://tiktok.com/@Inobazz.pharma_mx" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.52V6.75a4.85 4.85 0 0 1-1.02-.06z"/></svg>
            </a>
          </div>
        </div>
        
        {/* Column 2: Company Links */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Compañía</h4>
          <ul>
            <li><Link to="/nosotros">Sobre Nosotros</Link></li>
            <li><Link to="/distribuidores">Profesionales (Distribuidores)</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/privacidad">Aviso de Privacidad</Link></li>
            <li><Link to="/envios">Información de Envío</Link></li>
            <li><Link to="/terminos">Términos de Servicio</Link></li>
            <li><Link to="/accesibilidad">Declaración de Accesibilidad</Link></li>
          </ul>
        </div>
        
        {/* Column 3: Help Links */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Ayuda</h4>
          <ul>
            <li><Link to="/contacto">Preguntas Frecuentes (FAQs)</Link></li>
            <li><Link to="#">Suscríbete y Ahorra</Link></li>
            <li><Link to="#">Garantía de Satisfacción</Link></li>
            <li><Link to="/contacto">Contáctanos</Link></li>
            <li><Link to="/tienda">Dónde Comprar</Link></li>
            <li><Link to="#">*Promociones Actuales</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-newsletter-col">
          <h4 className="footer-heading">Boletín</h4>
          <p>Regístrate para recibir ofertas exclusivas, historias originales, eventos y más.</p>
          
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Tu correo electrónico" required />
            <button type="submit" aria-label="Suscribirse">
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Inobazz Pharma. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
