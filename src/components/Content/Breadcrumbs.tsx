import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export type Crumb = { label: string; href?: string };

/**
 * Migas de pan + BreadcrumbList. Google las usa para reemplazar la URL en el
 * resultado, así que conviene que estén en todas las subpáginas.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Inicio", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Ruta de navegación" className="text-sm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex flex-wrap items-center gap-1 text-neutral-500 dark:text-neutral-400">
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className="hover:text-neutral-800 dark:hover:text-neutral-200">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-neutral-700 dark:text-neutral-300">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
