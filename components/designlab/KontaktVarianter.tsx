'use client';

import { useRef, useState } from 'react';
import clsx from 'clsx';
import { AlertCircle, CheckCircle2, ChevronDown, Send } from 'lucide-react';
import { Button } from '@/components/Button';
import Eyebrow from '@/components/Eyebrow';
import FlydIcon from '@/components/FlydIcon';
import FlytLinjer from '@/components/FlytLinjer';
import KopierTekst from '@/components/KopierTekst';
import { temaValg } from '@/data/kontaktskjema';

/**
 * Tre varianter av kontaktskjemaet til /designlab/kontakt/. Bare utseende:
 * innsendingen er stoppet her (ingenting sendes), så forhåndsvisningen ikke
 * lager ekte henvendelser. Varianten som velges flyttes inn i ContactForm.tsx
 * med den ekte innsendingen (honeypot, bedrift, subject, klikk-ID, konverteringer).
 */

type Feil = { name?: string; email?: string; message?: string };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Temaene slik de står på en pille eller i en liste (stor forbokstav).
const visning = (setning: string) => setning.charAt(0).toUpperCase() + setning.slice(1);

/** Felles logikk for demoene: validering, fokus på første feil og en «sendt»-tilstand. */
function useDemo() {
  const [tema, setTema] = useState('');
  const [feil, setFeil] = useState<Feil>({});
  const [sendt, setSendt] = useState(false);
  const takk = useRef<HTMLHeadingElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const f: Feil = {};
    if (!String(fd.get('name') ?? '').trim()) f.name = 'Skriv inn navnet ditt.';
    const epost = String(fd.get('email') ?? '').trim();
    if (!epost) f.email = 'Skriv inn e-postadressen din, så vi kan svare deg.';
    else if (!EMAIL_RE.test(epost)) f.email = 'E-postadressen ser ikke riktig ut.';
    if (!String(fd.get('message') ?? '').trim()) f.message = 'Skriv noen ord om hva du trenger hjelp med.';
    setFeil(f);
    const forste = (['name', 'email', 'message'] as const).find((k) => f[k]);
    if (forste) {
      (form.querySelector(`[name="${forste}"]`) as HTMLElement | null)?.focus();
      return;
    }
    setSendt(true);
    requestAnimationFrame(() => takk.current?.focus());
  }

  const hint = temaValg.find((v) => v.tema === tema)?.hint ?? 'Hva kan vi hjelpe deg med?';
  return { tema, setTema, feil, sendt, setSendt, onSubmit, takk, hint };
}

function Takk({ demo, mork }: { demo: ReturnType<typeof useDemo>; mork: boolean }) {
  return (
    <div>
      <CheckCircle2 className={clsx('h-8 w-8', mork ? 'text-flyd-mint' : 'text-flyd-teal')} strokeWidth={2} aria-hidden="true" />
      <h3
        ref={demo.takk}
        tabIndex={-1}
        className={clsx('mt-6 font-display text-[26px] font-semibold focus:outline-none', mork ? 'text-flyd-sand' : 'text-flyd-skog')}
      >
        Takk – meldingen er mottatt.
      </h3>
      <p className={clsx('mt-3 text-[15px]', mork ? 'text-flyd-dempet' : 'text-flyd-skifer')}>
        (Forhåndsvisning: ingenting ble sendt.)
      </p>
      <Button variant={mork ? 'secondary-dark' : 'secondary'} className="mt-6" onClick={() => demo.setSendt(false)}>
        ← Tilbake
      </Button>
    </div>
  );
}

function FeilListe({ feil, mork, prefiks }: { feil: Feil; mork: boolean; prefiks: string }) {
  const keys = (['name', 'email', 'message'] as const).filter((k) => feil[k]);
  if (!keys.length) return null;
  return (
    <div className="mt-6 space-y-2">
      {keys.map((k) => (
        <p key={k} id={`${prefiks}-${k}-feil`} className={clsx('flex items-center gap-2 text-[15px]', mork ? 'text-flyd-sand' : 'text-flyd-skog')}>
          <AlertCircle className={clsx('h-4 w-4 flex-shrink-0', mork ? 'text-flyd-korall' : 'text-flyd-rust')} strokeWidth={2} aria-hidden="true" />
          {feil[k]}
        </p>
      ))}
    </div>
  );
}

