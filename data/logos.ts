/**
 * Logofilene (public/customer-logo/*.webp) er transparente, beskåret tett
 * rundt logoen og 300 px høye. Da får alle samme synlige høyde i karusellen
 * (h-10). Logoer på farget boks er frigjort fra boksen; hvit tekst på boks
 * (Sirdal Bygg/Eiendom) er gjort om til tekst i boksfargen.
 * Unntak: Pizzabakeren (124 px), Leo's Lekeland (157 px) og Norsk Storkjøkken
 * (195 px) har kildenes egen oppløsning og er ikke oppskalert.
 * Karusellen viser småbilder (144 px høye) fra public/customer-logo/sma/, som
 * scripts/make-logo-thumbs.mjs lager før bygg. Legg nye logoer i 300 px her.
 */
export type CustomerLogo = {
  name: string;
  src: string;
  alt: string;
  /**
   * Lyse logoer forsvinner nesten i gråtonestripa. «litt» gjør dem mørkere
   * til de har fått farge igjen ved hover (LogoMarquee.tsx).
   */
  darken?: 'litt';
  /**
   * Kjente merkevarer vises 20 % høyere (h-12) enn resten av stripa
   * (LogoMarquee.tsx). Gråtone, demping og hover er som for de andre.
   * Bruk sparsomt – ellers forsvinner poenget.
   */
  featured?: boolean;
};

// Rekkefølgen bestemmer hva folk møter når karusellen kommer inn i synsfeltet —
// den starter først da, ikke ved sidelasting (se LogoMarquee.tsx).
// Båtsfjord ligger først som buffer: de ~128 første pikslene skjules av
// fade-kanten til venstre. Så kommer to rolige logoer som innledning, før
// Lervig, Driftig og Årring får plassene der blikket lander.
// Alle får lik eksponering gjennom de 40 sekundene en runde tar.
export const customerLogos: CustomerLogo[] = [
  { name: 'Båtsfjord Laboratorium', src: '/customer-logo/balab_logo_000.webp', alt: 'Båtsfjord Laboratorium' },
  { name: 'Stangborli', src: '/customer-logo/logo-1.png.webp', alt: 'Stangborli' },
  { name: 'Bilstad Bygg', src: '/customer-logo/bilstad_bygg.webp', alt: 'Bilstad Bygg' },
  { name: 'Lervig', src: '/customer-logo/lervig.webp', alt: 'Lervig' },
  { name: 'Driftig', src: '/customer-logo/driftig.webp', alt: 'Driftig – Eiendomsservice fra OBOS' },
  { name: 'Årring', src: '/customer-logo/arring.webp', alt: 'Årring' },
  { name: 'Sirdal Fjellpark', src: '/customer-logo/sirdal_fjellpark.webp', alt: 'Sirdal Fjellpark' },
  { name: 'Sinneshyttå', src: '/customer-logo/sinneshytta.webp', alt: 'Sinneshyttå' },
  { name: 'Arkit Interiør', src: '/customer-logo/arkit.webp', alt: 'Arkit Interiør' },
  { name: 'Arkit Arealplan', src: '/customer-logo/arkit_arealplan.webp', alt: 'Arkit Arealplan' },
  { name: 'Sirdal Bygg', src: '/customer-logo/sirdalbygg.webp', alt: 'Sirdal Bygg' },
  { name: 'Sirdal Eiendom', src: '/customer-logo/sirdaleiendom.webp', alt: 'Sirdal Eiendom' },
  { name: 'Steis', src: '/customer-logo/Steis.webp', alt: 'Steis' },
  // Logoene under er hentet fra kundenes egne nettsider.
  //
  // Pizzabakeren: standardlogoen i toppmenyen på pizzabakeren.no,
  // https://static.pizzabakeren.com/resources/img/logo.png (271×124, ikke oppskalert;
  // kopi i brand_assets/customer-logo-src/pizzabakeren-logo.png). logo.svg på samme
  // sted er regnbueversjonen og skal ikke brukes.
  // Leo's Lekeland: satt sammen av scripts/make-leos-lockup.mjs fra
  // https://www.leoslekeland.no/icon.png (løvehodet, grønn flis fjernet) og
  // https://www.leoslekeland.no/_next/static/media/logo.36b72qk9tq227.svg (ordmerket).
  { name: 'Pizzabakeren', src: '/customer-logo/pizzabakeren.webp', alt: 'Pizzabakeren', featured: true },
  { name: "Leo's Lekeland", src: '/customer-logo/leos-lekeland.webp', alt: "Leo's Lekeland", featured: true },
  { name: 'Omdal Transport', src: '/customer-logo/omdal-transport.webp', alt: 'Omdal Transport' },
  { name: 'Norrøn Bolig', src: '/customer-logo/norron-bolig.webp', alt: 'Norrøn Bolig', darken: 'litt' },
  // Ystepikene: SVG-logoen i toppmenyen på https://ystepikene.no/ (inline i sidekilden,
  // hentet 21.10.2026; kopi i brand_assets/customer-logo-src/ystepikene-logo.svg).
  { name: 'Ystepikene', src: '/customer-logo/ystepikene.webp', alt: 'Ystepikene' },
  // Yummy Time: https://yummytime.no/site/img/logo.png (972×668, transparent; kopi i
  // brand_assets/customer-logo-src/yummytime-logo.png).
  { name: 'Yummy Time', src: '/customer-logo/yummytime.webp', alt: 'Yummy Time' },
  // Norsk Storkjøkken (PB Distribusjon): logoen i toppmenyen på norskstorkjokken.no,
  // https://www.norskstorkjokken.no/img/logo.png (424×195, ikke oppskalert; kopi i
  // brand_assets/customer-logo-src/norsk-storkjokken-logo.png). Logoen viser «PB Distribusjon».
  { name: 'Norsk Storkjøkken', src: '/customer-logo/norsk-storkjokken.webp', alt: 'Norsk Storkjøkken' },
];
