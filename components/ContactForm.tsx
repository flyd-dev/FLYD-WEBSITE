'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Send, CheckCircle2, AlertCircle, Check, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import ServiceIcon from './ServiceIcon';
import FlydIcon from './FlydIcon';
import { getAdClick, trackCareerInquiry, trackLead } from './Analytics';
import { CAREER_TOPIC, CONTACT_TOPICS } from '@/lib/contact-topics';
import { temaValg, type TemaValg } from '@/data/kontaktskjema';

// Temaene ligger i lib/contact-topics.ts, samme liste som serveren godtar.
// Flisene (ikon, tekst og hint) ligger i data/kontaktskjema.ts.
// Lenker kan velge tema på forhånd med ?tema= (f.eks. /kontakt?tema=karriere),
// da går skjemaet rett til steg 2.

type Status = 'idle' | 'sending' | 'success' | 'error';
type FieldErrors = { name?: string; email?: string; message?: string };
type Steg = 1 | 2;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Feltene er Sand-fliser (radius 12 px) på Lys mint-kortet. Kanten er Flyd-teal
// (3,6:1 mot kortet, 3,8:1 mot feltet), så feltene synes (WCAG 1.4.11 krever
// 3:1). Plassholderteksten er Skifer 85 % (4,7:1). Feil markeres med Rust-kant
// og et ikon; selve feilteksten står i Skog for å holde kontrasten.
const labelCls = 'text-[15px] font-medium text-flyd-skog';
const fieldBase =
  'mt-2 w-full rounded-flis border bg-flyd-sand px-4 py-3.5 text-[16px] text-flyd-skog placeholder:text-flyd-skifer/85 transition-[border-color,box-shadow] duration-200 hover:border-flyd-petrol focus:outline-none focus-visible:outline-none focus:border-flyd-teal focus:ring-2 focus:ring-flyd-teal';
const inputCls = `${fieldBase} border-flyd-teal`;
const inputErrCls = `${fieldBase} border-flyd-rust ring-1 ring-flyd-rust`;
const errCls = 'mt-2 flex items-center gap-1.5 text-[14px] text-flyd-skog';
const lenkeCls =
  'font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors hover:text-flyd-skog hover:decoration-flyd-skog';

const tjenesteValg = temaValg.filter((v) => !v.egenRad);
const egenRadValg = temaValg.filter((v) => v.egenRad);
const flisId = (v: TemaValg) => `tema-${temaValg.indexOf(v)}`;

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className={errCls}>
      <AlertCircle className="h-4 w-4 flex-shrink-0 text-flyd-rust" strokeWidth={2} aria-hidden="true" />
      {children}
    </p>
  );
}

/** Liten Petrol-flis med ikonet i Sand og Korall-punktum, som tjenestekortene. */
function TemaIkon({ valg, className }: { valg: TemaValg; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={clsx('grid flex-shrink-0 place-items-center rounded-[10px] bg-flyd-petrol text-flyd-sand', className)}
    >
      {valg.ikon.sett === 'tjeneste' ? (
        <ServiceIcon name={valg.ikon.navn} className="h-[22px] w-[22px]" dotClassName="fill-flyd-korall" />
      ) : (
        <FlydIcon name={valg.ikon.navn} className="h-[22px] w-[22px]" />
      )}
    </span>
  );
}

