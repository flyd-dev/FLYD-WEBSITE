import type { LucideIcon } from 'lucide-react';
import {
  Calculator,
  LayoutGrid,
  Workflow,
  BarChart3,
  Users,
  MonitorSmartphone,
} from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  short: string;
  long: string;
  bullets: string[];
  fitFor: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: 'regnskap-radgivning',
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
    icon: Calculator,
  },
  {
    id: 'programvare',
    title: 'Programvare / ERP',
    short: 'Velg, implementer og utnytt riktig forretningssystem. Tripletex, Visma Business NXT, UniMicro, PowerOffice Go.',
    long: 'Vi hjelper deg å velge det systemet som passer virksomheten – ikke det vi tilfeldigvis selger. Vi implementerer, setter opp kontoplan, roller og rapporter, og sørger for at teamet ditt faktisk bruker systemet slik det var ment.',
    bullets: [
      'Systemvalg basert på faktiske behov',
      'Implementering og migrering',
      'Opplæring av sluttbrukere',
      'Tripletex · Visma Business NXT · UniMicro · PowerOffice Go',
      'Videre forvaltning og optimalisering',
    ],
    fitFor: 'Virksomheter som skal bytte system, har vokst ut av det gamle, eller skal rydde opp etter en halvferdig implementering.',
    icon: LayoutGrid,
  },
  {
    id: 'integrasjoner',
    title: 'Integrasjoner',
    short: 'Sømløs dataflyt mellom systemene dine. Mindre manuelt arbeid, mer oversikt.',
    long: 'Ingen grunn til å taste inn de samme dataene tre ganger. Vi kobler ERP, nettbutikk, lønnssystem, CRM og bransjeløsninger slik at data flyter dit den skal – automatisk, korrekt og etterprøvbart.',
    bullets: [
      'Kartlegging av dagens systemer og flaskehalser',
      'Standard- og skreddersydde integrasjoner',
      'API, webhooks og iPaaS-løsninger',
      'Feilhåndtering og overvåkning',
      'Dokumentasjon som holder når folk bytter rolle',
    ],
    fitFor: 'Bedrifter som opplever at data ikke stemmer mellom systemer, eller som gjør mye manuelt arbeid som burde vært automatisk.',
    icon: Workflow,
  },
  {
    id: 'analyse',
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
    icon: BarChart3,
  },
  {
    id: 'nettsider',
    title: 'Nettsider og digitale flater',
    short: 'Nettsider, kundeportaler og interne arbeidsflater — bygget tett på tallene og systemene dine.',
    long: 'En nettside skal gjøre en jobb — ikke bare se bra ut. Vi lager nettsider og digitale flater som henger sammen med ERP, regnskap og dataene dine, slik at teamet får mindre manuelt arbeid og kundene en ryddigere opplevelse. Denne siden, flyd.no, bygde vi selv.',
    bullets: [
      'Nettsider som er raske, tilgjengelige og enkle å vedlikeholde',
      'Kundeportaler knyttet til ERP og regnskap',
      'Interne arbeidsflater for team som gjør for mye manuelt',
      'Tett integrasjon mot systemene dere allerede bruker',
      'Bygget av folk som kjenner driften og tallene deres fra før',
    ],
    fitFor: 'Virksomheter som vil ha en nettside eller digital løsning som henger sammen med resten av driften – ikke bare en frittstående markedsside.',
    icon: MonitorSmartphone,
  },
  {
    id: 'lonn',
    title: 'Lønn og HR',
    short: 'Trygg lønnskjøring og gode rutiner for alt som har med de ansatte å gjøre.',
    long: 'Lønn skal være riktig, til rett tid, hver gang. Vi tar ansvar for lønnskjøring, feriepenger, reiseregninger, a-melding og rapportering – og hjelper deg med personalhåndboka, rutiner og arbeidsavtaler når det trengs.',
    bullets: [
      'Lønnskjøring, feriepenger og skattekort',
      'A-melding og rapportering',
      'Reise- og utleggsregninger',
      'Pensjon, forsikring og OTP',
      'Personalhåndbok, rutiner og avtaler',
    ],
    fitFor: 'Bedrifter som vil ha trygghet på at lønn og rapportering er riktig – og at de ansatte blir ivaretatt.',
    icon: Users,
  },
];

export type ErpSystem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
};

export const erpSystems: ErpSystem[] = [
  {
    id: 'tripletex',
    name: 'Tripletex',
    tagline: 'Brukervennlig og skybasert',
    description: 'Moderne, skybasert regnskaps- og ERP-system som er raskt å komme i gang med — skalerer fint fra små til relativt store virksomheter.',
  },
  {
    id: 'visma',
    name: 'Visma Business NXT',
    tagline: 'Komplett ERP',
    description: 'Komplett forretningssystem for mellomstore og større bedrifter med behov for dybde i økonomi, logistikk og prosjekt.',
  },
  {
    id: 'unimicro',
    name: 'UniMicro',
    tagline: 'Fleksibelt og integrerbart',
    description: 'Fleksibelt system med gode integrasjonsmuligheter. Egner seg godt når du trenger skreddersøm og datakobling til andre løsninger.',
  },
  {
    id: 'poweroffice',
    name: 'PowerOffice Go',
    tagline: 'Moderne og automatisert',
    description: 'Moderne, automatisert regnskap. Favoritt hos regnskapsbyråer og bedrifter som prioriterer enkelhet og automatisering.',
  },
];
