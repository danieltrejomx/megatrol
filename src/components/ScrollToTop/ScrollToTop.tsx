import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: unknown } | null;

  useEffect(() => {
    // If opening a product modal over a background location, preserve the user's scroll position
    if (state?.backgroundLocation) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, state?.backgroundLocation]);

  return null;
};

export default ScrollToTop;

