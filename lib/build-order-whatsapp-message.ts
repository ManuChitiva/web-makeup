/** Prepara una consulta de servicios sin simular una compra o un precio. */
export function buildServiceInquiryMessage(serviceNames: string[]): string {
  return [
    "Hola, quisiera consultar estos servicios de Camila Palacios Makeup Studio:",
    "",
    ...serviceNames.map((name) => `• ${name}`),
    "",
    "¿Podemos hablar de fechas, disponibilidad y valor?",
  ].join("\n");
}
