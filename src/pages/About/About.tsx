import { useState, useEffect, useRef } from 'react';
import { FlaskConical, PawPrint, Leaf, MapPin, Sparkles } from 'lucide-react';
import './About.css';

function useCountUp(target: number, duration: number = 1800, start: boolean = false) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Smooth cubic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(1 + (target - 1) * easeOut);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, start]);

  return count;
}

const About = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const petsCount = useCountUp(10, 1600, isVisible);
  const naturalCount = useCountUp(100, 1800, isVisible);
  const statesCount = useCountUp(32, 1600, isVisible);

  return (
    <div className="about-page">
      <div className="container page-banner-container">
        <div className="page-banner-header banner-nosotros">
          <span className="page-banner-badge">Laboratorio Farmacéutico Veterinario</span>
          <h1>Conoce a Inobazz</h1>
          <p>
            Somos un laboratorio mexicano comprometido con la salud y el bienestar de las mascotas,
            liderando la transición hacia soluciones naturales de grado farmacéutico.
          </p>
        </div>
      </div>

      <div className="container about-content">
        {/* ── NUESTRA HISTORIA BANNER ── */}
        <section className="about-history-banner" ref={bannerRef}>
          <div className="history-banner-grid">
            <div className="history-banner-text">
              <span className="history-banner-badge">
                <Sparkles size={13} /> Origen y Trayectoria
              </span>
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
              <div className="history-banner-tags">
                <span className="history-tag">🔬 Rigor Científico y Farmacéutico</span>
                <span className="history-tag">🌿 Fórmulas Botánicas No Tóxicas</span>
                <span className="history-tag">🇲🇽 Laboratorio 100% Mexicano</span>
              </div>
            </div>

            <div className="history-banner-stats">
              <div className="stat-card-glass">
                <div className="stat-card-icon icon-paw">
                  <PawPrint size={26} />
                </div>
                <div className="stat-card-data">
                  <span className="stat-number">+{petsCount}k</span>
                  <span className="stat-label">Mascotas Protegidas</span>
                </div>
              </div>

              <div className="stat-card-glass">
                <div className="stat-card-icon icon-leaf">
                  <Leaf size={26} />
                </div>
                <div className="stat-card-data">
                  <span className="stat-number">{naturalCount}%</span>
                  <span className="stat-label">Ingredientes Naturales</span>
                </div>
              </div>

              <div className="stat-card-glass">
                <div className="stat-card-icon icon-map">
                  <MapPin size={26} />
                </div>
                <div className="stat-card-data">
                  <span className="stat-number">{statesCount}</span>
                  <span className="stat-label">Estados de la República</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PILARES / VALORES ── */}
        <section className="about-values">
          <div className="values-banner-header">
            <span className="values-banner-badge">
              <Sparkles size={13} /> Filosofía y Compromiso
            </span>
            <h2>Nuestros Pilares</h2>
            <p>
              Guiamos cada fórmula e innovación bajo tres compromisos fundamentales que garantizan máxima eficacia clínica, bienestar animal y sustentabilidad ecológica.
            </p>
            <div className="values-banner-tags">
              <span className="values-tag">🔬 Rigor Científico</span>
              <span className="values-tag">🐾 Bienestar Animal</span>
              <span className="values-tag">🌿 100% Sustentable</span>
            </div>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FlaskConical size={30} />
              </div>
              <h3>Rigor Científico</h3>
              <p>Nuestras formulaciones botánicas pasan por los mismos controles de calidad y eficacia que los productos alopáticos.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <PawPrint size={30} />
              </div>
              <h3>Bienestar Animal</h3>
              <p>La seguridad y confort de tu mascota es nuestra prioridad número uno. Formulamos sin sulfatos agresivos ni tóxicos.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Leaf size={30} />
              </div>
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
