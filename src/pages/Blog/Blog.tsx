import { useNavigate } from 'react-router-dom';
import { blogArticles } from '../../data/blog';
import './Blog.css';

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="blog-page">
      {/* ── HERO ── */}
      <section className="blog-page-hero">
        <div className="container">
          <span className="section-label">Inobazz Pharma</span>
          <h1>Blog y Consejos 📝</h1>
          <p>Información veterinaria de confianza para el cuidado de tus mascotas y animales</p>
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section className="blog-page-articles">
        <div className="container">
          <div className="blog-grid blog-grid-full">
            {blogArticles.map(article => (
              <article
                key={article.id}
                className="blog-card"
                onClick={() => navigate(`/blog/${article.slug}`)}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className="blog-image"
                  style={{
                    background: article.heroColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 80,
                  }}
                >
                  {article.emoji}
                </div>
                <div className="blog-content">
                  <div className="blog-date">{article.date} · ⏱ {article.readTime}</div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
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

export default Blog;
