"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Region = {
  code: string;      // código interno de provincia
  name: string;      // nombre mostrado
  currency: string;  // siempre ARS
  flag: string;      // sin bandera (string vacío para compatibilidad)
  whatsapp: string;  // número de contacto por provincia
};

const DEFAULT = "MZ";

// ⚠️ Reemplaza los teléfonos por los reales que quieras usar
const PROVINCES: Region[] = [
  //{ code: "CABA", name: "CABA (Ciudad de Buenos Aires)", currency: "ARS", flag: "🇦🇷", whatsapp: "+5492612316666" },
  { code: "CABA", name: "CABA (Ciudad de Buenos Aires)", currency: "ARS", flag: "", whatsapp: "+5492612316666" },
  { code: "BA",   name: "Buenos Aires",                  currency: "ARS", flag: "", whatsapp: "+5492612316666" },
  { code: "CB",   name: "Córdoba",                       currency: "ARS", flag: "", whatsapp: "+5492612316666" },
  { code: "SF",   name: "Santa Fe",                      currency: "ARS", flag: "", whatsapp: "+5492612316666" },
  { code: "MZ",   name: "Mendoza",                       currency: "ARS", flag: "", whatsapp: "+5492612316666" },
  //{ code: "ER",   name: "Entre Ríos",                    currency: "ARS", flag: "", whatsapp: "+5492612316666" },
  { code: "TU",   name: "Tucumán",                       currency: "ARS", flag: "", whatsapp: "+5492612316666" },
  //{ code: "SA",   name: "Salta",                         currency: "ARS", flag: "", whatsapp: "+5492612316666" },
  { code: "MI",   name: "Misiones",                      currency: "ARS", flag: "", whatsapp: "+5492612316666" },
  { code: "RN",   name: "Río Negro",                     currency: "ARS", flag: "", whatsapp: "+5492612316666" },
  { code: "NQN",  name: "Neuquén",                       currency: "ARS", flag: "", whatsapp: "+5492612316666" },
  { code: "SJ",   name: "San Juan",                      currency: "ARS", flag: "", whatsapp: "+5492612316666" },
  { code: "SL",   name: "San Luis",                      currency: "ARS", flag: "", whatsapp: "+5492612316666" },
  //{ code: "SE",   name: "Santiago del Estero",           currency: "ARS", flag: "", whatsapp: "+5493850000000" },
  //{ code: "CT",   name: "Catamarca",                     currency: "ARS", flag: "", whatsapp: "+5493830000000" },
  //{ code: "CH",   name: "Chaco",                         currency: "ARS", flag: "", whatsapp: "+5493620000000" },
  //{ code: "CR",   name: "Corrientes",                    currency: "ARS", flag: "", whatsapp: "+5493790000000" },
  //{ code: "FO",   name: "Formosa",                       currency: "ARS", flag: "", whatsapp: "+5493700000000" },
  //{ code: "JU",   name: "Jujuy",                         currency: "ARS", flag: "", whatsapp: "+5493880000000" },
  { code: "LP",   name: "La Pampa",                      currency: "ARS", flag: "", whatsapp: "+5492954000000" },
  //{ code: "LR",   name: "La Rioja",                      currency: "ARS", flag: "", whatsapp: "+5493800000000" },
  { code: "CHU",  name: "Chubut",                        currency: "ARS", flag: "", whatsapp: "+5492800000000" },
  //{ code: "SC",   name: "Santa Cruz",                    currency: "ARS", flag: "", whatsapp: "+5492966000000" },
  //{ code: "TF",   name: "Tierra del Fuego",              currency: "ARS", flag: "", whatsapp: "+5492901000000" },
];

type Ctx = {
  region: string;                    // código de provincia seleccionada
  setRegion: (c: string) => void;
  regions: Region[];                 // lista de provincias
  current: Region;                   // provincia actual
  showBanner: boolean;
  setShowBanner: (v: boolean) => void;
};

const RegionCtx = createContext<Ctx | null>(null);

export default function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegionState] = useState<string>(DEFAULT);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dv-region"); // conservamos la misma key
    if (saved && PROVINCES.some(p => p.code === saved)) {
      setRegionState(saved);
    } else {
      // Heurística simple: si el navegador está en es-AR, mostramos banner con default CABA
      const lang = navigator.language.toLowerCase();
      if (lang.includes("es-ar")) setRegionState(DEFAULT);
      setShowBanner(true);
    }
  }, []);

  const setRegion = (c: string) => {
    setRegionState(c);
    localStorage.setItem("dv-region", c);
  };

  const current = useMemo(
    () => PROVINCES.find((r) => r.code === region) || PROVINCES[0],
    [region]
  );

  return (
    <RegionCtx.Provider
      value={{ region, setRegion, regions: PROVINCES, current, showBanner, setShowBanner }}
    >
      {children}
    </RegionCtx.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionCtx);
  if (!ctx) throw new Error("useRegion must be used within RegionProvider");
  return ctx;
}
