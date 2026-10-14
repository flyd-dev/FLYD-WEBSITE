/**
 * Artikkelen «Påbudt e-faktura fra 2027» (/artikler/e-faktura-2027/).
 * Kilde: brief 14.10.2026 (ideas-board id 15). Spørsmålene brukes både på
 * siden og i FAQPage-JSON-LD, så de alltid er like. Punkter merket
 * [UAVKLART] i briefen er utelatt. Oppdater `modified` når teksten endres.
 */
export const eFaktura2027 = {
  path: '/artikler/e-faktura-2027/',
  title: 'E-faktura fra 2027: Dette må bedriften din gjøre · Flyd',
  description:
    'Fra 1. januar 2027 må de fleste bedrifter sende EHF-faktura til andre bedrifter. Se hva som gjelder i 2027, 2028 og 2030, og slik gjør du deg klar.',
  h1: 'Påbudt e-faktura fra 2027: hva gjelder, og hvordan gjør du deg klar?',
  published: '2026-10-14',
  modified: '2026-10-14',
  image: {
    url: 'https://www.flyd.no/og/e-faktura-2027.png',
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: 'E-faktura fra 2027: dette må bedriften din gjøre. Slik gjør du deg klar for EHF.',
  },
  hero: {
    src: '/artikler/e-faktura-2027/topp-e-faktura-1600.webp',
    srcSmall: '/artikler/e-faktura-2027/topp-e-faktura-800.webp',
    width: 1600,
    height: 900,
    alt: 'Påbudt e-faktura fra 2027: slik gjør du deg klar. Hva som gjelder i 2027, 2028 og 2030. Bildet viser et møtebord sett ovenfra med bærbare PC-er og dokumenter.',
  },
  figur: {
    src: '/artikler/e-faktura-2027/figur-e-faktura-flyt.webp',
    width: 1200,
    height: 760,
    alt: 'Figur: avsenderens system sjekker i ELMA om kunden kan motta e-faktura, og fakturaen sendes via Peppol til mottakeren. Plikten til å sende gjelder fra 1.1.2027 og plikten til å motta fra 1.1.2030.',
  },
};

export const kilder = {
  lov: 'https://lovdata.no/dokument/NL/lov/2026-06-19-39',
  ikraft:
    'https://www.regjeringen.no/no/aktuelt/nye-lovregler-om-e-fakturering-i-naringslivet-og-enkelte-andre-lovendringer-pa-finansmarkedsomradet-settes-i-kraft/id3166726/',
  overgang: 'https://lovdata.no/dokument/SF/forskrift/2026-09-25-1913',
  overgangNyhet:
    'https://www.regjeringen.no/no/aktuelt/fastsetter-overgangsregel-om-plikten-til-a-motta-e-faktura-og-skattedirektoratet-delegeres-myndighet/id3173725/',
  forskrift: 'https://lovdata.no/nav/forskrift/2026-09-29-1933',
  skatteetaten:
    'https://www.skatteetaten.no/rettskilder/type/uttalelser/uttalelser/forskrifter-til-lovendringer-om-digital-bokforing-og-e-fakturering/',
  prop: 'https://www.regjeringen.no/no/dokumenter/prop.-44-l-20252026/id3152698/',
  tripletex: 'https://hjelp.tripletex.no/hc/no/articles/15779761449617-Slik-aktiverer-og-mottar-du-EHF-fakturaer',
  fiken: 'https://hjelp.fiken.no/sende-og-motta-ehf',
};

export const eFakturaFaq: { q: string; a: string }[] = [
  {
    q: 'Må jeg sende e-faktura fra 2027?',
    a: 'Ja, hvis du er bokføringspliktig og selger til en annen bokføringspliktig som kan motta e-faktura. Mottakere som kan motta e-faktura, står i ELMA-registeret.',
  },
  {
    q: 'Kan jeg fortsatt sende PDF-faktura?',
    a: 'Ikke til bedrifter som kan motta e-faktura. En PDF sendt på e-post regnes ikke som e-faktura. Fra 1. januar 2030 får alle bokføringspliktige plikt til å kunne motta e-faktura.',
  },
  {
    q: 'Må jeg kunne motta e-faktura fra 2027?',
    a: 'Nei, plikten til å motta e-faktura gjelder fra 1. januar 2030. Vi anbefaler likevel å aktivere mottak nå. Da blir du normalt registrert i ELMA, og leverandørene dine kan sende deg e-faktura.',
  },
  {
    q: 'Hva er ELMA?',
    a: 'ELMA er et elektronisk mottakerregister over virksomheter som kan motta e-faktura via Peppol. Faktureringssystemet ditt slår opp kundens organisasjonsnummer i ELMA for å se om kunden kan motta. Selve fakturaen sendes via Peppol-nettverket, ikke via ELMA.',
  },
  {
    q: 'Hva skjer i 2028 og 2030?',
    a: 'Fra 1. januar 2028 kan bokføringspliktige parter ikke lenger avtale at salgsdokumentet ikke skal oversendes. Fra 1. januar 2030 får alle bokføringspliktige plikt til å motta e-faktura, og bokføringen skal skje i et elektronisk regnskapssystem. Fram til 31. desember 2029 kan partene avtale et annet strukturert elektronisk format.',
  },
  {
    q: 'Gjelder dette enkeltpersonforetak?',
    a: 'Ja, hvis enkeltpersonforetaket er bokføringspliktig. Svært små virksomheter med omsetning på høyst 50 000 kr i kalenderåret, som ikke er regnskapspliktige og ikke er mva-registrert, har lempninger etter bokføringsforskriften § 1-2.',
  },
];
