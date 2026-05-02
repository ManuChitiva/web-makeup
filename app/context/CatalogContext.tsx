"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import type { Product } from "../data/products";

const CatalogContext = createContext<Product[] | null>(null);

export function CatalogProvider({
  products,
  children,
}: {
  products: Product[];
  children: ReactNode;
}) {
  return (
    <CatalogContext.Provider value={products}>{children}</CatalogContext.Provider>
  );
}

export function useCatalogProducts(): Product[] {
  const ctx = useContext(CatalogContext);
  if (!ctx)
    throw new Error("useCatalogProducts must be used within CatalogProvider");
  return ctx;
}

export function findProductById(
  catalog: Product[],
  id: string
): Product | undefined {
  return catalog.find((p) => p.id === id);
}
