import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * robots.txt propio del sitio.
 *
 * ⚠️ IMPORTANTE: Cloudflare puede inyectar su propio bloque "Managed Content"
 * en /robots.txt y sobrescribir esto. Hoy ese bloque bloquea GPTBot,
 * ClaudeBot, Claude-Web, anthropic-ai, Google-Extended, CCBot,
 * meta-externalagent y PerplexityBot, lo que deja el sitio invisible para los
 * buscadores con IA.
 *
 * Para que este archivo tenga efecto hay que desactivar en el dashboard de
 * Cloudflare: AI Crawl Control → "Block AI bots" / "Managed robots.txt".
 * Verificar después con: curl -s https://dinamoenergia.com.ar/robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Buscadores tradicionales y crawlers de IA con atribución
        // (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-User, etc.).
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
