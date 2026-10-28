/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',      // empaqueta servidor Next en .next/standalone
  images: { unoptimized: true },
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
