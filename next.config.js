/** @type {import('next').NextConfig} */
const nextConfig = {
  // `output: 'export'` er fjernet fordi kontaktskjemaet bruker Route Handler
  // (app/api/kontakt). Sidene forhåndsgenereres fortsatt statisk. Bildeoptimalisering
  // er av, og avsluttende skråstrek er beholdt.
  images: { unoptimized: true },
  trailingSlash: true,
  // Kontorsiden het /kontor/stavanger/ før den fikk navnet stavanger-sandnes.
  // På Vercel tar vercel.json begge variantene i ett hopp; her går
  // /kontor/stavanger først via Nexts egen skråstrek-omdirigering (308).
  async redirects() {
    return [
      {
        source: '/kontor/stavanger/',
        destination: '/kontor/stavanger-sandnes/',
        statusCode: 301,
      },
    ];
  },
};

module.exports = nextConfig;
