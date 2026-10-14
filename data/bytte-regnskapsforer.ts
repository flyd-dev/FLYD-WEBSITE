/**
 * Guiden «Bytte regnskapsfører» (/bytte-regnskapsforer/). Spørsmålene og
 * sjekklisten brukes både på siden og i FAQPage-JSON-LD, så de alltid er
 * like. Ingen plassholdere her – [BEKREFT] står bare i selve siden.
 *
 * Altinn-detaljene endrer seg i 2026: sjekk info.altinn.no og oppdater
 * `modified` når teksten endres.
 */
export const bytteRegnskapsforer = {
  path: '/bytte-regnskapsforer/',
  title: 'Bytte regnskapsfører? Slik gjør du det trygt',
  description:
    'Slik bytter du regnskapsfører: oppsigelse, overlevering av regnskap, Altinn-tilgang og system. Sjekkliste og svar på hva det koster og tar av tid.',
  h1: 'Bytte regnskapsfører – slik gjør du det, steg for steg',
  published: '2026-10-12',
  modified: '2026-10-14',
  image: {
    url: 'https://www.flyd.no/og/bytte-regnskapsforer.png',
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: 'Bytte regnskapsfører – slik gjør du det, steg for steg. Guide fra Flyd',
  },
};

export const bytteFaq: { q: string; a: string }[] = [
  {
    q: 'Kan jeg bytte regnskapsfører midt i året?',
    a: 'Ja. Avtal en tydelig overgangsdato, og avklar hvem som leverer siste mva-melding, a-melding og årsoppgjøret. Det ryddigste er å bytte rett etter at en termin er levert.',
  },
  {
    q: 'Hvor lang oppsigelsestid har en regnskapsfører?',
    a: 'Det finnes ingen felles lovbestemt oppsigelsestid. Den står i oppdragsavtalen, så les den før du setter en sluttdato.',
  },
  {
    q: 'Må den gamle regnskapsføreren gi fra seg regnskapet?',
    a: 'Ja. Etter god regnskapsføringsskikk (bransjestandarden GRFS) skal regnskapsmaterialet og regnskapsdataene utleveres til deg så snart som mulig når oppdraget opphører. Regnskapsdataene overføres i SAF-T-format hvis ikke annet er avtalt.',
  },
  {
    q: 'Koster det noe å melde ny regnskapsfører til Brønnøysundregistrene?',
    a: 'Nei. Å melde ny regnskapsfører koster ingenting hos Brønnøysundregistrene (endringen står ikke på gebyrlisten). Eventuelle kostnader kommer fra avtalene med den gamle og den nye regnskapsføreren.',
  },
];

export const bytteSjekkliste: { tittel: string; punkter: string[] }[] = [
  {
    tittel: 'Før du sier opp',
    punkter: [
      'Les oppdragsavtalen: oppsigelsestid, binding og honorar for sluttarbeid',
      'Sjekk hvem som eier lisensen til regnskapssystemet',
      'Velg ny regnskapsfører',
    ],
  },
  {
    tittel: 'Oppsigelse',
    punkter: [
      'Si opp skriftlig med sluttdato, og be om bekreftelse',
      'Avklar hvem som leverer siste mva-melding, a-melding og årsoppgjør',
    ],
  },
  {
    tittel: 'Overlevering',
    punkter: [
      'Bilag, hovedbok og saldobalanse',
      'Kunde- og leverandørreskontro med åpne poster',
      'Avstemminger og lønnsgrunnlag',
      'Innsendte rapporter med kvitteringer',
      'SAF-T-fil',
      'Oversikt over åpne frister og kjente avvik',
    ],
  },
  {
    tittel: 'Tilganger og system',
    punkter: [
      'Meld ny regnskapsfører i Samordnet registermelding',
      'Gi bare de tilgangspakkene i Altinn som trengs',
      'Gi ny regnskapsfører tilgang i regnskapssystem, bank og bilagsløsning',
      'Fjern manuelt delegerte fullmakter til det gamle byrået under Tilgangsstyring i Altinn',
      'Fjern gamle brukere og tilganger når overleveringen er dokumentert',
      'Koble integrasjoner med API-nøkler til på nytt når gamle brukere fjernes',
    ],
  },
];
