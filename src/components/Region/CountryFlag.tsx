"use client";

import { useMemo, useState } from "react";
import { isoToFlag } from "./isoToFlag";

type Props = {
  /** Código ISO-2 en mayúsculas, ej: "AR" */
  code?: string;
  /** Texto para accesibilidad / tooltip */
  title?: string;
  /** Tamaño en px (cuadrado) */
  size?: number;
  /** Clases extra (ej: rounded-sm shadow) */
  className?: string;
};

export default function CountryFlag({ code, title, size = 20, className }: Props) {
  //const iso = (code || "").toUpperCase();
  const iso = ("AR").toUpperCase();
  const [failed, setFailed] = useState(false);
  const emoji = useMemo(() => isoToFlag(iso || undefined), [iso]);

  if (!iso || failed) {
    return (
      <span
        aria-label={title || iso || "Bandera"}
        title={title}
        className={className}
        style={{
          display: "inline-flex",
          width: size,
          height: size,
          alignItems: "center",
          justifyContent: "center",
          fontSize: Math.floor(size * 0.9),
          lineHeight: 1,
        }}
      >
        {emoji}
      </span>
    );
  }

  return (
    <img
      src={`/flags/${iso}.svg`}
      alt={title || iso}
      title={title}
      width={size}
      height={size}
      className={["object-cover rounded-md", className].filter(Boolean).join(" ")}
      onError={() => setFailed(true)}
      loading="lazy"
      decoding="async"
    />
  );
}
