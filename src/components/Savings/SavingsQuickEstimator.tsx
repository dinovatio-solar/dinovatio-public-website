// src/components/SavingsQuickEstimator.tsx
"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuoteModal } from "@/components/Quote/QuoteModalProvider";
import { EVENTS, trackEvent } from "@/lib/analytics";

type Tipo = "residencial" | "industrialCampo";

type Entry = {
  kW: number;      // Potencia del sistema (kWac)
  m2: number;      // Superficie mínima estimada (m²)
  ahorro: number;  // % ahorro típico
};

type Matrix = Record<Tipo, Entry[]>;

/**
 * TODO: Reemplazar con TU MATRIZ REAL (documento adjunto).
 * Mantén los campos: kW (kWac), m2 (m²), ahorro (%).
 */
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

export default function SavingsQuickEstimator() {
  const [tipo, setTipo] = useState<Tipo>("residencial");
  const [selKW, setSelKW] = useState<number | null>(null);
  const { open } = useQuoteModal();

  const entries = MATRIX[tipo];

  // Calcular rango general del tipo seleccionado
  const { minPct, maxPct } = useMemo(() => {
    const pcts = entries.map((e) => e.ahorro);
    return { minPct: Math.min(...pcts), maxPct: Math.max(...pcts) };
  }, [entries]);

  // Encontrar la entrada seleccionada por kW
  const selected = useMemo(
    () => entries.find((e) => e.kW === selKW) || null,
    [entries, selKW]
  );

  // Etiquetas
  const rangoLabel = selected
    ? `≈ ${selected.ahorro}%`
    : `${minPct}–${maxPct}%`;

  const subtitulo = selected
    ? `Con ${selected.kW} kWac, si cuentas con ~${selected.m2} m² libres.`
    : tipo === "residencial"
    ? "Ahorro típico según potencia sugerida y superficie disponible."
    : "Ahorro típico para sistemas industriales o de campo.";

  return (
    <section className="py-16 px-4 w-full bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-2xl">
        {/* Segmented control */}
        <div
          className="inline-flex rounded-xl p-1 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md"
          role="tablist"
          aria-label="Tipo de instalación"
        >
          <SegButton
            active={tipo === "residencial"}
            onClick={() => {
              setTipo("residencial");
              setSelKW(null);
            }}
          >
            Residencial
          </SegButton>
          <SegButton
            active={tipo === "industrialCampo"}
            onClick={() => {
              setTipo("industrialCampo");
              setSelKW(null);
            }}
          >
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
            bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md
            glass
          "
        >
          <div className="p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              ¿Cuánto podés ahorrar con paneles solares?
            </h2>

            {/* Rango o valor seleccionado */}
            <div className="mt-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={rangoLabel}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="text-5xl sm:text-6xl font-extrabold tracking-tight text-green-600 dark:text-green-500"
                  aria-live="polite"
                >
                  {rangoLabel}
                </motion.p>
              </AnimatePresence>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {subtitulo}
              </p>
            </div>

            {/* Chips por potencia */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {entries.map((e) => {
                const active = selKW === e.kW;
                return (
                  <button
                    key={e.kW}
                    type="button"
                    onClick={() => {
                      setSelKW((v) => {
                        const next = v === e.kW ? null : e.kW;
                        // Solo al elegir una potencia, no al deseleccionar.
                        if (next !== null) {
                          trackEvent(EVENTS.calculatorUse, { tipo, potencia_kw: next });
                        }
                        return next;
                      });
                    }}
                    aria-pressed={active}
                    className={[
                      "px-3 py-1.5 rounded-full text-sm border transition",
                      active
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 border-black/10 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-neutral-800",
                    ].join(" ")}
                    title={`${e.kW} kWac`}
                  >
                    {e.kW} kWac
                  </button>
                );
              })}
            </div>

            {/* Anotación detallada cuando hay selección */}
            <AnimatePresence initial={false}>
              {selected && (
                <motion.div
                  key={selected.kW}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 text-sm text-neutral-700 dark:text-neutral-300"
                >
                  Con <strong>{selected.kW} kWac</strong>, el ahorro estimado es{" "}
                  <strong>≈ {selected.ahorro}%</strong> si dispones de{" "}
                  <strong>~{selected.m2} m²</strong> (condiciones estándar).
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <div className="mt-6">
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

            {/* Supuestos / notas */}
            <details className="mt-4 group">
              <summary className="cursor-pointer text-xs text-neutral-600 dark:text-neutral-400 hover:underline">
                Ver supuestos y notas del cálculo
              </summary>
              <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 space-y-1 text-left">
                <p>
                  Estimaciones referenciales basadas en una matriz estándar de ahorro. La cifra final
                  depende de ubicación, sombreado, orientación, tecnología y perfil de consumo.
                </p>
                <ul className="list-disc pl-5">
                  <li>Potencia expresada en kWac; superficie estimada en m².</li>
                  <li>Incluye pérdidas y disponibilidad promedio en condiciones estándar.</li>
                  <li>
                    Para un cálculo exacto, solicita una evaluación técnica (visita en terreno).
                  </li>
                  <li>Irradiación estimada según los valores promedio de la provincia de Mendoza.</li>
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
