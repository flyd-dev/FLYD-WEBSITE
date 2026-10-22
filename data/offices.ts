import type { OgImage } from '@/lib/seo';

export type Office = {
  city: string;
  slug: string;
  name: string;
  /** Gateadresse. Valgfri – uten den vises bare postnummer/sted, og JSON-LD får ingen streetAddress. */
  street?: string;
  postal: string;
  /**
   * Kartlenke (hasMap) til kontorets Google-bedriftsprofil, på formen
   * https://maps.google.com/?cid=<CID>. Valgfri – uten den vises ingen kartknapp.
   */
  mapsUrl?: string;
  /** Koordinater (geo). Valgfrie – begge eller ingen. */
  lat?: number;
  lng?: number;
  /** 2–3 setninger til kontorsiden (/kontor/[slug]). */
  blurb: string;
  /**
   * Title og meta description for standardsiden, satt per kontor (ikke fra
   * mal). `title` er hele <title> og brukes også i og:title. Mønsteret er
   * «Flyd [Sted] – autorisert regnskapsfører i [Sted]»: merkenavnet først.
   * Kontorer i data/kontorsider.ts bruker metadataen derfra. `image` er eget
   * delingsbilde (1200×630) i public/og/; uten det brukes forsidens.
   */
  meta?: { title: string; description?: string; image?: OgImage };
  /**
   * Områder kontoret betjener (areaServed i LocalBusiness). Bare steder som
   * står i teksten på siden.
   */
  areaServed?: { type: 'City' | 'AdministrativeArea'; name: string }[];
  /**
   * Fasadefoto av kontoret (3:2, 1200×800, WebP i public/kontor/). Valgfritt –
   * uten bilde vises besøkskortet alene. Samme motiv som forsidebildet i
   * Google Bedriftsprofil.
   */
  image?: { src: string; alt: string };
  /**
   * Bilder fra kontoret og folkene der (4:3, 900×675, WebP i public/kontor/).
   * Vises som en egen bildeseksjon på kontorsiden (to eller tre bilder).
   * Filnavnet viser hvor bildet er tatt. Kontorer uten egne bilder låner fra
   * andre kontorer inntil videre – alt-teksten sier da ikke hvor det er tatt.
   */
  gallery?: { src: string; alt: string }[];
  /**
   * Lenke til kontorets anmeldelsesside i Google Bedriftsprofil. Settes i
   * `googleReviewUrls` nederst i fila (ett sted for alle lenkene). Uten lenke
   * vises ingen anmeldelsesknapp.
   */
  reviewUrl?: string;
  /** Preposisjon foran stedsnavnet («på Moi», «i Egersund»). Standard er «i». */
  preposition?: 'i' | 'på';
  /**
   * Revisjonsteamet holder til her (Sokndal). Gir «Regnskapsfører og revisor» i
   * H1 og en egen revisjonsblokk i toppen av kontorsiden (Irene 22.10.2026).
   */
  revisjon?: boolean;
};

