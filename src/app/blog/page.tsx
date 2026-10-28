import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/Content/PageShell";
import { postsOrdenados } from "@/content/blog";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Blog de energía solar en Mendoza",
  description:
    "Guías sobre energía solar en Mendoza: trámite de usuario generador ante el EPRE, cómo leer tu factura, dimensionamiento y proyectos industriales.",
  path: "/blog",
});

const fecha = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BlogIndex() {
  const posts = postsOrdenados();

  // Blog + ItemList: ayuda a que Google entienda la sección como un listado
  // y descubra los artículos sin depender solo del sitemap.
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog de Dínamo Energía",
    url: `${SITE_URL}/blog`,
    publisher: { "@id": `${SITE_URL}/#empresa` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.publicado,
      url: `${SITE_URL}/blog/${p.slug}`,
    })),
  };

  return (
    <PageShell
      crumbs={[{ label: "Blog" }]}
      h1="Blog"
      intro="Lo que nos preguntan antes de decidir: cómo funciona el trámite en Mendoza, cómo se dimensiona un sistema y qué mirar en un presupuesto."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <ul className="mt-8 space-y-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group block rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                <time dateTime={p.publicado}>{fecha(p.publicado)}</time>
                {" · "}
                {p.lectura} min
                {p.tags.length ? ` · ${p.tags.join(" · ")}` : null}
              </div>
              <h2 className="mt-2 text-xl font-bold group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                {p.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {p.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
