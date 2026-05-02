import type { Product } from "@/app/data/products";
import { getResolvedStoreApiEnv } from "@/lib/store-api-config";

type StoreApiResponse = {
  id: number;
  name: string;
  slug: string;
};

type ProductApiResponse = {
  id: number;
  storeId: number;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  active: boolean;
  availableQuantity: number;
  currency: string | null;
  createdAt: string;
};

const LOG = "[STORE-API]";

function devLog(...args: unknown[]) {
  if (process.env.NODE_ENV === "development") {
    console.log(LOG, ...args);
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(
    price,
  );
}

function mapProducts(data: ProductApiResponse[]): Product[] {
  return data
    .filter((item) => item.active)
    .map((item) => ({
      id: String(item.id),
      name: item.name,
      price: formatPrice(Number(item.price)),
      priceNumber: Number(item.price),
      category: "Producto",
      image: "🛍️",
      description: item.description ?? undefined,
      sku: `REF-${item.id}`,
      isService: false,
      imageUrl: item.imageUrl?.trim() ? item.imageUrl.trim() : undefined,
      availableQuantity: Math.max(0, Number(item.availableQuantity ?? 0)),
    }));
}

/** Devuelve productos mapeados o [] si falta configuración / falla la API. */
export async function fetchMappedStoreCatalog(): Promise<Product[]> {
  const resolved = getResolvedStoreApiEnv();
  if (!resolved) {
    devLog("Sin URL — define STORE_API_BASE_URL o NEXT_PUBLIC_API_BASE_URL.");
    return [];
  }
  const { apiRoot, slug } = resolved;

  devLog("env resuelto:", {
    slug,
    nota: "La base debe incluir el path del API (p. ej. …/store).",
  });

  devLog("URL raíz API:", apiRoot);

  try {
    const storeEndpoint = `${apiRoot}/stores/${slug}`;
    devLog("GET", storeEndpoint);
    const res = await fetch(storeEndpoint, {
      method: "GET",
      cache: "no-store",
    });
    devLog("← tienda", res.status, res.statusText);
    if (!res.ok) return [];

    void ((await res.json()) as StoreApiResponse);

    const productsEndpoint = `${apiRoot}/stores/${slug}/products`;
    devLog("GET", productsEndpoint);
    const productsRes = await fetch(productsEndpoint, {
      method: "GET",
      cache: "no-store",
    });
    devLog("← productos", productsRes.status, productsRes.statusText);

    if (!productsRes.ok) return [];

    const raw = (await productsRes.json()) as ProductApiResponse[];
    const list = mapProducts(Array.isArray(raw) ? raw : []);
    devLog("productos activos en UI:", list.length);
    return list;
  } catch (e) {
    devLog("error:", e instanceof Error ? e.message : e);
    return [];
  }
}
