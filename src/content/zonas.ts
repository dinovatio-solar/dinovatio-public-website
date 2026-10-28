import type { Zona } from "./types";

/**
 * ⚠️ REVISAR ANTES DE PUBLICAR
 *
 * Las páginas por zona son el formato que Google castiga más rápido cuando se
 * hacen mal: si son la misma página con el nombre del departamento cambiado,
 * las trata como doorway pages y no las indexa. Por eso cada una habla de algo
 * distinto y propio de la zona, y ninguna repite los bloques de las demás.
 *
 * Lo que la empresa tiene que confirmar:
 *  1. Que efectivamente atiende estas cinco zonas. Si San Rafael o alguna otra
 *     no se cubre hoy, hay que sacarla: prometer cobertura que no existe genera
 *     leads que no se pueden atender.
 *  2. Si hay oficina, depósito o técnico radicado en alguna de ellas. Eso es
 *     contenido local genuino y conviene decirlo.
 *  3. Obras ya hechas en cada zona. Un caso real por página es lo que más
 *     diferencia estas URLs; hoy no se menciona ninguno porque no tengo el dato.
 *
 * A propósito NO se afirma nada sobre ordenanzas municipales concretas de cada
 * departamento: el permiso municipal existe y forma parte del circuito, pero
 * los requisitos puntuales varían y hay que verificarlos municipio por
 * municipio antes de publicarlos.
 */
