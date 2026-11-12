import type { Metadata } from "next";
import { Playfair_Display, Outfit, Great_Vibes } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import { socialLinks } from "@/lib/social";
import { loadCatalogServices } from "@/lib/catalog";
import { CatalogProvider } from "./context/CatalogContext";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import MotionEnhancer from "./components/MotionEnhancer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const siteDescription =
  "Servicios de maquillaje profesional para eventos, novias, fotografía y clases en Colombia. Conoce las opciones y reserva tu cita.";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default:
      "CamilaPalaciosMakeup — Servicios de maquillaje profesional",
    template: "%s | CamilaPalaciosMakeup",
  },
  description: siteDescription,
  keywords: [
    "maquillaje profesional",
    "maquillaje de novias",
    "makeup Colombia",
    "maquillaje social",
    "maquillaje editorial",
    "clases de automaquillaje",
    "Camila Palacios",
  ],
  authors: [{ name: "Camila Palacios", url: getSiteUrl().href }],
  creator: "CamilaPalaciosMakeup",
  publisher: "CamilaPalaciosMakeup",
  formatDetection: { email: true, telephone: true },
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: ["es"],
    siteName: "CamilaPalaciosMakeup",
    title:
      "CamilaPalaciosMakeup — Servicios de maquillaje profesional",
    description: siteDescription,
    url: getSiteUrl().href,
  },
  twitter: {
    card: "summary_large_image",
    title: "CamilaPalaciosMakeup — Servicios de maquillaje profesional",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function organizationJsonLd() {
  const url = getSiteUrl().href;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}#business`,
    name: "CamilaPalaciosMakeup",
    description:
      "Servicios de maquillaje profesional para eventos, novias, sesiones fotográficas y clases.",
    url,
    telephone: "+573205489374",
    email: "camilapalaciosmakeup@gmail.com",
    areaServed: { "@type": "Country", name: "Colombia" },
    serviceType: [
      "Maquillaje profesional",
      "Maquillaje de novias",
      "Maquillaje editorial y fotografía",
      "Clases de automaquillaje",
    ],
    sameAs: [socialLinks.instagram, socialLinks.facebook],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const catalogServices = loadCatalogServices();
  const jsonLd = JSON.stringify(organizationJsonLd());

  return (
    <html lang="es-CO" className="scroll-smooth m-0 min-h-0 h-auto p-0" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </head>
      <body
        className={`${playfair.variable} ${outfit.variable} ${greatVibes.variable} m-0 min-h-0 h-auto p-0 font-sans antialiased`}
      >
        <div id="app-shell">
          <CatalogProvider services={catalogServices}>
            <CartProvider>
              {children}
              <CartDrawer />
              <MotionEnhancer />
            </CartProvider>
          </CatalogProvider>
        </div>
      </body>
    </html>
  );
}