const officeList: Office[] = [
  {
    city: 'Sandnes',
    slug: 'stavanger-sandnes',
    name: 'FOMO',
    street: 'Grenseveien 21',
    postal: '4313 Sandnes',
    mapsUrl: 'https://maps.google.com/?cid=12568098481895177946',
    lat: 58.8529,
    lng: 5.7354,
    blurb:
      'Regionkontoret vårt ligger i FOMO-miljøet på Forus, midt i Stavanger-regionen. Herfra betjener vi kunder på hele Nord-Jæren – fra gründere til etablerte industri- og eiendomsselskaper.',
    image: {
      src: '/kontor/stavanger.webp',
      alt: 'FOMO-bygget i Grenseveien 21 på Forus, der Flyd har Sandnes-kontoret',
    },
    // Det siste bildet er lånt fra Egersund til vi har flere fra Sandnes.
    gallery: [
      {
        src: '/kontor/stavanger-fomo.webp',
        alt: 'To Flyd-kolleger smiler foran inngangen til FOMO-bygget på Forus',
      },
      {
        src: '/kontor/egersund-notatbok.webp',
        alt: 'Smilende regnskapsfører med notatbok ved skrivebordet',
      },
    ],
  },
  {
    city: 'Egersund',
    slug: 'egersund',
    name: 'Torvgården',
    street: 'Torget 2',
    postal: '4370 Egersund',
    mapsUrl: 'https://maps.google.com/?cid=1140093806804219019',
    lat: 58.4514,
    lng: 5.9989,
    blurb:
      'Kontoret ligger i Torvgården, midt på torget i Egersund. Her sitter vi tett på næringslivet i Eigersund og resten av Dalane – kom gjerne innom for en regnskapsprat.',
    meta: {
      title: 'Flyd Egersund – autorisert regnskapsfører i Egersund',
      description:
        'Trenger du regnskapsfører i Egersund? Flyd har kontor i Torvgården. Regnskap, lønn, årsoppgjør og rådgivning i Dalane – med fast kontaktperson.',
      image: {
        url: 'https://www.flyd.no/og/kontor-egersund.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Regnskapsfører i Egersund – regnskap og rådgivning. Regnskap, lønn og rådgivning for bedrifter i Dalane fra Flyd',
      },
    },
    areaServed: [
      { type: 'City', name: 'Egersund' },
      { type: 'AdministrativeArea', name: 'Eigersund' },
      { type: 'AdministrativeArea', name: 'Dalane' },
    ],
    image: {
      src: '/kontor/egersund.webp',
      alt: 'Torvgården på torget i Egersund, der Flyd-kontoret ligger',
    },
    gallery: [
      {
        src: '/kontor/egersund-arbeidsplass.webp',
        alt: 'To kolleger i prat over skilleveggen, med utsikt mot trehusene i Egersund',
      },
      {
        src: '/kontor/egersund-motebord.webp',
        alt: 'Latter rundt møtebordet på kontoret i Egersund',
      },
      {
        src: '/kontor/egersund-mote.webp',
        alt: 'Teamet i Egersund samlet rundt møtebordet ved vinduene mot sentrum',
      },
    ],
  },
  {
    city: 'Sokndal',
    slug: 'sokndal',
    name: 'Banken',
    street: 'Gamleveien 13',
    postal: '4380 Hauge i Dalane',
    mapsUrl: 'https://maps.google.com/?cid=10437318809922733050',
    lat: 58.3374,
    lng: 6.2714,
    blurb:
      'I Sokndal holder vi til i «Banken» i Hauge i Dalane. Kort vei for deg som driver virksomhet i Sokndal og omegn – med hele Flyds fagmiljø i ryggen.',
    revisjon: true,
    meta: {
      title: 'Flyd Sokndal – regnskapsfører og revisor i Sokndal',
      description:
        'Trenger du regnskapsfører eller revisor i Sokndal? Flyd har kontor i Gamleveien 13 i Hauge i Dalane, der også revisjonsteamet vårt holder til.',
      image: {
        url: 'https://www.flyd.no/og/kontor-sokndal.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Regnskapsfører i Sokndal – Hauge i Dalane. Regnskap, lønn og rådgivning fra Flyd',
      },
    },
    areaServed: [{ type: 'AdministrativeArea', name: 'Sokndal' }],
    image: {
      src: '/kontor/sokndal.webp',
      alt: 'Flyd-kontoret i «Banken», Gamleveien 13 i Hauge i Dalane – hvit fasade med flyd-skilt',
    },
    gallery: [
      {
        src: '/kontor/sokndal-moterom.webp',
        alt: 'Latter rundt møtebordet på kontoret i Sokndal',
      },
      {
        src: '/kontor/sokndal-latter.webp',
        alt: 'Tre kolleger ler sammen ved et ståbord',
      },
      {
        src: '/kontor/sokndal-resepsjon.webp',
        alt: 'Resepsjonen i «Banken», med sofaer og den gamle hvelvdøren åpen i bakgrunnen',
      },
    ],
  },
  {
    city: 'Moi',
    slug: 'moi',
    name: 'Moi',
    preposition: 'på',
    street: 'Øyevollveien 10',
    postal: '4460 Moi',
    mapsUrl: 'https://maps.google.com/?cid=12316434624376162358',
    lat: 58.4621,
    lng: 6.5334,
    blurb:
      'Moi-kontoret betjener Lund og områdene langs E39 mellom Egersund og Flekkefjord. En lokal regnskapspartner, med kolleger på fem andre kontorer å spille på.',
    meta: {
      title: 'Flyd Moi – autorisert regnskapsfører på Moi',
      description:
        'Trenger du regnskapsfører på Moi? Flyd har kontor i Lund. Regnskap, lønn, årsoppgjør og rådgivning langs E39 – med fast kontaktperson.',
      image: {
        url: 'https://www.flyd.no/og/kontor-moi.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Regnskapsfører på Moi – lokalt kontor i Lund. Regnskap, lønn og rådgivning fra Flyd',
      },
    },
    areaServed: [{ type: 'AdministrativeArea', name: 'Lund' }],
    image: {
      src: '/kontor/moi.webp',
      alt: 'Fasaden på Flyd-kontoret i Øyevollveien 10 på Moi, med flyd-skilt over inngangen',
    },
    gallery: [
      {
        src: '/kontor/moi-teamet.webp',
        alt: 'Flyd-kolleger på rad utendørs på Moi, med skogkledde åser og gule bygninger i bakgrunnen',
      },
      {
        src: '/kontor/moi-kolleger.webp',
        alt: 'To kolleger ler sammen ved en arbeidsplass på Moi-kontoret',
      },
      {
        src: '/kontor/moi-prat.webp',
        alt: 'Uformell prat i en døråpning mellom to kolleger',
      },
    ],
  },
  {
    city: 'Sirdal',
    slug: 'sirdal',
    name: 'Handleriet',
    street: 'Sirdalsveien 7432',
    postal: '4443 Tjørhom',
    mapsUrl: 'https://maps.google.com/?cid=10175685156205779934',
    lat: 58.9091,
    lng: 6.8094,
    blurb:
      'På Tjørhom i Sirdal finner du oss i Handleriet. Vi jobber tett med hytte-, bygg- og reiselivsnæringen i fjellbygda – og er til stede der verdiene skapes.',
    meta: {
      title: 'Flyd Sirdal – autorisert regnskapsfører i Sirdal',
      description:
        'Trenger du regnskapsfører i Sirdal? Flyd har kontor i Handleriet på Tjørhom. Regnskap, lønn, årsoppgjør og rådgivning – med fast kontaktperson.',
      image: {
        url: 'https://www.flyd.no/og/kontor-sirdal.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Regnskapsfører i Sirdal – kontor på Tjørhom. Regnskap, lønn og rådgivning for bygg, hytte og reiseliv fra Flyd',
      },
    },
    areaServed: [{ type: 'AdministrativeArea', name: 'Sirdal' }],
    image: {
      src: '/kontor/sirdal.webp',
      alt: 'Handleriet på Tjørhom i Sirdal, der Flyd-kontoret ligger',
    },
    // Lånte bilder fra Moi og Egersund til vi har egne fra Sirdal.
    gallery: [
      {
        src: '/kontor/moi-korridor.webp',
        alt: 'To kolleger ler sammen i gangen på kontoret',
      },
      {
        src: '/kontor/moi-motebord.webp',
        alt: 'Kolleger samlet rundt møtebordet med kaffe og frukt',
      },
      {
        src: '/kontor/egersund-pult.webp',
        alt: 'Smilende rådgiver tar notater ved skrivebordet',
      },
    ],
  },
  {
    city: 'Flekkefjord',
    slug: 'flekkefjord',
    name: 'Flekkefjord',
    street: 'Elvegaten 22',
    postal: '4400 Flekkefjord',
    mapsUrl: 'https://maps.google.com/?cid=15755657841450216178',
    lat: 58.2967,
    lng: 6.6628,
    blurb:
      'I Flekkefjord sitter vi sentralt i Elvegaten 22. Kontoret betjener næringslivet i Lister-regionen – med kort vei til både kunder og kollegaer.',
    meta: {
      title: 'Flyd Flekkefjord – autorisert regnskapsfører i Flekkefjord',
      description:
        'Trenger du regnskapsfører i Flekkefjord? Flyd har kontor i Elvegaten 22. Regnskap, lønn, årsoppgjør og rådgivning i Lister – med fast kontaktperson.',
      image: {
        url: 'https://www.flyd.no/og/kontor-flekkefjord.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Regnskapsfører i Flekkefjord – regnskap og rådgivning. Regnskap, lønn og rådgivning for bedrifter i Lister fra Flyd',
      },
    },
    areaServed: [
      { type: 'City', name: 'Flekkefjord' },
      { type: 'AdministrativeArea', name: 'Lister' },
    ],
    image: {
      src: '/kontor/flekkefjord.webp',
      alt: 'Inngangen til Flyd-kontoret i Elvegaten 22 i Flekkefjord, med teal flyd-skilt',
    },
    // Lånte bilder fra Moi og Egersund til vi har egne fra Flekkefjord (to bilder gir to kolonner).
    gallery: [
      {
        src: '/kontor/moi-skjerm.webp',
        alt: 'Kollega ved skrivebordet smiler til en kollega som stikker innom',
      },
      {
        src: '/kontor/egersund-glassdor.webp',
        alt: 'To Flyd-ansatte i døråpningen ved glassveggen med flyd-logoen',
      },
    ],
  },
];

