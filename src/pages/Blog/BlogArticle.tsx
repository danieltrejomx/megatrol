import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  UserCheck, 
  ShoppingCart, 
  MessageCircle, 
  Share2, 
  BookOpen, 
  Leaf, 
  Lightbulb, 
  AlertCircle,
  Zap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { blogArticles } from '../../data/blog';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './BlogArticle.css';

const getInitials = (name: string) => {
  return name.replace(/^(Dr\.|Dra\.|MVZ)\s+/i, '').split(' ').map(n => n[0]).slice(0, 2).join('');
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const handleBuyNow = (product: any) => {
    addToCart(product, 1);
    navigate('/carrito');
  };

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    setAddedSlug(product.slug);
    setTimeout(() => setAddedSlug(null), 2500);
  };
  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="blog-not-found">
        <div className="container">
          <h2>Artículo no encontrado</h2>
          <p>El artículo que buscas no existe o fue eliminado.</p>
          <Link to="/blog" className="btn btn-primary">Ver todos los artículos</Link>
        </div>
      </div>
    );
  }

  const related = blogArticles.filter(a => a.slug !== slug).slice(0, 2);

  return (
    <div className="blog-article-page">

      {/* ── HERO ── */}
      <div className="article-hero" style={{ background: article.heroColor }}>
        <div className="container article-hero-inner">
          <Link to="/blog" className="article-back-link">← Volver al Blog</Link>
          <div className="article-category-badge">{article.category}</div>
          <h1 className="article-hero-title">{article.title}</h1>
          <div className="article-meta">
            <span className="article-meta-item">
              <Calendar size={14} />
              <span>{article.date}</span>
            </span>
            <span className="article-meta-divider">·</span>
            <span className="article-meta-item">
              <Clock size={14} />
              <span>{article.readTime} de lectura</span>
            </span>
            <span className="article-meta-divider">·</span>
            <span className="article-meta-item">
              <UserCheck size={14} />
              <span>{article.author}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="container article-body-layout">

        {/* Main Content */}
        <article className="article-main-content">
          <div className="article-featured-image-box">
            <img src={article.image} alt={article.title} className="article-featured-image" />
          </div>
          <p className="article-lead">{article.excerpt}</p>

          {article.content.map((block, i) => {
            if (block.type === 'paragraph') {
              return <p key={i} className="article-paragraph">{block.text}</p>;
            }
            if (block.type === 'heading') {
              return <h2 key={i} className="article-heading">{block.text}</h2>;
            }
            if (block.type === 'list') {
              return (
                <ul key={i} className="article-list">
                  {block.items?.map((item, j) => (
                    <li key={j} className="article-list-item">{item}</li>
                  ))}
                </ul>
              );
            }
            if (block.type === 'tip') {
              return (
                <div key={i} className="article-tip-box">
                  <Lightbulb size={20} className="article-tip-icon" />
                  <div>{block.text}</div>
                </div>
              );
            }
            if (block.type === 'warning') {
              return (
                <div key={i} className="article-warning-box">
                  <AlertCircle size={20} className="article-warning-icon" />
                  <div>{block.text}</div>
                </div>
              );
            }
            if (block.type === 'product-cta') {
              const p = products.find(pr => pr.slug === block.productSlug);
              if (!p) return null;
              return (
                <div key={i} className="article-product-cta">
                  <div className="article-product-cta-left">
                    <span className="article-product-cta-label">Producto Recomendado</span>
                    <h3 className="article-product-cta-name">{block.productName}</h3>
                    <p className="article-product-cta-desc">{p.desc}</p>
                    <div className="article-product-cta-price">
                      ${p.price.toLocaleString('es-MX')} MXN
                    </div>
                  </div>
                  <div className="article-product-cta-actions">
                    <button
                      type="button"
                      className="btn btn-primary btn-article-buy"
                      onClick={() => handleBuyNow(p)}
                    >
                      <Zap size={16} />
                      <span>Comprar Ahora</span>
                    </button>
                    <button
                      type="button"
                      className={`btn btn-secondary btn-article-cart ${addedSlug === p.slug ? 'added' : ''}`}
                      onClick={() => handleAddToCart(p)}
                    >
                      {addedSlug === p.slug ? (
                        <>
                          <CheckCircle2 size={16} />
                          <span>¡Agregado al Carrito!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={16} />
                          <span>Agregar al Carrito</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn-article-view-link"
                      onClick={() => navigate(`/tienda?producto=${p.slug}`)}
                    >
                      <span>Ver Ficha Técnica Completa</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}

          {/* Author Box */}
          <div className="article-author-box">
            <div className="article-author-avatar">{getInitials(article.author)}</div>
            <div className="article-author-info">
              <span className="article-author-name">Escrito por {article.author}</span>
              <span className="article-author-role">{article.authorRole}</span>
              <span className="article-author-desc">
                Equipo científico de <strong>Inobazz Pharma</strong> — comprometido con la salud animal y la innovación botánica.
              </span>
            </div>
          </div>

          {/* Share */}
          <div className="article-share">
            <span className="article-share-label">¿Te fue útil este artículo? Compártelo:</span>
            <div className="article-share-btns">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(article.title + ' → https://megatrol.vercel.app/blog/' + article.slug)}`}
                target="_blank" rel="noreferrer"
                className="share-btn share-whatsapp"
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://megatrol.vercel.app/blog/' + article.slug)}`}
                target="_blank" rel="noreferrer"
                className="share-btn share-facebook"
              >
                <Share2 size={16} />
                <span>Compartir</span>
              </a>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="article-sidebar">
          <div className="sidebar-card">
            <h4 className="sidebar-card-title">
              <BookOpen size={17} />
              <span>Artículos Relacionados</span>
            </h4>
            <div className="sidebar-articles">
              {related.map(r => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="sidebar-article-item">
                  <img src={r.image} alt={r.title} className="sidebar-article-thumb" />
                  <div>
                    <div className="sidebar-article-title">{r.title}</div>
                    <div className="sidebar-article-date">{r.date} · {r.readTime}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="sidebar-card sidebar-cta">
            <span className="sidebar-cta-badge">
              <Leaf size={14} />
              <span>Productos Naturales</span>
            </span>
            <h4>¿Listo para proteger a tu mascota?</h4>
            <p>Descubre el catálogo completo de Inobazz Pharma con soluciones botánicas de grado veterinario.</p>
            <Link to="/tienda" className="btn btn-primary sidebar-btn">Ver Catálogo →</Link>
          </div>
        </aside>
      </div>

      {/* ── MORE ARTICLES ── */}
      <section className="more-articles-section">
        <div className="container">
          <h3 className="more-articles-title">Sigue Leyendo</h3>
          <div className="blog-grid">
            {related.map(r => (
              <article key={r.id} className="blog-card" onClick={() => navigate(`/blog/${r.slug}`)} style={{ cursor: 'pointer' }}>
                <div className="blog-image-wrap">
                  <img src={r.image} alt={r.title} className="blog-card-img" />
                  <span className="blog-card-category-badge">{r.category}</span>
                </div>
                <div className="blog-content">
                  <div className="blog-date">{r.date}</div>
                  <h3>{r.title}</h3>
                  <p>{r.excerpt}</p>
                  <span className="read-more">Leer artículo completo →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogArticle;
