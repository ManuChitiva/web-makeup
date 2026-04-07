"use client";

import { useState } from "react";

const serviceTypes = [
  "Maquillaje social",
  "Novias",
  "Editorial / Fotografía",
  "Clase o asesoría",
];

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
        className="scroll-mt-24 py-20 px-6"
      >
        <div className="mx-auto max-w-xl rounded-2xl border border-[var(--accent-champagne)] bg-[var(--accent-champagne)]/20 p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-rose)]/20 text-3xl">
            ✓
          </div>
          <h3 className="mt-4 font-serif text-2xl font-semibold text-[var(--accent-rose-deep)]">
            ¡Solicitud enviada!
          </h3>
          <p className="mt-2 text-[var(--foreground)]/70">
            Te contactaremos pronto para confirmar tu reserva. Revisa tu correo
            y teléfono.
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
    <section
      id="reservas"
      className="scroll-mt-24 border-y border-[var(--accent-champagne)]/50 py-20 px-6"
    >
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-[var(--accent-rose-deep)] sm:text-4xl">
            Agendar reserva
          </h2>
          <p className="mt-3 text-[var(--foreground)]/70">
            Completa el formulario y te confirmamos disponibilidad.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-5 rounded-2xl border border-[var(--accent-champagne)] bg-[var(--background)] p-6 shadow-sm sm:p-8"
        >
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
                placeholder="+56 9 1234 5678"
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
            className="mt-2 rounded-full bg-[var(--accent-rose-deep)] py-3.5 font-medium text-white transition hover:bg-[var(--accent-rose)]"
          >
            Enviar solicitud de reserva
          </button>
        </form>
      </div>
    </section>
  );
}
