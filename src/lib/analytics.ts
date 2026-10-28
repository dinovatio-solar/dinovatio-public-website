/**
 * Capa fina sobre gtag. Centraliza los nombres de evento para que no se
 * escriban a mano en cada componente: en GA4 un evento mal tipeado no da
 * error, simplemente aparece como un evento distinto y se pierde.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const gaEnabled = () => GA_ID.length > 0;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Eventos del sitio. Los tres primeros son las conversiones reales:
 * son las únicas formas que tiene alguien de dejar un contacto.
 */
export const EVENTS = {
  /** Clic en cualquier enlace a WhatsApp. Canal principal en Argentina. */
  whatsappClick: "whatsapp_click",
  /** Apertura del modal de cotización. Es intención, todavía no es lead. */
  quoteOpen: "quote_open",
  /** Envío exitoso del formulario de cotización. Este es el lead. */
  quoteSubmit: "generate_lead",
  /** Suscripción al newsletter. */
  newsletterSubmit: "newsletter_signup",
  /** Uso del estimador de ahorro. */
  calculatorUse: "calculator_use",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

export function trackEvent(name: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
