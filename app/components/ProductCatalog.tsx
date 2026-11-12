"use client";

import { useMemo, useState } from "react";
import type { Service } from "../data/services";
import ProductCard from "./ProductCard";

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function ProductCatalog({ services }: { services: Service[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const search = normalize(query.trim());
    return search
      ? services.filter((service) => normalize(`${service.name} ${service.category} ${service.description}`).includes(search))
      : services;
  }, [services, query]);

  return (
    <div className="section-container pb-20 pt-12 md:pb-28 md:pt-20">
      <div className="max-w-3xl" data-reveal>
        <p className="eyebrow"><span /> NUESTROS SERVICIOS</p>
        <h1 className="display-title">Belleza para <em>tu momento.</em></h1>
        <p className="mt-5 text-base leading-7 text-[#6f625d]">Explora nuestros servicios de maquillaje y elige la experiencia que mejor acompaña tu historia.</p>
      </div>
      <label data-reveal className="mt-12 flex max-w-md flex-col gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-[var(--accent-rose-deep)]">
        Buscar servicio
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Novias, eventos, clases..." className="h-11 border border-[#d8c8bb] bg-white px-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[var(--accent-rose)]" />
      </label>
      <p className="mt-6 text-sm text-[#81736d]">{filtered.length} servicio{filtered.length === 1 ? "" : "s"}</p>
      {filtered.length ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((service) => <ProductCard key={service.id} service={service} />)}
        </div>
      ) : <p className="py-16 text-center text-[#81736d]">No encontramos servicios que coincidan con tu búsqueda.</p>}
      <p className="mt-10 text-center text-xs text-[#81736d]">Fotografías de referencia.</p>
    </div>
  );
}
