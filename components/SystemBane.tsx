import clsx from 'clsx';
import FlydIcon, { type FlydIconName } from '@/components/FlydIcon';
import SystemLogo, { SystemLogoSymboler, type SystemLogoName } from '@/components/SystemLogo';

/**
 * Systembanen: forretningssystemet ditt i midten, og det vi kobler det til
 * rundt. Idé fra «Integrations Orbit Section» (Tailark) på 21st.dev, tegnet om
 * som et koblingsskjema (nov. 2026): ringene er borte, og hver kobling er en
 * linje i Flyd-teal som går inn i systemflisen.
 *
 * Midten viser ett system om gangen (Tripletex, Visma Business NXT, Uni Micro
 * eller PowerOffice Go), fordi en bedrift velger ett av dem. Fire prikker under
 * logoen viser at det er ett av fire. Rundt står det vi kobler til, som
 * Flyd-ikoner på Petrol-brikker, fordi det er kategorier og ikke bestemte
 * produkter. Brikkene har flisradius, ikke pilleform: piller er knapper, og
 * disse kan ikke trykkes på. Korall-punktum går begge veier langs linjene:
 * dataene flyter inn og ut av systemet av seg selv. Flyd står ikke i tegningen:
 * vi setter opp koblingene, dataene går ikke gjennom oss.
 *
 * Tre over og to under i alle størrelser, i tre oppstillinger som velges etter
 * bredden på flaten (container queries):
 * - `stor` (fra 520 px): brikkene står i to spalter med «Bransjeløsninger»
 *   midt over, og linjene fra hjørnene går i en myk bue inn i flisen.
 * - `middels` (400–519 px) og `liten` (under 400 px): flisen er en bred bjelke,
 *   og alle linjene går rett ned eller opp i den. «Bransjeløsninger» står en
 *   rad over de andre, så det lange navnet får plass.
 * Linjene tegnes helt inn til midten av brikkene og flisen, som ligger oppå, så
 * de møter kantene uansett hvor stor teksten er.
 *
 * Teksten krymper ikke under lesbar størrelse: navnene rundt er minst 13 px
 * (12 px på de smaleste telefonene), etiketten i midten 11 px. Derfor byttes
 * oppstillingen i stedet for at alt skaleres ned.
 *
 * Ved prefers-reduced-motion står alt stille: midten viser de fire logoene i et
 * rutenett i stedet for å veksle, og punktumene (SMIL) skjules.
 */

type SystemNode = { navn: string; logo: SystemLogoName; hoyde: string; tillegg?: string };
type Kategori = { navn: string; icon: FlydIconName };
type Punkt = { x: number; y: number };
/** `d` er linjen fra kategorien inn til systemet; `synlig` er den delen av den som ikke ligger under en brikke eller flisen. */
type Kobling = Kategori & Punkt & { d: string; synlig: [number, number] };
type Oppstilling = {
  W: number;
  H: number;
  C: Punkt;
  /** Bredden på systemflisen i prosent av tegningen. Uten den følger flisen innholdet. */
  flis?: number;
  /** Skriftstørrelsen i flisen, når den skal være større enn navnene rundt. */
  flisSkrift?: string;
  /** Størrelsen på punktumene i tegningens enheter (ca. 6 px på skjerm). */
  prikk: number;
  koblinger: Kobling[];
};

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

/** Rett linje fra kategorien loddrett inn i systemet. */
function rett(k: Kategori, x: number, y: number, c: Punkt, synlig: [number, number]): Kobling {
  return { ...k, x, y, d: `M ${x} ${y} L ${x} ${c.y}`, synlig };
}

// Buene har et rett stykke i hver ende, så selve svingen ligger mellom brikken og flisen i
// alle størrelser: UT er lengre enn en halv brikke, INN lengre enn en halv flis.
const UT = 42;
const INN = 112;

/** Myk bue: loddrett ut av brikken, en S bort til plassen sin på flisen (`port` fra midten), og loddrett inn. */
function bue(k: Kategori, x: number, y: number, c: Punkt, port: number, synlig: [number, number]): Kobling {
  const retning = y < c.y ? 1 : -1;
  const y1 = y + retning * UT;
  const y2 = c.y - retning * INN;
  const midt = (y1 + y2) / 2;
  const px = c.x + port;
  return {
    ...k,
    x,
    y,
    d: `M ${x} ${y} L ${x} ${y1} C ${x} ${midt} ${px} ${midt} ${px} ${y2} L ${px} ${c.y}`,
    synlig,
  };
}

