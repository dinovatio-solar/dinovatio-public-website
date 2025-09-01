// src/components/SavingsDiscreteSlider.tsx
"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuoteModal } from "@/components/Quote/QuoteModalProvider";

type Tipo = "residencial" | "industrialCampo";

type Entry = {
  kW: number;     // Potencia del sistema (kWac)
  m2: number;     // Superficie mínima estimada (m²)
  ahorro: number; // % ahorro típico
};

type Matrix = Record<Tipo, Entry[]>;

/** TODO: Reemplaza con tu matriz real */
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

export default function SavingsDiscreteSlider() {
  const [tipo, setTipo] = useState<Tipo>("residencial");
  const [idx, setIdx] = useState(0);
  const { open } = useQuoteModal();

  const entries = MATRIX[tipo];
  const selected = entries[Math.min(Math.max(idx, 0), entries.length - 1)];

  const { minPct, maxPct } = useMemo(() => {
    const p = entries.map((e) => e.ahorro);
    return { minPct: Math.min(...p), maxPct: Math.max(...p) };
  }, [entries]);

  const onChangeTipo = (t: Tipo) => {
    setTipo(t);
    setIdx(0);
  };

  return (
    <section className="py-16 px-4 w-full bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-2xl">
        {/* Segmented control */}
        <div
          className="inline-flex rounded-xl p-1 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md"
          role="tablist"
          aria-label="Tipo de instalación"
        >
          <SegButton active={tipo === "residencial"} onClick={() => onChangeTipo("residencial")}>
            Residencial
          </SegButton>
          <SegButton active={tipo === "industrialCampo"} onClick={() => onChangeTipo("industrialCampo")}>
            Industrial y Campo
          </SegButton>
        </div>

        {/* Card principal */}
        <motion.div
          key={tipo}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="
            mt-6 rounded-2xl border border-black/10 dark:border-white/10
            bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md glass
          "
        >
          <div className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 text-center">
              ¿Cuánto puedes ahorrar?
            </h2>
            <p className="mt-1 text-center text-sm text-neutral-600 dark:text-neutral-400">
              Rango típico: {minPct}–{maxPct}% según potencia y superficie disponible.
            </p>

            {/* Valor grande */}
            <div className="mt-6 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={selected.kW}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="text-5xl sm:text-6xl font-extrabold tracking-tight text-green-600 dark:text-green-500"
                  aria-live="polite"
                >
                  ≈ {selected.ahorro}%
                </motion.p>
              </AnimatePresence>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Con <strong>{selected.kW} kWac</strong>, si cuentas con ~<strong>{selected.m2} m²</strong>.
              </p>
            </div>

            {/* Slider discreto */}
            <div className="mt-8">
              <label htmlFor="kw-slider" className="sr-only">
                Selecciona potencia del sistema
              </label>
              <input
                id="kw-slider"
                type="range"
                min={0}
                max={entries.length - 1}
                step={1}
                value={idx}
                onChange={(e) => setIdx(Number(e.target.value))}
                className="
                  w-full accent-green-600
                  [@media(pointer:coarse)]:h-8
                "
                aria-valuetext={`${selected.kW} kWac`}
              />

              {/* Marcas (ticks) y labels */}
              <div
                className="mt-3 grid"
                style={{ gridTemplateColumns: `repeat(${entries.length}, minmax(0,1fr))` }}
              >
                {entries.map((e, i) => {
                  const active = i === idx;
                  return (
                    <button
                      key={e.kW}
                      type="button"
                      onClick={() => setIdx(i)}
                      aria-pressed={active}
                      className="group flex flex-col items-center gap-1"
                      title={`${e.kW} kWac`}
                    >
                      <span
                        className={[
                          "h-2 w-2 rounded-full",
                          active ? "bg-green-600" : "bg-neutral-300 dark:bg-neutral-700",
                        ].join(" ")}
                      />
                      <span
                        className={[
                          "text-[11px] font-medium",
                          active
                            ? "text-neutral-900 dark:text-neutral-100"
                            : "text-neutral-500 dark:text-neutral-400",
                        ].join(" ")}
                      >
                        {e.kW} kW
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Barra lineal (gauge) */}
            <div className="mt-6">
              <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                <div
                  className="h-full bg-green-600 dark:bg-green-500 transition-[width] duration-300"
                  style={{
                    width: `${((selected.ahorro - minPct) / (maxPct - minPct || 1)) * 100}%`,
                  }}
                  aria-hidden="true"
                />
              </div>
              <div className="mt-1 flex justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                <span>{minPct}%</span>
                <span>{maxPct}%</span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 text-center">
              <button
                onClick={open}
                type="button"
                className="
                  inline-flex items-center justify-center gap-2
                  px-5 py-3 rounded-lg text-sm font-medium
                  bg-green-600 hover:bg-green-700 text-white
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60
                  transition-colors shadow-sm
                "
              >
                Solicitar propuesta personalizada
              </button>
            </div>

            {/* Notas */}
            <details className="mt-4 group">
              <summary className="cursor-pointer text-xs text-neutral-600 dark:text-neutral-400 hover:underline">
                Ver supuestos y notas
              </summary>
              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                <p>
                  Estimaciones referenciales. Dependen de ubicación, orientación, sombreado y tecnología.
                </p>
                <ul className="list-disc pl-5">
                  <li>Potencia en kWac; superficie estimada en m².</li>
                  <li>Incluye pérdidas y disponibilidad promedio en condiciones estándar.</li>
                </ul>
              </div>
            </details>
          </div>
        </motion.div>
      </div>
    </section>
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
