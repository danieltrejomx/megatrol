import { useState } from 'react';
import { 
  TrendingUp, 
  Package, 
  Truck, 
  Handshake, 
  Mail, 
  MessageCircle, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import './Distributors.css';

const Distributors = () => {
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '', negocio: '', estado: '', ciudad: '', comentarios: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="distributors-page">
      <div className="container page-banner-container">
        <div className="distributor-banner-header">
          <span className="distributor-banner-badge">Distribución Directa de Laboratorio</span>
          <h1>Ventas al Mayoreo</h1>
          <p>
            ¿Tienes una veterinaria, tienda de mascotas, forrajera, rancho o eres revendedor? 
            Únete a la red nacional de distribuidores de Inobazz Pharma y obtén precios directos de fábrica.
          </p>
          <div className="distributor-banner-tags">
            <span className="distributor-tag">⭐ Márgenes de 35% a 55%</span>
            <span className="distributor-tag">🚚 Envíos a Todo México</span>
            <span className="distributor-tag">📦 Material POP y Displays</span>
            <span className="distributor-tag">🩺 Soporte Técnico Veterinario</span>
          </div>
        </div>
      </div>

      <div className="container distributors-content">
        <div className="distributors-layout">
          <div className="distributors-info">
            <span className="dist-card-badge">
              <Sparkles size={14} /> Ventajas Comerciales
            </span>
            <h2>Beneficios de ser Distribuidor</h2>
            <p className="dist-card-intro">
              Únete a nuestra red nacional autorizada con respaldo directo de laboratorio y condiciones comerciales preferenciales para hacer crecer tu negocio veterinario.
            </p>

            <ul className="benefits-list">
              <li className="benefit-item-glass">
                <div className="icon dist-icon-trending">
                  <TrendingUp size={24} />
                </div>
                <div className="benefit-item-content">
                  <strong>Altos Márgenes de Ganancia</strong>
                  <p>Precios preferenciales escalonados según volumen de compra. Retorno de inversión atractivo.</p>
                </div>
              </li>
              <li className="benefit-item-glass">
                <div className="icon dist-icon-package">
                  <Package size={24} />
                </div>
                <div className="benefit-item-content">
                  <strong>Material de Apoyo</strong>
                  <p>Te proporcionamos displays, folletos informativos y material digital para tus redes sociales.</p>
                </div>
              </li>
              <li className="benefit-item-glass">
                <div className="icon dist-icon-truck">
                  <Truck size={24} />
                </div>
                <div className="benefit-item-content">
                  <strong>Envíos a Todo México</strong>
                  <p>Logística eficiente para que nunca te quedes sin stock en tu negocio.</p>
                </div>
              </li>
              <li className="benefit-item-glass">
                <div className="icon dist-icon-handshake">
                  <Handshake size={24} />
                </div>
                <div className="benefit-item-content">
                  <strong>Capacitación Constante</strong>
                  <p>Asesoría directa sobre el mecanismo de acción de nuestros productos para que puedas orientar a tus clientes.</p>
                </div>
              </li>
            </ul>

            <div className="contact-direct">
              <h3>Contacto Directo</h3>
              <p>También puedes comunicarte con nuestro equipo de ventas mayoristas:</p>
              <div className="contact-methods">
                <a href="mailto:distribuidores@megatrol.com.mx" className="contact-method">
                  <Mail size={18} />
                  <span>distribuidores@megatrol.com.mx</span>
                </a>
                <a 
                  href="https://wa.me/525536206854?text=Hola,%20me%20interesa%20informaci%C3%B3n%20para%20ser%20distribuidor%20de%20Megatrol" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="contact-method method-whatsapp"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp: (55) 3620 6854</span>
                </a>
              </div>
            </div>
          </div>

          <div className="distributors-form-container">
            {submitted ? (
              <div className="success-message">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={48} color="var(--color-primary)" />
                </div>
                <h3>¡Solicitud Recibida!</h3>
                <p>
                  Gracias por tu interés en Megatrol. Un asesor se comunicará contigo en las próximas 
                  24-48 horas hábiles para proporcionarte nuestro catálogo de mayoreo y listas de precios.
                </p>
                <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Enviar otra solicitud</button>
              </div>
            ) : (
              <form className="distributors-form" onSubmit={handleSubmit}>
                <h2>Formulario de Registro</h2>
                <p>Déjanos tus datos y nos pondremos en contacto contigo.</p>
                
                <div className="form-group">
                  <label>Nombre Completo *</label>
                  <input type="text" name="nombre" required value={form.nombre} onChange={handleChange} />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Correo Electrónico *</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Teléfono / WhatsApp *</label>
                    <input type="tel" name="telefono" required value={form.telefono} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Nombre de tu Negocio / Clínica *</label>
                  <input type="text" name="negocio" required value={form.negocio} onChange={handleChange} />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Estado *</label>
                    <select name="estado" required value={form.estado} onChange={handleChange}>
                      <option value="">Selecciona tu estado</option>
                      <option value="Jalisco">Jalisco</option>
                      <option value="CDMX">CDMX</option>
                      <option value="Nuevo Leon">Nuevo León</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Ciudad *</label>
                    <input type="text" name="ciudad" required value={form.ciudad} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label>¿Cómo nos conociste? / Comentarios</label>
                  <textarea name="comentarios" rows={3} value={form.comentarios} onChange={handleChange}></textarea>
                </div>

                <button type="submit" className="btn btn-primary submit-btn">Solicitar Información de Mayoreo</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distributors;
