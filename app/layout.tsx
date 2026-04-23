import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
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
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    url: 'https://www.flyd.no',
    siteName: 'Flyd',
    title: 'Flyd – Regnskap, rådgivning og teknologi i samme hus',
    description:
      'Et kompetansehus for økonomi og teknologi. Regnskap, rådgivning, ERP og integrasjoner under samme tak.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flyd – Regnskap, rådgivning og teknologi i samme hus',
    description:
      'Et kompetansehus for økonomi og teknologi. Regnskap, rådgivning, ERP og integrasjoner under samme tak.',
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
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Flyd',
    url: 'https://www.flyd.no',
    logo: 'https://www.flyd.no/brand/flyd-teal.png',
    email: 'post@flyd.no',
    sameAs: [],
  };

  return (
    <html lang="nb" className={poppins.variable}>
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
        <Reveal />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
