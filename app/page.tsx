import type { Metadata } from "next";
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

export default function Home() {
  return (
    <div className="site-content w-full bg-[var(--background)]">
      <Header />
      <main>
        <Hero />
        <Services />
        <BookingSection />
        <ProductsSection />
        <MakeupExpertGrid />
        <Footer />
      </main>
    </div>
  );
}
