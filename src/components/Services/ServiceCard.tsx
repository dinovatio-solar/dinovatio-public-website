import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  /** Destino de la tarjeta. Antes "Saber más" era un <button> sin acción. */
  href: string;
};

export default function ServiceCard({ icon, title, description, href }: Props) {
  const titleId = `service-${href.split("/").pop()}-title`;

  return (
    <article
      className="
        group rounded-2xl border border-black/10 dark:border-white/10
        bg-white dark:bg-neutral-900
        shadow-sm hover:shadow-md
        transition-shadow transition-colors
      "
      aria-labelledby={titleId}
    >
      <div className="p-6 flex h-full flex-col items-center text-center">
        <div
          className="
            mb-4 inline-flex h-12 w-12 items-center justify-center
            rounded-xl bg-neutral-50 dark:bg-neutral-800
            text-green-600 dark:text-green-500
          "
          aria-hidden
        >
          {icon}
        </div>

        <h3
          id={titleId}
          className="text-lg font-semibold text-neutral-900 dark:text-neutral-100"
        >
          {title}
        </h3>

        <p className="mt-2 flex-1 text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>

        <Link
          href={href}
          className="
            mt-4 inline-flex items-center gap-1 px-4 py-2 text-sm rounded-md
            bg-green-600 hover:bg-green-700
            text-white
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60
            transition-colors
          "
        >
          Ver más
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
