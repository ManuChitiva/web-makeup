import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteUrl } from "@/lib/site";
import { getProductById } from "../../data/products";
import Header from "../../components/Header";
import ProductDetail from "../../components/ProductDetail";

type PageProps = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <div className="site-content w-full bg-[var(--background)]">
      <Header />
      <main className="pt-20">
        <ProductDetail product={product} />
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Producto no encontrado", robots: { index: false } };

  const description =
    product.description ??
    `${product.name} — cosmético en CamilaPalaciosMakeup.`;

  const path = `/productos/${id}`;

  return {
    title: product.name,
    description,
    keywords: [
      product.name,
      product.category,
      "maquillaje",
      product.sku ?? "",
    ].filter(Boolean),
    alternates: { canonical: path },
    openGraph: {
      title: product.name,
      description,
      url: `${getSiteUrl().origin}${path}`,
      type: "website",
      locale: "es_CO",
    },
    twitter: {
      card: "summary",
      title: product.name,
      description,
    },
  };
}
