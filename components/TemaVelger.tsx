'use client';

import { useEffect, useId, useRef, useState } from 'react';
import clsx from 'clsx';
import { Check, ChevronDown } from 'lucide-react';
import ServiceIcon from './ServiceIcon';
import FlydIcon from './FlydIcon';
import { temaValg, type TemaValg } from '@/data/kontaktskjema';

// Stor forbokstav i menyen; i setningen står temaet med små bokstaver.
const menyTekst = (v: TemaValg) => v.setning.charAt(0).toUpperCase() + v.setning.slice(1);

/**
 * Temavalget i kontaktskjemaet: «… snakke om [tema ⌄]». En egen nedtrekksmeny
 * i stedet for nettleserens <select>, som så fremmed ut på Petrol-kortet.
 * Følger mønsteret «listbox» fra WAI-ARIA: knappen åpner listen, piltaster,
 * Home/End og første bokstav flytter, Enter/mellomrom velger, Escape og fokus
 * som forlater listen lukker.
 *
 * Returnerer knappen og listen hver for seg: knappen står midt i overskriften,
 * listen under den (en liste kan ikke stå inne i en overskrift). Listen
 * plasseres mot nærmeste posisjonerte forelder.
 */
export function useTemaVelger(verdi: string, onEndre: (tema: string) => void) {
  const [apen, setApen] = useState(false);
  const [aktiv, setAktiv] = useState(0);
  const knapp = useRef<HTMLButtonElement>(null);
  const liste = useRef<HTMLUListElement>(null);
  const id = useId();
  const listeId = `${id}-liste`;
  const etikettId = `${id}-etikett`;
  const verdiId = `${id}-verdi`;
  const valgId = (i: number) => `${id}-valg-${i}`;

  const valgtIndeks = temaValg.findIndex((v) => v.tema === verdi);
  const valgt = temaValg[valgtIndeks];

  // Uten preventScroll ruller mobilen hele listen opp under headeren.
  useEffect(() => {
    if (apen) liste.current?.focus({ preventScroll: true });
  }, [apen]);

  useEffect(() => {
    if (apen) document.getElementById(`${id}-valg-${aktiv}`)?.scrollIntoView({ block: 'nearest' });
  }, [apen, aktiv, id]);

  function aapne(start = Math.max(0, valgtIndeks)) {
    setAktiv(start);
    setApen(true);
  }

  function lukk(fokusTilbake = true) {
    setApen(false);
    if (fokusTilbake) knapp.current?.focus();
  }

  function velg(i: number) {
    onEndre(temaValg[i].tema);
    lukk();
  }

  function onKnappKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      aapne(e.key === 'ArrowUp' && valgtIndeks < 0 ? temaValg.length - 1 : undefined);
    }
  }

  function onListeKey(e: React.KeyboardEvent) {
    const siste = temaValg.length - 1;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setAktiv((i) => Math.min(siste, i + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setAktiv((i) => Math.max(0, i - 1));
        break;
      case 'Home':
        e.preventDefault();
        setAktiv(0);
        break;
      case 'End':
        e.preventDefault();
        setAktiv(siste);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        velg(aktiv);
        break;
      case 'Escape':
        e.preventDefault();
        lukk();
        break;
      case 'Tab':
        lukk(false);
        break;
      default:
        // Første bokstav: hopp til neste valg som begynner på den.
        if (e.key.length === 1 && /\S/.test(e.key)) {
          const b = e.key.toLowerCase();
          const rekke = [...temaValg.slice(aktiv + 1), ...temaValg.slice(0, aktiv + 1)];
          const treff = rekke.find((v) => v.setning.startsWith(b));
          if (treff) setAktiv(temaValg.indexOf(treff));
        }
    }
  }

  const knappElement = (
    <>
      <button
        ref={knapp}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={apen}
        aria-controls={apen ? listeId : undefined}
        aria-labelledby={`${etikettId} ${verdiId}`}
        onClick={() => (apen ? lukk() : aapne())}
        onKeyDown={onKnappKey}
        className="group/tema max-w-full text-left align-baseline focus-visible:outline-none"
      >
        <span
          id={verdiId}
          className={clsx(
            'border-b-2 pb-0.5 transition-[border-color,background-color] duration-200 [box-decoration-break:clone] group-hover/tema:border-flyd-sand group-focus-visible/tema:border-flyd-sand group-focus-visible/tema:bg-flyd-sand/10',
            apen ? 'border-flyd-sand' : 'border-flyd-mint',
            valgt ? 'text-flyd-sand' : 'text-flyd-mint',
          )}
        >
          {valgt?.setning ?? 'velg tema'}
          <ChevronDown
            aria-hidden="true"
            strokeWidth={2.25}
            className={clsx(
              'ml-1 inline h-[0.65em] w-[0.65em] align-[-0.02em] text-flyd-mint transition-transform duration-200 motion-reduce:transition-none',
              apen && 'rotate-180',
            )}
          />
        </span>
        {/* Punktumet står inne i knappen, ellers havner det til høyre for den når temaet går over to linjer. */}
        <span aria-hidden="true">.</span>
      </button>
    </>
  );

  // Etiketten står her og ikke ved knappen, så den ikke leses som en del av overskriften.
  const listeElement = (
    <>
      <span id={etikettId} className="sr-only">
        Hva gjelder henvendelsen?
      </span>
      {apen && (
        <ul
          ref={liste}
          id={listeId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={etikettId}
          aria-activedescendant={valgId(aktiv)}
          onKeyDown={onListeKey}
          onBlur={(e) => {
            // Klikk på knappen lukker via knappen selv; alt annet utenfor lukker her.
            if (e.relatedTarget !== knapp.current) setApen(false);
          }}
          className="absolute left-0 top-full z-20 mt-3 max-h-[min(26rem,70vh)] w-full max-w-[22rem] animate-[faq-inn_200ms_cubic-bezier(0.22,1,0.36,1)] overflow-y-auto rounded-kort bg-flyd-skog p-2 ring-1 ring-flyd-mint/25 motion-reduce:animate-none"
        >
          {temaValg.map((v, i) => {
            const erValgt = v.tema === verdi;
            return (
              <li
                key={v.tema}
                id={valgId(i)}
                role="option"
                aria-selected={erValgt}
                onClick={() => velg(i)}
                onMouseMove={() => aktiv !== i && setAktiv(i)}
                className={clsx(
                  'relative flex cursor-pointer items-center gap-3 rounded-flis px-3 py-2.5 text-[16px] leading-snug transition-colors duration-150',
                  i === aktiv ? 'bg-flyd-petrol text-flyd-sand' : 'text-flyd-dempet',
                  erValgt && 'font-medium text-flyd-sand',
                  // Streken over revisjon: adskilt fra de andre tjenestene.
                  v.skille && "mt-3 before:pointer-events-none before:absolute before:-top-[7px] before:inset-x-3 before:h-px before:bg-flyd-sand/15 before:content-['']",
                )}
              >
                {v.ikon.sett === 'tjeneste' ? (
                  <ServiceIcon name={v.ikon.navn} className="h-5 w-5 flex-shrink-0 text-flyd-mint" dotClassName="fill-flyd-korall" />
                ) : (
                  <FlydIcon name={v.ikon.navn} className="h-5 w-5 flex-shrink-0 text-flyd-mint" />
                )}
                <span className="min-w-0 flex-1">{menyTekst(v)}</span>
                {erValgt && <Check aria-hidden="true" strokeWidth={2.5} className="h-4 w-4 flex-shrink-0 text-flyd-mint" />}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );

  return { knapp: knappElement, liste: listeElement, valgt };
}
