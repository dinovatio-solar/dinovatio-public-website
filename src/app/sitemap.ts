import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap del sitio.
 *
 * Hoy existe una sola URL real: la home. Los bloques de servicios,
 * calculadora y FAQ son anchors (#servicios, #calculadora, #faq) y NO deben
 * listarse acá: un sitemap con fragmentos o con URLs que devuelven la misma
 * página genera duplicados y Google los descarta.
 *
 * A medida que se creen rutas propias (ver plan de arquitectura de URLs:
 * /paneles-solares-mendoza, /paneles-solares-residencial,
 * /paneles-solares-industrial, /calculadora-ahorro-solar-mendoza,
 * /generacion-distribuida-mendoza-epre, /blog/...), agregarlas en esta lista.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL, // sin barra final, igual que el canonical
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
