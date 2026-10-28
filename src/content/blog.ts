import type { Post } from "./types";

/**
 * ⚠️ REVISAR ANTES DE PUBLICAR
 *
 * Criterio con el que están escritos estos artículos:
 *
 *  - No hay precios. Se mueven con el tipo de cambio y un número viejo en una
 *    página indexada hace más daño que no tener número.
 *  - No hay porcentajes de ahorro presentados como promesa. Donde aparecen
 *    cifras del sitio, se dicen como estimación propia y con sus condiciones.
 *  - Los datos del régimen de generación distribuida llevan fuente y fecha,
 *    porque el circuito administrativo cambia. El artículo del trámite es el
 *    que más rápido se desactualiza: conviene revisarlo contra el sitio del
 *    EPRE cada seis meses.
 *  - Las fechas de `publicado` quedaron en la de la primera redacción. Si se
 *    publica más adelante, actualizarlas: una fecha futura o muy vieja afecta
 *    cómo se muestra el resultado en Google.
 *
 * Falta, y lo tiene que aportar la empresa: casos propios con números reales.
 * Es lo que diferenciaría estos artículos de cualquier otro del rubro.
 */
export const POSTS: Post[] = [
  {
    slug: "tramite-usuario-generador-mendoza",
    title: "Cómo es el trámite de usuario generador en Mendoza, paso a paso",
    seoTitle: "Trámite de usuario generador en Mendoza (EPRE): guía paso a paso",
    description:
      "Qué es un usuario generador, por dónde se inicia el trámite en Mendoza, qué papel juegan el EPRE, la distribuidora y el municipio, y cuánto demora cada etapa.",
    publicado: "2026-10-28",
    lectura: 8,
    tags: ["Normativa", "EPRE", "Generación distribuida"],
    bloques: [
      {
        t: "p",
        text: "Si instalás paneles solares y querés inyectar a la red lo que no consumís, necesitás convertirte en **usuario generador**. No es un trámite opcional ni un detalle: define si vas a tener medidor bidireccional y si los excedentes se te van a acreditar en la factura.",
      },
      {
        t: "p",
        text: "La confusión más habitual es creer que el trámite arranca en la distribuidora. En Mendoza arranca en el EPRE, el ente regulador provincial.",
      },
      { t: "h2", text: "Qué es un usuario generador" },
      {
        t: "p",
        text: "Es el titular de un suministro conectado a la red que además tiene equipamiento de generación renovable. La figura la crea la **Ley nacional 27.424**, de fomento a la generación distribuida, a la que Mendoza adhirió con su propia norma provincial.",
      },
      {
        t: "p",
        text: "La idea de fondo es simple: tu medidor pasa a contar en los dos sentidos. Cuando consumís más de lo que generás, tomás de la red; cuando generás más de lo que consumís, inyectás y eso se te reconoce. Por eso hace falta un medidor bidireccional y por eso hace falta autorización.",
      },
      { t: "h2", text: "Quiénes intervienen" },
      {
        t: "table",
        head: ["Actor", "Qué resuelve"],
        rows: [
          [
            "**EPRE**",
            "Es la puerta de entrada. Recibe la Solicitud de Estudio Técnico y coordina las autorizaciones.",
          ],
          [
            "**Distribuidora** (EDEMSA, EDESTE, cooperativa según zona)",
            "Evalúa la conexión y la reserva de potencia, y después instala el medidor bidireccional.",
          ],
          [
            "**Municipio**",
            "Otorga el permiso de obra y comunica la aprobación al usuario, a la distribuidora y al EPRE.",
          ],
          [
            "**Instalador**",
            "Elabora la documentación técnica del proyecto: esquema unifilar, memoria y protecciones.",
          ],
        ],
      },
      {
        t: "p",
        text: "Que intervengan tres organismos es la razón por la que el trámite demora: cada uno tiene su propio plazo y algunas etapas no pueden empezar hasta que termine la anterior.",
      },
      { t: "h2", text: "El circuito, etapa por etapa" },
      {
        t: "ol",
        items: [
          "**Solicitud de Estudio Técnico (SET).** Se completa el formulario web en la sección de Recursos de Energía Distribuida del sitio del EPRE. Se identifica el suministro con el DNI o CUIT del titular, o con el número de suministro.",
          "**Evaluación técnica.** Se analiza si el punto de conexión admite la potencia que querés instalar. Acá puede aparecer una reserva de potencia por parte de la distribuidora.",
          "**Permiso municipal.** Se tramita en el municipio donde está el inmueble, y su aprobación se comunica a la distribuidora y al EPRE.",
          "**Ejecución de la instalación**, conforme al proyecto aprobado.",
          "**Medidor bidireccional.** La distribuidora lo coloca una vez aprobada la conexión.",
          "**Contrato de usuario generador.** Es la firma que habilita formalmente la inyección de excedentes.",
        ],
      },
      {
        t: "callout",
        title: "El orden importa",
        text: "Comprar los equipos antes de saber si el punto de conexión admite la potencia que querés es el error más caro de esta lista. La evaluación técnica va primero.",
      },
      { t: "h2", text: "Cuánto demora" },
      {
        t: "p",
        text: "No hay un plazo único y depende de la carga de trabajo de cada organismo, del municipio que corresponda y de la calidad de la documentación presentada. Una carpeta incompleta es la causa más frecuente de demora, porque reinicia el ida y vuelta.",
      },
      {
        t: "p",
        text: "Lo que conviene asumir es que es un trámite de varias semanas y que corre en paralelo a la compra de equipos, no después. Cualquier instalador con experiencia en la provincia debería poder darte un rango realista para tu caso particular.",
      },
      { t: "h2", text: "Cuánta generación distribuida hay en Mendoza" },
      {
        t: "p",
        text: "Para dimensionar de qué estamos hablando: el EPRE informó que la generación distribuida fotovoltaica provincial alcanzó los **3,4 MW de potencia instalada**. El gobierno provincial, por su parte, reportó **487 usuarios generadores hasta enero de 2023**, con un crecimiento del 23% respecto del período anterior.",
      },
      {
        t: "p",
        text: "Son números chicos para una provincia con la irradiación de Mendoza, y es justamente lo que explica el crecimiento: la base de comparación es baja y las tarifas vienen subiendo.",
      },
      { t: "h2", text: "Antes de empezar" },
      {
        t: "p",
        text: "Tres cosas que conviene tener resueltas antes de iniciar el trámite:",
      },
      {
        t: "ul",
        items: [
          "**El suministro tiene que estar a tu nombre.** Si alquilás o si es un PH, hay que resolver la titularidad primero.",
          "**Sin deuda con la distribuidora**, que es un requisito habitual para avanzar.",
          "**La documentación técnica completa**, firmada por quien corresponda.",
        ],
      },
      {
        t: "callout",
        title: "Verificá los requisitos vigentes",
        text: "La normativa de generación distribuida se actualiza, tanto a nivel provincial como nacional. Los pasos de esta guía describen el circuito general; los requisitos puntuales, formularios y límites de potencia conviene confirmarlos en el [sitio del EPRE](https://epremendoza.gob.ar/usuariogenerador/) antes de presentar.",
      },
    ],
    faqs: [
      {
        q: "¿Puedo instalar paneles sin hacer el trámite de usuario generador?",
        a: "Técnicamente podrías instalar un sistema aislado que no se conecte a la red, pero si está conectado y querés inyectar excedentes, el trámite es obligatorio y es lo que habilita el medidor bidireccional.",
      },
      {
        q: "¿El trámite lo hago yo o lo hace el instalador?",
        a: "Lo puede hacer cualquiera de los dos, pero la documentación técnica tiene que elaborarla quien diseña la instalación. Conviene acordar explícitamente quién se encarga, porque es una causa habitual de malentendidos.",
      },
      {
        q: "¿Qué pasa si alquilo la propiedad?",
        a: "El trámite se asocia al titular del suministro, así que hay que acordarlo con el propietario antes de avanzar, incluyendo qué sucede con la instalación al terminar el contrato.",
      },
      {
        q: "¿Hay límite de potencia que puedo instalar?",
        a: "Sí, el régimen contempla límites vinculados a la potencia contratada y a la capacidad del punto de conexión. El valor aplicable a tu caso surge de la evaluación técnica, y conviene confirmar los topes vigentes en el EPRE.",
      },
    ],
    fuentes: [
      {
        titulo: "EPRE Mendoza — Usuario Generador",
        url: "https://epremendoza.gob.ar/usuariogenerador/",
      },
      {
        titulo:
          "EPRE — La generación distribuida fotovoltaica alcanzó en Mendoza los 3,4 MW de potencia instalada",
        url: "https://epremendoza.gob.ar/la-generacion-distribuida-fotovoltaica-alcanzo-en-mendoza-los-34-mw-de-potencia-instalada/",
      },
      {
        titulo:
          "Gobierno de Mendoza — Creció 23% la cantidad de usuarios que generan su propia energía",
        url: "https://www.mendoza.gov.ar/prensa/crecio-un-23-la-cantidad-de-usuarios-que-generan-su-propia-energia/",
      },
    ],
  },

  {
    slug: "como-calcular-tu-consumo-electrico",
    title: "Cómo leer tu factura de luz para saber qué sistema solar necesitás",
    description:
      "Los tres datos de tu factura que definen el tamaño del sistema solar, cómo estimar tu perfil horario y por qué el consumo anual importa más que el del último mes.",
    publicado: "2026-10-28",
    lectura: 6,
    tags: ["Guías", "Ahorro"],
    bloques: [
      {
        t: "p",
        text: "Casi todas las conversaciones sobre paneles solares empiezan mal, por la misma pregunta: *¿cuántos paneles necesito?* Es como preguntar cuántos litros de nafta necesita un auto sin decir cuántos kilómetros vas a hacer.",
      },
      {
        t: "p",
        text: "La respuesta está en tu factura. Te alcanza con tres datos.",
      },
      { t: "h2", text: "Dato 1: el consumo en kWh" },
      {
        t: "p",
        text: "El kilovatio hora es la unidad de energía, y es el número que define el tamaño del sistema. Buscá en tu factura el consumo del período, que suele estar como *consumo registrado* o *energía consumida*.",
      },
      {
        t: "p",
        text: "Importante: **no uses un solo mes**. El consumo varía mucho a lo largo del año, sobre todo si tenés climatización. Juntá doce facturas y sumá los kWh. Si no las tenés todas, muchas distribuidoras muestran el historial de consumo en la propia factura o en su oficina virtual.",
      },
      {
        t: "callout",
        title: "Atajo útil",
        text: "Si solo conseguís algunos meses, tomá uno de verano y uno de invierno y promedialos. Es más representativo que usar dos meses seguidos de la misma estación.",
      },
      { t: "h2", text: "Dato 2: el cargo variable" },
      {
        t: "p",
        text: "Es cuánto te cuesta cada kWh. Lo vas a encontrar como *cargo variable* o *cargo por energía*, expresado en pesos por kWh. Este es el número que convierte energía en dinero: el ahorro de tu sistema es, en esencia, los kWh que dejás de comprar multiplicados por ese valor.",
      },
      {
        t: "p",
        text: "Ojo con una trampa: tu factura también tiene cargos fijos, impuestos y tasas. **El sistema solar no reduce los cargos fijos.** Por eso una instalación que cubre el 70% de tu energía no baja tu factura un 70%: baja la parte variable, no el total.",
      },
      { t: "h2", text: "Dato 3: tu perfil horario" },
      {
        t: "p",
        text: "Este no figura en la factura, pero es el que más cambia el resultado. Los paneles generan de día. Si consumís de noche, esa energía se inyecta a la red en lugar de usarse directamente, y la energía inyectada no se valoriza igual que la que consumís en el momento.",
      },
      {
        t: "p",
        text: "No hace falta precisión: alcanza con estimar qué porcentaje de tu consumo ocurre de mañana, de tarde y de noche. Para hacerlo, pensá en tus equipos de mayor consumo y a qué hora funcionan.",
      },
      {
        t: "table",
        head: ["Equipo", "Cuándo suele consumir"],
        rows: [
          ["Aire acondicionado", "Tarde y noche en verano. Buena coincidencia parcial con el sol."],
          ["Termotanque eléctrico", "Depende del uso. Se puede desplazar a horas de sol."],
          ["Bomba de pileta", "Programable. Es el consumo más fácil de mover al mediodía."],
          ["Heladera y freezer", "Continuo, día y noche."],
          ["Horno eléctrico, lavarropas, secarropas", "Concentrado, y en general desplazable."],
          ["Iluminación", "Noche, casi por definición."],
        ],
      },
      { t: "h2", text: "Lo que podés hacer con esos tres números" },
      {
        t: "p",
        text: "Con el consumo anual, el cargo variable y una estimación del perfil horario, se puede calcular la potencia que tiene sentido instalar, la superficie mínima de techo que requiere y un rango de ahorro esperable. Es exactamente lo que alimenta nuestra [calculadora de ahorro](/calculadora-ahorro-solar-mendoza).",
      },
      { t: "h2", text: "Un consumo que podés optimizar antes de invertir" },
      {
        t: "p",
        text: "Vale la pena decirlo aunque vendamos sistemas solares: **mover consumo a las horas de sol es gratis y mejora el retorno de cualquier instalación**. Programar el lavarropas, la bomba de pileta o el termotanque al mediodía aumenta el autoconsumo sin agregar un solo panel.",
      },
      {
        t: "p",
        text: "Si además tenés consumos que podés eliminar o reemplazar por equipos más eficientes, hacerlo antes de dimensionar evita pagar por un sistema más grande del necesario.",
      },
    ],
    faqs: [
      {
        q: "¿Por qué no alcanza con mirar el último mes?",
        a: "Porque el consumo es estacional. Dimensionar sobre un mes de verano sobredimensiona el sistema, y sobre uno templado lo deja corto. El dato correcto es el consumo anual.",
      },
      {
        q: "Si cubro el 70% de mi energía, ¿mi factura baja 70%?",
        a: "No. Los cargos fijos, impuestos y tasas no se reducen con la generación propia. Baja la porción variable de la factura, que es la que corresponde a los kWh consumidos.",
      },
      {
        q: "¿Dónde consigo mis facturas anteriores?",
        a: "En la oficina virtual de tu distribuidora. Muchas facturas además incluyen un gráfico con el historial de consumo de los últimos meses, que sirve igual para estimar.",
      },
    ],
  },

  {
    slug: "paneles-solares-bodegas-mendoza",
    title: "Energía solar en bodegas: por qué el calendario vitivinícola ayuda",
    description:
      "Cómo se dimensiona un sistema fotovoltaico para una bodega en Mendoza, por qué la estacionalidad de la vendimia favorece el autoconsumo y qué hacer con el frío.",
    publicado: "2026-10-28",
    lectura: 7,
    tags: ["Industria", "Vitivinícola"],
    bloques: [
      {
        t: "p",
        text: "De todos los sectores productivos de Mendoza, el vitivinícola es probablemente el que mejor encaja con la energía solar. No por una cuestión de imagen, sino por una coincidencia concreta de calendarios.",
      },
      { t: "h2", text: "La coincidencia que importa" },
      {
        t: "p",
        text: "Un sistema fotovoltaico genera más en los meses de mayor irradiación, es decir en verano. Una bodega tiene su pico de consumo en vendimia y en el procesamiento inmediatamente posterior, que caen justamente en esa parte del año.",
      },
      {
        t: "p",
        text: "Eso significa que **la generación acompaña a la demanda en lugar de ir a contramano**, que es el problema típico de una vivienda, donde el pico de consumo es nocturno e invernal. Cuanto mayor es la coincidencia entre lo que generás y lo que consumís en el mismo momento, mejor rinde la inversión, porque el autoconsumo se valoriza más que la inyección de excedentes.",
      },
      { t: "h2", text: "Por qué no se dimensiona con el promedio anual" },
      {
        t: "p",
        text: "Es el error más común en proyectos con consumo estacional. Si tomás el consumo anual y lo dividís por doce, obtenés un número que no describe ningún mes real: queda muy por encima de los meses tranquilos y muy por debajo del pico de vendimia.",
      },
      {
        t: "p",
        text: "Un sistema dimensionado sobre ese promedio va a quedar corto justo cuando más conviene generar, y sobrado el resto del año, inyectando excedentes que se valorizan menos. Lo correcto es trabajar con el consumo mes a mes y, si la distribuidora la provee, con la curva de carga horaria.",
      },
      {
        t: "callout",
        title: "Qué pedirle a tu distribuidora",
        text: "Si tu suministro es de mediana o gran demanda, pedí la curva de carga. Es el insumo que convierte un dimensionamiento aproximado en uno preciso.",
      },
      { t: "h2", text: "El frío es otra conversación" },
      {
        t: "p",
        text: "Donde hay cámaras de frío o control de temperatura en fermentación, la energía deja de ser solamente un costo y se vuelve un riesgo operativo. Un corte prolongado no significa solo dejar de producir: puede significar perder producto.",
      },
      {
        t: "p",
        text: "Conviene separar las dos decisiones. **Reducir el costo energético** se resuelve con un sistema on-grid, que es lo más simple y de recupero más rápido. **Tener respaldo ante cortes** es otro problema, que requiere baterías o grupo electrógeno, y que se puede resolver respaldando únicamente la carga crítica en lugar de toda la planta. Mezclar las dos cosas lleva a sistemas caros que resuelven mal ambos objetivos.",
      },
      { t: "h2", text: "El techo, que suele ser el límite real" },
      {
        t: "p",
        text: "En naves y galpones la restricción normalmente no es económica sino física: cuánta superficie útil hay. Y útil no es lo mismo que total. Hay que descontar claraboyas, conductos, equipos de clima y los pasillos necesarios para el mantenimiento.",
      },
      {
        t: "p",
        text: "Como referencia de orden de magnitud, un sistema de 100 kW necesita algo más de 500 m² de superficie aprovechable. Antes de montar también hay que verificar el estado de la chapa y de la estructura: si el techo va a necesitar intervención en los próximos años, coordinar las dos obras es muy preferible a desmontar el sistema después.",
      },
      { t: "h2", text: "Riego, que a veces pesa más que la bodega" },
      {
        t: "p",
        text: "Si el establecimiento tiene superficie cultivada propia, el consumo de riego puede ser comparable al de la planta, y tiene la ventaja de ser fuertemente diurno y estacional. En fincas sin conexión a la red, el bombeo solar es la aplicación más directa, porque el reservorio de agua cumple la función de almacenamiento. Lo tratamos en [energía solar para campo y riego](/servicios/energia-solar-campo-riego).",
      },
      { t: "h2", text: "Qué conviene tener antes de pedir una propuesta" },
      {
        t: "ul",
        items: [
          "Facturas de los últimos doce meses, para ver el consumo mes a mes.",
          "Curva de carga, si tu categoría tarifaria la tiene disponible.",
          "Planta del techo o superficie aproximada, con los obstáculos marcados.",
          "Antigüedad y estado de la cubierta.",
          "Qué cargas no pueden quedarse sin alimentación, si hay alguna.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Conviene dimensionar para vendimia o para el promedio del año?",
        a: "Se analiza mes a mes. Dimensionar sobre el promedio anual deja el sistema corto en el pico y sobrado el resto del año, que es el peor de los dos mundos.",
      },
      {
        q: "¿Necesito baterías para proteger las cámaras de frío?",
        a: "Son dos decisiones distintas. El ahorro se resuelve con un sistema on-grid; el respaldo ante cortes requiere baterías o grupo, y conviene evaluarlo solo para la carga crítica.",
      },
      {
        q: "¿Se puede instalar sin parar la producción?",
        a: "El montaje sobre techo se hace con la planta en marcha. Solo la conexión final al tablero requiere una ventana de corte acotada, que se coordina con la bodega.",
      },
    ],
  },

  {
    slug: "cuantos-paneles-necesito",
    title: "Cuántos paneles necesito: lo que realmente define el tamaño",
    description:
      "Por qué la cantidad de paneles es la última decisión y no la primera, cómo se pasa de kWh de consumo a kW de sistema, y qué significa la relación DC/AC.",
    publicado: "2026-10-28",
    lectura: 6,
    tags: ["Guías", "Dimensionamiento"],
    bloques: [
      {
        t: "p",
        text: "La cantidad de paneles es el resultado del dimensionamiento, no el punto de partida. Y además es el dato menos estable de todos: a medida que los módulos aumentan su potencia, el mismo sistema necesita cada vez menos paneles. Lo que no cambia es la potencia total en kW.",
      },
      { t: "h2", text: "De kWh a kW" },
      {
        t: "p",
        text: "Hay dos unidades que se confunden todo el tiempo y conviene separarlas:",
      },
      {
        t: "ul",
        items: [
          "**kW (kilovatio)** es potencia: la capacidad instantánea del sistema. Es lo que se cotiza.",
          "**kWh (kilovatio hora)** es energía: potencia por tiempo. Es lo que aparece en tu factura.",
        ],
      },
      {
        t: "p",
        text: "El puente entre las dos es cuántas horas equivalentes de sol pleno recibe tu ubicación a lo largo del año. Mendoza está entre las zonas de mejor irradiación del país, lo que significa que cada kW instalado produce más kWh por año que el mismo kW instalado en el litoral o en la Patagonia.",
      },
      {
        t: "callout",
        title: "Sobre los valores de irradiación",
        text: "Cuando veas una estimación de generación, pedí que te digan qué valor de irradiación usaron y de dónde lo sacaron. Es el supuesto que más mueve el resultado, y el que más se usa de manera arbitraria.",
      },
      { t: "h2", text: "Los factores que ajustan el cálculo" },
      {
        t: "p",
        text: "Dos sistemas de la misma potencia, en la misma ciudad, pueden generar bastante distinto. Lo que explica la diferencia:",
      },
      {
        t: "table",
        head: ["Factor", "Efecto"],
        rows: [
          ["Orientación", "En el hemisferio sur, el norte es el óptimo. Este u oeste reducen la generación anual."],
          ["Inclinación", "Afecta el reparto entre verano e invierno además del total."],
          ["Sombras", "El factor más subestimado. Una sombra parcial puede afectar a toda una cadena en serie."],
          ["Temperatura", "Los módulos pierden eficiencia con el calor. Importa en los días más calurosos."],
          ["Polvo y suciedad", "Reduce la generación. En Mendoza no es despreciable."],
          ["Pérdidas del sistema", "Cableado, inversor y conexiones. Un porcentaje inevitable."],
        ],
      },
      { t: "h2", text: "La superficie de techo como restricción" },
      {
        t: "p",
        text: "Como regla de orden de magnitud, hacen falta entre 5 y 6 m² de superficie aprovechable por cada kW instalado. Un sistema residencial de 5 kW ronda los 27 m²; uno de 10 kW, unos 54 m².",
      },
      {
        t: "p",
        text: "Esa superficie es la efectivamente usable: hay que descontar tanque de agua, chimeneas, conductos, bordes y el espacio de circulación para montaje y mantenimiento.",
      },
      { t: "h2", text: "Relación DC/AC: por qué el inversor suele ser más chico" },
      {
        t: "p",
        text: "Es normal que la potencia de los paneles sea mayor que la del inversor, y no es un error de cotización. Los módulos alcanzan su potencia nominal solo en condiciones ideales, que ocurren pocas horas al año. Instalar algo más de potencia en paneles que en inversor aprovecha mejor el equipo durante el resto del tiempo.",
      },
      {
        t: "p",
        text: "El punto es que esa relación esté explícita en el presupuesto. Si una cotización menciona una sola cifra de kW sin aclarar si es de módulos o de inversor, pedí las dos: es la forma más común de que dos presupuestos parezcan comparables cuando no lo son.",
      },
      { t: "h2", text: "El tamaño óptimo no es el máximo" },
      {
        t: "p",
        text: "Un error frecuente, sobre todo cuando hay techo de sobra, es querer instalar todo lo que entra. Pero la energía que se inyecta a la red no se valoriza igual que la que consumís en el momento, así que a partir de cierto punto agrandar el sistema mejora cada vez menos el retorno.",
      },
      {
        t: "p",
        text: "El tamaño que conviene es el que mejor equilibra tu consumo, tu perfil horario y la inversión. Si querés una primera aproximación, podés usar la [calculadora de ahorro](/calculadora-ahorro-solar-mendoza), y el detalle de cómo leer tu factura está en [esta guía](/blog/como-calcular-tu-consumo-electrico).",
      },
    ],
    faqs: [
      {
        q: "¿Cuántos paneles necesito para una casa?",
        a: "No hay un número general: depende del consumo anual en kWh y del perfil horario. Y como la potencia por panel aumenta con el tiempo, el dato estable es la potencia total del sistema en kW, no la cantidad de módulos.",
      },
      {
        q: "¿Por qué el inversor es de menos kW que los paneles?",
        a: "Porque los módulos solo alcanzan su potencia nominal en condiciones ideales, pocas horas al año. Una relación DC/AC mayor a uno es una decisión de diseño normal, pero debe estar explícita en el presupuesto.",
      },
      {
        q: "Tengo mucho techo libre, ¿instalo lo máximo posible?",
        a: "No conviene como criterio. El excedente inyectado se valoriza menos que el autoconsumo, así que pasado cierto tamaño el retorno mejora poco.",
      },
    ],
  },
];

export const POST_SLUGS = POSTS.map((p) => p.slug);

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Más recientes primero. */
export function postsOrdenados(): Post[] {
  return [...POSTS].sort((a, b) => (a.publicado < b.publicado ? 1 : -1));
}
