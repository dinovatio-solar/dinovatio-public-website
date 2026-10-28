"use client";

import Script from "next/script";
import { useEffect } from "react";
import { EVENTS, GA_ID, gaEnabled, trackEvent } from "@/lib/analytics";

/**
 * Carga GA4 y registra el clic en WhatsApp.
 *
 * El clic en WhatsApp se captura con un listener delegado en document en vez
 * de tocar los cinco componentes que tienen un enlace a wa.me (Navbar, Hero,
 * Footer, FinalCTA, StickyCTA). Así ninguno queda sin medir por olvido, y un
 * botón nuevo que se agregue mañana se mide solo.
 *
 * Sin NEXT_PUBLIC_GA_ID no se carga nada: en desarrollo no se ensucian los
 * datos de producción.
 */
export default function GoogleAnalytics() {
  useEffect(() => {
    if (!gaEnabled()) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a[href*='wa.me'], a[href*='api.whatsapp.com']");
      if (!link) return;

      trackEvent(EVENTS.whatsappClick, {
        // Dónde se hizo clic, para saber qué CTA funciona.
        link_text: (link.textContent ?? "").trim().slice(0, 100),
        page_path: window.location.pathname,
      });
    };

    // capture: true para registrarlo aunque el handler del componente
    // detenga la propagación.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!gaEnabled()) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
