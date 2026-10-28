import Link from "next/link";
import { Home, Factory, Lightbulb, Sprout } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { SERVICIOS } from "@/content/servicios";

/**
 * Las tarjetas salen de la misma fuente que genera /servicios/[slug], así que
 * no pueden quedar desincronizadas con las páginas reales. Antes eran tres
 * tarjetas hardcodeadas con un botón "Saber más" que no llevaba a ningún lado.
 */
const ICONOS: Record<string, React.ReactNode> = {
  "paneles-solares-residenciales": <Home />,
  "paneles-solares-industriales": <Factory />,
  "energia-solar-campo-riego": <Sprout />,
  "asesoria-energias-renovables": <Lightbulb />,
};

export default function Services() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl font-extrabold">
        Instalación de paneles solares en Mendoza
      </h2>
      <p className="mt-3 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
        Dimensionamos sobre tu consumo real, no sobre un paquete estándar. Elegí por
        tipo de proyecto.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICIOS.map((s) => (
          <ServiceCard
            key={s.slug}
            icon={ICONOS[s.slug]}
            title={s.nombre}
            description={s.intro}
            href={`/servicios/${s.slug}`}
          />
        ))}
      </div>

      <p className="mt-8 text-sm">
        <Link
          href="/paneles-solares-mendoza"
          className="text-emerald-700 dark:text-emerald-400 underline underline-offset-2 hover:no-underline"
        >
          Guía completa: todo lo que conviene saber antes de pedir presupuestos
        </Link>
      </p>
    </section>
  );
}
