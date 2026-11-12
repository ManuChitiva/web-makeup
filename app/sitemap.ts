import type { MetadataRoute } from "next";
import { loadCatalogServices } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().origin;
  const entries: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/servicios`, changeFrequency: "weekly", priority: 0.9 },
  ];

  for (const service of loadCatalogServices()) {
    entries.push({
      url: `${base}/servicios/${service.id}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
