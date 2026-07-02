'use client';

/**
 * Lenke som gjenåpner samtykkemodalen (CookieConsent lytter på eventet).
 * Brukes i footer slik at samtykke kan endres like enkelt som det ble gitt.
 */
export default function ConsentLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('flyd:open-consent'))}
      className={className}
    >
      Endre samtykke
    </button>
  );
}
