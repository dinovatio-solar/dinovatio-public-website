"use client";
import { useRegion } from "@/components/Region/RegionProvider";

export default function Footer() {
  const { region, regions, setRegion, current } = useRegion();

  return (
    <footer id="contacto" className="mt-16 border-t border-black/5 dark:border-white/10">
      {/* Grilla principal */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        {/* Col 1 - Branding + texto, centrado vertical en desktop */}
        <div className="flex flex-col gap-3 md:h-full md:justify-center">
          <a
            href="#"
            className="flex items-center gap-2 font-extrabold tracking-tight text-xl"
            aria-label="Ir al inicio"
          >
            <img
              src="/assets/dinovatio-icon-emerald.svg"
              alt="Dinovatio"
              className="h-12 w-12 md:h-14 md:w-14 shrink-0"
            />
            <span className="flex">
              <span className="font-bold text-zinc-900 dark:text-white">DINO</span>
              <span className="font-bold text-zinc-900 dark:text-white">VATIO</span>
            </span>
          </a>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Energía solar para hogares, industrias y campo
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <h5 className="font-semibold mb-3">Links</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#calculadora">Calculadora</a></li>
            <li><a href="#faq">FAQs</a></li>
            <li><a href="#cotizar">Cotización</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h5 className="font-semibold mb-3">Contacto</h5>
          <ul className="space-y-2 text-sm">
            <li>
              Email: <a href="mailto:contacto@dinovatio.com.ar">contacto@dinovatio.com.ar</a>
            </li>
            <li>
              WhatsApp:{" "}
              <a target="_blank" href={`https://wa.me/${current.whatsapp}`}>
                {current.whatsapp}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4 - Newsletter */}
        <div>
          <h5 className="font-semibold mb-3">Newsletter</h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("¡Gracias por suscribirte!");
            }}
          >
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900"
              required
            />
            <button
              type="submit"
              className="
                mt-2 w-full py-2 rounded-lg
                bg-black text-white hover:bg-black/90
                dark:bg-white dark:text-black dark:hover:bg-white/90
                transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white
              "
            >
              Suscribirme
            </button>
          </form>
          <p className="text-xs text-neutral-500 mt-2">
            Recibe guías y novedades sobre ahorro energético.
          </p>
        </div>
      </div>

      <div className="text-center py-4 text-xs text-neutral-500 border-t border-black/5 dark:border-white/10">
        © {new Date().getFullYear()} DINOVATIO · Todos los derechos reservados.
      </div>
    </footer>
  );
}
