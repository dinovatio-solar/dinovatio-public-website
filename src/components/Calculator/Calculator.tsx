"use client";
import { useMemo, useState } from "react";

export default function Calculator() {
  const [consumo, setConsumo] = useState("");
  const [tipo, setTipo] = useState<"residencial" | "industrial" | "campo">("residencial");

  // Si querés variar por tipo, podés mover el factor a un map.
  const ahorroAnual = useMemo(() => {
    const c = Number(consumo);
    if (!Number.isFinite(c) || c <= 0) return null;
    const factor = 0.4; // ahorro estimado 60%
    const ahorro = c * factor * 12; // anual
    return Math.round(ahorro).toLocaleString("es-AR");
  }, [consumo, tipo]);

  return (
    <section className="py-16 px-4 w-full bg-neutral-50 dark:bg-neutral-950">
      <div
        className="
          mx-auto max-w-2xl rounded-2xl border border-black/10 dark:border-white/10
          bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md
          transition-colors transition-shadow
          p-6 sm:p-8 text-center
        "
      >
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          ¿Cuánto puedes ahorrar con paneles solares?
        </h2>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <label className="sr-only" htmlFor="consumo">
            Consumo mensual (kWh)
          </label>
          <input
            id="consumo"
            type="number"
            inputMode="decimal"
            placeholder="Consumo mensual promedio (kWh)"
            value={consumo}
            onChange={(e) => setConsumo(e.target.value)}
            className="
              w-64 sm:w-72 px-4 py-2 rounded-md
              border border-black/10 dark:border-white/10
              bg-white dark:bg-neutral-900
              text-neutral-900 dark:text-neutral-100
              placeholder:text-neutral-400 dark:placeholder:text-neutral-500
              focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60
            "
          />

          <label className="sr-only" htmlFor="tipo">
            Tipo de instalación
          </label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as typeof tipo)}
            className="
              px-4 py-2 rounded-md
              border border-black/10 dark:border-white/10
              bg-white dark:bg-neutral-900
              text-neutral-900 dark:text-neutral-100
              focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60
            "
          >
            <option value="residencial">Residencial</option>
            <option value="industrial">Industrial</option>
            <option value="campo">Campo</option>
          </select>
        </div>

        {ahorroAnual && (
          <p
            className="mt-6 text-lg font-semibold text-neutral-900 dark:text-neutral-100"
            aria-live="polite"
          >
            Podrías ahorrar hasta {ahorroAnual} kWh al año
          </p>
        )}

        <button
          className="
            mt-6 px-6 py-3 rounded-lg text-sm
            bg-green-600 hover:bg-green-700 text-white
            focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60
            transition-colors
          "
          type="button"
        >
          Solicita propuesta personalizada
        </button>

        <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400">
          Esta estimación es referencial, el valor final dependerá de la ubicación exacta y perfil de consumo.
        </p>
      </div>
    </section>
  );
}
