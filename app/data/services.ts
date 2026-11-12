/** Servicios mostrados en el catálogo. La disponibilidad y el valor se confirman al reservar. */
export type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
};

export const CATALOG_SERVICES: Service[] = [
  {
    id: "maquillaje-social",
    name: "Maquillaje social",
    category: "Eventos y ocasiones",
    description: "Un look a tu medida para celebraciones, eventos y momentos que quieres recordar. Definimos juntas el acabado que mejor expresa tu estilo.",
    imageUrl: "/services/maquillaje-social.jpg",
    imageAlt: "Retrato de una mujer con maquillaje de acabado luminoso",
  },
  {
    id: "novias",
    name: "Maquillaje para novias",
    category: "Tu día especial",
    description: "Una propuesta personal para acompañarte en tu gran día. Creamos un maquillaje que se sienta como tú y luzca hermoso en persona y en fotografías.",
    imageUrl: "/services/novias.jpg",
    imageAlt: "Maquilladora preparando a una novia antes de la ceremonia",
  },
  {
    id: "editorial-fotografia",
    name: "Editorial y fotografía",
    category: "Imagen y contenido",
    description: "Maquillaje pensado para sesiones de fotos, campañas y proyectos creativos. Una propuesta visual que acompaña la idea y destaca frente a la cámara.",
    imageUrl: "/services/editorial.jpg",
    imageAlt: "Maquilladora trabajando con una modelo en una sesión de estudio",
  },
  {
    id: "clases-asesoria",
    name: "Clases y asesoría",
    category: "Aprende a tu ritmo",
    description: "Aprende técnicas de automaquillaje y descubre cómo adaptar tu rutina a tu piel y a tu estilo, con acompañamiento cercano y práctico.",
    imageUrl: "/services/automaquillaje.jpg",
    imageAlt: "Mujer maquillándose frente a un espejo",
  },
];
