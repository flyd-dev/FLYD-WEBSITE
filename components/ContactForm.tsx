'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

const topics = [
  'Regnskap',
  'Rådgivning',
  'ERP og programvare',
  'Integrasjoner',
  'Karriere',
  'Annet',
];

type Status = 'idle' | 'sending' | 'success' | 'error';

const labelCls = 'text-[12px] uppercase tracking-[0.22em] text-flyd-ink/60';
const inputCls =
  'mt-2 w-full border border-flyd-ink/25 bg-flyd-paper px-4 py-3.5 text-[15px] text-flyd-ink placeholder:text-flyd-ink/30 focus:border-flyd-teal-dark focus:outline-none';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot
    if (formData.get('company_website')) {
      setStatus('success');
      return;
    }

    setStatus('sending');
    setErrorMsg(null);

    try {
      // On static export there is no server route. We simulate send and
      // fall back to mailto as a guaranteed delivery path.
      const subject = encodeURIComponent(
        `Henvendelse via flyd.no — ${String(formData.get('topic') ?? 'Annet')}`,
      );
      const body = encodeURIComponent(
        `Navn: ${formData.get('name') ?? ''}\n` +
          `Bedrift: ${formData.get('company') ?? ''}\n` +
          `E-post: ${formData.get('email') ?? ''}\n` +
          `Telefon: ${formData.get('phone') ?? ''}\n` +
          `Tema: ${formData.get('topic') ?? ''}\n\n` +
          `Melding:\n${formData.get('message') ?? ''}`,
      );

      // open mailto as a no-backend fallback
      window.location.href = `mailto:post@flyd.no?subject=${subject}&body=${body}`;

      // Give the browser a beat to open the mail client
      setTimeout(() => {
        setStatus('success');
        form.reset();
      }, 400);
    } catch (err) {
      setStatus('error');
      setErrorMsg('Noe gikk galt. Prøv igjen, eller send direkte til post@flyd.no.');
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-flyd-teal-dark/40 bg-flyd-teal/10 p-10 md:p-14">
        <CheckCircle2 className="h-8 w-8 text-flyd-teal-dark" strokeWidth={1.5} />
        <h3 className="mt-6 font-display text-2xl font-semibold">
          Takk — meldingen er på vei.
        </h3>
        <p className="mt-4 max-w-lg text-[15px] text-flyd-ink/75 leading-relaxed">
          Vi kommer tilbake til deg innen kort tid. Hvis e-postklienten din ikke
          åpnet automatisk, kan du sende direkte til{' '}
          <a
            href="mailto:post@flyd.no"
            className="text-flyd-ink underline underline-offset-4 decoration-flyd-ink/40 transition-colors hover:text-flyd-accent hover:decoration-flyd-accent"
          >
            post@flyd.no
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
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Navn <span className="text-flyd-teal-dark">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={inputCls}
            placeholder="Kari Nordmann"
          />
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>
            Bedrift
          </label>
          <input
            id="company"
            name="company"
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
            required
            autoComplete="email"
            className={inputCls}
            placeholder="kari@nordmann.no"
          />
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
          required
          rows={6}
          className={clsx(inputCls, 'resize-none leading-relaxed')}
          placeholder="Fortell oss kort hva du trenger hjelp med …"
        />
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
