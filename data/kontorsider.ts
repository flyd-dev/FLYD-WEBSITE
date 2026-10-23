/**
 * Innhold til kontorsidene (/kontor/[slug]/). Alle seks kontorene bruker samme
 * mal (components/maler/KontorMal.tsx) med de samme seksjonene. Adresse,
 * bilder og team kommer fra data/offices.ts og data/team.ts.
 *
 * Sandnes har eget, utvidet innhold her (H1, ingress, tjenester, lokaltekst og
 * flere spørsmål). De andre kontorene får tjenestelisten fra /kontor og
 * spørsmål om adresse og område fra `kontorSporsmal` nedenfor. Svarene som er
 * felles for alle kontorene (systemer, bytte, Finanstilsynet) står i
 * `fellesSporsmal`. Skriv ikke inn nye områder eller kundetyper før Flyd har
 * bekreftet dem.
 *
 * `bekreft` er innhold som mangler fra Flyd. Det vises som en synlig
 * [BEKREFT]-plassholder (components/Bekreft.tsx), og byggesjekken stopper
 * produksjonsbygg til feltet er fylt ut og plassholderen fjernet. Plassholdere
 * skal aldri inn i JSON-LD: FAQ-svar med `bekreft` tas bare med i FAQPage når
 * de også har en ferdig `a`, og da bare med `a` og `punkter`.
 */
import type { OgImage } from '@/lib/seo';
import { virksomhetsregisteret } from '@/data/kontoroversikt';

export type KontorFaq = {
  q: string;
  /** Det synlige svaret. Det samme står i FAQPage. */
  a?: string;
  /** Punktliste under svaret. Står også i FAQPage, etter svaret. */
  punkter?: string[];
  /** Nummerert liste i stedet for punkter (steg). */
  nummerert?: boolean;
  /** Det som mangler for at svaret er komplett. */
  bekreft?: string;
  /** Lenke under svaret (ikke med i JSON-LD). */
  lenke?: { href: string; tekst: string };
};

export type Kontorside = {
  /** Hele <title>. */
  title: string;
  description: string;
  /** Eget delingsbilde (1200×630) i public/og/. Uten det brukes forsidens. */
  image?: OgImage;
  h1: string;
  kicker: string;
  ingress: string;
  /** Navn i LocalBusiness/AccountingService. */
  schemaName: string;
  areaServed: string[];
  lokalt: { title: string; avsnitt: string[]; bekreft?: string[] };
  tjenester: {
    title: string;
    intro: string;
    /** Radene i tjenestelisten. Hele raden er en lenke. */
    punkter: { title: string; text: string; href: string }[];
  };
  faq: KontorFaq[];
};

/** Svar som gjelder alle kontorene. Står sist i spørsmålene på hver kontorside. */
export const fellesSporsmal: KontorFaq[] = [
  {
    q: 'Hvilke regnskapssystemer jobber dere med?',
    a: 'Vi jobber med Tripletex, Visma Business NXT, Uni Micro og PowerOffice Go. I tillegg hjelper vi deg med å velge riktig system, sette det opp og koble det til andre systemer, som nettbutikk, timeføring eller lager.',
    lenke: { href: '/tjenester/erp/', tekst: 'Les om programvare og ERP' },
  },
  {
    q: 'Kan jeg bytte regnskapsfører midt i året?',
    a: 'Ja. Du sier opp skriftlig etter avtalen du har, og avtaler en tydelig overgangsdato. Vi tar kontakt med den tidligere regnskapsføreren og henter over det vi trenger, så regnskapet fortsetter uten opphold.',
    lenke: { href: '/bytte-regnskapsforer/', tekst: 'Slik bytter du regnskapsfører' },
  },
  {
    q: 'Er Flyd godkjent av Finanstilsynet?',
    a: 'Ja. Flyd er et autorisert regnskapsførerselskap med tillatelse fra Finanstilsynet.',
    lenke: { href: virksomhetsregisteret, tekst: 'Finanstilsynets virksomhetsregister' },
  },
];

/**
 * Spørsmål om adresse og område for kontorene uten utvidet innhold. Svarene
 * bygger på det som står i data/offices.ts og data/kontoroversikt.ts.
 */
