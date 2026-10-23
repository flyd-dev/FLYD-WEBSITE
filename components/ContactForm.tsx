'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Send, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import Eyebrow from './Eyebrow';
import { getAdClick, trackCareerInquiry, trackLead } from './Analytics';
import { CAREER_TOPIC, CONTACT_TOPICS } from '@/lib/contact-topics';
import { temaValg } from '@/data/kontaktskjema';

// Temaene ligger i lib/contact-topics.ts, samme liste som serveren godtar.
// Hvordan de leses i setningen og hintet i meldingsfeltet ligger i data/kontaktskjema.ts.
// Lenker kan velge tema på forhånd med ?tema= (f.eks. /kontakt?tema=karriere).

type Status = 'idle' | 'sending' | 'success' | 'error';
type FieldErrors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Feltene i setningen: understrek i Mint (4,9:1 mot Petrol), plassholder i Mint
// og det du skriver i Sand, så de utfylte delene skiller seg fra teksten rundt
// (Dempet, 6,6:1). Feil får Korall-understrek (4,2:1, godkjent for UI-elementer).
// Bredden følger teksten der nettleseren støtter det (.setning-felt i globals.css).
const ordFelt =
  'setning-felt rounded-none border-0 border-b-2 bg-transparent px-1 pb-0.5 align-baseline font-medium leading-tight placeholder:text-flyd-mint transition-[border-color,background-color] duration-200 hover:border-flyd-sand focus:border-flyd-sand focus:bg-flyd-sand/10 focus:outline-none focus-visible:outline-none';
const ordFeltOk = `${ordFelt} border-flyd-mint text-flyd-sand`;
const ordFeltFeil = `${ordFelt} border-flyd-korall text-flyd-sand`;

const lenkeCls =
  'font-medium text-flyd-sand underline decoration-flyd-mint decoration-2 underline-offset-4 transition-colors hover:decoration-flyd-sand';

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="flex items-center gap-2 text-[15px] text-flyd-sand">
      <AlertCircle className="h-4 w-4 flex-shrink-0 text-flyd-korall" strokeWidth={2} aria-hidden="true" />
      {children}
    </p>
  );
}

