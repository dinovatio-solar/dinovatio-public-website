"use client";
import { useQuoteModal } from "@/components/Quote/QuoteModalProvider";
import { useRegion } from "@/components/Region/RegionProvider";
import { MessageCircle, PhoneCall } from "lucide-react";

export default function FinalCTA() {
  const { open } = useQuoteModal();
  const { current } = useRegion();

  return (
    <section
      id="cotizar"
      aria-labelledby="final-cta-title"
      className="relative w-full overflow-hidden"
    >
      {/* fondo con gradiente + patrón sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-sky-500 to-blue-600 opacity-90 dark:opacity-95" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 text-center text-white">
        <h2 id="final-cta-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          ¿Listo para instalar paneles y ahorrar?
        </h2>
        <p className="mt-3 text-base sm:text-lg text-white/90">
          Te asesoramos y diseñamos el sistema ideal para tu hogar o industria.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={open}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3
                       bg-white text-neutral-900 font-semibold hover:bg-neutral-100
                       focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <PhoneCall size={18} />
            Cotizar ahora
          </button>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://wa.me/${current.whatsapp}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3
                       bg-neutral-900/20 text-white ring-1 ring-white/40 hover:bg-neutral-900/30
                       focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <MessageCircle size={18} />
            Hablemos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
