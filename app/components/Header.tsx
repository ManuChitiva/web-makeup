"use client";

import { useState } from "react";
import Link from "next/link";
import LogoText from "./LogoText";
import { useCart } from "../context/CartContext";

const navLinks = [
  { href: "/servicios", label: "Servicios" },
  { href: "/#estudio", label: "El estudio" },
  { href: "/#reservas", label: "Reservas" },
  { href: "/#contacto", label: "Contacto" },
] as const;

function SelectionIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 3h14v18l-7-4-7 4V3Z" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/#inicio" className="site-header__brand" aria-label="Camila Palacios Makeup Studio, inicio" onClick={() => setMenuOpen(false)}>
          <LogoText />
        </Link>

        <nav className="site-header__nav" aria-label="Navegación principal">
          {navLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>

        <div className="site-header__actions">
          <Link href="/#reservas" className="site-header__booking">Reservar cita <span aria-hidden>↗</span></Link>
          <button type="button" onClick={toggleCart} className="site-header__cart" aria-label={`Ver mi selección, ${totalItems} servicios`}>
            <SelectionIcon />
            {totalItems > 0 && <span className="site-header__count">{totalItems > 99 ? "99+" : totalItems}</span>}
          </button>
          <button
            type="button"
            className="site-header__menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span /> <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className="site-header__mobile" aria-label="Navegación móvil">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<span aria-hidden>↗</span></Link>
          ))}
          <Link href="/#reservas" onClick={() => setMenuOpen(false)}>Reservar cita<span aria-hidden>↗</span></Link>
        </nav>
      )}
    </header>
  );
}
