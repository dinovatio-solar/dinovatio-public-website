import type { Metadata } from "next";
import PageShell from "@/components/Content/PageShell";
import Blocks from "@/components/Content/Blocks";
import RelatedLinks from "@/components/Content/RelatedLinks";
import SavingsQuickEstimator from "@/components/Savings/SavingsQuickEstimator";
import type { Block } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Calculadora de ahorro con paneles solares en Mendoza",
  description:
    "Estimá cuánto podés ahorrar con paneles solares en Mendoza según la potencia del sistema. Resultado orientativo, con los supuestos del cálculo a la vista.",
  path: "/calculadora-ahorro-solar-mendoza",
});

/**
 * La calculadora existía solo como ancla dentro de la home (#calculadora), así
 * que no podía rankear por "calculadora solar Mendoza" ni ser citada por
 * separado. Esta ruta le da URL propia.
 *
 * Nota: la competencia por esa consulta es el Calculador Solar del EPRE
 * (mendozaenergetica.ar), que es la fuente oficial. La estrategia no es
 * competirle de frente sino citarlo y aportar lo que no da: el paso siguiente.
 */
const ANTES: Block[] = [
  {
    t: "p",
    text: "Elegí el tipo de instalación y la potencia del sistema para ver un rango de ahorro estimado, la superficie mínima de techo que requiere y la potencia sugerida.",
  },
];

const DESPUES: Block[] = [
  { t: "h2", text: "Cómo leer este resultado" },
  {
    t: "p",
    text: "El número que da la calculadora es un **rango orientativo**, no una cotización. Sirve para saber si vale la pena seguir la conversación, no para tomar una decisión de inversión.",
  },
  {
    t: "p",
    text: "Está construido sobre una matriz de ahorro típico por potencia y sobre valores promedio de irradiación para la provincia de Mendoza. El resultado real de tu caso depende de cuatro cosas que la calculadora no conoce:",
  },
  {
    t: "ul",
    items: [
      "**Tu consumo anual real**, en kWh, que sale de tus facturas.",
      "**Tu perfil horario**: cuánto consumís de día y cuánto de noche.",
      "**Orientación, inclinación y sombras** de tu techo.",
      "**Tu tarifa**, porque el ahorro en pesos depende del cargo variable que pagás.",
    ],
  },
  {
    t: "callout",
    title: "Un recordatorio que cambia las expectativas",
    text: "Cubrir el 70% de tu energía no baja tu factura un 70%: los cargos fijos, impuestos y tasas no se reducen con generación propia. Baja la parte variable.",
  },

  { t: "h2", text: "Para una estimación más precisa" },
  {
    t: "p",
    text: "Si querés pasar de un rango a un número, el camino es juntar las últimas doce facturas. Con el consumo anual y el cargo variable se puede calcular bastante mejor. Cómo encontrar esos datos está en [cómo leer tu factura de luz](/blog/como-calcular-tu-consumo-electrico).",
  },

  { t: "h2", text: "Otras herramientas" },
  {
    t: "p",
    text: "El EPRE, ente regulador provincial, publica su propio [Calculador Solar Mendoza](https://mendozaenergetica.ar/calculador-solar), que estima generación, superficie necesaria y reducción de CO₂ a partir de la cantidad y potencia de los paneles. Es una fuente oficial y vale cruzarla con esta estimación: si los dos resultados se parecen, hay más razones para confiar en el orden de magnitud.",
  },
];

export default function CalculadoraPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de ahorro con paneles solares en Mendoza",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/calculadora-ahorro-solar-mendoza`,
    inLanguage: "es-AR",
    publisher: { "@id": `${SITE_URL}/#empresa` },
    offers: { "@type": "Offer", price: 0, priceCurrency: "ARS" },
  };

  return (
    <PageShell
      crumbs={[{ label: "Calculadora de ahorro" }]}
      h1="Calculadora de ahorro con paneles solares"
      intro="Una primera estimación en treinta segundos, sin dejar datos de contacto."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Blocks blocks={ANTES} />

      <div className="-mx-4 mt-6">
        <SavingsQuickEstimator />
      </div>

      <Blocks blocks={DESPUES} />

      <RelatedLinks
        items={[
          {
            href: "/servicios/paneles-solares-residenciales",
            title: "Paneles solares para tu casa",
            text: "Cómo se dimensiona un sistema residencial y qué incluye la instalación.",
          },
          {
            href: "/servicios/paneles-solares-industriales",
            title: "Energía solar para empresas",
            text: "Dimensionamiento sobre curva de carga y análisis de retorno.",
          },
          {
            href: "/blog/cuantos-paneles-necesito",
            title: "Cuántos paneles necesito",
            text: "De kWh de consumo a kW de sistema, y por qué el máximo no es el óptimo.",
          },
          {
            href: "/paneles-solares-mendoza",
            title: "Guía completa para Mendoza",
            text: "Trámite, comparación de presupuestos y condiciones locales.",
          },
        ]}
      />
    </PageShell>
  );
}
