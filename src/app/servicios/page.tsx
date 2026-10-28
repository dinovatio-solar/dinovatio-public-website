import type { Metadata } from "next";
import PageShell from "@/components/Content/PageShell";
import RelatedLinks from "@/components/Content/RelatedLinks";
import { SERVICIOS } from "@/content/servicios";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Servicios de energía solar en Mendoza",
  description:
    "Instalación de paneles solares residenciales e industriales, energía solar para campo y riego, y asesoría en energías renovables en Mendoza.",
  path: "/servicios",
});

export default function ServiciosIndex() {
  return (
    <PageShell
      crumbs={[{ label: "Servicios" }]}
      h1="Servicios de energía solar"
      intro="Cuatro formas de trabajar según el tipo de proyecto. En todos los casos el punto de partida es tu consumo real, no un paquete estándar."
    >
      <RelatedLinks
        title="Elegí por tipo de proyecto"
        items={SERVICIOS.map((s) => ({
          href: `/servicios/${s.slug}`,
          title: s.h1,
          text: s.intro,
        }))}
      />
    </PageShell>
  );
}
