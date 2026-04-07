export const WHATSAPP_NUMBER = "918921248055";

export function generateWhatsAppLink(message: string): string {
  // Generate WhatsApp link ensuring correct URL encoding
  const formattedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${formattedMessage}`;
}

export function trackWhatsAppClick(location: string) {
  // Basic analytics event tracking
  console.log(`WhatsApp click tracked from: ${location}`);
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: "whatsapp_click",
      location: location,
    });
  }
}
