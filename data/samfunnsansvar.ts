/**
 * Samfunnsansvar (/om-flyd/samfunnsansvar/): hvem Flyd sponser.
 *
 * Listen er Flyds egen (nov. 2026). Legg til, fjern eller flytt avtaler her;
 * siden bygges fra gruppene. `detalj` er stedet eller hva det er, kort og
 * nøkternt – ikke beløp eller varighet på avtalene.
 */
export type Sponsoravtale = { navn: string; detalj: string };
export type Sponsorgruppe = { tittel: string; avtaler: Sponsoravtale[] };

export const samfunnsansvarPath = '/om-flyd/samfunnsansvar/';

export const sponsorgrupper: Sponsorgruppe[] = [
  {
    tittel: 'Idrettslag og klubber',
    avtaler: [
      { navn: 'Egersunds IK', detalj: 'Egersund' },
      { navn: 'Sokndal IK', detalj: 'Sokndal' },
      { navn: 'Moi IL', detalj: 'Moi' },
      { navn: 'Flekkefjord Fotballklubb', detalj: 'Flekkefjord' },
      { navn: 'Hovsherad IL', detalj: 'Hovsherad' },
      { navn: 'Sirdal Skilag', detalj: 'Sirdal' },
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
      { navn: 'Guddafest', detalj: 'Festival i Sokndal' },
      { navn: 'Motorcenter Norway', detalj: 'Motorsportanlegg i Sokndal' },
    ],
  },
];

export const antallSponsoravtaler = sponsorgrupper.reduce((n, g) => n + g.avtaler.length, 0);