// Bred flate: tre over og to under, i to spalter. «Bransjeløsninger» (det lengste navnet)
// står i midten. Buene fra hjørnene går inn i flisen på hver sin side av midtlinjen.
// Flisen har litt større skrift enn brikkene, så systemet er det største i tegningen.
const C_STOR = { x: 500, y: 326 };
const stor: Oppstilling = {
  W: 1000,
  H: 652,
  C: C_STOR,
  flisSkrift: '1.15em',
  prikk: 11,
  koblinger: [
    rett(bransje, 500, 46, C_STOR, [0.07, 0.78]),
    bue(nettbutikk, 150, 46, C_STOR, -80, [0.05, 0.86]),
    bue(crm, 850, 46, C_STOR, 80, [0.05, 0.86]),
    bue(lonn, 150, 606, C_STOR, -80, [0.05, 0.86]),
    bue(rapporter, 850, 606, C_STOR, 80, [0.05, 0.86]),
  ],
};

// Smalere flate (smal spalte, stor telefon): flisen er en bred bjelke, og linjene går rett
// inn i den. Brikkene står midt på hver sin linje.
const C_MIDDELS = { x: 500, y: 370 };
const middels: Oppstilling = {
  W: 1000,
  H: 650,
  C: C_MIDDELS,
  flis: 60,
  prikk: 15,
  koblinger: [
    rett(bransje, 500, 54, C_MIDDELS, [0.1, 0.7]),
    rett(nettbutikk, 270, 158, C_MIDDELS, [0.14, 0.56]),
    rett(crm, 730, 158, C_MIDDELS, [0.14, 0.56]),
    rett(lonn, 270, 582, C_MIDDELS, [0.14, 0.56]),
    rett(rapporter, 730, 582, C_MIDDELS, [0.14, 0.56]),
  ],
};

// Telefon: samme oppstilling, høyere, så linjene synes også på 320 px brede skjermer.
const C_LITEN = { x: 500, y: 540 };
const liten: Oppstilling = {
  W: 1000,
  H: 940,
  C: C_LITEN,
  flis: 70,
  prikk: 21,
  koblinger: [
    rett(bransje, 500, 70, C_LITEN, [0.08, 0.74]),
    rett(nettbutikk, 250, 215, C_LITEN, [0.12, 0.62]),
    rett(crm, 750, 215, C_LITEN, [0.12, 0.62]),
    rett(lonn, 250, 865, C_LITEN, [0.12, 0.62]),
    rett(rapporter, 750, 865, C_LITEN, [0.12, 0.62]),
  ],
};

const VEKSEL_S = 2.5; // sekunder per logo i midten
const RUNDE_S = VEKSEL_S * systemer.length;
const FLYT_S = 6.4; // én runde for et punktum: går i 2,6 s, venter resten usynlig

const css = `
  .systembane { container-type: inline-size; }
  .systembane .sb-middels, .systembane .sb-liten { display: none; }
  @container (max-width: 519px) {
    .systembane .sb-stor { display: none; }
    .systembane .sb-middels { display: block; }
  }
  @container (max-width: 399px) {
    .systembane .sb-middels { display: none; }
    .systembane .sb-liten { display: block; }
  }
  @container (max-width: 300px) {
    .systembane .sb-liten { font-size: 12px; }
    .systembane .sb-liten .sb-ikon { display: none; }
  }
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
`;

const pst = (o: Oppstilling, p: Punkt) => ({ left: `${(p.x / o.W) * 100}%`, top: `${(p.y / o.H) * 100}%` });

function Midten({ liste }: { liste: string }) {
  return (
    <>
      <p className="flex items-center justify-center gap-[0.6em] text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-flyd-skog">
        <span aria-hidden="true" className="block h-[6px] w-[6px] flex-shrink-0 rounded-[1.5px] bg-flyd-korall" />
        Ditt system
      </p>
      <p className="sr-only">{liste}</p>
      {/* Veksler mellom logoene; står stille som rutenett ved redusert bevegelse. */}
      <div aria-hidden="true" className="relative mx-auto mt-[0.6em] h-[2.1em] w-[10.5em] motion-reduce:hidden">
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
      <div
        aria-hidden="true"
        className="mx-auto mt-[0.6em] hidden w-[10.5em] grid-cols-2 place-items-center gap-[0.5em] motion-reduce:grid"
      >
        {systemer.map((s) => (
          <SystemLogo key={s.navn} name={s.logo} label="" delt className="w-auto" style={{ height: `calc(${s.hoyde} * 0.62)` }} />
        ))}
      </div>
    </>
  );
}

