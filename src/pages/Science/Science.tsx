import './Science.css';

const Science = () => {
  return (
    <div className="science-page">
      <div className="science-hero">
        <div className="container">
          <span className="science-label">INNOVACIÓN NATURAL</span>
          <h1>Nuestra Ciencia</h1>
          <p>
            Descubre cómo Megatrol combina el poder de la naturaleza con el rigor científico
            para ofrecer la protección más segura y efectiva para tu mascota.
          </p>
        </div>
      </div>

      <div className="container science-content">
        <section className="science-section">
          <div className="science-text">
            <h2>El Poder de los Monoterpenos Cíclicos</h2>
            <p>
              Nuestra fórmula exclusiva se basa en la sinergia de monoterpenos cíclicos
              extraídos de aceites esenciales puros. Estos compuestos actúan como un
              mecanismo de defensa natural de las plantas y han demostrado una eficacia
              excepcional contra ectoparásitos.
            </p>
            <p>
              A diferencia de los insecticidas químicos tradicionales que atacan el sistema
              nervioso de los mamíferos, nuestros monoterpenos son seguros para tu mascota
              y tu familia.
            </p>
          </div>
          <div className="science-image">
            <div className="image-placeholder">
              <span style={{ fontSize: '64px' }}>🌿</span>
              <span>Monoterpenos</span>
            </div>
          </div>
        </section>

        <section className="science-section reverse">
          <div className="science-text">
            <h2>Aceite de Neem: El Escudo Protector</h2>
            <p>
              Enriquecemos nuestra fórmula con Aceite de Neem (Azadirachta indica), conocido
              mundialmente por sus propiedades repelentes y antiparasitarias. El ingrediente
              activo clave, la azadiractina, es fundamental para nuestro mecanismo de acción.
            </p>
            <p>
              No solo elimina los parásitos adultos, sino que también actúa sobre su
              sistema reproductivo.
            </p>
          </div>
          <div className="science-image">
            <div className="image-placeholder">
              <span style={{ fontSize: '64px' }}>🛡️</span>
              <span>Neem</span>
            </div>
          </div>
        </section>

        <section className="mechanism-section">
          <div className="section-header">
            <h2>Mecanismo de Acción Integral</h2>
            <p>Cómo Megatrol rompe el ciclo de vida del parásito</p>
          </div>
          <div className="mechanism-grid">
            <div className="mechanism-card">
              <div className="mechanism-icon">1️⃣</div>
              <h3>Parálisis Inmediata</h3>
              <p>Los activos penetran el exoesqueleto del parásito adulto, causando un colapso en su sistema respiratorio y nervioso.</p>
            </div>
            <div className="mechanism-card">
              <div className="mechanism-icon">2️⃣</div>
              <h3>Bloqueo Hormonal</h3>
              <p>La azadiractina imita a la hormona ecdisona, impidiendo que las larvas muden y maduren al siguiente estado.</p>
            </div>
            <div className="mechanism-card">
              <div className="mechanism-icon">3️⃣</div>
              <h3>Inhibición de Huevos</h3>
              <p>Interrumpe la reproducción y esteriliza a las hembras, cortando el ciclo de reinfestación de raíz.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Science;
