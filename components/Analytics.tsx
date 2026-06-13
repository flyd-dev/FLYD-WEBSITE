'use client';

import Script from 'next/script';

export const GA_ID = 'G-WQT5M2TYEM';
export const CONSENT_KEY = 'flyd-consent';

/**
 * Google Analytics 4 med Google Consent Mode v2.
 *
 * Samtykke settes til "denied" som standard (påkrevd i EØS). gtag.js lastes,
 * men samler ingen personopplysninger / cookies før brukeren aktivt godtar i
 * cookie-banneren (se CookieConsent.tsx). Tidligere valg huskes via localStorage.
 */
export default function Analytics() {
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
