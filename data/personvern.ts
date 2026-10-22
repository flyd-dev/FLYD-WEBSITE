/**
 * Opplysningene som må fylles inn i personvernerklæringen (app/personvern/page.tsx).
 *
 * Erklæringen dekker både regnskap og revisjon. Liit viser til
 * personvernerklæringen i revisjonsberetningene, så innholdet om revisjon må
 * stå her. Fusjonen og org.nr. nevnes ikke før fusjonen er gjennomført (ca. seks
 * uker etter 22.10.2026, Irene). Da kan org.nr. 931 900 420 legges inn i punkt 1
 * etter avtale med Arnstein. Teksten bygger på Liits erklæring (forslag fra Floyd,
 * 22.10.2026) og skal godkjennes av revisorene før publisering.
 *
 * Felt som er `null`, vises som [BEKREFT] på forhåndsvisninger og stopper
 * produksjonsbygget (scripts/sjekk-bekreft.mjs) til de er fylt inn.
 */

export const personvern: {
  /** F.eks. '1. november 2026'. Settes når erklæringen publiseres. */
  sistOppdatert: string | null;
  /** Selskapet som er behandlingsansvarlig. */
  selskap: { navn: string };
  /** Personvernansvarlig. Liit oppga Heidi Odden. */
  personvernansvarlig: { navn: string | null; epost: string | null };
  postadresse: string | null;
} = {
  sistOppdatert: null,
  selskap: { navn: 'Flyd AS' },
  personvernansvarlig: { navn: null, epost: null },
  postadresse: null,
};
