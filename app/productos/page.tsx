import type { Metadata } from "next";
import { loadCatalogProducts } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/site";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCatalog from "../components/ProductCatalog";

export const metadata: Metadata = {
  title: "Catálogo · productos y servicios",
  description:
    "Explora maquillaje, servicios y packs. Filtra por categoría, tipo y ordena por precio o nombre.",
  alternates: { canonical: "/productos" },
  openGraph: {
    title: "Catálogo · Camila Palacios Makeup Studio",
    description:
      "Productos y servicios de maquillaje profesional. Reserva por WhatsApp.",
    url: `${getSiteUrl().origin}/productos`,
    locale: "es_CO",
    type: "website",
  },
};

export default async function ProductosCatalogoPage() {
  const catalog = await loadCatalogProducts();

  return (
    <div className="site-content w-full bg-[var(--background)]">
      <Header />
      <main className="pt-20">
        <ProductCatalog products={catalog} />
      </main>
      <Footer />
    </div>
  );
}
