import { cache } from "react";
import type { Product } from "@/app/data/products";
import { fetchMappedStoreCatalog } from "@/lib/store-catalog-api";

/**
 * Solo productos desde la STORE API (vacío si no hay env / fallo / sin datos).
 */
export const loadCatalogProducts = cache(async (): Promise<Product[]> => {
  return fetchMappedStoreCatalog();
});

export const resolveProductById = cache(
  async (id: string): Promise<Product | undefined> => {
    const catalog = await loadCatalogProducts();
    return catalog.find((p) => p.id === id);
  },
);
