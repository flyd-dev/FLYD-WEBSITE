import { offices, hasOwnName, openingHours } from './offices';

/**
 * Innhold for kontoroversikten (/kontor/), den regionale siden for
 * «regnskapsfører i Rogaland». Adresser, bilder og koordinater kommer fra
 * data/offices.ts – her står bare teksten som er unik for oversikten.
 *
 * Områdene per kontor er de samme som står på kontorsidene. Skriv ikke inn
 * nye områder eller kundetyper før Flyd har bekreftet dem.
 */

export type KontorBlokk = {
  /** Hvilke kommuner og områder kontoret betjener. */
  omrade: string;
  tekst: string;
  /** Lenketeksten til kontorsiden. */
  lenketekst: string;
};

export const kontorBlokker: Record<string, KontorBlokk> = {
  'stavanger-sandnes': {
    omrade: 'Stavanger, Sandnes, Sola, Randaberg og resten av Nord-Jæren',
    tekst:
      'Kontoret ligger i FOMO-bygget på Forus, på grensen mellom Stavanger og Sandnes, og er kontoret vårt for Stavanger-regionen. Herfra hjelper vi alt fra gründere til etablerte industri- og eiendomsselskaper.',
    lenketekst: 'Les om regnskapsfører i Sandnes',
  },
  egersund: {
    omrade: 'Eigersund og resten av Dalane',
    tekst:
      'Kontoret ligger i Torvgården, midt på torget i Egersund, tett på næringslivet i byen og omegnen. Kom gjerne innom for en prat om regnskapet.',
    lenketekst: 'Les om regnskapsfører i Egersund',
  },
  sokndal: {
    omrade: 'Sokndal og omegn',
    tekst:
      'I Sokndal holder vi til i «Banken» i Hauge i Dalane. Kort vei for deg som driver virksomhet i kommunen, med hele Flyds fagmiljø i ryggen.',
    lenketekst: 'Les om regnskapsfører i Sokndal',
  },
  moi: {
    omrade: 'Lund og områdene langs E39 mellom Egersund og Flekkefjord',
    tekst:
      'Moi-kontoret er en lokal regnskapspartner for bedrifter i Lund, med kolleger på fem andre kontorer å spille på når det trengs.',
    lenketekst: 'Les om regnskapsfører på Moi',
  },
  sirdal: {
    omrade: 'Sirdal',
    tekst:
      'I Sirdal finner du oss i Handleriet. Vi jobber tett med bygg-, hytte- og reiselivsnæringen i fjellbygda.',
    lenketekst: 'Les om regnskapsfører i Sirdal',
  },
  flekkefjord: {
    omrade: 'Flekkefjord og resten av Lister-regionen',
    tekst:
      'Kontoret ligger sentralt i Elvegaten i Flekkefjord og betjener næringslivet i Lister, med kort vei til både kunder og kolleger.',
    lenketekst: 'Les om regnskapsfører i Flekkefjord',
  },
};

/** Tjenestene i «Hva vi gjør for bedrifter i regionen». */
export const regionTjenester: { title: string; text: string; href: string }[] = [
  {
    title: 'Løpende regnskap og bokføring',
    text: 'Bilagene kommer inn digitalt. Vi bokfører fortløpende, avstemmer bank, kunder og leverandører og sender mva-meldingen til fristen.',
    href: '/tjenester/regnskap/',
  },
  {
    title: 'Lønn og a-melding',
    text: 'Lønnskjøring, a-melding hver måned, feriepenger, skattetrekk, reiseregninger og pensjon.',
    href: '/tjenester/lonn-og-hr/',
  },
  {
    title: 'Årsoppgjør og skattemelding',
    text: 'Årsregnskap, skattemelding og aksjonærregisteroppgave, gått gjennom med deg før noe sendes inn.',
    href: '/tjenester/regnskap/',
  },
  {
    title: 'Rådgivning',
    text: 'Budsjett, likviditet, selskapsstruktur og generasjonsskifte, med utgangspunkt i tallene vi allerede kjenner.',
    href: '/tjenester/regnskap/',
  },
  {
    title: 'Tripletex og ERP',
    text: 'Vi hjelper deg med å velge system, setter det opp og bygger integrasjonene, så regnskapet og resten av bedriften henger sammen.',
    href: '/tjenester/erp/',
  },
];

/** Flyd AS i Finanstilsynets virksomhetsregister (konsesjon «Regnskapsselskap»). */
export const virksomhetsregisteret = 'https://www.finanstilsynet.no/virksomhetsregisteret/detalj/?id=241680';

export type HubFaq = {
  q: string;
  /** Det synlige svaret. Det samme står i FAQPage. */
  a: string;
  /** Lenke under svaret (ikke med i JSON-LD). */
  lenke?: { href: string; tekst: string };
};

// Adressene hentes fra data/offices.ts, så svaret alltid stemmer med kortene.
const adresser = offices
  .map((o) => {
    const adresse = [hasOwnName(o) && o.name, o.street, o.postal].filter(Boolean).join(', ');
    return `${o.city} (${adresse})`;
  })
  .join(', ')
  .replace(/, ([^,(]+ \([^)]*\))$/, ' og $1');

export const hubFaq: HubFaq[] = [
  {
    q: 'Hvor har Flyd kontorer?',
    a: `Flyd har seks kontorer: ${adresser}. Alle kontorene har åpent ${openingHours.label.replace('Man–fre', 'mandag til fredag')}.`,
  },
  {
    q: 'Er Flyd et autorisert regnskapsforetak?',
    a: 'Ja. Flyd AS (org.nr. 933 662 934) er et godkjent regnskapsselskap med tillatelse fra Finanstilsynet. Du kan se tillatelsen i Finanstilsynets virksomhetsregister.',
    lenke: { href: virksomhetsregisteret, tekst: 'Finanstilsynets virksomhetsregister' },
  },
  {
    q: 'Kan dere være regnskapsfører for bedrifter i Stavanger og på Nord-Jæren?',
    a: 'Ja. Sandnes-kontoret i FOMO på Forus ligger midt i Stavanger-regionen og betjener Stavanger, Sandnes, Sola og Randaberg. Bilagene går digitalt, og møtene tar vi på Forus, hos deg eller på video.',
    lenke: { href: '/kontor/stavanger-sandnes/', tekst: 'Les om kontoret på Forus' },
  },
  {
    q: 'Må jeg bruke kontoret nærmest meg?',
    a: 'Nei. Ett nummer gjelder for alle kontorene. Ring +47 480 19 958 eller skriv til support@flyd.no, så setter vi deg i kontakt med riktig person.',
  },
  {
    q: 'Hvilke regnskapssystemer jobber dere i?',
    a: 'Vi jobber i Tripletex, Visma Business NXT, Uni Micro og PowerOffice Go. Vi hjelper deg også med å velge system, sette det opp og koble det til andre systemer, som nettbutikk, timeføring eller lager.',
    lenke: { href: '/tjenester/erp/', tekst: 'Les om programvare og ERP' },
  },
];
