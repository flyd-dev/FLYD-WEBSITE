/**
 * Artikkelen «Nye bokføringsregler fra 2027» (/artikler/bokforingsregler-2027/).
 * Kilde: brief 15.10.2026 (ideas-board id 23). Fakta er sjekket mot Lovdata og
 * Skatteetaten 15.10.2026, se `kilder`. Hver regel er merket «Gjelder i 2026»
 * eller «Fra 1.1.2027» (`gjelder`). E-fakturadetaljer står i
 * /artikler/e-faktura-2027/, ikke her. Ingen priser og ingen leveringsfrister
 * mot regnskapsfører. Spørsmålene brukes både på siden og i FAQPage-JSON-LD.
 */
export type Gjelder = '2026' | '2027';

export const gjelderTekst: Record<Gjelder, string> = {
  '2026': 'Gjelder i 2026',
  '2027': 'Fra 1.1.2027',
};

export const bokforingsregler2027 = {
  path: '/artikler/bokforingsregler-2027/',
  title: 'Nye bokføringsregler 2027 for små ENK – dette endres · Flyd',
  description:
    'Fra 1.1.2027 får ENK med omsetning på høyst 50 000 kr enklere bokføring. Se hva som endres, hva som gjelder i 2026, og hvem som ikke får lettelsen.',
  h1: 'Nye bokføringsregler fra 2027: dette endres for små ENK',
  published: '2026-10-15',
  modified: '2026-10-15',
  hero: {
    // Utsnitt (16:9) av kontor/egersund-pult.webp, som også brukes på kontorsidene.
    src: '/header/topp-bokforingsregler-2027.webp',
    width: 900,
    height: 506,
    alt: 'Smilende rådgiver i Flyd tar notater ved skrivebordet',
  },
};

export const kilder = {
  forskrift: 'https://lovdata.no/dokument/SF/forskrift/2026-09-29-1933',
  bokforingsforskriften: 'https://lovdata.no/dokument/SF/forskrift/2004-12-01-1558',
  bokforingsloven: 'https://lovdata.no/dokument/NL/lov/2004-11-19-73',
  bokforingsloven2: 'https://lovdata.no/lov/2004-11-19-73/%C2%A72',
  lovendring: 'https://lovdata.no/dokument/NL/lov/2026-06-19-39',
  skattedirektoratet:
    'https://www.skatteetaten.no/rettskilder/type/uttalelser/uttalelser/forskrifter-til-lovendringer-om-digital-bokforing-og-e-fakturering/',
  skattemeldingEnk: 'https://www.skatteetaten.no/bedrift-og-organisasjon/skatt/skattemelding-naringsdrivende/enk/',
  mvaRegistrering: 'https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/mva/registrere-endre-slette/',
};

export const bokforingsregler2027Faq: { q: string; a: string; gjelder: Gjelder }[] = [
  {
    q: 'Må små ENK føre regnskap fra 2027?',
    gjelder: '2027',
    a: 'Har enkeltpersonforetaket omsetning på høyst 50 000 kroner i kalenderåret, og er det verken mva-registrert eller regnskapspliktig, slipper det bokføringsloven §§ 5 til 9 og § 13 b. Det må likevel dokumentere salg og kjøp og ta vare på dokumentasjonen (bokføringsforskriften § 1-2).',
  },
  {
    q: 'Hva er 50 000-kronersgrensen?',
    gjelder: '2027',
    a: 'Lettelsen gjelder bokføringspliktige som leverer skattemelding for formues- og inntektsskatt, og som har omsetning som ikke overstiger 50 000 kroner i løpet av et kalenderår (bokføringsforskriften § 1-2 første ledd).',
  },
  {
    q: 'Gjelder unntaket hvis jeg er mva-registrert?',
    gjelder: '2027',
    a: 'Nei. Unntaket gjelder ikke den som har plikt til å levere skattemelding for merverdiavgift, og heller ikke den som er regnskapspliktig (bokføringsforskriften § 1-2 tredje ledd).',
  },
  {
    q: 'Hva skjer hvis jeg passerer 50 000 kroner midt i året?',
    gjelder: '2027',
    a: 'Da opphører unntaket fra det tidspunktet grensen overskrides, ikke fra 1. januar. Fra da gjelder de vanlige bokføringsreglene (bokføringsforskriften § 1-2 annet ledd).',
  },
  {
    q: 'Må jeg ta vare på kvitteringer?',
    gjelder: '2027',
    a: 'Ja. Også de som får lettelsen, må dokumentere transaksjoner etter bokføringsloven §§ 10 og 11 og oppbevare dokumentasjonen etter § 13 og bokføringsforskriften kapittel 7 og 8 (bokføringsforskriften § 1-2 første ledd).',
  },
  {
    q: 'Gjelder de nye reglene for regnskapsåret 2026?',
    gjelder: '2026',
    a: 'Nei. Lettelsen i bokføringsforskriften § 1-2 trer i kraft 1. januar 2027. I 2026 gjelder bokføringsreglene fullt ut for alle bokføringspliktige, uansett omsetning.',
  },
  {
    q: 'Er dette det samme som forenklet næringsspesifikasjon?',
    gjelder: '2026',
    a: 'Nei. Forenklet næringsspesifikasjon er en del av skattemeldingen: svarer du nei på spørsmålet om driftsinntekter over 50 000 kroner, får du en forenklet versjon (Skatteetaten). Den handler om skattemeldingen, ikke om bokføringen. Lettelsen i bokføringsreglene er en egen regel som først gjelder fra 1. januar 2027.',
  },
];
