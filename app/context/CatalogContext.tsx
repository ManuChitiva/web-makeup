"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Service } from "../data/services";

const CatalogContext = createContext<Service[] | null>(null);

export function CatalogProvider({ services, children }: { services: Service[]; children: ReactNode }) {
  return <CatalogContext.Provider value={services}>{children}</CatalogContext.Provider>;
}

export function useCatalogServices(): Service[] {
  const catalog = useContext(CatalogContext);
  if (!catalog) throw new Error("useCatalogServices must be used within CatalogProvider");
  return catalog;
}

export function findServiceById(catalog: Service[], id: string): Service | undefined {
  return catalog.find((service) => service.id === id);
}
