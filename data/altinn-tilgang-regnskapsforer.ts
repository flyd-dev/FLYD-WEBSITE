/**
 * Artikkelen «Gi regnskapsfører tilgang i Altinn» (/artikler/altinn-tilgang-regnskapsforer/).
 * Kilde: brief 15.10.2026 (ideas-board id 17). Fakta er sjekket mot Altinn,
 * Skatteetaten og Brønnøysundregistrene 15.10.2026, se `kilder`. Pakkenavnene
 * følger Altinns egne navn («signeringsrettighet»). Spørsmålene brukes både
 * på siden og i FAQPage-JSON-LD. Oppdater `modified` når teksten endres.
 */
export const altinnTilgang = {
  path: '/artikler/altinn-tilgang-regnskapsforer/',
  title: 'Gi regnskapsfører tilgang i Altinn – tilgangspakker · Flyd',
  description:
    'Altinn-rollene er byttet ut med tilgangspakker. Se hvilke regnskapsføreren trenger, hvordan du gir tilgang, og hva som endres før 2027.',
  h1: 'Slik gir du regnskapsføreren riktig tilgang i Altinn',
  published: '2026-10-15',
  modified: '2026-10-15',
  hero: {
    // Utsnitt (16:9) av office-4.webp, som også brukes i prosesskortene på forsiden.
    src: '/header/topp-altinn-tilgang.webp',
    width: 1000,
    height: 563,
    alt: 'Rådgivere i Flyd i et møte rundt et bord, med Flyds tjenesteoversikt på skjermen',
  },
};

export const kilder = {
  altinnOvergang:
    'https://info.altinn.no/nyheter/altinn-rollene-erstattes-av-tilgangspakker-slik-handterer-du-overgangen/',
  altinnUtfasing: 'https://info.altinn.no/hjelp/ny-tilgangsstyring/utfasing-av-altinn-ii-roller/',
  altinnGiFullmakt: 'https://info.altinn.no/hjelp/ny-tilgangsstyring/steg-for-steg-guider/gi-fullmakt-til-tilgangspakker/',
  altinnSlett: 'https://info.altinn.no/hjelp/ny-tilgangsstyring/slett-fullmakter/',
  altinnAdministrere:
    'https://info.altinn.no/hjelp/ny-tilgangsstyring/tilgangspakker/roller-fra-enhetsregisteret-for-a-administrere-tilganger/',
  altinnKlientadmin: 'https://info.altinn.no/nyheter/enklere-og-mer-fleksibel-klientadministrasjon-i-nye-altinn/',
  altinnRegnskapsforerPakker:
    'https://docs.altinn.studio/nb/authorization/what-do-you-get/accesspackages/business/regnskapsforer/',
  altinnSkattPakker:
    'https://docs.altinn.studio/nb/authorization/what-do-you-get/accesspackages/business/skattavgiftregnskaptoll/',
  altinnPersonalePakker:
    'https://docs.altinn.studio/nb/authorization/what-do-you-get/accesspackages/business/personale/',
  skatteetatenSelskap: 'https://www.skatteetaten.no/bedrift-og-organisasjon/skatt/skattemelding-naringsdrivende/selskap/',
  skatteetatenEnk: 'https://www.skatteetaten.no/bedrift-og-organisasjon/skatt/skattemelding-naringsdrivende/selskap/enk/',
  skatteetatenRegnskapsforer: 'https://www.skatteetaten.no/samarbeidspartnere/reetablering-altinn/regnskapsforer-revisor/',
  skatteetatenOvergang:
    'https://www.skatteetaten.no/samarbeidspartnere/sluttbrukersystemer/sbs-nyheter/informasjon-om-overgangen-fra-altinn-2-til-altinn-3-for-de-moderniserte-losningene-skattemelding-og-mva/',
  brregSamordnet: 'https://www.brreg.no/bedrift/samordnet-registermelding/',
};

export const altinnFaq: { q: string; a: string }[] = [
  {
    q: 'Hvilken tilgangspakke trenger regnskapsføreren i Altinn?',
    a: 'Vanligvis «Regnskapsfører med signeringsrettighet», «Regnskapsfører uten signeringsrettighet» og «Regnskapsfører lønn». Byrået får dem automatisk når du registrerer det som regnskapsfører i Enhetsregisteret. Skal byrået gjøre mer, for eksempel levere mva-melding uten å være registrert, kan du gi pakker som «Skatt næring» og «Merverdiavgift».',
  },
  {
    q: 'Får regnskapsføreren tilgang automatisk?',
    a: 'Ja, hvis regnskapsføreren er autorisert og registrert som regnskapsfører for virksomheten din i Enhetsregisteret. Da får byrået de tre regnskapsførerpakkene. Fullmakter du har gitt manuelt i gamle Altinn, følger ikke automatisk med og må gis på nytt.',
  },
  {
    q: 'Hvorfor må jeg gi tilgang på nytt når regnskapsføreren hadde det før?',
    a: 'Gamle Altinn stengte 19. juni 2026, og rollene er byttet ut med tilgangspakker. Roller fra Enhetsregisteret og regnskapsførerrollene gjøres om automatisk. Fullmakter som du selv delegerte til byrået i gamle Altinn, må gis på nytt som tilgangspakker.',
  },
  {
    q: 'Hva skjer med Altinn-rollene i 2027?',
    a: 'Altinn-rollene fases ut og slutter å gjelde senest 31. desember 2026. For skattemeldingen skriver Skatteetaten at du fra og med 2027 må ha riktig tilgangspakke. Ifølge Altinn slutter skattemeldingen, a-meldingen og skattekort å være tilgjengelige via de gamle rollene allerede 17. november 2026.',
  },
  {
    q: 'Gjelder dette også enkeltpersonforetak?',
    a: 'Ja. Overgangen til tilgangspakker gjelder alle virksomheter i Altinn, og Altinns utfasingsliste omfatter skattemeldingen for både person og næring. Innehaveren får automatisk pakken Hovedadministrator og kan gi regnskapsføreren tilgang.',
  },
  {
    q: 'Hvem i bedriften kan gi tilgang i Altinn?',
    a: 'Daglig leder, styrets leder og innehaver får automatisk pakken Hovedadministrator og kan gi alle fullmakter. Andre kan gi fullmakt hvis de er tilgangsstyrer og selv har pakken de vil gi videre.',
  },
  {
    q: 'Hva er forskjellen på regnskapsfører med og uten signeringsrettighet?',
    a: 'Med signeringsrettighet kan regnskapsføreren signere på vegne av virksomheten i alle tjenester som krever signeringsrett. Uten signeringsrettighet kan regnskapsføreren bruke alle tjenester som ikke krever signering. Regnskapsfører lønn gir tilgang til å rapportere lønn.',
  },
  {
    q: 'Må jeg gi tilgang til hver ansatt hos regnskapsføreren?',
    a: 'Nei. Du gir fullmakten til regnskapsføringsbyrået, ikke til enkeltpersoner. Byrået fordeler selv tilgangen til sine medarbeidere og systemer gjennom klientadministrasjon i Altinn.',
  },
  {
    q: 'Hvordan fjerner jeg tilgangen til en tidligere regnskapsfører?',
    a: 'Meld ny regnskapsfører i Samordnet registermelding. Regnskapsførerpakkene følger registreringen i Enhetsregisteret. Fullmakter du har gitt manuelt, sletter du selv: Tilgangsstyring, Brukere, velg byrået og klikk Slett fullmakt, eller Slett bruker for å fjerne alle.',
  },
];
