/**
 * Opplysningene som må fylles inn i personvernerklæringen (app/personvern/page.tsx).
 *
 * Erklæringen er felles for regnskap og revisjon etter fusjonen med Liit. Liit
 * viser til personvernerklæringen i revisjonsberetningene, så innholdet om
 * revisjon må stå her. Teksten bygger på Liits erklæring (forslag fra Floyd,
 * 22.10.2026) og skal godkjennes av revisorene før publisering.
 *
 * Felt som er `null`, vises som [BEKREFT] på forhåndsvisninger og stopper
 * produksjonsbygget (scripts/sjekk-bekreft.mjs) til de er fylt inn.
 * Org.nr. legges ikke inn før det nye nummeret etter fusjonen er klart.
 */
export const personvern: {
  /** F.eks. '1. november 2026'. Settes når erklæringen publiseres. */
  sistOppdatert: string | null;
  /** Selskapet som leverer regnskap, lønn, rådgivning og teknologi. */
  regnskap: { navn: string; orgnr: string | null };
  /** Revisjonsselskapet, tidligere Liit AS. Er det ett selskap og ikke to, må punkt 1 skrives om. */
  revisjon: { navn: string | null; orgnr: string | null };
  /** Personvernansvarlig. Liit oppga Heidi Odden. */
  personvernansvarlig: { navn: string | null; epost: string | null };
  postadresse: string | null;
} = {
  sistOppdatert: null,
  regnskap: { navn: 'Flyd AS', orgnr: null },
  revisjon: { navn: null, orgnr: null },
  personvernansvarlig: { navn: null, epost: null },
  postadresse: null,
};
