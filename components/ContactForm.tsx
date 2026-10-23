'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { useTemaVelger } from './TemaVelger';
import { getAdClick, trackCareerInquiry, trackLead } from './Analytics';
import { CAREER_TOPIC, CONTACT_TOPICS } from '@/lib/contact-topics';

// Temaene ligger i lib/contact-topics.ts, samme liste som serveren godtar.
// Hvordan de står i overskriften og menyen, ikonene og hintet i meldingsfeltet
// ligger i data/kontaktskjema.ts.
// Lenker kan velge tema på forhånd med ?tema= (f.eks. /kontakt?tema=karriere).

type Status = 'idle' | 'sending' | 'success' | 'error';
type FieldErrors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Felt med understrek på Petrol: Mint-strek (4,9:1, godkjent for UI-elementer),
// etikett i Dempet (6,6:1), det du skriver i Sand. Feil gir Korall-strek, og
// feiltekstene står samlet under meldingsfeltet.
const labelCls = 'block text-[14px] font-medium text-flyd-dempet';
const fieldBase =
  'mt-1.5 w-full rounded-none border-0 border-b-2 bg-transparent px-0 py-2 text-[17px] text-flyd-sand placeholder:text-flyd-dempet/70 transition-[border-color] duration-200 hover:border-flyd-sand focus:border-flyd-sand focus:outline-none focus-visible:outline-none';
const inputCls = `${fieldBase} border-flyd-mint`;
const inputErrCls = `${fieldBase} border-flyd-korall`;

const lenkeCls =
  'font-medium text-flyd-sand underline decoration-flyd-mint decoration-2 underline-offset-4 transition-colors hover:decoration-flyd-sand';

