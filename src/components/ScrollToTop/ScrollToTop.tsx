import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: unknown; preventScroll?: boolean } | null;
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = location.pathname;

    const isShopOrCategory = (p: string) => p.startsWith('/tienda') || p.startsWith('/categoria');
    
    // Si la navegación es interna dentro de la tienda o categorías, jamás resetear scroll al tope
    if (isShopOrCategory(prev) && isShopOrCategory(location.pathname)) {
      return;
    }

    // Si se abre un modal sobre un fondo, o se solicita preventScroll, o es ruta de categoría
    if (
      state?.backgroundLocation ||
      state?.preventScroll ||
      location.pathname.includes('/categoria')
    ) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, state]);

  return null;
};

export default ScrollToTop;

