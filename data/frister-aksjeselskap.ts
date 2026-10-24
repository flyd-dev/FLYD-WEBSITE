/**
 * Artikkelen «Frister for aksjeselskap» (/artikler/frister-aksjeselskap/).
 * Kilde: brief 13.10.2026. Frister og beløp er sjekket mot Skatteetaten,
 * Brønnøysundregistrene og Lovdata 15.10.2026, se `kilder`. Reelle
 * rettighetshavere følger Brønnøysundregistrenes side oppdatert 8.6.2026
 * (14 dager), ikke 31. juli. Spørsmålene brukes både på siden og i
 * FAQPage-JSON-LD. Oppdater `modified`, forsinkelsesgebyret og årstallene hver januar.
 */
export const fristerAs = {
  path: '/artikler/frister-aksjeselskap/',
  title: 'Frister for aksjeselskap – skattemelding og årsregnskap · Flyd',
  description:
    'Alle viktige frister for AS: aksjonærregisteroppgaven, skattemelding, generalforsamling og årsregnskap – med datoer og hva som skjer ved forsinkelse.',
  h1: 'Frister for aksjeselskap: dette må leveres og når',
  published: '2026-10-15',
  modified: '2026-10-15',
  hero: {
    // Utsnitt (16:9) av om-flyd-teamet.webp, som også brukes på /om-flyd/.
    src: '/header/topp-frister-aksjeselskap.webp',
    width: 1000,
    height: 563,
    alt: 'Smilende rådgivere i Flyd utendørs, med kolleger og en skogkledd ås i bakgrunnen',
  },
};

export const kilder = {
  skattemeldingSelskap: 'https://www.skatteetaten.no/bedrift-og-organisasjon/skatt/skattemelding-naringsdrivende/selskap/',
  utsattFrist: 'https://www.skatteetaten.no/person/skatt/skattemelding/utsattfrist/',
  pressemelding2025:
    'https://www.skatteetaten.no/presse/nyhetsrommet/mandag-gar-fristen-ut-na-ma-naringslivet-levere-skattemeldingen/',
  aksjonarregister: 'https://www.skatteetaten.no/bedrift-og-organisasjon/rapportering-og-bransjer/aksjonarregisteroppgaven/',
  amelding: 'https://www.skatteetaten.no/bedrift-og-organisasjon/arbeidsgiver/a-meldingen/frister-og-betaling-i-a-meldingen/',
  mvaFrister: 'https://lovdata.no/forskrift/2016-11-23-1360/%C2%A78-3-10',
  arsregnskap: 'https://www.brreg.no/innsending-av-arsregnskap/',
  forsinkelsesgebyr: 'https://www.brreg.no/innsending-av-arsregnskap/forsinkelsesgebyr/',
  tvangsopplosning: 'https://www.brreg.no/innsending-av-arsregnskap/tvangsopplosning/',
  reelleRettighetshavere: 'https://www.brreg.no/reelle-rettighetshavere/',
  aksjeloven: 'https://lovdata.no/lov/1997-06-13-44/%C2%A75-5',
};

export const fristerFaq: { q: string; a: string }[] = [
  {
    q: 'Hva er forskjellen på skattemelding og årsregnskap?',
    a: 'Skattemeldingen med næringsspesifikasjon sendes til Skatteetaten innen 31. mai. Årsregnskapet godkjennes av generalforsamlingen og sendes til Regnskapsregisteret i Brønnøysund innen 31. juli. Det er to ulike innsendinger til to ulike etater, og begge må leveres hvert år.',
  },
  {
    q: 'Kan et AS få utsatt fristen for skattemeldingen?',
    a: 'Ja. Du kan søke om én måneds utsettelse, men søknaden må sendes før fristen går ut. Elektroniske søknader innvilges automatisk. Regnskapsførere og revisorer kan også søke for sine klienter. Fristen for årsregnskapet kan derimot ikke utsettes.',
  },
  {
    q: 'Hvem er ansvarlig hvis regnskapsføreren sender for sent?',
    a: 'Styret. Brønnøysundregistrene skriver at styret er ansvarlig for å sende inn årsregnskapet, også når det er avtalt at regnskapsfører eller revisor skal gjøre det. Følg derfor med på at innsendingen faktisk er gjort før 31. juli.',
  },
  {
    q: 'Hvor stort kan forsinkelsesgebyret bli?',
    a: 'Forsinkelsesgebyret for årsregnskapet kan maksimalt bli 69 940 kroner. Selskapet har ansvaret først. Betaler det ikke, kan styremedlemmene bli personlig og solidarisk ansvarlige. Gebyret kan ikke påklages, men du kan søke om ettergivelse.',
  },
  {
    q: 'Når må generalforsamlingen holdes?',
    a: 'Ordinær generalforsamling skal holdes innen seks måneder etter utgangen av hvert regnskapsår (aksjeloven § 5-5). Følger regnskapsåret kalenderåret, betyr det innen 30. juni. Generalforsamlingen godkjenner årsregnskapet og eventuelt utbytte.',
  },
  {
    q: 'Gjelder fristene for holdingselskap og AS uten aktivitet?',
    a: 'Ja. Alle aksjeselskap skal levere aksjonærregisteroppgaven. Skattemeldingen skal leveres selv om selskapet ikke har hatt omsetning, og årsregnskapet skal sendes inn selv om det ikke er drift eller aktivitet. Det gjelder også holdingselskap.',
  },
  {
    q: 'Kan jeg rette feil etter at årsregnskapet er sendt inn?',
    a: 'Ja, hvis årsregnskapet ble sendt inn før fristen. Da kan du rette mangler eller feil innen to uker uten forsinkelsesgebyr. Sendes årsregnskapet etter fristen, gjelder ikke denne muligheten.',
  },
];
