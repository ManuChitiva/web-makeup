import { fetchPayuStatus } from "@/lib/store-checkout";
import { fetchStoreMeta } from "@/lib/store-meta";
import { getResolvedStoreApiEnv } from "@/lib/store-api-config";
import CartCheckoutView from "../components/CartCheckoutView";

export const metadata = {
  title: "Carrito",
};

export default async function CarritoPage() {
  const meta = await fetchStoreMeta();
  const resolved = getResolvedStoreApiEnv();

  const payuStatusFetchAttempted = Boolean(resolved && meta?.slug);
  const payuStatus = payuStatusFetchAttempted
    ? await fetchPayuStatus(meta!.slug)
    : null;

  return (
    <CartCheckoutView
      storeId={meta?.storeId}
      storeName={meta?.name ?? "Camila Palacios Makeup"}
      payuStatus={payuStatus}
      payuStatusFetchAttempted={payuStatusFetchAttempted}
    />
  );
}
