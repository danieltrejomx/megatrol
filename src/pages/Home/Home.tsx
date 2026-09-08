import { useState, useRef, useEffect } from 'react';
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
  ShoppingCart,
  Sparkles,
  ArrowRight,
  Volume2,
  VolumeX,
  Handshake,
  Mail,
  MessageCircle,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { products, type Product } from '../../data/products';
import { blogArticles, type BlogArticle } from '../../data/blog';
import BlogModal from '../../components/BlogModal/BlogModal';
import { ProductModal } from '../../components/ProductModal/ProductModal';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Home.css';
import '../Distributors/Distributors.css';

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
  const { toggleFavorite, isFavorite } = useAuth();
  const navigate = useNavigate();
  const [selectedHomeLine, setSelectedHomeLine] = useState('all');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [formData, setFormData] = useState({ nombre: '', email: '', negocio: '', estado: '', ciudad: '', telefono: '', comentarios: '' });
  const [distributorSubmitted, setDistributorSubmitted] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  const openArticle = (slug: string) => {
    const art = blogArticles.find((a) => a.slug === slug);
    if (art) setSelectedArticle(art);
  };
  const reviewsCarouselRef = useRef<HTMLDivElement>(null);
  const catalogCarouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [addedCartId, setAddedCartId] = useState<number | null>(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragMovedRef = useRef(false);

  const updateScrollButtons = () => {
    if (catalogCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = catalogCarouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollCatalog = (direction: 'left' | 'right') => {
    if (catalogCarouselRef.current) {
      const cardWidth = 284;
      const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
      catalogCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!catalogCarouselRef.current) return;
    isDraggingRef.current = true;
    dragMovedRef.current = false;
    startXRef.current = e.pageX - catalogCarouselRef.current.offsetLeft;
    scrollLeftRef.current = catalogCarouselRef.current.scrollLeft;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !catalogCarouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - catalogCarouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 6) {
      dragMovedRef.current = true;
    }
    catalogCarouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const howWorksSectionRef = useRef<HTMLElement | null>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isSectionInView, setIsSectionInView] = useState(false);

  const nextVideo = () => {
    setSelectedVideoIndex((prev) => (prev + 1) % demoVideos.length);
  };

  const prevVideo = () => {
    setSelectedVideoIndex((prev) => (prev - 1 + demoVideos.length) % demoVideos.length);
  };

  const toggleSound = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsVideoMuted(newMuted);
      if (videoRef.current.paused && isSectionInView) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Observador para reproducir automáticamente el video SÓLO al llegar a esta sección
  useEffect(() => {
    const sectionEl = howWorksSectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSectionInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.2 // Se activa al llegar y tener el 20% de la sección visible
      }
    );

    observer.observe(sectionEl);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Control de reproducción según la visibilidad de la sección
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isVideoMuted;
    video.defaultMuted = isVideoMuted;

    if (isSectionInView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback a muted si la política del navegador lo requiere
          video.muted = true;
          setIsVideoMuted(true);
          video.play().catch(() => {});
        });
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  }, [isSectionInView, selectedVideoIndex]);

  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

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
      addToCart(productObj, 1, undefined, undefined, false);
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

  useEffect(() => {
    const el = catalogCarouselRef.current;
    if (el) {
      updateScrollButtons();
      el.addEventListener('scroll', updateScrollButtons);
      window.addEventListener('resize', updateScrollButtons);
      return () => {
        el.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, [homeFilteredProducts]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDistributorSubmitted(true);
  };

  return (
    <div className="home-page">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-card">
            {/* Extended Watermark Backdrop of Pets (Perrito & Michito) */}
            <div className="hero-pets-watermark" aria-hidden="true"></div>

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
                  {/* Subtle glowing halo and breathing ground shadow */}
                  <div className="hero-product-aura" aria-hidden="true"></div>
                  <div className="hero-product-shadow" aria-hidden="true"></div>

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
            <button
              type="button"
              className={`carousel-arrow-btn prev ${!canScrollLeft ? 'disabled' : ''}`}
              onClick={() => scrollCatalog('left')}
              disabled={!canScrollLeft}
              aria-label="Ver productos anteriores"
              title="Anterior"
            >
              <ChevronLeft size={22} />
            </button>

            <div 
              className={`carousel ${isDragging ? 'is-dragging' : ''}`}
              ref={catalogCarouselRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
            >
              {homeFilteredProducts.map((p) => (
                <div 
                  key={p.id} 
                  className="carousel-card" 
                  onClick={() => {
                    if (dragMovedRef.current) return;
                    setModalProduct(p);
                  }}
                >
                  {p.tag && <span className="product-tag">{p.tag}</span>}
                  <div className="carousel-image">
                    <img src={p.image} alt={p.name} className="carousel-product-img" />
                    <button
                      type="button"
                      className={`carousel-fav-btn ${isFavorite(p.id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(p.id);
                      }}
                      aria-label={isFavorite(p.id) ? "Quitar de favoritos" : "Guardar en favoritos"}
                      title={isFavorite(p.id) ? "Quitar de favoritos" : "Guardar en favoritos"}
                    >
                      <Heart size={18} fill={isFavorite(p.id) ? "#f43f5e" : "none"} color={isFavorite(p.id) ? "#f43f5e" : "#64748b"} />
                    </button>
                  </div>
                  <div className="carousel-info">
                    <div className="carousel-card-line-label">{p.line}</div>
                    <h3>{p.name}</h3>
                    <p className="carousel-desc">{p.desc}</p>
                    <div className="price">${p.price.toFixed(2)} MXN</div>
                    <div className="carousel-card-actions">
                      <button
                        type="button"
                        className="btn btn-buy-now"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p, 1, undefined, undefined, false);
                          navigate('/carrito');
                        }}
                      >
                        <Zap size={14} />
                        <span>Comprar Ahora</span>
                      </button>

                      <button
                        type="button"
                        className={`btn btn-add-cart ${addedCartId === p.id ? 'added' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p, 1);
                          setAddedCartId(p.id);
                          setTimeout(() => setAddedCartId(null), 1800);
                        }}
                      >
                        {addedCartId === p.id ? (
                          <>
                            <CheckCircle size={15} />
                            <span>¡Agregado!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={15} />
                            <span>Agregar al Carrito</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`carousel-arrow-btn next ${!canScrollRight ? 'disabled' : ''}`}
              onClick={() => scrollCatalog('right')}
              disabled={!canScrollRight}
              aria-label="Ver más productos"
              title="Siguiente"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="carousel-swipe-hint">
            <span>← Desliza o usa las flechas para explorar más productos →</span>
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
      <section ref={howWorksSectionRef} className="how-works-section">
        <div className="container">
          <div className="how-works-banner">
            <div className="how-works-content">
              <span className="works-badge">
                <Sparkles size={14} /> Mecanismo de Acción Científico
              </span>
              <h2>¿Cómo funciona Megatrol?</h2>
              <p>
                Megatrol fue formulado para que el bienestar de tu mascota sea lo más importante. 
                Es la mejor alternativa botánica y ecológica para librarte de las pulgas y garrapatas que afectan a tu mascota y a tu familia.
              </p>
              <div className="works-steps">
                <div className="step-glass">
                  <span className="step-num">01</span>
                  <div>
                    <h4>Efecto Adulticida</h4>
                    <p>Afecta directamente el sistema neuroendocrino del parásito adulto.</p>
                  </div>
                </div>
                <div className="step-glass">
                  <span className="step-num">02</span>
                  <div>
                    <h4>Bloquea Huevos y Larvas</h4>
                    <p>Bloquea la hormona ecdisona en huevos y larvas, impidiendo su eclosión.</p>
                  </div>
                </div>
                <div className="step-glass">
                  <span className="step-num">03</span>
                  <div>
                    <h4>Rompe el Ciclo de Vida</h4>
                    <p>Elimina la reinfestación al cortar el ciclo completo del parásito.</p>
                  </div>
                </div>
              </div>
              <Link to="/ciencia" className="btn btn-primary btn-works-cta">
                <span>Conoce Nuestra Ciencia</span>
                <ArrowRight size={16} />
              </Link>
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
                    ref={videoRef}
                    key={demoVideos[selectedVideoIndex].src}
                    src={demoVideos[selectedVideoIndex].src}
                    muted={isVideoMuted}
                    playsInline
                    loop
                    controls
                    preload="auto"
                    className="video-element"
                    onVolumeChange={() => {
                      if (videoRef.current) {
                        setIsVideoMuted(videoRef.current.muted);
                      }
                    }}
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

                  <button
                    type="button"
                    className="video-sound-toggle-btn"
                    onClick={toggleSound}
                    aria-label={isVideoMuted ? "Activar sonido del video" : "Silenciar video"}
                    title={isVideoMuted ? "Activar sonido" : "Silenciar"}
                  >
                    {isVideoMuted ? (
                      <>
                        <VolumeX size={14} />
                        <span>Activar sonido</span>
                      </>
                    ) : (
                      <>
                        <Volume2 size={14} />
                        <span>Sonido activo</span>
                      </>
                    )}
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
                          <button 
                            type="button"
                            onClick={() => {
                              const found = products.find((p) => p.slug === prod.slug);
                              if (found) setModalProduct(found);
                            }}
                            className="video-prod-main-link"
                            title={`Ver detalles de ${prod.name}`}
                            style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                          >
                            <img src={prod.image} alt={prod.name} className="video-prod-thumb" />
                            <div className="video-prod-details">
                              <strong className="video-prod-name">{prod.name}</strong>
                              <span className="video-prod-price">${prod.price} MXN</span>
                            </div>
                          </button>

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
        <div className="container">
          <div className="distributor-banner-header">
            <span className="distributor-banner-badge">Distribución Directa de Laboratorio</span>
            <h2>Ventas al Mayoreo</h2>
            <p>
              ¿Tienes una veterinaria, tienda de mascotas, forrajera, rancho o eres revendedor? 
              Únete a la red nacional de distribuidores de Inobazz Pharma y obtén precios directos de fábrica.
            </p>
            <div className="distributor-banner-tags">
              <span className="distributor-tag">⭐ Márgenes de 35% a 55%</span>
              <span className="distributor-tag">🚚 Envíos a Todo México</span>
              <span className="distributor-tag">📦 Material POP y Displays</span>
              <span className="distributor-tag">🩺 Soporte Técnico Veterinario</span>
            </div>
          </div>

          <div className="distributors-layout">
            <div className="distributors-info">
              <span className="dist-card-badge">
                <Sparkles size={14} /> Ventajas Comerciales
              </span>
              <h2>Beneficios de ser Distribuidor</h2>
              <p className="dist-card-intro">
                Únete a nuestra red nacional autorizada con respaldo directo de laboratorio y condiciones comerciales preferenciales para hacer crecer tu negocio veterinario.
              </p>

              <ul className="benefits-list">
                <li className="benefit-item-glass">
                  <div className="icon dist-icon-trending">
                    <TrendingUp size={24} />
                  </div>
                  <div className="benefit-item-content">
                    <strong>Altos Márgenes de Ganancia</strong>
                    <p>Precios preferenciales escalonados según volumen de compra. Retorno de inversión atractivo.</p>
                  </div>
                </li>
                <li className="benefit-item-glass">
                  <div className="icon dist-icon-package">
                    <Package size={24} />
                  </div>
                  <div className="benefit-item-content">
                    <strong>Material de Apoyo</strong>
                    <p>Te proporcionamos displays, folletos informativos y material digital para tus redes sociales.</p>
                  </div>
                </li>
                <li className="benefit-item-glass">
                  <div className="icon dist-icon-truck">
                    <Truck size={24} />
                  </div>
                  <div className="benefit-item-content">
                    <strong>Envíos a Todo México</strong>
                    <p>Logística eficiente para que nunca te quedes sin stock en tu negocio.</p>
                  </div>
                </li>
                <li className="benefit-item-glass">
                  <div className="icon dist-icon-handshake">
                    <Handshake size={24} />
                  </div>
                  <div className="benefit-item-content">
                    <strong>Capacitación Constante</strong>
                    <p>Asesoría directa sobre el mecanismo de acción de nuestros productos para que puedas orientar a tus clientes.</p>
                  </div>
                </li>
              </ul>

              <div className="contact-direct">
                <h3>Contacto Directo</h3>
                <p>También puedes comunicarte con nuestro equipo de ventas mayoristas:</p>
                <div className="contact-methods">
                  <a href="mailto:distribuidores@megatrol.com.mx" className="contact-method">
                    <Mail size={18} />
                    <span>distribuidores@megatrol.com.mx</span>
                  </a>
                  <a 
                    href="https://wa.me/525536206854?text=Hola,%20me%20interesa%20informaci%C3%B3n%20para%20ser%20distribuidor%20de%20Megatrol" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="contact-method method-whatsapp"
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp: (55) 3620 6854</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="distributors-form-container">
              {distributorSubmitted ? (
                <div className="success-message">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={48} color="var(--color-primary)" />
                  </div>
                  <h3>¡Solicitud Recibida!</h3>
                  <p>
                    Gracias por tu interés en Megatrol. Un asesor se comunicará contigo en las próximas 
                    24-48 horas hábiles para proporcionarte nuestro catálogo de mayoreo y listas de precios.
                  </p>
                  <button className="btn btn-primary" onClick={() => setDistributorSubmitted(false)}>Enviar otra solicitud</button>
                </div>
              ) : (
                <form className="distributors-form" onSubmit={handleFormSubmit}>
                  <h2>Formulario de Registro</h2>
                  <p>Déjanos tus datos y nos pondremos en contacto contigo.</p>
                  
                  <div className="form-group">
                    <label>Nombre Completo *</label>
                    <input type="text" name="nombre" required value={formData.nombre} onChange={handleFormChange} />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Correo Electrónico *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                      <label>Teléfono / WhatsApp *</label>
                      <input type="tel" name="telefono" required value={formData.telefono} onChange={handleFormChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Nombre de tu Negocio / Clínica *</label>
                    <input type="text" name="negocio" required value={formData.negocio} onChange={handleFormChange} />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Estado *</label>
                      <select name="estado" required value={formData.estado} onChange={handleFormChange}>
                        <option value="">Selecciona tu estado</option>
                        <option value="Aguascalientes">Aguascalientes</option>
                        <option value="Baja California">Baja California</option>
                        <option value="CDMX">CDMX</option>
                        <option value="Estado de México">Estado de México</option>
                        <option value="Guanajuato">Guanajuato</option>
                        <option value="Jalisco">Jalisco</option>
                        <option value="Michoacán">Michoacán</option>
                        <option value="Nuevo León">Nuevo León</option>
                        <option value="Puebla">Puebla</option>
                        <option value="Querétaro">Querétaro</option>
                        <option value="Veracruz">Veracruz</option>
                        <option value="Yucatán">Yucatán</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Ciudad *</label>
                      <input type="text" name="ciudad" required value={formData.ciudad} onChange={handleFormChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>¿Cómo nos conociste? / Comentarios</label>
                    <textarea name="comentarios" rows={3} value={formData.comentarios} onChange={handleFormChange}></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">Solicitar Información de Mayoreo</button>
                </form>
              )}
            </div>
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

      {/* Pantalla Emergente (Modal) con toda la información del producto */}
      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />

    </div>
  );
};

export default Home;
