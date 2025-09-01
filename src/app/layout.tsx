import "./globals.css";
import Providers from "@/components/Theme/Providers";
import QuoteModalProvider from "@/components/Quote/QuoteModalProvider";
import RegionProvider from "@/components/Region/RegionProvider";

export const metadata = {
  title: "Dinovatio - Energía solar",
  description: "Instalación fotovoltaica residencial e industrial. Asesoría experta.",
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
