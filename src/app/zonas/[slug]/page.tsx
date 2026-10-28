import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageShell from "@/components/Content/PageShell";
import Blocks from "@/components/Content/Blocks";
import RelatedLinks from "@/components/Content/RelatedLinks";
import FAQSection from "@/components/FAQ/FAQSection";
import { ZONAS, getZona } from "@/content/zonas";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return ZONAS.map((z) => ({ slug: z.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const z = getZona(params.slug);
  if (!z) return {};
  return pageMetadata({
    title: z.title,
    description: z.description,
    path: `/zonas/${z.slug}`,
  });
}

export default function ZonaPage({ params }: Params) {
  const zona = getZona(params.slug);
  if (!zona) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: zona.h1,
    description: zona.description,
    provider: { "@id": `${SITE_URL}/#empresa` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${zona.nombre}, Mendoza, Argentina`,
    },
    url: `${SITE_URL}/zonas/${zona.slug}`,
  };

  const otras = ZONAS.filter((z) => z.slug !== zona.slug).map((z) => ({
    href: `/zonas/${z.slug}`,
    title: z.nombre,
    text: z.intro,
  }));

  return (
    <PageShell
      crumbs={[{ label: "Zonas", href: "/zonas" }, { label: zona.nombre }]}
      h1={zona.h1}
      intro={zona.intro}
      eyebrow="Cobertura"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Blocks blocks={zona.bloques} />

      <div className="-mx-4 mt-6">
        <FAQSection
          items={zona.faqs}
          title={`Preguntas frecuentes en ${zona.nombre}`}
          description="Lo que más nos consultan en la zona."
        />
      </div>

      <RelatedLinks title="Otras zonas que atendemos" items={otras} />
    </PageShell>
  );
}
