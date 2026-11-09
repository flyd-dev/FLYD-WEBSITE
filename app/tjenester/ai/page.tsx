import type { Metadata } from 'next';
import { Fragment } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Check, Plus } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import Breadcrumbs from '@/components/Breadcrumbs';
import NumberedList from '@/components/NumberedList';
import FlydIcon from '@/components/FlydIcon';
import AiSamtale from '@/components/AiSamtale';
import ClosingCta from '@/components/ClosingCta';
import JsonLd from '@/components/JsonLd';
import Bekreft, { UtkastBanner } from '@/components/Bekreft';
import { ButtonLink } from '@/components/Button';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { visUtkast } from '@/lib/utkast';
import { serviceUrl, visibleServices } from '@/data/services';
import { ai } from '@/data/ai';

/**
 * AI og automatisering har egen side i stedet for TjenesteMal: et rent AI-budskap
 * til kampanjen, med illustrasjon i toppen, tjenestene, vår egen AI og spørsmål og
 * svar. Tekstene står i data/ai.ts. Siden er utkast til status settes til
 * `publisert` i data/services.ts; da forsvinner også sjekklisten nederst.
 */
const tjeneste = visibleServices.find((s) => s.slug === 'ai');
const utkast = tjeneste?.status === 'utkast';

export const metadata: Metadata = {
  ...pageMetadata({
    title: ai.meta.title,
    description: ai.meta.description,
    path: '/tjenester/ai/',
  }),
  ...(utkast ? { robots: { index: false, follow: false } } : {}),
};

