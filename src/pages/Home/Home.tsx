import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, Star } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './Home.css';

const benefits = [
  { icon: '🌱', title: 'Fórmula 100% Vegetal', desc: 'Elaborado con extractos botánicos selectos, monoterpenos cíclicos y aceite de neem.' },
  { icon: '🔬', title: 'Grado Veterinario', desc: 'Desarrollado con estándares farmacéuticos por el equipo científico de Inobazz Pharma.' },
  { icon: '🔄', title: 'Rompe el Ciclo', desc: 'Bloquea la hormona ecdisona en huevos y larvas, impidiendo su eclosión y desarrollo.' },
  { icon: '⚡', title: 'Acción Rápida', desc: 'Afecta directamente el sistema neuroendocrino del parásito adulto desde el primer uso.' },
  { icon: '🐾', title: 'Seguro para Mascotas', desc: 'Fórmula suave y no tóxica, apta para perros, gatos y convivencia familiar.' },
  { icon: '🏠', title: 'Protege el Entorno', desc: 'Ideal para aplicar en camas, jaulas y transportadoras para evitar reinfestaciones.' },
];

const testimonials = [
  {
    id: 1,
    name: 'Dra. Mariana Valdés',
    role: 'Médico Veterinario Zootecnista',
    city: 'CDMX',
    avatar: '👩‍⚕️',
    product: '🌿 Spray Megatrol',
    stars: 5,
    title: '¡En 3 días eliminó las pulgas!',
    text: 'Lo receto a diario en mi clínica. Los dueños quedan fascinados porque no huele a químico agresivo y rompe el ciclo biológico sin irritar la piel sensible.',
    date: 'Compra Verificada • Hace 2 días'
  },
  {
    id: 2,
    name: 'Sofía Navarro',
    role: 'Dueña de 3 Gatos Persa',
    city: 'Guadalajara',
    avatar: '🐱',
    product: '🧴 Shampoo Antipulgas Megatrol',
    stars: 5,
    title: 'Suave y seguro para mis gatitos',
    text: 'Siempre me daba miedo bañar a mis gatos con productos comerciales por temor a intoxicación. Megatrol es 100% natural, les dejó el pelo impecable y cero pulgas.',
    date: 'Compra Verificada • Hace 4 días'
  },
  {
    id: 3,
    name: 'Valeria Mendoza',
    role: 'Dueña de 2 Golden Retrievers',
    city: 'Monterrey, N.L.',
    avatar: '🐕',
    product: '📦 Kit Protección Total',
    stars: 5,
    title: 'El mejor kit antipulgas',
    text: 'El shampoo deja el pelo con un brillo espectacular y el spray lo aplico en sus camas y tapetes. Ya no se rascan para nada y están felices.',
    date: 'Compra Verificada • Hace 1 semana'
  },
  {
    id: 4,
    name: 'MVZ. Andrea Salgado',
    role: 'Especialista en Medicina Felina y Canina',
    city: 'Querétaro',
    avatar: '🩺',
    product: '💊 Megadoxi & Megastrin',
    stars: 5,
    title: 'Excelente respuesta clínica',
    text: 'La palatabilidad de las suspensiones orales facilita mucho la dosificación tanto en perros como en gatos renuentes. Muy recomendable.',
    date: 'Compra Verificada • Hace 1 semana'
  },
  {
    id: 5,
    name: 'MVZ. Héctor Cárdenas',
    role: 'Dermatología Veterinaria',
    city: 'Puebla',
    avatar: '👨‍⚕️',
    product: '🧴 Dermapet Shampoo',
    stars: 5,
    title: 'Gran efectividad en dermatitis',
    text: 'El ácido salicílico con azufre orgánico y neem desinflama y remueve costras desde el primer baño. Indispensable en mi práctica veterinaria.',
    date: 'Compra Verificada • Hace 2 semanas'
  },
  {
    id: 6,
    name: 'Karla Vivanco',
    role: 'Estilista Profesional Canina',
    city: 'Puebla',
    avatar: '🐩',
    product: '🌸 Shower Shampoo Aromas',
    stars: 5,
    title: 'Aroma duradero y pelo sedoso',
    text: 'En la estética canina usamos los diferentes aromas. El acondicionador deja los nudos fáciles de desenredar y a los clientes les fascina el perfume.',
    date: 'Compra Verificada • Hace 2 semanas'
  },
  {
    id: 7,
    name: 'Rodrigo Albarrán',
    role: 'Dueño de Bulldog Francés',
    city: 'Estado de México',
    avatar: '🐾',
    product: '🐾 Bálsamo SilkPaw',
    stars: 5,
    title: 'Almohadillas y trufa hidratadas',
    text: 'Mi bulldog tenía la nariz muy reseca y grietas en las almohadillas por el pavimento. En una semana de aplicar SilkPaw sanó por completo.',
    date: 'Compra Verificada • Hace 3 semanas'
  },
  {
    id: 8,
    name: 'Guillermo Paz',
    role: 'Dueño de Pastor Alemán Senior',
    city: 'Mérida, Yuc.',
    avatar: '🐾',
    product: '🦴 Balance Pet Geriátricos',
    stars: 5,
    title: 'Recuperó energía y movilidad',
    text: 'Mi perro de 11 años ya batallaba para levantarse. Con estas tabletas con colágeno y Omega 3 anda activo y con ganas de pasear todos los días.',
    date: 'Compra Verificada • Hace 3 semanas'
  }
];

