import { socialLinks, whatsappWaNumber } from "@/lib/social";
import LogoText from "./LogoText";

const links = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/#estudio", label: "El estudio" },
  { href: "/#reservas", label: "Reservas" },
] as const;

export default function Footer() {
  return (
    <footer id="contacto" className="footer-editorial scroll-mt-24">
      <div className="section-container">
        <div className="footer-editorial__top">
          <div className="footer-editorial__brand">
            <LogoText variant="footer" />
            <p>Belleza auténtica para momentos que merecen recordarse.</p>
          </div>
          <div>
            <h2>EXPLORA</h2>
            <nav aria-label="Enlaces del pie de página">
              {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
            </nav>
          </div>
          <div>
            <h2>HABLEMOS</h2>
            <a href={`https://wa.me/${whatsappWaNumber}`} target="_blank" rel="noopener noreferrer">WhatsApp +57 320 548 9374</a>
            <a href="mailto:camilapalaciosmakeup@gmail.com">camilapalaciosmakeup@gmail.com</a>
          </div>
          <div>
            <h2>SÍGUENOS</h2>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a>
          </div>
        </div>
        <div className="footer-editorial__bottom">
          <span>© {new Date().getFullYear()} Camila Palacios Makeup Studio</span>
          <span>Hecho con intención en Colombia</span>
        </div>
      </div>
    </footer>
  );
}
