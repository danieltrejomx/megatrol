import { Link } from 'react-router-dom';
import { ArrowUp, ArrowRight, MapPin, Phone, Globe } from 'lucide-react';
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
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <MapPin size={16} className="footer-contact-icon" />
                <span><strong>Dirección:</strong> Bonanza 114, Col. Felipe Ángeles, C.P. 15310, Venustiano Carranza, CDMX, México.</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" />
                <span><strong>Teléfono:</strong> (55) 3620 6854</span>
              </div>
              <div className="footer-contact-item">
                <Globe size={16} className="footer-contact-icon" />
                <span><strong>Web:</strong> <a href="https://www.inobazzpharma.com.mx" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-light)' }}>www.inobazzpharma.com.mx</a></span>
              </div>
            </div>
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
            <a href="https://wa.me/525536206854?text=Hola,%20quisiera%20informaci%C3%B3n%20sobre%20los%20productos%20Megatrol" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-wa-link" title="Contactar por WhatsApp">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
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
