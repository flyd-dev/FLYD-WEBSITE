/**
 * Artikkelen «Trenger jeg regnskapsfører?» (/artikler/trenger-jeg-regnskapsforer/).
 * Kilde: brief 15.10.2026 (ideas-board id 16). Fakta er sjekket mot Lovdata,
 * Skatteetaten og Brønnøysundregistrene 15.10.2026, se `kilder`. Ingen priser,
 * og artikkelen beskriver ikke Flyds tjenestetyper (krav fra Marius).
 * Spørsmålene brukes både på siden og i FAQPage-JSON-LD.
 */
export const trengerRegnskapsforer = {
  path: '/artikler/trenger-jeg-regnskapsforer/',
  title: 'Trenger jeg regnskapsfører? ENK og AS · Flyd',
  description:
    'Du må ikke ha regnskapsfører, men du må føre regnskap etter loven. Se hva som kreves for ENK og AS, og når det kan lønne seg å få hjelp.',
  h1: 'Trenger jeg regnskapsfører? Det korte svaret for ENK og AS',
  published: '2026-10-15',
  modified: '2026-10-15',
  hero: {
    // Utsnitt (16:9) av kontor/egersund-mote.webp, som også brukes på kontorsiden for Egersund.
    src: '/header/topp-trenger-regnskapsforer.webp',
    width: 900,
    height: 506,
    alt: 'Rådgivere i Flyd i et møte rundt et bord på kontoret i Egersund',
  },
};

export const kilder = {
  bokforingsloven: 'https://lovdata.no/dokument/NL/lov/2004-11-19-73',
  bokforingsforskriftenEndring: 'https://lovdata.no/dokument/LTI/forskrift/2026-09-29-1933/KAPITTEL_2',
  regnskapsforerloven: 'https://lovdata.no/lov/2022-12-16-90',
  aksjeloven612: 'https://lovdata.no/lov/1997-06-13-44/%C2%A76-12',
  aksjeloven614: 'https://lovdata.no/lov/1997-06-13-44/%C2%A76-14',
  aksjeloven76: 'https://lovdata.no/lov/1997-06-13-44/%C2%A77-6',
  nyttEnk: 'https://www.skatteetaten.no/bedrift-og-organisasjon/starte-og-drive/ny-som-naringsdrivende/nytt-enk/',
  regnskapSkatteetaten:
    'https://www.skatteetaten.no/bedrift-og-organisasjon/starte-og-drive/rutiner-regnskap-og-kassasystem/gode-rutiner-for-daglig-drift/regnskap/',
  skattemeldingEnk: 'https://www.skatteetaten.no/bedrift-og-organisasjon/skatt/skattemelding-naringsdrivende/selskap/enk/',
  arsregnskap: 'https://www.brreg.no/innsending-av-arsregnskap/',
  revisjonsplikt: 'https://www.brreg.no/aksjeselskap/revisjonsplikt-for-aksjeselskap/',
};

export const trengerFaq: { q: string; a: string }[] = [
  {
    q: 'Er det lovpålagt å ha regnskapsfører?',
    a: 'Nei. Loven krever at du bokfører riktig, dokumenterer og oppbevarer regnskapet og leverer det du skal til fristene. Den sier ikke at en regnskapsfører må gjøre det. Skatteetaten skriver at du kan gjøre dette selv, eller få en regnskapsfører til å gjøre det.',
  },
  {
    q: 'Må et aksjeselskap ha regnskapsfører?',
    a: 'Nei, men alle aksjeselskap har regnskapsplikt og skal sende årsregnskap til Regnskapsregisteret. Styret skal påse at regnskapet er under betryggende kontroll, og daglig leder skal sørge for at det er i samsvar med lov og forskrifter. Det ansvaret følger vervet, uansett hvem som fører.',
  },
  {
    q: 'Kan jeg føre regnskapet selv i et enkeltpersonforetak?',
    a: 'Ja. Et enkeltpersonforetak har bokføringsplikt, men kan føre regnskapet selv. Regnskapet må følge bokføringsloven og bokføringsforskriften, og dokumentasjonen skal oppbevares i minst fem år.',
  },
  {
    q: 'Hva gjelder hvis ENK-et omsetter for under 50 000 kroner?',
    a: 'Fra 1. januar 2027 gjelder et nytt unntak for deg som leverer skattemelding for formues- og inntektsskatt: Har foretaket omsetning på høyst 50 000 kroner i et kalenderår, og er det verken mva-registrert eller regnskapspliktig, slipper du deler av bokføringsreglene. Du må likevel dokumentere transaksjonene og oppbevare dokumentasjonen. Unntaket faller bort fra det tidspunktet omsetningen passerer grensen.',
  },
  {
    q: 'Hvem har ansvaret hvis regnskapsføreren gjør feil?',
    a: 'Overfor myndighetene er det du som næringsdrivende som er ansvarlig, og i et AS styret og daglig leder. Brønnøysundregistrene skriver for eksempel at styret er ansvarlig for innsendingen av årsregnskapet, også når det er avtalt at regnskapsfører eller revisor skal sende det inn.',
  },
  {
    q: 'Hvordan vet jeg at en regnskapsfører er godkjent?',
    a: 'Regnskapsføring i næring for andre kan bare utføres av regnskapsforetak godkjent av Finanstilsynet. Finanstilsynet fører et offentlig register over regnskapsforetak og statsautoriserte regnskapsførere. Foretaket skal også inngå en skriftlig oppdragsavtale med deg.',
  },
  {
    q: 'Trenger jeg revisor i tillegg?',
    a: 'Et AS har revisjonsplikt hvis driftsinntekten er 7 millioner kroner eller mer, balansesummen er 27 millioner kroner eller mer, eller selskapet har mer enn 10 årsverk. Er selskapet under alle grensene, kan generalforsamlingen velge bort revisor. Revisor og regnskapsfører er to ulike roller.',
  },
];
