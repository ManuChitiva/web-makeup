"use client";

import Image from "next/image";
import Link from "next/link";
import { buildServiceInquiryMessage } from "@/lib/build-order-whatsapp-message";
import { whatsappUrlWithText } from "@/lib/social";
import { useCart } from "../context/CartContext";
import { findServiceById, useCatalogServices } from "../context/CatalogContext";
import Header from "./Header";
import Footer from "./Footer";

export default function CartCheckoutView() {
  const catalog = useCatalogServices();
  const { items, removeItem, clear } = useCart();
  const services = items.flatMap((id) => {
    const service = findServiceById(catalog, id);
    return service ? [service] : [];
  });
  const message = buildServiceInquiryMessage(services.map((service) => service.name));

  return (
    <div className="site-content w-full bg-[var(--background)]">
      <Header />
      <main className="section-container pb-24 pt-32">
        <p className="eyebrow"><span /> TU SELECCIÓN</p>
        <h1 className="display-title">Hablemos de <em>tu próximo look.</em></h1>
        {services.length === 0 ? (
          <div className="mt-12 border border-[#ded2c7] bg-white px-6 py-16 text-center">
            <p className="font-serif text-2xl">Aún no has elegido servicios</p>
            <p className="mt-3 text-sm text-[#81736d]">Agrega los servicios que te interesan para preparar tu consulta.</p>
            <Link href="/servicios" className="button-primary mt-8">Explorar servicios <span aria-hidden>↗</span></Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              {services.map((service) => (
                <article key={service.id} className="flex gap-5 border-b border-[#ded2c7] bg-white p-4 sm:p-5">
                  <div className="relative h-24 w-24 shrink-0 bg-[#f0e8df] sm:h-32 sm:w-32">
                    <Image src={service.imageUrl} alt="" fill sizes="128px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/servicios/${service.id}`} className="font-serif text-lg text-[var(--foreground)] sm:text-xl">{service.name}</Link>
                    <p className="mt-2 text-sm text-[var(--accent-rose-deep)]">{service.category}</p>
                    <button type="button" onClick={() => removeItem(service.id)} className="mt-5 text-xs text-[#81736d] underline">Quitar de mi selección</button>
                  </div>
                </article>
              ))}
              <button type="button" onClick={clear} className="text-xs text-[#81736d] underline">Vaciar selección</button>
            </div>
            <aside className="h-fit border border-[#ded2c7] bg-white p-7">
              <h2 className="font-serif text-2xl">Tu consulta</h2>
              <p className="mt-5 text-sm leading-6 text-[#756963]">Cuéntanos qué fecha tienes en mente. Confirmaremos contigo disponibilidad y valor de cada servicio.</p>
              <a href={whatsappUrlWithText(message)} target="_blank" rel="noopener noreferrer" className="button-primary mt-7 flex w-full">Consultar por WhatsApp <span aria-hidden>↗</span></a>
              <p className="mt-3 text-xs leading-5 text-[#81736d]">Se abrirá WhatsApp con tu selección lista para enviar.</p>
              <Link href="/servicios" className="text-link mt-8">Seguir explorando <span aria-hidden>→</span></Link>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