function Scene({ o, liste, className }: { o: Oppstilling; liste: string; className: string }) {
  // To punktum per linje: ett inn mot systemet og ett ut, forskjøvet i tid.
  const flyt = o.koblinger.flatMap((k, i) => {
    const [a, b] = k.synlig;
    return [
      { d: k.d, punkter: `${a};${b};${b}`, start: `${(i * 1.25).toFixed(2)}s` },
      { d: k.d, punkter: `${b};${a};${a}`, start: `${(i * 1.25 + FLYT_S / 2).toFixed(2)}s` },
    ];
  });
  return (
    <div className={clsx('relative mx-auto w-full', className)} style={{ aspectRatio: `${o.W} / ${o.H}` }}>
      {/* Petrol-lys bak systemet, så midten løfter seg fra flaten. */}
      <div
        aria-hidden="true"
        className="absolute aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ ...pst(o, o.C), background: 'radial-gradient(closest-side, rgba(36,73,75,0.75), rgba(36,73,75,0))' }}
      />
      <svg viewBox={`0 0 ${o.W} ${o.H}`} aria-hidden="true" focusable="false" className="absolute inset-0 h-full w-full">
        {/* Koblingene: flytlinjer i Flyd-teal, like tykke i alle størrelser */}
        {o.koblinger.map((k) => (
          <path
            key={k.navn}
            d={k.d}
            fill="none"
            className="stroke-flyd-teal"
            strokeWidth={1.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Punktum begge veier: går i 2,6 s, venter resten av runden usynlig. */}
        <g className="motion-reduce:hidden">
          {flyt.map((f, i) => (
            <rect
              key={i}
              x={-o.prikk / 2}
              y={-o.prikk / 2}
              width={o.prikk}
              height={o.prikk}
              rx={o.prikk * 0.22}
              className="fill-flyd-korall"
              opacity={0}
            >
              <animateMotion
                path={f.d}
                dur={`${FLYT_S}s`}
                begin={f.start}
                repeatCount="indefinite"
                keyPoints={f.punkter}
                keyTimes="0;0.4;1"
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0;0"
                keyTimes="0;0.05;0.35;0.4;1"
                dur={`${FLYT_S}s`}
                begin={f.start}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </g>
      </svg>

      {/* Det vi kobler til: Flyd-ikon og navn på Petrol-brikke */}
      {o.koblinger.map((k) => (
        <div
          key={k.navn}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-[0.45em] whitespace-nowrap rounded-flis bg-flyd-petrol py-[0.55em] pl-[0.8em] pr-[1em] leading-tight text-flyd-sand ring-1 ring-inset ring-flyd-teal/70"
          style={pst(o, k)}
        >
          <FlydIcon name={k.icon} className="sb-ikon h-[1.2em] w-[1.2em] flex-shrink-0 text-flyd-mint" />
          {k.navn}
        </div>
      ))}

      {/* Forretningssystemet i midten: ett av fire, logoene veksler */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-kort bg-flyd-sand px-[1em] py-[0.85em] text-flyd-skog shadow-[0_0_0_6px_rgba(139,194,187,0.16)]"
        style={{ ...pst(o, o.C), ...(o.flis ? { width: `${o.flis}%` } : {}), fontSize: o.flisSkrift }}
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
        <Scene o={stor} liste={liste} className="sb-stor max-w-[1000px] text-[clamp(13px,2.2cqw,15px)]" />
        <Scene o={middels} liste={liste} className="sb-middels text-[13px]" />
        <Scene o={liten} liste={liste} className="sb-liten text-[13px]" />

        {/* Én linje som forklarer tegningen, i stedet for tegnforklaring. */}
        <figcaption className="mt-3 px-1 text-[15px] leading-relaxed text-flyd-dempet">
          Forretningssystemet ditt i midten, koblet til resten av bedriften. Dataene går begge veier, av seg selv.
        </figcaption>
      </div>
    </figure>
  );
}
