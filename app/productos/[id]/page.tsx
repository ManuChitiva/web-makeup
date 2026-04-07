import { notFound } from "next/navigation";
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

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: `${product.name} | CamilaPalaciosMakeup`,
    description: product.description ?? `Producto ${product.name} - Camila Palacios Makeup Studio`,
  };
}
