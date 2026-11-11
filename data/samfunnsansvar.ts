/**
 * Samfunnsansvar (/om-flyd/samfunnsansvar/): hvem Flyd sponser.
 *
 * Listen er Flyds egen (nov. 2026). Legg til, fjern eller flytt avtaler her;
 * siden bygges fra gruppene. `detalj` er stedet eller hva det er, kort og
 * nøkternt – ikke beløp eller varighet på avtalene.
 *
 * Logoene ligger i public/samfunnsansvar/ (WebP, beskåret tett, høyst 240 px
 * høye) og er hentet fra lagenes og arrangørenes egne nettsider (nov. 2026).
 * `bredde` og `hoyde` er filens mål. Mangler logoen, viser siden
 * forbokstavene i stedet: Sokndal Sportsdrill har ingen nettside å hente den
 * fra, og Mathea Selebø er en utøver, ikke en klubb. Flekkefjord FK sitt
 * merke er hvitt på rød flate, så flaten er med i filen.
 */
export type Sponsorlogo = { src: string; bredde: number; hoyde: number };
export type Sponsoravtale = { navn: string; detalj: string; logo?: Sponsorlogo };

const logo = (fil: string, bredde: number, hoyde: number): Sponsorlogo => ({
  src: `/samfunnsansvar/${fil}.webp`,
  bredde,
  hoyde,
});
export type Sponsorgruppe = { tittel: string; avtaler: Sponsoravtale[] };

export const samfunnsansvarPath = '/om-flyd/samfunnsansvar/';

export const sponsorgrupper: Sponsorgruppe[] = [
  {
    tittel: 'Idrettslag og klubber',
    avtaler: [
      { navn: 'Egersunds IK', detalj: 'Egersund', logo: logo('egersunds-ik', 319, 200) },
      { navn: 'Sokndal IK', detalj: 'Sokndal', logo: logo('sokndal-ik', 172, 172) },
      { navn: 'Moi IL', detalj: 'Moi', logo: logo('moi-il', 167, 240) },
      { navn: 'Flekkefjord Fotballklubb', detalj: 'Flekkefjord', logo: logo('flekkefjord-fk', 294, 240) },
      { navn: 'Hovsherad IL', detalj: 'Hovsherad', logo: logo('hovsherad-il', 283, 145) },
      { navn: 'Sirdal Skilag', detalj: 'Sirdal', logo: logo('sirdal-skilag', 233, 144) },
      { navn: 'Sokndal Sportsdrill', detalj: 'Sokndal' },
    ],
  },
  {
    tittel: 'Utøvere',
    avtaler: [{ navn: 'Mathea Selebø', detalj: 'Motocross' }],
  },
  {
    tittel: 'Arrangement og anlegg',
    avtaler: [
      { navn: 'Guddafest', detalj: 'Festival i Sokndal', logo: logo('guddafest', 587, 240) },
      { navn: 'Motorcenter Norway', detalj: 'Motorsportanlegg i Sokndal', logo: logo('motorcenter-norway', 734, 240) },
    ],
  },
];

export const antallSponsoravtaler = sponsorgrupper.reduce((n, g) => n + g.avtaler.length, 0);
