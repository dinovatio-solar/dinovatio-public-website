import type { Servicio } from "./types";

/**
 * ⚠️ REVISAR ANTES DE PUBLICAR
 *
 * Este contenido está redactado sobre lo que ya afirma el sitio y sobre el
 * marco normativo público (Ley 27.424 y régimen del EPRE Mendoza). Hay tres
 * cosas que la empresa tiene que confirmar y que NO se inventaron acá:
 *
 *  1. Precios. No figura ninguno a propósito. Si se quieren publicar rangos,
 *     deben salir de presupuestos reales y llevar fecha, porque se mueven con
 *     el tipo de cambio.
 *  2. Matrículas, certificaciones y marcas de equipos. Los textos hablan de
 *     "instalación certificada" porque es lo que ya dice la home, pero no se
 *     menciona ninguna matrícula concreta hasta tener el dato.
 *  3. Los porcentajes de ahorro (65–72% residencial, 86–96% industrial) vienen
 *     de la matriz del estimador que ya está en producción. Convienen
 *     revisarlos contra instalaciones propias.
 *
 * Las garantías de equipo (paneles y inversores) se describen en términos
 * genéricos de mercado, sin atribuirlas a una marca ni a una póliza propia.
 */
export const SERVICIOS: Servicio[] = [
  {
    slug: "paneles-solares-residenciales",
    nombre: "Residencial",
    title: "Paneles solares para casas en Mendoza | Instalación residencial",
    h1: "Paneles solares para tu casa en Mendoza",
    description:
      "Instalación de paneles solares residenciales en Mendoza: dimensionamiento según tu factura, trámite de usuario generador ante el EPRE y puesta en marcha. Cotizá sin cargo.",
    intro:
      "Dimensionamos el sistema a partir de tu consumo real, no de un paquete estándar. Te acompañamos en el trámite de usuario generador y dejamos la instalación funcionando y monitoreada.",
    bloques: [
      { t: "h2", text: "Cómo decidimos qué sistema te conviene" },
      {
        t: "p",
        text: "El error más común es elegir la potencia por metros cuadrados de techo o por la cantidad de personas que viven en la casa. Lo que define el tamaño es **cuánta energía consumís y en qué momento del día la consumís**, porque la generación solar ocurre entre la mañana y la tarde.",
      },
      {
        t: "p",
        text: "Por eso el punto de partida siempre son tus facturas. Con el consumo anual en kWh y el perfil horario aproximado, calculamos la potencia que tiene sentido instalar y qué porcentaje de tu factura puede cubrir.",
      },
      {
        t: "ol",
        items: [
          "Revisamos tus últimas facturas para obtener el consumo anual en kWh y el cargo variable que pagás.",
          "Estimamos el perfil horario: cuánto consumís de mañana, de tarde y de noche.",
          "Definimos la potencia en kW y la superficie mínima de techo que necesita.",
          "Verificamos orientación, inclinación y sombras proyectadas sobre el techo.",
          "Armamos la propuesta con el ahorro estimado y el plazo de recupero.",
        ],
      },
      {
        t: "callout",
        title: "Antes de pedir presupuesto",
        text: "Si querés una primera idea sin hablar con nadie, probá la [calculadora de ahorro](/calculadora-ahorro-solar-mendoza). Te da un rango orientativo a partir de la potencia del sistema.",
      },
      { t: "h2", text: "Qué incluye la instalación" },
      {
        t: "ul",
        items: [
          "**Ingeniería del proyecto**: dimensionamiento, esquema unifilar y memoria técnica.",
          "**Provisión de equipos**: paneles, inversor, estructura de montaje, protecciones y cableado.",
          "**Montaje y conexionado**, con las protecciones de corriente continua y alterna que exige la normativa.",
          "**Trámite de usuario generador** ante el EPRE y la distribuidora, para poder inyectar el excedente.",
          "**Puesta en marcha y monitoreo**, para verificar que el sistema genera lo previsto.",
        ],
      },
      { t: "h2", text: "Orientación, inclinación y sombras" },
      {
        t: "p",
        text: "En el hemisferio sur, un techo orientado al norte es el mejor caso. Una orientación al este o al oeste no descarta el proyecto, pero reduce la generación anual y conviene tenerlo en cuenta en el dimensionamiento, no descubrirlo después.",
      },
      {
        t: "p",
        text: "Las sombras merecen más atención de la que suelen recibir. Una sombra parcial sobre un solo panel puede afectar la producción de toda la cadena conectada en serie, según cómo esté configurado el sistema. Un árbol que hoy no molesta puede molestar en cinco años, y el tanque de agua o una medianera alta proyectan sombra en invierno aunque no lo hagan en verano.",
      },
      { t: "h2", text: "On-grid, híbrido y off-grid" },
      {
        t: "table",
        head: ["Tipo", "Para qué sirve", "A tener en cuenta"],
        rows: [
          [
            "**On-grid**",
            "Reducir la factura inyectando el excedente a la red.",
            "Es el más simple y el de recupero más rápido. No funciona durante un corte de red.",
          ],
          [
            "**Híbrido**",
            "Reducir la factura y además tener respaldo con baterías.",
            "Suma el costo de las baterías, que son la parte más cara y la de vida útil más corta.",
          ],
          [
            "**Off-grid**",
            "Abastecer un lugar sin conexión a la red.",
            "Tiene sentido donde llevar la red cuesta más que el sistema. Ver [energía solar para campo](/servicios/energia-solar-campo-riego).",
          ],
        ],
      },
      {
        t: "p",
        text: "Para una casa conectada a la red en el Gran Mendoza, lo habitual es que convenga un sistema on-grid. Las baterías se justifican cuando hay cortes frecuentes o equipos que no pueden quedarse sin alimentación, no como forma de ahorrar más.",
      },
      { t: "h2", text: "Vida útil y mantenimiento" },
      {
        t: "p",
        text: "Los paneles son el componente más durable del sistema y se degradan lentamente: los fabricantes suelen garantizar un porcentaje de la producción original a 25 años. El inversor es el componente que más probablemente haya que reemplazar antes, y conviene contemplarlo en el cálculo de retorno.",
      },
      {
        t: "p",
        text: "El mantenimiento de un sistema residencial es liviano: limpieza de los módulos según la acumulación de polvo, que en Mendoza no es despreciable, y revisión periódica de las protecciones y del monitoreo.",
      },
    ],
    faqs: [
      {
        q: "¿Necesito permiso para instalar paneles solares en mi casa en Mendoza?",
        a: "Si querés inyectar el excedente a la red y tener medidor bidireccional, sí: hay que hacer el trámite de usuario generador, que en Mendoza se inicia en el EPRE e involucra también a la distribuidora y al municipio. Lo gestionamos nosotros como parte del proyecto.",
      },
      {
        q: "¿Cuántos paneles necesito para mi casa?",
        a: "Depende del consumo anual en kWh que figura en tus facturas y de cuánto de ese consumo quieras cubrir, no de la cantidad de ambientes. Con las facturas en mano el dimensionamiento se resuelve en una conversación.",
      },
      {
        q: "¿Qué pasa si mi techo no da al norte?",
        a: "Se puede instalar igual. Una orientación este u oeste genera menos a lo largo del año, así que el sistema se dimensiona distinto para llegar al mismo ahorro. Lo que sí conviene evaluar en serio son las sombras.",
      },
      {
        q: "¿El sistema funciona cuando se corta la luz?",
        a: "Un sistema on-grid no: por seguridad, el inversor se desconecta cuando detecta que la red cayó. Para tener respaldo durante un corte hace falta un sistema híbrido con baterías.",
      },
    ],
    relacionados: ["paneles-solares-industriales", "asesoria-energias-renovables"],
  },

  {
    slug: "paneles-solares-industriales",
    nombre: "Industrial y comercial",
    title: "Paneles solares para empresas e industrias en Mendoza",
    h1: "Energía solar para industrias y comercios en Mendoza",
    description:
      "Sistemas fotovoltaicos para empresas en Mendoza: bodegas, galpones, frigoríficos y comercios. Dimensionamiento sobre curva de carga, gestión del trámite y monitoreo.",
    intro:
      "En una industria el ahorro suele ser mayor que en una casa, porque el consumo ocurre justo cuando el sol pega. Dimensionamos sobre tu curva de carga real y no sobre promedios.",
    bloques: [
      { t: "h2", text: "Por qué el ahorro industrial es mayor" },
      {
        t: "p",
        text: "Una vivienda consume buena parte de su energía de noche, cuando el sistema no genera. Una planta, un galpón o un comercio suelen tener el pico de consumo **en horario diurno**, que es exactamente cuando la instalación produce. Esa coincidencia entre generación y consumo es lo que hace que el autoconsumo sea más alto y el recupero más corto.",
      },
      {
        t: "p",
        text: "Por eso el dimensionamiento industrial no se hace con el consumo mensual total, sino con la curva de carga: cuánta potencia demanda la planta hora por hora. Dos empresas con la misma factura pueden necesitar sistemas muy distintos.",
      },
      { t: "h2", text: "Sectores donde lo vemos funcionar mejor" },
      {
        t: "ul",
        items: [
          "**Bodegas y plantas de procesamiento**: demanda diurna sostenida y, en vendimia, picos estacionales que coinciden con la mayor irradiación del año.",
          "**Frigoríficos y cámaras de frío**: carga continua, con el agravante de que el frío es el consumo que peor tolera un corte.",
          "**Galpones y plantas industriales**: superficie de techo disponible, que normalmente es el factor limitante.",
          "**Comercios y supermercados**: iluminación, climatización y refrigeración, todo en horario comercial.",
          "**Riego agrícola**: ver [energía solar para campo y riego](/servicios/energia-solar-campo-riego).",
        ],
      },
      { t: "h2", text: "La superficie de techo suele ser el límite" },
      {
        t: "p",
        text: "En proyectos industriales la pregunta rara vez es cuánta potencia conviene, sino cuánta entra. Como referencia de orden de magnitud, un sistema de 100 kW necesita algo más de 500 m² de superficie útil, y la superficie útil no es la superficie total del techo: hay que descontar claraboyas, conductos, equipos de clima y los pasillos de circulación para mantenimiento.",
      },
      {
        t: "p",
        text: "También hay que mirar la estructura. Un techo de chapa con cabriadas en buen estado normalmente admite el peso del sistema sin refuerzos, pero eso se verifica, no se asume. Si el techo necesita intervención en los próximos años, conviene coordinar las dos obras.",
      },
      {
        t: "callout",
        title: "Un dato que conviene tener a mano",
        text: "Si tu distribuidora te factura por potencia contratada además de por energía, decilo en la primera conversación: cambia bastante el análisis económico del proyecto.",
      },
      { t: "h2", text: "Cómo trabajamos un proyecto industrial" },
      {
        t: "ol",
        items: [
          "**Relevamiento**: facturas de los últimos doce meses, curva de carga si la distribuidora la provee, y visita técnica al techo.",
          "**Ingeniería básica**: potencia, layout de módulos, verificación estructural y punto de conexión.",
          "**Análisis económico**: generación anual estimada, ahorro y plazo de recupero con tus propias tarifas.",
          "**Trámite**: solicitud de estudio técnico ante el EPRE, permisos de la distribuidora y del municipio.",
          "**Ejecución y puesta en marcha**, coordinada para no interrumpir la producción.",
          "**Monitoreo**, para comparar la generación real contra la proyectada.",
        ],
      },
      { t: "h2", text: "Qué esperar del análisis económico" },
      {
        t: "p",
        text: "Un proyecto industrial se evalúa como cualquier inversión productiva: cuánto cuesta, cuánto ahorra por año y en cuánto tiempo se paga. Lo que cambia respecto de otras inversiones es que el flujo de ahorro depende de la tarifa eléctrica, así que conviene mirar el resultado bajo más de un escenario tarifario y no sobre uno solo.",
      },
      {
        t: "p",
        text: "No publicamos plazos de recupero genéricos porque dependen de la tarifa de cada empresa, del perfil de consumo y del momento en que se compran los equipos. Lo que sí hacemos es mostrarte el cálculo completo, con los supuestos a la vista, para que lo puedas discutir.",
      },
    ],
    faqs: [
      {
        q: "¿Cuánta superficie de techo necesito?",
        a: "Como orden de magnitud, alrededor de 5 a 6 m² de superficie útil por cada kW instalado. Un sistema de 100 kW ronda los 500 a 550 m². La superficie útil excluye claraboyas, equipos y pasillos de mantenimiento.",
      },
      {
        q: "¿Puedo instalar si alquilo el galpón?",
        a: "Sí, pero hay que resolverlo antes: el sistema es una mejora sobre un inmueble ajeno y el trámite de usuario generador se asocia al titular del suministro. Conviene acordar por escrito con el propietario qué pasa al terminar el contrato.",
      },
      {
        q: "¿Hace falta parar la planta durante la instalación?",
        a: "El montaje sobre techo se hace con la planta en funcionamiento. Solo la conexión final al tablero requiere una ventana de corte, que se coordina con ustedes y suele ser de pocas horas.",
      },
      {
        q: "¿Qué pasa con la energía que no consumo?",
        a: "Bajo el régimen de generación distribuida se inyecta a la red y se acredita en la factura. Sobredimensionar pensando solo en inyectar no suele ser la mejor estrategia: el proyecto rinde más cuando la generación acompaña al consumo propio.",
      },
    ],
    relacionados: ["energia-solar-campo-riego", "asesoria-energias-renovables"],
  },

  {
    slug: "energia-solar-campo-riego",
    nombre: "Campo y riego",
    title: "Energía solar para campo y riego en Mendoza | Bombeo solar",
    h1: "Energía solar para campo y riego",
    description:
      "Bombeo solar y sistemas off-grid para establecimientos agrícolas en Mendoza. Riego por goteo, perforaciones y puestos sin conexión a la red.",
    intro:
      "En el campo la cuenta es distinta: muchas veces no se compara contra una factura, sino contra el costo de tender una línea eléctrica o de mover un grupo electrógeno a gasoil.",
    bloques: [
      { t: "h2", text: "Dos situaciones muy distintas" },
      {
        t: "p",
        text: "Conviene separar los proyectos de campo en dos casos, porque el análisis económico no se parece en nada.",
      },
      {
        t: "p",
        text: "**El establecimiento tiene red.** Acá la lógica es la misma que en una industria: se reduce la factura, el sistema es on-grid y el recupero se calcula contra lo que hoy se paga. La ventaja del riego es que la demanda es fuertemente diurna y estacional, y la temporada de mayor riego coincide con la de mayor irradiación.",
      },
      {
        t: "p",
        text: "**El establecimiento no tiene red.** Acá el sistema no compite contra una tarifa sino contra la alternativa real: tender línea, que puede costar más que todo el sistema, o mantener un grupo electrógeno, con su gasoil, sus horas de mantenimiento y la logística de llevar combustible hasta el lugar.",
      },
      { t: "h2", text: "Bombeo solar" },
      {
        t: "p",
        text: "El bombeo solar es, probablemente, la aplicación más clara de energía solar en el agro. La razón es que **el agua funciona como batería**: en vez de almacenar electricidad en acumuladores, se bombea cuando hay sol y se guarda el agua en un reservorio o tanque elevado. Eso elimina el componente más caro y de vida útil más corta de un sistema off-grid.",
      },
      {
        t: "ul",
        items: [
          "Funciona con bomba sumergible o de superficie, según la profundidad.",
          "El dimensionamiento parte del caudal y de la altura de elevación, no de la potencia de la bomba vieja.",
          "La capacidad de almacenamiento de agua define cuántos días de autonomía se tienen sin sol.",
          "Se puede combinar con la red o con un grupo como respaldo, si el riego no admite interrupciones.",
        ],
      },
      {
        t: "callout",
        title: "Qué necesitamos para cotizar un bombeo",
        text: "Caudal necesario en metros cúbicos por hora o por día, profundidad de la perforación o altura de elevación, y si existe reservorio. Con esos tres datos se puede estimar el sistema.",
      },
      { t: "h2", text: "Riego por goteo y presurizado" },
      {
        t: "p",
        text: "En riego presurizado la demanda suele ser más constante durante la jornada de riego, y aparece la pregunta de qué hacer cuando pasa una nube. Según el cultivo y el sistema, puede resolverse con un reservorio que absorba la variación, con respaldo de red o con un sistema híbrido. Es una decisión de ingeniería, no de catálogo.",
      },
      { t: "h2", text: "Condiciones del lugar" },
      {
        t: "p",
        text: "Dos factores que en el campo pesan más que en la ciudad: el polvo, que reduce la generación y obliga a limpiezas más frecuentes, y el granizo, que en Mendoza es un riesgo real y define qué estructura y qué módulos conviene usar. Para instalaciones en suelo también hay que mirar la sombra de la propia vegetación a lo largo del año.",
      },
    ],
    faqs: [
      {
        q: "¿Me conviene solar o tender la línea eléctrica?",
        a: "Depende de la distancia al punto de conexión más cercano. A partir de cierta distancia, el costo de tendido supera al del sistema completo. Es lo primero que conviene calcular, y se hace con un presupuesto de tendido en la mano.",
      },
      {
        q: "¿Necesito baterías para un bombeo solar?",
        a: "Normalmente no. El reservorio de agua cumple la función de almacenamiento: se bombea con sol y se riega cuando hace falta. Eso evita el componente más caro de un sistema off-grid.",
      },
      {
        q: "¿Puedo reemplazar el grupo electrógeno por completo?",
        a: "En muchos casos sí, pero hay que definir qué nivel de autonomía necesitás en días nublados. A veces la solución más económica es dejar el grupo como respaldo y usarlo pocas horas al año, en vez de sobredimensionar el sistema solar.",
      },
      {
        q: "¿Y el granizo?",
        a: "Es un factor de diseño en Mendoza, no un detalle. Incide en la elección del módulo, en la estructura y en la cobertura del seguro. Conviene hablarlo explícitamente antes de cerrar el proyecto.",
      },
    ],
    relacionados: ["paneles-solares-industriales", "asesoria-energias-renovables"],
  },

  {
    slug: "asesoria-energias-renovables",
    nombre: "Asesoría",
    title: "Asesoría en energías renovables en Mendoza | Dínamo Energía",
    h1: "Asesoría en energías renovables",
    description:
      "Asesoría técnica independiente en energía solar: dimensionamiento, análisis de retorno, revisión de presupuestos de terceros y gestión del trámite de usuario generador.",
    intro:
      "A veces lo que hace falta no es un presupuesto más, sino alguien que ayude a leer los que ya tenés y a decidir si el proyecto conviene y en qué tamaño.",
    bloques: [
      { t: "h2", text: "Cuándo tiene sentido pedir asesoría" },
      {
        t: "ul",
        items: [
          "Tenés dos o tres presupuestos que no se parecen y no sabés por qué difieren.",
          "Querés saber si el proyecto cierra antes de avanzar con un proveedor.",
          "Necesitás el análisis económico para presentarlo a un directorio, a un banco o a un socio.",
          "Tenés una instalación que no genera lo que te prometieron.",
          "Querés entender el trámite de usuario generador antes de comprometerte.",
        ],
      },
      { t: "h2", text: "Cómo comparar presupuestos que no se parecen" },
      {
        t: "p",
        text: "Dos cotizaciones por la misma potencia pueden diferir mucho y las dos pueden ser honestas. Las diferencias normalmente están en estos puntos, y conviene pedir que figuren por escrito:",
      },
      {
        t: "table",
        head: ["Qué mirar", "Por qué importa"],
        rows: [
          [
            "Potencia en kW del inversor y de los módulos",
            "No son lo mismo. La relación entre ambas cambia la generación y el costo.",
          ],
          [
            "Generación anual estimada en kWh",
            "Es la cifra que se puede verificar después. Un presupuesto que no la dice es difícil de comparar.",
          ],
          [
            "Qué estructura de montaje incluye",
            "En techos de chapa y en zonas con granizo no es un detalle menor.",
          ],
          [
            "Si el trámite de usuario generador está incluido",
            "Si no lo está, es tiempo y gestión que queda de tu lado.",
          ],
          [
            "Garantías, separadas por componente",
            "La del panel, la del inversor y la de la mano de obra son distintas y tienen plazos distintos.",
          ],
          [
            "Qué pasa si la generación real queda por debajo de la estimada",
            "Conviene que esté previsto antes y no discutirlo después.",
          ],
        ],
      },
      { t: "h2", text: "Gestión del trámite de usuario generador" },
      {
        t: "p",
        text: "En Mendoza el régimen de generación distribuida se tramita ante el EPRE y además involucra a la distribuidora y al municipio. Si ya tenés instalador y solo necesitás resolver la parte administrativa, podemos tomar esa gestión. El detalle del circuito está en la [guía del trámite de usuario generador](/blog/tramite-usuario-generador-mendoza).",
      },
      { t: "h2", text: "Qué recibís" },
      {
        t: "p",
        text: "Un informe con el dimensionamiento recomendado, la generación anual estimada con los supuestos explicitados, el análisis de retorno con tus tarifas y las observaciones sobre los presupuestos que hayas recibido. Los supuestos van a la vista justamente para que puedas cuestionarlos.",
      },
    ],
    faqs: [
      {
        q: "¿Hacen asesoría si ya tengo instalador?",
        a: "Sí. Podemos revisar el dimensionamiento y los presupuestos, o tomar únicamente la gestión del trámite de usuario generador.",
      },
      {
        q: "¿La asesoría tiene costo?",
        a: "La estimación inicial de ahorro y la primera conversación no. Un informe técnico completo, con análisis de retorno y revisión de presupuestos de terceros, se cotiza según el alcance.",
      },
      {
        q: "¿Pueden revisar una instalación que ya tengo?",
        a: "Sí. Lo habitual en ese caso es comparar la generación real contra la que corresponde esperar por potencia, orientación y sombras, y revisar protecciones y configuración del inversor.",
      },
    ],
    relacionados: ["paneles-solares-residenciales", "paneles-solares-industriales"],
  },
];

export const SERVICIO_SLUGS = SERVICIOS.map((s) => s.slug);

export function getServicio(slug: string): Servicio | undefined {
  return SERVICIOS.find((s) => s.slug === slug);
}
