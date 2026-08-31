export type CustomerLogo = {
  name: string;
  src: string;
  alt: string;
};

// Rekkefølgen bestemmer hva som er synlig når siden lastes: karusellen starter
// på element 0, og de første ~128 pikslene ligger bak fade-kanten til venstre.
// Derfor står Båtsfjord først som buffer — den blir dekket av fade-en — slik at
// Lervig og de andre viktigste kundene er de første som faktisk synes.
// Alle får lik eksponering gjennom de 40 sekundene karusellen bruker per runde.
export const customerLogos: CustomerLogo[] = [
  { name: 'Båtsfjord Laboratorium', src: '/customer-logo/balab_logo_000.webp', alt: 'Båtsfjord Laboratorium' },
  { name: 'Lervig', src: '/customer-logo/lervig.webp', alt: 'Lervig' },
  { name: 'Driftig', src: '/customer-logo/driftig.webp', alt: 'Driftig – Eiendomsservice fra OBOS' },
  { name: 'Årring', src: '/customer-logo/arring.webp', alt: 'Årring' },
  { name: 'Sirdal Fjellpark', src: '/customer-logo/sirdal_fjellpark.webp', alt: 'Sirdal Fjellpark' },
  { name: 'Sinneshyttå', src: '/customer-logo/sinneshytta.webp', alt: 'Sinneshyttå' },
  { name: 'NADG', src: '/customer-logo/NADGWebRetinav2.webp', alt: 'NADG' },
  { name: 'Arkit Interiør', src: '/customer-logo/arkit.webp', alt: 'Arkit Interiør' },
  { name: 'Arkit Arealplan', src: '/customer-logo/arkit_arealplan.webp', alt: 'Arkit Arealplan' },
  { name: 'Bilstad Bygg', src: '/customer-logo/bilstad_bygg.webp', alt: 'Bilstad Bygg' },
  { name: 'Sirdal Bygg', src: '/customer-logo/sirdalbygg.webp', alt: 'Sirdal Bygg' },
  { name: 'Sirdal Eiendom', src: '/customer-logo/sirdaleiendom.webp', alt: 'Sirdal Eiendom' },
  { name: 'Stangborli', src: '/customer-logo/logo-1.png.webp', alt: 'Stangborli' },
  { name: 'Steis', src: '/customer-logo/Steis.webp', alt: 'Steis' },
];
