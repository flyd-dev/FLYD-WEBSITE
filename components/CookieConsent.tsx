'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CONSENT_KEY, loadClarity } from './Analytics';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Cookie-samtykke som blokkerende modal for Google Consent Mode v2. Vises ved
 * første besøk når det ikke finnes et lagret valg, og kan ikke lukkes uten at
 * brukeren tar et valg. Oppdaterer analytics_storage hos gtag deretter.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(false); // styrer inn-animasjonen
  const acceptRef = useRef<HTMLButtonElement>(null);

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
        acceptRef.current?.focus();
      });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  function decide(value: 'granted' | 'denied') {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* localStorage utilgjengelig – valget gjelder kun denne økten */
    }
    window.gtag?.('consent', 'update', { analytics_storage: value });
    if (value === 'granted') {
      loadClarity();
    } else {
      window.clarity?.('consent', false);
    }
    setShown(false);
    document.body.style.overflow = '';
    // La modalen animere ut før den fjernes fra DOM.
    setTimeout(() => setVisible(false), 200);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      className={`fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center sm:p-6 motion-safe:transition-opacity motion-safe:duration-200 ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Bakgrunn – blokkerer interaksjon med siden, men kan ikke klikkes bort. */}
      <div className="absolute inset-0 bg-flyd-ink/60 backdrop-blur-[2px]" aria-hidden="true" />

      <div
        className={`relative w-full max-w-md border border-flyd-ink/10 bg-flyd-paper p-6 shadow-subtle sm:p-8 motion-safe:transition motion-safe:duration-200 motion-safe:ease-out ${
          shown ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-[0.98] opacity-0'
        }`}
      >
        <h2
          id="cookie-title"
          className="font-display text-xl font-semibold tracking-tighter text-flyd-ink"
        >
          Vi bruker informasjonskapsler
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-flyd-ink/80">
          Vi bruker informasjonskapsler til statistikk for å gjøre nettstedet
          bedre. Du velger selv om du vil tillate dette. Les mer i{' '}
          <Link
            href="/personvern"
            className="font-medium text-flyd-teal-dark underline underline-offset-2 transition-colors hover:text-flyd-ink"
          >
            personvernerklæringen
          </Link>
          .
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {/* Primær, fremhevet handling */}
          <button
            ref={acceptRef}
            type="button"
            onClick={() => decide('granted')}
            className="inline-flex w-full items-center justify-center px-6 py-4 text-[15px] font-semibold uppercase tracking-wide text-flyd-ink bg-flyd-teal border border-flyd-teal shadow-subtle transition-[background-color,color,border-color,transform] duration-200 hover:bg-flyd-teal-dark hover:text-flyd-paper hover:border-flyd-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flyd-teal-dark active:translate-y-[1px]"
          >
            Godta alle
          </button>
          {/* Sekundær, nedtonet handling */}
          <button
            type="button"
            onClick={() => decide('denied')}
            className="inline-flex w-full items-center justify-center px-6 py-2.5 text-[13px] font-medium tracking-wide text-flyd-ink/60 transition-colors duration-200 hover:text-flyd-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flyd-ink/30"
          >
            Kun nødvendige
          </button>
        </div>
      </div>
    </div>
  );
}
