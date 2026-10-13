/**
 * Utvidet innhold for kontorsider (/kontor/[slug]/). Kontorer uten oppføring
 * her bruker den korte standardsiden. Innholdet skal være unikt per kontor –
 * ikke kopier tekst mellom dem.
 *
 * `bekreft` er innhold som mangler fra Flyd. Det vises som en synlig
 * [BEKREFT]-plassholder (components/Bekreft.tsx), og byggesjekken stopper
 * produksjonsbygg til feltet er fylt ut og plassholderen fjernet. Plassholdere
 * skal aldri inn i JSON-LD: FAQ-svar med `bekreft` tas bare med i FAQPage når
 * de også har en ferdig `a`, og da bare med `a`.
 */
import type { OgImage } from '@/lib/seo';

export type KontorFaq = {
  q: string;
  /** Det synlige svaret. Det samme står i FAQPage. */
  a?: string;
  /** Det som mangler for at svaret er komplett. */
  bekreft?: string;
  /** Lenke under svaret (ikke med i JSON-LD). */
  lenke?: { href: string; tekst: string };
};

export type Kontorside = {
  /** <title>; « · Flyd» legges til av malen i layout. */
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

  lokalt: {
    kicker: string;
    title: string;
    avsnitt: string[];
    bekreft?: string[];
  };
  tjenester: {
    kicker: string;
    title: string;
    intro: string;
    /** Kortene i tjenesterutenettet. Hele kortet er en lenke. */
    punkter: { title: string; text: string; href: string; lenketekst: string }[];
    /** Differensiatoren: ERP og systemvalg får egen, tyngre blokk under kortene. */
    erp: { title: string; avsnitt: string[]; systemer: string[]; href: string; lenketekst: string };
  };
  passerFor: {
    kicker: string;
    title: string;
    intro: string;
    punkter: string[];
    bekreft?: string[];
  };
  kommIGang: {
    kicker: string;
    title: string;
    steg: { title: string; text: string }[];
    bytte: { text: string; href: string; lenketekst: string };
  };
  pris: {
    kicker: string;
    title: string;
    intro: string;
    faktorer: string[];
    avslutning: string;
    bekreft?: string;
  };
  team: {
    kicker: string;
    title: string;
    text: string;
    /** Ansattkortene. Uten `role` vises `bekreft` i stedet for rollen. */
    ansatte: { name: string; role?: string; image: string; bekreft?: string }[];
    /** Det som mangler for hele teamseksjonen (vises under kortene). */
    bekreft?: string;
  };
  faq: KontorFaq[];
  andreKontorer: { kicker: string; title: string };
  kontakt: { kicker: string; title: string; text: string };
};