/**
 * Kontaktskjemaet som en setning du fyller ut («Hei! Jeg vil gjerne snakke
 * om … Jeg heter … og jobber i …»), på et Petrol-kort med Korall-knapp.
 * Ett steg, ingen ikoner: det skal lese som starten på en samtale, i tråd med
 * «La oss ta en prat.». Hvert felt har en egen (skjult) etikett, så skjermlesere
 * får vanlige skjemafelt. Velger du «en jobb hos dere», faller bedriften ut av setningen.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [tema, setTema] = useState('');
  const takkRef = useRef<HTMLHeadingElement>(null);
  const nyRef = useRef(false);

  useEffect(() => {
    const fraLenke = new URLSearchParams(window.location.search).get('tema')?.toLowerCase();
    const match = CONTACT_TOPICS.find((t) => t.toLowerCase() === fraLenke);
    if (match) setTema(match);
  }, []);

  // Fokus til takken etter sending, og tilbake til første felt ved «Send en ny».
  useEffect(() => {
    if (status === 'success') takkRef.current?.focus();
    if (status === 'idle' && nyRef.current) {
      nyRef.current = false;
      document.getElementById('topic')?.focus();
    }
  }, [status]);

  const valgt = temaValg.find((v) => v.tema === tema);
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
    <div className="on-dark rounded-kort bg-flyd-petrol p-6 sm:p-8 md:p-10">
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
              nyRef.current = true;
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

          <Eyebrow as="h2" tone="petrol">
            Send oss en melding
          </Eyebrow>

          {/* Setningen. Etikettene er skjult; teksten rundt feltene viser hva de er til. */}
          <div className="mt-6 font-display text-[20px] font-medium leading-[1.95] text-flyd-dempet sm:text-[24px] sm:leading-[2.1] md:text-[26px]">
            Hei! Jeg vil gjerne snakke om{' '}
            {/* Temaet vises som tekst som kan bryte linjen (en select kan ikke det, og
                «nettsider og digitale flater» ble kuttet på mobil). Den ekte selecten ligger
                usynlig over teksten, så klikk, tastatur og skjermlesere bruker den. */}
            <span className="group/tema relative inline-block max-w-full align-baseline">
              <span
                aria-hidden="true"
                className={clsx(
                  'border-b-2 border-flyd-mint px-1 pb-0.5 leading-tight transition-[border-color,background-color] duration-200 [box-decoration-break:clone] group-hover/tema:border-flyd-sand group-focus-within/tema:border-flyd-sand group-focus-within/tema:bg-flyd-sand/10',
                  valgt ? 'text-flyd-sand' : 'text-flyd-mint',
                )}
              >
                {valgt?.setning ?? 'velg tema'}
                <ChevronDown
                  className="ml-1 inline h-[0.7em] w-[0.7em] align-[-0.02em] text-flyd-mint"
                  strokeWidth={2.25}
                />
              </span>
              {/* Punktumet står inne i blokken, ellers havner det til høyre for den når temaet går over to linjer. */}
              .
              <label htmlFor="topic" className="sr-only">
                Hva gjelder henvendelsen?
              </label>
              <select
                id="topic"
                name="topic"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer appearance-none text-[16px] opacity-0 [&>option]:bg-flyd-sand [&>option]:font-body [&>option]:text-flyd-skog"
              >
                <option value="">velg tema</option>
                {temaValg.map((v) => (
                  <option key={v.tema} value={v.tema}>
                    {v.setning}
                  </option>
                ))}
              </select>
            </span>
            {' '}Jeg heter{' '}
            <label htmlFor="name" className="sr-only">
              Navn (må fylles ut)
            </label>
            <input
              id="name"
              name="name"
              aria-required="true"
              autoComplete="name"
              aria-invalid={fieldErrors.name ? true : undefined}
              aria-describedby={fieldErrors.name ? 'name-error' : undefined}
              className={fieldErrors.name ? ordFeltFeil : ordFeltOk}
              style={{ '--bredde': '9em' } as React.CSSProperties}
              placeholder="navnet ditt"
            />
            {/* Jobbsøkere har ingen bedrift å oppgi. */}
            {!erKarriere && (
              <>
                {' '}og jobber i{' '}
                <label htmlFor="bedrift" className="sr-only">
                  Bedrift
                </label>
                <span className="whitespace-nowrap">
                  <input
                    id="bedrift"
                    name="bedrift"
                    autoComplete="organization"
                    className={ordFeltOk}
                    style={{ '--bredde': '8em' } as React.CSSProperties}
                    placeholder="bedriften"
                  />
                  .
                </span>
              </>
            )}
            {erKarriere && '.'} Dere når meg på{' '}
            <label htmlFor="email" className="sr-only">
              E-post (må fylles ut)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              aria-required="true"
              autoComplete="email"
              aria-invalid={fieldErrors.email ? true : undefined}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              className={fieldErrors.email ? ordFeltFeil : ordFeltOk}
              style={{ '--bredde': '11em' } as React.CSSProperties}
              placeholder="e-postadressen din"
            />{' '}
            eller{' '}
            <label htmlFor="phone" className="sr-only">
              Telefon
            </label>
            <span className="whitespace-nowrap">
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={ordFeltOk}
                style={{ '--bredde': '6.5em' } as React.CSSProperties}
                placeholder="telefon"
              />
              .
            </span>
          </div>

          <div className="mt-8">
            <label htmlFor="message" className="text-[15px] font-medium text-flyd-sand">
              Fortell gjerne litt mer
            </label>
            <textarea
              id="message"
              name="message"
              aria-required="true"
              rows={5}
              aria-invalid={fieldErrors.message ? true : undefined}
              aria-describedby={fieldErrors.message ? 'message-error' : undefined}
              className={clsx(
                'mt-2 w-full resize-none rounded-flis border bg-flyd-skog/40 px-4 py-3.5 text-[16px] leading-relaxed text-flyd-sand placeholder:text-flyd-dempet/70 transition-[border-color,box-shadow] duration-200 hover:border-flyd-sand focus:border-flyd-sand focus:outline-none focus:ring-1 focus:ring-flyd-sand focus-visible:outline-none',
                fieldErrors.message ? 'border-flyd-korall' : 'border-flyd-mint/70',
              )}
              placeholder={valgt?.hint ?? 'Hva kan vi hjelpe deg med?'}
            />
          </div>

          {feil.length > 0 && (
            <div className="mt-5 space-y-2">
              {feil.map((k) => (
                <FieldError key={k} id={`${k}-error`}>
                  {fieldErrors[k]}
                </FieldError>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
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
