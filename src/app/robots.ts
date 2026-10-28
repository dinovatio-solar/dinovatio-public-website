import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * robots.txt propio del sitio.
 *
 * Lo que se sirve en producción es ESTE archivo más un bloque que Cloudflare
 * antepone ("Bot Preference Sync", en Security → Settings → Configure AI bot
 * policies). No es un conflicto: ese bloque publica en robots.txt la política
 * de bots configurada en Cloudflare, que hoy es:
 *
 *   Search   (indexan para resultados de búsqueda)     → Allow
 *   Agent    (traen la página para responder al usuario) → Allow
 *   Training (recolectan para entrenar modelos)        → Disallow
 *
 * Es decir: se permite a quien puede citar el sitio (Googlebot, OAI-SearchBot,
 * ChatGPT-User, PerplexityBot, Claude-SearchBot, Applebot) y se bloquea a
 * quien solo recolecta para entrenar (GPTBot, ClaudeBot, CCBot,
 * Google-Extended, Meta-ExternalAgent). Los nombres de user-agent que
 * aparecen con Disallow en /robots.txt son de esa segunda lista.
 *
 * Decisión tomada en octubre de 2026: se mantiene así. Claude-User queda
 * bloqueado como efecto colateral, porque Cloudflare lo clasifica en Training
 * aunque funcionalmente sea el equivalente de ChatGPT-User, y el plan no
 * admite excepciones por bot: liberarlo exigiría pasar toda la categoría
 * Training a Allow. La citación vía Claude-SearchBot no está afectada.
 *
 * Para verificar qué se sirve realmente:
 *   curl -s https://dinamoenergia.com.ar/robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
