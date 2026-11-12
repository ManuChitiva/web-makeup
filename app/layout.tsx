import type { Metadata } from "next";
import { Playfair_Display, Outfit, Great_Vibes } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import { loadCatalogServices } from "@/lib/catalog";
import { businessJsonLd, serializeJsonLd } from "@/lib/seo";
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
  "Maquillaje profesional en Villavicencio, Meta: novias, eventos, fotografía y clases de automaquillaje. Conoce los servicios de Camila Palacios Makeup Studio.";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default:
      "Maquillaje en Villavicencio, Meta | Camila Palacios",
    template: "%s | Camila Palacios",
  },
  description: siteDescription,
  authors: [{ name: "Camila Palacios", url: getSiteUrl().href }],
  creator: "Camila Palacios Makeup Studio",
  publisher: "Camila Palacios Makeup Studio",
  formatDetection: { email: true, telephone: true },
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: ["es"],
    siteName: "Camila Palacios Makeup Studio",
    title:
      "Maquillaje en Villavicencio, Meta | Camila Palacios",
    description: siteDescription,
    url: getSiteUrl().href,
    images: [{ url: "/hero-camila-portrait.png", alt: "Camila Palacios Makeup Studio en Villavicencio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maquillaje en Villavicencio, Meta | Camila Palacios",
    description: siteDescription,
    images: ["/hero-camila-portrait.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const catalogServices = loadCatalogServices();
  const jsonLd = serializeJsonLd(businessJsonLd());

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
