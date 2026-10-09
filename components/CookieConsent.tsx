'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CONSENT_KEY, forgetAdClick, loadClarity, loadGoogle, rememberAdClick } from './Analytics';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Cookie-samtykke som blokkerende modal. Vises ved første besøk når det ikke
 * finnes et lagret valg, og kan ikke lukkes uten at brukeren tar et valg.
 * Google-taggen og Clarity lastes først når brukeren godtar. «Kun nødvendige»
 * og «Godta alle» er like store, like synlige og ett klikk unna.
 */
const choiceClass =
  'inline-flex w-full items-center justify-center rounded-pille border border-flyd-skog bg-flyd-skog px-6 py-3.5 text-[16px] font-medium text-flyd-sand transition-[background-color,border-color,transform] duration-200 hover:border-flyd-petrol hover:bg-flyd-petrol active:translate-y-[1px]';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(false); // styrer inn-animasjonen
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hasChoice = false;
    try {
      hasChoice = Boolean(localStorage.getItem(CONSENT_KEY));
    } catch {
      hasChoice = false;
    }
    if (!hasChoice) {
      setVisible(true);
      // Lås scroll mens modalen er åpen.
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        setShown(true);
        dialogRef.current?.focus();
      });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // «Endre samtykke» (footer/personvern) gjenåpner modalen.
  useEffect(() => {
    const openModal = () => {
      setVisible(true);
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        setShown(true);
        dialogRef.current?.focus();
      });
    };
    window.addEventListener('flyd:open-consent', openModal);
    return () => window.removeEventListener('flyd:open-consent', openModal);
  }, []);

  // Hold Tab-fokus inne i modalen så lenge den er åpen.
  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const dialog = document.getElementById('cookie-dialog');
      if (!dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible]);

  function decide(value: 'granted' | 'denied') {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* localStorage utilgjengelig – valget gjelder kun denne økten */
    }
    // «Godta alle» / «Kun nødvendige» styrer både statistikk og annonsesignaler.
    // Taggen finnes bare hvis samtykke er gitt tidligere i økten; da sendes
    // det nye valget videre. Ved «Godta alle» lastes den nå.
    window.gtag?.('consent', 'update', {
      analytics_storage: value,
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
    });
    if (value === 'granted') {
      loadGoogle();
      loadClarity();
      rememberAdClick();
    } else {
      window.clarity?.('consent', false);
      forgetAdClick();
    }
    setShown(false);
    document.body.style.overflow = '';
    // La modalen animere ut før den fjernes fra DOM.
    setTimeout(() => setVisible(false), 200);
  }

  if (!visible) return null;

  return (
    <div
      id="cookie-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      className={`fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center sm:p-6 motion-safe:transition-opacity motion-safe:duration-200 ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Bakgrunn – blokkerer interaksjon med siden, men kan ikke klikkes bort. */}
      <div className="absolute inset-0 bg-flyd-skog/60 backdrop-blur-[2px]" aria-hidden="true" />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`relative w-full max-w-md rounded-kort outline-none bg-flyd-sand p-6 sm:p-8 motion-safe:transition motion-safe:duration-200 motion-safe:ease-out ${
          shown ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-[0.98] opacity-0'
        }`}
      >
        <h2
          id="cookie-title"
          className="font-display text-[22px] font-semibold text-flyd-skog"
        >
          Vi bruker informasjonskapsler
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-flyd-skifer">
          Vi bruker informasjonskapsler til statistikk og for å måle om
          annonsene våre fører til henvendelser. Du velger selv om du vil
          tillate dette. Les mer i{' '}
          <Link
            href="/personvern"
            className="font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-skog hover:decoration-flyd-skog"
          >
            personvernerklæringen
          </Link>
          .
        </p>

        {/* Like store og like synlige valg (Datatilsynet: å si nei skal være
            like lett som å si ja). */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button type="button" onClick={() => decide('denied')} className={choiceClass}>
            Kun nødvendige
          </button>
          <button type="button" onClick={() => decide('granted')} className={choiceClass}>
            Godta alle
          </button>
        </div>
      </div>
    </div>
  );
}
