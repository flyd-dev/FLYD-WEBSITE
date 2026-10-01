import type { Config } from 'tailwindcss';

// Fargene, skriftene og radiene følger Flyd designmanual v1.0 (sept. 2026),
// kap. 04 Farger, 05 Typografi og 06 Grafiske elementer. Ingen andre farger.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        flyd: {
          // Primær mørk: forsider, mørke flater, hovedtekst på lys bunn.
          skog: '#17292A',
          // Seksjonsskiller, store tall og mørke kort.
          petrol: '#24494B',
          // Logofargen: ikoner, linjer og avslutningsflater. Aldri liten tekst.
          teal: '#4C8687',
          // Støttefarge: tagger, dekor, ikoner på mørk bunn.
          mint: '#8BC2BB',
          // Aksent: én aksentflate per side, ellers små markeringer. Aldri tekst på lys bunn.
          korall: '#F2905A',
          // Aksent i tekst: kickers, nummerering og tall på lys bunn.
          rust: '#B9551F',
          // Primær lys bakgrunn, tekst på mørke flater.
          sand: '#F8F6F1',
          // Sekundær lys bakgrunn, veksler med Sand.
          lysmint: '#EAF2EF',
          // Brødtekst og sekundær tekst på lys bunn.
          skifer: '#4A5A5B',
          // Linjefarger og dempet tekst fra manualen.
          'linje-mint': '#C9DCD7',
          'linje-sand': '#E2DDD3',
          dempet: '#BFD8D5',
        },
      },
      fontFamily: {
        display: ['var(--font-poppins)', 'Arial', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        bilde: '24px',
        kort: '16px',
        flis: '12px',
        pille: '999px',
      },
      maxWidth: {
        shell: '1240px',
      },
      fontSize: {
        // Tittel: Poppins 600, linje 1,08, sperring −2 %.
        'display-xl': ['clamp(2.5rem, 5.4vw, 4.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        // Overskrift: Poppins 600, linje 1,1, sperring −1 %.
        'display-lg': ['clamp(2rem, 3.8vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.625rem, 2.6vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        // Ingress: Poppins 500, linje 1,35.
        ingress: ['clamp(1.125rem, 1.5vw, 1.3125rem)', { lineHeight: '1.45' }],
      },
    },
  },
  plugins: [],
};

export default config;
