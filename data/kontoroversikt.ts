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

/**
 * Autorisasjonen på /kontor: regnskap og revisjon side om side, hver for seg,
 * synlig på siden og ikke gjemt i spørsmål og svar (Irene 22.10.2026, som på
 * flyd.no før omleggingen). Antall statsautoriserte, ikke antall kunder
 * (Arnstein 22.10.2026). Under hver står bytteguiden for samme fag.
 */
export const autorisasjon = [
  {
    tittel: 'Autoriserte regnskapsførere – hva det betyr for deg',
    tekst:
      'Et selskap som fører regnskap for andre, må ha tillatelse fra Finanstilsynet. Hvert oppdrag skal ha en oppdragsansvarlig statsautorisert regnskapsfører, som har ansvaret for at arbeidet er gjort etter reglene.',
    oss: `Flyd AS er et godkjent regnskapsselskap. Vi er ${stat('statsautoriserte').value} statsautoriserte regnskapsførere.`,
    register: virksomhetsregisteret,
    bytte: {
      tekst:
        'Har du regnskapsfører i dag og vurderer å bytte? Vi tar kontakt med den tidligere regnskapsføreren og henter over regnskapsdata, avtaler og dokumentasjon, så du slipper å være mellomledd.',
      href: '/bytte-regnskapsforer/',
      lenketekst: 'Slik bytter du regnskapsfører',
    },
  },
  {
    tittel: 'Autorisert revisor – hva det betyr for deg',
    tekst:
      'Et selskap som er revisor, må ha tillatelse fra Finanstilsynet. Hvert oppdrag skal ha en oppdragsansvarlig statsautorisert revisor, som har ansvaret for at revisjonen utføres i henhold til lovverket.',
    oss: `Flyd AS er et godkjent revisjonsselskap. Vi er ${stat('revisorer').value} statsautoriserte revisorer.`,
    register: virksomhetsregisteretRevisjon,
    bytte: {
      tekst:
        'Skal du bytte revisor, er det generalforsamlingen som velger ny revisor. Den nye revisoren vurderer oppdraget og veileder deg gjennom resten.',
      href: bytteRevisor.path,
      lenketekst: 'Slik bytter du revisor',
    },
  },
];

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
  {
    q: 'Hvilke regnskapssystemer jobber dere i?',
    a: 'Vi jobber i Tripletex, Visma Business NXT, Uni Micro og PowerOffice Go. Vi hjelper deg også med å velge system, sette det opp og koble det til andre systemer, som nettbutikk, timeføring eller lager.',
    lenke: { href: '/tjenester/erp/', tekst: 'Les om programvare og ERP' },
  },
];
