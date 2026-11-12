import Image from "next/image";

export default function MakeupExpertGrid() {
  return (
    <section id="estudio" className="studio-story scroll-mt-24" aria-labelledby="studio-story-title">
      <div className="studio-story__visual" data-reveal>
        <Image
          src="/makeup-expert-hero.png"
          alt="Detalle de un maquillaje profesional en tonos naturales"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
        <span className="studio-story__image-label">BELLEZA EN CADA DETALLE</span>
      </div>
      <div className="studio-story__content" data-reveal>
        <div className="studio-story__inner">
          <p className="eyebrow eyebrow--light"><span /> NUESTRA ESENCIA</p>
          <h2 id="studio-story-title" className="display-title">
            El maquillaje es una forma de <em>expresarte.</em>
          </h2>
          <p>
            Creo en realzar lo que te hace única. Cada servicio comienza con
            una conversación para entender cómo quieres verte y, sobre todo,
            cómo quieres sentirte.
          </p>
          <a href="#reservas" className="text-link text-link--light">
            Hablemos de tu próximo look <span aria-hidden>↗</span>
          </a>
          <div className="studio-story__signature">Camila Palacios</div>
        </div>
      </div>
    </section>
  );
}
