import clsx from 'clsx';
import FlydIcon, { type FlydIconName } from '@/components/FlydIcon';
import SystemLogo, { type SystemLogoName } from '@/components/SystemLogo';

/**
 * Systembanen: forretningssystemet ditt i midten, og det vi kobler det til
 * rundt. Idé fra «Integrations Orbit Section» (Tailark) på 21st.dev.
 *
 * Midten viser ett system om gangen (Tripletex, Visma Business NXT, Uni Micro
 * eller PowerOffice Go), fordi en bedrift velger ett av dem. Rundt står det vi
 * kobler til, som Flyd-ikoner, fordi det er kategorier og ikke bestemte
 * produkter. Korall-punktum går begge veier langs linjene: dataene flyter inn
 * og ut av systemet av seg selv. Flyd står ikke i tegningen: vi setter opp
 * koblingene, dataene går ikke gjennom oss.
 *
 * Alt skalerer med bredden på flaten: posisjonene er prosent av samme viewBox
 * som linjene, og teksten er i container-enheter (cqw). Under 420 px faller
 * ikonene på ringen bort, og flisene krymper.
 *
 * Ved prefers-reduced-motion står alt stille: midten viser de fire logoene i et
 * rutenett i stedet for å veksle, og punktumene (SMIL) skjules.
 */
const W = 1000;
const H = 720;
const C = { x: 500, y: 360 };
const R = 300;

type SystemNode = { navn: string; logo: SystemLogoName; hoyde: string; tillegg?: string };
type KategoriNode = { navn: string; vinkel: number; icon: FlydIconName };

// Systemene vi jobber i (erpSystems i data/services.ts). `hoyde` jevner ut logoene,
// så de ser like store ut (formatene er ulike).
const systemer: SystemNode[] = [
  { navn: 'Tripletex', logo: 'tripletex', hoyde: '1.95em' },
  { navn: 'Visma Business NXT', logo: 'visma', hoyde: '0.95em', tillegg: 'Business NXT' },
  { navn: 'Uni Micro', logo: 'unimicro', hoyde: '1.15em' },
  { navn: 'PowerOffice Go', logo: 'poweroffice', hoyde: '0.98em' },
];

// Fra integrasjonsteksten i data/services.ts, pluss rapportene fra «Analyse og rapportering».
// Speilvendt rundt midtaksen. Sidene står litt høyere enn i en vanlig femkant (28° i
// stedet for 18°), så de ikke kolliderer med midtflisen på smale skjermer.
const rundt: KategoriNode[] = [
  { navn: 'CRM', vinkel: 90, icon: 'medarbeidere' },
  { navn: 'Bransjeløsninger', vinkel: 28, icon: 'bransje' },
  { navn: 'Rapporter', vinkel: -50, icon: 'innsikt' },
  { navn: 'Lønnssystem', vinkel: 230, icon: 'lonn-hr' },
  { navn: 'Nettbutikk', vinkel: 152, icon: 'nettbutikk' },
];

function punkt(r: number, vinkel: number) {
  const a = (vinkel * Math.PI) / 180;
  return { x: C.x + r * Math.cos(a), y: C.y - r * Math.sin(a) };
}

const VEKSEL_S = 2.5; // sekunder per logo i midten

const css = `
  .systembane { container-type: inline-size; }
  @container (max-width: 420px) {
    .systembane .sb-ikon { display: none; }
    .systembane .sb-scene { font-size: 10.5px; }
    .systembane .sb-midt { font-size: 0.8em; }
  }
  @container (max-width: 300px) {
    .systembane .sb-scene { font-size: 9px; }
    .systembane .sb-midt { font-size: 0.74em; }
  }
  @keyframes sb-drift { to { stroke-dashoffset: -180; } }
  .systembane .sb-drift { animation: sb-drift 24s linear infinite; }
  @keyframes sb-veksle {
    0% { opacity: 0; transform: translateY(0.25em); }
    4%, 22% { opacity: 1; transform: none; }
    26%, 100% { opacity: 0; transform: translateY(-0.25em); }
  }
  .systembane .sb-logo { opacity: 0; animation: sb-veksle ${VEKSEL_S * systemer.length}s infinite; }
  @media (prefers-reduced-motion: reduce) {
    .systembane .sb-drift { animation: none; }
  }
`;

