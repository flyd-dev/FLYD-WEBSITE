/**
 * Innholdet på /tjenester/revisjon/ (app/tjenester/revisjon/page.tsx).
 *
 * Revisjon selges ikke: teksten skal være saklig informasjon, uten salgsspråk
 * og uten store ord (Arnstein og Irene, 21.10.2026). Ikke nevn SkatteFUNN, og
 * ikke bruk «lovpålagt» o.l. Tjenestene er de tre Liit hadde på liit.no.
 * «Tillit» er ordet navnet Liit kommer fra, derfor overskriften.
 */
export const revisjon = {
  meta: {
    title: 'Revisor – revisjon og revisorbekreftelser',
    description:
      'Revisjon gir tillit til at regnskapet stemmer. Flyd tilbyr revisjon, årsregnskap og skattemelding, og rådgivning om regnskap, skatt og avgift.',
  },
  tittel: 'Revisjon gir tillit.',
  ingress:
    'Revisor er allmennhetens tillitsperson. En revisor gjennomgår regnskapet og kontrollerer at tallene stemmer, at regelverket er fulgt og at bedriften har gode rutiner. Det gir trygghet for eierne, ledelsen og alle som bruker regnskapet.',
  tjenester: {
    kicker: 'Tjenester',
    tittel: 'Revisjon, årsregnskap og rådgivning.',
    punkter: [
      {
        tittel: 'Revisjon',
        tekst: 'Vi utfører revisjonstjenester som lovbestemt revisjon, revisorbekreftelser og andre attestasjonstjenester.',
      },
      { tittel: 'Årsregnskap og skattemelding', tekst: 'Vi utarbeider årsregnskapet og skattemeldingen.' },
      { tittel: 'Rådgivning', tekst: 'Faglige råd om regnskap, skatt og avgift.' },
    ],
  },
  team: {
    kicker: 'Revisjonsteamet',
    tittel: 'Ta kontakt direkte.',
  },
  avslutning: {
    kicker: 'Kontakt',
    tittel: 'Lurer du på noe om revisjon?',
    tekst: 'Ring oss eller send en melding, så setter vi deg i kontakt med en av revisorene.',
  },
};

/**
 * /bytte-revisor/ (app/bytte-revisor/page.tsx), lenket fra «Kom i gang» i footer
 * slik «Bytte regnskapsfører» er (Irene 22.10.2026). Saklig, uten salgsspråk.
 * Revisorene leser teksten før den publiseres.
 */
export const bytteRevisor = {
  path: '/bytte-revisor/',
  meta: {
    title: 'Bytte revisor – slik gjør du det',
    description:
      'Slik bytter et aksjeselskap revisor: generalforsamlingen velger ny revisor, den nye tar kontakt med den forrige, og byttet meldes til Foretaksregisteret.',
  },
  tittel: 'Slik bytter du revisor.',
  ingress:
    'Et aksjeselskap kan bytte revisor når det vil. Det er generalforsamlingen som velger revisor, og byttet meldes til Foretaksregisteret.',
  steg: {
    kicker: 'Steg for steg',
    tittel: 'Tre steg.',
    punkter: [
      {
        tittel: 'Ta kontakt med en ny revisor',
        tekst: 'Den nye revisoren vil vurdere oppdraget og veilede deg igjennom prosessen.',
      },
      {
        tittel: 'Generalforsamlingen velger ny revisor',
        tekst:
          'Valget kan gjøres på den ordinære generalforsamlingen eller på en ekstraordinær generalforsamling.',
      },
      {
        tittel: 'Meld byttet til Foretaksregisteret',
        tekst:
          'Byttet meldes med Samordnet registermelding i Altinn, med bekreftelse fra den nye revisoren på at oppdraget er påtatt.',
      },
    ],
  },
  adskilt: {
    kicker: 'Revisjon og regnskap',
    tittel: 'Holdes adskilt.',
    tekst:
      'Revisorene våre kan ikke revidere regnskap som Flyd har ført. Har bedriften regnskapsfører hos oss, må revisoren være et annet selskap.',
  },
  avslutning: {
    kicker: 'Kontakt',
    tittel: 'Spørsmål om å bytte revisor?',
    tekst: 'Ring oss eller send en melding, så setter vi deg i kontakt med en av revisorene.',
  },
};

/**
 * Irenes tekst om revisjonsselskapet (22.10.2026). Står ved siden av
 * regnskapsføreren i toppen av /kontor og i revisjonsblokken på kontorsiden
 * i Sokndal.
 */
export const revisjonOmtale =
  'Flyd er godkjent revisjonsselskap med rett til å påta seg revisjonsoppdrag. Vi utfører revisjonstjenester som lovbestemt revisjon, revisorbekreftelser og andre attestasjonstjenester.';
