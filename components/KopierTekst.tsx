'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Check, Copy } from 'lucide-react';

/**
 * Liten pilleknapp som kopierer en tekst (e-postadressen på /kontakt). Mange
 * har ikke e-postprogram satt opp på jobb-PC-en, så mailto: åpner ingenting.
 * Bekreftelsen leses opp via aria-live.
 */
export default function KopierTekst({
  tekst,
  etikett,
  tone = 'lys',
}: {
  tekst: string;
  etikett: string;
  /** Mørk bunn: Mint-kant og Sand-tekst. */
  tone?: 'lys' | 'mork';
}) {
  const [kopiert, setKopiert] = useState(false);
  const tidsur = useRef<number>();

  useEffect(() => () => window.clearTimeout(tidsur.current), []);

  async function kopier() {
    try {
      await navigator.clipboard.writeText(tekst);
    } catch {
      // Eldre nettlesere og sider uten tilgang til utklippstavlen.
      const felt = document.createElement('textarea');
      felt.value = tekst;
      felt.setAttribute('readonly', '');
      felt.style.position = 'fixed';
      felt.style.opacity = '0';
      document.body.appendChild(felt);
      felt.select();
      document.execCommand('copy');
      felt.remove();
    }
    setKopiert(true);
    window.clearTimeout(tidsur.current);
    tidsur.current = window.setTimeout(() => setKopiert(false), 2500);
  }

  return (
    <>
      <button
        type="button"
        onClick={kopier}
        aria-label={etikett}
        data-peker="kopier"
        className={clsx(
          'inline-flex items-center gap-1.5 rounded-pille border px-3 py-1 text-[14px] font-medium transition-[background-color,color,border-color] duration-200 active:translate-y-[1px]',
          tone === 'mork'
            ? 'border-flyd-mint text-flyd-sand hover:bg-flyd-mint hover:text-flyd-skog'
            : 'border-flyd-teal text-flyd-skog hover:border-flyd-skog hover:bg-flyd-skog hover:text-flyd-sand',
        )}
      >
        {kopiert ? (
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        )}
        {kopiert ? 'Kopiert' : 'Kopier'}
      </button>
      <span className="sr-only" aria-live="polite">
        {kopiert ? `${tekst} er kopiert.` : ''}
      </span>
    </>
  );
}
