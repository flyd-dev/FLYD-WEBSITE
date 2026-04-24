export type Job = {
  slug: string;
  title: string;
  location: string;
  workplace?: string;
  type: string;
  percentage?: string;
  ingress: string;
  sections: { heading: string; body?: string; bullets?: string[] }[];
  applyEmail: string;
  deadline?: string;
  startDate?: string;
  datePosted?: string;
  validThrough?: string;
  contact?: {
    name: string;
    role?: string;
    phone: string;
    email: string;
  };
};

export const jobs: Job[] = [
  {
    slug: 'regnskapsforer-stavanger',
    title: 'Regnskapsfører',
    location: 'Stavanger',
    workplace: 'Forus, Sandnes',
    type: 'Heltid',
    percentage: '100 %',
    startDate: 'Etter avtale',
    deadline: 'Snarest',
    applyEmail: 'marit.christensen@flyd.no',
    contact: {
      name: 'Marit Haga Christensen',
      role: 'Kontaktperson',
      phone: '470 17 697',
      email: 'marit.christensen@flyd.no',
    },
    ingress:
      'Bli en del av et kompetansehus som leverer regnskap, strategisk rådgivning og fremtidsrettede systemløsninger – i samme miljø. Vi søker en dyktig regnskapsfører til kontoret på Forus.',
    sections: [
      {
        heading: 'Om stillingen',
        body: 'Vi søker en dyktig og dedikert regnskapsfører til vårt kontor på Forus. Som en del av Flyd vil du spille en nøkkelrolle i å bygge opp et moderne og profesjonelt miljø for økonomisk rådgivning og regnskapsførsel. Hos oss jobber du sammen med andre fagpersoner innen økonomi, teknologi og rådgivning – og bidrar til å skape effektive tjenester for kundene våre.',
      },
      {
        heading: 'Hvem leter vi etter?',
        body: 'Vår nye medarbeider trives med utfordringer og er opptatt av å levere høy kvalitet. Du er en lagspiller som verdsetter samarbeid, samtidig som du har en brennende interesse for regnskap og økonomi.',
      },
      {
        heading: 'Arbeidsoppgaver',
        bullets: [
          'Fullføring av regnskap fra A til Å for en spennende kundebase',
          'Kontinuerlig dialog og oppfølging av kunder',
          'Årsoppgjør og rapportering',
          'Bidra til utvikling av rutiner og prosesser',
          'Sikre leveranse i henhold til gjeldende kvalitetskrav for system og rutiner',
          'Rapportering i henhold til lovkrav',
          'Mulighet for oppdragsansvar for definert portefølje dersom du er statsautorisert regnskapsfører',
        ],
      },
      {
        heading: 'Kvalifikasjoner',
        body: 'Vi ser etter deg som:',
        bullets: [
          'Er statsautorisert regnskapsfører i Norge – erfaring kan kompensere for kravet til autorisasjon',
          'Har erfaring fra tilsvarende stilling eller arbeidsoppgaver',
          'Har kunnskap innen norsk regnskapslovgivning, skatt og avgift',
          'Er trygg på bruk av regnskapssystemer',
          'Har gode kommunikasjonsferdigheter, både muntlig og skriftlig',
          'Er strukturert og nøyaktig',
          'Er serviceinnstilt og har gode samarbeidsevner',
          'Ikke er redd for å ta i bruk nye teknologiske muligheter',
        ],
      },
      {
        heading: 'Vi tilbyr',
        bullets: [
          'Konkurransedyktige betingelser',
          'Et faglig sterkt og inkluderende arbeidsmiljø',
          'Gode utviklingsmuligheter, både faglig og personlig',
          'Fleksibel arbeidstid og mulighet for hjemmekontor',
          'Gode pensjons- og forsikringsordninger',
        ],
      },
    ],
  },
  {
    slug: 'losningsradgiver-stavanger',
    title: 'Løsningsrådgiver',
    location: 'Stavanger',
    workplace: 'Stavanger',
    type: 'Heltid',
    percentage: '100 %',
    startDate: 'Etter avtale',
    deadline: 'Snarest',
    applyEmail: 'kai.mydland@flyd.no',
    contact: {
      name: 'Kai Mydland',
      role: 'Kontaktperson',
      phone: '480 19 958',
      email: 'kai.mydland@flyd.no',
    },
    ingress:
      'Vil du være med å digitalisere og transformere fremtidens forretningsprosesser? Flyd søker en løsningsrådgiver som vil skape varige verdier for kundene våre.',
    sections: [
      {
        heading: 'Om stillingen',
        body: 'Som løsningsrådgiver vil du spille en sentral rolle i å hjelpe kundene våre med å optimalisere og forbedre forretningsprosessene sine gjennom innovative digitale løsninger. Flyd er et nyoppstartet kompetansehus med en sterk kombinasjon av lang erfaring innen økonomi, teknologi og rådgivning. Vi er på jakt etter deg som deler vår lidenskap for teknologi og som vil være med å skape varige verdier for kundene våre.',
      },
      {
        heading: 'Hva rollen innebærer',
        body: 'Du vil jobbe tett med kundene for å kartlegge behov, identifisere forbedringsområder og implementere digitale løsninger som gir dem en konkurransefordel. Du blir en del av et selskap som setter innovasjon høyt, og får stor frihet til å påvirke både din egen og selskapets utvikling.',
      },
      {
        heading: 'Arbeidsoppgaver',
        bullets: [
          'Rådgivning til kunder om digitalisering og effektivisering av forretningsprosesser',
          'Identifisere og implementere digitale løsninger som skaper verdi for kundene',
          'Kartlegging og analyse av kundens behov, og utarbeide forslag til teknologiske forbedringer',
          'Være en strategisk sparringspartner for kundene i deres digitaliseringsprosesser',
          'Implementere digitale verktøy og systemer som ERP, CRM og analyseverktøy',
          'Følge opp prosjekter fra start til slutt, inkludert testing, opplæring og support',
        ],
      },
      {
        heading: 'Hvem ser vi etter?',
        body: 'Vi ser etter deg som har:',
        bullets: [
          'God forretningsforståelse og erfaring med rådgivning og/eller prosjektledelse',
          'Evne til å se hvordan teknologi kan forbedre forretningsprosesser og skape konkurransefortrinn',
          'Interesse for teknologi og innovasjon',
          'Erfaring med ERP, CRM eller andre forretningssystemer er en fordel',
          'Gode kommunikasjonsevner og evne til å bygge relasjoner med kunder',
          'Selvstendig, strukturert og løsningsorientert tilnærming til oppgaver',
        ],
      },
      {
        heading: 'Dette tilbyr vi',
        bullets: [
          'En spennende mulighet i et nyoppstartet, ambisiøst selskap med stor påvirkningskraft',
          'Konkurransedyktige betingelser og store muligheter for faglig og personlig utvikling',
          'Et innovativt og inkluderende arbeidsmiljø der vi verdsetter din utvikling',
          'Fleksibel arbeidstid og mulighet for hjemmekontor',
          'Gode pensjons- og forsikringsordninger',
        ],
      },
    ],
  },
  {
    slug: 'erp-konsulent-stavanger',
    title: 'ERP-konsulent',
    location: 'Stavanger',
    workplace: 'Stavanger',
    type: 'Heltid',
    percentage: '100 %',
    startDate: 'Etter avtale',
    deadline: 'Snarest',
    applyEmail: 'kai.mydland@flyd.no',
    contact: {
      name: 'Kai Mydland',
      role: 'Kontaktperson',
      phone: '480 19 958',
      email: 'kai.mydland@flyd.no',
    },
    ingress:
      'Er du klar for å ta del i et spennende og innovativt selskap i vekst? Vil du være med å utvikle fremtidens forretningssystemer? Flyd søker en ERP-konsulent.',
    sections: [
      {
        heading: 'Om stillingen',
        body: 'Som en del av vårt ambisiøse og dynamiske team vil du som ERP-konsulent ikke bare jobbe med teknologi og systemer, men også bidra til å forme en virksomhet som setter både ansatte og kunder først. Flyd er et nyoppstartet selskap med en sterk kombinasjon av lang erfaring innen økonomi, teknologi og rådgivning – og vi har et tydelig fokus på å gjøre ting annerledes for å skape verdi for både ansatte og kunder.',
      },
      {
        heading: 'Hvorfor Flyd?',
        body: 'Vi legger stor vekt på innovasjon, personlig utvikling og det å skape verdi for kundene våre. Her får du muligheten til å være med på en reise der vi bygger noe unikt – og du vil spille en nøkkelrolle i den prosessen.',
      },
      {
        heading: 'Arbeidsoppgaver',
        bullets: [
          'Implementere og tilpasse ERP-løsninger for kundene våre',
          'Rådgivning om hvordan forretningsprosesser kan optimaliseres og effektiviseres gjennom teknologi',
          'Tilpasning av systemløsninger til spesifikke kundebehov',
          'Opplæring av kunder og sikre at de får maksimalt utbytte av sine nye systemer',
          'Delta i prosjekter som former Flyds satsing på ERP-løsninger og fremtidens forretningssystemer',
        ],
      },
      {
        heading: 'Hvem ser vi etter?',
        body: 'Vi ser etter deg som har:',
        bullets: [
          'Erfaring med ERP-løsninger',
          'God forretningsforståelse',
          'En lidenskap for teknologi og hvordan den kan skape verdi for virksomheter',
          'Erfaring med prosjektarbeid og evne til å jobbe både selvstendig og i team',
          'Gode kommunikasjonsevner og evne til å bygge sterke relasjoner med kunder',
        ],
      },
      {
        heading: 'Dette tilbyr vi',
        bullets: [
          'En unik mulighet til å være med på reisen i et nyoppstartet og ambisiøst selskap',
          'Konkurransedyktige betingelser og store muligheter for karriereutvikling',
          'Et innovativt og inkluderende arbeidsmiljø der vi verdsetter din utvikling, både faglig og personlig',
          'Fleksibel arbeidstid og mulighet for hjemmekontor',
          'Gode pensjons- og forsikringsordninger',
        ],
      },
    ],
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
