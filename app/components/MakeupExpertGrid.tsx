import Link from "next/link";
import ColorSwatches from "./ColorSwatches";
import { getFeaturedProducts } from "../data/products";

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${stars} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-amber-500"
          style={{ color: "var(--accent-gold)" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function MakeupExpertGrid() {
  return (
    <section
      id="destacados"
      className="scroll-mt-24 overflow-hidden bg-[var(--accent-champagne)]/20 py-0"
      style={{ marginBottom: 0 }}
      aria-labelledby="makeup-expert-heading"
    >
      <div className="grid grid-cols-1 items-stretch lg:grid-cols-2">
        {/* Columna izquierda: altura por ancho (aspect), sin vh — evita miles de px si el viewport es enorme */}
        <div className="relative aspect-[4/5] w-full max-h-[32rem] overflow-hidden sm:max-h-[36rem] lg:aspect-auto lg:max-h-none lg:min-h-[22rem] lg:h-full">
          <video
            src="/makeup-expert-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
            aria-label="Maquillaje profesional - Makeup Expert"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
            aria-hidden
          />
          <p
            id="makeup-expert-heading"
            className="absolute bottom-6 left-6 font-sans text-2xl font-bold uppercase tracking-wider text-white drop-shadow-lg md:bottom-8 md:left-8 md:text-3xl"
          >
            <span className="block">Makeup</span>
            <span className="block">Expert</span>
          </p>
        </div>

        {/* Columna derecha: grid 2x2 de productos */}
        <div className="flex flex-col justify-center overflow-hidden bg-[var(--accent-champagne)]/30 px-6 py-12 lg:px-12 lg:py-16">
          <div className="mx-auto w-full max-w-2xl">
            <h2 className="mb-6 font-serif text-2xl font-bold text-[var(--accent-rose-deep)] lg:mb-8 lg:text-3xl">
              Productos destacados
            </h2>
            <div className="max-h-[20rem] overflow-y-auto overflow-x-hidden pr-1 sm:max-h-[22rem]">
              <div className="grid grid-cols-2 gap-5 sm:gap-8">
                {getFeaturedProducts().map((product) => (
                <Link
                  key={product.id}
                  href={`/productos/${product.id}`}
                  className="flex flex-col overflow-hidden rounded-xl border border-[var(--accent-champagne)]/80 bg-white p-5 shadow-[0_2px_12px_rgba(139,67,82,0.06)] transition hover:shadow-[0_8px_24px_rgba(139,67,82,0.1)]"
                >
                  <div className="flex h-32 items-center justify-center rounded-lg bg-[var(--accent-champagne)]/25 text-5xl sm:h-36">
                    {product.image}
                  </div>
                  <h3 className="mt-3 line-clamp-2 font-sans text-xs font-semibold uppercase leading-tight text-[var(--accent-rose-deep)] sm:text-sm">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-[var(--foreground)]">
                    {product.priceFrom ? "Desde " : ""}$ {product.price}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <StarRating stars={product.rating ?? 5} />
                    <span className="text-xs text-[var(--foreground)]/70">
                      ({product.reviews ?? 0})
                    </span>
                  </div>
                  {product.colors && product.colors.length > 0 && (
                    <ColorSwatches
                      colors={product.colors}
                      moreCount={product.moreColors}
                      className="mt-3"
                    />
                  )}
                </Link>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
