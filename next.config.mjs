/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',      // empaqueta servidor Next en .next/standalone
  // Optimización de imágenes activada: next/image genera srcset y sirve
  // AVIF/WebP según el navegador. Antes estaba en `unoptimized: true`, así que
  // el hero se descargaba a tamaño completo en cualquier pantalla.
  //
  // Requiere `sharp` en runtime (está en dependencies). En modo standalone
  // Next lo incluye en el bundle trazado; si falta, next/image falla al
  // optimizar en producción.
  images: {
    formats: ['image/avif', 'image/webp'],
    // Anchos alineados con los breakpoints de Tailwind usados en el sitio.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  },
  reactStrictMode: true,
  poweredByHeader: false,

  // Canonicalización de host: www → apex (301).
  // Hoy https://www.dinamoenergia.com.ar/ y https://dinamoenergia.com.ar/
  // devuelven 200 ambos, lo que duplica el contenido y reparte la autoridad.
  //
  // Nota: el sitio está detrás de Cloudflare. Si Cloudflare cachea la respuesta
  // antes de llegar al origen, conviene además crear una Redirect Rule en
  // Cloudflare con la misma regla. Verificar con:
  //   curl -sI https://www.dinamoenergia.com.ar/ | head -3
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.dinamoenergia.com.ar' }],
        destination: 'https://dinamoenergia.com.ar/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