export const kontorsider: Record<string, Kontorside> = {
  'stavanger-sandnes': {
    title: 'Regnskapsfører Stavanger – regnskap og rådgivning på Forus',
    description:
      'Trenger du regnskapsfører i Stavanger? Flyd har kontor på Forus og hjelper bedrifter i Stavanger og Sandnes med regnskap, lønn, årsoppgjør og rådgivning – med fast kontaktperson.',
    image: {
      url: 'https://www.flyd.no/og/kontor-stavanger-sandnes.png',
      width: 1200,
      height: 630,
      type: 'image/png',
      alt: 'Regnskapsfører i Stavanger – kontor på Forus. Regnskap, lønn og rådgivning med fast kontaktperson fra Flyd',
    },
    h1: 'Regnskapsfører i Stavanger',
    kicker: 'Kontor · Forus',
    ingress:
      'Flyd er regnskapsfører for bedrifter i Stavanger-regionen, med kontor i FOMO på Forus (Grenseveien 21). Vi tar oss av regnskap, lønn, årsoppgjør og rådgivning, og hjelper deg med å velge og sette opp riktig regnskapssystem. Du får én fast kontaktperson som kjenner bedriften din og svarer når du ringer.',

    schemaName: 'Flyd – Stavanger (Forus)',
    areaServed: ['Stavanger', 'Sandnes', 'Sola', 'Randaberg'],

    lokalt: {
      kicker: 'Fra kontoret',
      title: 'Regnskapsføreren din på Forus – midt i Stavanger-regionen',
      avsnitt: [
        'Kontoret ligger i FOMO-bygget i Grenseveien 21 på Forus, på grensen mellom Stavanger og Sandnes. Her har vi kort vei til de fleste næringsområdene på Nord-Jæren, og det er lett å komme seg hit både fra Stavanger, Sandnes og Sola. Vi har åpent mandag til fredag fra 07 til 16.',
        'Fra Forus betjener vi bedrifter i Stavanger, Sandnes, Sola, Randaberg og resten av Nord-Jæren. Møtene tar vi der det passer deg: hos oss på Forus, ute hos deg eller på video. Bilagene går digitalt, så du trenger ikke stikke innom med en perm for at regnskapet skal bli ført.',
        'Kontoret er en del av Flyd, med kolleger på fem andre kontorer i Rogaland og Agder. Blir det travelt, eller trenger saken en spesialist, har vi flere å spille på uten at du må forholde deg til nye folk.',
      ],
    },

    tjenester: {
      kicker: 'Tjenester',
      title: 'Dette hjelper vi bedrifter i Stavanger med',
      intro:
        'De fleste kundene våre i regionen bruker oss til det løpende regnskapet. Mange bruker oss også til lønn, rådgivning og systemet regnskapet føres i.',
      punkter: [
        {
          title: 'Løpende regnskap og bokføring',
          text: 'Vi tar imot bilagene digitalt, bokfører fortløpende og avstemmer bank, kunder og leverandører. Mva-meldingen sender vi til fristen, og du får tall du kan styre etter gjennom hele året.',
          href: '/tjenester/regnskap/',
          lenketekst: 'Les om regnskap og rådgivning',
        },
        {
          title: 'Lønn og a-melding',
          text: 'Vi kjører lønn, sender a-meldingen hver måned og holder orden på feriepenger, skattetrekk, reiseregninger og pensjon. De ansatte får riktig lønn til rett tid, og du slipper fristene.',
          href: '/tjenester/lonn-og-hr/',
          lenketekst: 'Les om lønn og HR',
        },
        {
          title: 'Årsoppgjør, skattemelding og årsregnskap',
          text: 'Vi setter opp årsregnskapet, skattemeldingen for selskapet og aksjonærregisteroppgaven, og går gjennom tallene med deg før noe sendes inn. Hvert oppdrag har en oppdragsansvarlig som har ansvaret for at alt er riktig.',
          href: '/tjenester/regnskap/',
          lenketekst: 'Les om regnskap og rådgivning',
        },
        {
          title: 'Rådgivning',
          text: 'Budsjett, likviditet, selskapsstruktur og generasjonsskifte er spørsmål vi hjelper eiere og ledere med. Rådgivningen bygger på tallene vi allerede kjenner, så du slipper å forklare bedriften fra bunnen av.',
          href: '/tjenester/regnskap/',
          lenketekst: 'Les om regnskap og rådgivning',
        },
        {
          title: 'Tripletex og ERP',
          text: 'Vi hjelper deg med å velge system, setter det opp med kontoplan, roller og rapporter, bygger integrasjonene og flytter over historikken når du bytter.',
          href: '/tjenester/erp/',
          lenketekst: 'Les om programvare og ERP',
        },
        {
          title: 'Bytte regnskapsfører',
          text: 'Vi tar kontakt med den tidligere regnskapsføreren og henter over regnskapsdata, avtaler og dokumentasjon. Du slipper å være mellomledd.',
          href: '/bytte-regnskapsforer/',
          lenketekst: 'Les guiden',
        },
      ],
      erp: {
        title: 'Regnskapssystem og ERP',
        avsnitt: [
          'Her skiller vi oss fra et rent regnskapsbyrå. Hos oss sitter regnskapsførere og systemkonsulenter i samme hus, så vi kan hjelpe deg med selve systemet regnskapet føres i, ikke bare med føringen.',
          'Vi hjelper deg med å velge system ut fra hvordan bedriften faktisk jobber, setter det opp med kontoplan, roller og rapporter, og flytter over historikken når du bytter. Henger nettbutikk, timeføring eller lager ikke sammen med regnskapet, bygger vi integrasjonene som gjør at tallene flyter av seg selv.',
        ],
        systemer: ['Tripletex', 'PowerOffice Go', 'Visma Business NXT', 'Uni Micro'],
        href: '/tjenester/erp/',
        lenketekst: 'Les om programvare og ERP',
      },
    },

    passerFor: {
      kicker: 'Passer for',
      title: 'Hvem passer Flyd for?',
      intro:
        'Vi jobber med bedrifter i ulike størrelser på Nord-Jæren. Felles for dem er at de vil ha mer enn et regnskap som blir levert én gang i året.',
      punkter: [
        'Gründere som starter AS og trenger hjelp med både regnskapet og valg av system fra første dag.',
        'Små og mellomstore bedrifter i vekst, der regnskapet, lønnen og rapportene må henge med når flere blir ansatt.',
        'Etablerte industri- og eiendomsselskaper som vil ha en rådgiver som ser hele bildet, ikke bare fjorårets tall.',
        'Selskaper som skal bytte system eller rydde opp etter en implementering som ikke ble helt ferdig.',
      ],
    },

    kommIGang: {
      kicker: 'Slik kommer du i gang',
      title: 'Slik kommer du i gang',
      steg: [
        {
          title: 'Uforpliktende samtale',
          text: 'Vi tar en prat om bedriften, hvordan dere jobber i dag og hva dere trenger hjelp til. På Forus, hos deg eller på video.',
        },
        {
          title: 'Tilbud og oppdragsavtale',
          text: 'Du får et tilbud basert på det vi har gått gjennom. Når du takker ja, skriver vi en oppdragsavtale som viser hva vi gjør, og hva du gjør selv.',
        },
        {
          title: 'Overtakelse',
          text: 'Har du regnskapsfører fra før, tar vi kontakt med vedkommende og henter over regnskapsdata, avtaler og dokumentasjon. Du slipper å være mellomledd.',
        },
        {
          title: 'Fast kontaktperson og oppstart',
          text: 'Du får én fast kontaktperson som går gjennom rutinene med deg, og så er regnskapet i gang.',
        },
      ],
      bytte: {
        text: 'Har du allerede en regnskapsfører og vurderer å bytte? Vi har samlet det du bør vite om oppsigelse, overgangsdato og hva som skjer med regnskapet underveis.',
        href: '/bytte-regnskapsforer/',
        lenketekst: 'Slik bytter du regnskapsfører',
      },
    },

    pris: {
      kicker: 'Priser og team',
      title: 'Hva koster regnskapsfører i Stavanger?',
      intro:
        'Prisen på regnskapsfører avhenger av hvor mye arbeid regnskapet krever. To bedrifter med samme omsetning kan ha helt ulike behov. Dette er det som påvirker prisen mest:',
      faktorer: [
        'Hvor mange bilag og transaksjoner du har i måneden',
        'Om du har ansatte, og hvor mange som får lønn',
        'Om bedriften er mva-registrert, og hvor ofte mva skal rapporteres',
        'Hvor sammensatt virksomheten er: flere selskaper, prosjekter, lager eller utenlandshandel',
        'Hvor mye du gjør selv, for eksempel fakturering og attestering',
        'Om du ønsker fast pris eller betaler for timene som går med',
      ],
      avslutning:
        'Vi oppgir ikke faste priser på nettsiden. Etter en gjennomgang av bedriften får du et konkret tilbud.',
    },

    team: {
      kicker: 'Folkene',
      title: 'Møt teamet i Stavanger',
      text: 'Hos oss får du en fast kontaktperson på Forus, med kolleger innen regnskap, lønn og systemer rundt seg.',
      ansatte: [
        { name: 'Kai Mydland', role: 'Daglig leder', image: '/team/flyd-kai.webp' },
        { name: 'Arnstein Bendiksen', role: 'Salgssjef', image: '/team/flyd-arnstein.webp' },
        {
          name: 'Marit Haga Christensen',
          role: 'Kontorleder og statsautorisert regnskapsfører',
          image: '/team/flyd-marit.webp',
        },
        { name: 'Tatjana Derksen', role: 'Regnskapskonsulent', image: '/team/flyd-tatjana.webp' },
      ],
    },

    faq: [
      {
        q: 'Hvor ligger Flyd sitt kontor i Stavanger?',
        a: 'Kontoret ligger i FOMO-bygget på Forus, Grenseveien 21, 4313 Sandnes, på grensen mellom Stavanger og Sandnes. Vi har åpent mandag til fredag fra 07 til 16. Du kan også møte oss hos deg eller på video.',
      },
      {
        q: 'Er Flyd godkjent av Finanstilsynet?',
        a: 'Ja. Flyd er et autorisert regnskapsførerselskap med tillatelse fra Finanstilsynet.',
      },
      {
        q: 'Hvilke regnskapssystemer jobber dere med?',
        a: 'Vi jobber med Tripletex, Visma Business NXT, Uni Micro og PowerOffice Go. I tillegg hjelper vi deg med å velge riktig system, sette det opp og koble det til andre systemer, som nettbutikk, timeføring eller lager.',
      },
      {
        q: 'Kan jeg bytte regnskapsfører midt i året?',
        a: 'Ja. Du sier opp skriftlig etter avtalen du har, og avtaler en tydelig overgangsdato. Vi tar kontakt med den tidligere regnskapsføreren og henter over det vi trenger, så regnskapet fortsetter uten opphold.',
        lenke: { href: '/bytte-regnskapsforer/', tekst: 'Slik bytter du regnskapsfører' },
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
        q: 'Hjelper dere bedrifter i Sandnes og Sola også?',
        a: 'Ja. Kontoret på Forus betjener hele Nord-Jæren, også Sandnes, Sola og Randaberg. Forus ligger midt mellom byene, så veien er kort uansett hvor bedriften holder til.',
      },
    ],

    andreKontorer: {
      kicker: 'Andre kontorer',
      title: 'Flyd har også kontorer i Dalane, Sirdal og Lister',
    },
    kontakt: {
      kicker: 'Forus',
      title: 'Ta en prat med oss i Stavanger',
      text: 'Ring +47 480 19 958, send en e-post til support@flyd.no eller fyll ut kontaktskjemaet. Vi tar praten på Forus, hos deg eller på video.',
    },
  },
};

export function getKontorside(slug: string): Kontorside | undefined {
  return kontorsider[slug];
}
