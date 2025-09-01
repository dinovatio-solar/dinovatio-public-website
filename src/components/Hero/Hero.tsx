"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import hero1 from "@public/assets/hero-1.jpg";
import hero2 from "@public/assets/hero-2.jpg";
import hero3 from "@public/assets/hero-3.jpg";

import { useQuoteModal } from "@/components/Quote/QuoteModalProvider";
import { useRegion } from "@/components/Region/RegionProvider";

// Elimina todo lo que no sea dígito → formato requerido por wa.me
const normalizePhone = (num: string) => num.replace(/\D/g, "");

export default function Hero() {
  const { open: openQuote } = useQuoteModal();
  const { current } = useRegion();

  const waNumber = normalizePhone(current.whatsapp || "");
  const waHref = waNumber ? `https://wa.me/${waNumber}` : "#";

  const images = [hero1, hero2, hero3] as const;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-avance cada 3s; pausa al hacer hover o si la pestaña está oculta
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    if (paused) return () => document.removeEventListener("visibilitychange", onVisibility);

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paused, images.length]);

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  return (
    <section
      className="relative w-full h-[90vh] min-h-[520px] overflow-hidden flex flex-col justify-center items-center text-center px-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt=""
            fill
            priority={i === 0}
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            sizes="100vw"
          />
        ))}
      </div>

      {/* Overlay oscuro */}
      <div className="bg-black/40 absolute inset-0" />

      {/* Contenido */}
      <div className="relative z-10 text-white max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold">
          Ahorra energía y dinero con paneles fotovoltaicos
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Instalación residencial, industrial, campo y asesoría experta.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          {/* Cotizar */}
          <button
            onClick={openQuote}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
          >
            Cotiza tu sistema ahora
          </button>

          {/* WhatsApp */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-center"
          >
            Contacta por WhatsApp
          </a>
        </div>
      </div>

      {/* Controles izquierda/derecha */}
      <button
        aria-label="Anterior"
        onClick={goPrev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 hover:bg-black/60 p-2 backdrop-blur border border-white/10 text-white"
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Anterior</span>
      </button>
      <button
        aria-label="Siguiente"
        onClick={goNext}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 hover:bg-black/60 p-2 backdrop-blur border border-white/10 text-white"
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Siguiente</span>
      </button>

      {/* Indicadores (dots) */}
      <div className="absolute bottom-6 inset-x-0 z-10 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === index ? "bg-white w-6" : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
