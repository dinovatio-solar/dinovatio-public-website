// src/components/SavingsMiniWizard.tsx
"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Building2, ArrowLeft } from "lucide-react";
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

export default function SavingsMiniWizard() {
  const [step, setStep] = useState<1 | 2>(1);
  const [tipo, setTipo] = useState<Tipo | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { open } = useQuoteModal();

  const entries = useMemo(() => (tipo ? MATRIX[tipo] : []), [tipo]);

  const onPickTipo = (t: Tipo) => {
    setTipo(t);
    setStep(2);
    setShowAll(false);
  };

  return (
    <section className="py-16 px-4 w-full bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl">
        {/* Header + back */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Instala y ahorra en 2 pasos
          </h2>
          <button
            type="button"
            onClick={() => (step === 2 ? setStep(1) : null)}
            className={[
              "inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border",
              "border-black/10 dark:border-white/10",
              step === 2
                ? "text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                : "opacity-0 pointer-events-none",
            ].join(" ")}
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
        </div>

        {/* Steps indicator (simple) */}
        <div className="mt-3 flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
          <span className={step >= 1 ? "font-semibold text-green-700 dark:text-green-400" : ""}>
            1. Tipo
          </span>
          <span>›</span>
          <span className={step >= 2 ? "font-semibold text-green-700 dark:text-green-400" : ""}>
            2. Tamaño
          </span>
        </div>

        <div className="mt-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-sm glass">
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Elige el tipo de instalación. Luego verás tamaños sugeridos con ahorro típico.
                  </p>

                  {/* Cards de tipo */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TypeCard
                      icon={<Home className="h-6 w-6" />}
                      title="Residencial"
                      desc="Viviendas, consumo estable."
                      active={tipo === "residencial"}
                      onClick={() => onPickTipo("residencial")}
                    />
                    <TypeCard
                      icon={<Building2 className="h-6 w-6" />}
                      title="Industrial y Campo"
                      desc="Operaciones con mayor demanda."
                      active={tipo === "industrialCampo"}
                      onClick={() => onPickTipo("industrialCampo")}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Elige un tamaño sugerido. Puedes ver más opciones si lo necesitas.
                  </p>

                  {/* Grid de tamaños */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(showAll ? entries : entries.slice(0, 6)).map((e) => (
                      <SizeCard
                        key={`${tipo}-${e.kW}`}
                        kW={e.kW}
                        m2={e.m2}
                        ahorro={e.ahorro}
                        onQuote={() => open()}
                      />
                    ))}
                  </div>

                  {/* Ver más tamaños */}
                  {entries.length > 6 && (
                    <div className="mt-4 text-center">
                      <button
                        type="button"
                        onClick={() => setShowAll((s) => !s)}
                        className="
                          inline-flex items-center justify-center gap-2
                          px-4 py-2 rounded-lg text-sm font-medium
                          border border-black/10 dark:border-white/10
                          bg-white hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800
                          text-neutral-700 dark:text-neutral-200
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60
                          transition
                        "
                      >
                        {showAll ? "Ver menos" : "Ver más tamaños"}
                      </button>
                    </div>
                  )}

                  {/* CTA general */}
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
                      Ver supuestos y notas del cálculo
                    </summary>
                    <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                      <p>
                        Cifras referenciales; el resultado final depende de ubicación, orientación, sombreado y perfil de consumo.
                      </p>
                      <ul className="list-disc pl-5">
                        <li>Potencia en kWac; superficie estimada en m².</li>
                        <li>Incluye pérdidas y disponibilidad promedio en condiciones estándar.</li>
                      </ul>
                    </div>
                  </details>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function TypeCard({
  icon,
  title,
  desc,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full text-left rounded-2xl border p-5 transition flex items-start gap-4",
        active
          ? "border-green-600 bg-green-50/60 dark:bg-green-950/20"
          : "border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800",
      ].join(" ")}
    >
      <div
        className={[
          "h-10 w-10 rounded-xl flex items-center justify-center",
          active
            ? "bg-green-600 text-white"
            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200",
        ].join(" ")}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{desc}</p>
      </div>
    </button>
  );
}

function SizeCard({
  kW,
  m2,
  ahorro,
  onQuote,
}: {
  kW: number;
  m2: number;
  ahorro: number;
  onQuote: () => void;
}) {
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
          <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {kW} kWac
          </h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Tamaño sugerido según condiciones estándar.
          </p>
        </div>

        <div>
          <p className="text-3xl font-extrabold tracking-tight text-green-600 dark:text-green-500">
            ≈ {ahorro}%
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">Ahorro anual típico</p>
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