/**
 * Kontaktskjemaet på et Petrol-kort. Overskriften er starten på en samtale
 * («Hei! Jeg vil gjerne snakke om [tema].»), der temaet velges i en egen
 * nedtrekksmeny (TemaVelger). Under står vanlige felt med understrek og
 * Korall-knappen. Valgt i designlab (okt. 2026) foran et rolig skjema med
 * temapiller og et delt kort.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [tema, setTema] = useState('');
  const takkRef = useRef<HTMLHeadingElement>(null);
  const rotRef = useRef<HTMLDivElement>(null);
  const velger = useTemaVelger(tema, setTema);

  useEffect(() => {
    const fraLenke = new URLSearchParams(window.location.search).get('tema')?.toLowerCase();
    const match = CONTACT_TOPICS.find((t) => t.toLowerCase() === fraLenke);
    if (match) setTema(match);
  }, []);

  // Fokus til takken etter sending, og tilbake til temaet ved «Send en ny».
  const fokusEtter = useRef<'takk' | 'tema' | null>(null);
  useEffect(() => {
    if (fokusEtter.current === 'takk') takkRef.current?.focus();
    if (fokusEtter.current === 'tema') rotRef.current?.querySelector<HTMLButtonElement>('button[aria-haspopup]')?.focus();
    fokusEtter.current = null;
  }, [status]);

  const erKarriere = tema === CAREER_TOPIC;

  function validate(formData: FormData): FieldErrors {
    const errors: FieldErrors = {};
    if (!String(formData.get('name') ?? '').trim()) {
      errors.name = 'Skriv inn navnet ditt.';
    }
    const emailVal = String(formData.get('email') ?? '').trim();
    if (!emailVal) {
      errors.email = 'Skriv inn e-postadressen din, så vi kan svare deg.';
    } else if (!EMAIL_RE.test(emailVal)) {
      errors.email = 'E-postadressen ser ikke riktig ut.';
    }
    if (!String(formData.get('message') ?? '').trim()) {
      errors.message = 'Skriv noen ord om hva du trenger hjelp med.';
    }
    return errors;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (formData.get('company')) {
      fokusEtter.current = 'takk';
      setStatus('success');
      return;
    }

    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Flytt fokus til første felt med feil.
      const firstError = (['name', 'email', 'message'] as const).find(
        (k) => errors[k],
      );
      if (firstError) {
        (form.querySelector(`#${firstError}`) as HTMLElement | null)?.focus();
      }
      return;
    }
    setFieldErrors({});
    setStatus('sending');
    setErrorMsg(null);

    try {
      const payload = {
        name: String(formData.get('name') ?? '').trim(),
        // Det ekte bedriftsfeltet. `company` under er honeypoten – utfylt felt stoppes før sending.
        bedrift: String(formData.get('bedrift') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        phone: String(formData.get('phone') ?? '').trim(),
        subject: String(formData.get('topic') ?? '').trim(),
        message: String(formData.get('message') ?? '').trim(),
        company: String(formData.get('company') ?? '').trim(),
        // Klikk-ID fra Google Ads (tom uten annonseklikk eller samtykke).
        ...(getAdClick() ?? { gclid: '', gbraid: '', wbraid: '' }),
      };

      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      fokusEtter.current = 'takk';
      setStatus('success');
      form.reset();
      setTema('');
      // Konvertering til GA4/Google Ads – kun ekte innsendinger, ikke honeypot,
      // og ikke jobbsøkere.
      if (payload.subject === CAREER_TOPIC) {
        trackCareerInquiry();
      } else {
        trackLead(payload.subject ? { topic: payload.subject } : {});
      }
    } catch {
      setStatus('error');
      setErrorMsg('Noe gikk galt. Prøv igjen, eller send direkte til support@flyd.no.');
    }
  }

  const feil = (['name', 'email', 'message'] as const).filter((k) => fieldErrors[k]);

  return (
    <div ref={rotRef} className="on-dark rounded-kort bg-flyd-petrol p-6 sm:p-8 md:p-10">
      {status === 'success' ? (
        <div>
          <CheckCircle2 className="h-8 w-8 text-flyd-mint" strokeWidth={2} aria-hidden="true" />
          <h2
            ref={takkRef}
            tabIndex={-1}
            className="mt-6 font-display text-[28px] font-semibold text-flyd-sand focus:outline-none"
          >
            Takk – meldingen er mottatt.
          </h2>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-flyd-dempet">
            Vi svarer deg normalt innen én arbeidsdag. Haster det, kan du også
            nå oss direkte på{' '}
            <a href="mailto:support@flyd.no" className={lenkeCls}>
              support@flyd.no
            </a>
            .
          </p>
          <Button
            variant="secondary-dark"
            className="mt-8"
            onClick={() => {
              fokusEtter.current = 'tema';
              setStatus('idle');
            }}
          >
            ← Send en ny
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <div
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            <label htmlFor="trap-field">Name</label>
            <input id="trap-field" type="text" name="company" tabIndex={-1} autoComplete="off" />
          </div>
          <input type="hidden" name="topic" value={tema} />

          {/* Menyen legger seg rett under overskriften (posisjonert mot denne boksen). */}
          <div className="relative">
            <h2 className="font-display text-[24px] font-semibold leading-[1.6] text-flyd-dempet sm:text-[28px]">
              Hei! Jeg vil gjerne snakke om {velger.knapp}
            </h2>
            {velger.liste}
          </div>

          <div className="mt-8 border-t border-flyd-sand/15 pt-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelCls}>
                  Navn<span aria-hidden="true"> *</span>
                </label>
                <input
                  id="name"
                  name="name"
                  aria-required="true"
                  autoComplete="name"
                  aria-invalid={fieldErrors.name ? true : undefined}
                  aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                  className={fieldErrors.name ? inputErrCls : inputCls}
                />
              </div>
              {/* Jobbsøkere har ingen bedrift å oppgi. */}
              {!erKarriere && (
                <div>
                  <label htmlFor="bedrift" className={labelCls}>
                    Bedrift
                  </label>
                  <input id="bedrift" name="bedrift" autoComplete="organization" className={inputCls} />
                </div>
              )}
              <div>
                <label htmlFor="email" className={labelCls}>
                  E-post<span aria-hidden="true"> *</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  aria-required="true"
                  autoComplete="email"
                  aria-invalid={fieldErrors.email ? true : undefined}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  className={fieldErrors.email ? inputErrCls : inputCls}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelCls}>
                  Telefon
                </label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
              </div>
            </div>

            <div className="mt-7">
              <label htmlFor="message" className={labelCls}>
                Melding<span aria-hidden="true"> *</span>
              </label>
              <textarea
                id="message"
                name="message"
                aria-required="true"
                rows={3}
                aria-invalid={fieldErrors.message ? true : undefined}
                aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                className={clsx(fieldErrors.message ? inputErrCls : inputCls, 'resize-none leading-relaxed')}
                placeholder={velger.valgt?.hint ?? 'Hva kan vi hjelpe deg med?'}
              />
            </div>
          </div>

          {feil.length > 0 && (
            <div className="mt-6 space-y-2">
              {feil.map((k) => (
                <p key={k} id={`${k}-error`} className="flex items-center gap-2 text-[15px] text-flyd-sand">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 text-flyd-korall" strokeWidth={2} aria-hidden="true" />
                  {fieldErrors[k]}
                </p>
              ))}
            </div>
          )}

          <div className="mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
            <p className="max-w-sm text-[14px] leading-relaxed text-flyd-dempet">
              Navn, e-post og melding må fylles ut. Vi lagrer opplysningene for
              å svare deg, se{' '}
              <a href="/personvern" className={lenkeCls}>
                personvernerklæringen
              </a>
              .
            </p>
            <Button type="submit" variant="primary-dark" disabled={status === 'sending'}>
              <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              {status === 'sending' ? 'Sender …' : 'Send melding'}
            </Button>
          </div>

          {status === 'error' && errorMsg && (
            <p role="alert" className="mt-6 flex items-start gap-2 rounded-flis bg-flyd-skog/40 px-4 py-3 text-[15px] text-flyd-sand">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-flyd-korall" strokeWidth={2} aria-hidden="true" />
              {errorMsg}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
