import type { Metadata } from "next";
import PageShell from "@/components/Content/PageShell";
import RelatedLinks from "@/components/Content/RelatedLinks";

/**
 * Sin esta página, el 404 heredaba del layout el canonical de la home y se
 * declaraba a sí mismo como la portada del sitio. Acá se corta: noindex y
 * canonical propio.
 */
export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La dirección que buscás no existe o cambió.",
  alternates: { canonical: "/404" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell
      crumbs={[{ label: "Página no encontrada" }]}
      h1="Esta página no existe"
      intro="Puede que la dirección haya cambiado o que el enlace esté mal escrito. Estas son las secciones principales del sitio."
    >
      <RelatedLinks
        title="Ir a"
        items={[
          {
            href: "/paneles-solares-mendoza",
            title: "Paneles solares en Mendoza",
            text: "La guía general: dimensionamiento, trámite y cómo comparar presupuestos.",
          },
          {
            href: "/servicios",
            title: "Servicios",
            text: "Residencial, industrial, campo y riego, y asesoría.",
          },
          {
            href: "/calculadora-ahorro-solar-mendoza",
            title: "Calculadora de ahorro",
            text: "Una estimación orientativa en treinta segundos.",
          },
          {
            href: "/blog",
            title: "Blog",
            text: "Trámite ante el EPRE, cómo leer tu factura y dimensionamiento.",
          },
        ]}
      />
    </PageShell>
  );
}
