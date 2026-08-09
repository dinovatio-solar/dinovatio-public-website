"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Menu, X, PhoneCall, MessageCircle } from "lucide-react";
import ThemeToggle from "@/components/Theme/ThemeToggle";
import { useQuoteModal } from "@/components/Quote/QuoteModalProvider";
import { useRegion } from "@/components/Region/RegionProvider";
import RegionSwitcher from "@/components/Region/RegionSwitcher";

const navItems = [
  { href: "#servicios", label: "Servicios" },
  { href: "#calculadora", label: "Calculadora" },
  //{ href: "#casos", label: "Casos de éxito" },
  { href: "#somos", label: "¿Quienes Somos?" },
  { href: "#faq", label: "FAQs" },
  { href: "#contacto", label: "Contacto" },
];

const normalizePhone = (num: string) => num.replace(/\D/g, "");

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { open: openQuote } = useQuoteModal();
  const { current } = useRegion();

  const waNumber = useMemo(() => normalizePhone(current.whatsapp || ""), [current.whatsapp]);
  const waHref = waNumber ? `https://wa.me/${waNumber}` : "#";

  // 👉 mide la altura de la barra (la fila superior)
  const barRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const setVar = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--nav-h", `${h}px`);
    };
    setVar();

    // Observa cambios (responsivo, fuente, toggles, etc.)
    const RO = (window as any).ResizeObserver ? new ResizeObserver(setVar) : null;
    RO?.observe(el);

    // También recalcula en resize/orientación
    window.addEventListener("resize", setVar);
    window.addEventListener("orientationchange", setVar);

    return () => {
      RO?.disconnect();
      window.removeEventListener("resize", setVar);
      window.removeEventListener("orientationchange", setVar);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 dark:border-white/10 glass">
      {/* ⬇️ agrega el ref aquí */}
      <div ref={barRef} className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 font-extrabold tracking-tight text-xl"
          aria-label="Ir al inicio"
        >
          <img
            src="/assets/dinamo-icon.png"
            alt=""
            className="h-14 w-14 md:h-16 md:w-16 shrink-0"
            aria-hidden="true"
          />
          <span className="flex">
            <span className="font-bold text-zinc-900 dark:text-white">DÍNAMO</span>
            <span className="font-bold text-zinc-900 dark:text-white">&nbsp;ENERGÍA</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal">
          {navItems.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="text-sm hover:text-brand-blue dark:hover:text-brand-yellow"
            >
              {i.label}
            </a>
          ))}
        </nav>

        {/* Acciones desktop */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={() => {
              setOpenMenu(false);
              openQuote();
            }}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-brand-green text-white hover:bg-brand-green/90 dark:hover:bg-brand-green/80"
          >
            <PhoneCall size={16} /> Cotizar
          </button>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={waHref}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-brand-blue text-white hover:bg-brand-blue/90 dark:hover:bg-brand-blue/80"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
          {/* 
            <RegionSwitcher className="hidden md:block ml-2" />
          */}
        </div>

        {/* Mobile: toggler */}
        <button
          className="md:hidden p-2 rounded-lg border"
          aria-label={openMenu ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={openMenu}
          aria-controls="mobile-menu"
          onClick={() => setOpenMenu((v) => !v)}
        >
          {openMenu ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {openMenu && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-black/5 dark:border-white/10 px-4 py-3 space-y-3 glass"
        >
          <nav className="space-y-1" aria-label="Navegación móvil">
            {navItems.map((i) => (
              <a
                key={i.href}
                href={i.href}
                onClick={() => setOpenMenu(false)}
                className="block py-2 text-sm hover:text-brand-blue dark:hover:text-brand-yellow"
              >
                {i.label}
              </a>
            ))}
            {/*  
              <RegionSwitcher className="pt-2" />
            */}
          </nav>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                setOpenMenu(false);
                openQuote();
              }}
              className="flex-1 text-center rounded-xl px-4 py-2 bg-brand-green text-white hover:bg-brand-green/90 dark:hover:bg-brand-green/80"
            >
              Cotizar
            </button>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href={waHref}
              className="flex-1 text-center rounded-xl px-4 py-2 bg-brand-blue text-white hover:bg-brand-blue/90 dark:hover:bg-brand-blue/80"
              onClick={() => setOpenMenu(false)}
            >
              WhatsApp
            </a>
          </div>

          <div className="pt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
