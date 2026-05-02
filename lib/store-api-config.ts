/**
 * URL raíz del API (incluye context path /store cuando aplique) + slug de tienda.
 */

export type ResolvedStoreApiEnv = {
  apiRoot: string;
  slug: string;
};

export function getResolvedStoreApiEnv(): ResolvedStoreApiEnv | null {
  const fromPublic = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  const fromServer = process.env.STORE_API_BASE_URL?.trim();
  const baseUrl = fromPublic || fromServer;
  if (!baseUrl) return null;

  const slug =
    process.env.NEXT_PUBLIC_STORE_API_SLUG?.trim() ||
    process.env.STORE_API_SLUG?.trim() ||
    "01";

  return { apiRoot: baseUrl.replace(/\/$/, ""), slug };
}
