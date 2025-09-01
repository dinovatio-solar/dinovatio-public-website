"use client";
import { Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Props = {
  variant?: "plain" | "card";
  align?: "left" | "center";
  icon?: LucideIcon;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  id?: string;
};

export default function AboutBlurb({
  variant = "card",
  align = "left",
  icon: Icon = Sun,
  size = "md",
  className = "",
  id,
}: Props) {
  const maxW = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-3xl",
    xl: "max-w-4xl",
  }[size];

  const container = ["w-full", "mx-auto", "mt-6", maxW, className]
    .filter(Boolean)
    .join(" ");

  const cardStyles =
    variant === "card"
      ? "rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60 backdrop-blur px-6 py-5"
      : "";

  return (
    <div id={id} className={container}>
      <div className={cardStyles}>
        <div
          className={[
            // 👇 tipografía más grande y adaptable
            "flex items-start gap-3 text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300",
            align === "center" ? "justify-center text-center" : "",
          ].join(" ")}
        >
          <Icon
            size={24} // 👈 agrandado (antes 18)
            className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400"
            aria-hidden="true"
          />
          <span>
            Somos un equipo de ingenieros y técnicos con comprobada experiencia en el
            sector de las energías renovables. <strong>Más de 10 años</strong> avalan
            nuestra capacidad y compromiso en la implementación de soluciones energéticas
            sostenibles.
          </span>
        </div>
      </div>
    </div>
  );
}
