import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SERVICIO_SLUGS } from "@/content/servicios";
import { ZONA_SLUGS } from "@/content/zonas";
import { POSTS } from "@/content/blog";

/**
 * Sitemap derivado de las mismas fuentes de contenido que generan las rutas,
 * así que no hace falta mantenerlo a mano: al agregar un servicio, una zona o
 * un artículo, aparece acá automáticamente.
 *
 * Las secciones de la home siguen siendo anchors (#servicios, #calculadora) y
 * NO se listan: un sitemap con fragmentos o con URLs que devuelven la misma
 * página genera duplicados y Google los descarta.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  const estaticas: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: ahora, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/paneles-solares-mendoza`,
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/calculadora-ahorro-solar-mendoza`,
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/servicios`,
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${SITE_URL}/zonas`, lastModified: ahora, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: ahora, changeFrequency: "weekly", priority: 0.7 },
    {
      url: `${SITE_URL}/politica-de-privacidad`,
      lastModified: ahora,
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];

  const servicios: MetadataRoute.Sitemap = SERVICIO_SLUGS.map((slug) => ({
    url: `${SITE_URL}/servicios/${slug}`,
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const zonas: MetadataRoute.Sitemap = ZONA_SLUGS.map((slug) => ({
    url: `${SITE_URL}/zonas/${slug}`,
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // En los artículos el lastModified sale de la fecha real del contenido, no
  // de la del build: avisar de un cambio que no existió no sirve de nada.
  const posts: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(`${p.actualizado ?? p.publicado}T12:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...estaticas, ...servicios, ...zonas, ...posts];
}
