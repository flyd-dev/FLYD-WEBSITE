import clsx from 'clsx';
import FlydLogo from '@/components/FlydLogo';

/**
 * Prototype (designlab): Flyd i midten, forretningssystemene på den indre
 * buen og det de kobles mot på den ytre. Korall-punktum glir langs linjene
 * inn mot midten – dataflyt som bilde. Idé fra «Integrations Orbit Section»
 * (Tailark) på 21st.dev, tegnet om: Skog-flate med radius 24 px, Mint-linjer,
 * Petrol-fliser og systemnavn som tekst (ingen tredjepartslogoer).
 *
 * Ren SVG og CSS. Linjer og punktum ligger i samme viewBox som flisene
 * plasseres etter (prosent), så de treffer hverandre i alle bredder.
 * Punktumene er SMIL-animasjon, som ikke lytter på prefers-reduced-motion,
 * så de skjules helt da.
 */
const W = 1000;
const H = 560;
const C = { x: 500, y: 492 };

type Node = { navn: string; kort?: string; vinkel: number };

const indre: Node[] = [
  { navn: 'Tripletex', vinkel: 157 },
  { navn: 'Visma Business NXT', kort: 'Visma', vinkel: 116 },
  { navn: 'Uni Micro', vinkel: 64 },
  { navn: 'PowerOffice Go', kort: 'PowerOffice', vinkel: 23 },
];

// Fra integrasjonsteksten i data/services.ts (+ Power BI fra analyse).
const ytre: Node[] = [
  { navn: 'Nettbutikk', vinkel: 169 },
  { navn: 'Lønnssystem', vinkel: 133 },
  { navn: 'CRM', vinkel: 90 },
  { navn: 'Bransjeløsninger', vinkel: 47 },
  { navn: 'Power BI', vinkel: 11 },
];

const R_INDRE = 232;
const R_YTRE = 420;

function punkt(r: number, vinkel: number) {
  const a = (vinkel * Math.PI) / 180;
  return { x: C.x + r * Math.cos(a), y: C.y - r * Math.sin(a) };
}

const bue = (r: number) => `M ${C.x - r} ${C.y} A ${r} ${r} 0 0 1 ${C.x + r} ${C.y}`;

export default function SystemBane({ className }: { className?: string }) {
  const alle = [
    ...indre.map((n) => ({ ...n, ...punkt(R_INDRE, n.vinkel), ring: 'indre' as const })),
    ...ytre.map((n) => ({ ...n, ...punkt(R_YTRE, n.vinkel), ring: 'ytre' as const })),
  ];

  return (
    <div className={className}>
      <div className="on-dark relative overflow-hidden rounded-bilde bg-flyd-skog px-3 pt-6 sm:px-6 sm:pt-10">
        {/* Under md er den ytre ringen skjult, så toppen av scenen er tom – den trekkes opp. */}
        <div className="relative mx-auto -mt-[18%] aspect-[25/14] w-full max-w-[1000px] md:mt-0">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            aria-hidden="true"
            focusable="false"
            className="absolute inset-0 h-full w-full text-flyd-mint"
          >
            <path d={bue(R_INDRE)} fill="none" stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.5} />
            <path
              d={bue(R_YTRE)}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.25}
              strokeWidth={1.5}
              strokeDasharray="2 7"
              strokeLinecap="round"
              className="hidden md:inline"
            />
            {alle.map((n) => (
              <line
                key={`l-${n.navn}`}
                x1={n.x}
                y1={n.y}
                x2={C.x}
                y2={C.y}
                stroke="currentColor"
                strokeOpacity={n.ring === 'indre' ? 0.22 : 0.12}
                strokeWidth={1}
                className={n.ring === 'ytre' ? 'hidden md:inline' : undefined}
              />
            ))}
            <g className="motion-reduce:hidden">
              {alle.map((n, i) => (
                <rect
                  key={`p-${n.navn}`}
                  x={-4}
                  y={-4}
                  width={8}
                  height={8}
                  rx={1.5}
                  className={clsx('fill-flyd-korall', n.ring === 'ytre' && 'hidden md:inline')}
                  opacity={0}
                >
                  <animateMotion
                    dur={n.ring === 'indre' ? '2.6s' : '3.4s'}
                    begin={`${(i * 0.55).toFixed(2)}s`}
                    repeatCount="indefinite"
                    path={`M ${n.x} ${n.y} L ${C.x} ${C.y}`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.8;1"
                    dur={n.ring === 'indre' ? '2.6s' : '3.4s'}
                    begin={`${(i * 0.55).toFixed(2)}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              ))}
            </g>
          </svg>

          {alle.map((n) => (
            <div
              key={n.navn}
              className={clsx(
                'absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap',
                n.ring === 'indre'
                  ? 'rounded-flis bg-flyd-petrol px-2.5 py-1.5 text-[11px] font-medium text-flyd-sand sm:px-3.5 sm:py-2 sm:text-[15px]'
                  : 'hidden rounded-pille border border-flyd-mint/40 bg-flyd-skog px-3 py-1.5 text-[13px] text-flyd-dempet md:block',
              )}
              style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%` }}
            >
              {n.kort ? (
                <>
                  <span className="sm:hidden">{n.kort}</span>
                  <span className="hidden sm:inline">{n.navn}</span>
                </>
              ) : (
                n.navn
              )}
            </div>
          ))}

          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-kort bg-flyd-sand px-3 py-2 sm:px-5 sm:py-3"
            style={{ left: `${(C.x / W) * 100}%`, top: `${(C.y / H) * 100}%` }}
          >
            <FlydLogo title="Flyd" className="h-7 w-auto text-flyd-teal sm:h-10" />
          </div>
        </div>
      </div>

      {/* Den ytre ringen blir for trang på mobil – der står den som liste under. */}
      <ul className="mt-4 flex flex-wrap gap-2 md:hidden" aria-label="Vi kobler også">
        {ytre.map((n) => (
          <li
            key={n.navn}
            className="rounded-pille border border-flyd-teal px-3 py-1.5 text-[13px] text-flyd-skog"
          >
            {n.navn}
          </li>
        ))}
      </ul>
    </div>
  );
}
