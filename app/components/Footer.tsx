import LogoText from "./LogoText";

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="scroll-mt-24 shrink-0 border-t border-[var(--accent-champagne)]/50 bg-[var(--accent-rose-deep)]/5 py-16 px-6"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <LogoText variant="footer" />
            <p className="mt-3 max-w-sm text-sm text-[var(--foreground)]/70">
              Maquillaje profesional para que brilles en cada ocasión.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 md:items-end">
            <p className="text-sm font-medium text-[var(--foreground)]">
              Contacto
            </p>
            <div className="flex flex-col items-center gap-1 text-sm text-[var(--foreground)]/70 md:items-end">
              <a
                href="mailto:camilapalaciosmakeup@gmail.com"
                className="hover:text-[var(--accent-rose)]"
              >
                camilapalaciosmakeup@gmail.com
              </a>
              <a
                href="https://wa.me/573205489374"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent-rose)]"
              >
                WhatsApp: +57 320 5489374
              </a>
            </div>
            <div className="flex gap-4 mt-2">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-champagne)]/50 text-[var(--accent-rose-deep)] transition hover:bg-[var(--accent-rose)]/20"
              >
                <span className="text-lg">📷</span>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-champagne)]/50 text-[var(--accent-rose-deep)] transition hover:bg-[var(--accent-rose)]/20"
              >
                <span className="text-lg">👍</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-[var(--accent-champagne)]/30 pt-8 text-center text-sm text-[var(--foreground)]/60">
          © {new Date().getFullYear()} CamilaPalaciosMakeup. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
