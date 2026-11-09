import type { Faq } from '@/data/services';
import type { FlydIconName } from '@/components/FlydIcon';

/**
 * Innholdet på /tjenester/ai/ (app/tjenester/ai/page.tsx).
 *
 * Utkast til en AI-kampanje (nov. 2026): et rent AI-budskap som ikke handler om
 * regnskap eller revisjon. Teksten bygger på Floyds skisse til tjenesteside, strammet
 * inn så ingenting står to ganger på siden: «Bruksområder» er bakt inn i
 * tjenestekortene, og «Fra idé til drift» under «Hvorfor Flyd» er tatt ut fordi
 * tjenesteoverskriften sier det samme.
 *
 * Siden er utkast (`status` på tjenesten i data/services.ts) og vises bare lokalt
 * og på forhåndsvisninger. Gå gjennom `sjekkliste` før den settes til `publisert`.
 */
export const ai = {
  meta: {
    title: 'AI og automatisering for bedrifter',
    description:
      'Vi kobler AI til systemene og dataene dere bruker hver dag, og bygger AI-assistenter og agenter som gjør ferdig oppgaver. Fra kartlegging til drift.',
  },

  topp: {
    kicker: 'AI og automatisering',
    tittel: 'AI som kjenner bedriften din.',
    ingress:
      'De fleste har prøvd ChatGPT. Færre har AI som faktisk jobber i systemene, med dataene og arbeidsflyten de bruker hver dag. Det bygger vi.',
    tekst:
      'Vi kobler AI til ERP, CRM, dokumenter og e-post, og lager assistenter og agenter som gjør ferdig oppgaver. Dere beholder kontrollen hele veien.',
  },

  /** Illustrasjonen i toppen. Ingen tall eller kundedata. */
  samtale: {
    etikett: 'Illustrasjon – AI-assistent',
    meldinger: [
      { fra: 'du', tekst: 'Hvilke prosjekter går med lavere margin enn budsjettert?' },
      {
        fra: 'ai',
        tekst:
          'Tre prosjekter ligger under budsjett. Det største avviket skyldes timer som ikke er fakturert. Vil du at jeg lager et ordreutkast?',
        handling: 'Godkjenn',
      },
      { fra: 'du', tekst: 'Ja, og lag en kort oppsummering til prosjektlederen.' },
    ] as { fra: 'du' | 'ai'; tekst: string; handling?: string }[],
  },

  problem: {
    kicker: 'Fra prat til drift',
    // Hardt mellomrom før tankestreken, så den ikke starter en linje.
    tittel: 'AI er lett å prøve\u00A0– og vanskelig å få i drift.',
    tekst:
      'Mange har testet AI og kjent på mulighetene. Så stopper det. Verktøyet vet ingenting om bedriften, det snakker ikke med systemene, og ingen vet helt hva det er trygt å dele.',
    sitat:
      'Det er ikke modellen som er problemet. Det er koblingen til virkeligheten: dataene, systemene og arbeidsflyten.',
    avslutning: 'Det er der vi jobber hver dag.',
  },

  tjenester: {
    kicker: 'Tjenester',
    tittel: 'Fra første idé til løsning i drift.',
    punkter: [
      {
        ikon: 'plan',
        tittel: 'AI-kartlegging',
        tekst:
          'Vi går gjennom prosessene og systemene deres og finner de tre stedene der AI gir mest. Dere får en prioritert plan med forventet gevinst, før dere bruker en krone på utvikling.',
      },
      {
        ikon: 'sparring',
        tittel: 'AI-assistent for de ansatte',
        tekst:
          'En assistent som kjenner bedriften. Den finner svar i systemene, dokumentene og e-posten, alltid med den ansattes egne tilganger. Spør bedriften din som du spør en kollega.',
      },
      {
        ikon: 'automatisering',
        tittel: 'AI-agenter',
        tekst:
          'Agenter som gjør jobben ferdig: lager tilbud fra kalkylen, setter opp ordre, skriver e-poster, fører timer og lager presentasjoner. Agenten forbereder, du trykker godkjenn.',
      },
      {
        ikon: 'innsikt',
        tittel: 'Data og innsikt',
        tekst:
          'AI er bare så god som dataene den har. Vi samler dataene, bygger rapporter og dashbord i Power BI og gjør det mulig å stille spørsmål til tallene med vanlig språk.',
      },
      {
        ikon: 'nettsider',
        tittel: 'AI ut mot kundene dine',
        tekst:
          'AI på nettsiden og i kundeportalen svarer, veileder og tar imot bestillinger – også klokka ti en søndag kveld. Det den ikke kan svare på, går til riktig person.',
      },
      {
        ikon: 'medarbeidere',
        tittel: 'Opplæring og innføring',
        tekst:
          'Den beste løsningen er verdiløs om ingen bruker den. Vi lærer opp de ansatte, lager retningslinjer for trygg bruk og følger opp til AI er en del av hverdagen.',
      },
    ] as { ikon: FlydIconName; tittel: string; tekst: string }[],
  },

  hvorfor: {
    kicker: 'Hvorfor Flyd',
    tittel: 'Vi kjenner systemene AI skal jobbe i.',
    tekst:
      'AI blir først nyttig når den er koblet til det som driver bedriften. Vi har implementert og integrert forretningssystemer i mange år, og vi kjenner dataene, flytene og fallgruvene.',
    punkter: [
      {
        ikon: 'erp',
        tittel: 'Vi starter i systemene',
        tekst: 'ERP, CRM, dokumenter og e-post – vi vet hvor dataene ligger og hvordan de henger sammen.',
      },
      {
        ikon: 'godkjenn',
        tittel: 'Dere beholder kontrollen',
        tekst: 'Ingenting lagres eller sendes uten at et menneske har sagt ja.',
      },
      {
        ikon: 'skjold',
        tittel: 'Trygt fra start',
        tekst: 'AI-en ser bare det brukeren selv har tilgang til, og dataene deres forblir deres.',
      },
      {
        ikon: 'lokal',
        tittel: 'Nær og lokal',
        tekst: 'Seks kontorer på Sør-Vestlandet, og folk som kommer på besøk.',
      },
    ] as { ikon: FlydIconName; tittel: string; tekst: string }[],
  },

  egenAi: {
    kicker: 'Vår egen AI',
    tittel: 'Vi bygde den for oss selv først.',
    tekst: [
      'Vår egen AI-assistent jobber i forretningssystemet, dokumentene, e-posten, kalenderen og rapportene våre. Den lager tilbud fra kalkylen, setter opp ordreutkast, fører timer, skriver dokumenter og svarer på spørsmål om tallene.',
      'Alt vi har lært av det, tar vi med inn i prosjektene våre.',
    ],
    lenke: 'Be om en demo',
    flyt: {
      tittel: 'Eksempel: et tilbud fra kalkylen',
      steg: [
        { tekst: 'Kalkylen lastes opp', merke: 'Inn' },
        { tekst: 'Agenten lager tilbudet i deres profil', merke: 'AI' },
        { tekst: 'Du leser gjennom forhåndsvisningen', merke: 'Kontroll' },
        { tekst: 'Du trykker godkjenn', merke: 'Ferdig' },
      ],
    },
  },

  prosess: {
    kicker: 'Slik jobber vi',
    tittel: 'Slik kommer dere i gang.',
    steg: [
      {
        tittel: 'AI-sjekk',
        tekst: 'En uforpliktende samtale på 45\u00A0minutter. Vi blir kjent med bedriften og peker på de første mulighetene.',
      },
      {
        tittel: 'Kartlegging',
        tekst: 'Vi går i dybden på prosesser, systemer og data og lager en prioritert plan.',
      },
      {
        tittel: 'Bygg',
        tekst: 'Vi bygger, kobler til systemene og tester sammen med dem som skal bruke løsningen.',
      },
      {
        tittel: 'I drift',
        tekst: 'Opplæring, oppfølging og videreutvikling. Løsningen skal vokse med bedriften.',
      },
    ],
  },

  faq: {
    kicker: 'Spørsmål og svar',
    tittel: 'Det mange lurer på',
    sporsmal: [
      {
        q: 'Trenger vi en IT-avdeling for å komme i gang?',
        a: 'Nei. Vi tar oss av det tekniske og sørger for at løsningen passer til hvordan dere jobber.',
      },
      {
        q: 'Er dataene våre trygge?',
        a: 'AI-en ser bare det brukeren selv har tilgang til, og vi setter opp løsningen slik at dataene deres ikke brukes til å trene andres modeller. Vi går gjennom sikkerhet og personvern med dere før vi starter.',
      },
      {
        q: 'Hvilke systemer kan dere koble AI til?',
        a: 'Vanlige forretningssystemer som Tripletex, Visma Business NXT, Uni Micro og PowerOffice Go, i tillegg til Microsoft 365, CRM og bransjesystemer. Har dere noe annet, finner vi en løsning.',
      },
      {
        q: 'Hvor lang tid tar det?',
        a: 'En kartlegging tar et par uker. De første løsningene kan være i drift i løpet av noen uker, avhengig av omfang.',
      },
      {
        q: 'Hva koster det?',
        a: 'Vi starter med en gratis AI-sjekk. Kartleggingen har fast pris, og dere får et tydelig estimat før vi bygger noe.',
      },
      {
        q: 'Tar AI over jobben til de ansatte?',
        a: 'AI tar over de repetitive oppgavene. Folkene deres får mer tid til kundene, vurderingene og det de er gode på.',
      },
    ] as Faq[],
  },

  avslutning: {
    kicker: 'Kom i gang',
    tittel: 'Hvor vil du starte?',
    tekst:
      'Fortell oss om bedriften og hvor tiden går i dag. Så finner vi ut hvor AI kan gjøre en forskjell – på 45\u00A0minutter, uten forpliktelser.',
  },

  /**
   * Vises bare på utkastet, nederst på siden. Fra sjekklisten i Floyds skisse.
   * Når alt er avklart: sett tjenesten til `publisert` i data/services.ts og
   * temaet i data/kontaktskjema.ts, og legg siden inn i metadata på /tjenester.
   */
  sjekkliste: [
    'Personvern: svaret på «Er dataene våre trygge?» og punktet «Trygt fra start» godkjennes av den som har ansvar for personvern og IT.',
    'Løfter: «gratis AI-sjekk», «45 minutter», «fast pris», «et par uker» og «noen uker» må stemme med det vi faktisk leverer.',
    'Systemlisten under «Hvilke systemer kan dere koble AI til?»: bare systemer vi har koblet AI til eller kan koble til.',
    'Vår egen AI: det vi skriver at den gjør, må stemme. En demo viser bare testdata, aldri kundedata.',
    'Samtalen i toppen er en illustrasjon. Bytt gjerne til et skjermbilde eller en video fra en demo med testdata.',
    'Kundecase: plassen over spørsmålene fylles når en ekte case med samtykke og dokumenterbare tall er klar.',
  ],
};
