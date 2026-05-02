"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "../data/products";
import ProductCard from "./ProductCard";

const ITEMS_PER_PAGE = 8;

type ProductCatalogProps = { products: Product[] };

type OfferFilter = "all" | "service" | "product";
type SortKey = "default" | "name-asc" | "name-desc" | "price-asc" | "price-desc";

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [offer, setOffer] = useState<OfferFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [page, setPage] = useState(0);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return [...set].sort((a, b) => a.localeCompare(b, "es"));
  }, [products]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    let list = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (offer === "service" && !p.isService) return false;
      if (offer === "product" && p.isService) return false;
      if (!q) return true;
      const inName = normalize(p.name).includes(q);
      const inDesc = p.description ? normalize(p.description).includes(q) : false;
      return inName || inDesc;
    });

    list = [...list];
    switch (sortKey) {
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name, "es"));
        break;
      case "name-desc":
        list.sort((a, b) => b.name.localeCompare(a.name, "es"));
        break;
      case "price-asc":
        list.sort((a, b) => a.priceNumber - b.priceNumber);
        break;
      case "price-desc":
        list.sort((a, b) => b.priceNumber - a.priceNumber);
        break;
      default:
        break;
    }
    return list;
  }, [products, query, category, offer, sortKey]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  useEffect(() => {
    setPage(0);
  }, [query, category, offer, sortKey]);

  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(0, pageCount - 1)));
  }, [pageCount]);

  const safePage = Math.min(page, pageCount - 1);
  const pageItems = useMemo(() => {
    const start = safePage * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, safePage]);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-16 pt-6 md:pb-24 md:pt-10">
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-rose)]">
          Tienda · catálogo
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold text-[var(--accent-rose-deep)] sm:text-4xl">
          Productos y servicios
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[var(--foreground)]/72">
          Explora el listado completo: búsqueda, categoría, tipo y orden por
          precio o nombre.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-[var(--accent-champagne)]/70 bg-[var(--accent-champagne)]/10 p-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-4 md:p-6">
        <label className="flex min-w-0 flex-1 flex-col gap-1.5 sm:min-w-[12rem]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-rose-deep)]/85">
            Buscar
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nombre o descripción…"
            autoComplete="off"
            className="rounded-xl border border-[var(--accent-champagne)] bg-white px-3 py-2.5 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent-rose)] focus:ring-2 focus:ring-[var(--accent-rose)]/25"
          />
        </label>
        <label className="flex min-w-[10rem] flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-rose-deep)]/85">
            Categoría
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-[var(--accent-champagne)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--accent-rose)] focus:ring-2 focus:ring-[var(--accent-rose)]/25"
          >
            <option value="all">Todas</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-[10rem] flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-rose-deep)]/85">
            Tipo
          </span>
          <select
            value={offer}
            onChange={(e) => setOffer(e.target.value as OfferFilter)}
            className="rounded-xl border border-[var(--accent-champagne)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--accent-rose)] focus:ring-2 focus:ring-[var(--accent-rose)]/25"
          >
            <option value="all">Todo</option>
            <option value="service">Servicios</option>
            <option value="product">Productos</option>
          </select>
        </label>
        <label className="flex min-w-[10rem] flex-col gap-1.5 sm:min-w-[12rem]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-rose-deep)]/85">
            Ordenar
          </span>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="rounded-xl border border-[var(--accent-champagne)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--accent-rose)] focus:ring-2 focus:ring-[var(--accent-rose)]/25"
          >
            <option value="default">Por defecto</option>
            <option value="name-asc">Nombre A → Z</option>
            <option value="name-desc">Nombre Z → A</option>
            <option value="price-asc">Precio menor primero</option>
            <option value="price-desc">Precio mayor primero</option>
          </select>
        </label>
      </div>

      <p className="mt-6 text-center text-sm text-[var(--foreground)]/65">
        {filtered.length === 0
          ? "No hay coincidencias con estos filtros."
          : `${filtered.length} resultado${filtered.length === 1 ? "" : "s"}`}
      </p>

      {filtered.length > 0 && (
        <>
          <div
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-x-8 md:gap-y-10"
            role="list"
            aria-label={`Página ${safePage + 1} de ${pageCount}`}
          >
            {pageItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {pageCount > 1 && (
            <nav
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              aria-label="Paginación del catálogo"
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage(Math.max(0, safePage - 1))}
                  disabled={safePage === 0}
                  className="rounded-full border-2 border-[var(--accent-rose-deep)]/45 px-4 py-2 text-sm font-medium text-[var(--accent-rose-deep)] transition hover:bg-[var(--accent-champagne)]/35 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPage(Math.min(pageCount - 1, safePage + 1))
                  }
                  disabled={safePage >= pageCount - 1}
                  className="rounded-full border-2 border-[var(--accent-rose-deep)]/45 px-4 py-2 text-sm font-medium text-[var(--accent-rose-deep)] transition hover:bg-[var(--accent-champagne)]/35 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Siguiente
                </button>
              </div>
              <p className="text-sm text-[var(--foreground)]/65">
                Página {safePage + 1} de {pageCount}
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {Array.from({ length: pageCount }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    aria-label={`Ir a la página ${i + 1}`}
                    aria-current={i === safePage ? "page" : undefined}
                    className={
                      i === safePage
                        ? "h-2.5 w-6 rounded-full bg-[var(--accent-rose-deep)]"
                        : "h-2.5 w-2.5 rounded-full bg-[var(--accent-champagne)]/70 transition hover:bg-[var(--accent-rose)]/50"
                    }
                  />
                ))}
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
