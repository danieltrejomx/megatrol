import { useState } from 'react';
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
      <div className="distributors-hero">
        <div className="container">
          <h1>Únete a la Red Megatrol</h1>
          <p>
            Ventas al mayoreo para veterinarias, estéticas caninas, pet shops y distribuidores independientes.
            Ofrece a tus clientes la mejor alternativa ecológica del mercado.
          </p>
        </div>
      </div>

      <div className="container distributors-content">
        <div className="distributors-layout">
          <div className="distributors-info">
            <h2>Beneficios de ser Distribuidor</h2>
            <ul className="benefits-list">
              <li>
                <span className="icon">📈</span>
                <div>
                  <strong>Altos Márgenes de Ganancia</strong>
                  <p>Precios preferenciales escalonados según volumen de compra. Retorno de inversión atractivo.</p>
                </div>
              </li>
              <li>
                <span className="icon">📦</span>
                <div>
                  <strong>Material de Apoyo</strong>
                  <p>Te proporcionamos displays, folletos informativos y material digital para tus redes sociales.</p>
                </div>
              </li>
              <li>
                <span className="icon">🚚</span>
                <div>
                  <strong>Envíos a Todo México</strong>
                  <p>Logística eficiente para que nunca te quedes sin stock en tu negocio.</p>
                </div>
              </li>
              <li>
                <span className="icon">🤝</span>
                <div>
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
                  <span>✉️</span> distribuidores@megatrol.com.mx
                </a>
                <a href="https://wa.me/5211234567890" target="_blank" rel="noreferrer" className="contact-method">
                  <span>💬</span> WhatsApp: +52 112 345 6789
                </a>
              </div>
            </div>
          </div>

          <div className="distributors-form-container">
            {submitted ? (
              <div className="success-message">
                <span className="success-icon">✅</span>
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
