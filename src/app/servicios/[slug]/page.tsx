import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageShell from "@/components/Content/PageShell";
import Blocks from "@/components/Content/Blocks";
import RelatedLinks from "@/components/Content/RelatedLinks";
import FAQSection from "@/components/FAQ/FAQSection";
import { SERVICIOS, getServicio } from "@/content/servicios";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const s = getServicio(params.slug);
  if (!s) return {};
  return pageMetadata({
    title: s.title,
    description: s.description,
    path: `/servicios/${s.slug}`,
  });
}

export default function ServicioPage({ params }: Params) {
  const servicio = getServicio(params.slug);
  if (!servicio) notFound();

  // Service referencia al LocalBusiness del layout por @id, para que Google
  // entienda que es el mismo prestador y no una entidad nueva por página.
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: servicio.h1,
    description: servicio.description,
    serviceType: servicio.nombre,
    provider: { "@id": `${SITE_URL}/#empresa` },
    areaServed: { "@type": "AdministrativeArea", name: "Mendoza, Argentina" },
    url: `${SITE_URL}/servicios/${servicio.slug}`,
  };

  const relacionados = servicio.relacionados
    .map((slug) => getServicio(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({
      href: `/servicios/${s.slug}`,
      title: s.h1,
      text: s.intro,
    }));

  return (
    <PageShell
      crumbs={[{ label: "Servicios", href: "/servicios" }, { label: servicio.nombre }]}
      h1={servicio.h1}
      intro={servicio.intro}
      eyebrow={`Servicios de ${SITE_NAME}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Blocks blocks={servicio.bloques} />

      <div className="-mx-4 mt-6">
        <FAQSection
          items={servicio.faqs}
          title="Preguntas frecuentes"
          description={`Dudas habituales sobre ${servicio.nombre.toLowerCase()}.`}
        />
      </div>

      <RelatedLinks
        title="Otros servicios"
        items={[
          ...relacionados,
          {
            href: "/paneles-solares-mendoza",
            title: "Paneles solares en Mendoza",
            text: "Panorama general: cómo funciona, qué cuesta decidir y cómo es el trámite.",
          },
        ]}
      />
    </PageShell>
  );
}
