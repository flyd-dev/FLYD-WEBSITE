import type { LucideIcon } from 'lucide-react';
import {
  Calculator,
  Compass,
  LayoutGrid,
  Workflow,
  BarChart3,
  Users,
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
    id: 'regnskap',
    title: 'Regnskap',
    short: 'Vi tar hånd om regnskapet ditt – så du kan fokusere på det du gjør best.',
    long: 'Regnskap skal ikke være noe du tenker på hver dag. Vi tar ansvar for bokføring, fakturering, mva-oppgjør og årsoppgjør – med moderne verktøy og en fast kontaktperson som kjenner bedriften din. Du får færre avbrudd, mer forutsigbarhet og et regnskap som faktisk er til å stole på.',
    bullets: [
      'Løpende bokføring og avstemming',
      'Fakturering, purring og inkasso',
      'Merverdiavgift og terminoppgaver',
      'Årsoppgjør, ligning og regnskapsavslutning',
      'Fast kontaktperson som kjenner virksomheten',
    ],
    fitFor: 'Bedrifter som vil ha et profesjonelt regnskap uten selv å måtte bygge regnskapskompetanse internt.',
    icon: Calculator,
  },
  {
    id: 'radgivning',
    title: 'Rådgivning',
    short: 'Fra økonomisk analyse til strategisk sparring. Vi er rådgiveren din i alle faser.',
    long: 'Vi er mer enn bare tallknusere. Vi er sparringspartneren som hjelper deg å tolke tallene, se muligheter og ta bedre beslutninger – enten du står foran oppkjøp, vekst, generasjonsskifte eller en vanskelig periode.',
    bullets: [
      'Budsjettering, likviditet og prognoser',
      'Strategisk økonomisk sparring',
      'Skatt, selskapsstruktur og omorganisering',
      'Oppkjøp, fusjon og generasjonsskifte',
      'Due diligence og verdivurdering',
    ],
    fitFor: 'Ledere og eiere som trenger en rådgiver som ser hele bildet – ikke bare fjorårets tall.',
    icon: Compass,
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