const homeLines = [
  { key: 'all', label: '⭐ Destacados' },
  { key: 'Línea Megatrol', label: '🌿 Línea Megatrol (Antiparasitarios)' },
  { key: 'Pequeñas Especies', label: '🐕 Pequeñas Especies (Salud y Cuidado)' },
];

const Home = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedHomeLine, setSelectedHomeLine] = useState('all');
  const [formData, setFormData] = useState({ nombre: '', negocio: '', ciudad: '', telefono: '', comentarios: '' });
  const reviewsCarouselRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: 'left' | 'right') => {
    if (reviewsCarouselRef.current) {
      const scrollAmount = reviewsCarouselRef.current.clientWidth * 0.8;
      reviewsCarouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const homeFilteredProducts = selectedHomeLine === 'all'
    ? products
    : products.filter(p => p.line === selectedHomeLine);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Gracias! Nos pondremos en contacto contigo pronto.');
  };

  return (
    <div className="home-page">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge">✅ Fórmula Ecológica de Grado Veterinario</span>
            <h1>Los mejores productos para <span className="highlight">tu mascota</span></h1>
            <p>Descubre la línea antiparasitaria de Megatrol. La mejor alternativa ecológica con extractos vegetales que <strong>rompe el ciclo de vida del parásito</strong> de forma segura para tu familia.</p>
            <div className="hero-actions">
              <Link to="/tienda" className="btn btn-primary">Comprar Ahora</Link>
              <Link to="/ciencia" className="btn btn-secondary">Ver Cómo Funciona</Link>
            </div>
            <div className="hero-stats">
              <div><strong>+10,000</strong><span>Mascotas protegidas</span></div>
              <div><strong>4 Productos</strong><span>Línea completa</span></div>
              <div><strong>100%</strong><span>Ingredientes naturales</span></div>
            </div>
          </div>
          <div className="hero-image-container">
            <img
              src="/images/nueva.png"
              alt="Megatrol - Protección Antiparasitaria Natural"
              className="hero-real-image"
            />
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ──────────────────────────────────────── */}
      <section className="trust-section">
        <div className="container trust-container">
          <div className="trust-item">
            <div className="trust-icon">🌱</div>
            <h3>100% Ecológico</h3>
            <p>Fórmula a base de extractos vegetales</p>
          </div>
          <div className="trust-item">
            <div className="trust-icon">🛡️</div>
            <h3>Protección Total</h3>
            <p>Rompe el ciclo de vida del parásito</p>
          </div>
          <div className="trust-item">
            <div className="trust-icon">🐾</div>
            <h3>Seguro para todos</h3>
            <p>Para perros, gatos y el entorno familiar</p>
          </div>
          <div className="trust-item">
            <div className="trust-icon">🇲🇽</div>
            <h3>Envío Nacional</h3>
            <p>A toda la República Mexicana</p>
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS CAROUSEL ─────────────────────────────── */}
      <section className="best-sellers-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Catálogo Destacado</span>
            <h2>Nuestros Productos para Mascotas</h2>
            <p>Soluciones naturales, veterinarias y dermocosméticas formuladas especialmente para perros y gatos.</p>
          </div>

          {/* Line Filter Tabs */}
          <div className="home-line-tabs">
            {homeLines.map((line) => (
              <button
                key={line.key}
                className={`home-tab-btn ${selectedHomeLine === line.key ? 'active' : ''}`}
                onClick={() => setSelectedHomeLine(line.key)}
              >
                {line.label}
              </button>
            ))}
          </div>

          <div className="carousel-container">
            <div className="carousel">
              {homeFilteredProducts.map((p) => (
                <div key={p.id} className="carousel-card" onClick={() => navigate(`/producto/${p.slug}`)}>
                  {p.tag && <span className="product-tag">{p.tag}</span>}
                  <div className="carousel-image">
                    <img src={p.image} alt={p.name} className="carousel-product-img" />
                  </div>
                  <div className="carousel-info">
                    <div className="carousel-card-line-label">{p.line}</div>
                    <h3>{p.name}</h3>
                    <p className="carousel-desc">{p.desc}</p>
                    <div className="price">${p.price.toFixed(2)} MXN</div>
                    <div className="carousel-card-actions">
                      <button
                        className="btn btn-primary"
                        onClick={(e) => { e.stopPropagation(); navigate(`/producto/${p.slug}`); }}
                      >
                        Ver Producto
                      </button>
                      <button
                        className="btn btn-cart-sm"
                        title="Agregar al carrito"
                        onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────────── */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">¿Cuáles son los</span>
            <h2>BENEFICIOS? 🐕</h2>
            <p>Todo lo que Megatrol hace por tu mascota y tu hogar</p>
          </div>
          <div className="benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card">
                <div className="benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="how-works-section">
        <div className="container how-works-container">
          <div className="how-works-content">
            <span className="section-label">¿Cómo funciona</span>
            <h2>MEGATROL?</h2>
            <p>
              Megatrol fue formulado para que el bienestar de tu mascota sea lo más importante. 
              Es la mejor alternativa para librarte de las pulgas y garrapatas que afectan a tu mascota y a tu familia.
            </p>
            <div className="works-steps">
              <div className="step">
                <span className="step-num">01</span>
                <div>
                  <h4>Ataca al Adulto</h4>
                  <p>Afecta directamente el sistema neuroendocrino del parásito adulto.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-num">02</span>
                <div>
                  <h4>Bloquea Huevos y Larvas</h4>
                  <p>Bloquea la hormona ecdisona en huevos y larvas, impidiendo su eclosión.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-num">03</span>
                <div>
                  <h4>Rompe el Ciclo de Vida</h4>
                  <p>Elimina la reinfestación al cortar el ciclo completo del parásito.</p>
                </div>
              </div>
            </div>
            <Link to="/ciencia" className="btn btn-primary">Conoce Nuestra Ciencia</Link>
          </div>
          <div className="how-works-image">
            <div className="video-placeholder">
              <span className="play-btn">▶</span>
              <p>¿Cómo usar MEGATROL?</p>
              <span>Ver video demostración</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (4 EN FILA / CAROUSEL) ──────────────── */}
      <section className="testimonials-section">
        <div className="container">
          <div className="reviews-section-header">
            <div>
              <div className="reviews-trust-badge">
                <span className="stars-mini">★★★★★</span>
                <span><strong>4.9 / 5</strong> Calificación Promedio (+1,250 opiniones verificadas)</span>
              </div>
              <span className="section-label">¿Realmente</span>
              <h2>FUNCIONA? ✅</h2>
              <p className="reviews-subtitle">
                Conoce la experiencia real de dueños de perros y gatos, médicos veterinarios y profesionales en todo México.
              </p>
            </div>
            <div className="reviews-nav-controls">
              <button 
                className="reviews-nav-btn" 
                onClick={() => scrollReviews('left')} 
                aria-label="Ver testimonios anteriores"
              >
                <ChevronLeft size={22} />
              </button>
              <button 
                className="reviews-nav-btn" 
                onClick={() => scrollReviews('right')} 
                aria-label="Ver testimonios siguientes"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          <div className="reviews-carousel-container" ref={reviewsCarouselRef}>
            {testimonials.map((item) => (
              <div className="review-card" key={item.id}>
                <div className="review-card-top">
                  <div className="review-stars">
                    {[...Array(item.stars)].map((_, idx) => (
                      <Star key={idx} size={15} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span className="verified-badge">
                    <CheckCircle size={13} /> Compra Verificada
                  </span>
                </div>

                <div className="review-product-tag">
                  {item.product}
                </div>

                <h4 className="review-card-title">"{item.title}"</h4>
                <p className="review-card-text">{item.text}</p>

                <div className="review-author-box">
                  <div className="review-avatar">{item.avatar}</div>
                  <div className="review-author-info">
                    <span className="review-author-name">{item.name}</span>
                    <span className="review-author-role">{item.role} • {item.city}</span>
                    <span className="review-date">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reviews-swipe-hint">
            <span>👉 Desliza para ver más opiniones</span>
          </div>
        </div>
      </section>

      {/* ── DISTRIBUTOR / MAYOREO SECTION ──────────────────── */}
      <section className="distributor-section">
        <div className="container distributor-container">
          {/* Left Column: Value Proposition & Benefits */}
          <div className="distributor-content">
            <div className="distributor-badge">
              <span>🤝 Distribución Directa de Laboratorio</span>
            </div>
            <span className="section-label">Programa Oficial</span>
            <h2>Ventas al MAYOREO 📦</h2>
            <p className="distributor-lead">
              ¿Tienes una veterinaria, tienda de mascotas, forrajera, rancho o eres revendedor? 
              Únete a la red nacional de distribuidores de <strong>Inobazz Pharma</strong> y obtén precios directos de fábrica.
            </p>

            <div className="distributor-perks-grid">
              <div className="perk-card">
                <div className="perk-icon">💰</div>
                <div className="perk-info">
                  <h4>Márgenes de 35% a 55%</h4>
                  <p>Precios preferenciales por volumen y esquemas de descuento escalonados.</p>
                </div>
              </div>
              <div className="perk-card">
                <div className="perk-icon">🚚</div>
                <div className="perk-info">
                  <h4>Envíos a Todo México</h4>
                  <p>Entregas seguras y aseguradas a cualquier estado y municipio del país.</p>
                </div>
              </div>
              <div className="perk-card">
                <div className="perk-icon">🎁</div>
                <div className="perk-info">
                  <h4>Material POP y Displays Gratis</h4>
                  <p>Exhibidores de mostrador, catálogos físicos y afiches promocionales para tu local.</p>
                </div>
              </div>
              <div className="perk-card">
                <div className="perk-icon">👨‍⚕️</div>
                <div className="perk-info">
                  <h4>Soporte Técnico Veterinario</h4>
                  <p>Capacitación para tu equipo y fichas técnicas oficiales avaladas.</p>
                </div>
              </div>
            </div>

            <div className="distributor-contact-bar">
              <a 
                href="https://wa.me/525536206854?text=Hola,%20me%20interesa%20informaci%C3%B3n%20sobre%20precios%20de%20mayoreo%20y%20distribuci%C3%B3n%20de%20Megatrol%20e%20Inobazz%20Pharma" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp-b2b"
              >
                <span>💬</span> Chatear con Asesor por WhatsApp
              </a>
              <div className="social-cta">
                <a href="https://facebook.com/Inobazzpharma" target="_blank" rel="noopener noreferrer" className="social-pill fb" aria-label="Facebook">
                  Facebook
                </a>
                <a href="https://instagram.com/Inobazzpharma_mx" target="_blank" rel="noopener noreferrer" className="social-pill ig" aria-label="Instagram">
                  Instagram
                </a>
                <a href="https://tiktok.com/@Inobazz.pharma_mx" target="_blank" rel="noopener noreferrer" className="social-pill tk" aria-label="TikTok">
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Distributor Form */}
          <div className="distributor-form-wrapper">
            <div className="form-header-badge">
              <span>⚡ Alta Inmediata</span>
            </div>
            <h3>Solicitar Lista de Precios de Mayoreo</h3>
            <p>Llena tus datos y un ejecutivo comercial te enviará el catálogo digital y la lista de precios preferencial.</p>
            
            <form className="distributor-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Nombre y Apellidos</label>
                <input 
                  name="nombre" 
                  type="text" 
                  placeholder="Ej. Dr. Carlos Morales" 
                  value={formData.nombre} 
                  onChange={handleFormChange} 
                  required 
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Nombre de tu Negocio / Veterinaria</label>
                  <input 
                    name="negocio" 
                    type="text" 
                    placeholder="Ej. Veterinaria San Ángel" 
                    value={formData.negocio} 
                    onChange={handleFormChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Ciudad y Estado</label>
                  <input 
                    name="ciudad" 
                    type="text" 
                    placeholder="Ej. Guadalajara, Jal." 
                    value={formData.ciudad} 
                    onChange={handleFormChange} 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Teléfono Celular / WhatsApp</label>
                <input 
                  name="telefono" 
                  type="tel" 
                  placeholder="Ej. 55 1234 5678" 
                  value={formData.telefono} 
                  onChange={handleFormChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Línea de Interés Principal</label>
                <select name="lineaInteres" className="form-select">
                  <option value="todas">⭐ Catálogo Completo (Perros y Gatos)</option>
                  <option value="megatrol">🌿 Línea Megatrol (Antiparasitarios Naturales)</option>
                  <option value="pequenas">🐕 Pequeñas Especies (Salud y Cuidado)</option>
                  <option value="farmaceuticos">💊 Farmacéuticos y Antibióticos</option>
                  <option value="multivitaminicos">🦴 Multivitamínicos y Suplementos</option>
                  <option value="dermocosmeticos">🧴 Dermocosmética y Shampoos</option>
                </select>
              </div>

              <div className="form-group">
                <label>Comentarios o volumen estimado (Opcional)</label>
                <textarea 
                  name="comentarios" 
                  placeholder="Cuéntanos sobre tu negocio o qué productos te interesan cotizar..." 
                  value={formData.comentarios} 
                  onChange={handleFormChange} 
                  rows={3}
                ></textarea>
              </div>

              <button type="submit" className="btn-distributor-submit">
                <span>📩</span> Solicitar Catálogo y Precios de Mayoreo
              </button>

              <p className="form-privacy-notice">
                🔒 Tus datos están protegidos. Respuesta garantizada en menos de 2 horas hábiles.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ──────────────────────────────────────── */}
      <section className="blog-section">
        <div className="container">
          <div className="section-header">
            <h2>Blog y Consejos</h2>
            <p>Mantente informado sobre la salud y bienestar de tus mascotas</p>
          </div>

          <div className="blog-grid">
            <article className="blog-card" onClick={() => navigate('/blog/como-identificar-si-mi-perro-tiene-pulgas')} style={{ cursor: 'pointer' }}>
              <div className="blog-image blog-image-1"></div>
              <div className="blog-content">
                <div className="blog-date">15 Jul 2026</div>
                <h3>¿Cómo identificar si mi perro tiene pulgas?</h3>
                <p>Aprende las señales más comunes para detectar a tiempo una infestación y cómo tratarla rápidamente con soluciones naturales.</p>
                <span className="read-more">Leer artículo completo →</span>
              </div>
            </article>

            <article className="blog-card" onClick={() => navigate('/blog/el-poder-del-aceite-de-neem-en-veterinaria')} style={{ cursor: 'pointer' }}>
              <div className="blog-image blog-image-2"></div>
              <div className="blog-content">
                <div className="blog-date">02 Jul 2026</div>
                <h3>El poder del Aceite de Neem en veterinaria</h3>
                <p>Descubre por qué este extracto natural es la clave para la prevención ecológica contra parásitos en perros y gatos.</p>
                <span className="read-more">Leer artículo completo →</span>
              </div>
            </article>

            <article className="blog-card" onClick={() => navigate('/blog/protegiendo-a-tu-gato-lo-que-debes-saber')} style={{ cursor: 'pointer' }}>
              <div className="blog-image blog-image-3"></div>
              <div className="blog-content">
                <div className="blog-date">20 Jun 2026</div>
                <h3>Protegiendo a tu gato: lo que debes saber</h3>
                <p>Los gatos son más sensibles a ciertos químicos. Conoce cómo protegerlos de forma segura con la línea Megatrol.</p>
                <span className="read-more">Leer artículo completo →</span>
              </div>
            </article>
          </div>

          <div className="view-all-container">
            <Link to="/blog" className="btn btn-secondary">Ver todos los artículos</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
