import type { Metadata } from "next";
import CartCheckoutView from "../components/CartCheckoutView";

export const metadata: Metadata = { title: "Mi selección de servicios", robots: { index: false, follow: true } };

export default function CarritoPage() {
  return <CartCheckoutView />;
}
