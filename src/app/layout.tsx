import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Theme/Providers";
import QuoteModalProvider from "@/components/Quote/QuoteModalProvider";
import RegionProvider from "@/components/Region/RegionProvider";
import GoogleAnalytics from "@/components/Analytics/GoogleAnalytics";
import {
  ADDRESS,
  AREA_SERVED,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const TITLE = "Paneles solares en Mendoza | Instalación fotovoltaica — Dínamo Energía";

const DESCRIPTION =
  "Instalamos paneles solares en Mendoza para hogares, industrias y campo. Calculá tu ahorro, conocé el retorno de la inversión y cotizá sin cargo con asesoría certificada.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "es_AR",
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Token de verificacion de Google Search Console. Se inyecta como
  // <meta name="google-site-verification">. Sin la variable, no se emite nada.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

// LocalBusiness: entidad principal del sitio. Permite que Google y los
// buscadores con IA identifiquen la empresa, su zona de cobertura y su contacto.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#empresa`,
  name: SITE_NAME,
  description: DESCRIPTION,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  image: `${SITE_URL}${OG_IMAGE.url}`,
  logo: `${SITE_URL}/assets/dinamo-logo.png`,
  address: {
    "@type": "PostalAddress",
    ...(ADDRESS.street ? { streetAddress: ADDRESS.street } : {}),
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.region,
    ...(ADDRESS.postalCode ? { postalCode: ADDRESS.postalCode } : {}),
    addressCountry: ADDRESS.country,
  },
  areaServed: AREA_SERVED.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
  knowsAbout: [
    "Energía solar fotovoltaica",
    "Generación distribuida",
    "Ley 27.424",
    "Usuario generador EPRE Mendoza",
    "Paneles solares residenciales",
    "Paneles solares industriales",
    "Bombeo solar para riego",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de energía solar",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Instalación de paneles solares residenciales",
          areaServed: "Mendoza, Argentina",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Instalación de paneles solares industriales",
          areaServed: "Mendoza, Argentina",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Asesoría en energías renovables y dimensionamiento",
          areaServed: "Argentina",
        },
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <Providers>
          <RegionProvider>
            <QuoteModalProvider>
              {children}
            </QuoteModalProvider>
          </RegionProvider>
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
