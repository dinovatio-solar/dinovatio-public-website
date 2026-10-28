// Datos canónicos del sitio y de la empresa.
// Fuente única para metadata, robots, sitemap y JSON-LD.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://dinamoenergia.com.ar";

export const SITE_NAME = "Dínamo Energía";

export const CONTACT_EMAIL = "contacto@dinamoenergia.com.ar";

// Formato E.164 para tel: / schema.org
export const CONTACT_PHONE = "+5492612316666";

// Mostrado al usuario
export const CONTACT_PHONE_DISPLAY = "+54 9 261 231 6666";

// TODO (local SEO): completar con la dirección real de la empresa.
// Sin street/postalCode el perfil de LocalBusiness queda incompleto y no
// refuerza el Google Business Profile ni el Map Pack.
export const ADDRESS = {
  street: "",
  city: "Mendoza",
  region: "Mendoza",
  postalCode: "",
  country: "AR",
} as const;

// Provincias con cobertura comercial (ver RegionProvider).
export const AREA_SERVED = [
  "Mendoza",
  "San Juan",
  "San Luis",
  "Córdoba",
  "Santa Fe",
  "Buenos Aires",
  "Ciudad Autónoma de Buenos Aires",
  "Tucumán",
  "Misiones",
  "Río Negro",
  "Neuquén",
  "La Pampa",
  "Chubut",
] as const;

export const OG_IMAGE = {
  url: "/assets/hero-1.jpg",
  width: 1200,
  height: 675,
  alt: "Instalación de paneles solares fotovoltaicos en Mendoza",
} as const;
