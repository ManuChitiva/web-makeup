/**
 * Mensaje tipo store-landing-page para WhatsApp con resumen numérico.
 */

export type OrderLineBrief = {
  title: string;
  quantity: number;
  unitPrice: number;
};

function formatMoney(n: number): string {
  return new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export function buildOrderWhatsAppMessage(input: {
  storeName: string;
  lines: OrderLineBrief[];
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  intro?: string;
}): string {
  const parts: string[] = [];
  if (input.intro) {
    parts.push(input.intro);
    parts.push("");
  }
  parts.push(`Hola, quiero pedir en *${input.storeName}*:`);
  parts.push("");

  for (const line of input.lines) {
    const sub = line.unitPrice * line.quantity;
    parts.push(`• ${line.quantity}× ${line.title} — $${formatMoney(sub)}`);
  }

  const total = input.lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  parts.push("");
  parts.push(`*Total aproximado:* $${formatMoney(total)}`);
  parts.push("");

  if (input.customerName?.trim()) parts.push(`Nombre: ${input.customerName.trim()}`);
  if (input.customerEmail?.trim())
    parts.push(`Correo: ${input.customerEmail.trim()}`);
  if (input.customerPhone?.trim())
    parts.push(`Tel: ${input.customerPhone.trim()}`);

  return parts.join("\n").trim();
}
