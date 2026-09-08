import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Star,
  Leaf,
  ShieldCheck,
  PawPrint,
  FlaskConical,
  Truck,
  RefreshCw,
  Zap,
  Home as HomeIcon,
  TrendingUp,
  Package,
  Stethoscope,
  ShoppingCart,
  Award,
  Send
} from 'lucide-react';
import { products } from '../../data/products';
import { blogArticles, type BlogArticle } from '../../data/blog';
import BlogModal from '../../components/BlogModal/BlogModal';
import { useCart } from '../../context/CartContext';
import './Home.css';

const getInitials = (name: string) => {
  return name.replace(/^(Dra\.|Dr\.|MVZ\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
};

const benefits = [
  { icon: Leaf, title: 'Fórmula 100% Vegetal', desc: 'Elaborado con extractos botánicos selectos, monoterpenos cíclicos y aceite de neem.' },
  { icon: FlaskConical, title: 'Grado Veterinario', desc: 'Desarrollado con estándares farmacéuticos por el equipo científico de Inobazz Pharma.' },
  { icon: RefreshCw, title: 'Rompe el Ciclo', desc: 'Bloquea la hormona ecdisona en huevos y larvas, impidiendo su eclosión y desarrollo.' },
  { icon: Zap, title: 'Acción Rápida', desc: 'Afecta directamente el sistema neuroendocrino del parásito adulto desde el primer uso.' },
  { icon: PawPrint, title: 'Seguro para Mascotas', desc: 'Fórmula suave y no tóxica, apta para perros, gatos y convivencia familiar.' },
  { icon: HomeIcon, title: 'Protege el Entorno', desc: 'Ideal para aplicar en camas, jaulas y transportadoras para evitar reinfestaciones.' },
];

const testimonials = [
  {
    id: 1,
    name: 'Dra. Mariana Valdés',
    role: 'Médico Veterinario Zootecnista',
    city: 'CDMX',
    product: 'Spray Megatrol',
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
    product: 'Shampoo Antipulgas Megatrol',
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
    product: 'Kit Protección Total',
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
    product: 'Megadoxi & Megastrin',
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
    product: 'Dermapet Shampoo',
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
    product: 'Shower Shampoo Aromas',
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
    product: 'Bálsamo SilkPaw',
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
    product: 'Balance Pet Geriátricos',
    stars: 5,
    title: 'Recuperó energía y movilidad',
    text: 'Mi perro de 11 años ya batallaba para levantarse. Con estas tabletas con colágeno y Omega 3 anda activo y con ganas de pasear todos los días.',
    date: 'Compra Verificada • Hace 3 semanas'
  }
];

const homeLines = [
  { key: 'all', label: 'Todos los Destacados' },
  { key: 'Megatrol Shower', label: 'Megatrol Shower' },
  { key: 'Megatrol Talco', label: 'Megatrol Talco' },
  { key: 'Línea Megadoxi', label: 'Línea Megadoxi' },
  { key: 'Plagatrol', label: 'Plagatrol' },
  { key: 'Línea Megatrol', label: 'Spray y Jabón Megatrol' },
  { key: 'Salud y Suplementos', label: 'Salud y Suplementos' },
];

const demoVideos = [
  {
    id: 'dermapet',
    title: 'Línea Dermatológica Dermapet',
    shortTitle: 'Dermapet Shampoo',
    badge: 'Baño Medicado',
    desc: 'Ingredientes de origen natural y pH balanceado para calmar, hidratar y tratar afecciones en la piel.',
    src: '/videos/video-demostracion-dermapet.mp4',
    driveUrl: 'https://drive.google.com/file/d/1Vn73XXF6i6t6jjMwgIyH93ZSYXIDTMQH/view?usp=sharing',
    products: [
      {
        slug: 'dermapet-shampoo',
        name: 'Dermapet Shampoo Dermatológico',
        price: 270,
        image: '/images/dermapet-shampoo.png'
      }
    ]
  },
  {
    id: 'shower-shampoo',
    title: 'Shower Shampoo & Talco Megatrol',
    shortTitle: 'Shower & Talco',
    badge: 'Limpieza y Protección',
    desc: 'Remueve impurezas y grasa con rico aroma a chicle, y protege con talco sin mojar a tu mascota.',
    src: '/videos/video-demostracion-shower-shampoo.mp4',
    driveUrl: 'https://drive.google.com/file/d/1krn2iqeeCz4Nt0SnmewGTYX9c4Pf-blU/view?usp=sharing',
    products: [
      {
        slug: 'shower-shampoo-aromas',
        name: 'Shower Shampoo Aromas',
        price: 210,
        image: '/images/shower-shampoo-aromas.png'
      },
      {
        slug: 'talco-ecologico',
        name: 'Talco Ecológico Megatrol (80 g)',
        price: 199,
        image: '/images/megatrol-talco-80g.png'
      }
    ]
  },
  {
    id: 'jabon-talco',
    title: 'Combo Ganador: Jabón & Talco',
    shortTitle: 'Jabón & Talco',
    badge: 'Control Antipulgas',
    desc: 'Jabón antipulgas para control de ácaros, piojos y pulgas, sellado con talco para máxima protección.',
    src: '/videos/video-demostracion-jabon-talco.mp4',
    driveUrl: 'https://drive.google.com/file/d/1-EQbkf9TGtP-4DGzA5opgTscwL1EdWgg/view?usp=sharing',
    products: [
      {
        slug: 'jabon-antipulgas',
        name: 'Jabón Antipulgas Megatrol (120 g)',
        price: 129,
        image: '/images/megatrol-jabon-oficial.png'
      },
      {
        slug: 'talco-ecologico',
        name: 'Talco Ecológico Megatrol (80 g)',
        price: 199,
        image: '/images/megatrol-talco-80g.png'
      }
    ]
  }
];

const Home = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedHomeLine, setSelectedHomeLine] = useState('all');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [formData, setFormData] = useState({ nombre: '', negocio: '', ciudad: '', telefono: '', comentarios: '' });
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  const openArticle = (slug: string) => {
    const art = blogArticles.find((a) => a.slug === slug);
    if (art) setSelectedArticle(art);
  };
  const reviewsCarouselRef = useRef<HTMLDivElement>(null);

  const nextVideo = () => {
    setSelectedVideoIndex((prev) => (prev + 1) % demoVideos.length);
  };

  const prevVideo = () => {
    setSelectedVideoIndex((prev) => (prev - 1 + demoVideos.length) % demoVideos.length);
  };

  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const handleAddFromVideo = (slug: string) => {
    const productObj = products.find((p) => p.slug === slug);
    if (productObj) {
      addToCart(productObj, 1);
      setAddedSlug(slug);
      setTimeout(() => setAddedSlug(null), 1800);
    }
  };

  const handleBuyNowFromVideo = (slug: string) => {
    const productObj = products.find((p) => p.slug === slug);
    if (productObj) {
      addToCart(productObj, 1);
      navigate('/carrito');
    }
  };

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
        <div className="container">
          <div className="hero-card">
            {/* Ambient background glows */}
            <div className="hero-orb hero-orb-blue"></div>
            <div className="hero-orb hero-orb-green"></div>

            <div className="hero-grid">
              <div className="hero-content">
                <div className="hero-badge-pill">
                  <span className="hero-badge-pulse"></span>
                  <span className="hero-badge-text">Fórmula Ecológica de Grado Veterinario</span>
                </div>

                <h1>
                  Los mejores productos para{' '}
                  <span className="hero-highlight-text">tu mascota</span>
                </h1>

                <p className="hero-description">
                  Descubre la línea antiparasitaria de <strong>Megatrol</strong>. La mejor alternativa ecológica formulada con extractos vegetales que <strong>rompe el ciclo biológico del parásito</strong> de forma 100% segura para tu familia.
                </p>

                <div className="hero-actions">
                  <Link to="/tienda" className="btn btn-primary hero-btn-main">
                    <span>Comprar Ahora</span>
                    <span className="hero-btn-arrow">→</span>
                  </Link>
                  <Link to="/ciencia" className="btn btn-hero-secondary">
                    <span>Ver Cómo Funciona</span>
                  </Link>
                </div>

                <div className="hero-stats-grid">
                  <div className="hero-stat-card">
                    <span className="hero-stat-icon-wrap icon-paw">
                      <PawPrint size={18} />
                    </span>
                    <div className="hero-stat-info">
                      <strong>+10,000</strong>
                      <span>Mascotas protegidas</span>
                    </div>
                  </div>
                  <div className="hero-stat-card">
                    <span className="hero-stat-icon-wrap icon-shield">
                      <ShieldCheck size={18} />
                    </span>
                    <div className="hero-stat-info">
                      <strong>Línea Completa</strong>
                      <span>4 Productos clave</span>
                    </div>
                  </div>
                  <div className="hero-stat-card">
                    <span className="hero-stat-icon-wrap icon-leaf">
                      <Leaf size={18} />
                    </span>
                    <div className="hero-stat-info">
                      <strong>100%</strong>
                      <span>Ingredientes naturales</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-visual-col">
                <div className="hero-image-wrapper">
                  {/* Floating badge 1: Top Right */}
                  <div className="hero-float-badge float-top-right">
                    <span className="float-badge-icon-wrap icon-leaf">
                      <Leaf size={18} />
                    </span>
                    <div className="float-badge-text">
                      <strong>Con Neem & Terpenos</strong>
                      <span>Eficacia botánica</span>
                    </div>
                  </div>

                  {/* Product Packshot */}
                  <img
                    src="/images/nueva.png"
                    alt="Megatrol - Protección Antiparasitaria Natural"
                    className="hero-real-image"
                  />

                  {/* Floating badge 2: Bottom Left */}
                  <div className="hero-float-badge float-bottom-left">
                    <span className="float-badge-icon-wrap icon-lab">
                      <FlaskConical size={18} />
                    </span>
                    <div className="float-badge-text">
                      <strong>Grado Farmacéutico</strong>
                      <span>Sin químicos agresivos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ──────────────────────────────────────── */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-card">
              <div className="trust-icon-circle green-tint">
                <Leaf size={22} />
              </div>
              <div className="trust-text">
                <h3>100% Ecológico</h3>
                <p>Extractos botánicos libres de químicos agresivos</p>
              </div>
            </div>
            <div className="trust-card">
              <div className="trust-icon-circle blue-tint">
                <ShieldCheck size={22} />
              </div>
              <div className="trust-text">
                <h3>Protección Total</h3>
                <p>Rompe el ciclo: adultos, larvas y huevecillos</p>
              </div>
            </div>
            <div className="trust-card">
              <div className="trust-icon-circle mint-tint">
                <PawPrint size={22} />
              </div>
              <div className="trust-text">
                <h3>Seguro para Todos</h3>
                <p>Para perros, gatos y el entorno del hogar</p>
              </div>
            </div>
            <div className="trust-card">
              <div className="trust-icon-circle cyan-tint">
                <Truck size={22} />
              </div>
              <div className="trust-text">
                <h3>Envío a Todo México</h3>
                <p>Entregas seguras a cualquier estado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS CAROUSEL ─────────────────────────────── */}
      <section className="best-sellers-section">
        <div className="container">
          <div className="catalog-banner-header">
            <span className="catalog-banner-badge">Catálogo Destacado</span>
            <h2>Nuestros Productos para Mascotas</h2>
            <p>Soluciones naturales, veterinarias y dermocosméticas formuladas especialmente para perros y gatos.</p>
            <div className="catalog-banner-tags">
              <span className="catalog-tag">⭐ Más Vendidos</span>
              <span className="catalog-tag">🌿 100% Ecológicos</span>
              <span className="catalog-tag">🚚 Envío Gratis desde $599</span>
            </div>
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
                        <ShoppingCart size={17} />
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
          <div className="benefits-banner-header">
            <span className="benefits-banner-badge">Propuesta de Valor</span>
            <h2>Beneficios Comprobados</h2>
            <p>Todo lo que Megatrol hace por tu mascota y tu hogar</p>
            <div className="benefits-banner-tags">
              <span className="benefits-tag">🌿 100% Vegetal</span>
              <span className="benefits-tag">🔬 Grado Veterinario</span>
              <span className="benefits-tag">🐾 Seguro para Mascotas</span>
              <span className="benefits-tag">🛡️ Alta Eficacia</span>
            </div>
          </div>
          <div className="benefits-grid">
            {benefits.map((b, i) => {
              const IconComp = b.icon;
              return (
                <div key={i} className="benefit-card">
                  <div className="benefit-icon">
                    <IconComp size={26} />
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="how-works-section">
        <div className="container how-works-container">
          <div className="how-works-content">
            <span className="section-label">Mecanismo de Acción</span>
            <h2>¿Cómo funciona Megatrol?</h2>
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
            <div className="video-showcase-container">
              {/* Header */}
              <div className="video-player-header">
                <h3 className="video-main-heading">¿Cómo usar MEGATROL?</h3>
                <p className="video-sub-heading">Observa la aplicación real y adquiere el producto directamente</p>
              </div>

              {/* Video Player Frame with side roulette arrows */}
              <div className="video-media-card">
                <div className="video-screen-wrapper">
                  <video
                    key={demoVideos[selectedVideoIndex].src}
                    src={demoVideos[selectedVideoIndex].src}
                    controls
                    playsInline
                    preload="metadata"
                    className="video-element"
                  />
                  <button 
                    type="button" 
                    className="roulette-side-arrow prev" 
                    onClick={prevVideo}
                    aria-label="Video anterior"
                    title="Anterior"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button 
                    type="button" 
                    className="roulette-side-arrow next" 
                    onClick={nextVideo}
                    aria-label="Video siguiente"
                    title="Siguiente"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
                
                <div className="video-info-box">
                  <div className="video-badge-row">
                    <span className="video-pill-badge">{demoVideos[selectedVideoIndex].badge}</span>
                    <div className="roulette-dots">
                      {demoVideos.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`roulette-dot ${selectedVideoIndex === idx ? 'active' : ''}`}
                          onClick={() => setSelectedVideoIndex(idx)}
                          aria-label={`Ir al video ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <h4 className="video-item-title">{demoVideos[selectedVideoIndex].title}</h4>
                  <p className="video-item-desc">{demoVideos[selectedVideoIndex].desc}</p>

                  {/* Direct Product CTAs */}
                  <div className="video-products-section">
                    <span className="video-products-title">
                      <ShoppingCart size={14} /> Producto{demoVideos[selectedVideoIndex].products.length > 1 ? 's' : ''} en este video:
                    </span>
                    <div className="video-product-cards-list">
                      {demoVideos[selectedVideoIndex].products.map((prod) => (
                        <div key={prod.slug} className="video-product-tile">
                          <Link 
                            to={`/producto/${prod.slug}`} 
                            className="video-prod-main-link"
                            title={`Ver detalles de ${prod.name}`}
                          >
                            <img src={prod.image} alt={prod.name} className="video-prod-thumb" />
                            <div className="video-prod-details">
                              <strong className="video-prod-name">{prod.name}</strong>
                              <span className="video-prod-price">${prod.price} MXN</span>
                            </div>
                          </Link>

                          <div className="video-prod-actions">
                            <button
                              type="button"
                              className={`btn-video-action btn-video-cart ${addedSlug === prod.slug ? 'added' : ''}`}
                              onClick={() => handleAddFromVideo(prod.slug)}
                              title="Agregar al carrito"
                            >
                              {addedSlug === prod.slug ? (
                                <>
                                  <CheckCircle size={13} />
                                  <span>Agregado</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingCart size={13} />
                                  <span>+ Carrito</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              className="btn-video-action btn-video-buy"
                              onClick={() => handleBuyNowFromVideo(prod.slug)}
                              title="Comprar ahora"
                            >
                              <Zap size={12} />
                              <span>Comprar</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (4 EN FILA / CAROUSEL) ──────────────── */}
      <section className="testimonials-section">
        <div className="container">
          <div className="reviews-banner-header">
            <div className="reviews-banner-badge">
              <span className="stars-mini">★★★★★</span>
              <span><strong>4.9 / 5</strong> · +1,250 Opiniones Verificadas</span>
            </div>
            <span className="reviews-banner-label">Casos de Éxito</span>
            <h2>¿Realmente Funciona?</h2>
            <p className="reviews-banner-subtitle">
              Conoce la experiencia real de dueños de perros y gatos, médicos veterinarios y profesionales en todo México.
            </p>
            <div className="reviews-nav-controls">
              <button 
                className="reviews-nav-btn" 
                onClick={() => scrollReviews('left')} 
                aria-label="Ver testimonios anteriores"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="reviews-nav-hint">Desliza para ver más historias reales</span>
              <button 
                className="reviews-nav-btn" 
                onClick={() => scrollReviews('right')} 
                aria-label="Ver testimonios siguientes"
              >
                <ChevronRight size={20} />
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
                  <div className="review-avatar">{getInitials(item.name)}</div>
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
            <span>Desliza para ver más opiniones →</span>
          </div>
        </div>
      </section>

      {/* ── DISTRIBUTOR / MAYOREO SECTION ──────────────────── */}
      <section className="distributor-section">
        <div className="container distributor-container">
          {/* Left Column: Value Proposition & Benefits */}
          <div className="distributor-content">
            <div className="distributor-badge">
              <Award size={15} />
              <span>Distribución Directa de Laboratorio</span>
            </div>
            <span className="section-label">Programa Oficial</span>
            <h2>Ventas al Mayoreo</h2>
            <p className="distributor-lead">
              ¿Tienes una veterinaria, tienda de mascotas, forrajera, rancho o eres revendedor? 
              Únete a la red nacional de distribuidores de <strong>Inobazz Pharma</strong> y obtén precios directos de fábrica.
            </p>

            <div className="distributor-perks-grid">
              <div className="perk-card">
                <div className="perk-icon perk-icon-green"><TrendingUp size={22} /></div>
                <div className="perk-info">
                  <h4>Márgenes de 35% a 55%</h4>
                  <p>Precios preferenciales por volumen y esquemas de descuento escalonados.</p>
                </div>
              </div>
              <div className="perk-card">
                <div className="perk-icon perk-icon-blue"><Truck size={22} /></div>
                <div className="perk-info">
                  <h4>Envíos a Todo México</h4>
                  <p>Entregas seguras y aseguradas a cualquier estado y municipio del país.</p>
                </div>
              </div>
              <div className="perk-card">
                <div className="perk-icon perk-icon-cyan"><Package size={22} /></div>
                <div className="perk-info">
                  <h4>Material POP y Displays Gratis</h4>
                  <p>Exhibidores de mostrador, catálogos físicos y afiches promocionales para tu local.</p>
                </div>
              </div>
              <div className="perk-card">
                <div className="perk-icon perk-icon-mint"><Stethoscope size={22} /></div>
                <div className="perk-info">
                  <h4>Soporte Técnico Veterinario</h4>
                  <p>Capacitación para tu equipo y fichas técnicas oficiales avaladas.</p>
                </div>
              </div>
            </div>

            <div className="distributor-contact-bar">
              <div className="social-cta">
                <a 
                  href="https://wa.me/525536206854?text=Hola,%20me%20interesa%20informaci%C3%B3n%20sobre%20precios%20de%20mayoreo%20y%20distribuci%C3%B3n%20de%20Megatrol%20e%20Inobazz%20Pharma" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-pill wa" 
                  aria-label="WhatsApp de Inobazz Pharma"
                  title="WhatsApp"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.04 3.67M9.53 7.35C9.34 7.35 9.04 7.42 8.78 7.7C8.52 7.98 7.8 8.65 7.8 10.03C7.8 11.41 8.81 12.74 8.95 12.93C9.09 13.12 10.9 15.93 13.68 17.13C14.34 17.42 14.86 17.59 15.26 17.72C15.93 17.93 16.54 17.9 17.02 17.83C17.56 17.75 18.68 17.15 18.91 16.5C19.14 15.85 19.14 15.3 19.07 15.18C19 15.06 18.81 15 18.53 14.86C18.25 14.72 16.89 14.05 16.63 13.96C16.38 13.86 16.19 13.82 16 14.1C15.82 14.38 15.29 15 15.13 15.19C14.97 15.37 14.81 15.4 14.53 15.26C14.25 15.12 13.36 14.83 12.3 13.89C11.48 13.15 10.92 12.24 10.76 11.96C10.6 11.69 10.74 11.53 10.88 11.4C11.01 11.27 11.17 11.05 11.31 10.89C11.45 10.73 11.5 10.61 11.59 10.43C11.68 10.24 11.64 10.08 11.57 9.94C11.5 9.8 10.93 8.42 10.7 7.86C10.48 7.32 10.25 7.4 10.07 7.39C9.91 7.38 9.72 7.35 9.53 7.35Z"/>
                  </svg>
                </a>
                <a 
                  href="https://facebook.com/Inobazzpharma" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-pill fb" 
                  aria-label="Facebook de Inobazz Pharma"
                  title="Facebook"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com/Inobazzpharma_mx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-pill ig" 
                  aria-label="Instagram de Inobazz Pharma"
                  title="Instagram"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a 
                  href="https://tiktok.com/@Inobazz.pharma_mx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-pill tk" 
                  aria-label="TikTok de Inobazz Pharma"
                  title="TikTok"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.52V6.75a4.85 4.85 0 0 1-1.02-.06z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Distributor Form */}
          <div className="distributor-form-wrapper">
            <div className="form-header-badge">
              <Zap size={14} />
              <span>Alta Inmediata</span>
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
                  <option value="todas">Catálogo Completo (Perros y Gatos)</option>
                  <option value="megatrol">Línea Megatrol (Antiparasitarios Naturales)</option>
                  <option value="pequenas">Pequeñas Especies (Salud y Cuidado)</option>
                  <option value="farmaceuticos">Farmacéuticos y Antibióticos</option>
                  <option value="multivitaminicos">Multivitamínicos y Suplementos</option>
                  <option value="dermocosmeticos">Dermocosmética y Shampoos</option>
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
                <Send size={16} />
                <span>Solicitar Catálogo y Precios de Mayoreo</span>
              </button>

              <p className="form-privacy-notice">
                <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />
                Tus datos están protegidos. Respuesta garantizada en menos de 2 horas hábiles.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ──────────────────────────────────────── */}
      <section className="blog-section">
        <div className="container">
          <div className="blog-banner-header">
            <span className="blog-banner-badge">Guías & Consejos</span>
            <h2>Blog y Consejos Veterinarios</h2>
            <p>Mantente informado sobre la salud y bienestar de tus mascotas con artículos clínicos avalados.</p>
            <div className="blog-banner-tags">
              <span className="blog-tag">📚 Artículos Clínicos</span>
              <span className="blog-tag">🐕 Salud Canina</span>
              <span className="blog-tag">🐈 Salud Felina</span>
              <span className="blog-tag">🌿 Soluciones Botánicas</span>
            </div>
          </div>

          <div className="blog-grid">
            <article className="blog-card" onClick={() => openArticle('como-identificar-si-mi-perro-tiene-pulgas')} style={{ cursor: 'pointer' }}>
              <div className="blog-image-wrap">
                <img src="/images/blog-perro-pulgas.jpg" alt="¿Cómo identificar si mi perro tiene pulgas?" className="blog-card-img" />
                <span className="blog-card-category-badge">Salud Canina</span>
              </div>
              <div className="blog-content">
                <div className="blog-date">15 Jul 2026</div>
                <h3>¿Cómo identificar si mi perro tiene pulgas?</h3>
                <p>Aprende las señales más comunes para detectar a tiempo una infestación y cómo tratarla rápidamente con soluciones naturales.</p>
                <span className="read-more">Leer artículo completo →</span>
              </div>
            </article>

            <article className="blog-card" onClick={() => openArticle('el-poder-del-aceite-de-neem-en-veterinaria')} style={{ cursor: 'pointer' }}>
              <div className="blog-image-wrap">
                <img src="/images/blog-aceite-neem.jpg" alt="El poder del Aceite de Neem en veterinaria" className="blog-card-img" />
                <span className="blog-card-category-badge">Ciencia & Naturaleza</span>
              </div>
              <div className="blog-content">
                <div className="blog-date">02 Jul 2026</div>
                <h3>El poder del Aceite de Neem en veterinaria</h3>
                <p>Descubre por qué este extracto natural es la clave para la prevención ecológica contra parásitos en perros y gatos.</p>
                <span className="read-more">Leer artículo completo →</span>
              </div>
            </article>

            <article className="blog-card" onClick={() => openArticle('protegiendo-a-tu-gato-lo-que-debes-saber')} style={{ cursor: 'pointer' }}>
              <div className="blog-image-wrap">
                <img src="/images/blog-protegiendo-gato.jpg" alt="Protegiendo a tu gato: lo que debes saber" className="blog-card-img" />
                <span className="blog-card-category-badge">Salud Felina</span>
              </div>
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

      {/* Pantalla Emergente (Modal) con toda la información del artículo */}
      <BlogModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />

    </div>
  );
};

export default Home;
