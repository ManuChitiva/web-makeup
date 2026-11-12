import Image from "next/image";

export default function Hero() {
  return (
    <section id="inicio" className="hero-editorial scroll-mt-24" aria-labelledby="hero-title">
      <div className="hero-editorial__content">
        <div className="hero-editorial__inner">
          <p className="eyebrow"><span /> CAMILA PALACIOS MAKEUP STUDIO</p>
          <h1 id="hero-title" className="hero-editorial__title">
            Tu belleza,<br />
            <em>en su mejor</em><br />
            versión.
          </h1>
          <p className="hero-editorial__description">
            Maquillaje profesional pensado para ti, para tu historia y para cada
            momento que merece sentirse especial.
          </p>
          <div className="hero-editorial__actions">
            <a href="#reservas" className="button-primary">
              Agenda tu cita <span aria-hidden>↗</span>
            </a>
            <a href="#servicios" className="text-link">Explora los servicios <span aria-hidden>→</span></a>
          </div>
          <div className="hero-editorial__notes" aria-label="Especialidades del estudio">
            <span>01 / Novias</span>
            <span>02 / Eventos</span>
            <span>03 / Editorial</span>
          </div>
        </div>
      </div>
      <div className="hero-editorial__visual">
        <Image
          src="/hero-camila-portrait.png"
          alt="Artista de maquillaje con brochas y paleta de tonos cálidos"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 46vw"
          className="object-cover object-center"
        />
        <div className="hero-editorial__caption">
          <span className="hero-editorial__caption-line" />
          <span>EL ARTE DE SENTIRTE TÚ</span>
        </div>
      </div>
    </section>
  );
}
