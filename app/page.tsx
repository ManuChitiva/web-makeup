import type { Metadata } from "next";
import { loadCatalogServices } from "@/lib/catalog";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BookingSection from "./components/BookingSection";
import ProductsSection from "./components/ProductsSection";
import MakeupExpertGrid from "./components/MakeupExpertGrid";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const services = loadCatalogServices();

  return (
    <div className="site-content w-full bg-[var(--background)]">
      <Header />
      <main>
        <Hero />
        <ProductsSection services={services} />
        <MakeupExpertGrid />
        <BookingSection />
        <Footer />
      </main>
    </div>
  );
}
