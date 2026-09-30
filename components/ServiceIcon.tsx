import clsx from 'clsx';
import type { ReactNode } from 'react';

/**
 * Flyds tjenesteikoner (2D). Kilde: brand_assets/tjenesteikoner/.
 * 24×24-rutenett, strek i currentColor. «Punktumet» – den lille firkanten
 * fra logoen – tegnes separat så det kan få egen farge (`dotClassName`).
 *
 * Kortversjonen (ServiceTile) følger `kort/`-filene: strek i #F8F6F1 og
 * oransje punktum (#F2905A) – et bevisst unntak fra fargeregelen, kun her
 * (se CLAUDE.md).
 */
const icons = {
  regnskap: {
    body: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6" />
        <path d="M9 11.5h6" />
        <path d="M9 16h2.5" />
      </>
    ),
    dot: [14, 14.5],
  },
  erp: {
    body: (
      <>
        <path d="M12 3 21 7.5 12 12 3 7.5Z" />
        <path d="m3 12 9 4.5 9-4.5" />
        <path d="m3 16.5 9 4.5 9-4.5" />
      </>
    ),
    dot: [10.5, 6],
  },
  integrasjoner: {
    body: (
      <>
        <rect x="2.5" y="2.5" width="7" height="7" rx="1.5" />
        <rect x="14.5" y="14.5" width="7" height="7" rx="1.5" />
        <path d="M9.5 6h6a2.5 2.5 0 0 1 2.5 2.5V13" />
        <path d="m15.5 10.5 2.5 2.5 2.5-2.5" />
        <path d="M14.5 18h-6A2.5 2.5 0 0 1 6 15.5V11" />
        <path d="M3.5 13.5 6 11l2.5 2.5" />
      </>
    ),
    dot: [4.5, 4.5],
  },
  analyse: {
    body: (
      <>
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <path d="M8 17v-3" />
        <path d="M12.5 17v-5" />
        <path d="M17 17v-8" />
        <path d="m6.5 10 4-3 3 2 4.5-4.5" />
      </>
    ),
    dot: [17.25, 2.75],
  },
  nettsider: {
    body: (
      <>
        <rect x="3" y="4.5" width="18" height="15" rx="2" />
        <path d="M3 10h18" />
        <rect x="6.5" y="12.75" width="4.5" height="3.75" rx="1" />
        <path d="M14 13.5h3.5" />
        <path d="M14 16h2" />
      </>
    ),
    dot: [5.5, 5.75],
  },
  lonn: {
    body: (
      <>
        <circle cx="9" cy="7" r="3.5" />
        <path d="M3 21v-1.5A4.5 4.5 0 0 1 7.5 15h2.5" />
        <circle cx="17" cy="16" r="4.5" />
      </>
    ),
    dot: [15.5, 14.5],
  },
} satisfies Record<string, { body: ReactNode; dot: [number, number] }>;

export type ServiceIconName = keyof typeof icons;

function IconShapes({
  name,
  dotClassName,
  dotFill,
}: {
  name: ServiceIconName;
  dotClassName?: string;
  dotFill?: string;
}) {
  const { body, dot } = icons[name];
  return (
    <>
      {body}
      <rect
        x={dot[0]}
        y={dot[1]}
        width="3"
        height="3"
        stroke="none"
        fill={dotFill}
        className={dotFill ? undefined : dotClassName ?? 'fill-current'}
      />
    </>
  );
}

/** Enkeltikon i 24px-stil – til lister, overskrifter o.l. Dekorativt (teksten ved siden av bærer navnet). */
export default function ServiceIcon({
  name,
  className,
  strokeWidth = 2,
  dotClassName,
}: {
  name: ServiceIconName;
  className?: string;
  strokeWidth?: number;
  dotClassName?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <IconShapes name={name} dotClassName={dotClassName} />
    </svg>
  );
}

export type ServiceTone = 'teal' | 'dark' | 'ink';

// Gradientflatene fra tjenestekortene.
const toneGradients: Record<ServiceTone, string> = {
  teal: 'bg-[radial-gradient(120%_90%_at_15%_0%,#B9DAD8_0%,#8BC0BE_38%,#4C8E93_100%)]',
  dark: 'bg-[radial-gradient(120%_90%_at_85%_10%,#8BC0BE_0%,#4C8E93_45%,#1F3639_100%)]',
  ink: 'bg-[radial-gradient(120%_100%_at_20%_0%,#3A6268_0%,#274347_45%,#121C1E_100%)]',
};

const toneAccent: Record<ServiceTone, string> = {
  teal: 'bg-[radial-gradient(60%_60%_at_85%_90%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_60%)]',
  dark: 'bg-[radial-gradient(60%_60%_at_15%_85%,rgba(139,192,190,0.45)_0%,rgba(139,192,190,0)_60%)]',
  ink: 'bg-[radial-gradient(55%_55%_at_80%_10%,rgba(139,192,190,0.4)_0%,rgba(139,192,190,0)_65%)]',
};

// Farger fra kort/-filene. Oransje punktum er et avtalt unntak (sept. 2026).
const TILE_LINE = '#F8F6F1';
const TILE_DOT = '#F2905A';

/**
 * Kortbildet: tone-gradient med en glassflis, ikonet i lys strek og oransje
 * punktum (etter `kort/`-filene). Kvadratisk viewBox + «meet» gjør at flisen alltid
 * fyller ~75 % av korteste side, uansett om flaten er bred eller smal.
 */
export function ServiceTile({
  name,
  tone,
  className,
}: {
  name: ServiceIconName;
  tone: ServiceTone;
  className?: string;
}) {
  return (
    <div className={clsx('relative overflow-hidden', toneGradients[tone], className)}>
      <div className={clsx('pointer-events-none absolute inset-0', toneAccent[tone])} aria-hidden="true" />
      <svg
        viewBox="-12 -12 48 48"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      >
        <rect
          x="-6"
          y="-6"
          width="36"
          height="36"
          rx="7.2"
          fill={TILE_LINE}
          fillOpacity=".16"
          stroke={TILE_LINE}
          strokeOpacity=".45"
          strokeWidth=".35"
        />
        <g
          fill="none"
          stroke={TILE_LINE}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <IconShapes name={name} dotFill={TILE_DOT} />
        </g>
      </svg>
    </div>
  );
}
