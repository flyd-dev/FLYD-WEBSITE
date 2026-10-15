/**
 * Artikkelen «Lønn eller utbytte» (/artikler/lonn-eller-utbytte/).
 * Kilde: brief 15.10.2026 (ideas-board id 22). Fakta er sjekket mot Lovdata,
 * Skatteetaten og Brønnøysundregistrene 15.10.2026, se `kilder`. Ingen priser
 * og ingen skattesatser, faktortall eller G-beløp i teksten. Ingen
 * individuelle råd. Spørsmålene brukes både på siden og i FAQPage-JSON-LD.
 */
export const lonnEllerUtbytte = {
  path: '/artikler/lonn-eller-utbytte/',
  title: 'Lønn eller utbytte fra eget AS – før nyttår · Flyd',
  description:
    'Skal du ta ut penger fra eget AS før nyttår? Se forskjellen på lønn, utbytte og aksjonærlån – og hva du må ha på plass før du betaler ut.',
  h1: 'Lønn eller utbytte: slik tar du penger ut av eget AS før nyttår',
  published: '2026-10-15',
  modified: '2026-10-15',
  hero: {
    // Utsnitt (16:9) av kontor/egersund-motebord.webp, som også brukes på kontorsiden for Egersund.
    src: '/header/topp-lonn-eller-utbytte.webp',
    width: 900,
    height: 506,
    alt: 'Tre kolleger i Flyd ler sammen rundt møtebordet på kontoret i Egersund',
  },
};

export const kilder = {
  aksjeloven81: 'https://lovdata.no/lov/1997-06-13-44/%C2%A78-1',
  aksjeloven82: 'https://lovdata.no/lov/1997-06-13-44/%C2%A78-2',
  aksjeloven82a: 'https://lovdata.no/lov/1997-06-13-44/%C2%A78-2a',
  aksjeloven87: 'https://lovdata.no/lov/1997-06-13-44/%C2%A78-7',
  generalforsamling: 'https://www.brreg.no/aksjeselskap/generalforsamling-i-aksjeselskap/',
  skatteloven61: 'https://lovdata.no/lov/1999-03-26-14/%C2%A76-1',
  skatteloven1011: 'https://lovdata.no/lov/1999-03-26-14/%C2%A710-11',
  skatteloven1012: 'https://lovdata.no/lov/1999-03-26-14/%C2%A710-12',
  skatteloven122: 'https://lovdata.no/lov/1999-03-26-14/%C2%A712-2',
  folketrygdloven315: 'https://lovdata.no/lov/1997-02-28-19/%C2%A73-15',
  folketrygdloven828: 'https://lovdata.no/lov/1997-02-28-19/%C2%A78-28',
  folketrygdloven232: 'https://lovdata.no/lov/1997-02-28-19/%C2%A723-2',
  utbytte:
    'https://www.skatteetaten.no/bedrift-og-organisasjon/starte-og-drive/rutiner-regnskap-og-kassasystem/lonn-lan-og-utbytte/utbytte-fra-selskap/',
  faktortall:
    'https://www.skatteetaten.no/bedrift-og-organisasjon/starte-og-drive/rutiner-regnskap-og-kassasystem/lonn-lan-og-utbytte/oppjustering-av-utbytte-og-andre-eierinntekter-med-faktortall/',
  omklassifisering:
    'https://www.skatteetaten.no/rettskilder/type/handboker/skatte-abc/gjeldende/t-7-tilsidesettelse--allment/T-7.004/T-7.010/',
  lanSporsmal:
    'https://www.skatteetaten.no/bedrift-og-organisasjon/starte-og-drive/rutiner-regnskap-og-kassasystem/lonn-lan-og-utbytte/lan-til-aksjonar/skattepliktig-lan-til-personlig-aksjonar/sporsmal-og-svar---lan-fra-selskap/',
  smaLan:
    'https://www.skatteetaten.no/bedrift-og-organisasjon/starte-og-drive/rutiner-regnskap-og-kassasystem/lonn-lan-og-utbytte/lan-til-aksjonar/mindre-og-kortvarige-lan-til-personlig-aksjonar/',
  aksjonarregister:
    'https://www.skatteetaten.no/bedrift-og-organisasjon/rapportering-og-bransjer/aksjonarregisteroppgaven/',
};

export const lonnEllerUtbytteFaq: { q: string; a: string }[] = [
  {
    q: 'Er det best å ta ut lønn eller utbytte?',
    a: 'Det finnes ingen fasit. Lønn er pensjonsgivende inntekt og teller med når sykepengene beregnes, men selskapet betaler arbeidsgiveravgift. Utbytte gir ingen slike rettigheter og krever fri egenkapital og vedtak på generalforsamlingen. Hva som passer, avhenger av situasjonen din, så gå gjennom det med regnskapsføreren.',
  },
  {
    q: 'Kan jeg ta ut utbytte før nyttår?',
    a: 'Bare som ekstraordinært utbytte. Det krever en mellombalanse med balansedag høyst seks måneder før vedtaket, revidert hvis selskapet har revisor. Mellombalansen sendes til Regnskapsregisteret, og utbyttet kan først betales ut når den er registrert og kunngjort (aksjeloven § 8-2 a). Ordinært utbytte for 2026 vedtas på generalforsamlingen i 2027.',
  },
  {
    q: 'Kan jeg låne penger fra eget AS?',
    a: 'Selskapet kan gi lån til en aksjeeier innenfor rammen av det det kan dele ut som utbytte, og det skal stilles betryggende sikkerhet (aksjeloven § 8-7). Skattemessig blir lånet likevel som hovedregel skattlagt som utbytte hos deg, også om det er ulovlig etter aksjeloven.',
  },
  {
    q: 'Hva er unntaket for små aksjonærlån?',
    a: 'Lån under 100 000 kroner som betales tilbake innen 60 dager, skattlegges ikke som utbytte. Grensen gjelder samlet utestående, også mellomregning. Er lånet 100 000 kroner eller mer, blir hele lånet skattepliktig som utbytte, ikke bare det som overstiger grensen (Skatteetaten).',
  },
  {
    q: 'Hvem bestemmer hvor mye utbytte som deles ut?',
    a: 'Generalforsamlingen, etter forslag fra styret. Den kan ikke vedta høyere utbytte enn styret har foreslått eller godtar (aksjeloven § 8-2). Selskapet må ha nok netto eiendeler til å dekke aksjekapitalen og annen bundet egenkapital etter utdelingen, og ha forsvarlig egenkapital og likviditet (§ 8-1).',
  },
  {
    q: 'Får jeg sykepenger og pensjon hvis jeg bare tar utbytte?',
    a: 'Utbytte er ikke personinntekt og gir ikke pensjonsopptjening i folketrygden (folketrygdloven § 3-15, skatteloven § 12-2). Sykepengene beregnes ut fra arbeidsinntekt som er rapportert i a-meldingen (folketrygdloven § 8-28). Tar du bare utbytte, bygger du altså ikke opp disse rettighetene gjennom selskapet.',
  },
  {
    q: 'Kan Skatteetaten endre lønn til utbytte?',
    a: 'Ja. Får en aksjonær lønn som ikke svarer til en tilsvarende arbeidsinnsats i selskapet, kan hele eller deler av lønnen omklassifiseres til utbytte. Det motsatte skjer normalt ikke: utbytte omklassifiseres vanligvis ikke til lønn selv om lønnen er lav i forhold til arbeidsinnsatsen (Skatte-ABC 2025/2026).',
  },
];
