import { offices, hasOwnName, openingHours } from './offices';
import { stat } from './stats';
import { bytteRevisor } from './revisjon';

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
  /** Lenketeksten til kontorsiden. */
  lenketekst: string;
};

export const kontorBlokker: Record<string, KontorBlokk> = {
  'stavanger-sandnes': {
    omrade: 'Stavanger, Sandnes, Sola, Randaberg og resten av Nord-Jæren',
    lenketekst: 'Se mer om kontoret og folkene i Sandnes',
  },
  egersund: {
    omrade: 'Eigersund og resten av Dalane',
    lenketekst: 'Se mer om kontoret og folkene i Egersund',
  },
  sokndal: {
    omrade: 'Sokndal og omegn',
    lenketekst: 'Se mer om kontoret og folkene i Sokndal',
  },
  moi: {
    omrade: 'Lund og områdene langs E39 mellom Egersund og Flekkefjord',
    lenketekst: 'Se mer om kontoret og folkene på Moi',
  },
  sirdal: {
    omrade: 'Sirdal',
    lenketekst: 'Se mer om kontoret og folkene i Sirdal',
  },
  flekkefjord: {
    omrade: 'Flekkefjord og resten av Lister-regionen',
    lenketekst: 'Se mer om kontoret og folkene i Flekkefjord',
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
  {
    // Står sist og for seg: revisjon leveres ikke sammen med regnskapet (Irene 22.10.2026).
    title: 'Revisjon',
    text: 'Lovbestemt revisjon, revisorbekreftelser og andre attestasjonstjenester, fra revisjonsteamet i Sokndal.',
    href: '/tjenester/revisjon/',
  },
];

/** Flyd AS i Finanstilsynets virksomhetsregister (konsesjon «Regnskapsselskap»). */
export const virksomhetsregisteret = 'https://www.finanstilsynet.no/virksomhetsregisteret/detalj/?id=241680';

/**
 * Revisjonsselskapet (tidligere Liit AS, står som FLYD AS) i Finanstilsynets
 * virksomhetsregister (konsesjon «Revisjonsselskap»). Lenken bruker registerets
 * egen id, ikke org.nr.
 */
export const virksomhetsregisteretRevisjon = 'https://www.finanstilsynet.no/virksomhetsregisteret/detalj/?id=235342';

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
    q: 'Må jeg bruke kontoret nærmest meg?',
    a: 'Nei. Ett nummer gjelder for alle kontorene. Ring +47 480 19 958 eller skriv til support@flyd.no, så setter vi deg i kontakt med riktig person.',
  },
  {
    q: 'Kan dere være regnskapsfører for bedrifter i Stavanger og på Nord-Jæren?',
    a: 'Ja. Sandnes-kontoret i FOMO på Forus ligger midt i Stavanger-regionen og betjener Stavanger, Sandnes, Sola og Randaberg. Bilagene går digitalt, og møtene tar vi på Forus, hos deg eller på video.',
    lenke: { href: '/kontor/stavanger-sandnes/', tekst: 'Les om kontoret på Forus' },
  },
  // Autorisasjonen: antall statsautoriserte, ikke antall kunder (Arnstein 22.10.2026).
  {
    q: 'Er Flyd et autorisert regnskapsforetak?',
    a: `Ja. Et selskap som fører regnskap for andre, må ha tillatelse fra Finanstilsynet, og hvert oppdrag skal ha en oppdragsansvarlig statsautorisert regnskapsfører som har ansvaret for at arbeidet er gjort etter reglene. Flyd AS er et godkjent regnskapsselskap, og vi er ${stat('statsautoriserte').value} statsautoriserte regnskapsførere.`,
    lenke: { href: virksomhetsregisteret, tekst: 'Se tillatelsen i Finanstilsynets virksomhetsregister' },
  },
  {
    q: 'Er Flyd et godkjent revisjonsselskap?',
    a: `Ja. Et selskap som er revisor, må ha tillatelse fra Finanstilsynet, og hvert oppdrag skal ha en oppdragsansvarlig statsautorisert revisor som har ansvaret for at revisjonen utføres i henhold til lovverket. Flyd AS er et godkjent revisjonsselskap, og vi er ${stat('revisorer').value} statsautoriserte revisorer.`,
    lenke: { href: virksomhetsregisteretRevisjon, tekst: 'Se tillatelsen i Finanstilsynets virksomhetsregister' },
  },
  {
    q: 'Hvilke regnskapssystemer jobber dere i?',
    a: 'Vi jobber i Tripletex, Visma Business NXT, Uni Micro og PowerOffice Go. Vi hjelper deg også med å velge system, sette det opp og koble det til andre systemer, som nettbutikk, timeføring eller lager.',
    lenke: { href: '/tjenester/erp/', tekst: 'Les om programvare og ERP' },
  },
  // Bytte regnskapsfører og bytte revisor står hver for seg (revisjon og regnskap holdes adskilt).
  {
    q: 'Hvordan bytter jeg regnskapsfører?',
    a: 'Du sier opp skriftlig etter avtalen du har, og avtaler en tydelig overgangsdato. Vi tar kontakt med den tidligere regnskapsføreren og henter over det vi trenger, så regnskapet fortsetter uten opphold.',
    lenke: { href: '/bytte-regnskapsforer/', tekst: 'Slik bytter du regnskapsfører' },
  },
  {
    q: 'Hvordan bytter jeg revisor?',
    a: bytteRevisor.ingress,
    lenke: { href: bytteRevisor.path, tekst: 'Slik bytter du revisor' },
  },
];
