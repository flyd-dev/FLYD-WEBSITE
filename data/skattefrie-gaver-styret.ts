/**
 * Artikkelen «Skattefrie gaver til styret» (/artikler/skattefrie-gaver-styret/).
 * Kilde: tekst fra Svein Zwygart og Arnstein Bendiksen, 20.–24.11.2026. Teksten
 * står nesten ordrett på siden. Ikke legg til andre gavegrenser (for eksempel
 * tjenestejubileum) eller eksempler som ikke står i den. Kildene er sjekket
 * 24.11.2026, se `kilder`. Spørsmålene bygger bare på teksten og brukes både
 * på siden og i FAQPage-JSON-LD. Oppdater `modified` når teksten endres.
 */
export const skattefrieGaverStyret = {
  path: '/artikler/skattefrie-gaver-styret/',
  title: 'Skattefrie gaver til styret – før nyttår · Flyd',
  description:
    'Vil dere gi styremedlemmer og varamedlemmer en gave før nyttår? Se reglene for skattefrie gaver i aksjeselskap: grensen på 5 000 kroner, vilkårene, og hva som gjelder for selskapet.',
  h1: 'Skattefrie gaver til styret – dette bør du vite før nyttår',
  published: '2026-11-24',
  modified: '2026-11-24',
  hero: {
    // Utsnitt (16:9) av kontor/moi-motebord.webp, som også brukes på kontorsiden for Sirdal.
    src: '/header/topp-skattefrie-gaver-styret.webp',
    width: 900,
    height: 506,
    alt: 'Kolleger i Flyd samlet rundt møtebordet med kaffe og frukt på kontoret på Moi',
  },
};

export const kilder = {
  fsfin51511: 'https://lovdata.no/forskrift/1999-11-19-1158/%C2%A75-15-1',
  skatteAbcGaver:
    'https://www.skatteetaten.no/rettskilder/type/handboker/skatte-abc/gjeldende/g-1-gaver-og-tilskudd-iarbeidsforhold-mv/G-1.004/G-1.005/',
};

export const skattefrieGaverStyretFaq: { q: string; a: string }[] = [
  {
    q: 'Hvor mye kan et aksjeselskap gi styremedlemmer skattefritt?',
    a: 'Inntil 5 000 kroner per person per kalenderår, inkludert merverdiavgift. Det gjelder både styremedlemmer og varamedlemmer. Dere velger selv om dere vil gi én gave eller fordele beløpet på flere gaver i løpet av året.',
  },
  {
    q: 'Kan gaven være et gavekort eller penger?',
    a: 'Gaven kan ikke være penger, og heller ikke noe som kan løses inn i penger. Et gavekort er greit, så lenge det ikke kan veksles inn i kontanter.',
  },
  {
    q: 'Hva skjer hvis gaven er på mer enn 5 000 kroner?',
    a: 'Det som går over 5 000 kroner, er skattepliktig for mottakeren. Det overskytende beløpet skal rapporteres i a-meldingen, og selskapet betaler arbeidsgiveravgift av det.',
  },
  {
    q: 'Gjelder grensen per selskap hvis personen har flere verv?',
    a: 'Ja. Har en person verv eller er ansatt i flere selskaper, kan hun eller han få inntil 5 000 kroner fra hvert av dem. Har personen både et verv og en ansettelse i samme selskap, er grensen fortsatt 5 000 kroner til sammen. Den dobles ikke.',
  },
  {
    q: 'Må gaven være en del av en ordning som gjelder alle i selskapet?',
    a: 'Nei. Det er ikke lenger et krav at gaven er en del av en ordning som gjelder alle i selskapet.',
  },
];
