import clsx from 'clsx';
import FlydIcon, { type FlydIconName } from '@/components/FlydIcon';
import SystemLogo, { SystemLogoSymboler, type SystemLogoName } from '@/components/SystemLogo';

/**
 * Systembanen: forretningssystemet ditt i midten, og det vi kobler det til
 * rundt. Idé fra «Integrations Orbit Section» (Tailark) på 21st.dev.
 *
 * Midten viser ett system om gangen (Tripletex, Visma Business NXT, Uni Micro
 * eller PowerOffice Go), fordi en bedrift velger ett av dem. Fire prikker under
 * logoen viser at det er ett av fire. Rundt står det vi kobler til, som
 * Flyd-ikoner, fordi det er kategorier og ikke bestemte produkter.
 * Korall-punktum går begge veier langs linjene: dataene flyter inn og ut av
 * systemet av seg selv. Flyd står ikke i tegningen: vi setter opp koblingene,
 * dataene går ikke gjennom oss.
 *
 * Teksten krymper ikke under lesbar størrelse: navnene rundt er minst 13 px
 * (12 px på de smaleste telefonene), etiketten i midten minst 11 px. I
 * stedet for å skalere alt ned byttes tegningen ut med høyere oppstillinger
 * når flaten blir smal: `middels` under 600 px og `liten` under 420 px.
 *
 * Ved prefers-reduced-motion står alt stille: midten viser de fire logoene i et
 * rutenett i stedet for å veksle, og punktumene (SMIL) skjules.
 */

type SystemNode = { navn: string; logo: SystemLogoName; hoyde: string; tillegg?: string };
type Kategori = { navn: string; icon: FlydIconName };
type Punkt = { x: number; y: number };
type Oppstilling = { W: number; H: number; C: Punkt; ringer: number[]; bane: number; noder: (Kategori & Punkt)[] };

// Systemene vi jobber i (erpSystems i data/services.ts). `hoyde` jevner ut logoene,
// så de ser like store ut (formatene er ulike).
const systemer: SystemNode[] = [
  { navn: 'Tripletex', logo: 'tripletex', hoyde: '1.95em' },
  { navn: 'Visma Business NXT', logo: 'visma', hoyde: '0.95em', tillegg: 'Business NXT' },
  { navn: 'Uni Micro', logo: 'unimicro', hoyde: '1.15em' },
  { navn: 'PowerOffice Go', logo: 'poweroffice', hoyde: '0.98em' },
];

// Fra integrasjonsteksten i data/services.ts, pluss rapportene fra «Analyse og rapportering».
const crm: Kategori = { navn: 'CRM', icon: 'medarbeidere' };
const bransje: Kategori = { navn: 'Bransjeløsninger', icon: 'bransje' };
const rapporter: Kategori = { navn: 'Rapporter', icon: 'innsikt' };
const lonn: Kategori = { navn: 'Lønnssystem', icon: 'lonn-hr' };
const nettbutikk: Kategori = { navn: 'Nettbutikk', icon: 'nettbutikk' };

function punkt(c: Punkt, r: number, vinkel: number) {
  const a = (vinkel * Math.PI) / 180;
  return { x: c.x + r * Math.cos(a), y: c.y - r * Math.sin(a) };
}

// Bred flate: på en sirkel, speilvendt rundt midtaksen. Sidene står litt høyere enn i en
// vanlig femkant (28° i stedet for 18°), så de går klar av midtflisen.
const C_STOR = { x: 500, y: 360 };
const stor: Oppstilling = {
  W: 1000,
  H: 720,
  C: C_STOR,
  ringer: [150, 370],
  bane: 300,
  noder: [
    { ...crm, ...punkt(C_STOR, 300, 90) },
    { ...bransje, ...punkt(C_STOR, 300, 28) },
    { ...rapporter, ...punkt(C_STOR, 300, -50) },
    { ...lonn, ...punkt(C_STOR, 300, 230) },
    { ...nettbutikk, ...punkt(C_STOR, 300, 152) },
  ],
};

// Middels flate (smal spalte, nettbrett, 420–600 px): høyere enn den brede, så sidene går
// klar av midtflisen og linjene synes. Plassert for hånd.
const middels: Oppstilling = {
  W: 1000,
  H: 900,
  C: { x: 500, y: 470 },
  ringer: [170, 470],
  bane: 390,
  noder: [
    { ...crm, x: 500, y: 90 },
    { ...nettbutikk, x: 230, y: 270 },
    { ...bransje, x: 770, y: 270 },
    { ...lonn, x: 260, y: 760 },
    { ...rapporter, x: 740, y: 760 },
  ],
};

