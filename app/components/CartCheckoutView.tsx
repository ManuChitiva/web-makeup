"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  checkoutAndStartPayu,
  type PayuStatus,
} from "@/lib/store-checkout";
import { submitPayuWebCheckout } from "@/lib/submit-payu-form";
import {
  buildOrderWhatsAppMessage,
} from "@/lib/build-order-whatsapp-message";
import { whatsappWaNumber } from "@/lib/social";
import { useCart } from "../context/CartContext";
import { findProductById, useCatalogProducts } from "../context/CatalogContext";
import Header from "./Header";

const waBase = `https://wa.me/${whatsappWaNumber}`;

function formatMoney(n: number) {
  return new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(n);
}

function whatsAppHrefWithMessage(message: string) {
  return `${waBase}?text=${encodeURIComponent(message)}`;
}

export type CartCheckoutViewProps = {
  storeId: number | undefined;
  storeName: string;
  payuStatus: PayuStatus | null;
  payuStatusFetchAttempted: boolean;
};

export default function CartCheckoutView({
  storeId,
  storeName,
  payuStatus,
  payuStatusFetchAttempted,
}: CartCheckoutViewProps) {
  const router = useRouter();
  const catalogProducts = useCatalogProducts();
  const { items, totalItems, removeItem, updateQuantity, clear } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPostPayModal, setShowPostPayModal] = useState(false);
  const [pending, startTransition] = useTransition();

  const linesResolved = items
    .map((item) => {
      const p = findProductById(catalogProducts, item.productId);
      if (!p) return null;
      return {
        cartItemId: item.productId,
        productId: item.productId,
        quantity: item.quantity,
        name: p.name,
        unitPrice: p.priceNumber,
        displayPrice: p.price,
        image: p.image,
        imageUrl: p.imageUrl,
      };
    })
    .filter(Boolean) as {
    cartItemId: string;
    productId: string;
    quantity: number;
    name: string;
    unitPrice: number;
    displayPrice: string;
    image: string;
    imageUrl?: string;
  }[];

  const subtotal = linesResolved.reduce(
    (s, l) => s + l.unitPrice * l.quantity,
    0
  );

  const apiConfigured = typeof storeId === "number";
  const canPayWithPayu =
    apiConfigured && payuStatus?.payuActive === true && linesResolved.length > 0;

  function whatsAppUrl(intro?: string) {
    const msg = buildOrderWhatsAppMessage({
      storeName,
      lines: linesResolved.map((l) => ({
        title: l.name,
        quantity: l.quantity,
        unitPrice: l.unitPrice,
      })),
      customerName: name.trim() || undefined,
      customerEmail: email.trim() || undefined,
      customerPhone: phone.trim() || undefined,
      intro,
    });
    return whatsAppHrefWithMessage(msg);
  }

  /** Igual que store-landing-page: redirige al wa.me del negocio con el pedido prefijado. */
  function goToWhatsApp(intro?: string) {
    window.location.assign(whatsAppUrl(intro));
  }

  function onPay() {
    setError(null);
    if (!storeId) {
      setError(
        "Configura NEXT_PUBLIC_API_BASE_URL / STORE_API_BASE_URL y datos de tienda para pagar."
      );
      return;
    }
    if (!payuStatus?.payuActive) {
      setError("Esta tienda no tiene PayU activo.");
      return;
    }
    if (!name.trim() || !email.trim()) {
      setError("Indica nombre y correo para el pedido.");
      return;
    }

    startTransition(async () => {
      const result = await checkoutAndStartPayu(
        storeId,
        name.trim(),
        email.trim(),
        phone.trim(),
        linesResolved.map((l) => ({
          id: l.productId,
          quantity: l.quantity,
        }))
      );

      if (!result.ok) {
        setError(result.message);
        goToWhatsApp(
          `Intenté pagar en la web pero falló el sistema (${result.message}). ¿Me ayudas a completar el pedido?`
        );
        return;
      }

      submitPayuWebCheckout(result.actionUrl, result.fields, "_blank");
      setShowPostPayModal(true);
    });
  }

  function onAcknowledgePostPayModal() {
    clear();
    setShowPostPayModal(false);
    router.push("/productos");
  }

  return (
    <div className="site-content w-full bg-[var(--background)]">
      <Header />
      <main className="min-w-0 pb-16 pt-24 md:pb-28">
        <div className="mx-auto w-full max-w-xl px-5 sm:max-w-2xl sm:px-8 lg:max-w-6xl">
        {linesResolved.length === 0 ? (
          <div className="card-beauty mx-auto rounded-2xl border border-[var(--accent-champagne)]/80 bg-white px-6 py-14 text-center lg:max-w-xl">
            <p className="font-serif text-xl text-[var(--accent-rose-deep)]">
              Tu carrito está vacío
            </p>
            <p className="mt-2 text-sm text-[var(--foreground)]/70">
              Añade productos desde el catálogo.
            </p>
            <Link
              href="/productos"
              className="mt-6 inline-block rounded-full border-2 border-[var(--accent-rose-deep)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-rose-deep)] transition hover:bg-[var(--accent-champagne)]/40"
            >
              Ver catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0_1fr)_min(22rem,100%)] xl:gap-x-12 xl:gap-y-10 xl:items-start">
            <header className="border-b border-[var(--accent-champagne)]/60 pb-6 text-center sm:text-left xl:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rose)]">
                Resumen
              </p>
              <div className="mx-auto mt-2 flex max-w-2xl flex-wrap items-end justify-center gap-4 sm:mx-0 sm:max-w-none sm:justify-between">
                <h1 className="font-serif text-3xl font-bold text-[var(--accent-rose-deep)] sm:text-4xl">
                  Carrito / pago
                </h1>
                <p className="text-sm tabular-nums text-[var(--foreground)]/65">
                  {totalItems}{" "}
                  {totalItems === 1 ? "artículo" : "artículos"}
                </p>
              </div>
            </header>

            <ul className="space-y-3 min-w-0">
              {linesResolved.map((line) => {
                const src = line.imageUrl?.trim();
                return (
                  <li
                    key={line.cartItemId}
                    className="card-beauty--soft flex gap-4 rounded-xl border border-[var(--accent-champagne)]/70 bg-white p-4 sm:p-5"
                  >
                    <div className="relative h-[4.25rem] w-[4.25rem] shrink-0 overflow-hidden rounded-lg bg-[var(--accent-champagne)]/30 sm:h-24 sm:w-24">
                      {src ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={src}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-4xl">
                          {line.image}
                        </span>
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="font-semibold text-[var(--accent-rose-deep)]">
                          {line.name}
                        </h2>
                        <p className="text-sm text-[var(--accent-rose)] tabular-nums">
                          ${line.displayPrice} c/u
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center rounded-full border border-[var(--accent-champagne)]">
                          <button
                            type="button"
                            className="flex h-9 w-9 items-center justify-center text-[var(--accent-rose-deep)] hover:bg-[var(--accent-champagne)]/45"
                            aria-label="Menos"
                            onClick={() =>
                              updateQuantity(
                                line.cartItemId,
                                Math.max(1, line.quantity - 1)
                              )
                            }
                          >
                            −
                          </button>
                          <span className="min-w-8 text-center text-sm font-medium tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            className="flex h-9 w-9 items-center justify-center text-[var(--accent-rose-deep)] hover:bg-[var(--accent-champagne)]/45"
                            aria-label="Más"
                            onClick={() =>
                              updateQuantity(
                                line.cartItemId,
                                line.quantity + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <p className="min-w-[4.5rem] text-sm font-semibold tabular-nums">
                          $
                          {formatMoney(line.unitPrice * line.quantity)}
                        </p>
                        <button
                          type="button"
                          className="text-xs font-medium uppercase tracking-wide text-[var(--foreground)]/55 underline-offset-4 hover:text-[var(--accent-rose)] hover:underline"
                          onClick={() => removeItem(line.cartItemId)}
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-6 min-w-0 xl:sticky xl:top-28 xl:self-start">
            <section className="card-beauty rounded-2xl border border-[var(--accent-champagne)]/80 bg-white p-6 sm:p-7">
              <h2 className="font-serif text-lg font-semibold text-[var(--accent-rose-deep)]">
                Datos para el pedido
              </h2>
              <p className="mt-1 text-xs text-[var(--foreground)]/65">
                Los usamos en PayU o en el mensaje de WhatsApp si pagas con la tienda
                por chat.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-rose-deep)]/85">
                  Nombre completo
                  <input
                    type="text"
                    name="customerName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="mt-1.5 w-full rounded-lg border border-[var(--accent-champagne)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--accent-rose)]"
                  />
                </label>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-rose-deep)]/85">
                  Correo
                  <input
                    type="email"
                    name="customerEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="mt-1.5 w-full rounded-lg border border-[var(--accent-champagne)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--accent-rose)]"
                  />
                </label>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-rose-deep)]/85 sm:col-span-2">
                  Teléfono (opcional)
                  <input
                    type="tel"
                    name="customerPhone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    className="mt-1.5 w-full rounded-lg border border-[var(--accent-champagne)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--accent-rose)]"
                  />
                </label>
              </div>
              {!apiConfigured ? (
                <p className="mt-4 text-xs text-[var(--foreground)]/65">
                  Define{" "}
                  <code className="text-[10px]">STORE_API_BASE_URL</code> o{" "}
                  <code className="text-[10px]">NEXT_PUBLIC_API_BASE_URL</code>, y{" "}
                  <code className="text-[10px]">STORE_API_SLUG</code> o{" "}
                  <code className="text-[10px]">NEXT_PUBLIC_STORE_API_SLUG</code>, en{" "}
                  <code className="text-[10px]">.env.local</code> para enlazar esta
                  vitrina con tu API Java y habilitar el cobro.
                </p>
              ) : null}
              {apiConfigured && payuStatus && !payuStatus.payuActive ? (
                <p className="mt-4 text-xs text-amber-800">
                  No hay pago en línea activo ahora. Puedes enviar el pedido por
                  WhatsApp con el botón de abajo.
                </p>
              ) : null}
              {apiConfigured && payuStatusFetchAttempted && payuStatus === null ? (
                <p className="mt-4 text-xs text-amber-800">
                  No pudimos consultar la pasarela. Puedes pedir por WhatsApp; si el
                  pago en línea falla, te redirigimos allí con el resumen.
                </p>
              ) : null}
              {payuStatus?.payuActive && payuStatus.sandbox ? (
                <p className="mt-3 text-xs text-[var(--foreground)]/65">
                  Modo{" "}
                  <span className="font-semibold text-[var(--accent-rose)]">
                    sandbox
                  </span>
                  : tras pulsar el botón irás al checkout de prueba de PayU.
                </p>
              ) : null}
              {error ? (
                <p className="mt-4 text-sm text-red-600" role="alert">
                  {error}
                </p>
              ) : null}
            </section>

            <footer className="card-beauty rounded-2xl border border-[var(--accent-champagne)]/80 bg-[var(--accent-champagne)]/15 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-[var(--accent-champagne)]/50 pb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-[var(--foreground)]/70">
                  Total estimado
                </span>
                <span className="font-serif text-2xl font-bold tabular-nums text-[var(--accent-rose-deep)] sm:text-3xl">
                  ${formatMoney(subtotal)}
                </span>
              </div>
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => clear()}
                  className="text-center text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]/55 hover:text-[var(--accent-rose-deep)] sm:text-left"
                >
                  Vaciar carrito
                </button>
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
                  <Link
                    href="/productos"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[var(--accent-rose)]/55 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-rose-deep)] transition hover:bg-[var(--accent-champagne)]/40"
                  >
                    Seguir comprando
                  </Link>
                  <a
                    href={whatsAppUrl()}
                    className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                      !canPayWithPayu
                        ? "border-2 border-transparent bg-[var(--accent-rose-deep)] text-white shadow-md hover:bg-[var(--accent-rose)]"
                        : "border-2 border-[var(--accent-champagne)] bg-white text-[var(--accent-rose-deep)] hover:border-[var(--accent-rose)]"
                    }`}
                  >
                    {!canPayWithPayu ? "Pedir por WhatsApp" : "O pedir por WhatsApp"}
                  </a>
                  <button
                    type="button"
                    disabled={!canPayWithPayu || pending}
                    onClick={() => onPay()}
                    title={
                      canPayWithPayu
                        ? "Crear pedido y abrir PayU"
                        : "Activa PayU en el backend o usa WhatsApp"
                    }
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--accent-rose-deep)] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-md transition hover:bg-[var(--accent-rose)] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {pending ? "Preparando pago…" : "Pagar con PayU"}
                  </button>
                </div>
              </div>
            </footer>
            </div>
          </div>
        )}
        </div>
      </main>

      {showPostPayModal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8 backdrop-blur-[1px]"
          role="dialog"
          aria-modal="true"
          aria-label="Instrucciones de pago y envío de comprobante"
        >
          <div className="w-full max-w-lg rounded-2xl border border-[var(--accent-champagne)] bg-[var(--background)] p-6 shadow-2xl sm:p-7">
            <div className="mb-4 inline-flex items-center rounded-full border border-[var(--accent-rose)]/30 bg-[var(--accent-champagne)]/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-rose-deep)]">
              Pago iniciado
            </div>
            <h3 className="font-serif text-2xl text-[var(--accent-rose-deep)]">
              Completa el pago en PayU
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/75">
              Abrimos PayU en una nueva pestaña para que finalices tu pago de forma
              segura. Cuando tengas el comprobante, envíalo al negocio por WhatsApp
              para agilizar la validación.
            </p>
            <div className="mt-5 rounded-xl border border-[var(--accent-champagne)] bg-[var(--foreground)]/[0.03] p-4 text-sm text-[var(--foreground)]/75">
              <p className="font-semibold text-[var(--foreground)]">Recomendado:</p>
              <p className="mt-1">
                1) Finaliza PayU en la pestaña nueva.
                <br />
                2) Vuelve aquí y comparte el comprobante por WhatsApp.
              </p>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onAcknowledgePostPayModal}
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-lg border border-[var(--accent-champagne)] px-5 text-[10px] font-semibold uppercase tracking-[0.18em]"
              >
                Entendido
              </button>
              <a
                href={whatsAppUrl(
                  "Ya realicé el pago en PayU. Te comparto el comprobante para validar mi pedido."
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-lg border border-[var(--accent-rose-deep)] bg-[var(--accent-rose-deep)] px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90"
              >
                Ir a WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
