/**
 * URL canónica del sitio para metadatos, sitemap y robots.
 * En producción define NEXT_PUBLIC_SITE_URL (p. ej. https://camilapalaciosmakeup.com).
 * En Vercel se usa el dominio estable de producción antes del URL de cada despliegue.
 */
export function getSiteUrl(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv);
    } catch {
      /* valor inválido */
    }
  }
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return new URL(`https://${host}`);
  }
  return new URL("http://localhost:3000");
}
