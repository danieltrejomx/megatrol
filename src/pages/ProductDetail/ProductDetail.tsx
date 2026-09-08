import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { ProductModal } from '../../components/ProductModal/ProductModal';
import Shop from '../Shop/Shop';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    if (!product) {
      navigate('/tienda', { replace: true });
      return;
    }

    const previousTitle = document.title;
    document.title = `${product.name} | Megatrol Pet Care`;

    return () => {
      document.title = previousTitle;
    };
  }, [product, navigate]);

  if (!product) return null;

  const handleClose = () => {
    // Si viene de navegación interna del sitio, retrocede; si entró directo al link, va a la tienda
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/tienda');
    }
  };

  return (
    <>
      <Shop />
      <ProductModal product={product} onClose={handleClose} />
    </>
  );
};

export default ProductDetail;

