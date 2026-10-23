import clsx from 'clsx';
import FlydLogo from '@/components/FlydLogo';
import FlydIcon, { type FlydIconName } from '@/components/FlydIcon';
import SystemLogo, { type SystemLogoName } from '@/components/SystemLogo';

/**
 * Systembanen: Flyd i midten av en bane. Forretningssystemene står
 * på den indre ringen (diagonalene), og det vi kobler dem til står på den
 * ytre (rett opp, ned og til sidene). Da går linjene inn mot midten mellom
 * flisene, aldri gjennom dem. Korall-punktum flyter inn mot Flyd, midten
 * pulserer svakt, og den ytre ringen driver sakte. Idé fra «Integrations
 * Orbit Section» (Tailark) på 21st.dev.
 *
 * Alt skalerer med bredden på flaten: posisjonene er prosent av samme
 * viewBox som linjene, og teksten er i container-enheter (cqw), så flisene
 * holder avstand også i smale kolonner. Under 560 px faller «Business NXT»
 * bort ved Visma-logoen, og under 420 px faller ikonene på den ytre ringen bort.
 *
 * Forretningssystemene vises med sine egne logoer i Sand (SystemLogo), de vi
 * kobler til som Flyd-ikoner, fordi det er kategorier og ikke bestemte produkter.
 *
 * SMIL-animasjonene (punktum, puls) lytter ikke på prefers-reduced-motion,
 * så de skjules helt da; ringen står stille.
 */
const W = 1000;
const H = 720;
const C = { x: 500, y: 360 };
const R_INDRE = 170;
const R_YTRE = 305;

type Node = { navn: string; vinkel: number };
// `hoyde` jevner ut logoene, så de ser like store ut (formatene er ulike).
type SystemNode = Node & { logo: SystemLogoName; hoyde: string; tillegg?: string };
type KategoriNode = Node & { icon: FlydIconName };

// Diagonalene: systemene vi jobber i (erpSystems i data/services.ts).
const indre: SystemNode[] = [
  { navn: 'Tripletex', vinkel: 135, logo: 'tripletex', hoyde: '1.7em' },
  { navn: 'Visma Business NXT', vinkel: 45, logo: 'visma', hoyde: '0.82em', tillegg: 'Business NXT' },
  { navn: 'Uni Micro', vinkel: 225, logo: 'unimicro', hoyde: '1.02em' },
  { navn: 'PowerOffice Go', vinkel: 315, logo: 'poweroffice', hoyde: '0.86em' },
];

// Rett opp, ned og til sidene. Fra integrasjonsteksten i data/services.ts.
const ytre: KategoriNode[] = [
  { navn: 'CRM', vinkel: 90, icon: 'medarbeidere' },
  { navn: 'Bransjeløsninger', vinkel: 0, icon: 'bransje' },
  { navn: 'Lønnssystem', vinkel: 270, icon: 'lonn-hr' },
  { navn: 'Nettbutikk', vinkel: 180, icon: 'nettbutikk' },
];

function punkt(r: number, vinkel: number) {
  const a = (vinkel * Math.PI) / 180;
  return { x: C.x + r * Math.cos(a), y: C.y - r * Math.sin(a) };
}

const css = `
  .systembane { container-type: inline-size; }
  @container (max-width: 560px) {
    .systembane .sb-lang { display: none; }
  }
  @container (max-width: 420px) {
    .systembane .sb-ikon { display: none; }
    .systembane .sb-scene { font-size: 10.5px; }
    .systembane .sb-system { font-size: 0.8em; }
    .systembane .sb-midt { font-size: 0.85em; }
  }
  @container (max-width: 300px) {
    .systembane .sb-scene { font-size: 9px; }
    .systembane .sb-system { font-size: 0.78em; }
  }
  @keyframes sb-drift { to { stroke-dashoffset: -180; } }
  .systembane .sb-drift { animation: sb-drift 24s linear infinite; }
  @media (prefers-reduced-motion: reduce) { .systembane .sb-drift { animation: none; } }
`;

