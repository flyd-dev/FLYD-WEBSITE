'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

const WEBHOOK_URL = 'https://hook.eu2.make.com/g8aore8oidc681el311c4f1p55hmgxmx';

const topics = [
  'Regnskap',
  'Rådgivning',
  'ERP og programvare',
  'Integrasjoner',
  'Karriere',
  'Annet',
];

type Status = 'idle' | 'sending' | 'success' | 'error';
type FieldErrors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelCls = 'text-[12px] uppercase tracking-[0.22em] text-flyd-ink/60';
const inputCls =
  'mt-2 w-full border border-flyd-ink/25 bg-flyd-paper px-4 py-3.5 text-[15px] text-flyd-ink placeholder:text-flyd-ink/30 focus:border-flyd-teal-dark focus:outline-none';
const inputErrCls =
  'mt-2 w-full border border-red-400 bg-flyd-paper px-4 py-3.5 text-[15px] text-flyd-ink placeholder:text-flyd-ink/30 focus:border-red-500 focus:outline-none';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

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
      return;
    }
    setFieldErrors({});
    setStatus('sending');
    setErrorMsg(null);

    try {
      const payload = {
        name: String(formData.get('name') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        phone: String(formData.get('phone') ?? '').trim(),
        subject: String(formData.get('topic') ?? '').trim(),
        message: String(formData.get('message') ?? '').trim(),
        company: String(formData.get('company') ?? '').trim(),
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
    } catch {
      setStatus('error');
      setErrorMsg('Noe gikk galt. Prøv igjen, eller send direkte til support@flyd.no.');
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-flyd-teal-dark/40 bg-flyd-teal/10 p-10 md:p-14">
        <CheckCircle2 className="h-8 w-8 text-flyd-teal-dark" strokeWidth={1.5} />
        <h3 className="mt-6 font-display text-2xl font-semibold">
          Takk — meldingen er mottatt.
        </h3>
        <p className="mt-4 max-w-lg text-[15px] text-flyd-ink/75 leading-relaxed">
          Vi kommer tilbake til deg innen kort tid. Har du det haster kan du
          også nå oss direkte på{' '}
          <a
            href="mailto:support@flyd.no"
            className="text-flyd-ink underline underline-offset-4 decoration-flyd-ink/40 transition-colors hover:text-flyd-accent hover:decoration-flyd-accent"
          >
            support@flyd.no
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 text-[12px] uppercase tracking-[0.22em] text-flyd-ink/60 hover:text-flyd-ink"
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
            Navn <span className="text-flyd-teal-dark">*</span>
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className={fieldErrors.name ? inputErrCls : inputCls}
            placeholder="Kari Nordmann"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-[12px] text-red-600">{fieldErrors.name}</p>
          )}
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
            E-post <span className="text-flyd-teal-dark">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldErrors.email ? inputErrCls : inputCls}
            placeholder="kari@nordmann.no"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-[12px] text-red-600">{fieldErrors.email}</p>
          )}
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
          Melding <span className="text-flyd-teal-dark">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={clsx(
            fieldErrors.message ? inputErrCls : inputCls,
            'resize-none leading-relaxed',
          )}
          placeholder="Fortell oss kort hva du trenger hjelp med …"
        />
        {fieldErrors.message && (
          <p className="mt-1 text-[12px] text-red-600">{fieldErrors.message}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="text-[12px] text-flyd-ink/50 max-w-md leading-relaxed">
          Ved å sende skjemaet samtykker du i at vi lagrer opplysningene for å
          svare deg. Se{' '}
          <a
            href="/personvern"
            className="text-flyd-ink underline underline-offset-4"
          >
            personvernerklæring
          </a>
          .
        </p>
        <Button type="submit" variant="primary" accent>
          <Send className="h-4 w-4 transition-colors" strokeWidth={1.75} />
          {status === 'sending' ? 'Sender …' : 'Send melding'}
        </Button>
      </div>

      {status === 'error' && errorMsg && (
        <p className="text-[14px] text-red-700">{errorMsg}</p>
      )}
    </form>
  );
}
