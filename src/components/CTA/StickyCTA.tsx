"use client";

import { PhoneCall, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuoteModal } from "@/components/Quote/QuoteModalProvider";
import { useRegion } from "@/components/Region/RegionProvider";

/** Aparece luego de un pequeño scroll para no tapar el Hero (solo mobile) */
export default function StickyCTA() {
  const [show, setShow] = useState(false);
  const { open } = useQuoteModal();
  const { current } = useRegion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  // Si tu número de WhatsApp puede venir con +, espacios, etc., limpiamos:
  const wa = String(current?.whatsapp ?? "").replace(/\D/g, "");

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
      <div className="mx-auto max-w-6xl px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {/* Contenedor con contraste en claro y oscuro */}
        <div
          className="
            rounded-2xl shadow-xl border
            bg-white/90 dark:bg-zinc-900/70
            backdrop-blur-md supports-[backdrop-filter]:bg-white/80
            border-black/10 dark:border-white/10
            p-2
          "
        >
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={open}
              className="
                inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3
                text-white font-semibold shadow
                bg-brand-green bg-emerald-600 hover:bg-emerald-700
                focus:outline-none focus:ring-2 focus:ring-emerald-400/60
              "
              aria-label="Abrir formulario de cotización"
            >
              <PhoneCall size={18} /> Cotizar
            </button>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href={wa ? `https://wa.me/${wa}` : "#"}
              className="
                inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3
                text-white font-semibold shadow
                bg-brand-blue bg-sky-600 hover:bg-sky-700
                focus:outline-none focus:ring-2 focus:ring-sky-400/60
              "
              aria-label="Chatear por WhatsApp"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
