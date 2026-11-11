import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import Breadcrumbs from '@/components/Breadcrumbs';
import ClosingCta from '@/components/ClosingCta';
import JsonLd from '@/components/JsonLd';
import KundehistorieKort from '@/components/KundehistorieKort';
import { TextLink } from '@/components/Button';
import { UtkastBanner } from '@/components/Bekreft';
import { pageMetadata, siteUrl } from '@/lib/seo';
import {
  getKundehistorie,
  kundehistoriePath,
  kundehistorier,
  kundehistorierPath,
} from '@/data/kundehistorier';

type Props = { params: { slug: string } };

// Bare historiene som vises nå (utkast finnes ikke i produksjonsbygget).
export const dynamicParams = false;
export function generateStaticParams() {
  return kundehistorier.map((h) => ({ slug: h.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const h = getKundehistorie(params.slug);
  if (!h) return {};
  const base = pageMetadata({ title: h.tittel, description: h.ingress, path: kundehistoriePath(h) });
  return {
    ...base,
    openGraph: { ...base.openGraph, type: 'article', publishedTime: h.published, modifiedTime: h.modified },
    ...(h.status === 'utkast' ? { robots: { index: false, follow: false } } : {}),
  };
}

// Lange sammensatte ord i tittelen får myk bindestrek der den vises, ikke i data/.
const delbar = (t: string) => t.replace('Laboratorium', 'Labora­torium').replace('administrasjonen', 'administra­sjonen');

const lenke =
  'font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors duration-200 hover:text-flyd-skog hover:decoration-flyd-skog';

// Farget topplinje over tallene, som i nøkkeltallene (StatsSection).
const topplinjer = ['bg-flyd-teal', 'bg-flyd-korall', 'bg-flyd-mint'];

/** Én kundehistorie. Teksten står i data/kundehistorier.ts. */
export default function KundehistoriePage({ params }: Props) {
  const h = getKundehistorie(params.slug);
  if (!h) notFound();

  const path = kundehistoriePath(h);
  const url = `${siteUrl}${path}`;
  const andre = kundehistorier.filter((x) => x.slug !== h.slug).slice(0, 3);

  // Forfatter er utelatt med vilje, som på artiklene.
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: h.tittel,
    description: h.ingress,
    url,
    mainEntityOfPage: url,
    inLanguage: 'nb-NO',
    datePublished: h.published,
    dateModified: h.modified,
    about: { '@type': 'Organization', name: h.kunde },
    publisher: { '@id': `${siteUrl}/#organization` },
  };

  return (
    <>
      {h.status === 'utkast' && <UtkastBanner />}
      <JsonLd data={articleJsonLd} />

      {/* TOPP */}
      <Section tone="sand" className="pt-10 md:pt-14">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Om Flyd', href: '/om-flyd/' },
              { name: 'Kundehistorier', href: kundehistorierPath },
              { name: h.kunde, href: path },
            ]}
          />
          <div className="mt-10 max-w-4xl">
            <Eyebrow>Kundehistorie · {h.bransje}</Eyebrow>
            <h1 className="mt-6 font-display text-display-lg font-semibold">{delbar(h.tittel)}</h1>
            <span aria-hidden="true" className="aksentlinje mt-6 block h-1 w-24 rounded-pille bg-flyd-teal" />
            <p className="mt-8 max-w-3xl font-display text-ingress font-medium text-flyd-petrol">{h.ingress}</p>
          </div>
        </Container>
      </Section>

      {/* HISTORIEN + FAKTA */}
      <Section tone="sand" className="!pt-0">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              {h.tall && (
                <div className="mb-12 grid grid-cols-2 gap-6 md:gap-8">
                  {h.tall.map((t, i) => (
                    <div key={t.tekst}>
                      <span
                        aria-hidden="true"
                        className={`block h-1 w-full rounded-pille ${topplinjer[i % topplinjer.length]}`}
                      />
                      <p className="mt-5 font-display text-[clamp(1.75rem,4.4vw,3.25rem)] font-semibold leading-none tracking-[-0.01em] text-flyd-petrol">
                        {t.verdi}
                      </p>
                      <p className="mt-2 text-[15px] leading-snug text-flyd-skifer">{t.tekst}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-6">
                {h.avsnitt.map((a) => (
                  <p key={a} className="text-[17px] leading-[1.7] text-flyd-skifer">
                    {a}
                  </p>
                ))}
              </div>

              {h.kilder && (
                <div className="mt-12 border-t border-flyd-linje-sand pt-8">
                  <Eyebrow as="h2">Les også</Eyebrow>
                  <ul className="mt-5 space-y-4">
                    {h.kilder.map((k) => (
                      <li key={k.href} className="text-[16px] leading-[1.6] text-flyd-skifer">
                        <a href={k.href} target="_blank" rel="noopener noreferrer" className={lenke}>
                          {k.tittel}
                          <ArrowUpRight
                            className="ml-1 inline-block h-4 w-4 align-[-0.15em]"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                          <span className="sr-only"> (åpnes i nytt vindu)</span>
                        </a>
                        <span className="block text-[15px]">Hos {k.hos}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Faktakortet står først på mobil, til høyre fra lg. */}
            <aside aria-label={`Kort om ${h.kunde}`} className="order-first lg:order-none lg:col-span-4 lg:col-start-9">
              <div className="rounded-kort bg-flyd-lysmint p-3 lg:sticky lg:top-28">
                <div className="flex aspect-[16/8] items-center justify-center rounded-flis bg-flyd-sand px-8">
                  <Image
                    src={h.logo.src}
                    alt={h.logo.alt}
                    width={240}
                    height={96}
                    priority
                    sizes="240px"
                    className="h-12 w-auto max-w-[70%] object-contain mix-blend-multiply md:h-14"
                  />
                </div>
                <dl className="px-4 pb-2 pt-3 text-[16px]">
                  {[
                    { navn: 'Kunde', verdi: h.kunde },
                    { navn: 'Bransje', verdi: h.bransje },
                    { navn: 'Sted', verdi: h.sted },
                  ].map((r) => (
                    <div key={r.navn} className="flex items-baseline justify-between gap-6 border-b border-flyd-linje-mint py-3.5">
                      <dt className="text-[15px] text-flyd-skifer">{r.navn}</dt>
                      <dd className="text-right font-medium text-flyd-skog">{r.verdi}</dd>
                    </div>
                  ))}
                  <div className="py-3.5">
                    <dt className="text-[15px] text-flyd-skifer">Flyd leverer</dt>
                    <dd className="mt-2">
                      <ul className="space-y-1.5">
                        {h.leveranse.map((l) => (
                          <li key={l.label} className="font-medium text-flyd-skog">
                            {l.href ? (
                              <Link href={l.href} className={lenke}>
                                {l.label}
                              </Link>
                            ) : (
                              l.label
                            )}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* SITATET – Petrol som seksjonsskille */}
      {h.sitat && (
        <Section tone="petrol" flyt>
          <Container>
            <figure className="max-w-4xl" data-reveal>
              <Eyebrow tone="petrol">Med kundens ord</Eyebrow>
              <blockquote className="mt-8 border-l-4 border-flyd-korall pl-6 font-display text-[clamp(1.375rem,2.4vw,2rem)] font-medium leading-[1.35] text-flyd-sand md:pl-8">
                «{h.sitat.tekst}»
              </blockquote>
              <figcaption className="mt-8 pl-7 md:pl-9">
                <span className="block font-medium text-flyd-sand">{h.sitat.navn}</span>
                <span className="block text-[15px] text-flyd-dempet">{h.sitat.rolle}</span>
              </figcaption>
            </figure>
          </Container>
        </Section>
      )}

      {/* FLERE HISTORIER */}
      {andre.length > 0 && (
        <Section tone="lysmint">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4" data-reveal>
              <div>
                <Eyebrow>Flere kundehistorier</Eyebrow>
                <h2 className="mt-5 font-display text-display-md font-semibold">Andre vi jobber med</h2>
              </div>
              <TextLink href={kundehistorierPath}>Se alle kundehistoriene</TextLink>
            </div>
            <ul className="stagger mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {andre.map((x, i) => (
                <li key={x.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                  <KundehistorieKort h={x} overskrift="h3" tone="sand" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <ClosingCta
        kicker="Din bedrift"
        title="Skal vi se på hva vi kan gjøre for dere?"
        text="Ta kontakt, så tar vi en prat om hvor dere er i dag og hva som kan bli enklere."
        secondary={{ href: kundehistorierPath, label: 'Flere kundehistorier' }}
      />
    </>
  );
}
