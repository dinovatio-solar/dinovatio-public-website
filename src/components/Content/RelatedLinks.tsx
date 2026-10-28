import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type RelatedItem = { href: string; title: string; text?: string };

/** Enlazado interno al pie de cada página. */
export default function RelatedLinks({
  title = "Seguir leyendo",
  items,
}: {
  title?: string;
  items: RelatedItem[];
}) {
  if (!items.length) return null;

  return (
    <section className="mt-14 border-t border-black/10 dark:border-white/10 pt-8">
      <h2 className="text-lg font-bold">{title}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="group block h-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="font-semibold inline-flex items-center gap-1">
                {it.title}
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
              {it.text ? (
                <span className="mt-1 block text-sm text-neutral-600 dark:text-neutral-400">
                  {it.text}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
