import type { Metadata } from "next";
import PageShell from "@/components/Content/PageShell";
import RelatedLinks from "@/components/Content/RelatedLinks";
import { ZONAS } from "@/content/zonas";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Zonas donde instalamos paneles solares en Mendoza",
  description:
    "Instalación de paneles solares en Godoy Cruz, Maipú, Guaymallén, Luján de Cuyo y San Rafael. Cada zona tiene sus propias condiciones técnicas.",
  path: "/zonas",
});

export default function ZonasIndex() {
  return (
    <PageShell
      crumbs={[{ label: "Zonas" }]}
      h1="Dónde instalamos"
      intro="Las condiciones cambian bastante de un departamento a otro: sombra urbana en el Gran Mendoza, superficie de techo en las zonas industriales y distancia a la red en el sur provincial."
    >
      <RelatedLinks
        title="Elegí tu zona"
        items={ZONAS.map((z) => ({
          href: `/zonas/${z.slug}`,
          title: z.nombre,
          text: z.intro,
        }))}
      />
    </PageShell>
  );
}
