/**
 * Modelo compartido para productos (API de catálogo y API de destacados).
 */
export type Product = {
  id: string;
  name: string;
  price: string;
  priceNumber: number;
  /** Imagen remota cuando viene de la STORE API (`imageUrl`). */
  imageUrl?: string;
  /** Stock reportado por la API; opcional para mocks locales. */
  availableQuantity?: number;
  isService?: boolean;
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
/** Catálogo mock si la STORE API no está configurada o no devuelve datos. */
export const FALLBACK_CATALOG_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Maquillaje social completo",
    price: "24.990",
    priceNumber: 24990,
    isService: true,
    category: "Servicio",
    image: "🎨",
    colors: ["#e8d5c4", "#c9a98c", "#a67c52", "#8b6914", "#6b5344"],
    colorNames: ["Nude claro", "Beige", "Tierra", "Bronce", "Café"],
    sku: "PALNUDE01",
    description:
      "Sesión de maquillaje social con preparación de piel, correcciones y acabado de larga duración. Ideal para eventos de día o noche.",
  },
  {
    id: "2",
    name: "Maquillaje de noche glam",
    price: "18.500",
    priceNumber: 18500,
    isService: true,
    category: "Servicio",
    image: "✨",
    colors: ["#f5e6d3", "#e8d5c4", "#d4b896", "#b8956a", "#8b7355"],
    colorNames: [
      "Porcelana",
      "Marfil",
      "Beige natural",
      "Bronce claro",
      "Caramelo",
    ],
    sku: "BASEHD02",
    description:
      "Look glam con enfoque en ojos y piel luminosa, pensado para eventos especiales. Incluye asesoría de estilo según tu vestuario.",
  },
  {
    id: "3",
    name: "Prueba de maquillaje personalizada",
    price: "32.000",
    priceNumber: 32000,
    isService: true,
    category: "Servicio",
    image: "🖌️",
    sku: "BROCHAS36",
    description:
      "Sesión de prueba para definir estilo, tonos y acabado final antes de tu evento. Recomendada para novias y celebraciones importantes.",
  },
  {
    id: "4",
    name: "Maquillaje para novias",
    price: "9.990",
    priceNumber: 9990,
    isService: true,
    category: "Servicio",
    image: "💋",
    colors: ["#c41e3a", "#e85a5a", "#8b3a3a", "#d4a5a5", "#5c2a2a"],
    colorNames: ["Rojo clásico", "Coral", "Vino", "Rosa nude", "Maroon"],
    sku: "LABMATE04",
    description:
      "Servicio especializado para novias con look resistente a foto y video. Incluye preparación de piel y retoques clave para larga duración.",
  },
  {
    id: "5",
    name: "Automaquillaje guiado 1:1",
    price: "14.500",
    priceNumber: 14500,
    isService: true,
    category: "Servicio",
    image: "🌟",
    colors: ["#f5e6e8", "#e8d5d8", "#d4a5b0", "#c97a8f"],
    colorNames: ["Champagne", "Rosa pálido", "Rosa dorado", "Melocotón"],
    sku: "ILUMCREM05",
    description:
      "Clase personalizada para aprender tu rutina de maquillaje paso a paso. Trabajamos técnica, productos y combinación de tonos para tu piel.",
  },
  {
    id: "6",
    name: "Asesoría de imagen express",
    price: "7.500",
    priceNumber: 7500,
    isService: true,
    category: "Servicio",
    image: "👁️",
    colors: ["#1a1a1a", "#3d3d3d", "#6b6b6b", "#8b7355"],
    colorNames: ["Negro", "Gris oscuro", "Marrón", "Café"],
    sku: "MASCARA06",
    description:
      "Asesoría corta para definir maquillaje ideal según ocasión, tipo de piel y estilo personal. Perfecta para preparar tus próximos eventos.",
  },
  {
    id: "13",
    name: "Maquillaje quinceañera",
    price: "95.000",
    priceNumber: 95000,
    isService: true,
    category: "Servicio",
    image: "👗",
    sku: "SRV013",
    description:
      "Look duradero pensado para quinceañera: piel fotogénica, ojos definidos y labios cómodos. Incluye fijador y consejos para el día.",
  },
  {
    id: "14",
    name: "Maquillaje de graduación",
    price: "42.900",
    priceNumber: 42900,
    isService: true,
    category: "Servicio",
    image: "🎓",
    sku: "SRV014",
    description:
      "Estilo fresco o glam según vestido y foto. Corrección ligera para flash y tiempo al aire libre si aplica.",
  },
  {
    id: "15",
    name: "Look editorial ligero (fotos RRSS)",
    price: "55.000",
    priceNumber: 55000,
    priceFrom: true,
    isService: true,
    category: "Servicio",
    image: "📸",
    sku: "SRV015",
    description:
      "Maquillaje limpio orientado a cámara: acabados matizados, texturas que no brillan demasiado y balance de tonos en piel.",
  },
  {
    id: "16",
    name: "Maquillaje para madrina",
    price: "68.500",
    priceNumber: 68500,
    isService: true,
    category: "Servicio",
    image: "🌷",
    sku: "SRV016",
    description:
      "Elegancia cómoda y larga duración. Coordinación opcional de tonos con outfits y accesorios.",
  },
  {
    id: "17",
    name: "Retoque express (+2 horas después)",
    price: "15.900",
    priceNumber: 15900,
    isService: true,
    category: "Servicio",
    image: "✨",
    sku: "SRV017",
    description:
      "Sesión corta para reactivar base, lágrimas, brillo zona T y perfilar labios después del evento.",
  },
  {
    id: "18",
    name: "Skin prep antes de sesión fotográfica",
    price: "22.900",
    priceNumber: 22900,
    isService: true,
    category: "Servicio",
    image: "💧",
    sku: "SRV018",
    description:
      "Hidratación, masa facial ligera y prep de piel para que el maquillaje funda mejor en cámara o en día largo.",
  },
  {
    id: "19",
    name: "Look monocromático (ojos/mejillas/labios)",
    price: "34.990",
    priceNumber: 34990,
    isService: true,
    category: "Servicio",
    image: "🌸",
    sku: "SRV019",
    description:
      "Armonía de tonos en tonos coral, rosa o terracota según tu subtono.",
  },
  {
    id: "20",
    name: "Delineados y efecto ojos definidos",
    price: "28.500",
    priceNumber: 28500,
    isService: true,
    category: "Servicio",
    image: "✏️",
    sku: "SRV020",
    description:
      "Sesión enfocada en línea precisa o smudgy, según tus preferencias, con balance en el resto del rostro.",
  },
  {
    id: "21",
    name: "Look natural tipo “skin first”",
    price: "27.990",
    priceNumber: 27990,
    isService: true,
    category: "Servicio",
    image: "🌿",
    sku: "SRV021",
    description:
      "Cubrimiento liviano que deja lucir tu piel, con sutiles correcciones y acabado natural.",
  },
  {
    id: "22",
    name: "Maquillaje para madre de la novia",
    price: "62.900",
    priceNumber: 62900,
    isService: true,
    category: "Servicio",
    image: "💐",
    sku: "SRV022",
    description:
      "Discreto y elegante, resistente a emociones y fotos cercanas.",
  },
  {
    id: "23",
    name: "Clase rápida: base impecable (45 min)",
    price: "35.900",
    priceNumber: 35900,
    isService: true,
    category: "Servicio",
    image: "📘",
    sku: "SRV023",
    description:
      "Mini clase sobre aplicación de primer, corrector, base y fijadores según tu tipo de piel.",
  },
  {
    id: "24",
    name: "Look para videollamada / entrevista",
    price: "32.990",
    priceNumber: 32990,
    isService: true,
    category: "Servicio",
    image: "💻",
    sku: "SRV024",
    description:
      "Iluminación y contraste pensados para cámara frontal: fresco y sin efecto pastel en pantalla.",
  },
  {
    id: "25",
    name: "Contouring & sculpted soft",
    price: "36.990",
    priceNumber: 36990,
    isService: true,
    category: "Servicio",
    image: "🪞",
    sku: "SRV025",
    description: "Volumen y definición naturales sin apariencia cargada.",
  },
  {
    id: "26",
    name: "Bridal party: segunda aplicación mismo día",
    price: "45.990",
    priceNumber: 45990,
    isService: true,
    category: "Servicio",
    image: "👯",
    sku: "SRV026",
    description:
      "Maquillaje coordinado ligero entre damas; tonos cohesionados.",
  },
  {
    id: "27",
    name: "Sesión primera vez maquillaje (adolescente)",
    price: "39.990",
    priceNumber: 39990,
    isService: true,
    category: "Servicio",
    image: "🌼",
    sku: "SRV027",
    description:
      "Rutina básica, higiene del kit y look suave pensado para edad.",
  },
  {
    id: "28",
    name: "Taller grupo (mínimo 5 personas)",
    priceFrom: true,
    price: "380.000",
    priceNumber: 380000,
    isService: true,
    category: "Taller",
    image: "👥",
    sku: "SRV028",
    description:
      "Taller de automaquillaje con temática acordada. Precio base para grupo hasta 10; consultar por cotización.",
  },
  {
    id: "29",
    name: "Pack novia + 1 acompañante",
    price: "195.990",
    priceNumber: 195990,
    isService: true,
    category: "Pack",
    image: "💒",
    sku: "SRV029",
    description:
      "Valor conjunto novia más un servicio igual o inferior en precio lista. Coordinación previa recomendada.",
  },
  {
    id: "30",
    name: "Sesión madrugador (antes de 7:00 a. m.)",
    priceFrom: true,
    price: "82.990",
    priceNumber: 82990,
    isService: true,
    category: "Servicio",
    image: "🌅",
    sku: "SRV030",
    description:
      "Suplemento horario especial sumado al servicio seleccionado. Consultar disponibilidad y precio por fecha.",
  },
  {
    id: "31",
    name: "Maquillaje para hombre corrección editorial",
    price: "24.990",
    priceNumber: 24990,
    isService: true,
    category: "Servicio",
    image: "🎯",
    sku: "SRV031",
    description:
      "Unificación de tono, ocultaje de brillo no deseado y cejas ordenadas.",
  },
  {
    id: "32",
    name: "Sesión día de foto pre-boda (novia/o)",
    price: "88.990",
    priceNumber: 88990,
    isService: true,
    category: "Servicio",
    image: "🤍",
    sku: "SRV032",
    description:
      "Look fresco y reproducible más tarde si deseas mismo estilo para el día B.",
  },
  {
    id: "33",
    name: "Lips & cheeks focus (45 min)",
    price: "19.990",
    priceNumber: 19990,
    isService: true,
    category: "Servicio",
    image: "🍑",
    sku: "SRV033",
    description:
      "Centrado en mejillas y labios cuando la piel está ya maquillada o para retoques ligeros.",
  },
  {
    id: "34",
    name: "Limpieza y descanso después de sesión pesada",
    price: "12.990",
    priceNumber: 12990,
    isService: true,
    category: "Cuidado",
    image: "🧖",
    sku: "SRV034",
    description:
      "Rutina rápida suave después de lápices resistentes o demasiadas capas; ideal combinado largas jornadas.",
  },
  {
    id: "35",
    name: "Asesoría paleta vs piel undertone",
    priceFrom: true,
    price: "59.990",
    priceNumber: 59990,
    isService: true,
    category: "Consulta",
    image: "🎨",
    sku: "SRV035",
    description:
      "Análisis de subtonos, armado de combinaciones y recomendaciones de formato (cremas/pós).",
  },
  {
    id: "36",
    name: "Extensión tiempo en locación (+30 min)",
    priceFrom: true,
    price: "42.990",
    priceNumber: 42990,
    isService: true,
    category: "Suplemento",
    image: "⏳",
    sku: "SRV036",
    description:
      "Media hora extra on-site útil cuando hay retratos improvisados tras la ceremonia.",
  },
  {
    id: "37",
    name: "Prueba cabello + maquillaje (coordinación en locación)",
    price: "71.990",
    priceNumber: 71990,
    isService: true,
    category: "Servicio",
    image: "✂️",
    sku: "SRV037",
    description:
      "Coordinamos maquillo con peinado cuando ambos están en mismo venue; comunicación incluida con estilismo.",
  },
  {
    id: "38",
    name: "Corrección de maquillo traído desde casa",
    price: "29.990",
    priceNumber: 29990,
    isService: true,
    category: "Servicio",
    image: "🛠️",
    sku: "SRV038",
    description:
      "Ajustamos base mal tonificada u ojos desvanecidos en base a tu propio bolso antes de foto o evento.",
  },
];

/** API 2: Productos destacados (sección Makeup Expert) */
export const featuredProducts: Product[] = [
  {
    id: "7",
    name: "Lápiz delineador en gel 1st Scene",
    price: "30.000",
    priceNumber: 30000,
    isService: true,
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
    isService: true,
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
    isService: true,
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
    isService: true,
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
    isService: true,
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
    isService: true,
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

export function getFeaturedProducts(): Product[] {
  return featuredProducts;
}
