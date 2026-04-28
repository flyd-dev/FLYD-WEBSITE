import type { Metadata } from 'next';
import { Poppins, Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import ScrollToTop from '@/components/ScrollToTop';
import { offices } from '@/data/offices';
import { Analytics } from '@vercel/analytics/next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.flyd.no'),
  title: {
    default: 'Flyd – Regnskap, rådgivning og teknologi i samme hus',
    template: '%s · Flyd',
  },
  description:
    'Flyd er et kompetansehus for økonomi og teknologi. Fra daglig regnskap til ERP og integrasjoner – én partner, ett nummer, full oversikt.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    url: 'https://www.flyd.no',
    siteName: 'Flyd',
    title: 'Flyd – Regnskap, rådgivning og teknologi i samme hus',
    description:
      'Et kompetansehus for økonomi og teknologi. Regnskap, rådgivning, ERP og integrasjoner under samme tak.',
    images: [
      {
        url: 'https://www.flyd.no/opengraph-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Flyd – Regnskap, rådgivning og teknologi i samme hus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flyd – Regnskap, rådgivning og teknologi i samme hus',
    description:
      'Et kompetansehus for økonomi og teknologi. Regnskap, rådgivning, ERP og integrasjoner under samme tak.',
    images: ['https://www.flyd.no/opengraph-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon-512.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon-32.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = 'https://www.flyd.no';
  const orgId = `${siteUrl}/#organization`;
  const hq = offices[0];

  const organization = {
    '@type': ['Organization', 'AccountingService'],
    '@id': orgId,
    name: 'Flyd',
    legalName: 'Flyd AS',
    url: siteUrl,
    logo: `${siteUrl}/brand/flyd-teal.png`,
    image: `${siteUrl}/brand/flyd-teal.png`,
    email: 'post@flyd.no',
    telephone: '+4748019958',
    vatID: 'NO933662934MVA',
    taxID: '933662934',
    description:
      'Flyd er et kompetansehus for økonomi og teknologi. Regnskap, rådgivning, ERP og integrasjoner under samme tak – med kontorer i Sør-Vest-Norge.',
    sameAs: [
      'https://www.linkedin.com/company/flyd-as/',
      'https://www.facebook.com/flyd.no',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: hq.street,
      postalCode: hq.postal.split(' ')[0],
      addressLocality: hq.postal.split(' ').slice(1).join(' '),
      addressCountry: 'NO',
    },
    areaServed: offices.map((o) => ({ '@type': 'City', name: o.city })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+4748019958',
        email: 'post@flyd.no',
        areaServed: 'NO',
        availableLanguage: ['Norwegian', 'English'],
      },
    ],
  };

  const localBusinesses = offices.map((o) => ({
    '@type': ['LocalBusiness', 'AccountingService'],
    '@id': `${siteUrl}/#office-${o.city.toLowerCase()}`,
    name: `Flyd ${o.city}`,
    parentOrganization: { '@id': orgId },
    url: siteUrl,
    image: `${siteUrl}/brand/flyd-teal.png`,
    telephone: '+4748019958',
    email: 'post@flyd.no',
    address: {
      '@type': 'PostalAddress',
      streetAddress: o.street,
      postalCode: o.postal.split(' ')[0],
      addressLocality: o.postal.split(' ').slice(1).join(' '),
      addressCountry: 'NO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: o.lat,
      longitude: o.lng,
    },
    hasMap: o.mapsUrl,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [organization, ...localBusinesses],
  };

  return (
    <html lang="nb" className={`${poppins.variable} ${nunito.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-flyd-ink focus:text-flyd-paper focus:px-3 focus:py-2"
        >
          Hopp til hovedinnhold
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollToTop />
        <Reveal />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
