import type { Metadata } from "next";
import PageShell from "@/components/Content/PageShell";
import Blocks from "@/components/Content/Blocks";
import RelatedLinks from "@/components/Content/RelatedLinks";
import type { Block } from "@/content/types";
import { SERVICIOS } from "@/content/servicios";
import { ZONAS } from "@/content/zonas";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Paneles solares en Mendoza: guía completa para decidir",
  description:
    "Todo lo que conviene saber antes de instalar paneles solares en Mendoza: cómo se dimensiona, qué define el ahorro, cómo es el trámite ante el EPRE y qué mirar en un presupuesto.",
  path: "/paneles-solares-mendoza",
});

/**
 * Página pilar. Su función es doble: rankear por la consulta amplia
 * ("paneles solares Mendoza") y distribuir autoridad hacia las páginas de
 * servicio, de zona y del blog mediante enlazado interno.
 *
 * No repite el contenido de las páginas hijas: resume y enlaza.
 */
const BLOQUES: Block[] = [
  {
    t: "p",
    text: "Mendoza tiene una de las mejores condiciones de irradiación solar del país y, al mismo tiempo, una cantidad de usuarios generadores todavía baja. Esa brecha es la que explica el crecimiento de los últimos años: la base de comparación es chica y las tarifas vienen subiendo.",
  },
  {
    t: "p",
    text: "Esta página resume lo que conviene tener claro antes de pedir presupuestos, y enlaza al detalle de cada tema.",
  },

  { t: "h2", text: "Lo que define si el proyecto conviene" },
  {
    t: "p",
        text: "Hay tres variables, y ninguna es la cantidad de paneles.",
  },
  {
    t: "ol",
    items: [
      "**Cuánto consumís al año**, en kWh. Sale de sumar doce facturas, no de mirar el último mes.",
      "**Cuándo lo consumís.** Los paneles generan de día. La energía que usás en el momento vale más que la que inyectás a la red.",
      "**Cuánto te cuesta hoy cada kWh**, que es el cargo variable de tu factura. Es lo que convierte energía ahorrada en dinero.",
    ],
  },
  {
    t: "p",
    text: "El paso a paso para sacar esos números de tu propia factura está en [cómo leer tu factura de luz](/blog/como-calcular-tu-consumo-electrico).",
  },

  { t: "h2", text: "Un detalle que casi nadie aclara" },
  {
    t: "p",
    text: "Un sistema que cubre el 70% de tu energía **no baja tu factura un 70%**. Los cargos fijos, los impuestos y las tasas no se reducen con la generación propia. Lo que baja es la porción variable, la que corresponde a los kWh.",
  },
  {
    t: "p",
    text: "Cualquier estimación que prometa una reducción directa sobre el total de la factura está, en el mejor de los casos, simplificando de más.",
  },

  { t: "h2", text: "Residencial, industrial o campo" },
  {
    t: "p",
    text: "El tipo de proyecto cambia por completo el análisis, y no solo por escala.",
  },
  {
    t: "table",
    head: ["Caso", "Por qué es distinto"],
    rows: [
      [
        "**Vivienda**",
        "Parte del consumo es nocturno, así que el autoconsumo es menor. El techo suele ser la restricción.",
      ],
      [
        "**Industria o comercio**",
        "El consumo es diurno y coincide con la generación, así que el autoconsumo es mayor. El límite suele ser la superficie de techo.",
      ],
      [
        "**Campo sin red**",
        "No compite contra una factura sino contra tender línea o mantener un grupo electrógeno.",
      ],
    ],
  },

  { t: "h2", text: "El trámite es provincial y arranca en el EPRE" },
  {
    t: "p",
    text: "Para inyectar excedentes a la red hace falta ser usuario generador, figura que crea la Ley 27.424 y a la que Mendoza adhirió. El error más común es creer que el trámite empieza en la distribuidora: empieza en el EPRE, y además intervienen la distribuidora y el municipio.",
  },
  {
    t: "p",
    text: "El circuito completo, etapa por etapa, está en la [guía del trámite de usuario generador](/blog/tramite-usuario-generador-mendoza).",
  },
  {
    t: "callout",
    title: "El orden correcto",
    text: "Primero la evaluación técnica del punto de conexión, después la compra de equipos. Hacerlo al revés es el error más caro del proceso.",
  },

  { t: "h2", text: "Cómo comparar presupuestos" },
  {
    t: "p",
    text: "Dos cotizaciones por la misma potencia pueden diferir mucho y las dos pueden ser honestas. Lo que conviene exigir por escrito:",
  },
  {
    t: "ul",
    items: [
      "La potencia de los **módulos** y la del **inversor**, por separado. No son lo mismo.",
      "La **generación anual estimada en kWh**, que es la cifra verificable después.",
      "Si el **trámite de usuario generador** está incluido o queda de tu lado.",
      "Las **garantías separadas** por componente: panel, inversor y mano de obra tienen plazos distintos.",
      "Qué **estructura de montaje** se usa, que en zona de granizo no es un detalle.",
    ],
  },
  {
    t: "p",
    text: "Si querés una lectura independiente de los presupuestos que ya tenés, eso es parte de la [asesoría](/servicios/asesoria-energias-renovables).",
  },

  { t: "h2", text: "Granizo, polvo y las condiciones locales" },
  {
    t: "p",
    text: "Dos factores que en Mendoza pesan más que el promedio y que conviene hablar explícitamente: el **granizo**, que incide en la elección de módulo, en la estructura y en la cobertura del seguro, y el **polvo**, que reduce la generación y define cada cuánto hay que limpiar.",
  },
  {
    t: "p",
    text: "A eso se suma la sombra, que en los departamentos urbanos densos suele ser la restricción principal y que hay que evaluar pensando en el invierno, cuando el sol está más bajo, no en el día de la visita.",
  },
];

export default function PilarMendoza() {
  return (
    <PageShell
      crumbs={[{ label: "Paneles solares en Mendoza" }]}
      h1="Paneles solares en Mendoza"
      intro="Qué conviene saber antes de pedir presupuestos: cómo se dimensiona un sistema, qué define realmente el ahorro, cómo es el trámite provincial y cómo comparar cotizaciones."
    >
      <Blocks blocks={BLOQUES} />

      <RelatedLinks
        title="Según tu tipo de proyecto"
        items={SERVICIOS.map((s) => ({
          href: `/servicios/${s.slug}`,
          title: s.h1,
          text: s.intro,
        }))}
      />

      <RelatedLinks
        title="Por zona"
        items={ZONAS.map((z) => ({ href: `/zonas/${z.slug}`, title: z.nombre, text: z.intro }))}
      />

      <RelatedLinks
        title="Herramientas y guías"
        items={[
          {
            href: "/calculadora-ahorro-solar-mendoza",
            title: "Calculadora de ahorro",
            text: "Estimación orientativa según la potencia del sistema.",
          },
          {
            href: "/blog",
            title: "Blog",
            text: "Trámite ante el EPRE, dimensionamiento y proyectos industriales.",
          },
        ]}
      />
    </PageShell>
  );
}
