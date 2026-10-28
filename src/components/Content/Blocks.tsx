import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/content/types";

/**
 * Marcado inline mínimo: **negrita** y [texto](destino).
 * Se parsea en el servidor y se devuelve JSX, sin dangerouslySetInnerHTML.
 */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));

    if (m[1] !== undefined) {
      out.push(<strong key={k++}>{m[1]}</strong>);
    } else {
      const label = m[2];
      const href = m[3];
      const externo = /^https?:\/\//.test(href);
      out.push(
        externo ? (
          <a
            key={k++}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 dark:text-emerald-400 underline underline-offset-2 hover:no-underline"
          >
            {label}
          </a>
        ) : (
          <Link
            key={k++}
            href={href}
            className="text-emerald-700 dark:text-emerald-400 underline underline-offset-2 hover:no-underline"
          >
            {label}
          </Link>
        )
      );
    }
    last = re.lastIndex;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Ancla estable a partir del texto del encabezado, para enlazar secciones. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2": {
            const id = slugifyHeading(b.text);
            return (
              <h2
                key={i}
                id={id}
                className="scroll-mt-28 mt-12 mb-3 text-2xl sm:text-3xl font-extrabold tracking-tight"
              >
                {b.text}
              </h2>
            );
          }
          case "h3":
            return (
              <h3 key={i} className="mt-8 mb-2 text-lg sm:text-xl font-bold">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
                {inline(b.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-4 space-y-2 pl-5 list-disc text-neutral-700 dark:text-neutral-300">
                {b.items.map((it, j) => (
                  <li key={j} className="leading-relaxed">
                    {inline(it)}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-4 space-y-2 pl-5 list-decimal text-neutral-700 dark:text-neutral-300">
                {b.items.map((it, j) => (
                  <li key={j} className="leading-relaxed">
                    {inline(it)}
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="mt-6 rounded-2xl border border-emerald-200/70 dark:border-emerald-900 bg-emerald-50/70 dark:bg-emerald-950/20 px-5 py-4"
              >
                {b.title ? <p className="font-semibold">{b.title}</p> : null}
                <p className="mt-1 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {inline(b.text)}
                </p>
              </aside>
            );
          case "table":
            return (
              <div key={i} className="mt-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/15">
                      {b.head.map((h, j) => (
                        <th key={j} className="text-left font-semibold py-2 pr-4 align-bottom">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-b border-black/5 dark:border-white/10">
                        {r.map((c, l) => (
                          <td key={l} className="py-2 pr-4 align-top text-neutral-700 dark:text-neutral-300">
                            {inline(c)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </>
  );
}