function Samtykke({ mork }: { mork: boolean }) {
  return (
    <p className={clsx('max-w-sm text-[14px] leading-relaxed', mork ? 'text-flyd-dempet' : 'text-flyd-skifer')}>
      Navn, e-post og melding må fylles ut. Vi lagrer opplysningene for å svare deg, se{' '}
      <a
        href="/personvern"
        className={clsx(
          'font-medium underline decoration-2 underline-offset-4 transition-colors',
          mork ? 'text-flyd-sand decoration-flyd-mint hover:decoration-flyd-sand' : 'text-flyd-petrol decoration-flyd-teal hover:text-flyd-skog',
        )}
      >
        personvernerklæringen
      </a>
      .
    </p>
  );
}

/* ------------------------------------------------------------------------- */
/* Felt med understrek på mørk bunn (variant A og B)                          */
/* ------------------------------------------------------------------------- */

const strekLabel = 'block text-[14px] font-medium text-flyd-dempet';
const strekFelt =
  'mt-1.5 w-full rounded-none border-0 border-b-2 bg-transparent px-0 py-2 text-[17px] text-flyd-sand placeholder:text-flyd-dempet/70 transition-[border-color] duration-200 hover:border-flyd-sand focus:border-flyd-sand focus:outline-none focus-visible:outline-none';

