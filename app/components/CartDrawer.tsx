"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/products";

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, totalItems, isOpen, closeCart } =
    useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product ? product.priceNumber * item.quantity : 0);
  }, 0);

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("es-CL").format(n);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        aria-hidden
        onClick={closeCart}
      />
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[var(--background)] shadow-2xl animate-drawer-in"
        role="dialog"
        aria-label="Carrito de compras"
      >
        <div className="flex items-center justify-between border-b border-[var(--accent-champagne)]/50 px-6 py-4">
          <h2 className="font-serif text-xl font-semibold text-[var(--accent-rose-deep)]">
            Tu carrito
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full p-2 text-[var(--foreground)]/70 transition hover:bg-[var(--accent-champagne)]/50 hover:text-[var(--foreground)]"
            aria-label="Cerrar carrito"
          >
            <span className="text-xl">×</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <span className="text-5xl opacity-50">🛒</span>
              <p className="text-[var(--foreground)]/70">
                Tu carrito está vacío. Añade productos desde la sección
                Productos.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 rounded-full bg-[var(--accent-rose-deep)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--accent-rose)]"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                return (
                  <li
                    key={item.productId}
                    className="flex gap-4 rounded-xl border border-[var(--accent-champagne)]/50 bg-[var(--background)] p-3"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-champagne)]/30 text-2xl">
                      {product.image}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-[var(--accent-rose-deep)]">
                        {product.name}
                      </p>
                      <p className="text-sm text-[var(--foreground)]/70">
                        ${product.price}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--accent-champagne)] text-sm font-medium transition hover:bg-[var(--accent-champagne)]/50"
                          aria-label="Quitar una unidad"
                        >
                          −
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--accent-champagne)] text-sm font-medium transition hover:bg-[var(--accent-champagne)]/50"
                          aria-label="Añadir una unidad"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="text-[var(--foreground)]/50 transition hover:text-[var(--accent-rose)]"
                        aria-label="Eliminar del carrito"
                      >
                        <span className="text-lg">×</span>
                      </button>
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        ${formatPrice(product.priceNumber * item.quantity)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-[var(--accent-champagne)]/50 px-6 py-4">
            <div className="flex items-center justify-between text-lg font-semibold text-[var(--accent-rose-deep)]">
              <span>Total ({totalItems} {totalItems === 1 ? "producto" : "productos"})</span>
              <span>${formatPrice(total)}</span>
            </div>
            <p className="mt-2 text-center text-sm text-[var(--foreground)]/60">
              Checkout y envíos próximamente. Consulta por WhatsApp para reservar.
            </p>
            <button
              type="button"
              disabled
              className="mt-4 w-full rounded-full bg-[var(--accent-rose)]/50 py-3 font-medium text-white cursor-not-allowed"
            >
              Finalizar compra (próximamente)
            </button>
          </div>
        )}
      </aside>
    </>,
    document.body
  );
}