// Smal flate (telefon): høyere, med to og to på hver side. Plassert for hånd, så
// «Bransjeløsninger» får plass også på 320 px brede skjermer.
const liten: Oppstilling = {
  W: 1000,
  H: 1080,
  C: { x: 500, y: 600 },
  ringer: [200, 520],
  bane: 450,
  noder: [
    { ...crm, x: 500, y: 150 },
    { ...nettbutikk, x: 250, y: 360 },
    { ...bransje, x: 750, y: 360 },
    { ...lonn, x: 250, y: 900 },
    { ...rapporter, x: 750, y: 900 },
  ],
};

const VEKSEL_S = 2.5; // sekunder per logo i midten
const RUNDE_S = VEKSEL_S * systemer.length;

const css = `
  .systembane { container-type: inline-size; }
  .systembane .sb-middels, .systembane .sb-liten { display: none; }
  @container (max-width: 600px) {
    .systembane .sb-stor { display: none; }
    .systembane .sb-middels { display: block; }
  }
  @container (max-width: 420px) {
    .systembane .sb-middels { display: none; }
    .systembane .sb-liten { display: block; }
  }
  @container (max-width: 300px) {
    .systembane .sb-liten { font-size: 12px; }
  }
  @keyframes sb-drift { to { stroke-dashoffset: -180; } }
  .systembane .sb-drift { animation: sb-drift 24s linear infinite; }
  @keyframes sb-veksle {
    0% { opacity: 0; transform: translateY(0.25em); }
    4%, 22% { opacity: 1; transform: none; }
    26%, 100% { opacity: 0; transform: translateY(-0.25em); }
  }
  .systembane .sb-logo { opacity: 0; animation: sb-veksle ${RUNDE_S}s infinite; }
  @keyframes sb-prikk {
    0%, 23% { background-color: var(--flyd-petrol); width: 16px; }
    27%, 100% { background-color: #C9DCD7; width: 6px; }
  }
  .systembane .sb-prikk { animation: sb-prikk ${RUNDE_S}s infinite; }
  @media (prefers-reduced-motion: reduce) {
    .systembane .sb-drift { animation: none; }
  }
`;

const pst = (o: Oppstilling, p: Punkt) => ({ left: `${(p.x / o.W) * 100}%`, top: `${(p.y / o.H) * 100}%` });

function Midten({ liste }: { liste: string }) {
  return (
    <>
      <p className="text-center text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-flyd-skifer">
        Ditt system
      </p>
      <p className="sr-only">{liste}</p>
      {/* Veksler mellom logoene; står stille som rutenett ved redusert bevegelse. */}
      <div aria-hidden="true" className="relative mt-[0.55em] h-[2.1em] w-[10.5em] motion-reduce:hidden">
        {systemer.map((s, i) => (
          <div
            key={s.navn}
            className="sb-logo absolute inset-0 flex items-center justify-center gap-[0.4em]"
            style={{ animationDelay: `${i * VEKSEL_S}s` }}
          >
            <SystemLogo name={s.logo} label="" delt className="w-auto flex-shrink-0" style={{ height: s.hoyde }} />
            {s.tillegg && <span className="text-[0.85em] font-medium text-flyd-petrol">{s.tillegg}</span>}
          </div>
        ))}
      </div>
      {/* Prikkene viser at det er ett av fire, og hvilket som vises nå. */}
      <div aria-hidden="true" className="mt-[0.5em] flex justify-center gap-[5px] motion-reduce:hidden">
        {systemer.map((s, i) => (
          <span
            key={s.navn}
            className="sb-prikk block h-[6px] w-[6px] rounded-pille bg-flyd-linje-mint"
            style={{ animationDelay: `${i * VEKSEL_S}s` }}
          />
        ))}
      </div>
      <div aria-hidden="true" className="mt-[0.5em] hidden w-[10.5em] grid-cols-2 place-items-center gap-[0.5em] motion-reduce:grid">
        {systemer.map((s) => (
          <SystemLogo key={s.navn} name={s.logo} label="" delt className="w-auto" style={{ height: `calc(${s.hoyde} * 0.62)` }} />
        ))}
      </div>
    </>
  );
}

