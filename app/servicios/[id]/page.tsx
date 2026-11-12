import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteUrl } from "@/lib/site";
import { loadCatalogServices, resolveServiceById } from "@/lib/catalog";
import { serializeJsonLd, serviceBreadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd([serviceJsonLd(service), serviceBreadcrumbJsonLd(service)]) }} />
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
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: path },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: `${getSiteUrl().origin}${path}`,
      images: [{ url: service.imageUrl, alt: service.imageAlt }],
      type: "website",
      locale: "es_CO",
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.seoDescription,
      images: [service.imageUrl],
    },
  };
}
