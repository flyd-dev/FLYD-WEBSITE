import { synlig, type Status } from '@/lib/utkast';

/**
 * Kundehistoriene under /om-flyd/kundehistorier/. Hver historie får sin egen
 * side (/om-flyd/kundehistorier/<slug>/), så den kan deles i nyhetsbrev, på
 * Linktree og i sosiale medier. Oversikten, sitemapen og lenkene i footer og
 * på /om-flyd bygges herfra.
 *
 * Tekstene er skrevet om fra det Flyd og partnerne allerede har publisert
 * (innlegg på Facebook, kundehistoriene hos Visma Software og artikkelen hos
 * iizy). De inneholder ikke noe som ikke står i kildene.
 *
 * De fem første ble publisert 12.11.2026 etter beskjed fra Flyd. Nye historier
 * legges inn med `status: 'utkast'` til kunden har sagt ja til tekst, navn,
 * sitat og logo; utkast vises bare lokalt og på forhåndsvisninger
 * (lib/utkast.ts). Framgangsmåten og samtykketeksten står på /designlab/.
 *
 * Bare kunder av regnskap, lønn, programvare og integrasjoner – ikke revisjon.
 */
export type Kundehistorie = {
  slug: string;
  status: Status;
  /** Navnet slik det står i brødsmulene og på kortet. */
  kunde: string;
  /** Logoen fra public/customer-logo/ (300 px høy, se data/logos.ts). */
  logo: { src: string; alt: string };
  /** Sidetittel og h1, setningsstil. */
  tittel: string;
  /** Ingress, også brukt som beskrivelse i søk og ved deling. */
  ingress: string;
  bransje: string;
  sted: string;
  /** Hva Flyd leverer. Med `href` lenkes det til tjenestesiden. */
  leveranse: { label: string; href?: string }[];
  /** Brødteksten, ett avsnitt per streng. Kort: to til fire avsnitt. */
  avsnitt: string[];
  /** Tall kunden selv har oppgitt. Aldri anslag fra oss. */
  tall?: { verdi: string; tekst: string }[];
  /** Sitat fra kunden, ordrett fra kilden. */
  sitat?: { tekst: string; navn: string; rolle: string };
  /** Der historien er omtalt fra før (åpnes i nytt vindu). */
  kilder?: { tittel: string; hos: string; href: string }[];
  /** ISO-datoer (åååå-mm-dd). `modified` oppdateres når teksten endres. */
  published: string;
  modified: string;
};