/**
 * Google-anmeldelseslenker per kontor (slug → g.page-lenke). Alle seks
 * Google-profilene heter «Flyd AS». Lenkene og `mapsUrl` peker til de samme
 * profilene (samme CID, sjekket mot NAP-rapporten 19.10.2026).
 */
export const googleReviewUrls: Record<string, string> = {
  'stavanger-sandnes': 'https://g.page/r/Cdr-fAv72mquEBM/review',
  egersund: 'https://g.page/r/CYs0MN1GbdIPEBM/review',
  sokndal: 'https://g.page/r/CfqD8ogoztiQEBM/review',
  moi: 'https://g.page/r/CTZIQx0JxOyqEBM/review',
  flekkefjord: 'https://g.page/r/CfLqPGpUV6faEBM/review',
  sirdal: 'https://g.page/r/Cd5b3Im8SzeNEBM/review',
};

export const offices: Office[] = officeList.map((o) =>
  googleReviewUrls[o.slug] ? { ...o, reviewUrl: googleReviewUrls[o.slug] } : o,
);

/**
 * Åpningstider – like på alle seks kontorer og identiske med Google
 * Bedriftsprofil (sjekket 21.9.2026). Endres de ett sted, må de endres begge.
 */
export const openingHours = {
  label: 'Man–fre 07–16',
  schema: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '16:00',
  },
};

/** Stedsnavnet med riktig preposisjon, f.eks. «på Moi» eller «i Egersund». */
export function atOffice(office: Office): string {
  return `${office.preposition ?? 'i'} ${office.city}`;
}

/** Har kontoret ikke eget navn på bygget (navnet = bynavnet), vises bare byen – ikke «Moi · Moi». */
export function hasOwnName(office: Office): boolean {
  return office.name !== office.city;
}

/** «Egersund · Torvgården», eller bare «Moi» når kontoret ikke har eget navn. */
export function officeLabel(office: Office): string {
  return hasOwnName(office) ? `${office.city} · ${office.name}` : office.city;
}

export function getOfficeBySlug(slug: string): Office | undefined {
  return offices.find((o) => o.slug === slug);
}