function Scene({ o, liste, className }: { o: Oppstilling; liste: string; className: string }) {
  // To punktum per linje: ett inn mot systemet og ett ut, forskjøvet i tid.
  const baner = o.noder.flatMap((n, i) => [
    { d: `M ${n.x} ${n.y} L ${o.C.x} ${o.C.y}`, start: `${(i * 0.9).toFixed(2)}s` },
    { d: `M ${o.C.x} ${o.C.y} L ${n.x} ${n.y}`, start: `${(i * 0.9 + 2.2).toFixed(2)}s` },
  ]);
  return (
    <div className={clsx('relative mx-auto w-full', className)} style={{ aspectRatio: `${o.W} / ${o.H}` }}>
      <svg
        viewBox={`0 0 ${o.W} ${o.H}`}
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full text-flyd-mint"
      >
        {/* Ringene */}
        <circle cx={o.C.x} cy={o.C.y} r={o.ringer[0]} fill="none" stroke="currentColor" strokeOpacity={0.18} strokeWidth={1.5} />
        <circle
          cx={o.C.x}
          cy={o.C.y}
          r={o.bane}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.22}
          strokeWidth={1.5}
          strokeDasharray="2 10"
          strokeLinecap="round"
          className="sb-drift"
        />
        <circle cx={o.C.x} cy={o.C.y} r={o.ringer[1]} fill="none" stroke="currentColor" strokeOpacity={0.07} strokeWidth={1} />

        {/* Linjene fra systemet ut til det vi kobler til */}
        {o.noder.map((n) => (
          <line
            key={`l-${n.navn}`}
            x1={n.x}
            y1={n.y}
            x2={o.C.x}
            y2={o.C.y}
            stroke="currentColor"
            strokeOpacity={0.25}
            strokeWidth={1.25}
          />
        ))}

        <g className="motion-reduce:hidden">
          {/* Puls rundt midten */}
          <circle cx={o.C.x} cy={o.C.y} r={110} fill="none" stroke="currentColor" strokeWidth={1.5}>
            <animate attributeName="r" values="110;175" dur="2.8s" repeatCount="indefinite" />
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
      {o.noder.map((n) => (
        <div
          key={n.navn}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-[0.45em] whitespace-nowrap rounded-pille border border-flyd-mint/35 bg-flyd-skog py-[0.45em] pl-[0.75em] pr-[0.95em] leading-tight text-flyd-dempet"
          style={pst(o, n)}
        >
          <FlydIcon name={n.icon} className="sb-ikon h-[1.2em] w-[1.2em] flex-shrink-0 text-flyd-mint" />
          {n.navn}
        </div>
      ))}

      {/* Forretningssystemet i midten: ett av fire, logoene veksler */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-kort bg-flyd-sand px-[1em] pb-[0.8em] pt-[0.8em] text-flyd-skog shadow-[0_0_0_6px_rgba(139,194,187,0.12)]"
        style={pst(o, o.C)}
      >
        <Midten liste={liste} />
      </div>
    </div>
  );
}

export default function SystemBane({ className }: { className?: string }) {
  const navnene = systemer.map((s) => s.navn);
  const liste = `${navnene.slice(0, -1).join(', ')} eller ${navnene[navnene.length - 1]}`;

  return (
    <figure className={clsx('systembane m-0', className)}>
      {/* dangerouslySetInnerHTML: ellers escapes tegnene ulikt på server og klient (hydreringsfeil). */}
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {/* Logoene én gang; de tre oppstillingene peker hit (se SystemLogoSymboler). */}
      <SystemLogoSymboler />
      <div className="on-dark relative overflow-hidden rounded-bilde bg-flyd-skog p-3 sm:p-6">
        <Scene o={stor} liste={liste} className="sb-stor max-w-[1000px] text-[clamp(13px,1.6cqw,15px)]" />
        <Scene o={middels} liste={liste} className="sb-middels text-[13px]" />
        {/* Ikonene på ringen tar for mye plass på telefon. */}
        <Scene o={liten} liste={liste} className="sb-liten text-[13px] [&_.sb-ikon]:hidden" />

        {/* Én linje som forklarer tegningen, i stedet for tegnforklaring. */}
        <figcaption className="mt-3 px-1 text-[15px] leading-relaxed text-flyd-dempet">
          Forretningssystemet ditt i midten, koblet til resten av bedriften. Dataene går begge veier, av seg selv.
        </figcaption>
      </div>
    </figure>
  );
}
