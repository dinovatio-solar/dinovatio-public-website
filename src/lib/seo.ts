import type { Metadata } from "next";
import { OG_IMAGE, SITE_NAME } from "./site";

/**
 * Metadata de una subpágina. Centraliza el canonical y el Open Graph para que
 * ninguna ruta quede sin ellos, que es el error que más se repite al agregar
 * páginas sueltas.
 *
 * `path` va con barra inicial y sin barra final ("/servicios/..."), igual que
 * el canonical de la home, para que no convivan dos formas de la misma URL.
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  /** Sobrescribe la imagen OG por defecto (ruta absoluta del sitio). */
  image?: string;
  /** Artículos: fechas para og:type article. */
  article?: { published: string; modified?: string; tags?: string[] };
}): Metadata {
  const { title, description, path, image, article } = opts;
  const img = image ?? OG_IMAGE.url;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: article ? "article" : "website",
      siteName: SITE_NAME,
      locale: "es_AR",
      url: path,
      title,
      description,
      images: [{ url: img, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: title }],
      ...(article
        ? {
            publishedTime: article.published,
            modifiedTime: article.modified ?? article.published,
            tags: article.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [img],
    },
  };
}
