import StoryCard, { type Story } from "./StoryCard";
import residencial from "@public/assets/residencial.png"
import pymecordoba from "@public/assets/pymecordoba.png"
import mendoza from "@public/assets/mendoza.png"

type Props = { items?: Story[]; title?: string; description?: string };

const FALLBACK: Story[] = [
  {
    id: "residencial-1",
    title: "Familia en Buenos Aires",
    subtitle: "Sistema 5 kWp · Techo inclinado",
    image: residencial,
    alt: "Instalación residencial de paneles solares",
    kpi: [
      { label: "Ahorro en factura", value: "60%" },
      { label: "CO₂ evitado/año", value: "1.2 t" },
    ],
    quote: "Bajamos muchísimo los costos y ya vemos el impacto.",
    author: "Mariana F.",
  },
  {
    id: "pymes-1",
    title: "PyME en Córdoba",
    subtitle: "15 kWp · ROI acelerado",
    image: pymecordoba,
    alt: "Instalación fotovoltaica en PyME",
    kpi: [
      { label: "ROI estimado", value: "3 años" },
      { label: "Producción anual", value: "22 MWh" },
    ],
    quote: "El flujo de caja mejoró y el sistema es estable.",
    author: "Germán D., CFO",
  },
  {
    id: "industrial-1",
    title: "Industria en Mendoza",
    subtitle: "150 kWp · Techo nave",
    image: mendoza,
    alt: "Techos industriales con paneles solares",
    kpi: [
      { label: "CO₂ evitado/año", value: "50 t" },
      { label: "Ahorro anual", value: "ARS 18M" },
    ],
    quote: "La inversión se justificó por ahorro y sustentabilidad.",
    author: "Lucía V., Operaciones",
  },
];

export default function SuccessStories({
  items = FALLBACK,
  title = "Historias reales de ahorro energético",
  description = "Resultados concretos en hogares, PyMEs e industrias de Latinoamérica.",
}: Props) {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <header className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold">{title}</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">{description}</p>
      </header>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}
