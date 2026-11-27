/**
 * Logofilene (public/customer-logo/*.webp) er transparente, beskåret tett
 * rundt logoen og 300 px høye. Da får alle samme synlige høyde i karusellen
 * (h-10). Logoer på farget boks er frigjort fra boksen; lys tekst på boks
 * (Sirdal Bygg/Eiendom, Steis) er gjort om til tekst i boksfargen.
 * Karusellen viser småbilder (144 px høye) fra public/customer-logo/sma/, som
 * scripts/make-logo-thumbs.mjs lager før bygg. Legg nye logoer i 300 px her.
 *
 * Hvit bunn må fjernes i fila. mix-blend-multiply virker ikke i karusellen
 * (sporet flyttes med transform), så hvit bunn blir stående som en lys flis.
 * Arkit, Arkit Arealplan, Sinneshyttå og Sirdal Fjellpark hadde hvit bunn,
 * og Bilstad Bygg, Sirdal Bygg/Eiendom og Steis sto fortsatt på boksen sin
 * (rettet 27.11.2026). Brede ordmerker (Steis, Sirdal Bygg/Eiendom) har luft
 * over og under i fila, ellers blir de to–tre ganger så brede som de andre.
 * BåLab beholder rammen sin: den er en del av logoen.
 *
 * Ruyters (nov. 2026) er skjoldlogoen fra Flyd, hvit på mørk bunn i originalen,
 * gjort om til mørk logo i bunnfargen. «PREMIUM CAR CARE» er tatt bort fordi
 * linjen bare blir en grå strek i 40 px. Ordmerket alene fra ruyters.no er
 * prøvd og valgt bort: uten symbol ble det for bredt.
 *
 * Pizzabakeren, Leo's Lekeland, Omdal Transport, Norrøn Bolig, Ystepikene,
 * Yummy Time og Norsk Storkjøkken (PB Distribusjon) er tatt ut igjen (26.10.2026),
 * Driftig 27.11.2026. Ikke legg dem inn på nytt uten beskjed.
 */
export type CustomerLogo = {
  name: string;
  src: string;
  alt: string;
};

// Rekkefølgen bestemmer hva folk møter når karusellen kommer inn i synsfeltet —
// den starter først da, ikke ved sidelasting (se LogoMarquee.tsx).
// Båtsfjord ligger først som buffer: de ~128 første pikslene skjules av
// fade-kanten til venstre. Så kommer to rolige logoer som innledning, før
// Lervig, Ruyters og Årring får plassene der blikket lander.
// Alle får lik eksponering gjennom de 40 sekundene en runde tar.
export const customerLogos: CustomerLogo[] = [
  { name: 'Båtsfjord Laboratorium', src: '/customer-logo/balab_logo_000.webp', alt: 'Båtsfjord Laboratorium' },
  { name: 'Stangborli', src: '/customer-logo/logo-1.png.webp', alt: 'Stangborli' },
  { name: 'Bilstad Bygg', src: '/customer-logo/bilstad_bygg.webp', alt: 'Bilstad Bygg' },
  { name: 'Lervig', src: '/customer-logo/lervig.webp', alt: 'Lervig' },
  { name: 'Ruyters', src: '/customer-logo/ruyters.webp', alt: 'Ruyters Premium Car Care' },
  { name: 'Årring', src: '/customer-logo/arring.webp', alt: 'Årring' },
  { name: 'Sirdal Fjellpark', src: '/customer-logo/sirdal_fjellpark.webp', alt: 'Sirdal Fjellpark' },
  { name: 'Sinneshyttå', src: '/customer-logo/sinneshytta.webp', alt: 'Sinneshyttå' },
  { name: 'Arkit Interiør', src: '/customer-logo/arkit.webp', alt: 'Arkit Interiør' },
  { name: 'Arkit Arealplan', src: '/customer-logo/arkit_arealplan.webp', alt: 'Arkit Arealplan' },
  { name: 'Sirdal Bygg', src: '/customer-logo/sirdalbygg.webp', alt: 'Sirdal Bygg' },
  { name: 'Sirdal Eiendom', src: '/customer-logo/sirdaleiendom.webp', alt: 'Sirdal Eiendom' },
  { name: 'Steis', src: '/customer-logo/Steis.webp', alt: 'Steis' },
];
