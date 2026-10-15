/**
 * Artikkelen «Årsavslutning: sjekkliste» (/artikler/arsavslutning-sjekkliste/).
 * Kilde: brief 15.10.2026 (ideas-board id 21). Fakta er sjekket mot Lovdata,
 * Skatteetaten og Brønnøysundregistrene 15.10.2026, se `kilder`. Ingen priser
 * eller gebyrbeløp. Vinklingen er hva kunden leverer, ikke hvordan
 * regnskapsfører gjør årsoppgjøret. Bare lovfestede frister med offisiell
 * kilde, ingen leveringsfrister mot regnskapsfører (Marius 15.10.2026).
 * Spørsmålene brukes både på siden og i FAQPage-JSON-LD.
 */
export const arsavslutning = {
  path: '/artikler/arsavslutning-sjekkliste/',
  title: 'Årsoppgjør: sjekkliste – dette trenger regnskapsfører · Flyd',
  description:
    'Hva må du levere til regnskapsføreren ved årsoppgjøret? Bilag, saldoer per 31.12, varetelling, kunder og leverandører – her er hele sjekklisten.',
  h1: 'Årsavslutning: sjekkliste for hva regnskapsføreren trenger fra deg',
  published: '2026-10-15',
  modified: '2026-10-15',
  hero: {
    // Utsnitt (16:9) av kontor/egersund-notatbok.webp, som også brukes på kontorsiden for Egersund.
    src: '/header/topp-arsavslutning-sjekkliste.webp',
    width: 900,
    height: 506,
    alt: 'Smilende regnskapsfører i Flyd tar notater i en notatbok ved skrivebordet',
  },
};

export const kilder = {
  varetelling: 'https://lovdata.no/forskrift/2004-12-01-1558/%C2%A76-1',
  arsregnskap: 'https://www.brreg.no/innsending-av-arsregnskap/',
  generalforsamling: 'https://www.brreg.no/aksjeselskap/generalforsamling-i-aksjeselskap/',
  aksjeloven55: 'https://lovdata.no/lov/1997-06-13-44/%C2%A75-5',
  skattemeldingAs: 'https://www.skatteetaten.no/bedrift-og-organisasjon/skatt/skattemelding-naringsdrivende/selskap/',
  skattemeldingEnk: 'https://www.skatteetaten.no/bedrift-og-organisasjon/skatt/skattemelding-naringsdrivende/enk/',
  aksjonarregister:
    'https://www.skatteetaten.no/bedrift-og-organisasjon/rapportering-og-bransjer/aksjonarregisteroppgaven/',
  mvaFrister:
    'https://www.skatteetaten.no/rettskilder/type/handboker/skattebetalingshandboken/gjeldende/kapittel-10.-forfall/ID-10-13.001/ID-10-13.005/',
};

export const arsavslutningFaq: { q: string; a: string }[] = [
  {
    q: 'Hva trenger regnskapsføreren til årsoppgjøret?',
    a: 'Alle bilag for året, kontoutskrifter og saldo per 31. desember for bank, lån og kredittkort, varetelling hvis du har varelager, oversikt over ubetalte kunde- og leverandørfakturaer, kjøp og salg av eiendeler, og beskjed om store endringer. I AS også endringer i eierskapet, og i ENK privat bruk av bil og andre eiendeler.',
  },
  {
    q: 'Når må varetellingen gjøres?',
    a: 'Hovedregelen er at varelageret telles ved regnskapsårets slutt, altså 31. desember når regnskapsåret følger kalenderåret. Fører du et betryggende lagerregnskap, kan du telle i løpet av året, men da må tilgang og avgang fram til årsslutt kunne dokumenteres (bokføringsforskriften § 6-1).',
  },
  {
    q: 'Hva skal en telleliste inneholde?',
    a: 'En oppstilling per vare med varens art, antall med måleenhet og verdi, en sum og hvordan verdien er beregnet. Listen skal være datert og vise hvem som har talt. Tellelister på papir skal være nummerert før tellingen og tas vare på (bokføringsforskriften § 6-1).',
  },
  {
    q: 'Hvilke frister gjelder for årsoppgjøret?',
    a: 'Skattemeldingen for enkeltpersonforetak og aksjeselskap har frist 31. mai (Skatteetaten). Et aksjeselskap skal sende årsregnskapet til Regnskapsregisteret senest 31. juli, og den fristen kan ikke utsettes (Brønnøysundregistrene). Aksjonærregisteroppgaven har frist 31. januar (Skatteetaten).',
  },
  {
    q: 'Hvem har ansvaret hvis årsregnskapet kommer for sent?',
    a: 'Styret, eventuelt deltakerne eller daglig leder, har ansvaret for å sende årsregnskapet, også når regnskapsføreren eller revisoren har avtalt å sende det. Fristen 31. juli kan ikke utsettes (Brønnøysundregistrene).',
  },
  {
    q: 'Må jeg levere noe hvis selskapet ikke har hatt aktivitet?',
    a: 'Ja. Et aksjeselskap må sende årsregnskap selv om det ikke har hatt drift eller aktivitet (Brønnøysundregistrene), og skattemeldingen må leveres selv om selskapet ikke har hatt omsetning (Skatteetaten).',
  },
];
