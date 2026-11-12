/** Servicios mostrados en el catálogo. La disponibilidad y el valor se confirman al reservar. */
export type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  details: string[];
  seoTitle: string;
  seoDescription: string;
  imageUrl: string;
  imageAlt: string;
};

export const CATALOG_SERVICES: Service[] = [
  {
    id: "maquillaje-social",
    name: "Maquillaje social",
    category: "Eventos y ocasiones",
    description: "Un look a tu medida para celebraciones, eventos y momentos que quieres recordar. Definimos juntas el acabado que mejor expresa tu estilo.",
    details: [
      "Ideal para celebraciones, graduaciones y otras ocasiones especiales. Cuéntame cómo será tu evento y qué estilo te gustaría llevar para crear una propuesta que se sienta tuya.",
      "Al consultar, comparte la fecha y cualquier idea o referencia que tengas. Así podremos conversar sobre disponibilidad y el valor del servicio en Villavicencio.",
    ],
    seoTitle: "Maquillaje social en Villavicencio, Meta",
    seoDescription: "Maquillaje social para eventos y celebraciones en Villavicencio, Meta. Conoce el servicio de Camila Palacios Makeup Studio y consulta tu fecha por WhatsApp.",
    imageUrl: "/services/maquillaje-social.jpg",
    imageAlt: "Retrato de una mujer con maquillaje de acabado luminoso",
  },
  {
    id: "novias",
    name: "Maquillaje para novias",
    category: "Tu día especial",
    description: "Una propuesta personal para acompañarte en tu gran día. Creamos un maquillaje que se sienta como tú y luzca hermoso en persona y en fotografías.",
    details: [
      "Tu maquillaje de novia debe acompañar la forma en que quieres verte y sentirte durante la celebración. Podemos conversar sobre tu estilo, el vestido y las referencias que te inspiran.",
      "Cuéntame la fecha, el lugar y el horario de tu boda para planear la propuesta contigo. Atendemos consultas para novias en Villavicencio, Meta.",
    ],
    seoTitle: "Maquillaje para novias en Villavicencio, Meta",
    seoDescription: "Maquillaje para novias en Villavicencio, Meta. Descubre una propuesta personal para tu boda y consulta disponibilidad con Camila Palacios Makeup Studio.",
    imageUrl: "/services/novias.jpg",
    imageAlt: "Maquilladora preparando a una novia antes de la ceremonia",
  },
  {
    id: "editorial-fotografia",
    name: "Editorial y fotografía",
    category: "Imagen y contenido",
    description: "Maquillaje pensado para sesiones de fotos, campañas y proyectos creativos. Una propuesta visual que acompaña la idea y destaca frente a la cámara.",
    details: [
      "Cada producción tiene una intención visual. Comparte el concepto, las referencias y el tipo de imágenes que deseas crear para pensar un maquillaje coherente con el proyecto.",
      "Para consultar una sesión editorial o fotográfica en Villavicencio, envíanos la fecha y los detalles de la producción. Coordinaremos disponibilidad y alcance del servicio.",
    ],
    seoTitle: "Maquillaje editorial y fotografía en Villavicencio",
    seoDescription: "Maquillaje editorial para fotografía, campañas y contenido en Villavicencio, Meta. Consulta tu proyecto con Camila Palacios Makeup Studio.",
    imageUrl: "/services/editorial.jpg",
    imageAlt: "Maquilladora trabajando con una modelo en una sesión de estudio",
  },
  {
    id: "clases-asesoria",
    name: "Clases y asesoría",
    category: "Aprende a tu ritmo",
    description: "Aprende técnicas de automaquillaje y descubre cómo adaptar tu rutina a tu piel y a tu estilo, con acompañamiento cercano y práctico.",
    details: [
      "Las clases y asesorías son un espacio para conversar sobre tu rutina, tus dudas y los looks que te gustaría aprender a crear. La idea es encontrar técnicas que puedas adaptar a tu día a día.",
      "Cuéntanos qué te interesa aprender y consulta las opciones disponibles en Villavicencio, Meta. Te responderemos para coordinar los detalles.",
    ],
    seoTitle: "Clases de automaquillaje en Villavicencio, Meta",
    seoDescription: "Clases y asesorías de automaquillaje en Villavicencio, Meta. Aprende técnicas para tu rutina y consulta opciones con Camila Palacios Makeup Studio.",
    imageUrl: "/services/automaquillaje.jpg",
    imageAlt: "Mujer maquillándose frente a un espejo",
  },
];
