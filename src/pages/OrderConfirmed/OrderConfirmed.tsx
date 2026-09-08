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
  ShieldCheck 
} from 'lucide-react';
import { MEGATROL_BANK_DETAILS } from '../../data/bankDetails';
import './OrderConfirmed.css';

interface OrderData {
  orderNumber: string;
  customerName?: string;
  email?: string;
  phone?: string;
  total: number;
  shipping?: number;
  paymentMethod?: 'card' | 'oxxo' | 'transfer';
  date?: string;
}

const OrderConfirmed = () => {
  const location = useLocation();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [copiedClabe, setCopiedClabe] = useState(false);

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

  const whatsappMessage = encodeURIComponent(
    `Hola Mayela / Distribuidora de Megatrol, acabo de realizar la transferencia de $${orderTotal.toFixed(2)} MXN para el pedido ${orderNumber} de Megatrol. Adjunto mi comprobante:`
  );

  return (
    <div className="order-confirmed-page container">
      <div className="confirmed-card">
        <div className="confirmed-icon">
          <CheckCircle2 size={68} color="var(--color-primary)" />
        </div>
        <h1>¡Pedido Registrado con Éxito!</h1>
        <p className="order-number">Número de orden: <strong>{orderNumber}</strong></p>

        {order?.customerName && (
          <p className="confirmed-greeting">
            Hola <strong>{order.customerName}</strong>, gracias por tu compra.
          </p>
        )}

        <p className="confirmed-msg">
          Hemos registrado tu solicitud. Tu paquete será despachado de bodega en un plazo de <strong>1-2 días hábiles</strong> hacia tu domicilio.
        </p>

        {/* Bank Transfer Instructions Card (Banamex - Mayela Guillén Chávez) */}
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
                <span className="c-bank-label">Beneficiario:</span>
                <strong className="c-bank-value">{MEGATROL_BANK_DETAILS.beneficiary}</strong>
                <small className="c-bank-sub">{MEGATROL_BANK_DETAILS.distributorName}</small>
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

            {/* Direct WhatsApp Voucher CTA */}
            <div className="confirmed-whatsapp-voucher-box">
              <p>
                <strong>¿Ya realizaste tu transferencia?</strong> Envíanos tu comprobante para generar tu guía de envío al instante:
              </p>
              <a
                href={`https://wa.me/${MEGATROL_BANK_DETAILS.supportWhatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="btn-send-whatsapp-voucher"
              >
                <MessageCircle size={18} />
                <span>Enviar Comprobante por WhatsApp al (55) 3620 6854</span>
              </a>
            </div>
          </div>
        )}

        <div className="next-steps">
          <div className="next-step">
            <div className="next-step-icon">
              <Mail size={22} />
            </div>
            <p>Recibirás un correo con la confirmación y número de guía de envío de Estafeta / FedEx.</p>
          </div>
          <div className="next-step">
            <div className="next-step-icon">
              <Package size={22} />
            </div>
            <p>Tu pedido llegará en 3-5 días hábiles a toda la República Mexicana con empaque seguro.</p>
          </div>
          <div className="next-step">
            <div className="next-step-icon">
              <MessageCircle size={22} />
            </div>
            <p>¿Tienes dudas sobre tu dosis o envío? Nuestro equipo veterinario te atiende por WhatsApp.</p>
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
