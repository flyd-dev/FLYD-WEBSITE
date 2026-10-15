/**
 * Artikkelen «Forskuddsskatt for ENK» (/artikler/forskuddsskatt-enk/).
 * Kilde: brief 15.10.2026 (ideas-board id 19). Fakta er sjekket mot
 * Skatteetaten 15.10.2026, se `kilder`. Ingen priser. Rentesatsen for
 * inntektsåret 2026 var ikke publisert da artikkelen ble skrevet; oppdater når
 * satssiden har den. Spørsmålene brukes både på siden og i FAQPage-JSON-LD.
 */
export const forskuddsskattEnk = {
  path: '/artikler/forskuddsskatt-enk/',
  title: 'Forskuddsskatt for ENK: endre før 15. desember · Flyd',
  description:
    'Har ENK-et tjent mer enn ventet? Endre skattekortet innen 15. desember, eller betal tilleggsforskudd innen 31. mai og unngå rentetillegg på restskatten.',
  h1: 'Forskuddsskatt for ENK: slik justerer du før 15. desember',
  published: '2026-10-15',
  modified: '2026-10-15',
  hero: {
    // Utsnitt (16:9) av hero-1200.webp, som også brukes øverst på forsiden.
    src: '/header/topp-forskuddsskatt-enk.webp',
    width: 1000,
    height: 563,
    alt: 'Kolleger i Flyd som står og prater sammen på kontoret',
  },
};

export const kilder = {
  forskuddsskattEnk: 'https://www.skatteetaten.no/bedrift-og-organisasjon/skatt/forskuddsskatt/forskuddsskatt-for-enkeltpersonforetak',
  tilleggsforskudd: 'https://www.skatteetaten.no/bedrift-og-organisasjon/skatt/forskuddsskatt/tilleggsforskudd/',
  restskatt: 'https://www.skatteetaten.no/bedrift-og-organisasjon/skatt/skatteoppgjor/restskatt/',
  rentesatser: 'https://www.skatteetaten.no/satser/rentesatser-pa-tilgodebelop-restskatt-og-resterende-skatt/',
  forskuddsutskrivingen: 'https://www.skatteetaten.no/rettskilder/type/uttalelser/uttalelser/forskuddsutskrivingen-2026/',
};

export const forskuddsskattFaq: { q: string; a: string }[] = [
  {
    q: 'Når er fristen for å endre forskuddsskatten?',
    a: 'Du kan endre skattekortet selv så mange ganger du vil innen 15. desember i inntektsåret. Etter 15. desember må du kontakte Skatteetaten via skjema. Er det for sent å endre, kan du i stedet betale tilleggsforskudd innen 31. mai året etter.',
  },
  {
    q: 'Hva er forskjellen på forskuddsskatt og tilleggsforskudd?',
    a: 'Forskuddsskatt er skatten du betaler i fire terminer i løpet av inntektsåret, ut fra overskuddet i skattekortet. Tilleggsforskudd er en ekstra innbetaling du gjør etter at året er omme, når du ser at forskuddsskatten ble for lav. Betalt innen fristen slipper du rentetillegg på det beløpet.',
  },
  {
    q: 'Når må tilleggsforskudd være betalt?',
    a: 'Innen 31. mai året etter inntektsåret. Faller 31. mai på en helg eller helligdag, flyttes fristen til første virkedag etter. For inntektsåret 2026 er fristen mandag 31. mai 2027.',
  },
  {
    q: 'Hvor mye rente betaler jeg på restskatt?',
    a: 'Satsen fastsettes for hvert inntektsår. For inntektsåret 2025 er rentetillegget 3,12 prosent, beregnet fra 1. juli i inntektsåret til forfall for første termin av restskatten. Satsen for 2026 var ikke publisert på Skatteetatens satsside da denne artikkelen ble skrevet.',
  },
  {
    q: 'Hva skjer om jeg betaler for mye forskuddsskatt?',
    a: 'Da får du pengene tilbake etter skatteoppgjøret, med rentegodtgjørelse. Satsen fastsettes for hvert inntektsår, og for inntektsåret 2025 er den 3,12 prosent.',
  },
  {
    q: 'Kan jeg endre forskuddsskatten hvis jeg også har lønn?',
    a: 'Ja. Har du både lønn og enkeltpersonforetak, kan du endre fordelingen mellom skattetrekket i lønnen og forskuddsskatten. Det gjør du ved å krysse av for å endre fordelingen når du åpner skattekortet. Den totale skatten blir den samme.',
  },
  {
    q: 'Hva gjør jeg hvis ENK-et går med underskudd?',
    a: 'Er forskuddsskatten allerede beregnet, setter du overskuddet fra næringsinntekt til 0 kroner i skattekortet. Er foretaket nystartet, trenger du ikke oppdatere skattekortet. Da oppgir du underskuddet i skattemeldingen.',
  },
  {
    q: 'Hvilken KID bruker jeg for tilleggsforskudd?',
    a: 'KID og kontonummer står i opplysningene som fulgte med skattemeldingen. Mangler du dem, kan du lage KID hos Skatteetaten. Med feil KID kan beløpet bli ikke godkjent som tilleggsforskudd.',
  },
];