export const ZONAS: Zona[] = [
  {
    slug: "godoy-cruz",
    nombre: "Godoy Cruz",
    title: "Paneles solares en Godoy Cruz | Instalación fotovoltaica",
    h1: "Paneles solares en Godoy Cruz",
    description:
      "Instalación de paneles solares en Godoy Cruz, Mendoza. Dimensionamiento para casas, PH y locales comerciales en zona urbana densa, con gestión del trámite ante el EPRE.",
    intro:
      "Godoy Cruz es el departamento más densamente poblado de la provincia, y eso define los proyectos: techos chicos, medianeras altas y mucha edificación alrededor.",
    bloques: [
      { t: "h2", text: "El problema acá son las sombras, no el techo" },
      {
        t: "p",
        text: "En un loteo abierto la pregunta es cuántos paneles entran. En Godoy Cruz la pregunta suele ser **cuántos van a recibir sol limpio durante todo el año**. La diferencia importa: un relevamiento hecho en diciembre puede pasar por alto la sombra que una medianera o un edificio vecino proyecta en junio, cuando el sol está mucho más bajo.",
      },
      {
        t: "p",
        text: "Por eso en zona urbana densa el relevamiento de sombras no es un trámite. Un sistema bien dimensionado con sombra no evaluada genera menos de lo prometido, y el problema aparece recién en la primera factura de invierno.",
      },
      { t: "h2", text: "Techos chicos y PH" },
      {
        t: "p",
        text: "Buena parte del stock edificado del departamento son casas de lote angosto y propiedades horizontales. Eso trae dos consecuencias prácticas. La primera es que la superficie disponible limita la potencia, así que conviene priorizar módulos de mayor potencia por metro cuadrado antes que sumar cantidad. La segunda es que en un PH hay que resolver quién es el titular del suministro y qué dice el reglamento de copropiedad sobre el uso del techo, y eso se arregla antes de comprar los equipos, no después.",
      },
      { t: "h2", text: "Locales y oficinas sobre los corredores comerciales" },
      {
        t: "p",
        text: "Para un comercio o una oficina el caso suele cerrar mejor que para una vivienda, porque el consumo es diurno: iluminación, climatización y refrigeración funcionan justo cuando el sistema genera. Si tenés un local, el análisis es más parecido al de un [proyecto comercial](/servicios/paneles-solares-industriales) que al de una casa.",
      },
      {
        t: "callout",
        title: "Lo primero que conviene mirar",
        text: "Juntá las últimas doce facturas y fijate a qué altura están las construcciones vecinas respecto de tu techo. Con eso ya se puede tener una primera conversación útil.",
      },
    ],
    faqs: [
      {
        q: "Vivo en un PH, ¿puedo instalar paneles?",
        a: "Depende de a quién corresponda el uso del techo según el reglamento de copropiedad, y de que el suministro esté a tu nombre. Conviene resolverlo antes de avanzar con el proyecto.",
      },
      {
        q: "Un edificio vecino me hace sombra a la tarde, ¿sirve igual?",
        a: "Puede servir, pero cambia el dimensionamiento. Lo que no conviene es ignorarlo: hay que medir cuántas horas de sol útil quedan en invierno, que es el peor caso del año.",
      },
      {
        q: "¿Tengo que hacer algún trámite en el municipio?",
        a: "El permiso municipal forma parte del circuito de usuario generador, junto con el EPRE y la distribuidora. Lo gestionamos como parte del proyecto.",
      },
    ],
  },

  {
    slug: "maipu",
    nombre: "Maipú",
    title: "Paneles solares en Maipú, Mendoza | Bodegas e industria",
    h1: "Paneles solares en Maipú",
    description:
      "Energía solar en Maipú, Mendoza: bodegas, plantas de procesamiento, galpones y viviendas. Dimensionamiento sobre curva de carga y gestión del trámite.",
    intro:
      "Maipú concentra bodegas y agroindustria, y eso hace que la mayoría de los proyectos de la zona sean productivos antes que residenciales.",
    bloques: [
      { t: "h2", text: "La estacionalidad de la vendimia juega a favor" },
      {
        t: "p",
        text: "Una bodega no consume parejo todo el año: el pico está en vendimia y en el procesamiento posterior. Lo interesante es que **ese pico cae en la parte del año de mayor irradiación**, así que la generación acompaña a la demanda en lugar de ir a contramano.",
      },
      {
        t: "p",
        text: "Eso cambia el dimensionamiento. Un sistema pensado sobre el consumo promedio anual puede quedar corto justo en el momento en que más conviene generar. Por eso trabajamos sobre el consumo mes a mes, y si la distribuidora la provee, sobre la curva de carga.",
      },
      { t: "h2", text: "Frío, que es la carga que no perdona" },
      {
        t: "p",
        text: "Donde hay cámaras de frío o control de temperatura en fermentación, la energía deja de ser solo un costo y pasa a ser un riesgo operativo. En esos casos tiene sentido evaluar si conviene respaldo, y con qué alcance: no es lo mismo respaldar toda la planta que respaldar únicamente la carga crítica.",
      },
      { t: "h2", text: "Techos de galpón" },
      {
        t: "p",
        text: "Los galpones y naves de la zona suelen tener la superficie que un proyecto necesita, lo que convierte al techo en el principal activo del proyecto. Hay que verificar el estado de la chapa y de la estructura antes de montar: si el techo va a necesitar intervención en los próximos años, es mucho más barato coordinar las dos obras que desmontar después.",
      },
      {
        t: "p",
        text: "El detalle de cómo encaramos un proyecto de este tipo, paso por paso, está en la página de [energía solar para industrias](/servicios/paneles-solares-industriales).",
      },
      { t: "h2", text: "Fincas y riego" },
      {
        t: "p",
        text: "En los establecimientos con superficie cultivada la aplicación más directa es el bombeo, donde el reservorio de agua reemplaza a las baterías. Lo desarrollamos en [energía solar para campo y riego](/servicios/energia-solar-campo-riego).",
      },
    ],
    faqs: [
      {
        q: "¿Conviene dimensionar para el consumo de vendimia o para el promedio del año?",
        a: "Ni uno ni otro automáticamente: se analiza el consumo mes a mes. Dimensionar sobre el promedio suele dejar corto el pico, y dimensionar sobre el pico puede sobredimensionar el resto del año.",
      },
      {
        q: "Tengo cámaras de frío, ¿necesito baterías?",
        a: "No necesariamente para ahorrar, pero sí conviene evaluar respaldo si un corte compromete producto. Una opción intermedia es respaldar solo la carga crítica en vez de toda la planta.",
      },
      {
        q: "¿Sirve para una finca sin conexión a la red?",
        a: "Sí, y en ese caso el sistema no compite contra una factura sino contra el costo de tender línea o de operar un grupo electrógeno.",
      },
    ],
  },

  {
    slug: "guaymallen",
    nombre: "Guaymallén",
    title: "Paneles solares en Guaymallén, Mendoza | Casas y galpones",
    h1: "Paneles solares en Guaymallén",
    description:
      "Instalación de paneles solares en Guaymallén: viviendas, galpones y comercios. Dimensionamiento según consumo real y gestión del trámite de usuario generador.",
    intro:
      "Guaymallén mezcla barrios residenciales extensos con zonas de galpones y depósitos, así que conviven proyectos de escala muy distinta.",
    bloques: [
      { t: "h2", text: "Dos tipos de proyecto en el mismo departamento" },
      {
        t: "p",
        text: "En los barrios residenciales el caso típico es una vivienda de lote propio, con techo disponible y menos sombra urbana que en los departamentos más densos. Ahí el factor decisivo es el perfil de consumo: cuánto de la energía se usa de día y cuánto de noche.",
      },
      {
        t: "p",
        text: "En las zonas de depósitos y galpones el planteo es otro: superficie de techo abundante, consumo diurno y un análisis que se parece más a una inversión productiva que a un ahorro doméstico.",
      },
      { t: "h2", text: "Por qué el perfil horario define el ahorro residencial" },
      {
        t: "p",
        text: "Dos casas con la misma factura pueden ahorrar muy distinto. Una familia que está afuera todo el día y consume de noche aprovecha menos su propia generación que una casa con alguien trabajando desde ahí, o con una bomba de pileta y climatización funcionando al mediodía.",
      },
      {
        t: "p",
        text: "Eso no significa que en el primer caso no convenga: significa que el dimensionamiento tiene que contemplarlo, porque el excedente inyectado y la energía autoconsumida no valen lo mismo. Si querés ver cómo se arma el cálculo, está en [paneles solares residenciales](/servicios/paneles-solares-residenciales).",
      },
      {
        t: "callout",
        title: "Un truco simple para estimar tu perfil",
        text: "Pensá qué equipos tuyos consumen más y a qué hora funcionan: termotanque, aire acondicionado, bomba, horno eléctrico. Con eso alcanza para una primera estimación del reparto entre mañana, tarde y noche.",
      },
      { t: "h2", text: "Pileta y climatización" },
      {
        t: "p",
        text: "Son dos consumos que empujan el caso a favor, porque funcionan de día y en verano, cuando el sistema genera más. Si tenés bomba de pileta o aire acondicionado con uso intensivo, mencionálo: suele mover el resultado del cálculo más de lo que la gente espera.",
      },
    ],
    faqs: [
      {
        q: "Estoy afuera todo el día, ¿me conviene igual?",
        a: "Puede convenir, pero el cálculo cambia: aprovechás menos tu propia generación y una porción mayor se inyecta a la red. Es un dato que hay que meter en el dimensionamiento desde el principio.",
      },
      {
        q: "¿Tengo que cambiar el medidor?",
        a: "Para inyectar excedente a la red hace falta medidor bidireccional, y su instalación forma parte del trámite de usuario generador ante el EPRE y la distribuidora.",
      },
      {
        q: "¿Sirve para un galpón o depósito?",
        a: "Sí, y suele cerrar mejor que una vivienda, porque el consumo es diurno. El enfoque es el de un proyecto comercial.",
      },
    ],
  },

  {
    slug: "lujan-de-cuyo",
    nombre: "Luján de Cuyo",
    title: "Paneles solares en Luján de Cuyo | Residencial e industrial",
    h1: "Paneles solares en Luján de Cuyo",
    description:
      "Energía solar en Luján de Cuyo, Mendoza: viviendas de lote amplio, bodegas y establecimientos industriales. Relevamiento técnico y gestión del trámite.",
    intro:
      "Luján de Cuyo combina zonas residenciales de lote amplio con bodegas y actividad industrial, y en ambos casos la superficie disponible deja de ser la restricción principal.",
    bloques: [
      { t: "h2", text: "Cuando el techo no es el límite" },
      {
        t: "p",
        text: "En buena parte del departamento los lotes son amplios y los techos también. Eso corre el cuello de botella a otro lado: ya no es cuántos paneles entran, sino **cuánta potencia tiene sentido instalar**. Y eso lo define el consumo, no la superficie.",
      },
      {
        t: "p",
        text: "Sobredimensionar porque hay lugar es un error frecuente y caro. La energía que se inyecta a la red no se valoriza igual que la que se autoconsume, así que un sistema más grande no mejora el retorno de manera proporcional. El punto óptimo no es el máximo que entra en el techo.",
      },
      { t: "h2", text: "Instalación en suelo" },
      {
        t: "p",
        text: "Con terreno disponible aparece la opción de montar en suelo en lugar de sobre techo. Tiene ventajas reales: orientación e inclinación óptimas sin depender de cómo esté hecho el techo, y mantenimiento mucho más cómodo. También tiene costos propios, como la estructura y la obra civil, y ocupa superficie que podría tener otro uso. Es una comparación que vale hacer explícitamente cuando el terreno lo permite.",
      },
      { t: "h2", text: "Bodegas y establecimientos productivos" },
      {
        t: "p",
        text: "Para la actividad productiva del departamento el planteo es el mismo que describimos en [energía solar para industrias](/servicios/paneles-solares-industriales): dimensionamiento sobre curva de carga, verificación estructural del techo y análisis de retorno con las tarifas propias de la empresa.",
      },
      { t: "h2", text: "Viviendas con consumo alto" },
      {
        t: "p",
        text: "Es común encontrar en la zona viviendas con pileta, riego de parque, climatización y, cada vez más, carga de vehículo eléctrico. Son consumos que conviene listar antes del dimensionamiento, porque algunos se pueden desplazar a las horas de sol y eso aumenta el autoconsumo sin agrandar el sistema.",
      },
    ],
    faqs: [
      {
        q: "Tengo lugar de sobra, ¿conviene instalar lo máximo posible?",
        a: "No necesariamente. El excedente inyectado no se valoriza igual que la energía que consumís en el momento, así que a partir de cierto punto agrandar el sistema mejora poco el retorno.",
      },
      {
        q: "¿Mejor en el techo o en el suelo?",
        a: "En suelo se logra la orientación e inclinación óptimas y el mantenimiento es más simple, pero suma estructura y obra civil, y ocupa terreno. Con espacio disponible vale comparar las dos opciones.",
      },
      {
        q: "Quiero cargar un auto eléctrico, ¿cambia algo?",
        a: "Bastante, y a favor, si la carga se puede programar en horas de sol. Es uno de los consumos que mejor se desplaza, y eso aumenta el autoconsumo sin necesidad de agrandar el sistema.",
      },
    ],
  },

  {
    slug: "san-rafael",
    nombre: "San Rafael",
    title: "Paneles solares en San Rafael, Mendoza | Sur provincial",
    h1: "Paneles solares en San Rafael",
    description:
      "Energía solar en San Rafael, Mendoza: establecimientos agrícolas, turismo, comercios y viviendas. Bombeo solar y sistemas off-grid para puestos sin red.",
    intro:
      "San Rafael está lejos del Gran Mendoza y eso cambia dos cosas: la logística del proyecto y el peso que tienen los establecimientos sin conexión a la red.",
    bloques: [
      { t: "h2", text: "Establecimientos sin red" },
      {
        t: "p",
        text: "En el sur provincial es frecuente encontrar puestos, perforaciones y construcciones a distancia considerable del punto de conexión más cercano. Ahí el sistema solar no se compara contra una factura: se compara contra **el costo de tender línea o de operar un grupo electrógeno a gasoil**, con su combustible, su mantenimiento y la logística de llevarlo hasta el lugar.",
      },
      {
        t: "p",
        text: "Cuando esa es la alternativa, la cuenta suele cerrar mucho más rápido que en una vivienda urbana. Lo primero que conviene conseguir es un presupuesto de tendido eléctrico: con ese número al lado, la comparación se vuelve evidente en cualquiera de los dos sentidos.",
      },
      { t: "h2", text: "Bombeo para riego" },
      {
        t: "p",
        text: "Para riego y abastecimiento de agua, el bombeo solar es la aplicación más directa, porque el reservorio funciona como almacenamiento y evita el componente más caro de un sistema aislado. Lo detallamos en [energía solar para campo y riego](/servicios/energia-solar-campo-riego).",
      },
      { t: "h2", text: "Turismo y alojamientos" },
      {
        t: "p",
        text: "Cabañas, hoteles y complejos tienen dos particularidades. Una es la estacionalidad: el consumo se concentra en temporada, y conviene ver si coincide con la mayor generación. La otra es que muchos están en zonas donde la red llega débil o no llega, así que el sistema resuelve además un problema de calidad de suministro, no solo de costo.",
      },
      {
        t: "callout",
        title: "Sobre la distancia",
        text: "San Rafael está a varias horas del Gran Mendoza. Conviene hablarlo al principio del proyecto: afecta la logística de obra y los tiempos de una eventual visita de mantenimiento, y es mejor tenerlo claro antes que descubrirlo después.",
      },
      { t: "h2", text: "Comercios y viviendas conectadas a la red" },
      {
        t: "p",
        text: "Para quienes sí tienen suministro, el enfoque no difiere del resto de la provincia: se parte de las facturas, se estima el perfil horario y se dimensiona. El circuito administrativo también es el mismo, porque el régimen de generación distribuida es provincial. Está explicado en la [guía del trámite](/blog/tramite-usuario-generador-mendoza).",
      },
    ],
    faqs: [
      {
        q: "Estoy a varios kilómetros de la red, ¿cuál es el límite para que convenga?",
        a: "Depende del presupuesto de tendido, que varía con el terreno y la potencia necesaria. Es el primer número que conviene conseguir, porque define la comparación completa.",
      },
      {
        q: "¿Atienden San Rafael con la misma cobertura que el Gran Mendoza?",
        a: "La distancia afecta la logística de obra y los tiempos de respuesta ante una visita. Conviene plantearlo desde la primera conversación para acordar expectativas realistas.",
      },
      {
        q: "Tengo cabañas que trabajan solo en temporada, ¿sirve?",
        a: "Suele servir, y conviene mirar si la temporada alta coincide con los meses de mayor generación. En lugares donde la red llega débil, además resuelve un problema de calidad de suministro.",
      },
    ],
  },
];

export const ZONA_SLUGS = ZONAS.map((z) => z.slug);

export function getZona(slug: string): Zona | undefined {
  return ZONAS.find((z) => z.slug === slug);
}
