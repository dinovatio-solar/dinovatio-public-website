import { ShieldCheck, Leaf, Wallet, TrendingUp } from "lucide-react";

type Item = { icon: JSX.Element; title: string; desc: string };
type Props = { items?: Item[]; title?: string; description?: string };

const DEFAULTS: Item[] = [
  {
    icon: <Wallet className="text-brand.green" />,
    title: "Ahorro significativo",
    desc: "Reducción real en tu factura eléctrica desde el primer mes.",
  },
  {
    icon: <ShieldCheck className="text-brand.blue" />,
    title: "Instalación certificada",
    desc: "Equipos garantizados y estándares de seguridad industrial.",
  },
  {
    icon: <Leaf className="text-brand.green" />,
    title: "Sustentabilidad",
    desc: "Menos emisiones de CO₂ y mayor eficiencia energética.",
  },
  {
    icon: <TrendingUp className="text-brand.yellow" />,
    title: "ROI acelerado",
    desc: "Retorno estimado entre 2 y 6 años según tu perfil de consumo.",
  },
];

export default function Differentials({
  items = DEFAULTS,
  title = "Nuestros diferenciales",
  description = "Lo que hace única a la experiencia Dinovatio para hogares e industrias.",
}: Props) {
  return (
    <section className="py-16 px-4 bg-neutral-50 dark:bg-neutral-900/40">
      <div className="max-w-6xl mx-auto">
        <header className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold">{title}</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">{description}</p>
        </header>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <li
              key={i}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-950 p-5 shadow-sm"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 mb-3">
                {it.icon}
              </div>
              <h3 className="font-semibold">{it.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{it.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
