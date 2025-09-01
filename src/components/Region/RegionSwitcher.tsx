"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useRegion } from "./RegionProvider";
import { isoToFlag } from "./isoToFlag";
import CountryFlag from "./CountryFlag";

type Props = {
  /** "button" para navbar (dropdown), "menu" para el menú mobile (select simple) */
  variant?: "button" | "menu";
  className?: string;
};

export default function RegionSwitcher({ variant = "button", className }: Props) {
  const { regions, region, setRegion, current } = useRegion();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const popRef = useRef<HTMLDivElement | null>(null);

  const getIso = (r?: { flag?: string; code?: string }) => {
    if (!r) return undefined;
    if (r.flag && r.flag.length === 2) return r.flag.toUpperCase();
    if (r.code) return r.code.toUpperCase();
    return undefined;
  };

  // Cerrar al hacer click fuera / ESC
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!popRef.current || !btnRef.current) return;
      if (!popRef.current.contains(t) && !btnRef.current.contains(t)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  if (variant === "menu") {
    // Versión simple para menú mobile (select no soporta <img>, uso emoji)
    return (
      <div className={className}>
        <label className="block text-xs mb-1 opacity-70">Región</label>
        <select
          className="w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          aria-label="Cambiar región"
        >
          {regions.map((r) => {
            const iso = getIso(r) || r.code;
            const flagEmoji = isoToFlag(iso);
            return (
              <option key={r.code} value={r.code}>
                {flagEmoji} {r.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  // Versión botón con dropdown para navbar (desktop) — SOLO BANDERA
  const currentIso = getIso(current) || region;
  return (
    <div className={`relative ${className || ""}`}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Cambiar región${current?.name ? ` (actual: ${current.name})` : ""}`}
        title={current?.name ?? "Seleccionar región"}
        className="inline-flex items-center rounded-xl px-2 py-2 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 hover:bg-white dark:hover:bg-neutral-900 backdrop-blur"
      >
        <CountryFlag
          code={currentIso}
          title={current?.name ?? "Región"}
          size={20}
          className="rounded-sm"
        />
        <span className="sr-only">{current?.name ?? "Región"}</span>
      </button>

      {open && (
        <div
          ref={popRef}
          role="listbox"
          aria-label="Seleccionar región"
          className="absolute right-0 mt-2 w-56 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-xl p-1 z-50"
        >
          {regions.map((r) => {
            const selected = r.code === region;
            const iso = getIso(r) || r.code;
            return (
              <button
                key={r.code}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  setRegion(r.code);
                  setOpen(false);
                  btnRef.current?.focus();
                }}
                className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-left"
              >
                <span className="flex items-center gap-2">
                  <CountryFlag code={iso} title={r.name} size={18} className="rounded-[3px]" />
                  <span className="text-sm">{r.name}</span>
                </span>
                {selected && <span aria-hidden className="text-sm">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
