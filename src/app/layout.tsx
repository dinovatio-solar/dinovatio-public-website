import "./globals.css";
import Providers from "@/components/Theme/Providers";
import QuoteModalProvider from "@/components/Quote/QuoteModalProvider";
import RegionProvider from "@/components/Region/RegionProvider";

export const metadata = {
  title: "Dínamo Energía - Energía solar",
  description: "Instalación fotovoltaica residencial e industrial. Asesoría experta.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Providers>
          <RegionProvider>
            <QuoteModalProvider>
              {children}
            </QuoteModalProvider>
          </RegionProvider>
        </Providers>
      </body>
    </html>
  );
}
