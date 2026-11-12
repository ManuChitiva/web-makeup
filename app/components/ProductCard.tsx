"use client";

import Image from "next/image";
import Link from "next/link";
import type { Service } from "../data/services";
import { useCart } from "../context/CartContext";

export default function ProductCard({ service }: { service: Service }) {
  const { addItem, hasItem } = useCart();
  const selected = hasItem(service.id);

  return (
    <article data-reveal className="card-beauty group flex flex-col overflow-hidden border border-[var(--accent-champagne)] bg-white">
      <Link href={`/servicios/${service.id}`} className="block" aria-label={`Ver ${service.name}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f0e8df]">
          <Image
            src={service.imageUrl}
            alt={service.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-rose)]">{service.category}</p>
        <Link href={`/servicios/${service.id}`} className="mt-2 font-serif text-xl text-[var(--foreground)] hover:text-[var(--accent-rose-deep)]">
          {service.name}
        </Link>
        <p className="mt-3 mb-5 line-clamp-3 text-sm leading-6 text-[#756963]">{service.description}</p>
        <div className="mt-auto flex flex-col gap-3">
          <Link href={`/servicios/${service.id}`} className="button-primary w-full justify-center">
            Ver servicio <span aria-hidden>↗</span>
          </Link>
          {selected ? (
            <Link href="/carrito" className="service-card__selection">
              Ver mi selección <span aria-hidden>→</span>
            </Link>
          ) : (
            <button type="button" onClick={() => addItem(service.id)} className="service-card__selection">
              Agregar a mi selección <span aria-hidden>＋</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
