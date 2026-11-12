import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteUrl } from "@/lib/site";
import { loadCatalogServices, resolveServiceById } from "@/lib/catalog";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductDetail from "../../components/ProductDetail";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return loadCatalogServices().map(({ id }) => ({ id }));
}

export default async function ServicePage({ params }: PageProps) {
  const { id } = await params;
  const service = resolveServiceById(id);
  if (!service) notFound();

  return (
    <div className="site-content w-full bg-[var(--background)]">
      <Header />
      <main className="pt-20"><ProductDetail service={service} /></main>
      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = resolveServiceById(id);
  if (!service) return { title: "Servicio no encontrado", robots: { index: false } };
  const path = `/servicios/${id}`;
  return {
    title: service.name,
    description: service.description,
    keywords: [service.name, service.category, "maquillaje profesional", "servicio"],
    alternates: { canonical: path },
    openGraph: {
      title: service.name,
      description: service.description,
      url: `${getSiteUrl().origin}${path}`,
      images: [service.imageUrl],
      type: "website",
      locale: "es_CO",
    },
  };
}
