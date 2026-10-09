'use client';

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
 * Sender GA4-hendelsen «generate_lead» (importeres som konvertering i
 * Google Ads). No-op hvis gtag ikke er tilgjengelig.
 */
export function trackLead(params: Record<string, string> = {}) {
  window.gtag?.('event', 'generate_lead', { form: 'kontakt', ...params });
}

/**
 * Henvendelser om jobb får en egen hendelse, så Google Ads ikke lærer seg å
 * finne jobbsøkere. Ikke importer denne som konvertering.
 */
export function trackCareerInquiry() {
  window.gtag?.('event', 'career_inquiry', { form: 'kontakt' });
}

function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'granted';
  } catch {
    return false;
  }
}

/**
 * Klikk-ID fra Google Ads: gclid, eller gbraid/wbraid fra iOS-apper. Følger
 * med kontaktskjemaet til Make, slik at vi kan melde tilbake til Ads hvilke
 * henvendelser som ble kunder (offline-konverteringer). Lagres og sendes kun
 * med samtykke – uten samtykke ligger den bare i minnet til siden lastes på nytt.
 */
const AD_CLICK_KEY = 'flyd-ad-click';
const AD_CLICK_PARAMS = ['gclid', 'gbraid', 'wbraid'] as const;
// Google Ads tar imot konverteringer opptil 90 dager etter klikket.
const AD_CLICK_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

export type AdClick = Record<(typeof AD_CLICK_PARAMS)[number], string>;
type StoredAdClick = AdClick & { ts: number };

let landedAdClick: StoredAdClick | null = null;

function readAdClickFromUrl(): StoredAdClick | null {
  const params = new URLSearchParams(window.location.search);
  const click = { gclid: '', gbraid: '', wbraid: '', ts: Date.now() };
  let found = false;
  for (const key of AD_CLICK_PARAMS) {
    const value = params.get(key) ?? '';
    // Ekte ID-er er base64url. Alt annet skal ikke videre til Make.
    if (/^[\w-]{1,200}$/.test(value)) {
      click[key] = value;
      found = true;
    }
  }
  return found ? click : null;
}

/** Lagret klikk-ID som ikke er utløpt. Utløpte slettes. */
function readStoredAdClick(): StoredAdClick | null {
  try {
    const stored = JSON.parse(localStorage.getItem(AD_CLICK_KEY) ?? 'null') as StoredAdClick | null;
    if (!stored) return null;
    if (Date.now() - stored.ts < AD_CLICK_MAX_AGE_MS) return stored;
    localStorage.removeItem(AD_CLICK_KEY);
  } catch {
    /* ugyldig eller utilgjengelig */
  }
  return null;
}

/** Lagrer klikk-ID-en fra landingssiden. Kalles når samtykke er gitt. */
export function rememberAdClick() {
  if (!landedAdClick) return;
  try {
    localStorage.setItem(AD_CLICK_KEY, JSON.stringify(landedAdClick));
  } catch {
    /* localStorage utilgjengelig */
  }
}

/** Sletter lagret klikk-ID. Kalles når samtykket trekkes tilbake. */
export function forgetAdClick() {
  try {
    localStorage.removeItem(AD_CLICK_KEY);
  } catch {
    /* localStorage utilgjengelig */
  }
}

/** Klikk-ID-en som skal følge henvendelsen, eller null uten samtykke. */
export function getAdClick(): AdClick | null {
  if (!hasConsent()) return null;
  const click = landedAdClick ?? readStoredAdClick();
  if (!click) return null;
  return { gclid: click.gclid, gbraid: click.gbraid, wbraid: click.wbraid };
}

/**
 * Klikk på tel:/mailto:-lenker → «phone_click» / «email_click» i GA4.
 * Google forwarding-numre finnes ikke i Norge, så «anrop fra nettstedet» kan
 * ikke måles – klikk på nummeret er nærmeste vi kommer. Importeres i Ads.
 */
function trackContactClick(e: MouseEvent) {
  const target = e.target instanceof Element ? e.target : null;
  const link = target?.closest('a[href^="tel:"], a[href^="mailto:"]');
  if (!(link instanceof HTMLAnchorElement)) return;
  const href = link.getAttribute('href') ?? '';
  window.gtag?.('event', href.startsWith('tel:') ? 'phone_click' : 'email_click', {
    link_url: href,
    link_text: (link.textContent ?? '').trim().slice(0, 100),
  });
}

/**
 * Laster Google-taggen (GA4, som også sender konverteringer til Google Ads).
 * Kalles kun når brukeren har gitt samtykke. Idempotent – gtag.js injiseres
 * maks én gang.
 *
 * Consent Mode v2 brukes fortsatt: standard er «denied», og samtykket som er
 * gitt sendes som «update» før config, så Google får riktige signaler.
 */
let googleLoaded = false;
export function loadGoogle() {
  if (typeof window === 'undefined' || googleLoaded) return;
  googleLoaded = true;

  const w = window as unknown as { dataLayer: unknown[] };
  w.dataLayer = w.dataLayer || [];
  // gtag må pushe selve arguments-objektet, ikke en kopi.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  });
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  });
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

/**
 * GA4 (med Google Ads-konverteringer) og Microsoft Clarity – begge lastes
 * først etter samtykke. Uten samtykke hentes ingen skript fra Google eller
 * Microsoft, og ingen informasjonskapsler settes (se CookieConsent.tsx).
 * Tidligere valg huskes via localStorage.
 *
 * «Godta alle» dekker både statistikk og annonsesignalene (ad_storage,
 * ad_user_data, ad_personalization) – GA4 er koblet til Google Ads for
 * konverteringsmåling og remarketing. Personvernsiden beskriver dette.
 */
export default function Analytics() {
  // Gjengangere som allerede har godtatt: last verktøyene når siden er
  // ferdig lastet, så de ikke konkurrerer med LCP på mobil.
  useEffect(() => {
    if (!hasConsent()) return;
    const load = () => {
      loadGoogle();
      loadClarity();
    };
    if (document.readyState === 'complete') load();
    else {
      window.addEventListener('load', load, { once: true });
      return () => window.removeEventListener('load', load);
    }
  }, []);

  // Klikk-ID fra annonsen leses bare fra landingssiden. Analytics ligger i
  // layouten, så den overlever klientnavigasjonen videre til /kontakt.
  useEffect(() => {
    landedAdClick = readAdClickFromUrl();
    if (hasConsent()) rememberAdClick();
    readStoredAdClick();
  }, []);

  // Capture-fase så vi rekker å sende før nettleseren åpner tel:/mailto:.
  useEffect(() => {
    document.addEventListener('click', trackContactClick, true);
    return () => document.removeEventListener('click', trackContactClick, true);
  }, []);

  return null;
}
