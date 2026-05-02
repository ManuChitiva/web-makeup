"use client";

import Link from "next/link";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ColorSwatches from "./ColorSwatches";

export default function ProductsSection() {
  const { addItem, getQuantity } = useCart();

  return (
    <section
      id="productos"
      className="scroll-mt-24 py-20 px-6"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-[var(--accent-rose-deep)] sm:text-4xl">
            Productos con descuento
          </h2>
          <p className="mt-3 text-[var(--foreground)]/70">
            Selección de maquillaje y herramientas que uso y recomiendo.
          </p>
        </div>
        <div className="mt-14 max-h-[26rem] overflow-y-auto overflow-x-hidden pr-1 md:max-h-[28rem]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/productos/${product.id}`}
                className="card-beauty card-beauty--lift group flex flex-col overflow-hidden rounded-2xl border border-[var(--accent-champagne)]/80 bg-white hover:border-[var(--accent-rose)]/45 motion-safe:transition-[border-color]"
              >
                <div className="flex h-48 items-center justify-center bg-[var(--accent-champagne)]/25 text-6xl transition duration-500 ease-out group-hover:scale-[1.04] group-hover:bg-[var(--accent-champagne)]/45 motion-reduce:group-hover:scale-100">
                  {product.image}
                </div>
                <div className="flex flex-col p-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-[var(--accent-rose)]">
                    {product.category}
                  </span>
                  <h3 className="mt-1 font-serif text-lg font-semibold text-[var(--accent-rose-deep)]">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                    ${product.price}
                  </p>
                  {product.colors && product.colors.length > 0 && (
                    <ColorSwatches colors={product.colors} className="mt-3" />
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addItem(product.id);
                    }}
                    className="mt-4 w-full rounded-full border-2 border-[var(--accent-rose)]/50 py-2.5 text-sm font-medium text-[var(--accent-rose-deep)] shadow-sm transition duration-300 hover:border-[var(--accent-rose)] hover:bg-[var(--accent-champagne)]/35 hover:shadow-[0_6px_20px_rgba(183,110,121,0.2)] motion-reduce:hover:shadow-sm"
                  >
                    {getQuantity(product.id) > 0
                      ? `✓ En carrito (${getQuantity(product.id)})`
                      : "Añadir al carrito"}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-[var(--foreground)]/60">
          Añade productos al carrito y consulta por WhatsApp para reservar.
        </p>
      </div>
    </section>
  );
}
