import type { Metadata } from "next";
import { loadCatalogServices } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/site";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCatalog from "../components/ProductCatalog";

export const metadata: Metadata = {
  title: "Servicios de maquillaje en Villavicencio, Meta",
  description: "Explora maquillaje social, para novias, editorial y clases de automaquillaje en Villavicencio, Meta. Consulta disponibilidad con Camila Palacios Makeup Studio.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios de maquillaje en Villavicencio, Meta",
    description: "Maquillaje para eventos, novias, fotografía y clases en Villavicencio. Conoce los servicios y consulta tu cita.",
    url: `${getSiteUrl().origin}/servicios`,
    images: ["/hero-camila-portrait.png"],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios de maquillaje en Villavicencio, Meta",
    description: "Conoce los servicios de Camila Palacios Makeup Studio en Villavicencio.",
    images: ["/hero-camila-portrait.png"],
  },
};

export default function ServiciosPage() {
  return (
    <div className="site-content w-full bg-[var(--background)]">
      <Header />
      <main className="pt-20"><ProductCatalog services={loadCatalogServices()} /></main>
      <Footer />
    </div>
  );
}
