import { 
  Zap, 
  FlaskConical, 
  RefreshCw, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import './Science.css';

const Science = () => {
  return (
    <div className="science-page">
      <div className="container page-banner-container">
        <div className="page-banner-header banner-ciencia">
          <span className="page-banner-badge">Innovación Natural</span>
          <h1>Nuestra Ciencia</h1>
          <p>
            Descubre cómo Megatrol combina el poder de la naturaleza con el rigor científico
            para ofrecer la protección más segura y efectiva para tu mascota.
          </p>
        </div>
      </div>

      <div className="container science-content">
        {/* Pilar 1: Monoterpenos Cíclicos */}
        <section className="science-pillar-card">
          <div className="science-pillar-content">
            <div className="science-pillar-badge">
              <FlaskConical size={15} />
              <span>Fitoterapia Veterinaria</span>
              <span className="badge-dot">•</span>
              <span>Extracción Botánica</span>
            </div>
            <h2>El Poder de los Monoterpenos Cíclicos</h2>
            <p className="science-lead">
              Nuestra fórmula exclusiva se basa en la sinergia de <strong>monoterpenos cíclicos</strong> extraídos de aceites esenciales botánicos de alta pureza. Estos compuestos representan el mecanismo de defensa natural desarrollado por las plantas durante millones de años.
            </p>
            <p className="science-body">
              A diferencia de los insecticidas químicos tradicionales que atacan agresivamente el sistema nervioso de los mamíferos, nuestros monoterpenos actúan específicamente sobre los receptores del ectoparásito, garantizando máxima eficacia con total inocuidad para tu mascota y tu familia.
            </p>
            <div className="science-pillar-features">
              <div className="pillar-feature-item">
                <CheckCircle2 size={16} className="pillar-icon" />
                <span>Sinergia botánica de grado farmacéutico</span>
              </div>
              <div className="pillar-feature-item">
                <CheckCircle2 size={16} className="pillar-icon" />
                <span>Cero toxicidad residual en el hogar y pelaje</span>
              </div>
              <div className="pillar-feature-item">
                <CheckCircle2 size={16} className="pillar-icon" />
                <span>Aroma botánico fresco sin vapores irritantes</span>
              </div>
            </div>
          </div>
          <div className="science-pillar-media">
            <div className="science-image-card">
              <img 
                src="/images/ciencia-monoterpenos.jpg" 
                alt="Monoterpenos Cíclicos de origen botánico" 
                className="science-card-img" 
              />
              <div className="science-card-caption">
                <span className="science-caption-tag">Fitoterapia Veterinaria</span>
                <strong className="science-caption-title">Monoterpenos Cíclicos</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Pilar 2: Aceite de Neem (Estilo Lindo y Luminoso Como Segunda Captura) */}
        <section className="science-pillar-card">
          <div className="science-pillar-content">
            <div className="science-pillar-badge">
              <ShieldCheck size={15} />
              <span>Activo Botánico Estrella</span>
              <span className="badge-dot">•</span>
              <span>Azadirachta indica</span>
            </div>
            <h2>Aceite de Neem: El Escudo Protector</h2>
            <p className="science-lead">
              Enriquecemos nuestra fórmula con <strong>Aceite de Neem (Azadirachta indica)</strong> prensado en frío, reconocido mundialmente por sus extraordinarias propiedades repelentes, insecticidas y antiparasitarias de amplio espectro.
            </p>
            <p className="science-body">
              El ingrediente activo clave, la <strong>azadiractina</strong>, es fundamental para nuestro mecanismo de acción: no solo derriba y elimina a los parásitos adultos en contacto, sino que también actúa de forma integral sobre su sistema reproductivo.
            </p>
            <div className="science-pillar-features">
              <div className="pillar-feature-item">
                <CheckCircle2 size={16} className="pillar-icon" />
                <span>Efecto Adulticida Inmediato: derriba pulgas, garrapatas y ácaros al contacto</span>
              </div>
              <div className="pillar-feature-item">
                <CheckCircle2 size={16} className="pillar-icon" />
                <span>Bloqueo Hormonal IGR: inhibe la muda larvaria y esteriliza al parásito</span>
              </div>
              <div className="pillar-feature-item">
                <CheckCircle2 size={16} className="pillar-icon" />
                <span>100% Inocuo para Mamíferos: seguro para cachorros, gatos y la convivencia familiar</span>
              </div>
            </div>
          </div>
          <div className="science-pillar-media">
            <div className="science-image-card">
              <img 
                src="/images/ciencia-aceite-neem.jpg" 
                alt="Aceite de Neem Puro prensado en frío" 
                className="science-card-img" 
              />
              <div className="science-card-caption">
                <span className="science-caption-tag">Pureza Botánica Certificada</span>
                <strong className="science-caption-title">Aceite de Neem (Azadirachta indica)</strong>
              </div>
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
              <div className="mechanism-icon step-1">
                <Zap size={26} />
              </div>
              <h3>1. Parálisis Inmediata</h3>
              <p>Los activos penetran el exoesqueleto del parásito adulto, causando un colapso en su sistema respiratorio y nervioso.</p>
            </div>
            <div className="mechanism-card">
              <div className="mechanism-icon step-2">
                <FlaskConical size={26} />
              </div>
              <h3>2. Bloqueo Hormonal</h3>
              <p>La azadiractina imita a la hormona ecdisona, impidiendo que las larvas muden y maduren al siguiente estado.</p>
            </div>
            <div className="mechanism-card">
              <div className="mechanism-icon step-3">
                <RefreshCw size={26} />
              </div>
              <h3>3. Inhibición de Huevos</h3>
              <p>Interrumpe la reproducción y esteriliza a las hembras, cortando el ciclo de reinfestación de raíz.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Science;
