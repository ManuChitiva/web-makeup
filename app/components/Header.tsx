"use client";

import { useState } from "react";
import LogoText from "./LogoText";
import { useCart } from "../context/CartContext";

/** Rutas absolutas a la home + ancla (funcionan desde /productos/[id] u otras rutas) */
const navLinks = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#reservas", label: "Reservar" },
  { href: "/productos", label: "Productos" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--accent-champagne)]/50 bg-[var(--background)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/#inicio" className="flex items-center gap-2" aria-label="Camila Palacios Makeup Studio - Inicio">
          <LogoText variant="header" />
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--foreground)]/80 transition hover:text-[var(--accent-rose)]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={toggleCart}
            className="relative rounded-full p-2 text-[var(--accent-rose-deep)] transition hover:bg-[var(--accent-champagne)]/50 hover:text-[var(--accent-rose)]"
            aria-label="Ver carrito"
          >
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-rose)] text-[10px] font-bold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleCart}
          className="relative rounded-full p-2 text-[var(--accent-rose-deep)] md:hidden"
          aria-label="Ver carrito"
        >
          <span className="text-xl">🛒</span>
          {totalItems > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent-rose)] text-[9px] font-bold text-white">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </button>
        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span
            className={`block h-0.5 w-6 bg-[var(--accent-rose-deep)] transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-[var(--accent-rose-deep)] transition ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-[var(--accent-rose-deep)] transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-[var(--accent-champagne)]/50 bg-[var(--background)] px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block font-medium text-[var(--foreground)]/80 hover:text-[var(--accent-rose)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
