import { socialLinks, whatsappWaNumber } from "@/lib/social";
import LogoText from "./LogoText";

const footerNav = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#reservas", label: "Reservas" },
  { href: "/productos", label: "Productos" },
] as const;

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="scroll-mt-24 shrink-0 border-t border-[var(--accent-champagne)]/70 bg-gradient-to-b from-[var(--accent-champagne)]/35 to-[var(--background)]"
    >
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pb-14 md:pt-20">
        <div className="grid gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <LogoText variant="footer" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[var(--foreground)]/78">
              Maquillaje profesional para eventos, editorial y ocasiones
              especiales. Asesoría personalizada y productos seleccionados.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent-rose-deep)]/15 bg-[var(--background)]/80 text-[var(--accent-rose-deep)] shadow-sm transition hover:border-[var(--accent-rose)]/40 hover:text-[var(--accent-rose)]"
                aria-label="Instagram de Camila Palacios Makeup (se abre en una pestaña nueva)"
              >
                <InstagramIcon />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent-rose-deep)]/15 bg-[var(--background)]/80 text-[var(--accent-rose-deep)] shadow-sm transition hover:border-[var(--accent-rose)]/40 hover:text-[var(--accent-rose)]"
                aria-label="Facebook CamilaPalaciosMakeup (se abre en una pestaña nueva)"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="font-serif text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-rose-deep)]">
                Sitio
              </h2>
              <nav className="mt-5 flex flex-col gap-3" aria-label="Pie de página">
                {footerNav.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="inline-flex text-sm font-medium text-[var(--foreground)]/80 transition hover:text-[var(--accent-rose-deep)]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <h2 className="font-serif text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-rose-deep)]">
                Contacto
              </h2>
              <ul className="mt-5 flex flex-col gap-4">
                <li>
                  <a
                    href="mailto:camilapalaciosmakeup@gmail.com"
                    className="group flex gap-3 text-sm font-medium text-[var(--foreground)]/85 transition hover:text-[var(--accent-rose-deep)]"
                  >
                    <MailIcon className="mt-0.5 shrink-0 text-[var(--accent-mauve)] group-hover:text-[var(--accent-rose)]" />
                    <span className="break-all leading-snug underline-offset-4 group-hover:underline">
                      camilapalaciosmakeup@gmail.com
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${whatsappWaNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-3 text-sm font-medium text-[var(--foreground)]/85 transition hover:text-[var(--accent-rose-deep)]"
                  >
                    <PhoneIcon className="mt-0.5 shrink-0 text-[var(--accent-mauve)] group-hover:text-[var(--accent-rose)]" />
                    <span className="leading-snug underline-offset-4 group-hover:underline">
                      WhatsApp +57&nbsp;320&nbsp;548&nbsp;9374
                    </span>
                  </a>
                </li>
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-[var(--foreground)]/55">
                Respuesta habitual en menos de un día hábil.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-serif text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-rose-deep)]">
              Agenda
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[var(--foreground)]/75">
              Reserva desde la web o escríbeme por WhatsApp con la fecha del
              evento y la ciudad para coordinar disponibilidad.
            </p>
            <a
              href="/#reservas"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[var(--accent-rose-deep)] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[var(--accent-rose)] hover:shadow-lg"
            >
              Ir a reservas
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-[var(--accent-champagne)]/80 pt-8 md:flex-row md:justify-between md:gap-6">
          <p className="text-center text-xs text-[var(--foreground)]/55 md:text-left">
            © {new Date().getFullYear()} Camila Palacios Makeup Studio · Todos los
            derechos reservados.
          </p>
          <p className="text-center text-[11px] tracking-wide text-[var(--foreground)]/45 md:text-right">
            Maquillaje profesional y tienda · Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
