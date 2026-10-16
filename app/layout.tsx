import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PointerFx from "@/components/PointerFx";
import Reveal from "@/components/Reveal";
import ScrollToTop from "@/components/ScrollToTop";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import { offices, openingHours } from "@/data/offices";
import { getKontorside } from "@/data/kontorsider";
import { allTeam } from "@/data/team";

// Designmanualen: Poppins (500 ingress, 600 overskrifter og tall) og
// DM Sans (400 brødtekst, 400 kursiv sitater, 500 knapper, 700 kickers).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.flyd.no"),
  verification: {
    google: "etU_ZA2jeyyDin4pgdzxqQzG6LLkLYft9oiBM0HhzPA",
  },
  title: {
    default: "Flyd AS – regnskapsfører, revisor, ERP og teknologi på Sør-Vestlandet",
    template: "%s · Flyd",
  },
  description:
    "Flyd er et kompetansehus for økonomi og teknologi. Fra daglig regnskap og revisjon til ERP og integrasjoner – én partner, ett nummer, full oversikt.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: "https://www.flyd.no/",
    siteName: "Flyd AS",
    title: "Flyd AS – regnskapsfører, revisor, ERP og teknologi på Sør-Vestlandet",
    description:
      "Et kompetansehus for økonomi og teknologi. Regnskap, revisjon, rådgivning, ERP og integrasjoner under samme tak.",
    images: [
      {
        url: "https://www.flyd.no/opengraph-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Flyd – Regnskap, rådgivning og teknologi i samme hus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flyd AS – regnskapsfører, revisor, ERP og teknologi på Sør-Vestlandet",
    description:
      "Et kompetansehus for økonomi og teknologi. Regnskap, revisjon, rådgivning, ERP og integrasjoner under samme tak.",
    images: ["https://www.flyd.no/opengraph-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-32.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = "https://www.flyd.no";
  const orgId = `${siteUrl}/#organization`;

  const organization = {
    "@type": ["Organization", "AccountingService"],
    "@id": orgId,
    name: "Flyd",
    alternateName: ["Flyd AS"],
    legalName: "Flyd AS",
    url: siteUrl,
    logo: `${siteUrl}/brand/flyd-teal.png`,
    image: `${siteUrl}/brand/flyd-teal.png`,
    email: "support@flyd.no",
    telephone: "+4748019958",
    vatID: "NO933662934MVA",
    taxID: "933662934",
    description:
      "Flyd er et kompetansehus for økonomi og teknologi. Regnskap, revisjon, rådgivning, ERP og integrasjoner under samme tak – med kontorer i Sør-Vest-Norge.",
    // Alle sjekket med curl 16.10.2026. Bare lenker som viser en ekte side.
    sameAs: [
      "https://www.linkedin.com/company/flyd-as/",
      "https://www.facebook.com/flyd.no",
      "https://virksomhet.brreg.no/nb/oppslag/enheter/933662934",
      "https://www.proff.no/selskap/flyd-as/sandnes/bedriftsr%C3%A5dgivning/IFFVMXI043Z",
      "https://www.wikidata.org/wiki/Q141747053",
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: allTeam.length,
    },
    memberOf: {
      "@type": "Organization",
      name: "Regnskap Norge",
      url: "https://www.regnskapnorge.no/",
    },
    // Forretningsadressen i Enhetsregisteret (data.brreg.no, enheter/933662934),
    // sjekket 16.10.2026. Hentes ikke fra kontorlista, så rekkefølgen der ikke
    // flytter hovedadressen.
    address: {
      "@type": "PostalAddress",
      streetAddress: "Grenseveien 21",
      postalCode: "4313",
      addressLocality: "Sandnes",
      addressCountry: "NO",
    },
    areaServed: offices.map((o) => ({ "@type": "City", name: o.city })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+4748019958",
        email: "support@flyd.no",
        areaServed: "NO",
        availableLanguage: ["Norwegian", "English"],
      },
    ],
  };

  const localBusinesses = offices.map((o) => ({
    "@type": ["LocalBusiness", "AccountingService"],
    "@id": `${siteUrl}/#office-${o.city.toLowerCase()}`,
    name: getKontorside(o.slug)?.schemaName ?? `Flyd ${o.city}`,
    parentOrganization: { "@id": orgId },
    url: `${siteUrl}/kontor/${o.slug}/`,
    image: `${siteUrl}/brand/flyd-teal.png`,
    telephone: "+4748019958",
    email: "support@flyd.no",
    address: {
      "@type": "PostalAddress",
      ...(o.street && { streetAddress: o.street }),
      postalCode: o.postal.split(" ")[0],
      addressLocality: o.postal.split(" ").slice(1).join(" "),
      addressCountry: "NO",
    },
    ...(o.lat != null &&
      o.lng != null && {
        geo: { "@type": "GeoCoordinates", latitude: o.lat, longitude: o.lng },
      }),
    ...(o.mapsUrl && { hasMap: o.mapsUrl }),
    openingHoursSpecification: openingHours.schema,
  }));

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: "Flyd",
    inLanguage: "nb-NO",
    publisher: { "@id": orgId },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [organization, website, ...localBusinesses],
  };

  return (
    <html lang="nb" className={`${poppins.variable} ${dmSans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-pille focus:bg-flyd-skog focus:text-flyd-sand focus:px-4 focus:py-2"
        >
          Hopp til hovedinnhold
        </a>
        <div className="lesefremdrift" aria-hidden="true" />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollToTop />
        <Reveal />
        <PointerFx />
        <CookieConsent />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
