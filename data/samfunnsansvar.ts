import type { FlydIconName } from '@/components/FlydIcon';

/**
 * Samfunnsansvar (/om-flyd/samfunnsansvar/): hvem Flyd sponser.
 *
 * Listen er Flyds egen (nov. 2026). Legg til, fjern eller flytt avtaler her;
 * logoveggen, kartet og nøkkeltallene på siden bygges herfra. `type` er hva
 * det er, kort og nøkternt – ikke beløp eller varighet på avtalene.
 *
 * Logoene ligger i public/samfunnsansvar/ (WebP, beskåret tett, høyst 240 px
 * høye) og er hentet fra lagenes og arrangørenes egne nettsider (nov. 2026).
 * `bredde` og `hoyde` er filens mål. Flekkefjord FK sitt merke er hvitt på rød
 * flate, så flaten er med i filen.
 *
 * Uten logo viser kortet et ikon fra Flyds ikonsett (`ikon`): Sokndal
 * Sportsdrill har bare Facebook-side, og Mathea Selebø er en utøver. Får vi
 * en logo eller et bilde fra dem selv, legges det i `logo`. Ikke hent bilder
 * av personer fra nettet – de tilhører fotografen.
 *
 * `sted` peker på et punkt i kartet (`sponsorsteder`). At Mathea Selebø er fra
 * Sokndal, står i Wikipedia-artikkelen om henne.
 */
export type Sponsorkategori = 'lag' | 'utover' | 'arrangement';
export type Sponsorlogo = { src: string; bredde: number; hoyde: number };
export type Sponsoravtale = {
  navn: string;
  kategori: Sponsorkategori;
  /** «Idrettslag», «Festival», «Motocross» … */
  type: string;
  /** `id` i `sponsorsteder`. */
  sted: string;
  logo?: Sponsorlogo;
  /** Vises på kortet når logoen mangler. */
  ikon?: FlydIconName;
  /** Egen nettside eller offisiell side (åpnes i nytt vindu). */
  url?: string;
};

export const samfunnsansvarPath = '/om-flyd/samfunnsansvar/';

export const sponsorkategorier: { id: Sponsorkategori; tittel: string }[] = [
  { id: 'lag', tittel: 'Idrettslag og klubber' },
  { id: 'utover', tittel: 'Utøvere' },
  { id: 'arrangement', tittel: 'Arrangement og anlegg' },
];

/**
 * Stedene i kartet. Egersund, Sokndal, Moi, Sirdal og Flekkefjord har samme
 * koordinater som kontorene (data/offices.ts); Hovsherad ligger nord for Moi.
 * `navnPlass` er hvor navnet står i forhold til punktet. Plassene er valgt slik
 * at navnene verken kolliderer eller havner utenfor kartet på en 320 px-skjerm.
 */
export type Sponsorsted = {
  id: string;
  navn: string;
  lat: number;
  lng: number;
  navnPlass: 'venstre' | 'hoyre' | 'under';
};

export const sponsorsteder: Sponsorsted[] = [
  { id: 'sirdal', navn: 'Sirdal', lat: 58.9091, lng: 6.8094, navnPlass: 'venstre' },
  { id: 'hovsherad', navn: 'Hovsherad', lat: 58.53, lng: 6.47, navnPlass: 'venstre' },
  { id: 'egersund', navn: 'Egersund', lat: 58.4514, lng: 5.9989, navnPlass: 'venstre' },
  { id: 'moi', navn: 'Moi', lat: 58.4621, lng: 6.5334, navnPlass: 'hoyre' },
  { id: 'sokndal', navn: 'Sokndal', lat: 58.3374, lng: 6.2714, navnPlass: 'venstre' },
  { id: 'flekkefjord', navn: 'Flekkefjord', lat: 58.2967, lng: 6.6628, navnPlass: 'under' },
];

const logo = (fil: string, bredde: number, hoyde: number): Sponsorlogo => ({
  src: `/samfunnsansvar/${fil}.webp`,
  bredde,
  hoyde,
});

export const sponsoravtaler: Sponsoravtale[] = [
  {
    navn: 'Egersunds IK',
    kategori: 'lag',
    type: 'Idrettsklubb',
    sted: 'egersund',
    logo: logo('egersunds-ik', 125, 192),
    url: 'https://www.eikfotball.no/',
  },
  {
    navn: 'Sokndal IK',
    kategori: 'lag',
    type: 'Idrettsklubb',
    sted: 'sokndal',
    logo: logo('sokndal-ik', 172, 172),
    url: 'https://sokndal-ik.no/',
  },
  {
    navn: 'Moi IL',
    kategori: 'lag',
    type: 'Idrettslag',
    sted: 'moi',
    logo: logo('moi-il', 167, 240),
    url: 'https://www.moiil.no/',
  },
  {
    navn: 'Flekkefjord Fotballklubb',
    kategori: 'lag',
    type: 'Fotballklubb',
    sted: 'flekkefjord',
    logo: logo('flekkefjord-fk', 294, 240),
    url: 'https://flekkefjordfk.no/',
  },
  {
    navn: 'Hovsherad IL',
    kategori: 'lag',
    type: 'Idrettslag',
    sted: 'hovsherad',
    logo: logo('hovsherad-il', 283, 145),
    url: 'https://hovsheradidrettslag.idrettenonline.no/',
  },
  {
    navn: 'Sirdal Skilag',
    kategori: 'lag',
    type: 'Skilag',
    sted: 'sirdal',
    logo: logo('sirdal-skilag', 233, 144),
    url: 'https://www.sirdalskilag.no/',
  },
  {
    navn: 'Sokndal Sportsdrill',
    kategori: 'lag',
    type: 'Sportsdrill',
    sted: 'sokndal',
    ikon: 'drill',
    url: 'https://www.facebook.com/p/Sokndal-Sportsdrill-61563832949680/',
  },
  {
    navn: 'Mathea Selebø',
    kategori: 'utover',
    type: 'Motocross',
    sted: 'sokndal',
    ikon: 'malflagg',
    url: 'https://www.facebook.com/MatheaSelebo612',
  },
  {
    navn: 'Guddafest',
    kategori: 'arrangement',
    type: 'Festival',
    sted: 'sokndal',
    logo: logo('guddafest', 587, 240),
    url: 'https://www.guddafest.no/',
  },
  {
    navn: 'Motorcenter Norway',
    kategori: 'arrangement',
    type: 'Motorsportanlegg',
    sted: 'sokndal',
    logo: logo('motorcenter-norway', 734, 240),
    url: 'https://www.motorcenternorway.no/',
  },
];

export const antallSponsoravtaler = sponsoravtaler.length;
