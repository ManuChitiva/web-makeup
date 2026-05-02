/** Perfiles públicos — pie de página y Schema.org sameAs */
export const socialLinks = {
  instagram: "https://www.instagram.com/camilapalaciosmakeup/",
  facebook: "https://www.facebook.com/CamilaPalaciosMakeup/",
} as const;

/** Número internacional sin + para `wa.me` (reservas y contacto). */
export const whatsappWaNumber = "573205489374";

export function whatsappUrlWithText(message: string): string {
  return `https://wa.me/${whatsappWaNumber}?text=${encodeURIComponent(message)}`;
}