function StrekFelt({
  prefiks,
  name,
  label,
  feil,
  paakrevd,
  ...rest
}: {
  prefiks: string;
  name: string;
  label: string;
  feil?: string;
  paakrevd?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `${prefiks}-${name}`;
  return (
    <div>
      <label htmlFor={id} className={strekLabel}>
        {label}
        {paakrevd && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        aria-required={paakrevd || undefined}
        aria-invalid={feil ? true : undefined}
        aria-describedby={feil ? `${prefiks}-${name}-feil` : undefined}
        className={clsx(strekFelt, feil ? 'border-flyd-korall' : 'border-flyd-mint')}
        {...rest}
      />
    </div>
  );
}

function StrekFelter({ demo, prefiks }: { demo: ReturnType<typeof useDemo>; prefiks: string }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
        <StrekFelt prefiks={prefiks} name="name" label="Navn" paakrevd autoComplete="name" feil={demo.feil.name} />
        <StrekFelt prefiks={prefiks} name="bedrift" label="Bedrift" autoComplete="organization" />
        <StrekFelt prefiks={prefiks} name="email" type="email" label="E-post" paakrevd autoComplete="email" feil={demo.feil.email} />
        <StrekFelt prefiks={prefiks} name="phone" type="tel" label="Telefon" autoComplete="tel" />
      </div>
      <div className="mt-7">
        <label htmlFor={`${prefiks}-message`} className={strekLabel}>
          Melding<span aria-hidden="true"> *</span>
        </label>
        <textarea
          id={`${prefiks}-message`}
          name="message"
          rows={3}
          aria-required="true"
          aria-invalid={demo.feil.message ? true : undefined}
          aria-describedby={demo.feil.message ? `${prefiks}-message-feil` : undefined}
          placeholder={demo.hint}
          className={clsx(strekFelt, 'resize-none leading-relaxed', demo.feil.message ? 'border-flyd-korall' : 'border-flyd-mint')}
        />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------------- */
/* Variant A – rolig og stram                                                 */
/* ------------------------------------------------------------------------- */

/** Petrol-kort, temaene som små Mint-piller øverst, felt med understrek under hverandre. */
export function VariantStram() {
  const demo = useDemo();
  return (
    <div className="on-dark rounded-kort bg-flyd-petrol p-6 sm:p-8 md:p-10">
      {demo.sendt ? (
        <Takk demo={demo} mork />
      ) : (
        <form onSubmit={demo.onSubmit} noValidate>
          <Eyebrow as="h2" tone="petrol">
            Send oss en melding
          </Eyebrow>
          <fieldset className="mt-6">
            <legend className="text-[15px] font-medium text-flyd-sand">Hva gjelder det?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {temaValg.map((v) => (
                <label key={v.tema} className="cursor-pointer">
                  <input
                    type="radio"
                    name="topic"
                    value={v.tema}
                    checked={demo.tema === v.tema}
                    onChange={() => demo.setTema(v.tema)}
                    className="peer sr-only"
                  />
                  <span className="inline-flex rounded-pille border border-flyd-mint/70 px-3.5 py-1.5 text-[14px] text-flyd-sand transition-colors duration-200 hover:border-flyd-sand active:translate-y-[1px] peer-checked:border-flyd-mint peer-checked:bg-flyd-mint peer-checked:text-flyd-skog peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-flyd-mint">
                    {visning(v.setning)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-9">
            <StrekFelter demo={demo} prefiks="a" />
          </div>
          <FeilListe feil={demo.feil} mork prefiks="a" />
          <div className="mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
            <Samtykke mork />
            <Button type="submit" variant="primary-dark">
              <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Send melding
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Variant C – spørsmålet som overskrift                                      */
/* ------------------------------------------------------------------------- */

/**
 * Det beste fra samtaleskjemaet, nedtonet: bare åpningen er en setning
 * («Hei! Jeg vil gjerne snakke om …»), som overskrift på kortet. Resten er
 * vanlige felt med understrek, så det er lett å se hva som skal fylles ut.
 */
export function VariantSporsmal() {
  const demo = useDemo();
  const valgt = temaValg.find((v) => v.tema === demo.tema);
  return (
    <div className="on-dark rounded-kort bg-flyd-petrol p-6 sm:p-8 md:p-10">
      {demo.sendt ? (
        <Takk demo={demo} mork />
      ) : (
        <form onSubmit={demo.onSubmit} noValidate>
          <h2 className="font-display text-[24px] font-semibold leading-[1.6] text-flyd-dempet sm:text-[28px]">
            Hei! Jeg vil gjerne snakke om{' '}
            <span className="group/tema relative inline-block max-w-full align-baseline">
              <span
                aria-hidden="true"
                className={clsx(
                  'border-b-2 border-flyd-mint pb-0.5 transition-[border-color] duration-200 [box-decoration-break:clone] group-hover/tema:border-flyd-sand group-focus-within/tema:border-flyd-sand',
                  valgt ? 'text-flyd-sand' : 'text-flyd-mint',
                )}
              >
                {valgt?.setning ?? 'velg tema'}
                <ChevronDown className="ml-1 inline h-[0.65em] w-[0.65em] align-[-0.02em] text-flyd-mint" strokeWidth={2.25} />
              </span>
              .
              <label htmlFor="c-topic" className="sr-only">
                Hva gjelder henvendelsen?
              </label>
              <select
                id="c-topic"
                name="topic"
                value={demo.tema}
                onChange={(e) => demo.setTema(e.target.value)}
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
          </h2>
          <div className="mt-8 border-t border-flyd-sand/15 pt-8">
            <StrekFelter demo={demo} prefiks="c" />
          </div>
          <FeilListe feil={demo.feil} mork prefiks="c" />
          <div className="mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
            <Samtykke mork />
            <Button type="submit" variant="primary-dark">
              <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Send melding
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Variant B – delt kort                                                      */
/* ------------------------------------------------------------------------- */

const boksLabel = 'text-[15px] font-medium text-flyd-skog';
const boksFelt =
  'mt-2 w-full rounded-flis border bg-flyd-sand px-4 py-3 text-[16px] text-flyd-skog placeholder:text-flyd-skifer/85 transition-[border-color,box-shadow] duration-200 hover:border-flyd-petrol focus:border-flyd-teal focus:outline-none focus:ring-2 focus:ring-flyd-teal focus-visible:outline-none';

/**
 * Hele kontaktboksen i ett kort: Skog til venstre med telefon, e-post og
 * svartid, skjemaet på Lys mint til høyre. Da trenger siden ingen egen
 * venstrespalte, og alt om å ta kontakt står samlet.
 */
export function VariantDelt() {
  const demo = useDemo();
  const felt = (k: keyof Feil) => clsx(boksFelt, demo.feil[k] ? 'border-flyd-rust ring-1 ring-flyd-rust' : 'border-flyd-teal');
  const beskrevet = (k: keyof Feil) => (demo.feil[k] ? `b-${k}-feil` : undefined);
  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-kort lg:grid-cols-12">
      <div className="on-dark relative overflow-hidden bg-flyd-skog p-7 md:p-10 lg:col-span-5">
        {/* Flytlinjene fyller den tomme bunnen av Skog-flaten på desktop. */}
        <FlytLinjer tone="dark" className="!top-auto hidden h-64 opacity-40 lg:block" />
        <div className="relative">
          <Eyebrow tone="dark">Kontakt</Eyebrow>
          <h2 className="mt-5 font-display text-[32px] font-semibold leading-tight text-flyd-sand md:text-[38px]">Snakk med oss.</h2>
          <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-flyd-dempet">
            Fortell oss hva du trenger hjelp med, så finner vi riktig person. Vi svarer normalt innen én arbeidsdag.
          </p>
          <dl className="mt-10 space-y-6">
            <div className="flex gap-4">
              <dt>
                <FlydIcon name="telefon" className="mt-1 h-6 w-6 text-flyd-mint" />
                <span className="sr-only">Telefon</span>
              </dt>
              <dd>
                <a href="tel:+4748019958" className="font-display text-[20px] font-semibold text-flyd-sand decoration-flyd-mint decoration-2 underline-offset-[6px] hover:underline">
                  +47 480 19 958
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt>
                <FlydIcon name="epost" className="mt-1 h-6 w-6 text-flyd-mint" />
                <span className="sr-only">E-post</span>
              </dt>
              <dd className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <a href="mailto:support@flyd.no" className="font-display text-[20px] font-semibold text-flyd-sand decoration-flyd-mint decoration-2 underline-offset-[6px] hover:underline">
                  support@flyd.no
                </a>
                <KopierTekst tekst="support@flyd.no" etikett="Kopier e-postadressen" tone="mork" />
              </dd>
            </div>
            <div className="flex gap-4">
              <dt>
                <FlydIcon name="lokal" className="mt-1 h-6 w-6 text-flyd-mint" />
                <span className="sr-only">Kontorer</span>
              </dt>
              <dd className="text-[16px] leading-relaxed text-flyd-dempet">
                Seks kontorer i Sør-Vest-Norge.{' '}
                <a href="/kontor/" className="font-medium text-flyd-sand underline decoration-flyd-mint decoration-2 underline-offset-4 hover:decoration-flyd-sand">
                  Se kontorene
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-flyd-lysmint p-7 md:p-10 lg:col-span-7">
        {demo.sendt ? (
          <Takk demo={demo} mork={false} />
        ) : (
          <form onSubmit={demo.onSubmit} noValidate>
            <h3 className="font-display text-[24px] font-semibold text-flyd-skog">Send oss en melding</h3>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="b-topic" className={boksLabel}>
                  Hva gjelder det?
                </label>
                <div className="relative">
                  <select
                    id="b-topic"
                    name="topic"
                    value={demo.tema}
                    onChange={(e) => demo.setTema(e.target.value)}
                    className={clsx(boksFelt, 'cursor-pointer appearance-none border-flyd-teal pr-11', !demo.tema && 'text-flyd-skifer')}
                  >
                    <option value="">Velg tema</option>
                    {temaValg.map((v) => (
                      <option key={v.tema} value={v.tema}>
                        {visning(v.setning)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 mt-1 h-5 w-5 -translate-y-1/2 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                </div>
              </div>
              <div>
                <label htmlFor="b-name" className={boksLabel}>
                  Navn <span aria-hidden="true">*</span>
                </label>
                <input id="b-name" name="name" autoComplete="name" aria-required="true" aria-invalid={demo.feil.name ? true : undefined} aria-describedby={beskrevet('name')} className={felt('name')} />
              </div>
              <div>
                <label htmlFor="b-bedrift" className={boksLabel}>
                  Bedrift
                </label>
                <input id="b-bedrift" name="bedrift" autoComplete="organization" className={clsx(boksFelt, 'border-flyd-teal')} />
              </div>
              <div>
                <label htmlFor="b-email" className={boksLabel}>
                  E-post <span aria-hidden="true">*</span>
                </label>
                <input id="b-email" name="email" type="email" autoComplete="email" aria-required="true" aria-invalid={demo.feil.email ? true : undefined} aria-describedby={beskrevet('email')} className={felt('email')} />
              </div>
              <div>
                <label htmlFor="b-phone" className={boksLabel}>
                  Telefon
                </label>
                <input id="b-phone" name="phone" type="tel" autoComplete="tel" className={clsx(boksFelt, 'border-flyd-teal')} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="b-message" className={boksLabel}>
                  Melding <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="b-message"
                  name="message"
                  rows={4}
                  aria-required="true"
                  aria-invalid={demo.feil.message ? true : undefined}
                  aria-describedby={beskrevet('message')}
                  placeholder={demo.hint}
                  className={clsx(felt('message'), 'resize-none leading-relaxed')}
                />
              </div>
            </div>
            <FeilListe feil={demo.feil} mork={false} prefiks="b" />
            <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
              <Samtykke mork={false} />
              <Button type="submit" variant="primary">
                <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Send melding
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
