/**
 * Bloques de contenido para las páginas de servicio, zona y blog.
 *
 * Se usa una estructura tipada en vez de MDX a propósito: no agrega
 * dependencias, el contenido queda type-checked y permite derivar JSON-LD
 * (FAQPage, Article) del mismo dato que se renderiza.
 *
 * En los textos se admite un subconjunto mínimo de marcado inline:
 *   **negrita**            → <strong>
 *   [texto](/ruta)         → <a> (interno con next/link, externo con target)
 */
export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "callout"; title?: string; text: string }
  | { t: "table"; head: string[]; rows: string[][] };

export type FAQ = { q: string; a: string };

/** Página de servicio: /servicios/[slug] */
export type Servicio = {
  slug: string;
  /** Nombre corto, para menús y breadcrumbs. */
  nombre: string;
  /** <title> y H1 pueden diferir: el title compite en la SERP, el H1 ordena la página. */
  title: string;
  h1: string;
  description: string;
  /** Entradilla bajo el H1. */
  intro: string;
  bloques: Block[];
  faqs: FAQ[];
  /** Slugs de otros servicios a enlazar al pie. */
  relacionados: string[];
};

/** Página de zona: /zonas/[slug] */
export type Zona = {
  slug: string;
  nombre: string;
  /** Departamento tal como lo nombra la gente al buscar. */
  title: string;
  h1: string;
  description: string;
  intro: string;
  bloques: Block[];
  faqs: FAQ[];
};

/** Artículo: /blog/[slug] */
export type Post = {
  slug: string;
  title: string;
  /** <title> propio si conviene que difiera del titular. */
  seoTitle?: string;
  description: string;
  /** ISO 8601. */
  publicado: string;
  actualizado?: string;
  /** Minutos estimados de lectura. */
  lectura: number;
  tags: string[];
  bloques: Block[];
  faqs?: FAQ[];
  /** Fuentes citadas, si el artículo apoya afirmaciones en terceros. */
  fuentes?: { titulo: string; url: string }[];
};
