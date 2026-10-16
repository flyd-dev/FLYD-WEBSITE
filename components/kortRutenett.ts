/**
 * Rutenett for tjenestekortene som alltid går opp: ingen enslige kort nederst
 * til venstre, like høye kort og like brede kolonner.
 *
 * Hvert kort spenner over to spor, så en ufullstendig siste rad kan skyves et
 * halvt kort inn og stå midtstilt (4 + 3 med sju tjenester, 3 + 2 med fem).
 * På store skjermer velges tre eller fire kolonner etter antallet: det som gir
 * færrest tomme plasser i siste rad, og ved likt antall fire kolonner.
 *
 * Med `rader` deler kortene i samme rad radspor (CSS subgrid): bilde, tittel,
 * tekst og «Les mer» står på samme linje i alle kortene, selv når en tittel
 * brytes over to linjer. Kortet (lenken) må da ha `kortRader(rader)` og like
 * mange direkte barn. Uten `rader` blir alle radene like høye.
 *
 * Klassene står ferdig skrevet ut, så Tailwind finner dem.
 */
export function kortRutenett(antall: number, rader?: 4 | 5) {
  const tomme = (kol: number) => (kol - (antall % kol)) % kol;
  const kol = antall > 4 && tomme(4) <= tomme(3) ? 4 : 3;
  const sisteRad = antall % kol;
  const startSisteRad = sisteRad ? antall - sisteRad : -1;

  // Med subgrid går avstanden mellom kortradene som luft under hvert kort
  // (pb på li), ellers ville radavstanden også havnet inne i kortene.
  // Radmønsteret gjentas for hver kortrad. Tekstsporet er 1fr, og alle fr-spor
  // blir like store, så kortene er like høye også på tvers av radene.
  const radmonster = {
    4: 'sm:auto-rows-[auto_auto_1fr_auto]',
    5: 'sm:auto-rows-[auto_auto_auto_1fr_auto]',
  };
  const liste = [
    'grid grid-cols-1 gap-4 sm:grid-cols-4',
    rader ? `${radmonster[rader]} sm:gap-y-0 md:gap-x-5` : 'sm:auto-rows-fr md:gap-5',
    kol === 4 ? 'lg:grid-cols-8' : 'lg:grid-cols-6',
  ].join(' ');

  // Første kort i en ufullstendig siste rad: skyv inn (tomme plasser) halve kort.
  const lgStart: Record<number, string> = {
    1: 'lg:col-start-2',
    2: 'lg:col-start-3',
    3: 'lg:col-start-4',
  };

  const kort = (i: number) => {
    const klasser = ['sm:col-span-2'];
    if (rader) klasser.push(kortRader(rader), 'sm:pb-4 md:pb-5');
    // To kolonner: et odde siste kort midtstilles.
    if (antall % 2 === 1 && i === antall - 1) klasser.push('sm:col-start-2');
    if (i === startSisteRad) klasser.push(lgStart[tomme(kol)]);
    else if (antall % 2 === 1 && i === antall - 1) klasser.push('lg:col-start-auto');
    return klasser.join(' ');
  };

  return { liste, kort };
}

/** Gjør et element til subgrid over kortets radspor (fra to kolonner og opp). */
export function kortRader(rader: 4 | 5) {
  return rader === 5
    ? 'sm:row-span-5 sm:grid sm:grid-rows-subgrid'
    : 'sm:row-span-4 sm:grid sm:grid-rows-subgrid';
}
