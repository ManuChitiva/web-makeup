/**
 * Modelo compartido para productos (API de catálogo y API de destacados).
 */
export type Product = {
  id: string;
  name: string;
  price: string;
  priceNumber: number;
  category: string;
  image: string;
  colors?: string[];
  colorNames?: string[];
  description?: string;
  sku?: string;
  rating?: number;
  reviews?: number;
  priceFrom?: boolean;
  moreColors?: number;
};

/** API 1: Catálogo de productos (sección Productos de la home) */
export const products: Product[] = [
  {
    id: "1",
    name: "Paleta de sombras nude",
    price: "24.990",
    priceNumber: 24990,
    category: "Ojos",
    image: "🎨",
    colors: ["#e8d5c4", "#c9a98c", "#a67c52", "#8b6914", "#6b5344"],
    colorNames: ["Nude claro", "Beige", "Tierra", "Bronce", "Café"],
    sku: "PALNUDE01",
    description:
      "Paleta de sombras en tonos nude con alta pigmentación y textura cremosa. Ideal para looks naturales o ahumados. Fácil de difuminar y larga duración.",
  },
  {
    id: "2",
    name: "Base de maquillaje HD",
    price: "18.500",
    priceNumber: 18500,
    category: "Rostro",
    image: "✨",
    colors: ["#f5e6d3", "#e8d5c4", "#d4b896", "#b8956a", "#8b7355"],
    colorNames: ["Porcelana", "Marfil", "Beige natural", "Bronce claro", "Caramelo"],
    sku: "BASEHD02",
    description:
      "Base de maquillaje de acabado natural y cobertura media-alta. Textura fluida que se funde con la piel para un resultado uniforme y luminoso. Ideal para todo tipo de piel.",
  },
  {
    id: "3",
    name: "Set de brochas profesional",
    price: "32.000",
    priceNumber: 32000,
    category: "Herramientas",
    image: "🖌️",
    sku: "BROCHAS36",
    description:
      "Set completo de brochas profesionales para rostro y ojos. Cerdas suaves y resistentes. Incluye funda para guardado. Esencial para una aplicación impecable.",
  },
  {
    id: "4",
    name: "Labial mate larga duración",
    price: "9.990",
    priceNumber: 9990,
    category: "Labios",
    image: "💋",
    colors: ["#c41e3a", "#e85a5a", "#8b3a3a", "#d4a5a5", "#5c2a2a"],
    colorNames: ["Rojo clásico", "Coral", "Vino", "Rosa nude", "Maroon"],
    sku: "LABMATE04",
    description:
      "Labial mate de larga duración con fórmula que no reseca. Alta pigmentación en un solo paso. Acabado mate elegante y cómodo.",
  },
  {
    id: "5",
    name: "Iluminador en crema",
    price: "14.500",
    priceNumber: 14500,
    category: "Rostro",
    image: "🌟",
    colors: ["#f5e6e8", "#e8d5d8", "#d4a5b0", "#c97a8f"],
    colorNames: ["Champagne", "Rosa pálido", "Rosa dorado", "Melocotón"],
    sku: "ILUMCREM05",
    description:
      "Iluminador en crema que funde con la piel para un brillo natural. Aplica en pómulos, arco cupido y punta de nariz. Textura cremosa y fácil de difuminar.",
  },
  {
    id: "6",
    name: "Máscara de pestañas",
    price: "7.500",
    priceNumber: 7500,
    category: "Ojos",
    image: "👁️",
    colors: ["#1a1a1a", "#3d3d3d", "#6b6b6b", "#8b7355"],
    colorNames: ["Negro", "Gris oscuro", "Marrón", "Café"],
    sku: "MASCARA06",
    description:
      "Máscara de pestañas que aporta volumen y definición sin grumos. Fórmula resistente al agua. Aplicación suave con el cepillo incluido.",
  },
];

/** API 2: Productos destacados (sección Makeup Expert) */
export const featuredProducts: Product[] = [
  {
    id: "7",
    name: "Lápiz delineador en gel 1st Scene",
    price: "30.000",
    priceNumber: 30000,
    category: "Ojos",
    image: "✏️",
    rating: 5,
    reviews: 61,
    colors: ["#e8a4a4", "#f5c6c6", "#d4b896", "#8b6914", "#6b6b6b"],
    colorNames: ["Rosa", "Rosa claro", "Dorado", "Caoba", "Gris"],
    sku: "DELGEL07",
    description:
      "Delineador en gel de alta definición. Fácil de aplicar y con larga duración. Ideal para líneas precisas o efecto ahumado.",
  },
  {
    id: "8",
    name: "Click Lipstick Sublime",
    price: "28.000",
    priceNumber: 28000,
    category: "Labios",
    image: "💄",
    rating: 5,
    reviews: 107,
    priceFrom: true,
    colors: ["#c41e3a", "#e85a5a", "#8b3a3a", "#5c2a2a"],
    colorNames: ["Rojo Sublime", "Coral", "Vino", "Caoba Dream"],
    moreColors: 8,
    sku: "LIPSUB08",
    description:
      "Labial en formato click con textura cremosa y alta pigmentación. Se funde en los labios para un acabado uniforme y natural. Ideal para looks sutiles o intensos.",
  },
  {
    id: "9",
    name: "Kit de brochas Black Pro X 36",
    price: "370.000",
    priceNumber: 370000,
    category: "Herramientas",
    image: "🖌️",
    rating: 5,
    reviews: 4,
    sku: "KITBROCH36",
    description:
      "Kit profesional de 36 brochas para rostro y ojos. Incluye estuche. Cerdas de alta calidad para una aplicación impecable.",
  },
  {
    id: "10",
    name: "Paleta de polvos compactos Natural Touch",
    price: "100.000",
    priceNumber: 100000,
    category: "Rostro",
    image: "🎨",
    rating: 5,
    reviews: 22,
    colors: ["#e8d5c4", "#c9a98c", "#a67c52", "#8b6914"],
    colorNames: ["Natural", "Bronce", "Tierra", "Contorno"],
    sku: "POLCOMP10",
    description:
      "Paleta de polvos compactos para rostro. Incluye tonos para acabado natural, bronceado y contorno. Textura sedosa y larga duración.",
  },
  {
    id: "11",
    name: "Paleta de polvos compactos Natural Touch",
    price: "100.000",
    priceNumber: 100000,
    category: "Rostro",
    image: "🎨",
    rating: 5,
    reviews: 22,
    colors: ["#e8d5c4", "#c9a98c", "#a67c52", "#8b6914"],
    colorNames: ["Natural", "Bronce", "Tierra", "Contorno"],
    sku: "POLCOMP11",
    description:
      "Paleta de polvos compactos para rostro. Incluye tonos para acabado natural, bronceado y contorno. Textura sedosa y larga duración.",
  },
  {
    id: "12",
    name: "Paleta de polvos compactos Natural Touch 2",
    price: "100.000",
    priceNumber: 100000,
    category: "Rostro",
    image: "🎨",
    rating: 5,
    reviews: 22,
    colors: ["#e8d5c4", "#c9a98c", "#a67c52", "#8b6914"],
    colorNames: ["Natural", "Bronce", "Tierra", "Contorno"],
    sku: "POLCOMP12",
    description:
      "Paleta de polvos compactos para rostro. Incluye tonos para acabado natural, bronceado y contorno. Textura sedosa y larga duración.",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id) ?? featuredProducts.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return featuredProducts;
}
