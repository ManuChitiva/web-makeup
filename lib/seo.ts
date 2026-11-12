import { loadCatalogServices } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/site";
import { socialLinks } from "@/lib/social";
import type { Service } from "@/app/data/services";

const origin = getSiteUrl().origin;
const businessId = `${origin}/#business`;

export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": businessId,
    name: "Camila Palacios Makeup Studio",
    url: `${origin}/`,
    description: "Estudio de maquillaje profesional para eventos, novias, fotografía y clases en Villavicencio, Meta.",
    image: `${origin}/hero-camila-portrait.png`,
    telephone: "+573205489374",
    email: "camilapalaciosmakeup@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Quintas del Bosque 2, Cl. 5a",
      addressLocality: "Villavicencio",
      addressRegion: "Meta",
      addressCountry: "CO",
    },
    areaServed: { "@type": "City", name: "Villavicencio" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de maquillaje",
      itemListElement: loadCatalogServices().map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${origin}/servicios/${service.id}#service`,
          name: service.name,
          url: `${origin}/servicios/${service.id}`,
        },
      })),
    },
    sameAs: [socialLinks.instagram, socialLinks.facebook],
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${origin}/servicios/${service.id}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: `${origin}/servicios/${service.id}`,
    provider: { "@id": businessId },
    areaServed: { "@type": "City", name: "Villavicencio" },
  };
}

export function serviceBreadcrumbJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${origin}/` },
      { "@type": "ListItem", position: 2, name: "Servicios", item: `${origin}/servicios` },
      { "@type": "ListItem", position: 3, name: service.name, item: `${origin}/servicios/${service.id}` },
    ],
  };
}