export default function AiPage() {
  if (!tjeneste) notFound();
  const kontakt = `/kontakt?tema=${encodeURIComponent(tjeneste.tema.toLowerCase())}`;
  const visSjekk = utkast && visUtkast;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}${serviceUrl(tjeneste)}#service`,
    name: tjeneste.title,
    description: tjeneste.short,
    url: `${siteUrl}${serviceUrl(tjeneste)}`,
    provider: { '@id': `${siteUrl}/#organization` },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Rogaland' },
      { '@type': 'AdministrativeArea', name: 'Agder' },
    ],
    subjectOf: {
      '@type': 'FAQPage',
      mainEntity: ai.faq.sporsmal.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  };

  return (
    <>
      {utkast && <UtkastBanner />}
      <JsonLd data={serviceJsonLd} />

      {/* TOPP: budskapet til venstre, en AI-samtale som illustrasjon til høyre */}
      <Section tone="sand" className="pt-10 md:pt-14">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Tjenester', href: '/tjenester/' },
              { name: tjeneste.title, href: serviceUrl(tjeneste) },
            ]}
          />
          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>{ai.topp.kicker}</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">{ai.topp.tittel}</h1>
              <span aria-hidden="true" className="aksentlinje mt-6 block h-1 w-24 rounded-pille bg-flyd-teal" />
              <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-petrol">{ai.topp.ingress}</p>
              <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-flyd-skifer">{ai.topp.tekst}</p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink href={kontakt} variant="primary" withArrow>
                  Snakk med oss
                </ButtonLink>
                <ButtonLink href="tel:+4748019958" variant="secondary" external>
                  Ring +47 480 19 958
                </ButtonLink>
              </div>
            </div>
            {/* Folkene først, samtalen over nedre del av bildet (der skjermen står i forgrunnen). */}
            <div className="lg:col-span-5">
              {tjeneste.image && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-bilde bg-flyd-lysmint">
                  <Image
                    src={tjeneste.image.src}
                    alt={tjeneste.image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <AiSamtale
                etikett={ai.samtale.etikett}
                meldinger={ai.samtale.meldinger}
                className={
                  tjeneste.image
                    ? 'relative -mt-10 ml-5 ring-[6px] ring-flyd-sand sm:-mt-14 sm:ml-20 lg:-ml-10 lg:mr-12'
                    : undefined
                }
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* PROBLEMET – Petrol som seksjonsskille */}
      <Section tone="petrol" flyt>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow tone="petrol">{ai.problem.kicker}</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">{ai.problem.tittel}</h2>
            </div>
            <div className="lg:col-span-7 lg:pt-10" data-reveal>
              <p className="max-w-2xl text-[17px] leading-[1.65] text-flyd-dempet">{ai.problem.tekst}</p>
              <blockquote className="mt-10 max-w-2xl border-l-2 border-flyd-mint pl-6 font-display text-[22px] font-medium leading-[1.4] text-flyd-sand md:text-[26px]">
                {ai.problem.sitat}
              </blockquote>
              <p className="mt-8 text-[17px] font-medium text-flyd-sand">{ai.problem.avslutning}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* TJENESTENE – seks kort, ikonene fra Flyds ikonsett */}
      <Section tone="lysmint">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>{ai.tjenester.kicker}</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">{ai.tjenester.tittel}</h2>
          </div>
          <ul className="stagger mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {ai.tjenester.punkter.map((p, i) => (
              <li
                key={p.tittel}
                data-reveal
                style={{ '--i': i } as React.CSSProperties}
                className="flex flex-col rounded-kort bg-flyd-sand p-7"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-flis bg-flyd-lysmint text-flyd-teal">
                  <FlydIcon name={p.ikon} className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-[22px] font-semibold leading-tight">{p.tittel}</h3>
                <p className="mt-3 text-[16px] leading-[1.6] text-flyd-skifer">{p.tekst}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* HVORFOR FLYD */}
      <Section tone="sand">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>{ai.hvorfor.kicker}</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">{ai.hvorfor.tittel}</h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-flyd-skifer">{ai.hvorfor.tekst}</p>
            </div>
            <div className="lg:col-span-7">
              <NumberedList
                icons={ai.hvorfor.punkter.map((p) => p.ikon)}
                items={ai.hvorfor.punkter.map((p) => (
                  <Fragment key={p.tittel}>
                    <strong className="block font-display text-[20px] font-semibold leading-tight">{p.tittel}</strong>
                    <span className="mt-2 block text-[16px] text-flyd-skifer">{p.tekst}</span>
                  </Fragment>
                ))}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* VÅR EGEN AI – mørk flate, et eksempel på flyten til høyre */}
      <Section tone="skog" flyt>
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6" data-reveal>
              <Eyebrow tone="dark">{ai.egenAi.kicker}</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">{ai.egenAi.tittel}</h2>
              {ai.egenAi.tekst.map((t) => (
                <p key={t} className="mt-6 max-w-xl text-[17px] leading-[1.65] text-flyd-dempet">
                  {t}
                </p>
              ))}
              <div className="mt-10">
                <ButtonLink href={kontakt} variant="secondary-dark">
                  {ai.egenAi.lenke}
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-6" data-reveal>
              <div className="rounded-bilde bg-flyd-petrol/70 p-5 sm:p-7">
                <p className="text-[15px] font-medium text-flyd-dempet">{ai.egenAi.flyt.tittel}</p>
                <ol className="mt-5 space-y-2">
                  {ai.egenAi.flyt.steg.map((s, i) => {
                    const siste = i === ai.egenAi.flyt.steg.length - 1;
                    return (
                      <li
                        key={s.tekst}
                        className={
                          siste
                            ? 'flex items-center justify-between gap-4 rounded-flis bg-flyd-sand px-5 py-4 text-flyd-skog'
                            : 'flex items-center justify-between gap-4 rounded-flis bg-flyd-skog px-5 py-4 text-flyd-sand'
                        }
                      >
                        <span className="text-[16px] leading-snug">{s.tekst}</span>
                        <span
                          className={`inline-flex flex-shrink-0 items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] ${
                            siste ? 'text-flyd-petrol' : 'text-flyd-mint'
                          }`}
                        >
                          {siste && <Check aria-hidden="true" strokeWidth={2.5} className="h-3.5 w-3.5" />}
                          {s.merke}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* SLIK JOBBER VI – fire steg med farget topplinje */}
      <Section tone="lysmint">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>{ai.prosess.kicker}</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">{ai.prosess.tittel}</h2>
          </div>
          <ol className="stagger mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {ai.prosess.steg.map((s, i) => (
              <li
                key={s.tittel}
                data-reveal
                style={{ '--i': i } as React.CSSProperties}
                className="border-t-2 border-flyd-teal pt-6"
              >
                <span aria-hidden="true" className="font-display text-[24px] font-semibold leading-none tabular-nums text-flyd-rust">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-[20px] font-semibold leading-tight">{s.tittel}</h3>
                <p className="mt-2 text-[16px] leading-[1.6] text-flyd-skifer">{s.tekst}</p>
              </li>
            ))}
          </ol>
          {visSjekk && (
            <Bekreft className="mt-16 max-w-3xl">
              kundecase her – navn, utfordring, løsning og resultat, med kundens samtykke og tall som kan
              dokumenteres. Seksjonen legges inn når casen er klar.
            </Bekreft>
          )}
        </Container>
      </Section>

      {/* SPØRSMÅL OG SVAR */}
      <Section tone="sand">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>{ai.faq.kicker}</Eyebrow>
              <h2 className="mt-5 font-display text-display-md font-semibold">{ai.faq.tittel}</h2>
            </div>
            <div className="lg:col-span-7" data-reveal>
              <div className="border-t border-flyd-linje-sand">
                {ai.faq.sporsmal.map((f) => (
                  <details key={f.q} className="faq group border-b border-flyd-linje-sand">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-flis py-5 font-display text-[18px] font-semibold text-flyd-skog transition-colors duration-200 hover:text-flyd-petrol">
                      <span className="min-w-0 break-words max-sm:hyphens-auto">{f.q}</span>
                      <Plus className="faq-pil h-5 w-5 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                    </summary>
                    <p className="faq-svar pb-6 text-[16px] leading-relaxed text-flyd-skifer">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* SJEKKLISTE – bare på utkastet */}
      {visSjekk && (
        <Section tone="lysmint" size="sm">
          <Container>
            <div className="max-w-3xl">
              <Eyebrow>Internt – vises ikke på flyd.no</Eyebrow>
              <h2 className="mt-5 font-display text-display-md font-semibold">Må sjekkes før siden publiseres</h2>
              <ul className="mt-8 space-y-3">
                {ai.sjekkliste.map((punkt) => (
                  <li key={punkt}>
                    <Bekreft>{punkt}</Bekreft>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      )}

      <ClosingCta
        kicker={ai.avslutning.kicker}
        title={ai.avslutning.tittel}
        text={ai.avslutning.tekst}
        primary={{ href: kontakt, label: 'Snakk med oss' }}
      />
    </>
  );
}
