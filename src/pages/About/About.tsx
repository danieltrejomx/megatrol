import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>Conoce a Inobazz</h1>
          <p>
            Somos un laboratorio mexicano comprometido con la salud y el bienestar de las mascotas,
            liderando la transición hacia soluciones naturales de grado farmacéutico.
          </p>
        </div>
      </div>

      <div className="container about-content">
        <section className="about-history">
          <div className="history-text">
            <h2>Nuestra Historia</h2>
            <p>
              Inobazz Pharma nació de una necesidad evidente: la industria veterinaria dependía
              enormemente de pesticidas sintéticos y químicos agresivos para el control de parásitos.
              Estos productos, aunque efectivos, a menudo provocaban reacciones adversas en mascotas
              sensibles y suponían un riesgo a largo plazo para la salud del animal y la familia.
            </p>
            <p>
              Con un equipo multidisciplinario de veterinarios, químicos y biólogos, nos propusimos
              desarrollar una alternativa que fuera igualmente letal para los parásitos pero completamente
              segura para los mamíferos. Así nació la línea Megatrol.
            </p>
          </div>
          <div className="history-stats">
            <div className="stat-box">
              <span className="stat-number">+10k</span>
              <span className="stat-label">Mascotas Protegidas</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">100%</span>
              <span className="stat-label">Ingredientes Naturales</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">32</span>
              <span className="stat-label">Estados de la República</span>
            </div>
          </div>
        </section>

        <section className="about-values">
          <div className="section-header">
            <h2>Nuestros Pilares</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🔬</div>
              <h3>Rigor Científico</h3>
              <p>Nuestras formulaciones botánicas pasan por los mismos controles de calidad y eficacia que los productos alopáticos.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🐾</div>
              <h3>Bienestar Animal</h3>
              <p>La seguridad y confort de tu mascota es nuestra prioridad número uno. Formulamos sin sulfatos agresivos ni tóxicos.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Sustentabilidad</h3>
              <p>Utilizamos ingredientes biodegradables que no contaminan los mantos acuíferos ni dañan el medio ambiente.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
