import type { Metadata } from "next";
import { Playfair_Display, Outfit, Great_Vibes } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CamilaPalaciosMakeup | Maquillaje profesional y productos",
  description:
    "Maquillaje profesional para eventos, novias y ocasiones especiales. Agenda tu cita y descubre nuestra selección de productos de maquillaje.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth m-0 min-h-0 h-auto p-0">
      <body
        className={`${playfair.variable} ${outfit.variable} ${greatVibes.variable} m-0 min-h-0 h-auto p-0 font-sans antialiased`}
      >
        <div id="app-shell">
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
