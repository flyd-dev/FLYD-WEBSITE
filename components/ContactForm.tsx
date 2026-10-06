'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { getAdClick, trackCareerInquiry, trackLead } from './Analytics';

const WEBHOOK_URL = 'https://hook.eu2.make.com/g8aore8oidc681el311c4f1p55hmgxmx';

// Samme navn som tjenestene i data/services.ts. Make-scenariet bruker temaet
// bare som «Emne» i e-posten, så verdiene kan endres fritt. Lenker kan velge
// tema på forhånd med ?tema= (f.eks. /kontakt?tema=karriere).
const CAREER_TOPIC = 'Karriere';
const topics = [
  'Regnskap og rådgivning',
  'Programvare / ERP',
  'Integrasjoner',
  'Analyse og rapportering',
  'Nettsider og digitale flater',
  'Lønn og HR',
  CAREER_TOPIC,
  'Annet',
];

type Status = 'idle' | 'sending' | 'success' | 'error';
type FieldErrors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Feltene er Sand-fliser (radius 12 px) på Lys mint-kortet. Feil markeres med
// Rust-kant og et ikon; selve feilteksten står i Skog for å holde kontrasten.
const labelCls = 'text-[15px] font-medium text-flyd-skog';
const fieldBase =
  'mt-2 w-full rounded-flis border bg-flyd-sand px-4 py-3.5 text-[16px] text-flyd-skog placeholder:text-flyd-skifer/60 transition-[border-color,box-shadow] duration-200 hover:border-flyd-teal focus:outline-none focus-visible:outline-none focus:border-flyd-teal focus:ring-2 focus:ring-flyd-teal/30';
const inputCls = `${fieldBase} border-flyd-linje-mint`;
const inputErrCls = `${fieldBase} border-flyd-rust ring-1 ring-flyd-rust`;
const errCls = 'mt-2 flex items-center gap-1.5 text-[14px] text-flyd-skog';

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className={errCls}>
      <AlertCircle className="h-4 w-4 flex-shrink-0 text-flyd-rust" strokeWidth={2} aria-hidden="true" />
      {children}
    </p>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const topicRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const tema = new URLSearchParams(window.location.search).get('tema')?.toLowerCase();
    const match = topics.find((t) => t.toLowerCase() === tema);
    if (match && topicRef.current) topicRef.current.value = match;
  }, []);

  function validate(formData: FormData): FieldErrors {
    const errors: FieldErrors = {};
    if (!String(formData.get('name') ?? '').trim()) {
      errors.name = 'Navn er påkrevd.';
    }
    const emailVal = String(formData.get('email') ?? '').trim();
    if (!emailVal) {
      errors.email = 'E-post er påkrevd.';
    } else if (!EMAIL_RE.test(emailVal)) {
      errors.email = 'Ugyldig e-postadresse.';
    }
    if (!String(formData.get('message') ?? '').trim()) {
      errors.message = 'Melding er påkrevd.';
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
        // Det ekte bedriftsfeltet. `company` under er honeypoten – Make sorterer bort boter på den.
        bedrift: String(formData.get('bedrift') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        phone: String(formData.get('phone') ?? '').trim(),
        subject: String(formData.get('topic') ?? '').trim(),
        message: String(formData.get('message') ?? '').trim(),
        company: String(formData.get('company') ?? '').trim(),
        // Klikk-ID fra Google Ads (tom uten annonseklikk eller samtykke).
        ...(getAdClick() ?? { gclid: '', gbraid: '', wbraid: '' }),
      };

      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setStatus('success');
      form.reset();
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

  if (status === 'success') {
    return (
      <div className="rounded-kort bg-flyd-sand p-8 md:p-12">
        <CheckCircle2 className="h-8 w-8 text-flyd-teal" strokeWidth={2} />
        <h3 className="mt-6 font-display text-2xl font-semibold">
          Takk – meldingen er mottatt.
        </h3>
        <p className="mt-4 max-w-lg text-[16px] text-flyd-skifer leading-relaxed">
          Vi svarer deg normalt innen én arbeidsdag. Haster det, kan du også
          nå oss direkte på{' '}
          <a
            href="mailto:support@flyd.no"
            className="font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-skog hover:decoration-flyd-skog"
          >
            support@flyd.no
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 rounded-pille border border-flyd-skog px-5 py-2.5 text-[15px] font-medium text-flyd-skog transition-colors hover:bg-flyd-skog hover:text-flyd-sand active:translate-y-[1px]"
        >
          ← Send en ny
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        <label htmlFor="trap-field">Name</label>
        <input id="trap-field" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Navn <span className="text-flyd-petrol" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            aria-required="true"
            autoComplete="name"
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            className={fieldErrors.name ? inputErrCls : inputCls}
            placeholder="Kari Nordmann"
          />
          {fieldErrors.name && <FieldError id="name-error">{fieldErrors.name}</FieldError>}
        </div>
        <div>
          <label htmlFor="bedrift" className={labelCls}>
            Bedrift
          </label>
          <input
            id="bedrift"
            name="bedrift"
            autoComplete="organization"
            className={inputCls}
            placeholder="Nordmann AS"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelCls}>
            E-post <span className="text-flyd-petrol" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            aria-required="true"
            type="email"
            autoComplete="email"
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className={fieldErrors.email ? inputErrCls : inputCls}
            placeholder="kari@nordmann.no"
          />
          {fieldErrors.email && <FieldError id="email-error">{fieldErrors.email}</FieldError>}
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputCls}
            placeholder="+47 000 00 000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="topic" className={labelCls}>
          Hva gjelder henvendelsen?
        </label>
        <select
          ref={topicRef}
          id="topic"
          name="topic"
          defaultValue=""
          className={clsx(inputCls, 'appearance-none cursor-pointer')}
        >
          <option value="" disabled>
            Velg tema …
          </option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Melding <span className="text-flyd-petrol" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          aria-required="true"
          rows={6}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          className={clsx(
            fieldErrors.message ? inputErrCls : inputCls,
            'resize-none leading-relaxed',
          )}
          placeholder="Fortell oss kort hva du trenger hjelp med …"
        />
        {fieldErrors.message && <FieldError id="message-error">{fieldErrors.message}</FieldError>}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="max-w-md text-[14px] leading-relaxed text-flyd-skifer">
          Ved å sende skjemaet samtykker du i at vi lagrer opplysningene for å
          svare deg. Se{' '}
          <a
            href="/personvern"
            className="font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-skog hover:decoration-flyd-skog"
          >
            personvernerklæring
          </a>
          .
        </p>
        <Button type="submit" variant="primary" disabled={status === 'sending'}>
          <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          {status === 'sending' ? 'Sender …' : 'Send melding'}
        </Button>
      </div>

      {status === 'error' && errorMsg && (
        <p role="alert" className="flex items-start gap-2 rounded-flis bg-flyd-sand px-4 py-3 text-[15px] text-flyd-skog">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-flyd-rust" strokeWidth={2} aria-hidden="true" />
          {errorMsg}
        </p>
      )}
    </form>
  );
}
