import { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { blogArticles, type BlogArticle } from '../../data/blog';
import BlogModal from '../../components/BlogModal/BlogModal';
import './Blog.css';

const Blog = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  return (
    <div className="blog-page">
      {/* ── HERO ── */}
      <div className="container page-banner-container">
        <div className="page-banner-header banner-blog">
          <span className="page-banner-badge">Inobazz Pharma</span>
          <h1>Blog y Consejos</h1>
          <p>Información veterinaria de confianza para el cuidado de tus mascotas y animales</p>
        </div>
      </div>

      {/* ── ARTICLES ── */}
      <section className="blog-page-articles">
        <div className="container">
          <div className="blog-grid blog-grid-full">
            {blogArticles.map(article => (
              <article
                key={article.id}
                className="blog-card"
                onClick={() => setSelectedArticle(article)}
                style={{ cursor: 'pointer' }}
              >
                <div className="blog-image-wrap">
                  <img src={article.image} alt={article.title} className="blog-card-img" />
                  <span className="blog-card-category-badge">{article.category}</span>
                </div>
                <div className="blog-content">
                  <div className="blog-date">
                    <Calendar size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                    {article.date} · 
                    <Clock size={13} style={{ marginLeft: 6, marginRight: 4, verticalAlign: 'middle' }} />
                    {article.readTime}
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <span className="read-more">Leer artículo completo →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pantalla Emergente (Modal) con toda la información del artículo */}
      <BlogModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
};

export default Blog;
