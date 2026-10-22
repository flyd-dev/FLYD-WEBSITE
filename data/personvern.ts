/**
 * Opplysningene som må fylles inn i personvernerklæringen (app/personvern/page.tsx).
 *
 * Erklæringen dekker både regnskap og revisjon. Flyd AS og Liit AS er fusjonert
 * til ett selskap med navnet Flyd AS og Liits organisasjonsnummer. Liit viser
 * til personvernerklæringen i revisjonsberetningene, så innholdet om revisjon
 * må stå her. Teksten bygger på Liits erklæring (forslag fra Floyd,
 * 22.10.2026) og skal godkjennes av revisorene før publisering.
 *
 * Felt som er `null`, vises som [BEKREFT] på forhåndsvisninger og stopper
 * produksjonsbygget (scripts/sjekk-bekreft.mjs) til de er fylt inn.
 */

/**
 * Org.nr. etter fusjonen (Liits nummer). Står ikke på nettstedet før Arnstein
 * sier at det kan publiseres (21.10.2026). Da settes `selskap.orgnr` til dette.
 */
export const ORGNR_ETTER_FUSJON = '931 900 420';

export const personvern: {
  /** F.eks. '1. november 2026'. Settes når erklæringen publiseres. */
  sistOppdatert: string | null;
  /** Selskapet etter fusjonen, som er behandlingsansvarlig. */
  selskap: { navn: string; orgnr: string | null };
  /** Personvernansvarlig. Liit oppga Heidi Odden. */
  personvernansvarlig: { navn: string | null; epost: string | null };
  postadresse: string | null;
} = {
  sistOppdatert: null,
  selskap: { navn: 'Flyd AS', orgnr: null },
  personvernansvarlig: { navn: null, epost: null },
  postadresse: null,
};