export const kontorSporsmal: Record<string, KontorFaq[]> = {
  egersund: [
    {
      q: 'Hvor ligger Flyd sitt kontor i Egersund?',
      a: 'Kontoret ligger i Torvgården, Torget 2, 4370 Egersund, midt på torget. Vi har åpent mandag til fredag fra 07 til 16. Kom gjerne innom, eller møt oss hos deg eller på video.',
    },
    {
      q: 'Hvilke områder betjener kontoret i Egersund?',
      a: 'Kontoret betjener bedrifter i Eigersund og resten av Dalane.',
    },
  ],
  sokndal: [
    {
      q: 'Hvor ligger Flyd sitt kontor i Sokndal?',
      a: 'Kontoret ligger i «Banken», Gamleveien 13, 4380 Hauge i Dalane. Vi har åpent mandag til fredag fra 07 til 16, og du kan også møte oss hos deg eller på video.',
    },
    {
      q: 'Hvilke områder betjener kontoret i Sokndal?',
      a: 'Kontoret betjener bedrifter i Sokndal og omegn.',
    },
  ],
  moi: [
    {
      q: 'Hvor ligger Flyd sitt kontor på Moi?',
      a: 'Kontoret ligger i Øyevollveien 10, 4460 Moi. Vi har åpent mandag til fredag fra 07 til 16, og du kan også møte oss hos deg eller på video.',
    },
    {
      q: 'Hvilke områder betjener kontoret på Moi?',
      a: 'Kontoret betjener bedrifter i Lund og områdene langs E39 mellom Egersund og Flekkefjord.',
    },
  ],
  sirdal: [
    {
      q: 'Hvor ligger Flyd sitt kontor i Sirdal?',
      a: 'Kontoret ligger i Handleriet, Sirdalsveien 7432, 4443 Tjørhom. Vi har åpent mandag til fredag fra 07 til 16, og du kan også møte oss hos deg eller på video.',
    },
    {
      q: 'Hvilke områder betjener kontoret i Sirdal?',
      a: 'Kontoret betjener bedrifter i Sirdal, og vi jobber tett med bygg-, hytte- og reiselivsnæringen i fjellbygda.',
    },
  ],
  flekkefjord: [
    {
      q: 'Hvor ligger Flyd sitt kontor i Flekkefjord?',
      a: 'Kontoret ligger sentralt i Elvegaten 22, 4400 Flekkefjord. Vi har åpent mandag til fredag fra 07 til 16, og du kan også møte oss hos deg eller på video.',
    },
    {
      q: 'Hvilke områder betjener kontoret i Flekkefjord?',
      a: 'Kontoret betjener næringslivet i Flekkefjord og resten av Lister-regionen.',
    },
  ],
};

