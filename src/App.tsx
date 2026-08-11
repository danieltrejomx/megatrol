import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderConfirmed from './pages/OrderConfirmed/OrderConfirmed';
import Science from './pages/Science/Science';
import About from './pages/About/About';
import Distributors from './pages/Distributors/Distributors';
import Blog from './pages/Blog/Blog';
import BlogArticle from './pages/Blog/BlogArticle';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tienda" element={<Shop />} />
              <Route path="/producto/:slug" element={<ProductDetail />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orden-confirmada" element={<OrderConfirmed />} />
              <Route path="/ciencia" element={<Science />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/distribuidores" element={<Distributors />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />

          {/* WhatsApp Floating Button */}
          <a
            href="https://wa.me/5211234567890"
            target="_blank"
            rel="noreferrer"
            style={{
              position: 'fixed', bottom: '20px', right: '20px',
              backgroundColor: '#25D366', color: 'white',
              width: '60px', height: '60px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)', zIndex: 1000
            }}
            aria-label="Contactar por WhatsApp"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </a>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
