import type { Metadata } from "next";
import { loadCatalogProducts } from "@/lib/catalog";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import BookingSection from "./components/BookingSection";
import ProductsSection from "./components/ProductsSection";
import MakeupExpertGrid from "./components/MakeupExpertGrid";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const catalog = await loadCatalogProducts();
  const homepageCatalog = catalog.slice(0, 6);
  const makeupExpertCatalog = catalog.slice(6, 12);

  return (
    <div className="site-content w-full bg-[var(--background)]">
      <Header />
      <main>
        <Hero />
        <Services />
        <BookingSection />
        <ProductsSection products={homepageCatalog} />
        <MakeupExpertGrid products={makeupExpertCatalog} />
        <Footer />
      </main>
    </div>
  );
}
