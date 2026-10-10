import type { ServiceIconName } from '@/components/ServiceIcon';
import type { FlydIconName } from '@/components/FlydIcon';
import { synlig, type Status } from '@/lib/utkast';

/** Spørsmål og svar til «Vanlige spørsmål» på tjenestesiden. */
export type Faq = { q: string; a: string };

export type Service = {
  /** Ankeret på /tjenester/ (#id). Ikke endre: gamle lenker peker hit. */
  id: string;
  /** Adressen: /tjenester/[slug]/. */
  slug: string;
  /** «utkast» vises bare lokalt og på forhåndsvisninger (lib/utkast.ts). */
  status: Status;
  /** Tema i kontaktskjemaet (/kontakt?tema=…). Må finnes i ContactForm.tsx. */
  tema: string;
  title: string;
  short: string;
  long: string;
  bullets: string[];
  fitFor: string;
  /** 2D-ikon fra Flyds ikonsett (components/ServiceIcon.tsx). */
  icon: ServiceIconName;
  /** Ekte arbeidsbilde fra Flyd (4:3, WebP i public/tjenestebilder/). Vises på /tjenester. */
  image?: { src: string; alt: string };

  // Feltene under fyller malen for tjenestesiden. Seksjonen vises bare når
  // feltet har innhold. På utkast vises en [BEKREFT]-merknad i stedet.
  /** Problemet tjenesten løser, i kundens ord. */
  problem?: string;
  /** Slik jobber vi: 3–5 steg. */
  prosess?: { title: string; text: string }[];
  /** Hva prisen avhenger av. Ingen faste priser. */
  prisfaktorer?: string[];
  /** Spørsmål fra ekte kundesamtaler. */
  faq?: Faq[];
  /** Navn på fagpersonen (må finnes i data/team.ts). */
  fagperson?: string;
  /** Hvem tjenesten ikke passer for. */
  passerIkke?: string;
};