/**
 * Kontaktskjemaet i to steg (fra «Contact Support Block» på 21st.dev, tegnet
 * om etter manualen): først hva det gjelder, som fliser med Flyds ikoner, så
 * kontaktinfo og melding. Revisjon står i raden under streken, adskilt fra de
 * andre tjenestene, sammen med karriere og annet. Begge stegene ligger i DOM-en
 * hele tiden (det andre er `hidden`), så det du har skrevet blir stående når
 * du går tilbake og endrer tema.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [tema, setTema] = useState('');
  const [steg, setSteg] = useState<Steg>(1);
  const rotRef = useRef<HTMLDivElement>(null);
  // Elementet som skal få fokus etter neste stegskifte (id).
  const fokus = useRef<string | null>(null);

  useEffect(() => {
    const fraLenke = new URLSearchParams(window.location.search).get('tema')?.toLowerCase();
    const match = CONTACT_TOPICS.find((t) => t.toLowerCase() === fraLenke);
    if (match) {
      setTema(match);
      setSteg(2);
    }
  }, []);

  useEffect(() => {
    const id = fokus.current;
    if (!id) return;
    fokus.current = null;
    document.getElementById(id)?.focus({ preventScroll: true });
    // På mobil kan toppen av kortet ligge over skjermen etter et valg langt nede.
    const rot = rotRef.current;
    if (rot && rot.getBoundingClientRect().top < 0) {
      const rolig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      rot.scrollIntoView({ block: 'start', behavior: rolig ? 'auto' : 'smooth' });
    }
  }, [steg, status]);

  const valgt = temaValg.find((v) => v.tema === tema);
  const erKarriere = tema === CAREER_TOPIC;

  function velg(v: TemaValg) {
    setTema(v.tema);
    setSteg(2);
    // Med berøring ville fokus i «Navn» åpnet tastaturet og skjult det du valgte.
    fokus.current = window.matchMedia('(pointer: coarse)').matches ? 'gjelder' : 'name';
  }

  function endre() {
    setSteg(1);
    fokus.current = valgt ? flisId(valgt) : null;
  }

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
      fokus.current = 'takk';
      form.reset();
      setTema('');
      setSteg(1);
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

  return (
    <div ref={rotRef} className="scroll-mt-28">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <h2 className="font-display text-[28px] font-semibold">Send oss en melding</h2>
        {status !== 'success' && (
          <p className="flex items-center gap-2.5 text-[14px] text-flyd-skifer" aria-live="polite">
            <span aria-hidden="true" className="flex gap-1">
              {[1, 2].map((n) => (
                <span
                  key={n}
                  className={clsx(
                    'h-1 w-6 rounded-full transition-colors duration-300',
                    n <= steg ? 'bg-flyd-teal' : 'bg-flyd-linje-mint',
                  )}
                />
              ))}
            </span>
            Steg {steg} av 2
          </p>
        )}
      </div>

      {status === 'success' ? (
        <div className="steg-inn mt-8 rounded-kort bg-flyd-sand p-8 md:p-10">
          <CheckCircle2 className="h-8 w-8 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
          <h3 id="takk" tabIndex={-1} className="mt-6 font-display text-2xl font-semibold focus:outline-none">
            Takk – meldingen er mottatt.
          </h3>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-flyd-skifer">
            Vi svarer deg normalt innen én arbeidsdag. Haster det, kan du også
            nå oss direkte på{' '}
            <a href="mailto:support@flyd.no" className={lenkeCls}>
              support@flyd.no
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              fokus.current = flisId(temaValg[0]);
            }}
            className="mt-8 rounded-pille border border-flyd-skog px-5 py-2.5 text-[15px] font-medium text-flyd-skog transition-colors hover:bg-flyd-skog hover:text-flyd-sand active:translate-y-[1px]"
          >
            ← Send en ny
          </button>
        </div>
      ) : (
        <>
          {/* STEG 1 – hva gjelder det? */}
          <div hidden={steg !== 1} className="steg-inn mt-8">
            <h3 id="tema-tittel" className="font-display text-[19px] font-semibold">
              Hva kan vi hjelpe deg med?
            </h3>
            <p className="mt-1.5 text-[15px] text-flyd-skifer">Velg det som passer best. Du kan endre det etterpå.</p>
            <div role="group" aria-labelledby="tema-tittel" className="mt-6">
              {[tjenesteValg, egenRadValg].map((rad, i) => (
                <ul
                  key={i}
                  className={clsx(
                    'grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3',
                    i > 0 && 'mt-5 border-t border-flyd-linje-mint pt-5',
                  )}
                >
                  {rad.map((v) => {
                    const er = v.tema === tema;
                    return (
                      <li key={v.tema}>
                        <button
                          type="button"
                          id={flisId(v)}
                          onClick={() => velg(v)}
                          className={clsx(
                            'group relative flex h-full w-full items-center gap-3.5 rounded-flis border bg-flyd-sand p-3 text-left transition-[border-color,background-color] duration-200 hover:border-flyd-teal active:translate-y-[1px] sm:flex-col sm:items-start sm:gap-4 sm:p-4',
                            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flyd-teal',
                            er ? 'border-flyd-teal' : 'border-flyd-linje-mint',
                          )}
                        >
                          <TemaIkon valg={v} className="h-10 w-10 sm:h-11 sm:w-11" />
                          <span className="min-w-0 flex-1 font-display text-[15px] font-semibold leading-snug text-flyd-skog">
                            {v.visning ?? v.tema}
                            {er && <span className="sr-only"> (valgt)</span>}
                          </span>
                          {er ? (
                            <Check
                              className="h-4 w-4 flex-shrink-0 text-flyd-teal sm:absolute sm:right-4 sm:top-4"
                              strokeWidth={2.5}
                              aria-hidden="true"
                            />
                          ) : (
                            <ArrowRight
                              className="h-4 w-4 flex-shrink-0 text-flyd-teal transition-transform duration-200 group-hover:translate-x-0.5 sm:hidden"
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </div>

          {/* STEG 2 – kontaktinfo og melding */}
          <form onSubmit={onSubmit} noValidate hidden={steg !== 2} className="steg-inn mt-8 space-y-6">
            <div
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
            >
              <label htmlFor="trap-field">Name</label>
              <input id="trap-field" type="text" name="company" tabIndex={-1} autoComplete="off" />
            </div>
            <input type="hidden" name="topic" value={tema} />

            <div className="flex items-center gap-3.5 rounded-flis bg-flyd-sand p-3 pr-4">
              {valgt && <TemaIkon valg={valgt} className="h-10 w-10" />}
              <p id="gjelder" tabIndex={-1} className="min-w-0 flex-1 focus:outline-none">
                <span className="block text-[13px] text-flyd-skifer">Gjelder</span>
                <span className="block font-display text-[16px] font-semibold leading-snug text-flyd-skog">
                  {valgt?.visning ?? tema}
                </span>
              </p>
              <button
                type="button"
                onClick={endre}
                className={clsx(lenkeCls, 'flex-shrink-0 text-[15px]')}
              >
                Endre<span className="sr-only"> hva det gjelder</span>
              </button>
            </div>

            <p className="text-[14px] text-flyd-skifer">
              Felt merket med <span className="text-flyd-petrol">*</span> er obligatoriske.
            </p>

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
              {/* Jobbsøkere har ingen bedrift å oppgi. */}
              {!erKarriere && (
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
              )}
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
              <label htmlFor="message" className={labelCls}>
                Melding <span className="text-flyd-petrol" aria-hidden="true">*</span>
              </label>
              {valgt && (
                <p id="message-hint" className="mt-1 text-[14px] leading-relaxed text-flyd-skifer">
                  {valgt.hint}
                </p>
              )}
              <textarea
                id="message"
                name="message"
                aria-required="true"
                rows={5}
                aria-invalid={fieldErrors.message ? true : undefined}
                aria-describedby={
                  clsx(valgt && 'message-hint', fieldErrors.message && 'message-error') || undefined
                }
                className={clsx(
                  fieldErrors.message ? inputErrCls : inputCls,
                  'resize-none leading-relaxed',
                )}
                placeholder="Skriv meldingen her …"
              />
              {fieldErrors.message && <FieldError id="message-error">{fieldErrors.message}</FieldError>}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <p className="max-w-md text-[14px] leading-relaxed text-flyd-skifer">
                Ved å sende skjemaet samtykker du i at vi lagrer opplysningene for å
                svare deg. Se{' '}
                <a href="/personvern" className={lenkeCls}>
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
        </>
      )}
    </div>
  );
}
