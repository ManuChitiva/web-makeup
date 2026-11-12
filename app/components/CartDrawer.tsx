"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { findServiceById, useCatalogServices } from "../context/CatalogContext";

export default function CartDrawer() {
  const catalog = useCatalogServices();
  const { items, totalItems, isOpen, closeCart, removeItem } = useCart();
  if (!isOpen) return null;
  const services = items.flatMap((id) => {
    const service = findServiceById(catalog, id);
    return service ? [service] : [];
  });

  return (
    <div className="fixed inset-0 z-[60]">
      <button type="button" className="absolute inset-0 w-full bg-black/40" onClick={closeCart} aria-label="Cerrar selección" />
      <aside className="animate-drawer-in absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-[var(--background)] shadow-2xl" role="dialog" aria-modal="true" aria-label="Mi selección de servicios">
        <div className="flex items-center justify-between border-b border-[#ded2c7] px-6 py-5">
          <h2 className="font-serif text-2xl text-[var(--foreground)]">Mi selección</h2>
          <button type="button" onClick={closeCart} className="text-2xl text-[var(--accent-rose-deep)]" aria-label="Cerrar selección">×</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {services.length ? (
            <ul className="space-y-5">
              {services.map((service) => (
                <li key={service.id} className="flex gap-4 border-b border-[#e6dcd3] pb-5">
                  <div className="relative h-20 w-20 shrink-0 bg-[#f0e8df]">
                    <Image src={service.imageUrl} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/servicios/${service.id}`} onClick={closeCart} className="font-serif text-lg leading-6">{service.name}</Link>
                    <p className="mt-1 text-xs text-[var(--accent-rose-deep)]">{service.category}</p>
                  </div>
                  <button type="button" onClick={() => removeItem(service.id)} className="self-start text-xl text-[#8b7c75]" aria-label={`Quitar ${service.name}`}>×</button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-16 text-center">
              <p className="font-serif text-2xl">Aún no has elegido servicios</p>
              <p className="mt-3 text-sm text-[#81736d]">Explora las opciones y guarda las que te interesan.</p>
              <Link href="/servicios" onClick={closeCart} className="button-outline mt-7">Ver servicios <span aria-hidden>↗</span></Link>
            </div>
          )}
        </div>
        {services.length > 0 && (
          <div className="border-t border-[#ded2c7] px-6 py-6">
            <p className="text-sm text-[#756963]">{totalItems} servicio{totalItems === 1 ? "" : "s"} en tu selección</p>
            <Link href="/carrito" onClick={closeCart} className="button-primary mt-5 flex w-full">Consultar selección <span aria-hidden>↗</span></Link>
          </div>
        )}
      </aside>
    </div>
  );
}