export const services: Service[] = [
  {
    id: 'regnskap-radgivning',
    slug: 'regnskap',
    status: 'publisert',
    tema: 'Regnskap og rådgivning',
    title: 'Regnskap og rådgivning',
    short: 'Fra daglig bokføring til strategisk sparring – én partner for både tallene og beslutningene.',
    long: 'Regnskapet skal være i orden, men det skal også fortelle deg noe. Vi tar ansvar for bokføring, fakturering, mva-oppgjør og årsoppgjør – og er samtidig sparringspartneren som hjelper deg å tolke tallene, se muligheter og ta bedre beslutninger. Enten du står foran oppkjøp, vekst, generasjonsskifte eller en vanskelig periode, får du en fast kontaktperson som kjenner virksomheten – og en rådgiver å støtte deg på når det virkelig gjelder.',
    bullets: [
      'Løpende bokføring, fakturering og årsoppgjør',
      'Merverdiavgift og terminoppgaver',
      'Budsjettering, likviditet og prognoser',
      'Strategisk økonomisk sparring',
      'Skatt, selskapsstruktur og generasjonsskifte',
      'Fast kontaktperson som kjenner bedriften',
    ],
    fitFor: 'Bedrifter som vil ha et trygt regnskap – og en rådgiver som ser hele bildet, ikke bare fjorårets tall.',
    icon: 'regnskap',
    image: { src: '/tjenestebilder/regnskap-radgivning.webp', alt: 'Rådgivningsmøte: kollega lytter engasjert mens en annen forklarer' },
  },
  {
    // UTKAST: i dag er rådgivning en del av «Regnskap og rådgivning».
    id: 'radgivning',
    slug: 'radgivning',
    status: 'utkast',
    tema: 'Regnskap og rådgivning',
    title: 'Rådgivning',
    short: '[BEKREFT: én setning om hva rådgivningen hjelper med]',
    long: '[BEKREFT: 2–4 setninger om rådgivningen som egen tjeneste, skrevet med en rådgiver i Flyd]',
    bullets: ['[BEKREFT: hva som inngår, punkt for punkt]'],
    fitFor: '[BEKREFT: hvem rådgivningen passer for]',
    icon: 'regnskap',
  },
  {
    id: 'programvare',
    slug: 'erp',
    status: 'publisert',
    tema: 'Programvare / ERP',
    title: 'Programvare / ERP',
    short: 'Velg, implementer og utnytt riktig forretningssystem. Tripletex, Visma Business NXT, Uni Micro, PowerOffice Go.',
    long: 'Vi hjelper deg å velge det systemet som passer virksomheten – ikke det vi tilfeldigvis selger. Vi implementerer, setter opp kontoplan, roller og rapporter, og sørger for at teamet ditt faktisk bruker systemet slik det var ment.',
    bullets: [
      'Systemvalg basert på faktiske behov',
      'Implementering og migrering',
      'Opplæring av sluttbrukere',
      'Tripletex · Visma Business NXT · Uni Micro · PowerOffice Go',
      'Videre forvaltning og optimalisering',
    ],
    fitFor: 'Virksomheter som skal bytte system, har vokst ut av det gamle, eller skal rydde opp etter en halvferdig implementering.',
    icon: 'erp',
    image: { src: '/tjenestebilder/programvare.webp', alt: 'Flyd-ansatt jobber i forretningssystemet ved skjermen' },
  },
  {
    id: 'integrasjoner',
    slug: 'integrasjoner',
    status: 'publisert',
    tema: 'Integrasjoner',
    title: 'Integrasjoner',
    short: 'Sømløs dataflyt mellom systemene dine. Mindre manuelt arbeid, mer oversikt.',
    long: 'Ingen grunn til å taste inn de samme dataene tre ganger. Vi kobler ERP, nettbutikk, lønnssystem, CRM og bransjeløsninger slik at dataene flyter dit de skal – automatisk, korrekt og etterprøvbart.',
    bullets: [
      'Kartlegging av dagens systemer og flaskehalser',
      'Standard- og skreddersydde integrasjoner',
      'API, webhooks og iPaaS-løsninger',
      'Feilhåndtering og overvåkning',
      'Dokumentasjon som holder når folk bytter rolle',
    ],
    fitFor: 'Bedrifter som opplever at data ikke stemmer mellom systemer, eller som gjør mye manuelt arbeid som burde vært automatisk.',
    icon: 'integrasjoner',
    image: { src: '/tjenestebilder/integrasjoner.webp', alt: 'Flyd-ansatt arbeider ved bred skjerm og laptop, med utsikt over Egersund' },
  },
  {
    id: 'analyse',
    slug: 'analyse-og-rapportering',
    status: 'publisert',
    tema: 'Analyse og rapportering',
    title: 'Analyse og rapportering',
    short: 'Standardrapporter og skreddersydde dashboards som gir deg innsikten du trenger.',
    long: 'Gode beslutninger krever god innsikt. Vi bygger rapporter og dashboards som viser det som faktisk betyr noe for din virksomhet – på en måte som er lett å lese, også for ikke-økonomer.',
    bullets: [
      'KPI-er som passer forretningsmodellen',
      'Dashboards i Power BI og lignende verktøy',
      'Periodiske lederrapporter',
      'Lønnsomhetsanalyse per kunde, produkt, avdeling',
      'Prognoser og scenarioanalyse',
    ],
    fitFor: 'Ledere som vil bytte ut magefølelsen med fakta, uten å bli oversvømt av tabeller.',
    icon: 'analyse',
    image: { src: '/tjenestebilder/analyse.webp', alt: 'Kollega presenterer for teamet på møterommet' },
  },
  {
    id: 'nettsider',
    slug: 'nettsider-og-digitale-flater',
    status: 'publisert',
    tema: 'Nettsider og digitale flater',
    title: 'Nettsider og digitale flater',
    short: 'Nettsider, kundeportaler og interne arbeidsflater – bygget tett på tallene og systemene dine.',
    long: 'En nettside skal gjøre en jobb – ikke bare se bra ut. Vi lager nettsider og digitale flater som henger sammen med ERP, regnskap og dataene dine, slik at teamet får mindre manuelt arbeid og kundene en ryddigere opplevelse. Denne siden, flyd.no, bygde vi selv.',
    bullets: [
      'Nettsider som er raske, tilgjengelige og enkle å vedlikeholde',
      'Kundeportaler knyttet til ERP og regnskap',
      'Interne arbeidsflater for team som gjør for mye manuelt',
      'Tett integrasjon mot systemene du allerede bruker',
      'Bygget av folk som kjenner driften og tallene dine fra før',
    ],
    fitFor: 'Virksomheter som vil ha en nettside eller digital løsning som henger sammen med resten av driften – ikke bare en frittstående markedsside.',
    icon: 'nettsider',
    image: { src: '/tjenestebilder/nettsider.webp', alt: 'Flyd-ansatt jobber med en nettside på bred skjerm' },
  },
  {
    id: 'lonn',
    slug: 'lonn-og-hr',
    status: 'publisert',
    tema: 'Lønn og HR',
    title: 'Lønn og HR',
    short: 'Trygg lønnskjøring og gode rutiner for alt som har med de ansatte å gjøre.',
    long: 'Lønn skal være riktig, til rett tid, hver gang. Vi tar ansvar for lønnskjøring, feriepenger, reiseregninger, a-melding og rapportering – og hjelper deg med personalhåndboka, rutiner og arbeidsavtaler når det trengs.',
    bullets: [
      'Lønnskjøring, feriepenger og skattekort',
      'A-melding og rapportering',
      'Reise- og utleggsregninger',
      'Pensjon (OTP) og forsikring',
      'Personalhåndbok, rutiner og avtaler',
    ],
    fitFor: 'Bedrifter som vil ha trygghet på at lønn og rapportering er riktig – og at de ansatte blir ivaretatt.',
    icon: 'lonn',
    image: { src: '/tjenestebilder/lonn-hr.webp', alt: 'Kollega ved pulten smiler opp til en kollega som stikker innom' },
  },
  {
    // UTKAST: ny tjeneste for gründere og nyetablerte.
    id: 'oppstart',
    slug: 'oppstart',
    status: 'utkast',
    tema: 'Regnskap og rådgivning',
    title: 'Oppstart',
    short: '[BEKREFT: én setning til gründere og nyetablerte]',
    long: '[BEKREFT: hva Flyd hjelper med ved oppstart: selskapsform, registrering, mva og første regnskapsår]',
    bullets: ['[BEKREFT: hva som inngår, punkt for punkt]'],
    fitFor: '[BEKREFT: hvem oppstartshjelpen passer for]',
    icon: 'regnskap',
  },
];

