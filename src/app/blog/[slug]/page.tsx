import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageShell from "@/components/Content/PageShell";
import Blocks from "@/components/Content/Blocks";
import RelatedLinks from "@/components/Content/RelatedLinks";
import FAQSection from "@/components/FAQ/FAQSection";
import { POSTS, getPost, postsOrdenados } from "@/content/blog";
import { pageMetadata } from "@/lib/seo";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

type Params = { params: { slug: string } };

const fecha = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const p = getPost(params.slug);
  if (!p) return {};
  return pageMetadata({
    title: p.seoTitle ?? p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    article: {
      published: p.publicado,
      modified: p.actualizado,
      tags: p.tags,
    },
  });
}

export default function PostPage({ params }: Params) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publicado,
    dateModified: post.actualizado ?? post.publicado,
    inLanguage: "es-AR",
    keywords: post.tags.join(", "),
    image: `${SITE_URL}${OG_IMAGE.url}`,
    author: { "@id": `${SITE_URL}/#empresa` },
    publisher: { "@id": `${SITE_URL}/#empresa` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  const otros = postsOrdenados()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)
    .map((p) => ({ href: `/blog/${p.slug}`, title: p.title, text: p.description }));

  return (
    <PageShell
      crumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
      h1={post.title}
      intro={post.description}
      eyebrow={
        <>
          <time dateTime={post.publicado}>{fecha(post.publicado)}</time>
          {" · "}
          {post.lectura} min de lectura
          {post.tags.length ? ` · ${post.tags.join(" · ")}` : null}
        </>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Blocks blocks={post.bloques} />

      {post.faqs?.length ? (
        <div className="-mx-4 mt-6">
          <FAQSection
            items={post.faqs}
            title="Preguntas frecuentes"
            description="Lo que suele quedar pendiente después de leer esto."
          />
        </div>
      ) : null}

      {post.fuentes?.length ? (
        <section className="mt-12 border-t border-black/10 dark:border-white/10 pt-6">
          <h2 className="text-base font-bold">Fuentes</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {post.fuentes.map((f) => (
              <li key={f.url}>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 dark:text-emerald-400 underline underline-offset-2 hover:no-underline"
                >
                  {f.titulo}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
            Este artículo es informativo. La normativa y los requisitos cambian: antes de
            iniciar un trámite, verificá los datos vigentes en la fuente oficial.
          </p>
        </section>
      ) : null}

      <RelatedLinks
        title="Más del blog"
        items={[
          ...otros,
          {
            href: "/calculadora-ahorro-solar-mendoza",
            title: `Calculá tu ahorro con ${SITE_NAME}`,
            text: "Estimación orientativa según la potencia del sistema.",
          },
        ]}
      />
    </PageShell>
  );
}
