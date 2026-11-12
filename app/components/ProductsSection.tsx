"use client";

import Link from "next/link";
import type { Service } from "../data/services";
import ProductCard from "./ProductCard";

type ProductsSectionProps = { services: Service[] };

export default function ProductsSection({ services }: ProductsSectionProps) {
  return (
    <section
      id="servicios"
      className="products-editorial scroll-mt-24"
    >
      <div className="section-container">
        <div className="section-heading-row" data-reveal>
          <div>
            <p className="eyebrow"><span /> NUESTROS SERVICIOS</p>
            <h2 className="display-title">Un look para <em>cada momento.</em></h2>
          </div>
          <p className="section-intro">
            Cada rostro tiene algo único. Descubre el servicio que mejor acompaña tu ocasión.
          </p>
        </div>

        <div className="products-editorial__grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-x-6 md:gap-y-10">
          {services.length === 0 ? (
            <p className="col-span-full text-center text-sm text-[var(--foreground)]/70">
              Pronto encontrarás aquí nuestros servicios.
            </p>
          ) : (
            services.map((service) => (
              <ProductCard key={service.id} service={service} />
            ))
          )}
        </div>

        <div className="mt-12 flex justify-center" data-reveal>
          <Link
            href="/servicios"
            className="button-outline"
          >
            Ver todos los servicios <span aria-hidden>↗</span>
          </Link>
        </div>
        <p className="mt-6 text-center text-xs text-[#81736d]">Fotografías de referencia de cada tipo de servicio.</p>
      </div>
    </section>
  );
}