const pst = (p: { x: number; y: number }) => ({ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` });

export default function SystemBane({ className }: { className?: string }) {
  const iNoder = indre.map((n) => ({ ...n, ...punkt(R_INDRE, n.vinkel) }));
  const yNoder = ytre.map((n) => ({ ...n, ...punkt(R_YTRE, n.vinkel) }));
  // Punktumene går innover, ytre først og så indre, forskjøvet så to–tre er i bevegelse om gangen.
  const baner = [...yNoder, ...iNoder].map((n, i) => ({
    d: `M ${n.x} ${n.y} L ${C.x} ${C.y}`,
    start: `${(i * 0.55).toFixed(2)}s`,
  }));

  return (
    <div className={clsx('systembane', className)}>
      {/* dangerouslySetInnerHTML: ellers escapes tegnene ulikt på server og klient (hydreringsfeil). */}
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="on-dark relative overflow-hidden rounded-bilde bg-flyd-skog p-3 sm:p-6">
        <div className="sb-scene relative mx-auto aspect-[25/18] w-full max-w-[1000px] text-[clamp(11px,1.5cqw,15px)]">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            aria-hidden="true"
            focusable="false"
            className="absolute inset-0 h-full w-full text-flyd-mint"
          >
            {/* Ringene */}
            <circle cx={C.x} cy={C.y} r={R_INDRE} fill="none" stroke="currentColor" strokeOpacity={0.28} strokeWidth={1.5} />
            <circle
              cx={C.x}
              cy={C.y}
              r={R_YTRE}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.22}
              strokeWidth={1.5}
              strokeDasharray="2 10"
              strokeLinecap="round"
              className="sb-drift"
            />
            <circle cx={C.x} cy={C.y} r={R_YTRE + 70} fill="none" stroke="currentColor" strokeOpacity={0.07} strokeWidth={1} />

            {/* Linjene inn mot midten */}
            {[...yNoder, ...iNoder].map((n) => (
              <line
                key={`l-${n.navn}`}
                x1={n.x}
                y1={n.y}
                x2={C.x}
                y2={C.y}
                stroke="currentColor"
                strokeOpacity={0.2}
                strokeWidth={1.25}
              />
            ))}

            <g className="motion-reduce:hidden">
              {/* Puls i midten */}
              <circle cx={C.x} cy={C.y} r={70} fill="none" stroke="currentColor" strokeWidth={1.5}>
                <animate attributeName="r" values="70;118" dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.35;0" dur="2.8s" repeatCount="indefinite" />
              </circle>
              {/* Punktum som flyter inn: går på 2,2 s, venter resten av runden usynlig. */}
              {baner.map((b, i) => (
                <rect key={i} x={-4.5} y={-4.5} width={9} height={9} rx={2} className="fill-flyd-korall" opacity={0}>
                  <animateMotion
                    path={b.d}
                    dur="4.4s"
                    begin={b.start}
                    repeatCount="indefinite"
                    keyPoints="0;1;1"
                    keyTimes="0;0.5;1"
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0;0"
                    keyTimes="0;0.08;0.42;0.5;1"
                    dur="4.4s"
                    begin={b.start}
                    repeatCount="indefinite"
                  />
                </rect>
              ))}
            </g>
          </svg>

          {/* Det vi kobler til: Flyd-ikon og navn */}
          {yNoder.map((n) => (
            <div
              key={n.navn}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-[0.45em] whitespace-nowrap rounded-pille border border-flyd-mint/35 bg-flyd-skog py-[0.45em] pl-[0.7em] pr-[0.95em] leading-tight text-flyd-dempet"
              style={pst(n)}
            >
              <FlydIcon name={n.icon} className="sb-ikon h-[1.2em] w-[1.2em] flex-shrink-0 text-flyd-mint" />
              {n.navn}
            </div>
          ))}

          {/* Forretningssystemene: egne logoer i Sand, samme høyde på alle flisene */}
          {iNoder.map((n) => (
            <div
              key={n.navn}
              className="sb-system absolute flex h-[2.7em] -translate-x-1/2 -translate-y-1/2 items-center gap-[0.55em] whitespace-nowrap rounded-flis bg-flyd-petrol px-[0.95em] font-medium leading-tight text-flyd-sand"
              style={pst(n)}
            >
              <SystemLogo
                name={n.logo}
                label={n.navn}
                className="w-auto flex-shrink-0"
                style={{ height: n.hoyde }}
              />
              {/* Hele navnet står i logoens aria-label, så tillegget skjules for skjermlesere. */}
              {n.tillegg && (
                <span aria-hidden="true" className="sb-lang text-[0.9em] text-flyd-dempet">
                  {n.tillegg}
                </span>
              )}
            </div>
          ))}

          {/* Flyd i midten */}
          <div
            className="sb-midt absolute -translate-x-1/2 -translate-y-1/2 rounded-kort bg-flyd-sand px-[1.1em] py-[0.7em]"
            style={pst(C)}
          >
            <FlydLogo title="Flyd" className="h-[2.4em] w-auto text-flyd-teal" />
          </div>
        </div>

        {/* Forklaring */}
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2 px-1 text-[13px] text-flyd-dempet sm:mt-0">
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-3 w-3 rounded-[3px] bg-flyd-petrol ring-1 ring-flyd-mint/40" />
            Forretningssystemer vi jobber i
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-3 w-5 rounded-pille border border-flyd-mint/50" />
            Det vi kobler dem til
          </li>
        </ul>
      </div>
    </div>
  );
}
