"use client";

import Image from "next/image";
import Link from "next/link";
import type { Service } from "../data/services";
import { useCart } from "../context/CartContext";
import { whatsappUrlWithText } from "@/lib/social";

export default function ProductDetail({ service }: { service: Service }) {
  const { addItem, hasItem } = useCart();
  const selected = hasItem(service.id);
  const message = `Hola, quisiera consultar disponibilidad para ${service.name.toLowerCase()}. ¿Podemos hablar de fecha, detalles y valor?`;

  return (
    <div className="section-container pb-20 pt-8 md:pb-28 md:pt-12">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs text-[var(--foreground)]/55" aria-label="Ruta de navegación">
        <Link href="/servicios" className="hover:text-[var(--accent-rose-deep)]">Servicios</Link>
        <span aria-hidden>/</span>
        <span className="text-[var(--foreground)]">{service.name}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f0e8df]" data-reveal>
          <Image src={service.imageUrl} alt={service.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center" data-reveal>
          <p className="eyebrow"><span /> {service.category.toUpperCase()}</p>
          <h1 className="display-title mt-5">{service.name}</h1>
          <p className="mt-7 max-w-lg text-base leading-8 text-[#6f625d]">{service.description}</p>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[#81736d]">Cuéntanos tu idea y la fecha que tienes en mente. Te confirmaremos disponibilidad y valor según los detalles de tu cita.</p>
          <p className="mt-3 text-xs text-[#81736d]">Fotografía de referencia.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={whatsappUrlWithText(message)} target="_blank" rel="noopener noreferrer" className="button-primary">Consultar este servicio <span aria-hidden>↗</span></a>
            {selected ? (
              <Link href="/carrito" className="button-outline">Ver mi selección <span aria-hidden>→</span></Link>
            ) : (
              <button type="button" className="button-outline" onClick={() => addItem(service.id)}>Agregar a mi selección <span aria-hidden>＋</span></button>
            )}
          </div>
          <Link href="/servicios" className="text-link mt-9 self-start">Ver más servicios <span aria-hidden>→</span></Link>
        </div>
      </div>
    </div>
  );
}