/** Tjenestene som vises nå (utkast bare lokalt og på forhåndsvisninger). */
export const visibleServices = services.filter(synlig);

export const serviceUrl = (s: Pick<Service, 'slug'>) => `/tjenester/${s.slug}/`;

export function getServiceBySlug(slug: string): Service | undefined {
  return visibleServices.find((s) => s.slug === slug);
}

export type ErpSystem = {
  /** Ankeret på /tjenester/ og forsiden. */
  id: string;
  /** Adressen: /tjenester/erp/[slug]/. */
  slug: string;
  /** Systemsidene er utkast til konsulentene har skrevet vurderingen. */
  status: Status;
  name: string;
  tagline: string;
  description: string;
  /** Ikon fra Flyds ikonsett (components/FlydIcon.tsx) som speiler taglinen. Vises på forsiden. */
  icon: FlydIconName;

  // Feltene under fyller malen for systemsiden (/tjenester/erp/[slug]/).
  /** Hvem systemet passer for, med konsulentenes ord. */
  passerFor?: string;
  /** Styrker, sagt ærlig. */
  styrker?: string[];
  /** Svakheter, sagt like ærlig. */
  svakheter?: string[];
  /** Typisk innføringstid og hva den avhenger av. */
  innforing?: string;
  /** Integrasjoner Flyd har bygget mot systemet. */
  integrasjoner?: string[];
  /** Leverandørens offisielle prisside. Ikke kopier priser hit. */
  prisside?: string;
};

export const erpSystems: ErpSystem[] = [
  {
    id: 'tripletex',
    slug: 'tripletex',
    status: 'utkast',
    name: 'Tripletex',
    tagline: 'Brukervennlig og skybasert',
    icon: 'sky',
    description: 'Raskt å komme i gang med, og vokser fra små bedrifter til virksomheter med flere avdelinger og mange ansatte.',
  },
  {
    id: 'visma',
    slug: 'visma-business-nxt',
    status: 'utkast',
    name: 'Visma Business NXT',
    tagline: 'Komplett ERP',
    icon: 'erp',
    description: 'For mellomstore og større bedrifter som trenger dybde i økonomi, logistikk og prosjekt – i ett og samme system.',
  },
  {
    id: 'unimicro',
    slug: 'uni-micro',
    status: 'utkast',
    name: 'Uni Micro',
    tagline: 'Fleksibelt og integrerbart',
    icon: 'plugg',
    description: 'Egner seg når du trenger skreddersøm og vil koble regnskapet tett til de andre løsningene du bruker.',
  },
  {
    id: 'poweroffice',
    slug: 'poweroffice-go',
    status: 'utkast',
    name: 'PowerOffice Go',
    tagline: 'Moderne og automatisert',
    icon: 'automatisering',
    description: 'En favoritt hos regnskapsbyråer. Passer bedrifter som vil ha enkle rutiner og minst mulig manuell registrering.',
  },
];

export const visibleErpSystems = erpSystems.filter(synlig);

export const erpUrl = (e: Pick<ErpSystem, 'slug'>) => `/tjenester/erp/${e.slug}/`;

export function getErpBySlug(slug: string): ErpSystem | undefined {
  return visibleErpSystems.find((e) => e.slug === slug);
}

/** Sammenligningen av systemene er et utkast til konsulentene har skrevet den. */
export const erpComparisonStatus: Status = 'utkast';
