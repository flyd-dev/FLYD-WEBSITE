export type CustomerLogo = {
  name: string;
  src: string;
  alt: string;
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
  { name: 'NADG', src: '/customer-logo/NADGWebRetinav2.webp', alt: 'NADG' },
  { name: 'Arkit Interiør', src: '/customer-logo/arkit.webp', alt: 'Arkit Interiør' },
  { name: 'Arkit Arealplan', src: '/customer-logo/arkit_arealplan.webp', alt: 'Arkit Arealplan' },
  { name: 'Sirdal Bygg', src: '/customer-logo/sirdalbygg.webp', alt: 'Sirdal Bygg' },
  { name: 'Sirdal Eiendom', src: '/customer-logo/sirdaleiendom.webp', alt: 'Sirdal Eiendom' },
  { name: 'Steis', src: '/customer-logo/Steis.webp', alt: 'Steis' },
];
