"use client";

import { useState } from "react";
import { whatsappUrlWithText } from "@/lib/social";
import { CATALOG_SERVICES } from "../data/services";

const serviceTypes = CATALOG_SERVICES.map((service) => service.name);

function formatDateEs(iso: string): string {
  if (!iso) return "—";
  try {
    const d = new Date(`${iso}T12:00:00`);
    return d.toLocaleDateString("es-CO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function buildReservationMessage(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  message: string;
}): string {
  const from =
    typeof window !== "undefined" && window.location.host
      ? window.location.host
      : "la web";
  const lines = [
    "¡Hola! Quiero agendar una reserva desde la web 🌸",
    "",
    `*Nombre:* ${data.name.trim()}`,
    `*Teléfono:* ${data.phone.trim()}`,
    `*Correo:* ${data.email.trim()}`,
    `*Fecha preferida:* ${formatDateEs(data.date)}`,
    `*Tipo de servicio:* ${data.service}`,
  ];
  const extra = data.message.trim();
  if (extra) {
    lines.push("", "*Mensaje / detalles:*", extra);
  }
  lines.push("", `_Enviado desde ${from}_`);
  return lines.join("\n");
}

export default function BookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = buildReservationMessage(formData);
    const url = whatsappUrlWithText(text);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.assign(url);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <section
        id="reservas"
        className="booking-editorial scroll-mt-24"
      >
        <div className="card-beauty mx-auto max-w-xl rounded-2xl border border-[var(--accent-champagne)] bg-[var(--accent-champagne)]/25 p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-rose)]/20 text-3xl">
            ✓
          </div>
          <h3 className="mt-4 font-serif text-2xl font-semibold text-[var(--accent-rose-deep)]">
            ¡Abre WhatsApp y envía el mensaje!
          </h3>
          <p className="mt-2 text-[var(--foreground)]/70">
            Se abrió WhatsApp con tu solicitud ya redactada. Solo confirma el
            envío; te responderemos ahí para coordinar disponibilidad.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 text-sm font-medium text-[var(--accent-rose)] underline hover:no-underline"
          >
            Hacer otra reserva
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="reservas" className="booking-editorial scroll-mt-24" aria-labelledby="booking-title">
      <div className="section-container booking-editorial__grid">
        <div className="booking-editorial__intro" data-reveal>
          <p className="eyebrow"><span /> HAGÁMOSLO REALIDAD</p>
          <h2 id="booking-title" className="display-title">Tu próximo look <em>comienza aquí.</em></h2>
          <p>Cuéntame qué tienes en mente y encontraremos la propuesta ideal para tu ocasión.</p>
          <div className="booking-editorial__steps">
            <div><span>01</span><p>Cuéntame sobre tu evento y la fecha que tienes en mente.</p></div>
            <div><span>02</span><p>Te responderé por WhatsApp para coordinar los detalles.</p></div>
          </div>
          <p className="booking-editorial__note">Cada cita comienza con una conversación.</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="booking-editorial__form flex flex-col gap-5"
          data-reveal
        >
          <div className="booking-editorial__form-heading">
            <span>FORMULARIO DE RESERVA</span>
            <p>Completa tus datos y prepara tu mensaje para WhatsApp.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-[var(--foreground)]">
                Nombre completo
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="rounded-lg border border-[var(--accent-champagne)] bg-white px-4 py-2.5 text-[var(--foreground)] outline-none focus:border-[var(--accent-rose)] focus:ring-2 focus:ring-[var(--accent-rose)]/20"
                placeholder="Tu nombre"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-[var(--foreground)]">
                Teléfono
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="rounded-lg border border-[var(--accent-champagne)] bg-white px-4 py-2.5 text-[var(--foreground)] outline-none focus:border-[var(--accent-rose)] focus:ring-2 focus:ring-[var(--accent-rose)]/20"
                placeholder="+57 320 123 4567"
              />
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-[var(--foreground)]">
              Correo electrónico
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded-lg border border-[var(--accent-champagne)] bg-white px-4 py-2.5 text-[var(--foreground)] outline-none focus:border-[var(--accent-rose)] focus:ring-2 focus:ring-[var(--accent-rose)]/20"
              placeholder="tu@email.com"
            />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-[var(--foreground)]">
                Fecha preferida
              </span>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="rounded-lg border border-[var(--accent-champagne)] bg-white px-4 py-2.5 text-[var(--foreground)] outline-none focus:border-[var(--accent-rose)] focus:ring-2 focus:ring-[var(--accent-rose)]/20"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-[var(--foreground)]">
                Tipo de servicio
              </span>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="rounded-lg border border-[var(--accent-champagne)] bg-white px-4 py-2.5 text-[var(--foreground)] outline-none focus:border-[var(--accent-rose)] focus:ring-2 focus:ring-[var(--accent-rose)]/20"
              >
                <option value="">Selecciona...</option>
                {serviceTypes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-[var(--foreground)]">
              Mensaje (opcional)
            </span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="rounded-lg border border-[var(--accent-champagne)] bg-white px-4 py-2.5 text-[var(--foreground)] outline-none focus:border-[var(--accent-rose)] focus:ring-2 focus:ring-[var(--accent-rose)]/20"
              placeholder="Detalles adicionales, lugar del evento, etc."
            />
          </label>
          <button
            type="submit"
            className="button-primary mt-2 w-full justify-center"
          >
            Continuar en WhatsApp <span aria-hidden>↗</span>
          </button>
        </form>
      </div>
    </section>
  );
}
