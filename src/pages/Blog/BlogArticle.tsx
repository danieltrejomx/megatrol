import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogArticles } from '../../data/blog';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './BlogArticle.css';

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
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
          <div className="article-category-badge">{article.emoji} {article.category}</div>
          <h1 className="article-hero-title">{article.title}</h1>
          <div className="article-meta">
            <span className="article-meta-item">📅 {article.date}</span>
            <span className="article-meta-divider">·</span>
            <span className="article-meta-item">⏱ {article.readTime} de lectura</span>
            <span className="article-meta-divider">·</span>
            <span className="article-meta-item">{article.authorAvatar} {article.author}</span>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="container article-body-layout">

        {/* Main Content */}
        <article className="article-main-content">
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
                  {block.text}
                </div>
              );
            }
            if (block.type === 'warning') {
              return (
                <div key={i} className="article-warning-box">
                  {block.text}
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
                      className="btn btn-primary"
                      onClick={() => navigate(`/producto/${p.slug}`)}
                    >
                      Ver Producto
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => addToCart(p)}
                    >
                      🛒 Agregar al Carrito
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}

          {/* Author Box */}
          <div className="article-author-box">
            <div className="article-author-avatar">{article.authorAvatar}</div>
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
                📲 WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://megatrol.vercel.app/blog/' + article.slug)}`}
                target="_blank" rel="noreferrer"
                className="share-btn share-facebook"
              >
                📘 Facebook
              </a>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="article-sidebar">
          <div className="sidebar-card">
            <h4 className="sidebar-card-title">📚 Artículos Relacionados</h4>
            <div className="sidebar-articles">
              {related.map(r => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="sidebar-article-item">
                  <span className="sidebar-article-emoji">{r.emoji}</span>
                  <div>
                    <div className="sidebar-article-title">{r.title}</div>
                    <div className="sidebar-article-date">{r.date} · {r.readTime}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="sidebar-card sidebar-cta">
            <span className="sidebar-cta-badge">🌿 Productos Naturales</span>
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
                <div className="blog-image" style={{ background: r.heroColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72 }}>
                  {r.emoji}
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
