import { CATALOG_SERVICES, type Service } from "@/app/data/services";

export function loadCatalogServices(): Service[] {
  return CATALOG_SERVICES;
}

export function resolveServiceById(id: string): Service | undefined {
  return CATALOG_SERVICES.find((service) => service.id === id.trim());
}
