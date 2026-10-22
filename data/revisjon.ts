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
    title: 'Revisjon',
    description:
      'Revisjon gir tillit til at regnskapet stemmer. Flyd tilbyr revisjon, årsregnskap og skattemelding, og rådgivning om regnskap, skatt og avgift.',
  },
  tittel: 'Revisjon gir tillit.',
  ingress:
    'En revisor går gjennom regnskapet og kontrollerer at tallene stemmer, at regelverket er fulgt og at bedriften har gode rutiner. Det gir trygghet for eierne, ledelsen og alle som bruker regnskapet.',
  tjenester: {
    kicker: 'Tjenester',
    tittel: 'Revisjon, årsregnskap og rådgivning.',
    tekst:
      'Også mange mindre bedrifter velger å ha revisor. En uavhengig gjennomgang gjør det bedriften rapporterer, både internt og til bank, myndigheter og andre, mer til å stole på.',
    punkter: [
      { tittel: 'Revisjon', tekst: 'Vi reviderer årsregnskapet og avgir revisjonsberetning.' },
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
