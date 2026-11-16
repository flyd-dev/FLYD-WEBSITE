import clsx from 'clsx';
import FlydIcon, { type FlydIconName } from '@/components/FlydIcon';
import SystemLogo, { SystemLogoSymboler, type SystemLogoName } from '@/components/SystemLogo';

/**
 * Systembanen: forretningssystemet ditt i midten, og det vi kobler til det.
 * Tredje utgave (nov. 2026), bygget som en tavle av brikker i stedet for en
 * tegning: brikkene fyller flaten, og hver av dem sier hva som går mellom den
 * og systemet. Første utgave hadde ringer rundt en flis («Integrations Orbit
 * Section» fra 21st.dev), den andre var et koblingsskjema med buer. Begge var
 * mest luft, og de sa bare hva systemet var koblet til – ikke hva som flyter.
 *
 * - Systemet viser ett system om gangen (Tripletex, Visma Business NXT, Uni
 *   Micro eller PowerOffice Go), fordi en bedrift velger ett av dem. Fire
 *   prikker viser at det er ett av fire.
 * - Fire brikker er koblet til: nettbutikk, CRM, lønnssystem og
 *   bransjeløsninger. Det er kategorier, ikke bestemte produkter, så de har
 *   Flyd-ikoner og ikke logoer. De har flisradius, ikke pilleform: piller er
 *   knapper, og disse kan ikke trykkes på.
 * - Rapportene står under, som det du sitter igjen med. Linjen dit har pil:
 *   tallene går én vei.
 * - Flyd står ikke i tegningen: vi setter opp koblingene, dataene går ikke
 *   gjennom oss.
 *
 * Bevegelsen er én hendelse om gangen: et Korall-punktum går fra en brikke inn
 * i systemet, og så videre til en annen brikke og til rapportene. Det er
 * poenget med integrasjoner – det som skjer ett sted, kommer fram de andre
 * stedene av seg selv. Alt er CSS (ingen JS). Ved prefers-reduced-motion er
 * punktumene borte, og systemet viser de fire logoene samtidig.
 *
 * Tavlen er et vanlig rutenett, ikke en tegning som skaleres: teksten har samme
 * størrelse på alle skjermer, og brikkene følger bredden.
 * - Smal flate (under 540 px): systemet er en skinne tvers over, med to
 *   brikker over og to under. Linjen til rapportene går mellom de to nederste.
 * - Bred flate: systemet er en høy flis i midten, med to brikker på hver side.
 * Innholdet i en brikke står ved siden av ikonet når brikken er bred nok,
 * ellers under. På de smaleste telefonene (flate under 300 px) er ikonflisene
 * borte, så teksten får plassen.
 */

type SystemNode = { navn: string; logo: SystemLogoName; hoyde: string; tillegg?: string };
type Plass = 'a' | 'b' | 'c' | 'd';
type Brikke = { plass: Plass; navn: string; tekst: string; icon: FlydIconName; inn: number; ut: number };

// Systemene vi jobber i (erpSystems i data/services.ts). `hoyde` jevner ut logoene,
// så de ser like store ut (formatene er ulike).
const systemer: SystemNode[] = [
  { navn: 'Tripletex', logo: 'tripletex', hoyde: '1.95em' },
  { navn: 'Visma Business NXT', logo: 'visma', hoyde: '0.95em', tillegg: 'Business NXT' },
  { navn: 'Uni Micro', logo: 'unimicro', hoyde: '1.15em' },
  { navn: 'PowerOffice Go', logo: 'poweroffice', hoyde: '0.98em' },
];

const RUNDE_S = 12; // fire hendelser på tre sekunder hver
const REISE_S = 0.9; // så lenge er et punktum underveis mellom brikke og system

/**
 * Det vi kobler til, fra integrasjonsteksten i data/services.ts. Undertekstene bruker ordene
 * nettstedet selv bruker («timeføring eller lager» i spørsmål og svar, feriepenger fra Lønn og HR).
 * `inn` og `ut` er når brikken sender og mottar i runden (sekunder):
 * 0 s nettbutikk → system → CRM, 3 s bransjeløsning → system → lønn, 6 s CRM → system → nettbutikk,
 * 9 s lønn → system → bransjeløsning. Hver hendelse går også videre til rapportene.
 */
