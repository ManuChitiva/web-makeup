import { cache } from "react";
import { getResolvedStoreApiEnv } from "@/lib/store-api-config";

export type StoreMeta = {
  storeId: number;
  slug: string;
  name: string;
};

/**
 * Datos de la tienda necesarios para checkout (POST /checkout con storeId).
 */
export const fetchStoreMeta = cache(async (): Promise<StoreMeta | null> => {
  const resolved = getResolvedStoreApiEnv();
  if (!resolved) return null;

  const url = `${resolved.apiRoot}/stores/${encodeURIComponent(resolved.slug)}`;
  try {
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      id: number;
      slug: string;
      name: string;
    };
    if (typeof data.id !== "number" || !data.slug) return null;
    return {
      storeId: data.id,
      slug: data.slug,
      name: data.name ?? "Tienda",
    };
  } catch {
    return null;
  }
});
