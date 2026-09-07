import { Link } from 'react-router-dom';
import { CheckCircle2, Mail, Package, MessageCircle } from 'lucide-react';
import './OrderConfirmed.css';

const OrderConfirmed = () => {
  const orderNumber = `MEG-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="order-confirmed-page container">
      <div className="confirmed-card">
        <div className="confirmed-icon">
          <CheckCircle2 size={68} color="var(--color-primary)" />
        </div>
        <h1>¡Pedido Confirmado!</h1>
        <p className="order-number">Número de orden: <strong>{orderNumber}</strong></p>
        <p className="confirmed-msg">
          Gracias por tu compra. Hemos enviado los detalles de tu pedido a tu correo electrónico.
          Tu paquete será enviado en un plazo de <strong>1-2 días hábiles</strong>.
        </p>
        <div className="next-steps">
          <div className="next-step">
            <div className="next-step-icon">
              <Mail size={22} />
            </div>
            <p>Recibirás un correo con la confirmación y número de guía de envío.</p>
          </div>
          <div className="next-step">
            <div className="next-step-icon">
              <Package size={22} />
            </div>
            <p>Tu pedido llegará en 3-5 días hábiles a toda la República Mexicana.</p>
          </div>
          <div className="next-step">
            <div className="next-step-icon">
              <MessageCircle size={22} />
            </div>
            <p>¿Tienes dudas? Contáctanos por WhatsApp. ¡Estamos aquí para ayudarte!</p>
          </div>
        </div>
        <div className="confirmed-actions">
          <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
          <Link to="/tienda" className="btn btn-secondary">Seguir Comprando</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;
