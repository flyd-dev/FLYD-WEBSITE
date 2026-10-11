/** @type {import('next').NextConfig} */
const nextConfig = {
  // `output: 'export'` er fjernet fordi kontaktskjemaet bruker Route Handler
  // (app/api/kontakt). Sidene forhåndsgenereres fortsatt statisk. Bildeoptimalisering
  // er av, og avsluttende skråstrek er beholdt.
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;
