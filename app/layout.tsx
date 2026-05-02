import type { Metadata } from "next";
import { Playfair_Display, Outfit, Great_Vibes } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import { socialLinks } from "@/lib/social";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
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
  "Maquillaje profesional para eventos, novias y ocasiones especiales en Colombia. Reserva tu cita y compra productos seleccionados: bases, brochas, labiales y más.";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default:
      "CamilaPalaciosMakeup — Maquillaje profesional y productos Colombia",
    template: "%s | CamilaPalaciosMakeup",
  },
  description: siteDescription,
  keywords: [
    "maquillaje profesional",
    "maquillaje de novias",
    "makeup Colombia",
    "productos de maquillaje",
    "bases de maquillaje HD",
    "brochas profesionales",
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
      "CamilaPalaciosMakeup — Maquillaje profesional y productos Colombia",
    description: siteDescription,
    url: getSiteUrl().href,
  },
  twitter: {
    card: "summary_large_image",
    title: "CamilaPalaciosMakeup — Maquillaje profesional y productos",
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
      "Servicios de maquillaje profesional y venta de cosméticos. Eventos, novias y sesiones especiales.",
    url,
    telephone: "+573205489374",
    email: "camilapalaciosmakeup@gmail.com",
    priceRange: "$$",
    areaServed: { "@type": "Country", name: "Colombia" },
    serviceType: [
      "Maquillaje profesional",
      "Maquillaje de novias",
      "Ventas de cosméticos",
    ],
    sameAs: [socialLinks.instagram, socialLinks.facebook],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = JSON.stringify(organizationJsonLd());

  return (
    <html lang="es-CO" className="scroll-smooth m-0 min-h-0 h-auto p-0">
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
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