const pst = (p: { x: number; y: number }) => ({ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` });

export default function SystemBane({ className }: { className?: string }) {
  const noder = rundt.map((n) => ({ ...n, ...punkt(R, n.vinkel) }));
  // To punktum per linje: ett inn mot systemet og ett ut, forskjøvet i tid.
  const baner = noder.flatMap((n, i) => [
    { d: `M ${n.x} ${n.y} L ${C.x} ${C.y}`, start: `${(i * 0.9).toFixed(2)}s` },
    { d: `M ${C.x} ${C.y} L ${n.x} ${n.y}`, start: `${(i * 0.9 + 2.2).toFixed(2)}s` },
  ]);
  const navnene = systemer.map((s) => s.navn);
  const liste = `${navnene.slice(0, -1).join(', ')} eller ${navnene[navnene.length - 1]}`;

  return (
    <figure className={clsx('systembane m-0', className)}>
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
            <circle cx={C.x} cy={C.y} r={150} fill="none" stroke="currentColor" strokeOpacity={0.18} strokeWidth={1.5} />
            <circle
              cx={C.x}
              cy={C.y}
              r={R}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.22}
              strokeWidth={1.5}
              strokeDasharray="2 10"
              strokeLinecap="round"
              className="sb-drift"
            />
            <circle cx={C.x} cy={C.y} r={R + 70} fill="none" stroke="currentColor" strokeOpacity={0.07} strokeWidth={1} />

            {/* Linjene fra systemet ut til det vi kobler til */}
            {noder.map((n) => (
              <line
                key={`l-${n.navn}`}
                x1={n.x}
                y1={n.y}
                x2={C.x}
                y2={C.y}
                stroke="currentColor"
                strokeOpacity={0.25}
                strokeWidth={1.25}
              />
            ))}

            <g className="motion-reduce:hidden">
              {/* Puls rundt midten */}
              <circle cx={C.x} cy={C.y} r={110} fill="none" stroke="currentColor" strokeWidth={1.5}>
                <animate attributeName="r" values="110;165" dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.3;0" dur="2.8s" repeatCount="indefinite" />
              </circle>
              {/* Punktum begge veier: går på 2,2 s, venter resten av runden usynlig. */}
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
          {noder.map((n) => (
            <div
              key={n.navn}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-[0.45em] whitespace-nowrap rounded-pille border border-flyd-mint/35 bg-flyd-skog py-[0.45em] pl-[0.7em] pr-[0.95em] leading-tight text-flyd-dempet"
              style={pst(n)}
            >
              <FlydIcon name={n.icon} className="sb-ikon h-[1.2em] w-[1.2em] flex-shrink-0 text-flyd-mint" />
              {n.navn}
            </div>
          ))}

          {/* Forretningssystemet i midten: ett av fire, logoene veksler */}
          <div
            className="sb-midt absolute -translate-x-1/2 -translate-y-1/2 rounded-kort bg-flyd-sand px-[1.1em] pb-[0.9em] pt-[0.75em] text-flyd-skog shadow-[0_0_0_6px_rgba(139,194,187,0.12)]"
            style={pst(C)}
          >
            <p className="text-center text-[0.7em] font-bold uppercase tracking-[0.12em] text-flyd-skifer">
              Forretningssystemet ditt
            </p>
            <p className="sr-only">{liste}</p>
            {/* Veksler mellom logoene; står stille som rutenett ved redusert bevegelse. */}
            <div aria-hidden="true" className="relative mt-[0.45em] h-[2.1em] w-[10.5em] motion-reduce:hidden">
              {systemer.map((s, i) => (
                <div
                  key={s.navn}
                  className="sb-logo absolute inset-0 flex items-center justify-center gap-[0.4em]"
                  style={{ animationDelay: `${i * VEKSEL_S}s` }}
                >
                  <SystemLogo name={s.logo} label="" className="w-auto flex-shrink-0" style={{ height: s.hoyde }} />
                  {s.tillegg && <span className="text-[0.85em] font-medium text-flyd-petrol">{s.tillegg}</span>}
                </div>
              ))}
            </div>
            <div aria-hidden="true" className="mt-[0.5em] hidden w-[10.5em] grid-cols-2 place-items-center gap-[0.5em] motion-reduce:grid">
              {systemer.map((s) => (
                <SystemLogo
                  key={s.navn}
                  name={s.logo}
                  label=""
                  className="w-auto"
                  style={{ height: `calc(${s.hoyde} * 0.62)` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Én linje som forklarer tegningen, i stedet for tegnforklaring. */}
        <figcaption className="mt-2 px-1 text-[14px] leading-relaxed text-flyd-dempet sm:mt-0">
          Forretningssystemet ditt i midten, koblet til resten av bedriften. Dataene går begge veier, av seg selv.
        </figcaption>
      </div>
    </figure>
  );
}
