import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Oculta el badge "N" en dev (no afecta altura del documento, pero evita confusión visual abajo) */
  devIndicators: false,
};

export default nextConfig;
