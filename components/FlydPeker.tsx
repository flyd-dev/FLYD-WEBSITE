'use client';

import { useEffect, useRef } from 'react';

// Felt der vanlig skrivemarkør skal vises i stedet for Flyd-pekeren.
const FELT = 'input:not([type="radio"]):not([type="checkbox"]), textarea, select, [contenteditable="true"]';
const KLIKKBART = 'a, button, label, summary, [role="button"]';

type Tilstand = 'vanlig' | 'felt' | 'lenke' | 'ekstern' | 'tel' | 'epost' | 'apne' | 'velg' | 'kopier';
const EGNE: Tilstand[] = ['kopier'];

/** Hva et klikk på elementet gjør, så pekeren kan vise riktig ikon. */
function tilstandFor(el: Element | null): Tilstand {
  if (!el) return 'vanlig';
  if (el.closest(FELT)) return 'felt';
  const k = el.closest<HTMLElement>(KLIKKBART);
  if (!k) return 'vanlig';
  // Knapper kan si selv hva de gjør (data-peker), f.eks. «Kopier» på /kontakt.
  const egen = k.dataset.peker as Tilstand | undefined;
  if (egen && EGNE.includes(egen)) return egen;
  const href = k.getAttribute('href') ?? '';
  if (href.startsWith('tel:')) return 'tel';
  if (href.startsWith('mailto:')) return 'epost';
  if (k.getAttribute('target') === '_blank' || (/^https?:\/\//.test(href) && !href.includes('flyd.no'))) return 'ekstern';
  // Det som åpner noe på stedet: spørsmål og svar, menyer og bildeflater.
  if (k.tagName === 'SUMMARY' || k.hasAttribute('aria-expanded') || k.hasAttribute('aria-pressed')) return 'apne';
  // Valg i skjema (temapillene).
  if (k.tagName === 'LABEL' && k.querySelector('input[type="radio"], input[type="checkbox"]')) return 'velg';
  return 'lenke';
}

/**
 * Flyd-pekeren. Logoens punktum (Korall) er pekeren, og når du beveger musen
 * legger det igjen en kort flytlinje som blekner, samme uttrykk som
 * flytlinjene i profilen. Over noe klikkbart blir punktumet til en liten
 * liten pilleknapp ved siden av punktumet, med et ikon som viser hva klikket
 * gjør: pil for lenker og knapper, skrå pil for andre nettsteder, telefon,
 * konvolutt, pluss for det som åpner seg på stedet, hake for valg i skjema og
 * to ark for kopiering (knapper med data-peker="kopier").
 * Pillen står nede til høyre for punktumet, så den ikke dekker teksten du
 * peker på. Den følger knappefargene: Skog på lys bunn, Korall på mørk.
 *
 * Bare med mus på skjermer som kan holde over (hover: hover, pointer: fine).
 * Ved berøring og ved prefers-reduced-motion står vanlig peker. Punktumet og
 * pillen flyttes direkte i pointermove, så de aldri henger etter. I skjemafelt
 * tar vanlig skrivemarkør over. Stilen ligger i globals.css (.flyd-peker*).
 */
export default function FlydPeker() {
  const pekerRef = useRef<HTMLDivElement>(null);
  const sporRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mus = window.matchMedia('(hover: hover) and (pointer: fine)');
    const rolig = window.matchMedia('(prefers-reduced-motion: reduce)');
    const peker = pekerRef.current;
    const lerret = sporRef.current;
    const ctx = lerret?.getContext('2d');
    if (!peker || !lerret || !ctx || !mus.matches || rolig.matches) return;

    const html = document.documentElement;
    html.classList.add('egen-peker');

    const LEVETID = 320; // ms en del av flytlinjen lever
    const spor: { x: number; y: number; t: number }[] = [];
    let ramme = 0;
    let tilstand: Tilstand | '' = '';
    let mork = false;

    const tilpass = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      lerret.width = window.innerWidth * dpr;
      lerret.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    tilpass();

    const tegn = () => {
      const na = performance.now();
      while (spor.length && na - spor[0].t > LEVETID) spor.shift();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      // Flytlinjen: tynn i halen, tykkere mot punktumet, myk kurve gjennom midtpunktene.
      if (spor.length > 2 && tilstand === 'vanlig') {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        const farge = mork ? '139, 194, 187' : '76, 134, 135';
        for (let i = 1; i < spor.length - 1; i++) {
          const a = spor[i - 1];
          const b = spor[i];
          const c = spor[i + 1];
          const andel = i / (spor.length - 1);
          const liv = 1 - (na - b.t) / LEVETID;
          ctx.strokeStyle = `rgba(${farge}, ${(0.85 * andel * liv).toFixed(3)})`;
          ctx.lineWidth = 0.6 + 2.6 * andel;
          ctx.beginPath();
          ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
          ctx.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2);
          ctx.stroke();
        }
      }
      ramme = spor.length ? requestAnimationFrame(tegn) : 0;
    };

    const flytt = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const { clientX: x, clientY: y } = e;
      peker.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      peker.classList.add('vis');

      const el = e.target instanceof Element ? e.target : null;
      const ny = tilstandFor(el);
      const nyMork = !!el?.closest('.on-dark');
      if (ny !== tilstand || nyMork !== mork) {
        tilstand = ny;
        mork = nyMork;
        peker.dataset.tilstand = ny;
        peker.dataset.flate = nyMork ? 'mork' : 'lys';
      }

      spor.push({ x, y, t: performance.now() });
      if (spor.length > 24) spor.shift();
      if (!ramme) ramme = requestAnimationFrame(tegn);
    };

    const skjul = () => {
      peker.classList.remove('vis');
      spor.length = 0;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
    const ned = () => peker.classList.add('trykk');
    const opp = () => peker.classList.remove('trykk');
    const utAvVinduet = (e: MouseEvent) => {
      if (!e.relatedTarget) skjul();
    };

    window.addEventListener('pointermove', flytt, { passive: true });
    window.addEventListener('pointerdown', ned, { passive: true });
    window.addEventListener('pointerup', opp, { passive: true });
    window.addEventListener('resize', tilpass);
    window.addEventListener('blur', skjul);
    document.addEventListener('mouseout', utAvVinduet);

    return () => {
      html.classList.remove('egen-peker');
      window.removeEventListener('pointermove', flytt);
      window.removeEventListener('pointerdown', ned);
      window.removeEventListener('pointerup', opp);
      window.removeEventListener('resize', tilpass);
      window.removeEventListener('blur', skjul);
      document.removeEventListener('mouseout', utAvVinduet);
      if (ramme) cancelAnimationFrame(ramme);
    };
  }, []);

  const ikon = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.25, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

  return (
    <>
      <canvas ref={sporRef} aria-hidden="true" className="flyd-peker-spor" />
      <div ref={pekerRef} aria-hidden="true" className="flyd-peker" data-tilstand="vanlig" data-flate="lys">
        <span className="flyd-peker-punktum" />
        <span className="flyd-peker-pille">
          <svg viewBox="0 0 24 24" data-ikon="lenke" {...ikon}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <svg viewBox="0 0 24 24" data-ikon="ekstern" {...ikon}>
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
          <svg viewBox="0 0 24 24" data-ikon="tel" {...ikon}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
          <svg viewBox="0 0 24 24" data-ikon="epost" {...ikon}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          <svg viewBox="0 0 24 24" data-ikon="apne" {...ikon}>
            <path d="M12 5v14M5 12h14" />
          </svg>
          <svg viewBox="0 0 24 24" data-ikon="velg" {...ikon}>
            <path d="M5 12.5 10 17l9-10" />
          </svg>
          <svg viewBox="0 0 24 24" data-ikon="kopier" {...ikon}>
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
          </svg>
        </span>
      </div>
    </>
  );
}