const alle: Kundehistorie[] = [
  {
    slug: 'batsfjord-laboratorium',
    status: 'publisert',
    kunde: 'Båtsfjord Laboratorium',
    logo: { src: '/customer-logo/balab_logo_000.webp', alt: 'Båtsfjord Laboratorium' },
    tittel: 'Båtsfjord Laboratorium kuttet 80 prosent av det manuelle arbeidet',
    ingress:
      'Med Visma Business NXT koblet til fagsystemet LabCollector gikk laboratoriet fra 10–15 timer manuelt arbeid i måneden til 2–3. Flyd leverte løsningen sammen med iizy.',
    bransje: 'Laboratorium',
    sted: 'Båtsfjord',
    leveranse: [
      { label: 'Programvare / ERP', href: '/tjenester/erp/' },
      { label: 'Integrasjoner', href: '/tjenester/integrasjoner/' },
    ],
    tall: [
      { verdi: '80 %', tekst: 'mindre tid på manuelt arbeid' },
      { verdi: '2–3 timer', tekst: 'i måneden, mot 10–15 timer før' },
    ],
    avsnitt: [
      'Båtsfjord Laboratorium har levert hygiene- og analysetjenester til fiskeindustrien siden 1997. Laboratoriet har fem ansatte og kunder over hele landet, og er Norges nordligste akkrediterte laboratorium.',
      'Da bedriften ønsket en fremtidsrettet løsning for økonomi og fakturering, falt valget på Visma Business NXT, koblet til fagsystemet LabCollector. Flyd leverte løsningen, og Kai Mydland og Beate Sørgulen ledet innføringen. Integrasjonen mot LabCollector er utviklet av iizy, og den er laget slik at også andre med lignende behov kan bruke den.',
      'Mye av det manuelle arbeidet er automatisert, samtidig som laboratoriet har beholdt kontroll og fleksibilitet der det trengs. Rapporter og innsikt er tilgjengelig når de trenger det, og det gir et bedre beslutningsgrunnlag i hverdagen.',
      'For oss viste prosjektet at moderne økonomisystemer fungerer godt også for spesialiserte miljøer – uansett hvor i landet man holder til.',
    ],
    sitat: {
      tekst:
        'Vi har gått fra å bruke 10–15 timer i måneden på manuelle prosesser til kun 2–3 timer. Dette frigjør verdifull tid til faglig arbeid og legger til rette for lavere regnskapskostnader på sikt.',
      navn: 'Mattis A. Tangeraas',
      rolle: 'Daglig leder, Båtsfjord Laboratorium',
    },
    kilder: [
      {
        tittel: 'Båtsfjord Laboratorium kuttet 80 prosent av det manuelle arbeidet med Business NXT',
        hos: 'Visma Software',
        href: 'https://www.vismasoftware.no/kundehistorier/batsfjord-kuttet-80-prosent-av-det-manuelle-arbeidet-med-business-nxt',
      },
      {
        tittel: 'Flyd løfter regnskapsbransjen med integrasjoner',
        hos: 'iizy',
        href: 'https://iizy.no/aktuelt/flyd-lofter-regnskapsbransjen-med-integrasjoner',
      },
    ],
    published: '2026-11-11',
    modified: '2026-11-11',
  },
  {
    slug: 'lervig',
    status: 'publisert',
    kunde: 'Lervig',
    logo: { src: '/customer-logo/lervig.webp', alt: 'Lervig' },
    tittel: 'Lervig valgte Flyd som regnskapspartner',
    ingress:
      'Lervig har vokst til en nasjonal merkevare, og fra Hillevåg i Stavanger når bryggeriet kunder i over 30 land. Flyd leverer regnskaps- og økonomitjenester.',
    bransje: 'Bryggeri',
    sted: 'Stavanger',
    leveranse: [{ label: 'Regnskap og rådgivning', href: '/tjenester/regnskap/' }],
    avsnitt: [
      'Lervig har vokst til å bli en nasjonal merkevare. Produktene finnes i butikker og på utsalgssteder over store deler av landet, og fra Hillevåg i Stavanger når bryggeriet i tillegg kunder i over 30 land.',
      'Flyd leverer regnskaps- og økonomitjenester til Lervig. Det betyr mye for oss at en virksomhet i vekst, med base i Stavanger, har valgt oss som partner – og vi gleder oss til fortsettelsen.',
    ],
    sitat: {
      tekst:
        'Flyd skilte seg ut allerede i første møte. De har kompetanse på både regnskap og teknologi, og ser økonomien og systemene i sammenheng. Det gir oss en partner som forstår hele virksomheten vår.',
      navn: 'Stein Erik Opheim',
      rolle: 'Lervig',
    },
    published: '2026-11-11',
    modified: '2026-11-11',
  },
  {
    slug: 'arkit',
    status: 'publisert',
    kunde: 'Arkit',
    logo: { src: '/customer-logo/arkit.webp', alt: 'Arkit – arkitekt- og ingeniørtjenester' },
    tittel: 'Arkit fikk bedre oversikt og mer tid til prosjektene',
    ingress:
      'Arkit og Arkit Arealplan byttet til Visma Business NXT, koblet til prosjektverktøyet Severa. Flyd leverte løsningen og fulgte opp innføringen.',
    bransje: 'Arkitekt- og ingeniørkontor',
    sted: 'Rogaland',
    leveranse: [{ label: 'Programvare / ERP', href: '/tjenester/erp/' }],
    avsnitt: [
      'Arkit ble etablert som tegne- og arkitektkontor i 1998, og er i dag en komplett leverandør av konsulenttjenester for byggmarkedet. Sammen med Arkit Arealplan jobber de med alt fra tegning av bygg til reguleringsplaner, veiprosjektering og 3D-visualisering – ofte i mange prosjekter samtidig.',
      'Da bedriften var klar for en ny systemløsning, falt valget på Visma Business NXT, koblet til prosjektverktøyet Severa. Kombinasjonen har gitt bedre oversikt over ressursbruken, enklere fakturering og mer kontroll på prosjektøkonomien. Det er lettere å følge timeforbruk, budsjetter og fremdrift, og rapporteringen går raskt.',
      'Flyd leverte løsningen. Målet var ikke bare å sette opp systemet, men at Arkit skulle bruke det på en måte som gir verdi i hverdagen – og mer tid til prosjektene.',
    ],
    sitat: {
      tekst:
        'Vi opplevde implementeringsprosessen som ryddig og enkel. Det var alltid rom for å stille spørsmål underveis, og det var aldri snakk om å bare sette opp systemet og overlate oss til oss selv. Vi fikk hjelp til å bruke systemet på en måte som faktisk fungerer for oss og gir verdi i hverdagen.',
      navn: 'Magne Skoland',
      rolle: 'Daglig leder, Arkit',
    },
    kilder: [
      {
        tittel: 'På vei inn i fremtiden med automatisering og AI – takket være Business NXT',
        hos: 'Visma Software',
        href: 'https://www.vismasoftware.no/kundehistorier/pa-vei-inn-i-fremtiden-med-automatisering-ai-og-business-nxt',
      },
    ],
    published: '2026-11-11',
    modified: '2026-11-11',
  },
  {
    slug: 'sirdal-fjellpark',
    status: 'publisert',
    kunde: 'Sirdal Fjellpark',
    logo: { src: '/customer-logo/sirdal_fjellpark.webp', alt: 'Sirdal Fjellpark' },
    tittel: 'Bedre flyt i administrasjonen hos Sirdal Fjellpark',
    ingress:
      'Sirdal Fjellpark har utviklet Ålsheia og Tjørhomfjellet til et helårstilbud. Flyd leverer regnskap og økonomi, og løsninger som gjør den administrative hverdagen enklere.',
    bransje: 'Skianlegg og helårsdestinasjon',
    sted: 'Sirdal',
    leveranse: [
      { label: 'Regnskap og rådgivning', href: '/tjenester/regnskap/' },
      { label: 'Løsninger for administrasjon' },
    ],
    avsnitt: [
      'Gjennom utviklingen av Ålsheia og Tjørhomfjellet har Sirdal Fjellpark vært med på å gjøre Sirdal til en av de mest attraktive destinasjonene på Sør-Vestlandet. Helårstilbudet samler fastboende, hyttefolk og tilreisende, og skaper aktivitet og verdier som betyr mye for både lokalsamfunnet og regionen.',
      'Flyd bidrar med regnskaps- og økonomitjenester, og med løsninger som effektiviserer arbeidshverdagen og gir bedre flyt i de administrative prosessene.',
      'Vi har selv kontor i Sirdal, og setter stor pris på samarbeidet. Vi gleder oss til fortsettelsen.',
    ],
    published: '2026-11-11',
    modified: '2026-11-11',
  },
  {
    slug: 'arring',
    status: 'publisert',
    kunde: 'Årring',
    logo: { src: '/customer-logo/arring.webp', alt: 'Årring' },
    tittel: 'Med Årring fra første dag',
    ingress:
      'Da tømrerbedriften Årring ble startet i 2026, var Flyd med fra etableringen – med råd, veiledning og praktisk hjelp.',
    bransje: 'Tømrerbedrift',
    sted: 'Rogaland',
    leveranse: [
      { label: 'Råd og hjelp ved etablering' },
      { label: 'Regnskap og rådgivning', href: '/tjenester/regnskap/' },
    ],
    avsnitt: [
      'Årring er en tømrerbedrift som ble startet i august 2026. Flyd fikk være med fra starten, med råd, veiledning og litt praktisk hjelp i forbindelse med etableringen.',
      'Nå følger vi Daniel og gjengen videre. Vår jobb er å sørge for at det er kontroll på regnskapet, slik at de kan konsentrere seg om å bygge gode greier.',
      'Vi er stolte og takknemlige for å få være med, og ønsker lykke til med satsingen.',
    ],
    published: '2026-11-11',
    modified: '2026-11-11',
  },
];

export const kundehistorierPath = '/om-flyd/kundehistorier/';
export const kundehistoriePath = (h: Pick<Kundehistorie, 'slug'>) => `${kundehistorierPath}${h.slug}/`;

/** Historiene som vises nå: publiserte alltid, utkast bare i utkastmodus. */
export const kundehistorier = alle.filter(synlig);

/** Bare de publiserte – til sitemapen, som aldri skal ha med utkast. */
export const publiserteKundehistorier = alle.filter((h) => h.status === 'publisert');

/** Er alt som vises utkast? Da er også oversikten et utkast. */
export const kunUtkast = publiserteKundehistorier.length === 0;

export function getKundehistorie(slug: string): Kundehistorie | undefined {
  return kundehistorier.find((h) => h.slug === slug);
}
