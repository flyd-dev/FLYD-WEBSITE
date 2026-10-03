import type { ReactNode } from 'react';

/**
 * Flyds generelle ikonsett (kilde: brand_assets/ikoner/). Samme stil som
 * tjenesteikonene i ServiceIcon.tsx: 24×24-rutenett, 2 px strek i
 * currentColor og logoens «punktum» – den lille firkanten – i Korall.
 *
 * Strek i Flyd-teal på lys bunn og Mint på mørk; punktumet er alltid Korall.
 * Bare ikonene nettstedet bruker er lagt inn her – resten av settet ligger i
 * brand_assets/ikoner/.
 */
const icons = {
  'samme-tak': {
    body: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" />
      </>
    ),
    dot: [10.5, 13],
  },
  sparring: {
    body: (
      <>
        <path d="M14 9a2 2 0 0 1-2 2H6l-3 3V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2z" />
        <path d="M18 9h1a2 2 0 0 1 2 2v10l-3-3h-6a2 2 0 0 1-2-2v-1" />
      </>
    ),
    dot: [7, 5.5],
  },
  erp: {
    body: (
      <>
        <path d="M12 3 3 7.5l9 4.5 9-4.5z" />
        <path d="m3 12 9 4.5 9-4.5" />
        <path d="m3 16.5 9 4.5 9-4.5" />
      </>
    ),
    dot: [10.5, 6],
  },
  automatisering: {
    body: (
      <>
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
      </>
    ),
    dot: [10.5, 10.5],
  },
  lokal: {
    body: <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0z" />,
    dot: [10.5, 8.5],
  },
  innsikt: {
    body: (
      <>
        <path d="M9 18h6M10 21h4" />
        <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2v.2h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />
      </>
    ),
    dot: [10.5, 7.5],
  },
  dialog: {
    body: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
    dot: [10.5, 10.5],
  },
  plan: {
    body: (
      <>
        <path d="M6 19h9.5a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7H19" />
        <path d="m16 2 3 3-3 3" />
      </>
    ),
    dot: [1.5, 17.5],
  },
  'i-drift': {
    body: (
      <>
        <path d="M3.6 18a9 9 0 1 1 16.8 0z" />
        <path d="m12 14.8 4-5.3" />
      </>
    ),
    dot: [10.5, 13.3],
  },
  videreutvikling: {
    body: (
      <>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </>
    ),
    dot: [7.5, 9.5],
  },
  epost: {
    body: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    dot: [15.5, 14],
  },
  telefon: {
    body: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
    dot: [16, 4],
  },
  /** Et bygg – brukes for kunder og for selskapet (org.nr.). */
  kunder: {
    body: (
      <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M2 21h20M10 21v-4h4v4M8 7.5h2M14 7.5h2M8 11.5h2" />
    ),
    dot: [13.5, 10],
  },
  medarbeidere: {
    body: (
      <>
        <circle cx="9" cy="7" r="3.5" />
        <path d="M2.5 21v-1.5A4.5 4.5 0 0 1 7 15h4a4.5 4.5 0 0 1 4.5 4.5V21M17.5 15a4 4 0 0 1 4 4v2" />
      </>
    ),
    dot: [15.5, 5.5],
  },
  /** Rosett – kompetanse, kurs og sertifiseringer. */
  statsautorisert: {
    body: (
      <>
        <circle cx="12" cy="9" r="6" />
        <path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" />
      </>
    ),
    dot: [10.5, 7.5],
  },
} satisfies Record<string, { body: ReactNode; dot: [number, number] }>;

export type FlydIconName = keyof typeof icons;

/** Dekorativt ikon – teksten ved siden av bærer innholdet. Farge og størrelse via `className`. */
export default function FlydIcon({
  name,
  className,
}: {
  name: FlydIconName;
  className?: string;
}) {
  const { body, dot } = icons[name];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {body}
      <rect x={dot[0]} y={dot[1]} width="3" height="3" stroke="none" className="fill-flyd-korall" />
    </svg>
  );
}
