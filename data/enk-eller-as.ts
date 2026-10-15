/**
 * Artikkelen «ENK eller AS?» (/artikler/enk-eller-as/).
 * Kilde: brief 15.10.2026 (ideas-board id 20). Fakta og satser er sjekket mot
 * Skatteetaten, Lovdata og Brønnøysundregistrene 15.10.2026, se `kilder`.
 * Ingen priser. Satsene gjelder 2026; satsene for 2027 var ikke vedtatt da
 * artikkelen ble skrevet. Oppdater hver januar. Spørsmålene brukes både på
 * siden og i FAQPage-JSON-LD.
 */
export const enkEllerAs = {
  path: '/artikler/enk-eller-as/',
  title: 'ENK eller AS? Når det lønner seg å bytte · Flyd',
  description:
    'ENK eller aksjeselskap? Se forskjellene i ansvar, skatt og formelle krav, tegn på at det er på tide å bytte, og hvordan du omdanner ENK til AS skattefritt.',
  h1: 'ENK eller AS? Slik vet du når det er på tide å bytte',
  published: '2026-10-15',
  modified: '2026-10-15',
  hero: {
    // Utsnitt (16:9) av kontor/moi-prat.webp, som også brukes på kontorsiden for Moi.
    src: '/header/topp-enk-eller-as.webp',
    width: 900,
    height: 506,
    alt: 'To kolleger i Flyd som prater og ler sammen i gangen på kontoret i Moi',
  },
};

export const kilder = {
  aksjeloven12: 'https://lovdata.no/lov/1997-06-13-44/%C2%A71-2',
  aksjeloven31: 'https://lovdata.no/lov/1997-06-13-44/%C2%A73-1',
  aksjeloven55: 'https://lovdata.no/lov/1997-06-13-44/%C2%A75-5',
  aksjeloven612: 'https://lovdata.no/lov/1997-06-13-44/%C2%A76-12',
  aksjeloven614: 'https://lovdata.no/lov/1997-06-13-44/%C2%A76-14',
  fsfin: 'https://lovdata.no/forskrift/1999-11-19-1158',
  skatteloven: 'https://lovdata.no/dokument/NL/lov/1999-03-26-14/KAPITTEL_11-2',
  brregEnk: 'https://www.brreg.no/en/sole-proprietorship-2/make-changes-to-your-sole-proprietorship/',
  omdanning: 'https://www.skatteetaten.no/bedrift-og-organisasjon/starte-og-drive/avslutte-bedrift/endring-av-organisasjonsform/',
  inngangsverdi:
    'https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/aksjer-og-verdipapirer/om/fastsette-inngangsverdien/skattefri-omdanning-fra-enkeltpersonsforetak-eller-selskap-med-deltakerfastsetting-til-aksjeselskapa/',
  forskuddsutskrivingen: 'https://www.skatteetaten.no/rettskilder/type/uttalelser/uttalelser/forskuddsutskrivingen-2026/',
  regnskapSkatteetaten:
    'https://www.skatteetaten.no/bedrift-og-organisasjon/starte-og-drive/rutiner-regnskap-og-kassasystem/gode-rutiner-for-daglig-drift/regnskap/',
  skattemeldingEnk: 'https://www.skatteetaten.no/bedrift-og-organisasjon/skatt/skattemelding-naringsdrivende/selskap/enk/',
  arsregnskap: 'https://www.brreg.no/innsending-av-arsregnskap/',
  revisjonsplikt: 'https://www.brreg.no/aksjeselskap/revisjonsplikt-for-aksjeselskap/',
};

export const enkEllerAsFaq: { q: string; a: string }[] = [
  {
    q: 'Når lønner det seg å gå fra ENK til AS?',
    a: 'Regelverket har ingen omsetningsgrense for når du må bytte. Det handler om risiko, hvor mye av overskuddet som blir stående i virksomheten, og om du vil ha med flere eiere. Med høy risiko eller et overskudd du ikke trenger privat, blir AS oftere aktuelt. Tar du ut alt privat, blir forskjellen ofte mindre.',
  },
  {
    q: 'Kan jeg omdanne ENK til AS uten å betale skatt?',
    a: 'Ja, hvis vilkårene er oppfylt. Du må eie alle aksjene i det nye selskapet, og aktivitet, driftsmidler og forpliktelser må i det vesentlige overføres. Aksjeselskapet må være nystiftet. Reglene står i skatteloven § 11-20 og skatteforskriften §§ 11-20-1 og videre.',
  },
  {
    q: 'Må jeg gjøre det 1. januar?',
    a: 'Overgangen til selskapsfastsetting kan bare skje fra 1. januar. Er aksjeselskapet stiftet og meldt til Foretaksregisteret innen 1. juli, kan omdanningen få virkning fra 1. januar samme år, så lenge selskapet har foretatt skattetrekk og beregnet arbeidsgiveravgift senest fra 1. juli.',
  },
  {
    q: 'Hvor mye aksjekapital trenger et AS?',
    a: 'Et aksjeselskap skal ha en aksjekapital på minst 30 000 kroner (aksjeloven § 3-1). Det er et lovkrav, ikke en pris.',
  },
  {
    q: 'Har jeg personlig ansvar i et AS?',
    a: 'Aksjeeierne hefter ikke overfor kreditorene for selskapets forpliktelser (aksjeloven § 1-2). Som styremedlem eller daglig leder har du likevel plikter etter aksjeloven, blant annet å påse at regnskapet er under betryggende kontroll. I et ENK har innehaveren fullt personlig ansvar for gjeld og forpliktelser.',
  },
  {
    q: 'Kan jeg ta inn en medeier når jeg omdanner?',
    a: 'Ikke som en del av den skattefrie omdanningen. Skatteetaten skriver at du må eie 100 prosent av eierandelene i det nye selskapet etter omdanningen.',
  },
  {
    q: 'Må et AS ha revisor?',
    a: 'Nei, ikke hvis selskapet er under grensene. Et AS har revisjonsplikt hvis driftsinntekten er 7 millioner kroner eller mer, balansesummen er 27 millioner kroner eller mer, eller selskapet har mer enn 10 årsverk.',
  },
];
