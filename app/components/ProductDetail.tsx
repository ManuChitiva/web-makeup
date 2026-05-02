"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import ColorSwatches from "./ColorSwatches";

type ProductDetailProps = { product: Product };

const FEATURES = [
  { label: "Libre de crueldad", icon: "🐰" },
  { label: "Alta pigmentación", icon: "●" },
  { label: "Textura cremosa", icon: "〰️" },
  { label: "Fácil difuminación", icon: "🖌️" },
];

const SERVICE_FEATURES = [
  { label: "Asesoría personalizada", icon: "✨" },
  { label: "Duración aprox. 60-90 min", icon: "⏱️" },
  { label: "Productos profesionales", icon: "💄" },
  { label: "Reserva por WhatsApp", icon: "📲" },
];

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const selectedColorName =
    product.colorNames?.[selectedColorIndex] ?? `Color ${selectedColorIndex + 1}`;
  const isService = Boolean(product.isService);
  const imageSrc = product.imageUrl?.trim();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product.id);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="mb-6">
        <Link
          href="/productos"
          className="text-sm font-medium text-[var(--accent-rose)] hover:text-[var(--accent-rose-deep)]"
        >
          ← Volver al catálogo
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Columna izquierda: imagen principal + galería */}
        <div className="space-y-4">
          <div className="card-beauty group relative aspect-square overflow-hidden rounded-2xl border border-[var(--accent-champagne)]/80 bg-[var(--accent-champagne)]/20 flex items-center justify-center">
            {imageSrc ? (
              /* eslint-disable-next-line @next/next/no-img-element -- URL externa desde STORE API */
              <img
                src={imageSrc}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.07] motion-reduce:group-hover:scale-100"
              />
            ) : (
              <span
                className="text-8xl transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] motion-reduce:group-hover:scale-100 md:text-9xl"
                aria-hidden
              >
                {product.image}
              </span>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                type="button"
                className="card-beauty--soft card-beauty--lift h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-[var(--accent-champagne)] bg-[var(--accent-champagne)]/30 flex items-center justify-center text-3xl hover:border-[var(--accent-rose)]/35"
                aria-label={`Ver imagen ${i}`}
              >
                {imageSrc ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={imageSrc}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span aria-hidden>{product.image}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Columna derecha: datos y acciones */}
        <div className="flex flex-col">
          <h1 className="font-serif text-2xl font-bold uppercase tracking-wide text-[var(--accent-rose-deep)] md:text-3xl">
            {product.name}
          </h1>
          {product.sku && (
            <p className="mt-1 text-sm text-[var(--foreground)]/60">
              {isService ? "Código del servicio" : "SKU"}: {product.sku}
            </p>
          )}
          <p className="mt-3 text-2xl font-bold text-[var(--foreground)]">
            {product.priceFrom ? "Desde " : ""}$ {product.price}
          </p>

          {product.description && (
            <p className="mt-4 text-[var(--foreground)]/80 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Color */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-[var(--foreground)]">
                Color: <span className="uppercase">{selectedColorName}</span>
              </p>
              <ColorSwatches
                colors={product.colors}
                moreCount={product.moreColors}
                selectedIndex={selectedColorIndex}
                onSelect={setSelectedColorIndex}
              />
            </div>
          )}

          {/* Cantidad */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm font-medium text-[var(--foreground)]">
              {isService ? "Sesiones:" : "Cantidad:"}
            </span>
            <div className="flex items-center rounded-full border border-[var(--accent-champagne)]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center text-lg font-medium text-[var(--accent-rose-deep)] hover:bg-[var(--accent-champagne)]/50"
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <span className="min-w-[2.5rem] text-center font-medium">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center text-lg font-medium text-[var(--accent-rose-deep)] hover:bg-[var(--accent-champagne)]/50"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>

          {/* Botones */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-full bg-[var(--accent-rose-deep)] px-6 py-3.5 font-medium text-white shadow-[0_4px_14px_rgba(139,67,82,0.35)] transition duration-300 hover:bg-[var(--accent-rose)] hover:shadow-[0_8px_28px_rgba(183,110,121,0.45)] motion-reduce:hover:shadow-[0_4px_14px_rgba(139,67,82,0.35)]"
            >
              {isService ? "Añadir servicio" : "Añadir al carrito"}
            </button>
            <button
              type="button"
              className="rounded-full border-2 border-[var(--accent-rose-deep)] px-6 py-3.5 font-medium text-[var(--accent-rose-deep)] transition hover:bg-[var(--accent-champagne)]/30"
            >
              {isService
                ? "Reservar por WhatsApp (próximamente)"
                : "Comprar ahora (próximamente)"}
            </button>
          </div>

          {/* Envíos */}
          <p className="mt-6 text-sm text-[var(--foreground)]/70">
            {isService
              ? "Agenda flexible sujeta a disponibilidad. Confirmación por WhatsApp."
              : "Envíos con Coordinadora. Recibe de 8 a 15 días hábiles."}
          </p>

          {/* Métodos de pago (mock) */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-xs text-[var(--foreground)]/60">
              {isService ? "Reserva con:" : "Pagos con:"}
            </span>
            <span className="rounded bg-[var(--accent-champagne)]/40 px-2 py-1 text-xs font-medium">
              Mercado Pago
            </span>
            <span className="rounded bg-[var(--accent-champagne)]/40 px-2 py-1 text-xs font-medium">
              PSE
            </span>
            <span className="text-xs text-[var(--foreground)]/60">
              {isService ? "Anticipo para confirmar cupo" : "Hasta 6 cuotas sin interés"}
            </span>
          </div>

          {/* Características */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(isService ? SERVICE_FEATURES : FEATURES).map((f) => (
              <div
                key={f.label}
                className="card-beauty--soft card-beauty--lift flex flex-col items-center gap-1 rounded-xl border border-[var(--accent-champagne)]/60 bg-[var(--accent-champagne)]/10 p-3 text-center hover:border-[var(--accent-rose)]/30"
              >
                <span className="text-xl" aria-hidden>
                  {f.icon}
                </span>
                <span className="text-xs font-medium text-[var(--foreground)]/80">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
