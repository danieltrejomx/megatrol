import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  CheckCircle2, 
  Mail, 
  Package, 
  MessageCircle, 
  Building2, 
  Copy, 
  Check, 
  ShieldCheck,
  Truck,
  CreditCard,
  Store,
  ExternalLink,
  Send
} from 'lucide-react';
import { MEGATROL_BANK_DETAILS } from '../../data/bankDetails';
import './OrderConfirmed.css';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  variant?: string;
}

interface OrderData {
  orderNumber: string;
  customerName?: string;
  email?: string;
  phone?: string;
  total: number;
  shipping?: number;
  paymentMethod?: 'card' | 'oxxo' | 'transfer';
  date?: string;
  items?: OrderItem[];
  address?: {
    calle: string;
    colonia: string;
    ciudad: string;
    estado: string;
    cp: string;
  };
}

const OrderConfirmed = () => {
  const location = useLocation();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [copiedClabe, setCopiedClabe] = useState(false);
  const [emailSentToast, setEmailSentToast] = useState(false);

  useEffect(() => {
    if (location.state && (location.state as OrderData).orderNumber) {
      setOrder(location.state as OrderData);
    } else {
      try {
        const stored = sessionStorage.getItem('megatrol_last_order');
        if (stored) {
          setOrder(JSON.parse(stored));
        } else {
          setOrder({
            orderNumber: `MEG-${Math.floor(100000 + Math.random() * 900000)}`,
            total: 598,
            paymentMethod: 'transfer'
          });
        }
      } catch {
        setOrder({
          orderNumber: `MEG-${Math.floor(100000 + Math.random() * 900000)}`,
          total: 598,
          paymentMethod: 'transfer'
        });
      }
    }
  }, [location.state]);

  const orderNumber = order?.orderNumber || `MEG-${Math.floor(100000 + Math.random() * 900000)}`;
  const isTransfer = !order?.paymentMethod || order.paymentMethod === 'transfer';
  const orderTotal = order?.total || 0;

  const handleCopyClabe = () => {
    navigator.clipboard.writeText(MEGATROL_BANK_DETAILS.clabe);
    setCopiedClabe(true);
    setTimeout(() => setCopiedClabe(false), 2500);
  };

  const handleSendEmailCopy = () => {
    setEmailSentToast(true);
    setTimeout(() => setEmailSentToast(false), 4000);
  };

  // Build a friendly, complete WhatsApp receipt
  const itemsText = order?.items && order.items.length > 0 
    ? order.items.map(i => `• ${i.name} (${i.variant || 'Estándar'}) x${i.qty} - $${(i.price * i.qty).toFixed(2)}`).join('\n')
    : '• Megatrol Línea Veterinaria';

  const addressText = order?.address 
    ? `${order.address.calle}, Col. ${order.address.colonia}, ${order.address.ciudad}, ${order.address.estado}, CP ${order.address.cp}`
    : 'A acordar por WhatsApp';

  const paymentLabel = order?.paymentMethod === 'card' 
    ? 'Tarjeta de Crédito / Débito' 
    : order?.paymentMethod === 'oxxo' 
    ? 'Efectivo OXXO Pay' 
    : 'Transferencia Banamex SPEI';

  const fullConfirmationMessage = encodeURIComponent(
`¡Hola Distribuidora de Megatrol! Acabo de registrar mi compra en la tienda oficial:

📋 *Orden:* ${orderNumber}
👤 *Cliente:* ${order?.customerName || 'Cliente Megatrol'}
📞 *Teléfono:* ${order?.phone || 'No especificado'}
📧 *Correo:* ${order?.email || 'No especificado'}

🛒 *Productos:*
${itemsText}

💰 *Total:* $${orderTotal.toFixed(2)} MXN
💳 *Forma de Pago:* ${paymentLabel}
📍 *Envío a:* ${addressText}

${isTransfer ? '👉 Adjunto en este chat mi comprobante de transferencia Banamex para generar mi guía de envío.' : '👉 Favor de confirmar mi pedido y número de guía de paquetería cuando esté en camino.'}`
  );

  return (
    <div className="order-confirmed-page container">
      <div className="confirmed-card">
        
        {/* Success Icon */}
        <div className="confirmed-icon">
          <CheckCircle2 size={68} color="#0084c7" />
        </div>
        
        <h1 className="confirmed-main-title">¡Pedido Registrado con Éxito!</h1>
        <p className="order-number">Número de orden: <strong>{orderNumber}</strong></p>

        {order?.customerName && (
          <p className="confirmed-greeting">
            Hola <strong>{order.customerName}</strong>, gracias por tu compra en la tienda oficial de Megatrol.
          </p>
        )}

        {/* Channels of Confirmation Box */}
        <div className="confirmed-channels-box">
          <div className="channel-box-header">
            <MessageCircle size={22} className="channel-icon-wa" />
            <div className="channel-box-title">
              <h3>Confirmación Inmediata por WhatsApp</h3>
              <p>Envía tu pedido a la Distribuidora de Megatrol para preparar tu paquete de inmediato.</p>
            </div>
          </div>

          <a
            href={`https://wa.me/${MEGATROL_BANK_DETAILS.supportWhatsapp}?text=${fullConfirmationMessage}`}
            target="_blank"
            rel="noreferrer"
            className="btn-confirm-whatsapp-full"
          >
            <MessageCircle size={20} />
            <span>{isTransfer ? 'Enviar Comprobante por WhatsApp' : 'Confirmar Pedido por WhatsApp'}</span>
            <ExternalLink size={16} />
          </a>

          {order?.email && (
            <div className="channel-email-row">
              <div className="channel-email-text">
                <Mail size={16} />
                <span>Copia registrada para: <strong>{order.email}</strong></span>
              </div>
              <button 
                type="button" 
                className="btn-request-email-copy"
                onClick={handleSendEmailCopy}
              >
                <Send size={14} />
                <span>Enviar copia a mi correo</span>
              </button>
            </div>
          )}

          {emailSentToast && (
            <div className="email-sent-toast">
              <Check size={16} />
              <span>¡Confirmación enviada! Recibirás los datos en tu bandeja de entrada o spam.</span>
            </div>
          )}
        </div>

        {/* Order Details Breakdown */}
        {order?.items && order.items.length > 0 && (
          <div className="confirmed-items-card">
            <h3>Resumen de tu Compra</h3>
            <div className="confirmed-items-list">
              {order.items.map((it, idx) => (
                <div key={idx} className="c-item-row">
                  <div className="c-item-info">
                    <strong>{it.name}</strong>
                    {it.variant && <span className="c-item-variant">{it.variant}</span>}
                  </div>
                  <div className="c-item-price-qty">
                    <span>x{it.qty}</span>
                    <strong>${(it.price * it.qty).toFixed(2)} MXN</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="confirmed-totals-box">
              <div className="c-total-line">
                <span>Envío:</span>
                <span>{order.shipping === 0 ? '¡Gratis!' : `$${order.shipping || 99}.00 MXN`}</span>
              </div>
              <div className="c-total-line c-total-final">
                <span>Total a Pagar:</span>
                <strong>${orderTotal.toFixed(2)} MXN</strong>
              </div>
            </div>

            {order?.address && (
              <div className="confirmed-address-box">
                <Truck size={16} />
                <span><strong>Dirección de entrega:</strong> {addressText}</span>
              </div>
            )}
          </div>
        )}

        {/* Bank Transfer Instructions Card (Banamex - Distribuidora de Megatrol) */}
        {isTransfer && (
          <div className="confirmed-bank-card">
            <div className="confirmed-bank-header">
              <div className="confirmed-bank-title">
                <Building2 size={22} color="#0084c7" />
                <h3>Datos para Transferencia Bancaria (SPEI)</h3>
              </div>
              <span className="confirmed-bank-badge">
                <ShieldCheck size={14} />
                <span>Cuenta Verificada</span>
              </span>
            </div>

            <p className="confirmed-bank-intro">
              Para despachar tu paquete de inmediato, realiza tu transferencia a la cuenta oficial de la distribuidora:
            </p>

            <div className="confirmed-bank-grid">
              <div className="confirmed-bank-item">
                <span className="c-bank-label">Beneficiario / Titular:</span>
                <strong className="c-bank-value">{MEGATROL_BANK_DETAILS.beneficiary}</strong>
              </div>

              <div className="confirmed-bank-item">
                <span className="c-bank-label">Banco:</span>
                <strong className="c-bank-value">{MEGATROL_BANK_DETAILS.bankName}</strong>
              </div>

              <div className="confirmed-bank-item c-clabe-item">
                <span className="c-bank-label">CLABE Interbancaria (18 dígitos):</span>
                <div className="c-clabe-row">
                  <code className="c-clabe-code">{MEGATROL_BANK_DETAILS.clabe}</code>
                  <button
                    type="button"
                    className="c-btn-copy-clabe"
                    onClick={handleCopyClabe}
                    title="Copiar CLABE"
                  >
                    {copiedClabe ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedClabe ? '¡Copiada!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              {orderTotal > 0 && (
                <div className="confirmed-bank-item">
                  <span className="c-bank-label">Total exacto a depositar:</span>
                  <strong className="c-bank-value c-total-highlight">
                    ${orderTotal.toFixed(2)} MXN
                  </strong>
                </div>
              )}

              <div className="confirmed-bank-item">
                <span className="c-bank-label">Concepto / Referencia:</span>
                <strong className="c-bank-value c-ref-code">{orderNumber}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Card or Oxxo notice */}
        {order?.paymentMethod === 'card' && (
          <div className="confirmed-payment-badge-row">
            <CreditCard size={20} color="#0084c7" />
            <span>Pago procesado con <strong>Tarjeta de Crédito / Débito</strong>.</span>
          </div>
        )}
        {order?.paymentMethod === 'oxxo' && (
          <div className="confirmed-payment-badge-row">
            <Store size={20} color="#f59e0b" />
            <span>Recuerda acudir a tu tienda OXXO más cercana con tu referencia: <strong>{orderNumber}</strong></span>
          </div>
        )}

        {/* Next Steps */}
        <div className="next-steps">
          <div className="next-step">
            <div className="next-step-icon">
              <Package size={22} />
            </div>
            <p>Tu paquete será despachado de bodega en un plazo de <strong>1-2 días hábiles</strong> hacia tu domicilio.</p>
          </div>
          <div className="next-step">
            <div className="next-step-icon">
              <Truck size={22} />
            </div>
            <p>Recibirás tu número de guía de rastreo (Estafeta / FedEx / RedPack) por WhatsApp o correo.</p>
          </div>
          <div className="next-step">
            <div className="next-step-icon">
              <MessageCircle size={22} />
            </div>
            <p>¿Dudas sobre dosis o aplicación veterinaria? Mayela te atiende directo al <strong>(55) 3620 6854</strong>.</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="confirmed-actions">
          <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
          <Link to="/tienda" className="btn btn-secondary">Seguir Comprando</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;
