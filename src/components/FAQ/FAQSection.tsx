import FAQItem from "./FAQItem";

type QA = { q: string; a: string };
type Props = { items?: QA[]; title?: string; description?: string; moreHref?: string };

const DEFAULTS: QA[] = [
  {
    q: "¿Cuánto cuesta instalar paneles fotovoltaicos?",
    a: "Depende del tamaño del sistema y de tu perfil de consumo. En residencial, un sistema típico puede recuperar la inversión en 2–6 años. Lo que define el tamaño es tu consumo anual en kWh, no los metros de techo.",
  },
  {
    q: "¿Qué beneficios tiene la asesoría en energías renovables?",
    a: "Definimos el dimensionamiento óptimo, costos, ROI estimado, y coordinamos permisos e instalación certificada. También incluimos soporte y monitoreo.",
  },
  {
    q: "¿Cómo calcular el ahorro con sistemas solares?",
    a: "Usá la calculadora para una estimación rápida: te muestra el mínimo y el máximo que podrías ahorrar. Para una propuesta a medida necesitamos tus últimas doce facturas, que es de donde sale el consumo anual real.",
  },
];

export default function FAQSection({
  items = DEFAULTS,
  title = "Preguntas frecuentes",
  description = "Respuestas rápidas sobre costos, instalación y ahorro.",
  moreHref = "/faqs",
}: Props) {
  // FAQPage se genera desde los mismos `items` que se renderizan, para que el
  // schema nunca se desincronice del contenido visible (Google lo exige).
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto" aria-labelledby="faq-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <header className="text-center max-w-2xl mx-auto">
        <h2 id="faq-title" className="text-2xl sm:text-3xl font-extrabold">
          {title}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">{description}</p>
      </header>

      <div className="mt-8 grid gap-4">
        {items.map((it, idx) => (
          <FAQItem key={idx} question={it.q} answer={it.a} />
        ))}
      </div>
      {/*}
      <div className="mt-8 text-center">
        <a
          href={moreHref}
          className="inline-block px-5 py-2 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          Ver todas las FAQs
        </a>
      </div>
      */}
    </section>
  );
}