export const kontorsider: Record<string, Kontorside> = {
  'stavanger-sandnes': {
    // Sandnes og Stavanger i title og H1: kontoret skal treffe søk på begge. URL-en
    // /kontor/stavanger-sandnes/ beholdes (ingen 301).
    title: 'Regnskapsfører i Sandnes og Stavanger · Flyd',
    description:
      'Autorisert regnskapsfører på Forus, Grenseveien 21 i Sandnes, for bedrifter i Sandnes og Stavanger. Regnskap, lønn og årsoppgjør med fast kontaktperson.',
    image: {
      url: 'https://www.flyd.no/og/kontor-sandnes.png',
      width: 1200,
      height: 630,
      type: 'image/png',
      alt: 'Regnskapsfører i Sandnes og Stavanger – kontor på Forus. Regnskap, lønn og rådgivning med fast kontaktperson fra Flyd',
    },
    h1: 'Regnskapsfører i Sandnes og Stavanger',
    kicker: 'Kontor · Forus',
    ingress:
      'Flyd er regnskapsfører for bedrifter i Stavanger-regionen, med kontor i FOMO på Forus (Grenseveien 21). Vi tar oss av regnskap, lønn, årsoppgjør og rådgivning, og hjelper deg med å velge og sette opp riktig regnskapssystem. Du får én fast kontaktperson som kjenner bedriften din og svarer når du ringer.',

    schemaName: 'Flyd – Sandnes (Forus)',
    areaServed: ['Stavanger', 'Sandnes', 'Sola', 'Randaberg'],

    lokalt: {
      title: 'Regnskapsføreren din på Forus – midt i Stavanger-regionen',
      avsnitt: [
        'Kontoret ligger i FOMO-bygget i Grenseveien 21 på Forus, på grensen mellom Stavanger og Sandnes. Her har vi kort vei til de fleste næringsområdene på Nord-Jæren, og det er lett å komme seg hit både fra Stavanger, Sandnes og Sola.',
        'Fra Forus betjener vi bedrifter i Stavanger, Sandnes, Sola, Randaberg og resten av Nord-Jæren. Kontoret er en del av Flyd, med kolleger på fem andre kontorer i Rogaland og Agder. Blir det travelt, eller trenger saken en spesialist, har vi flere å spille på uten at du må forholde deg til nye folk.',
      ],
    },

    tjenester: {
      title: 'Dette hjelper vi bedrifter i Sandnes og Stavanger med',
      intro:
        'De fleste kundene våre i regionen bruker oss til det løpende regnskapet. Mange bruker oss også til lønn, rådgivning og systemet regnskapet føres i.',
      punkter: [
        {
          title: 'Løpende regnskap og bokføring',
          text: 'Vi tar imot bilagene digitalt, bokfører fortløpende og avstemmer bank, kunder og leverandører. Mva-meldingen sender vi til fristen, og du får tall du kan styre etter gjennom hele året.',
          href: '/tjenester/regnskap/',
        },
        {
          title: 'Lønn og a-melding',
          text: 'Vi kjører lønn, sender a-meldingen hver måned og holder orden på feriepenger, skattetrekk, reiseregninger og pensjon.',
          href: '/tjenester/lonn-og-hr/',
        },
        {
          title: 'Årsoppgjør, skattemelding og årsregnskap',
          text: 'Vi setter opp årsregnskapet, skattemeldingen og aksjonærregisteroppgaven, og går gjennom tallene med deg før noe sendes inn. Hvert oppdrag har en oppdragsansvarlig.',
          href: '/tjenester/regnskap/',
        },
        {
          title: 'Rådgivning',
          text: 'Budsjett, likviditet, selskapsstruktur og generasjonsskifte. Rådgivningen bygger på tallene vi allerede kjenner, så du slipper å forklare bedriften fra bunnen av.',
          href: '/tjenester/regnskap/',
        },
        {
          // Differensiatoren: regnskapsførere og systemkonsulenter i samme hus.
          title: 'Tripletex og ERP',
          text: 'Regnskapsførere og systemkonsulenter sitter i samme hus. Vi hjelper deg med å velge system, setter det opp med kontoplan, roller og rapporter, og bygger integrasjonene mot nettbutikk, timeføring eller lager.',
          href: '/tjenester/erp/',
        },
      ],
    },

    faq: [
      {
        q: 'Hvor ligger Flyd sitt kontor i Sandnes?',
        a: 'Kontoret ligger i FOMO-bygget på Forus, Grenseveien 21, 4313 Sandnes, på grensen mellom Stavanger og Sandnes. Vi har åpent mandag til fredag fra 07 til 16. Du kan også møte oss hos deg eller på video.',
      },
      {
        q: 'Hva koster regnskapsfører i Sandnes?',
        a: 'Prisen avhenger av hvor mye arbeid regnskapet krever, og to bedrifter med samme omsetning kan ha helt ulike behov. Vi oppgir ikke faste priser på nettsiden. Etter en gjennomgang av bedriften får du et konkret tilbud. Dette påvirker prisen mest:',
        punkter: [
          'Hvor mange bilag og transaksjoner du har i måneden',
          'Om du har ansatte, og hvor mange som får lønn',
          'Om bedriften er mva-registrert, og hvor ofte mva skal rapporteres',
          'Hvor sammensatt virksomheten er: flere selskaper, prosjekter, lager eller utenlandshandel',
          'Hvor mye du gjør selv, for eksempel fakturering og attestering',
          'Om du ønsker fast pris eller betaler for timene som går med',
        ],
      },
      {
        q: 'Hvordan kommer vi i gang?',
        a: 'Det går i fire steg:',
        nummerert: true,
        punkter: [
          'Uforpliktende samtale om bedriften, hvordan dere jobber i dag og hva dere trenger hjelp til. På Forus, hos deg eller på video.',
          'Tilbud og oppdragsavtale som viser hva vi gjør, og hva du gjør selv.',
          'Overtakelse: har du regnskapsfører fra før, henter vi over regnskapsdata, avtaler og dokumentasjon. Du slipper å være mellomledd.',
          'Du får én fast kontaktperson som går gjennom rutinene med deg, og så er regnskapet i gang.',
        ],
      },
      {
        q: 'Hvem passer Flyd for?',
        a: 'Vi jobber med bedrifter i ulike størrelser på Nord-Jæren. Felles for dem er at de vil ha mer enn et regnskap som blir levert én gang i året:',
        punkter: [
          'Gründere som starter AS og trenger hjelp med både regnskapet og valg av system fra første dag.',
          'Små og mellomstore bedrifter i vekst, der regnskapet, lønnen og rapportene må henge med når flere blir ansatt.',
          'Etablerte industri- og eiendomsselskaper som vil ha en rådgiver som ser hele bildet, ikke bare fjorårets tall.',
          'Selskaper som skal bytte system eller rydde opp etter en implementering som ikke ble helt ferdig.',
        ],
      },
      {
        q: 'Må jeg møte opp på kontoret?',
        a: 'Nei. Du kan møte oss på Forus, vi kan komme til deg, eller vi kan ta møtet på video. Bilagene håndteres digitalt, så det meste av samarbeidet går fint uten at du trenger å komme innom.',
      },
      {
        q: 'Tar dere små bedrifter og enkeltpersonforetak?',
        a: 'Ja. Vi hjelper både små bedrifter og enkeltpersonforetak med regnskapet.',
      },
      {
        q: 'Hjelper dere bedrifter i Stavanger og Sola også?',
        a: 'Ja. Kontoret på Forus betjener hele Nord-Jæren, også Stavanger, Sola og Randaberg. Forus ligger midt mellom byene, så veien er kort uansett hvor bedriften holder til.',
      },
    ],
  },
};

export function getKontorside(slug: string): Kontorside | undefined {
  return kontorsider[slug];
}

/** Alle spørsmålene på en kontorside: kontorets egne først, så de felles. */
export function kontorFaq(slug: string): KontorFaq[] {
  const egne = kontorsider[slug]?.faq ?? kontorSporsmal[slug] ?? [];
  return [...egne, ...fellesSporsmal];
}
