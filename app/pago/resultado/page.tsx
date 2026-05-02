import Link from "next/link";
import { describePayuTransactionState } from "@/lib/payu-response-url";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Resultado del pago",
};

type Search = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string | undefined {
  if (v === undefined) return undefined;
  return Array.isArray(v) ? v[0] : v;
}

export default async function PagoResultadoPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const transactionState = first(sp.transactionState);
  const lapTransactionState = first(sp.lapTransactionState);
  const message = first(sp.message);
  const referenceCode = first(sp.referenceCode);
  const referencePol = first(sp.reference_pol);
  const txValue = first(sp.TX_VALUE);
  const currency = first(sp.currency);

  const ui = describePayuTransactionState(
    transactionState,
    lapTransactionState,
    message
  );

  const toneClass =
    ui.tone === "success"
      ? "border-emerald-500/40 bg-emerald-50 text-emerald-950"
      : ui.tone === "warning"
        ? "border-amber-500/40 bg-amber-50 text-amber-950"
        : ui.tone === "error"
          ? "border-red-500/40 bg-red-50 text-red-950"
          : "border-[var(--accent-champagne)] bg-[var(--accent-champagne)]/20 text-[var(--foreground)]";

  return (
    <div className="site-content w-full bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-lg px-6 pb-16 pt-24">
        <div
          className={`card-beauty rounded-2xl border px-6 py-8 ${toneClass}`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-80">
            PayU
          </p>
          <h1 className="mt-2 font-serif text-2xl font-bold">{ui.title}</h1>
          <p className="mt-3 text-sm leading-relaxed opacity-95">
            {ui.description}
          </p>

          {referenceCode || referencePol || txValue ? (
            <dl className="mt-6 space-y-2 border-t border-black/10 pt-6 text-xs">
              {referenceCode ? (
                <div className="flex justify-between gap-4">
                  <dt className="opacity-70">Referencia</dt>
                  <dd className="font-mono text-right">{referenceCode}</dd>
                </div>
              ) : null}
              {referencePol ? (
                <div className="flex justify-between gap-4">
                  <dt className="opacity-70">Transacción PayU</dt>
                  <dd className="font-mono text-right">{referencePol}</dd>
                </div>
              ) : null}
              {txValue ? (
                <div className="flex justify-between gap-4">
                  <dt className="opacity-70">Valor</dt>
                  <dd className="tabular-nums">
                    {currency ? `${currency} ` : ""}
                    {txValue}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}

          <p className="mt-6 text-[11px] leading-relaxed opacity-75">
            La confirmación definitiva del pedido la maneja el servidor (webhook).
            Si el pago fue aprobado, también te contactaremos por los medios que
            indiquiste.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[var(--accent-rose-deep)] px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-rose-deep)] transition hover:bg-[var(--accent-champagne)]/40"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
