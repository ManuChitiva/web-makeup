import type { MetadataRoute } from "next";
import { loadCatalogProducts } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl().origin;
  const catalog = await loadCatalogProducts();
  const ids = new Set<string>();
  for (const p of catalog) ids.add(p.id);

  const entries: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/productos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.88,
    },
  ];

  for (const id of ids) {
    entries.push({
      url: `${base}/productos/${id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