const brikker: Brikke[] = [
  { plass: 'a', navn: 'Nettbutikk', tekst: 'Ordre og betalinger', icon: 'nettbutikk', inn: 0, ut: 7.2 },
  { plass: 'b', navn: 'CRM', tekst: 'Kunder og salg', icon: 'medarbeidere', inn: 6, ut: 1.2 },
  { plass: 'c', navn: 'Lønnssystem', tekst: 'Lønn og feriepenger', icon: 'lonn-hr', inn: 9, ut: 4.2 },
  // Myk bindestrek: navnet deler seg bare hvis brikken er for smal (320 px-skjermer).
  { plass: 'd', navn: 'Bransje­løsninger', tekst: 'Timeføring og lager', icon: 'bransje', inn: 3, ut: 10.2 },
];

const VEKSEL_S = 2.5; // sekunder per logo i systemet
const LOGORUNDE_S = VEKSEL_S * systemer.length;
const reise = ((REISE_S / RUNDE_S) * 100).toFixed(2); // prosent av runden

const css = `
  .systembane { container: sb-flate / inline-size; }

  /* Smal flate: brikker, kobling, skinne, kobling, brikker, kobling, rapporter. */
  .sb-tavle {
    --kobling: 22px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    /* 1fr på brikkeradene: de blir like høye, også når en undertekst går over to linjer. */
    grid-template-rows: 1fr var(--kobling) auto var(--kobling) 1fr var(--kobling) auto;
    column-gap: 14px;
    grid-template-areas: "a b" "ka kb" "s s" "kc kd" "c d" ". ." "r r";
  }
  .sb-a { grid-area: a; } .sb-b { grid-area: b; } .sb-c { grid-area: c; } .sb-d { grid-area: d; }
  .sb-ka { grid-area: ka; } .sb-kb { grid-area: kb; } .sb-kc { grid-area: kc; } .sb-kd { grid-area: kd; }
  .sb-system { grid-area: s; }
  .sb-resultat { grid-area: r; }
  /* Linjen til rapportene går mellom de to nederste brikkene. */
  .sb-kr { grid-column: 1 / -1; grid-row: 4 / 7; }

  .sb-brikke, .sb-system, .sb-resultat { position: relative; z-index: 1; }
  .sb-brikke { container: sb-brikke / inline-size; padding: 10px; }

  /* Koblingene ligger under brikkene og systemet, så punktumene kommer fram fra kanten og går inn under den neste. */
  .sb-kobling { position: relative; z-index: 0; justify-self: center; width: 7px; }
  .sb-kobling::before {
    content: ""; position: absolute; top: 0; bottom: 0; left: 50%;
    width: 1.5px; margin-left: -0.75px; background: var(--flyd-teal);
  }
  /* Pil inn mot rapportene: tallene går én vei. */
  .sb-kr::after {
    content: ""; position: absolute; left: 50%; bottom: 1px;
    width: 7px; height: 7px; margin-left: -3.5px;
    border-right: 1.5px solid var(--flyd-teal); border-bottom: 1.5px solid var(--flyd-teal);
    transform: rotate(45deg);
  }

  /* Et spor er like langt som koblingen og bærer ett punktum, som står i den enden det skal til.
     Sporet starter en hel lengde unna (--fra) og glir på plass, så punktumet går fra kant til kant
     uansett hvor lang koblingen er. */
  .sb-spor { position: absolute; left: 0; right: 0; top: -8px; bottom: -8px; opacity: 0; }
  .sb-spor > span {
    position: absolute; top: var(--t, auto); bottom: var(--b, auto); left: var(--l, 0); right: var(--r, auto);
    width: 7px; height: 7px; border-radius: 1.5px; background: var(--flyd-korall);
  }
  @keyframes sb-reise {
    0% { transform: var(--fra); opacity: 1; }
    ${reise}% { transform: none; opacity: 1; }
    ${reise}1%, 100% { transform: none; opacity: 0; }
  }
  /* Til rapportene: hvert tredje sekund, litt langsommere fordi veien er lengre. */
  @keyframes sb-rapport {
    0% { transform: translateY(-100%); opacity: 1; }
    42% { transform: none; opacity: 1; }
    42.01%, 100% { transform: none; opacity: 0; }
  }
  .sb-inn { animation: sb-reise ${RUNDE_S}s cubic-bezier(0.45, 0, 0.3, 1) var(--inn) infinite; }
  .sb-ut { animation: sb-reise ${RUNDE_S}s cubic-bezier(0.45, 0, 0.3, 1) var(--ut) infinite; }
  .sb-kr .sb-spor { --b: 0; animation: sb-rapport ${RUNDE_S / 4}s cubic-bezier(0.45, 0, 0.3, 1) 1.2s infinite; }
  /* Brikken over systemet sender nedover og mottar oppover; under er det omvendt. */
  .sb-over .sb-inn, .sb-under .sb-ut { --fra: translateY(-100%); --b: 0; }
  .sb-over .sb-ut, .sb-under .sb-inn { --fra: translateY(100%); --t: 0; }

  /* Innholdet i en brikke: under ikonet når brikken er smal, ved siden av når den er bred.
     Breddene gjelder innsiden av brikken (uten luften på hver side). */
  .sb-innhold { display: flex; flex-direction: column; align-items: flex-start; gap: 7px; }
  .sb-ikonflis { width: 30px; height: 30px; }
  .sb-navn { font-size: 14px; }
  .sb-tekst { font-size: 12.5px; }
  @container sb-brikke (min-width: 124px) {
    .sb-navn { font-size: 15px; }
    .sb-tekst { font-size: 13px; }
  }
  @container sb-brikke (min-width: 166px) {
    .sb-innhold { flex-direction: row; align-items: center; gap: 10px; }
    .sb-ikonflis { width: 34px; height: 34px; }
  }

  /* Systemet: en bred skinne på smal flate. */
  .sb-system { display: grid; justify-items: center; align-content: center; row-gap: 0.6em; padding: 11px 14px; font-size: 14px; }

  /* Bred flate: systemet er en høy flis i midten, med to brikker på hver side og rapportene under. */
  @container sb-flate (min-width: 540px) {
    .sb-tavle {
      --kobling: 20px;
      column-gap: 0;
      grid-template-columns: minmax(0, 1fr) var(--kobling) minmax(11.25rem, 1.2fr) var(--kobling) minmax(0, 1fr);
      grid-template-rows: 1fr 14px 1fr var(--kobling) auto;
      grid-template-areas:
        "a ka s kb b"
        ". .  s .  ."
        "c kc s kd d"
        ". .  kr . ."
        "r r  r r  r";
    }
    .sb-kr { grid-area: kr; }
    .sb-resultat { justify-self: center; width: min(100%, 21rem); }
    .sb-system { padding: 16px 14px; font-size: clamp(14px, 2.4cqw, 16px); }

    /* Koblingene til sidene går vannrett. */
    .sb-side { justify-self: stretch; align-self: center; width: auto; height: 7px; }
    .sb-side::before { top: 50%; bottom: auto; left: 0; right: 0; width: auto; height: 1.5px; margin: -0.75px 0 0; }
    .sb-side .sb-spor { top: 0; bottom: 0; left: -8px; right: -8px; }
    .sb-venstre .sb-inn, .sb-hoyre .sb-ut { --fra: translateX(-100%); --t: 0; --b: auto; --l: auto; --r: 0; }
    .sb-venstre .sb-ut, .sb-hoyre .sb-inn { --fra: translateX(100%); --t: 0; --b: auto; --l: 0; --r: auto; }
  }

  @container sb-flate (min-width: 620px) {
    .sb-tavle { --kobling: 30px; }
  }
  /* De smaleste telefonene: uten ikonfliser, så teksten får plassen. */
  @container sb-flate (max-width: 300px) {
    .sb-tavle { column-gap: 8px; }
    .sb-brikke { padding: 8px; }
    .sb-ikonflis { display: none; }
    .sb-navn { font-size: 13px; }
    .sb-tekst { font-size: 12px; }
  }

  @keyframes sb-veksle {
    0% { opacity: 0; transform: translateY(0.25em); }
    4%, 22% { opacity: 1; transform: none; }
    26%, 100% { opacity: 0; transform: translateY(-0.25em); }
  }
  .systembane .sb-logo { opacity: 0; animation: sb-veksle ${LOGORUNDE_S}s infinite; }
  @keyframes sb-prikk {
    0%, 23% { background-color: var(--flyd-petrol); width: 16px; }
    27%, 100% { background-color: #C9DCD7; width: 6px; }
  }
  .systembane .sb-prikk { animation: sb-prikk ${LOGORUNDE_S}s infinite; }

  @media (prefers-reduced-motion: reduce) {
    .sb-spor { display: none; }
  }
`;

