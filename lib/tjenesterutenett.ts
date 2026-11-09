/**
 * Siste rad i tjenesterutenettet (forsiden, /tjenester og Tjenester-menyen).
 *
 * Revisjon leveres for seg og står sist. Går de kombinerbare tjenestene opp i
 * hele rader (seks på tre spalter), får revisjon en egen bred rad, som før. Blir
 * én tjeneste igjen på siste rad (sju, med AI), deler den raden med revisjon,
 * halv bredde hver, så rutenettet blir symmetrisk. Rutenettet har seks spalter
 * på desktop (et vanlig kort tar to) og to på nettbrett.
 */
export function sisteRad(antall: number) {
  const restDesktop = antall % 3;
  const restNettbrett = antall % 2;
  return {
    /** Spalter for kombinerbar tjeneste nr. i (fra 0). */
    kort: (i: number) => (restDesktop === 1 && i === antall - 1 ? 'lg:col-span-3' : 'lg:col-span-2'),
    /** Spalter for revisjonskortet. */
    revisjon: [
      restNettbrett === 0 ? 'sm:col-span-2' : 'sm:col-span-1',
      restDesktop === 0 ? 'lg:col-span-6' : restDesktop === 1 ? 'lg:col-span-3' : 'lg:col-span-2',
    ].join(' '),
    /** Revisjon i egen rad over hele bredden. */
    revisjonBred: restDesktop === 0,
    /** Siste tjeneste og revisjon deler raden, halv bredde hver (desktop). */
    delt: restDesktop === 1,
  };
}
