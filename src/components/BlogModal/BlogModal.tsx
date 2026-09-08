import React, { useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  UserCheck, 
  Lightbulb, 
  AlertCircle, 
  ShoppingCart, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';
import type { BlogArticle } from '../../data/blog';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './BlogModal.css';

interface BlogModalProps {
  article: BlogArticle | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ article, onClose }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [addedSlug, setAddedSlug] = React.useState<string | null>(null);

  const handleBuyNow = (prod: typeof products[0]) => {
    addToCart(prod, 1);
    onClose();
    navigate('/carrito');
  };

  const handleAddToCart = (prod: typeof products[0]) => {
    addToCart(prod, 1);
    setAddedSlug(prod.slug);
    setTimeout(() => setAddedSlug(null), 1600);
  };

  useEffect(() => {
    if (!article) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div className="blog-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="blog-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="blog-modal-close" onClick={onClose} aria-label="Cerrar artículo">
          <X size={22} />
        </button>

        {/* Modal Header */}
        <div className="blog-modal-header" style={{ background: article.heroColor }}>
          <div className="blog-modal-badge">{article.emoji} {article.category}</div>
          <h2 className="blog-modal-title">{article.title}</h2>
          <div className="blog-modal-meta">
            <span className="blog-modal-meta-item">
              <Calendar size={14} />
              <span>{article.date}</span>
            </span>
            <span>•</span>
            <span className="blog-modal-meta-item">
              <Clock size={14} />
              <span>{article.readTime} de lectura</span>
            </span>
            <span>•</span>
            <span className="blog-modal-meta-item">
              <UserCheck size={14} />
              <span>{article.author} ({article.authorRole})</span>
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="blog-modal-body">
          <div className="blog-modal-img-wrap">
            <img src={article.image} alt={article.title} className="blog-modal-img" />
          </div>

          <p className="blog-modal-lead">{article.excerpt}</p>

          <div className="blog-modal-content">
            {article.content.map((block, i) => {
              if (block.type === 'paragraph') {
                return <p key={i} className="modal-paragraph">{block.text}</p>;
              }
              if (block.type === 'heading') {
                return <h3 key={i} className="modal-heading">{block.text}</h3>;
              }
              if (block.type === 'list') {
                return (
                  <ul key={i} className="modal-list">
                    {block.items?.map((item, j) => (
                      <li key={j} className="modal-list-item">{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'tip') {
                return (
                  <div key={i} className="modal-tip-box">
                    <Lightbulb size={20} className="modal-tip-icon" />
                    <div>
                      <strong>Consejo Profesional:</strong>
                      <p>{block.text}</p>
                    </div>
                  </div>
                );
              }
              if (block.type === 'warning') {
                return (
                  <div key={i} className="modal-warning-box">
                    <AlertCircle size={20} className="modal-warning-icon" />
                    <div>
                      <strong>Importante:</strong>
                      <p>{block.text}</p>
                    </div>
                  </div>
                );
              }
              if (block.type === 'product-cta') {
                const prod = products.find(p => p.slug === block.productSlug);
                return (
                  <div key={i} className="modal-product-cta">
                    <div className="modal-product-badge">
                      <Sparkles size={14} />
                      <span>Recomendación Inobazz Pharma</span>
                    </div>
                    <h4>{block.productName || prod?.name || 'Tratamiento Recomendado'}</h4>
                    <p>Producto ecológico con extractos naturales de grado veterinario.</p>
                    {prod && (
                      <div className="modal-product-actions">
                        <button 
                          type="button"
                          className="btn btn-primary btn-modal-buy"
                          onClick={() => handleBuyNow(prod)}
                        >
                          <Zap size={16} />
                          <span>Comprar Ahora — ${prod.price}</span>
                        </button>
                        <button 
                          type="button"
                          className={`btn btn-secondary btn-modal-cart ${addedSlug === prod.slug ? 'added' : ''}`}
                          onClick={() => handleAddToCart(prod)}
                        >
                          {addedSlug === prod.slug ? (
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
                          className="btn-modal-view-link"
                          onClick={() => {
                            onClose();
                            navigate(`/tienda?producto=${prod.slug}`);
                          }}
                        >
                          <span>Ver Ficha Técnica Completa</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Modal Footer */}
          <div className="blog-modal-footer">
            <div className="blog-modal-author-card">
              <div className="blog-author-avatar-big">{article.authorAvatar}</div>
              <div>
                <strong>Revisado por {article.author}</strong>
                <p>{article.authorRole} • Especialista Inobazz Pharma</p>
              </div>
            </div>

            <a
              href={`https://wa.me/525536206854?text=${encodeURIComponent(`Hola, leí el artículo "${article.title}" y tengo una consulta veterinaria.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modal-whatsapp"
            >
              <MessageCircle size={18} />
              <span>Consultar con un Asesor Veterinario</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