const brikkeFlate = 'rounded-flis bg-flyd-petrol text-flyd-sand ring-1 ring-inset ring-flyd-teal/70';

function Innhold({ icon, navn, tekst }: { icon: FlydIconName; navn: string; tekst: string }) {
  return (
    <>
      <span className="sb-ikonflis flex flex-shrink-0 items-center justify-center rounded-[9px] bg-flyd-sand/10">
        <FlydIcon name={icon} className="h-5 w-5 text-flyd-mint" />
      </span>
      <span className="min-w-0">
        <span className="sb-navn block font-medium leading-tight">{navn}</span>
        <span className="sb-tekst mt-0.5 block leading-snug text-flyd-dempet">{tekst}</span>
      </span>
    </>
  );
}

/** Linjen mellom en brikke og systemet, med ett punktum hver vei. */
function Kobling({ b }: { b: Brikke }) {
  const over = b.plass === 'a' || b.plass === 'b';
  const venstre = b.plass === 'a' || b.plass === 'c';
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'sb-kobling sb-side',
        `sb-k${b.plass}`,
        over ? 'sb-over' : 'sb-under',
        venstre ? 'sb-venstre' : 'sb-hoyre',
      )}
      style={{ '--inn': `${b.inn}s`, '--ut': `${b.ut}s` } as React.CSSProperties}
    >
      <span className="sb-spor sb-inn">
        <span />
      </span>
      <span className="sb-spor sb-ut">
        <span />
      </span>
    </div>
  );
}

