/**
 * Artikkelen «Mva-frister» (/artikler/mva-frister/).
 * Kilde: brief 13.10.2026. Frister og beløp er sjekket mot Skatteetaten og
 * Lovdata 15.10.2026, se `kilder`. Utsettelse er utelatt (ingen gjeldende
 * offisiell kilde funnet). Spørsmålene brukes både på siden og i
 * FAQPage-JSON-LD. Oppdater `modified` og fristtabellen hver januar.
 */
export const mvaFrister = {
  path: '/artikler/mva-frister/',
  title: 'Mva-frister 2026 – alle terminer og årstermin · Flyd',
  description:
    'Oversikt over fristene for mva-melding og betaling i 2026, hvem som kan levere én gang i året, og hva som skjer om du leverer for sent.',
  h1: 'Mva-frister: når skal mva-meldingen leveres og betales?',
  published: '2026-10-15',
  modified: '2026-10-15',
  hero: {
    // Utsnitt (16:9) av office-3.webp, som også brukes på /karriere/.
    src: '/header/topp-mva-frister.webp',
    width: 1000,
    height: 563,
    alt: 'Kolleger i Flyd som prater og ler sammen på kontoret',
  },
};

export const kilder = {
  skattekalender: 'https://www.skatteetaten.no/rss/skattekalender-for-bedrift/',
  betaleMva: 'https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/mva/betale-mva/',
  arstermin: 'https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/mva/betale-mva/arstermin/',
  registrere: 'https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/mva/registrere-endre-slette/',
  mvaMelding: 'https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/mva/mva-melding/',
  handboken:
    'https://www.skatteetaten.no/rettskilder/type/handboker/skattebetalingshandboken/gjeldende/kapittel-10.-forfall/ID-10-13.001/ID-10-13.005/',
  forskrift: 'https://lovdata.no/forskrift/2016-11-23-1360/%C2%A78-3-10',
  skattebetalingsloven: 'https://lovdata.no/dokument/NL/lov/2005-06-17-67/KAPITTEL_10',
  skatteforvaltningsloven: 'https://lovdata.no/dokument/NL/lov/2016-05-27-14/KAPITTEL_8',
};

/** Alminnelige tomånedlige terminer for 2026. Fristene gjelder både levering og betaling. */
export const terminer2026: { termin: string; periode: string; frist: string; iso: string; merknad?: string }[] = [
  { termin: '1. termin', periode: 'Januar–februar', frist: '10. april 2026', iso: '2026-04-10' },
  { termin: '2. termin', periode: 'Mars–april', frist: '10. juni 2026', iso: '2026-06-10' },
  { termin: '3. termin', periode: 'Mai–juni', frist: '31. august 2026', iso: '2026-08-31' },
  {
    termin: '4. termin',
    periode: 'Juli–august',
    frist: '12. oktober 2026',
    iso: '2026-10-12',
    merknad: '10. oktober var en lørdag',
  },
  { termin: '5. termin', periode: 'September–oktober', frist: '10. desember 2026', iso: '2026-12-10' },
  { termin: '6. termin', periode: 'November–desember', frist: '10. februar 2027', iso: '2027-02-10' },
];

export const mvaFaq: { q: string; a: string }[] = [
  {
    q: 'Hva var fristen for mva i oktober 2026?',
    a: 'Mandag 12. oktober 2026, for 4. termin (juli–august). Den vanlige fristen er 10. oktober, men den falt på en lørdag. Skatteetatens skattekalender oppga 12. oktober som frist for både levering og betaling.',
  },
  {
    q: 'Når er siste mva-frist for 2026?',
    a: 'Fristen for 6. termin (november–desember 2026) er 10. februar 2027. Har du årstermin, er fristen for hele 2026 10. mars 2027. Leveringsfrist og betalingsfrist er den samme.',
  },
  {
    q: 'Kan jeg levere mva-melding én gang i året?',
    a: 'Ja, hvis mva-pliktig omsetning og uttak er høyst 1 million kroner i kalenderåret, du har vært registrert i minst 12 måneder og har levert og betalt i tide. Du søker mellom 10. desember og 1. februar, og fristen for meldingen er 10. mars året etter.',
  },
  {
    q: 'Må jeg levere mva-melding uten omsetning?',
    a: 'Ja. Mva-meldingen skal leveres selv om omsetningen i perioden er null. Leverer du ikke i tide, kan du få tvangsmulkt, også når det ikke har vært omsetning.',
  },
  {
    q: 'Hvilken frist gjelder for gårdsbruk, skogbruk og fiske?',
    a: 'Primærnæringer som jordbruk, skogbruk, reindrift og fiske leverer normalt én mva-melding for hele kalenderåret. Fristen for levering og betaling er 10. april året etter. Grensen på 1 million kroner gjelder ikke for dem.',
  },
  {
    q: 'Kan regnskapsføreren levere mva-meldingen for meg?',
    a: 'Ja. For å sende inn mva-meldingen trengs tilgangspakken «Merverdiavgift» eller «Regnskapsfører med signeringsrettighet» i Altinn. Regnskapsfører uten signeringsrett kan fylle ut meldingen, men ikke sende den. Fra 1. januar 2027 fjernes de gamle Altinn-rollene.',
  },
];
