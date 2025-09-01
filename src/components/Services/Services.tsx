import { Home, Factory, Lightbulb } from "lucide-react";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-10">Nuestros Servicios Principales</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ServiceCard
          icon={<Lightbulb />}
          title="Asesoría personalizada"
          description="Te ayudamos a elegir la mejor solución renovable para tu caso."
        />
        <ServiceCard
          icon={<Home />}
          title="Instalaciones residenciales"
          description="Reduce tu factura eléctrica desde el primer día."
        />
        <ServiceCard
          icon={<Factory />}
          title="Instalaciones industriales"
          description="Eficiencia energética y ROI comprobado para tu empresa."
        />
      </div>
    </section>
  );
}
