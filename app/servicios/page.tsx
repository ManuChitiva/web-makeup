import type { Metadata } from "next";
import { loadCatalogServices } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/site";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCatalog from "../components/ProductCatalog";

export const metadata: Metadata = {
  title: "Servicios de maquillaje",
  description: "Conoce nuestros servicios de maquillaje social, novias, fotografía y clases de automaquillaje.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios de maquillaje · Camila Palacios Makeup Studio",
    description: "Maquillaje para tus momentos especiales. Conoce los servicios y consulta tu cita.",
    url: `${getSiteUrl().origin}/servicios`,
    locale: "es_CO",
    type: "website",
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
