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
  modified: '2026-10-12',
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
    q: 'Hvorfor kontakter den nye regnskapsføreren den gamle?',
    a: 'Regnskapsførerloven § 5-1 krever som hovedregel at det nye regnskapsforetaket, før det tar oppdraget, ber den forrige regnskapsføreren opplyse om forhold som tilsier at oppdraget ikke bør tas. Det er en fast rutine, ikke et tegn på problemer.',
  },
  {
    q: 'Hvordan gir jeg ny regnskapsfører tilgang i Altinn?',
    a: 'Meld ny regnskapsfører i Samordnet registermelding. Regnskapsføreren får en signeringsoppgave i sin Altinn-innboks og bekrefter der. Regnskapsførerroller som er registrert i Enhetsregisteret, videreføres som tilgangspakker i Altinn. Ekstra fullmakter gir du som tilgangspakker under Tilgangsstyring i Altinn.',
  },
  {
    q: 'Koster det noe å melde ny regnskapsfører til Brønnøysundregistrene?',
    a: 'Nei. Å melde ny regnskapsfører koster ingenting hos Brønnøysundregistrene (endringen står ikke på gebyrlisten). Eventuelle kostnader kommer fra avtalene med den gamle og den nye regnskapsføreren.',
  },
  {
    q: 'Må jeg bytte regnskapssystem når jeg bytter regnskapsfører?',
    a: 'Nei, ikke nødvendigvis. Sjekk hvem som eier lisensen. Eier du den selv, kan den nye regnskapsføreren få tilgang i det samme systemet, for eksempel Tripletex.',
  },
  {
    q: 'Hva skal jeg be om å få overlevert?',
    a: 'Bilag, hovedbok, saldobalanse, kunde- og leverandørreskontro, avstemminger, lønnsdata, innsendte rapporter med kvitteringer, SAF-T-fil og en oversikt over åpne frister og kjente avvik.',
  },
  {
    q: 'Hva gjør jeg hvis den gamle regnskapsføreren ikke svarer eller holder tilbake materialet?',
    a: 'Ta det opp skriftlig, og vis til at regnskapsmaterialet etter god regnskapsføringsskikk skal utleveres til deg så snart som mulig når oppdraget opphører. Den nye regnskapsføreren kan hjelpe deg med å følge opp. Bransjestandarden tar ikke stilling til om materialet kan holdes tilbake, for eksempel ved ubetalt honorar. Er dere uenige, bør du snakke med den nye regnskapsføreren eller en rådgiver før du går videre.',
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
