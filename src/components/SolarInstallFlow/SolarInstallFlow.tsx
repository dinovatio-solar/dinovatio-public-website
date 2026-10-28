"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { PhoneCall, Home, FileCheck2, Wrench, PiggyBank, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useQuoteModal } from "@/components/Quote/QuoteModalProvider";

// A compact, accessible flow / stepper to explain the solar install journey
// Drop-in component: <SolarInstallFlow onStart={() => ...} />
// - Mobile: vertical timeline
// - Desktop: horizontal cards with connectors
// - Includes progress bar and simple step state

export type Step = {
  id: number;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
};

const STEPS: Step[] = [
  {
    id: 1,
    title: "Primer contacto y estimación general de ahorro",
    desc: "Nos cuentas tu consumo y te orientamos con un ahorro estimado.",
    icon: PhoneCall,
  },
  {
    id: 2,
    title: "Contacto con un experto y visita a domicilio para evaluación exacta",
    desc: "Un especialista evalúa tu techo, orientación y posibles sombras.",
    icon: Home,
  },
  {
    id: 3,
    title: "Propuesta técnico - económica",
    desc: "Recibes el diseño, equipo sugerido y números claros de inversión/ahorro.",
    icon: FileCheck2,
  },
  {
    id: 4,
    title: "Instalación del sistema",
    desc: "Nuestro equipo instala, configura y deja todo operando.",
    icon: Wrench,
  },
  {
    id: 5,
    title: "Comienza a ahorrar",
    desc: "Monitorea tu producción y disfruta de una cuenta de luz más baja.",
    icon: PiggyBank,
  },
];

export default function SolarInstallFlow({
  onStart,
  className = "",
}: {
  onStart?: () => void;
  className?: string;
}) {
  const [current, setCurrent] = useState(1);
  const progress = useMemo(() => ((current - 1) / (STEPS.length - 1)) * 100, [current]);
  const visibleSteps = useMemo(() => STEPS.slice(0, current), [current]);
  const { open } = useQuoteModal();

  // Mobile timeline line measurement (end at last visible step)
  const mobileListRef = useRef<HTMLOListElement | null>(null);
  const lastMobileItemRef = useRef<HTMLLIElement | null>(null);
  const [mobileLineH, setMobileLineH] = useState<number>(0);
  const FIRST_CENTER = 40; // px from li top to icon center (py-4 + top-5 + half icon)

  useEffect(() => {
    const measure = () => {
      requestAnimationFrame(() => {
        const last = lastMobileItemRef.current;
        if (!last) return;
        const center = last.offsetTop + FIRST_CENTER;
        const h = Math.max(0, center - FIRST_CENTER);
        setMobileLineH(h);
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visibleSteps.length]);

  const goNext = () => {
    if (current < STEPS.length) setCurrent((c) => c + 1);
    else { onStart ? onStart() : open(); }
  };

  return (
    <section aria-label="Cómo instalamos tu sistema solar" className={`w-full py-16 px-4 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Tu camino a la energía solar
          </motion.h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Seguí estos pasos; en cada uno te acompañamos para que el siguiente sea más fácil.
          </p>
        </div>

        {/* Progress */}
        <div className="relative mb-10 hidden md:block">
          <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <motion.div
            className="absolute left-0 top-0 h-2 rounded-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
          <div className="mt-2 text-right text-xs text-neutral-500 dark:text-neutral-400">
            Paso {current} de {STEPS.length}
          </div>
        </div>

        {/* Desktop: horizontal cards with connectors */}
        <ol className="hidden md:grid grid-cols-5 gap-5 items-stretch">
          {visibleSteps.map((step, i) => {
            const isLastVisible = i === visibleSteps.length - 1;     // última card visible = paso actual
            const isFinalStep   = step.id === STEPS.length;           // último paso real

            return (
              <li key={step.id} className="relative h-full">
                {/* connector to next */}
                {i < visibleSteps.length - 1 && (
                  <div className="hidden md:block absolute top-14 -right-3 w-6 h-0.5 bg-gradient-to-r from-emerald-300/70 to-emerald-500/80" />
                )}

                <button
                  onClick={() => setCurrent(step.id)}
                  className={`group w-full h-full min-h-[260px] md:min_h-[280px] text-left rounded-2xl p-5 border shadow-sm transition flex flex-col
                  ${
                    current === step.id
                      ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-900"
                      : "bg-white/80 dark:bg-neutral-900/60 border-black/5 dark:border-white/10 hover:bg-neutral-50/70 dark:hover:bg-neutral-900"
                  }`}
                  aria-current={current === step.id ? "step" : undefined}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 shrink-0 rounded-xl grid place-items-center transition
                      ${current >= step.id ? "bg-emerald-500 text-white" : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"}`}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500">Paso {step.id}</div>
                      <h3 className="font-semibold leading-tight">{step.title}</h3>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 flex-1">
                    {step.desc}
                  </p>

                  {/* CTA en desktop */}
                  {isLastVisible && (
                    isFinalStep ? (
                      // Solo en el último paso real
                      <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-700">
                        ¡Listo para empezar!
                      </div>
                    ) : (
                      // Solo en la última visible (paso actual), NO en las anteriores
                      <span
                        role="button"
                        tabIndex={0}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-700 cursor-pointer select-none group-hover:translate-x-0.5 transition"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();             // evita que el click caiga en la card y “vuelva atrás”
                          setCurrent((c) => Math.min(STEPS.length, c + 1));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            setCurrent((c) => Math.min(STEPS.length, c + 1));
                          }
                        }}
                      >
                        Siguiente <ArrowRight className="h-4 w-4" />
                      </span>
                    )
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        {/* Mobile: vertical timeline */}
        <ol ref={mobileListRef} className="md:hidden relative max-w-2xl mx-auto">
          {/* vertical line */}
          <div className="absolute left-5 w-px bg-gradient-to-b from-emerald-300/60 to-emerald-500/70" style={{ top: FIRST_CENTER, height: mobileLineH }} />
          {visibleSteps.map((step, idx) => (
            <li key={step.id} ref={idx === visibleSteps.length - 1 ? lastMobileItemRef : null} className="relative pl-14 py-4">
              <button
              onClick={() => setCurrent(step.id)}
              className="w-full text-left"
              aria-current={current === step.id ? "step" : undefined}
              >
              {/* dot/icon */}
              <div
              className={`absolute left-0 top-5 h-10 w-10 grid place-items-center rounded-full ring-2 transition
              ${current >= step.id ? "bg-emerald-500 text-white ring-emerald-200" : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 ring-neutral-300/60 dark:ring-neutral-700"}`}
              >
              <step.icon className="h-5 w-5" />
              </div>

              <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.35, delay: idx*0.04}}>
              <div className="text-xs text-neutral-500">Paso {step.id}</div>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{step.desc}</p>
              </motion.div>
              </button>
            </li>
          ))}
        </ol>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setCurrent((c) => Math.max(1, c - 1))}
            className="rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
            disabled={current === 1}
          >
            Anterior
          </button>
          <button
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
        >
          {current < STEPS.length ? (
            <>
              Siguiente paso <ArrowRight className="h-4 w-4" />
            </>
            ) : (
            <>Empezar ahora</>
           )}
          </button>
        </div>
      </div>
    </section>
  );
}