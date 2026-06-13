'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export const GA_ID = 'G-WQT5M2TYEM';
export const CLARITY_ID = 'x6je6h9lsq';
export const CONSENT_KEY = 'flyd-consent';

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

/**
 * Laster Microsoft Clarity (heatmaps / sesjonsopptak). Kalles kun når brukeren
 * har gitt samtykke. Idempotent – scriptet injiseres maks én gang.
 */
export function loadClarity() {
  if (typeof window === 'undefined') return;

  if (!window.clarity) {
    const clarity: Window['clarity'] = (...args: unknown[]) => {
      (clarity!.q = clarity!.q || []).push(args);
    };
    window.clarity = clarity;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
    const first = document.getElementsByTagName('script')[0];
    first?.parentNode?.insertBefore(script, first);
  }

  // Signaliser samtykke til Clarity (gjelder også om "Cookie consent" er på i Clarity).
  window.clarity('consent');
}

/**
 * Google Analytics 4 med Google Consent Mode v2, samt Microsoft Clarity.
 *
 * Samtykke settes til "denied" som standard (påkrevd i EØS). gtag.js lastes,
 * men samler ingen personopplysninger / cookies før brukeren aktivt godtar i
 * cookie-modalen (se CookieConsent.tsx). Clarity lastes først ved samtykke.
 * Tidligere valg huskes via localStorage.
 */
export default function Analytics() {
  // Gjengangere som allerede har godtatt: last Clarity ved sidelast.
  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY) === 'granted') {
        loadClarity();
      }
    } catch {
      /* localStorage utilgjengelig */
    }
  }, []);

  return (
    <>
      {/* Må kjøre før gtag.js prosesserer køen, derfor først i dataLayer. */}
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;

          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
          });

          try {
            if (localStorage.getItem('${CONSENT_KEY}') === 'granted') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}

          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
