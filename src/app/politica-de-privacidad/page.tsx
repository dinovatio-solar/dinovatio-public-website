import type { Metadata } from "next";
import PageShell from "@/components/Content/PageShell";
import Blocks from "@/components/Content/Blocks";
import type { Block } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Política de privacidad",
  description:
    "Qué datos personales recolecta Dínamo Energía a través del sitio, con qué finalidad los usa y cómo ejercer tus derechos según la Ley 25.326.",
  path: "/politica-de-privacidad",
});

/**
 * ⚠️ REVISAR CON ASESORAMIENTO LEGAL ANTES DE PUBLICAR
 *
 * Este texto es una base redactada sobre lo que el sitio efectivamente hace
 * hoy (formulario de cotización, newsletter y contacto por WhatsApp). No es un
 * documento legal validado. Falta completar:
 *
 *  1. Razón social y domicilio legal de la empresa. Están como marcadores.
 *  2. Plazo de conservación de los datos, que hoy se enuncia de forma genérica.
 *  3. GA4 ya está instalado y documentado más abajo. Falta decidir si se
 *     agrega banner de consentimiento de cookies; no es obligatorio bajo la
 *     Ley 25.326, pero sí conviene si alguna vez se segmenta tráfico europeo.
 *     Si se suma Meta Pixel o remarketing, hay que detallarlo acá.
 *  4. El formulario de cotización permite adjuntar fotos. Conviene aclarar
 *     dónde se almacenan y por cuánto tiempo.
 */
const BLOQUES: Block[] = [
  {
    t: "callout",
    title: "Borrador pendiente de revisión legal",
    text: "Este texto es una base técnica redactada sobre el funcionamiento actual del sitio. Antes de publicarlo hay que completar los datos de la empresa y validarlo con asesoramiento legal.",
  },
  {
    t: "p",
    text: "Esta política describe cómo Dínamo Energía trata los datos personales que recibe a través de este sitio, en el marco de la **Ley 25.326 de Protección de los Datos Personales** de la República Argentina.",
  },

  { t: "h2", text: "Quién es responsable" },
  {
    t: "p",
    text: "El responsable del tratamiento es Dínamo Energía, con domicilio en [COMPLETAR: domicilio legal], provincia de Mendoza, Argentina. Para cualquier consulta sobre esta política podés escribir a nuestro correo de contacto.",
  },

  { t: "h2", text: "Qué datos recolectamos" },
  {
    t: "p",
    text: "Solo los que nos facilitás voluntariamente. No pedimos datos sensibles ni información financiera.",
  },
  {
    t: "table",
    head: ["Dónde", "Datos", "Para qué"],
    rows: [
      [
        "Formulario de cotización",
        "Nombre, correo, teléfono o WhatsApp, provincia, tipo de instalación, consumo aproximado, mensaje y fotos opcionales del lugar.",
        "Elaborar la cotización y responderte.",
      ],
      [
        "Suscripción al newsletter",
        "Correo electrónico.",
        "Enviarte contenidos sobre energía solar.",
      ],
      [
        "Contacto por WhatsApp",
        "Los datos que compartas en la conversación.",
        "Atender tu consulta.",
      ],
    ],
  },
  {
    t: "p",
    text: "La calculadora de ahorro **no requiere ni almacena datos personales**: el cálculo ocurre en tu navegador. Sí se registra de forma anónima qué potencia se consultó, con la herramienta de analítica que describimos más abajo.",
  },

  { t: "h2", text: "Para qué usamos los datos" },
  {
    t: "ul",
    items: [
      "Responder tus consultas y elaborar presupuestos.",
      "Gestionar, si así lo acordamos, el trámite de usuario generador ante el EPRE, la distribuidora y el municipio.",
      "Enviarte comunicaciones comerciales, únicamente si te suscribiste.",
    ],
  },
  {
    t: "p",
    text: "No vendemos ni cedemos tus datos a terceros con fines publicitarios.",
  },

  { t: "h2", text: "Con quién los compartimos" },
  {
    t: "p",
    text: "Solo cuando es necesario para prestar el servicio: con los organismos que intervienen en el trámite de usuario generador, si nos pediste gestionarlo, y con los proveedores técnicos que alojan el sitio y nuestro correo. También cuando una autoridad competente lo requiera por ley.",
  },

  { t: "h2", text: "Cuánto tiempo los conservamos" },
  {
    t: "p",
    text: "Los datos de una consulta se conservan mientras sean necesarios para atenderla y durante el plazo que exija la normativa aplicable. Si te suscribiste al newsletter, hasta que pidas la baja.",
  },

  { t: "h2", text: "Tus derechos" },
  {
    t: "p",
    text: "Podés solicitar en cualquier momento el acceso, la rectificación, la actualización o la supresión de tus datos escribiéndonos a nuestro correo de contacto. El titular de los datos tiene derecho a solicitar y obtener información de sus datos personales incluidos en bancos de datos públicos o privados destinados a proveer informes.",
  },
  {
    t: "p",
    text: "La **Agencia de Acceso a la Información Pública**, órgano de control de la Ley 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales.",
  },

  { t: "h2", text: "Cookies y tecnologías similares" },
  {
    t: "p",
    text: "El sitio usa almacenamiento local del navegador para recordar dos preferencias tuyas: el tema claro u oscuro y la provincia seleccionada. No son datos personales y no se envían a ningún servidor. Podés borrarlos desde la configuración de tu navegador.",
  },
  { t: "h3", text: "Google Analytics" },
  {
    t: "p",
    text: "El sitio usa **Google Analytics 4**, de Google Ireland Limited, para entender cómo se navega: qué páginas se visitan, desde qué canal llega la gente y qué botones se usan. Google actúa como encargado del tratamiento por nuestra cuenta.",
  },
  {
    t: "p",
    text: "Lo que se mide es **estadístico y no te identifica**: páginas vistas, clics en los botones de WhatsApp y de cotización, uso de la calculadora, tipo de dispositivo y ubicación aproximada a nivel de ciudad. No se envían a Google tu nombre, tu correo ni tu teléfono, aunque los hayas escrito en el formulario.",
  },
  {
    t: "p",
    text: "Para hacerlo, Google instala cookies en tu navegador. Podés bloquearlas desde la configuración del navegador, o instalar el [complemento de inhabilitación de Google Analytics](https://tools.google.com/dlpage/gaoptout), que desactiva la medición en todos los sitios que lo usen.",
  },
  {
    t: "p",
    text: "El sitio **no utiliza píxeles publicitarios ni herramientas de remarketing**. Si eso cambia, se actualizará esta política y se pedirá tu consentimiento cuando corresponda.",
  },

  { t: "h2", text: "Cambios en esta política" },
  {
    t: "p",
    text: "Podemos actualizar este texto. La fecha de última actualización figura al pie.",
  },
];

export default function PrivacidadPage() {
  return (
    <PageShell
      crumbs={[{ label: "Política de privacidad" }]}
      h1="Política de privacidad"
      intro="Qué datos recibimos a través del sitio, para qué los usamos y cómo pedir su eliminación."
    >
      <Blocks blocks={BLOQUES} />

      <p className="mt-10 text-sm text-neutral-600 dark:text-neutral-400">
        Consultas sobre esta política:{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-emerald-700 dark:text-emerald-400 underline underline-offset-2 hover:no-underline"
        >
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
        Última actualización: octubre de 2026.
      </p>
    </PageShell>
  );
}