function System({ liste }: { liste: string }) {
  return (
    <div className="sb-system rounded-kort bg-flyd-sand text-flyd-skog shadow-[0_0_0_6px_rgba(139,194,187,0.16)]">
      <p className="flex items-center gap-[0.6em] text-[11px] font-bold uppercase leading-none tracking-[0.12em]">
        <span aria-hidden="true" className="block h-[6px] w-[6px] flex-shrink-0 rounded-[1.5px] bg-flyd-korall" />
        Ditt system
      </p>
      <p className="sr-only">{liste}</p>
      {/* Veksler mellom logoene; ved redusert bevegelse vises alle fire samtidig. */}
      <div aria-hidden="true" className="relative h-[2.1em] w-[10.5em] motion-reduce:hidden">
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
      <div aria-hidden="true" className="flex justify-center gap-[5px] motion-reduce:hidden">
        {systemer.map((s, i) => (
          <span
            key={s.navn}
            className="sb-prikk block h-[6px] w-[6px] rounded-pille bg-flyd-linje-mint"
            style={{ animationDelay: `${i * VEKSEL_S}s` }}
          />
        ))}
      </div>
      <div aria-hidden="true" className="hidden w-[10.5em] grid-cols-2 place-items-center gap-[0.5em] motion-reduce:grid">
        {systemer.map((s) => (
          <SystemLogo key={s.navn} name={s.logo} label="" delt className="w-auto" style={{ height: `calc(${s.hoyde} * 0.62)` }} />
        ))}
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
      {/* Logoene én gang; systemflisen peker hit (se SystemLogoSymboler). */}
      <SystemLogoSymboler />
      <div className="on-dark rounded-bilde bg-flyd-skog p-3 sm:p-6">
        <div className="sb-tavle">
          {/* Systemet står først i dokumentet, så skjermlesere får det først. Plassen styres av rutenettet. */}
          <System liste={liste} />

          {brikker.map((b) => (
            <div key={b.plass} className={clsx('sb-brikke', `sb-${b.plass}`, brikkeFlate)}>
              <div className="sb-innhold">
                <Innhold icon={b.icon} navn={b.navn} tekst={b.tekst} />
              </div>
            </div>
          ))}
          {brikker.map((b) => (
            <Kobling key={b.plass} b={b} />
          ))}

          {/* Til rapportene går det bare én vei. */}
          <div aria-hidden="true" className="sb-kobling sb-kr">
            <span className="sb-spor">
              <span />
            </span>
          </div>
          <div className={clsx('sb-resultat flex items-center justify-center gap-3 px-3 py-2.5', brikkeFlate)}>
            <Innhold icon="innsikt" navn="Rapporter" tekst="Lederrapporter og dashboards" />
          </div>
        </div>

        {/* Én linje som forklarer tegningen, i stedet for tegnforklaring. */}
        <figcaption className="mt-3 px-1 text-[15px] leading-relaxed text-flyd-dempet sm:mt-4">
          Det som skjer i ett system, kommer fram i de andre – av seg selv.
        </figcaption>
      </div>
    </figure>
  );
}
