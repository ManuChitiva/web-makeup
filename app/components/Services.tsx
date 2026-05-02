"use client";

import { useRef, useState, useEffect } from "react";

const services = [
  {
    title: "Maquillaje social",
    description:
      "Para esa cena, cumpleaños o evento donde quieres verte y sentirte increíble. Un look que te acompaña de día o de noche.",
    highlight: "Brilla en cada ocasión",
    icon: "✨",
  },
  {
    title: "Novias",
    description:
      "Tu día más importante merece un maquillaje soñado. Prueba de look previa, coordinación con tu vestido y todo el cuidado para que solo te preocupes por disfrutar.",
    highlight: "Tu día, tu estilo",
    icon: "💒",
  },
  {
    title: "Editorial y fotografía",
    description:
      "Sesiones de fotos, contenido o looks artísticos. Maquillaje que se ve impecable en cámara y realza tu mejor versión.",
    highlight: "Tu mejor versión en cada foto",
    icon: "📸",
  },
  {
    title: "Clases y asesoría",
    description:
      "Aprende a maquillarte como te gusta. Te guío con técnicas sencillas y te ayudo a elegir los productos que mejor van con tu piel y tu estilo.",
    highlight: "Aprende a resaltar tu belleza",
    icon: "💄",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="scroll-mt-24 border-y border-[var(--accent-champagne)]/50 bg-gradient-to-b from-[var(--accent-champagne)]/25 to-[var(--accent-champagne)]/10 py-20 px-6"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent-rose)]">
            Pensado para ti
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[var(--accent-rose-deep)] sm:text-4xl">
            Servicios
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-[var(--foreground)]/75">
            Cada mujer tiene su estilo. Aquí encuentras el servicio que se adapta a tu momento y a lo que buscas.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="card-beauty card-beauty--lift group flex flex-col rounded-2xl border border-[var(--accent-champagne)] bg-[var(--background)] p-6 hover:border-[var(--accent-rose)]/45"
              style={
                visible
                  ? {
                      animation: "card-in 0.6s ease-out forwards",
                      animationDelay: `${i * 100}ms`,
                      opacity: 0,
                    }
                  : undefined
              }
            >
              <span
                className="inline-block text-3xl transition-transform duration-500 ease-out motion-safe:group-hover:scale-110 motion-reduce:group-hover:scale-100"
                role="img"
                aria-hidden
              >
                {service.icon}
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[var(--accent-rose)] transition-colors duration-300 group-hover:text-[var(--accent-rose-deep)]">
                {service.highlight}
              </p>
              <h3 className="mt-1 font-serif text-xl font-semibold text-[var(--accent-rose-deep)]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/75">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
