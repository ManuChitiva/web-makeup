"use client";

import Link from "next/link";
import { getHomepageCatalogProducts } from "../data/products";
import ProductCard from "./ProductCard";

const highlighted = getHomepageCatalogProducts();

export default function ProductsSection() {
  return (
    <section
      id="productos"
      className="scroll-mt-24 py-20 px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-[var(--accent-rose-deep)] sm:text-4xl">
            Servicios destacados
          </h2>
          <p className="mt-3 text-[var(--foreground)]/70">
            Una muestra del catálogo. Entra para ver todos, filtrar y paginar.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-10">
          {highlighted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/productos"
            className="rounded-full border-2 border-[var(--accent-rose-deep)] bg-[var(--accent-rose-deep)] px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(139,67,82,0.3)] transition hover:bg-[var(--accent-rose)] hover:shadow-[0_8px_24px_rgba(183,110,121,0.38)]"
          >
            Ver catálogo completo
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-[var(--foreground)]/60">
          Añade servicios al carrito y consulta por WhatsApp para reservar.
        </p>
      </div>
    </section>
  );
}
