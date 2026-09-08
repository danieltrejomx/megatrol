import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Redirecciona automáticamente a la tienda con la pantalla emergente del producto abierta
  useEffect(() => {
    if (slug) {
      navigate(`/tienda?producto=${slug}`, { replace: true });
    } else {
      navigate('/tienda', { replace: true });
    }
  }, [slug, navigate]);

  return null;
};

export default ProductDetail;
