// src/components/SavingsCarousel.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuoteModal } from "@/components/Quote/QuoteModalProvider";

type Tipo = "residencial" | "industrialCampo";

type Entry = {
  kW: number;     // Potencia del sistema (kWac)
  m2: number;     // Superficie mínima estimada (m²)
  ahorro: number; // % de ahorro típico
};

type Matrix = Record<Tipo, Entry[]>;

/** TODO: Reemplaza con tu matriz real del documento */
const MATRIX: Matrix = {
  residencial: [
    { kW: 3, m2: 16, ahorro: 65 },
    { kW: 4, m2: 22, ahorro: 67 },
    { kW: 5, m2: 27, ahorro: 69 },
    { kW: 6, m2: 32, ahorro: 70 },
    { kW: 8, m2: 43, ahorro: 71 },
    { kW: 10, m2: 54, ahorro: 72 },
  ],
  industrialCampo: [
    { kW: 10, m2: 54, ahorro: 86 },
    { kW: 30, m2: 161, ahorro: 90 },
    { kW: 50, m2: 269, ahorro: 92 },
    { kW: 100, m2: 538, ahorro: 94 },
    { kW: 200, m2: 1076, ahorro: 95 },
    { kW: 300, m2: 1614, ahorro: 96 },
  ],
};

const COPY: Record<Tipo, { title: string; note: string }> = {
  residencial: {
    title: "¿Cuánto puedes ahorrar? (Residencial)",
    note: "Escenario base: hogar típico. El ahorro real depende de superficie disponible, orientación y sombreado.",
  },
  industrialCampo: {
    title: "¿Cuánto puedes ahorrar? (Industrial y Campo)",
    note: "Escenario base: operación con alta demanda. El ahorro real depende de superficie, orientación y perfil de carga.",
  },
};

export default function SavingsCarousel() {
  const [tipo, setTipo] = useState<Tipo>("residencial");
  const { open } = useQuoteModal();
  const entries = MATRIX[tipo];

  const { minPct, maxPct } = useMemo(() => {
    const p = entries.map((e) => e.ahorro);
    return { minPct: Math.min(...p), maxPct: Math.max(...p) };
  }, [entries]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollByCards = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 300; // aprox ancho card en desktop
    el.scrollBy({ left: (dir === "next" ? 1 : -1) * (cardWidth + 16) * 2, behavior: "smooth" });
  };

  return (
    <section className="py-16 px-4 w-full bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl">
        {/* Selector / segmented control */}
        <div
          className="inline-flex rounded-xl p-1 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md"
          role="tablist"
          aria-label="Tipo de instalación"
        >
          <SegButton active={tipo === "residencial"} onClick={() => setTipo("residencial")}>
            Residencial
          </SegButton>
          <SegButton active={tipo === "industrialCampo"} onClick={() => setTipo("industrialCampo")}>
            Industrial y Campo
          </SegButton>
        </div>

        {/* Header */}
        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {COPY[tipo].title}
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Rango típico: {minPct}–{maxPct}% (según potencia y m²).
            </p>
          </div>

          {/* Arrows (desktop) */}
          <div className="hidden md:flex gap-2">
            <IconButton ariaLabel="Desplazar a la izquierda" onClick={() => scrollByCards("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </IconButton>
            <IconButton ariaLabel="Desplazar a la derecha" onClick={() => scrollByCards("next")}>
              <ChevronRight className="h-4 w-4" />
            </IconButton>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mt-4">
          {/* edge fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent rounded-l-2xl" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent rounded-r-2xl" />

          <div
            ref={scrollRef}
            className="
              flex overflow-x-auto gap-4 pb-4
              snap-x snap-mandatory
              [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            "
            role="region"
            aria-label="Opciones de tamaño por potencia"
          >
            {entries.map((e, i) => (
              <motion.div
                key={`${tipo}-${e.kW}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                className="snap-start shrink-0 w-[260px] sm:w-[300px]"
              >
                <Card
                  kW={e.kW}
                  m2={e.m2}
                  ahorro={e.ahorro}
                  tipo={tipo}
                  onQuote={() => open()}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nota / disclaimers */}
        <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400">
          {COPY[tipo].note} Para un cálculo exacto, solicita una evaluación técnica.
        </p>
      </div>
    </section>
  );
}

/* ----------------------------- Subcomponentes ----------------------------- */

function Card({
  kW,
  m2,
  ahorro,
  tipo,
  onQuote,
}: {
  kW: number;
  m2: number;
  ahorro: number;
  tipo: Tipo;
  onQuote: () => void;
}) {
  const title = `${kW} kWac`;
  const subtitle =
    tipo === "residencial"
      ? "Vivienda típica, consumo estable."
      : "Operación con mayor demanda energética.";

  return (
    <div
      className="
        h-full rounded-2xl border border-black/10 dark:border-white/10
        bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition
        flex flex-col
      "
    >
      <div className="p-5 flex-1 grid grid-rows-[auto_auto_1fr] gap-3">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">{subtitle}</p>
        </div>

        <div className="flex items-center gap-4">
          <CircleGauge percent={ahorro} />
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-green-600 dark:text-green-500">
              ≈ {ahorro}%
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Ahorro anual típico</p>
          </div>
        </div>

        <div className="mt-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/5 dark:border-white/5 p-4">
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <dt className="text-neutral-500 dark:text-neutral-400">Superficie mínima</dt>
              <dd className="font-medium text-neutral-900 dark:text-neutral-100">{m2} m²</dd>
            </div>
            <div>
              <dt className="text-neutral-500 dark:text-neutral-400">Potencia</dt>
              <dd className="font-medium text-neutral-900 dark:text-neutral-100">{kW} kWac</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="p-5 pt-0">
        <button
          type="button"
          onClick={onQuote}
          className="
            w-full inline-flex items-center justify-center gap-2
            px-5 py-3 rounded-lg text-sm font-medium
            bg-green-600 hover:bg-green-700 text-white
            focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60
            transition-colors shadow-sm
          "
        >
          Solicitar propuesta
        </button>
        <p className="mt-2 text-[11px] leading-4 text-neutral-500 dark:text-neutral-400">
          Cifras referenciales. El resultado final depende de ubicación, orientación y perfil de consumo.
        </p>
      </div>
    </div>
  );
}

function CircleGauge({ percent }: { percent: number }) {
  const size = 80;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, percent));
  const filled = (clamped / 100) * C;

  return (
    <div className="relative h-20 w-20" aria-label={`Ahorro ${clamped}%`}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="block text-green-600 dark:text-green-500"
        role="img"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="currentColor"
          opacity={0.15}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${C - filled}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {clamped}%
        </span>
      </div>
    </div>
  );
}

function SegButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={[
        "px-4 sm:px-5 py-2 rounded-lg text-sm font-medium transition",
        active
          ? "bg-green-600 text-white shadow"
          : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function IconButton({
  ariaLabel,
  onClick,
  children,
}: {
  ariaLabel: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="
        inline-flex items-center justify-center
        h-9 w-9 rounded-lg border border-black/10 dark:border-white/10
        bg-white hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800
        text-neutral-700 dark:text-neutral-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60
        transition
      "
    >
      {children}
    </button>
  );
}
