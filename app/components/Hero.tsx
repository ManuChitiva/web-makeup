import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[34rem] flex-col items-center overflow-hidden px-6 pt-24 pb-16 md:min-h-[38rem] md:flex-row md:justify-center md:gap-12 md:pt-28"
    >
      {/* Video de fondo sutil (absolute + object-cover; evita altura intrínseca del vídeo en el flujo) */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          src="/header-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-[0.35]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[var(--background)]/70" aria-hidden />
      </div>
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% 50%, var(--accent-rose) 0%, transparent 55%)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--background)_0%,transparent_45%,var(--background)_100%)] md:bg-[linear-gradient(90deg,var(--background)_0%,transparent_40%,transparent_60%,var(--background)_100%)]" />
      <div className="relative z-10 flex w-full shrink-0 flex-col items-center justify-center text-center md:max-w-xl md:flex-1 md:items-start md:text-left">
        <p className="mb-3 font-sans text-sm font-medium uppercase tracking-[0.25em] text-[var(--accent-rose)]">
          Maquillaje profesional
        </p>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-[var(--accent-rose-deep)] sm:text-5xl md:text-5xl">
          Resalta tu belleza con un estilo único
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base text-[var(--foreground)]/70 md:mx-0">
          Servicios de maquillaje para eventos, novias y ocasiones especiales.
          Agenda tu cita y descubre el arte del maquillaje.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <a
            href="#reservas"
            className="rounded-full bg-[var(--accent-rose-deep)] px-7 py-3 font-medium text-white shadow-[0_6px_20px_rgba(139,67,82,0.35)] transition duration-500 hover:bg-[var(--accent-rose)] hover:shadow-[0_12px_36px_rgba(183,110,121,0.42)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-[0_6px_20px_rgba(139,67,82,0.35)]"
          >
            Agendar reserva
          </a>
          <a
            href="#productos"
            className="rounded-full border-2 border-[var(--accent-rose)]/50 px-7 py-3 font-medium text-[var(--accent-rose-deep)] transition hover:border-[var(--accent-rose)] hover:bg-[var(--accent-champagne)]/30"
          >
            Ver productos
          </a>
        </div>
      </div>
      <div className="relative z-10 mt-10 flex w-full shrink-0 justify-center md:mt-0 md:max-w-lg md:flex-1">
        <div className="hero-portrait-glow hero-portrait-float relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl ring-1 ring-[var(--accent-champagne)]/40">
          <Image
            src="/hero-camila.png"
            alt="Camila Palacios - Maquilladora profesional"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
