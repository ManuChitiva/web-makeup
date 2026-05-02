"use client";

import { useRef, useState, useEffect, type CSSProperties } from "react";

const services = [
  {
    title: "Maquillaje social",
    description:
      "Para esa cena, cumpleaños o evento donde quieres verte y sentirte increíble. Un look que te acompaña de día o de noche.",
    highlight: "Brilla en cada ocasión",
    icon: "✨",
    accent: "from-[#f8ebe3] via-[#f5dde4]/90 to-[#f0d4dc]/55",
    iconBg: "from-white/85 to-[#f9e8ec]/95",
  },
  {
    title: "Novias",
    description:
      "Tu día más importante merece un maquillaje soñado. Prueba de look previa, coordinación con tu vestido y todo el cuidado para que solo te preocupes por disfrutar.",
    highlight: "Tu día, tu estilo",
    icon: "💒",
    accent:
      "from-[#f5e8f0]/95 via-[#edd8e3]/85 to-[#e5ccd8]/65",
    iconBg: "from-white/90 to-[#f3e8ef]/98",
  },
  {
    title: "Editorial y fotografía",
    description:
      "Sesiones de fotos, contenido o looks artísticos. Maquillaje que se ve impecable en cámara y realza tu mejor versión.",
    highlight: "Tu mejor versión en cada foto",
    icon: "📸",
    accent:
      "from-[#f2ebe4] via-[#ebe2d8]/90 to-[#e4d5cc]/60",
    iconBg: "from-white/88 to-[#efe6de]/96",
  },
  {
    title: "Clases y asesoría",
    description:
      "Aprende a maquillarte como te gusta. Te guío con técnicas sencillas y te ayudo a elegir los productos que mejor van con tu piel y tu estilo.",
    highlight: "Aprende a resaltar tu belleza",
    icon: "💄",
    accent:
      "from-[#f7e9ed] via-[#eedae1]/85 to-[#e6ccd5]/58",
    iconBg: "from-white/86 to-[#f5eaf0]/97",
  },
] as const;

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const sync = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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
      <div className="mx-auto max-w-6xl">
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
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {services.map((service, i) => (
            <article
              key={service.title}
              className="card-beauty card-beauty--lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--accent-champagne)]/90 bg-[var(--background)] text-left hover:border-[var(--accent-rose)]/42"
              style={
                visible
                  ? ({
                      ...(reduceMotion
                        ? { opacity: 1 }
                        : {
                            opacity: 0,
                            animation: "card-in 0.62s ease-out forwards",
                            animationDelay: `${i * 90}ms`,
                          }),
                    } satisfies CSSProperties)
                  : undefined
              }
            >
              <div
                className={`relative flex min-h-[9.5rem] flex-col justify-end bg-gradient-to-br px-6 pb-7 pt-8 ${service.accent}`}
              >
                <div
                  className={`pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${service.iconBg} opacity-95 blur-[2px]`}
                  aria-hidden
                />
                <span
                  className="relative inline-flex min-h-[3.85rem] min-w-[3.85rem] items-center justify-center self-start rounded-[1.05rem] border border-white/65 bg-white/55 text-[2.05rem] shadow-[0_6px_20px_rgba(139,67,82,0.12)] backdrop-blur-sm transition-[transform,box-shadow] duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-[1.06] motion-safe:group-hover:shadow-[0_12px_32px_rgba(139,67,82,0.16)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:translate-y-0"
                  role="img"
                  aria-hidden
                >
                  {service.icon}
                </span>
                <span className="pointer-events-none absolute bottom-5 right-6 h-px w-14 bg-[var(--accent-rose)]/35" aria-hidden />
              </div>
              <div className="relative flex flex-1 flex-col border-t border-[var(--accent-champagne)]/40 bg-[var(--background)] px-6 pb-6 pt-5">
                <span className="inline-flex max-w-fit rounded-full bg-[var(--accent-champagne)]/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-rose-deep)] ring-1 ring-[var(--accent-rose)]/12">
                  {service.highlight}
                </span>
                <h3 className="mt-3 font-serif text-[1.2rem] font-semibold leading-snug tracking-tight text-[var(--accent-rose-deep)] sm:text-xl">
                  {service.title}
                </h3>
                <div className="mt-4 flex flex-1 flex-col gap-3">
                  <p className="text-sm leading-[1.65] text-[var(--foreground)]/77">
                    {service.description}
                  </p>
                  <a
                    href="/#reservas"
                    className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-rose)] transition hover:text-[var(--accent-rose-deep)] motion-reduce:transition-none"
                  >
                    Reservar
                    <span
                      className="inline-block motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
