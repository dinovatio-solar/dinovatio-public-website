import type { ReactNode } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import StickyCTA from "@/components/CTA/StickyCTA";
import FinalCTA from "@/components/CTA/FinalCTA";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

type Props = {
  crumbs: Crumb[];
  h1: string;
  /** Entradilla bajo el H1. */
  intro?: string;
  /** Línea de contexto sobre el H1 (categoría, fecha, lectura). */
  eyebrow?: ReactNode;
  children: ReactNode;
};

/**
 * Marco común de las subpáginas: misma barra, pie y CTA que la home, con el
 * contenido en una columna de lectura.
 */
export default function PageShell({ crumbs, h1, intro, eyebrow, children }: Props) {
  return (
    <main>
      <Navbar />

      <article className="mx-auto max-w-3xl px-4 pt-10 pb-4">
        <Breadcrumbs items={crumbs} />

        <header className="mt-6">
          {eyebrow ? (
            <div className="text-sm text-neutral-500 dark:text-neutral-400">{eyebrow}</div>
          ) : null}
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">{h1}</h1>
          {intro ? (
            <p className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
              {intro}
            </p>
          ) : null}
        </header>

        <div className="mt-2">{children}</div>
      </article>

      <div className="mt-16">
        <FinalCTA />
      </div>

      <Footer />
      <StickyCTA />
    </main>
  );
}
