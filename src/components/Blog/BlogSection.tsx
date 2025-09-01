import BlogCard, { type Post } from "./BlogCard";

type Props = { posts?: Post[]; title?: string; description?: string; ctaHref?: string };

const DEMO: Post[] = [
  {
    slug: "guia-calculo-consumo-residencial",
    title: "Guía para calcular tu consumo solar residencial",
    excerpt: "Aprende a estimar tu consumo mensual y el tamaño de sistema recomendado.",
    cover: "/placeholders/blog-1.jpg",
    alt: "Paneles en techo de vivienda",
    date: "2025-07-18",
    minutes: 5,
  },
  {
    slug: "beneficios-industriales-fotovoltaica",
    title: "Beneficios industriales de la energía fotovoltaica",
    excerpt: "Ahorro, estabilidad de costos y metas ESG para tu operación.",
    cover: "/placeholders/blog-2.jpg",
    alt: "Planta industrial con paneles",
    date: "2025-06-10",
    minutes: 6,
  },
  {
    slug: "mitos-comunes-paneles-solares",
    title: "Mitos comunes sobre paneles solares (y la verdad)",
    excerpt: "Desmentimos mitos para que tomes decisiones con datos.",
    cover: "/placeholders/blog-3.jpg",
    alt: "Detalle de panel fotovoltaico",
    date: "2025-05-30",
    minutes: 4,
  },
];

export default function BlogSection({
  posts = DEMO,
  title = "Blog & recursos educativos",
  description = "Contenido para ayudarte a planificar tu sistema y maximizar el ahorro.",
  ctaHref = "/blog",
}: Props) {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <header className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold">{title}</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">{description}</p>
      </header>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href={ctaHref}
          className="inline-block px-5 py-2 rounded-xl bg-brand.blue text-white hover:bg-blue-700"
        >
          Ver más artículos
        </a>
      </div>
    </section>
  );
}
