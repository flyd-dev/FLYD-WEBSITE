import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import { pageMetadata, siteUrl } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import ClosingCta from '@/components/ClosingCta';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import Kontorkart from '@/components/Kontorkart';
import { ButtonLink, TextLink } from '@/components/Button';
import { offices, officeLabel } from '@/data/offices';
import { kontorBlokker, regionTjenester, hubFaq } from '@/data/kontoroversikt';
import { revisjonOmtale } from '@/data/revisjon';

export const metadata: Metadata = pageMetadata({
  absoluteTitle: 'Regnskapsfører i Rogaland og Agder – seks kontorer · Flyd',
  description:
    'Autorisert regnskapsfører med kontor i Sandnes, Egersund, Sokndal, Moi, Sirdal og Flekkefjord. Regnskap, lønn og Tripletex. Ett nummer.',
  path: '/kontor/',
});

/**
 * Kontoroversikten (/kontor/): regional side for «regnskapsfører i Rogaland»
 * som sender videre til kontorsidene. Adresser og bilder kommer fra
 * data/offices.ts, teksten fra data/kontoroversikt.ts.
 *
 * Fire deler: toppen (regnskapsfører og revisor side om side), kontorene,
 * tjenestene og spørsmål og svar. Autorisasjonen og bytte står som spørsmål,
 * ikke som egne seksjoner.
 *
 * Kortene bruker små utgaver av fasadebildene (public/kontor/kort/, 720 px
 * bred), ellers laster siden nesten 1 MB bilder på mobil.
 *
 * Kontorene står fullt beskrevet i layoutens @graph. Her refereres de bare
 * med @id som `department`, så de ikke dupliseres.
 */
/** Lenketekst med pil, der siste ord og pilen aldri skilles når teksten brytes. */
function PilLenketekst({ tekst }: { tekst: string }) {
  const ord = tekst.split(' ');
  const siste = ord.pop();
  const strek = 'underline decoration-flyd-teal decoration-2 underline-offset-[5px]';
  return (
    <>
      {ord.length > 0 && <span className={strek}>{ord.join(' ')} </span>}
      <span className="whitespace-nowrap">
        <span className={strek}>{siste}</span>
        <ArrowRight className="lenkekort-pil ml-1.5 inline-block h-4 w-4 align-[-0.2em]" strokeWidth={2} aria-hidden="true" />
      </span>
    </>
  );
}

export default function KontorerPage() {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'AccountingService'],
    '@id': `${siteUrl}/#organization`,
    department: offices.map((o) => ({ '@id': `${siteUrl}/#office-${o.city.toLowerCase()}` })),
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Rogaland' },
      { '@type': 'AdministrativeArea', name: 'Agder' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hubFaq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const brod = 'text-[17px] leading-[1.7] text-flyd-skifer';
  const lenke =
    'font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 transition-colors duration-200 hover:text-flyd-skog hover:decoration-flyd-skog';

  return (
    <>
      <JsonLd data={orgJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* HERO */}
      <Section tone="sand" className="pt-10 md:pt-14">
        <Container>
          <Breadcrumbs items={[{ name: 'Kontorer', href: '/kontor/' }]} />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>Kontorer</Eyebrow>
            <h1 className="mt-6 font-display text-display-xl font-semibold">Seks kontorer. Ett nummer.</h1>
            <span aria-hidden="true" className="aksentlinje mt-6 block h-1 w-24 rounded-pille bg-flyd-teal" />
          </div>
          {/* Regnskapsfører og revisor side om side, hver for seg (Irene 22.10.2026). */}
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-[24px] font-semibold leading-tight">Regnskapsfører</h2>
              <p className={`mt-3 ${brod}`}>
                Flyd er autorisert regnskapsfører for bedrifter i Rogaland og Agder, med seks kontorer: Sandnes
                (Forus), Egersund, Sokndal, Moi, Sirdal og Flekkefjord. Vi tar regnskap, lønn, årsoppgjør og
                rådgivning, og hjelper deg med Tripletex og andre regnskapssystemer. Ett nummer gjelder for alle
                kontorene:{' '}
                <a
                  href="tel:+4748019958"
                  className={`whitespace-nowrap ${lenke}`}
                >
                  +47 480 19 958
                </a>
                .
              </p>
            </div>
            <div>
              <h2 className="font-display text-[24px] font-semibold leading-tight">Revisor</h2>
              <p className={`mt-3 ${brod}`}>{revisjonOmtale}</p>
              <div className="mt-5">
                <TextLink href="/tjenester/revisjon/">Les om revisjon</TextLink>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/kontakt" variant="primary" withArrow>
              Snakk med oss
            </ButtonLink>
            <ButtonLink href="tel:+4748019958" variant="secondary" external>
              Ring oss
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* KONTORENE – hele kortet lenker til kontorsiden */}
      <Section tone="sand" className="!pt-0">
        <Container>
          <div className="grid grid-cols-1 gap-10 border-t border-flyd-linje-sand pt-12 md:pt-16 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>Kontorene</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">Finn kontoret nærmest deg</h2>
              <p className={`mt-6 ${brod}`}>
                Fra Forus i nord til Flekkefjord i sør. Samme tjenester og samme fagmiljø, uansett hvilket
                kontor du hører til.
              </p>
            </div>
            <Kontorkart className="lg:col-span-7" />
          </div>
          <ul className="stagger mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {offices.map((o, i) => {
              const k = kontorBlokker[o.slug];
              return (
                <li key={o.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                  {/* Kompakt rad på mobil (lite bilde til venstre), stort kort fra nettbrett. */}
                  <Link
                    href={`/kontor/${o.slug}/`}
                    className="lys lenkekort group flex h-full flex-row gap-4 rounded-kort bg-flyd-lysmint p-3 hover:bg-flyd-linje-mint sm:flex-col sm:gap-0"
                  >
                    <div className="relative aspect-[4/3] w-28 flex-shrink-0 overflow-hidden rounded-flis bg-flyd-linje-mint sm:aspect-[3/2] sm:w-auto">
                      {o.image && (
                        <div className="rull-zoom absolute inset-0">
                          <Image
                            src={o.image.src.replace('/kontor/', '/kontor/kort/')}
                            alt={o.image.alt}
                            fill
                            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 112px"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                          />
                        </div>
                      )}
                    </div>
                    {/* Bare navn og område: adressen står på kontorsiden, i footeren og i spørsmålene under. */}
                    <div className="flex min-w-0 flex-1 flex-col py-1 pr-1 sm:px-3 sm:pb-3 sm:pt-5">
                      <h3 className="font-display text-[18px] font-semibold leading-tight sm:text-[22px]">{officeLabel(o)}</h3>
                      {k && <p className="mt-1.5 text-[14px] leading-snug text-flyd-skifer sm:mt-2 sm:text-[15px] sm:leading-relaxed">{k.omrade}</p>}
                      <span className="mt-auto block pt-3 text-[14px] font-medium leading-snug text-flyd-petrol sm:pt-5 sm:text-[15px]">
                        <PilLenketekst tekst={k?.lenketekst ?? 'Til kontoret'} />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* TJENESTER – Petrol som seksjonsskille */}
      <Section tone="petrol" flyt>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow tone="petrol">Tjenester</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">
                Hva vi gjør for bedrifter i regionen
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.65] text-flyd-dempet">
                Samme tjenester, samme fagmiljø og samme systemer på alle seks kontorene. Regnskapsførere og
                systemkonsulenter sitter i samme hus, så vi kan hjelpe deg med selve systemet regnskapet
                føres i, ikke bare med føringen.
              </p>
              <div className="mt-8">
                <ButtonLink href="/tjenester/" variant="secondary-dark" withArrow>
                  Utforsk alle tjenester
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-7" data-reveal>
              <ul className="border-t border-flyd-sand/15">
                {regionTjenester.map((t) => (
                  <li key={t.title}>
                    <Link
                      href={t.href}
                      className="group flex items-start justify-between gap-4 border-b border-flyd-sand/15 py-5 transition-colors"
                    >
                      <span>
                        <span className="block font-display text-[19px] font-semibold text-flyd-sand transition-colors duration-200 group-hover:text-flyd-mint">
                          {t.title}
                        </span>
                        <span className="mt-1.5 block text-[16px] leading-relaxed text-flyd-dempet">{t.text}</span>
                      </span>
                      <ArrowRight
                        className="mt-1 h-5 w-5 flex-shrink-0 text-flyd-mint transition-transform duration-200 group-hover:translate-x-1"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* SPØRSMÅL – kontorene, autorisasjonen (regnskap og revisjon hver for seg) og bytte */}
      <Section tone="lysmint">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>Spørsmål og svar</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">Ofte stilte spørsmål</h2>
            </div>
            <div className="space-y-3 lg:col-span-7" data-reveal>
              {hubFaq.map((f) => (
                <details key={f.q} className="faq group rounded-flis bg-flyd-sand px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-flis py-5 font-display text-[18px] font-semibold text-flyd-skog transition-colors duration-200 hover:text-flyd-petrol">
                    <span className="min-w-0 break-words max-sm:hyphens-auto">{f.q}</span>
                    <Plus className="faq-pil h-5 w-5 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                  </summary>
                  <div className="faq-svar space-y-4 pb-6">
                    <p className="text-[16px] leading-relaxed text-flyd-skifer">{f.a}</p>
                    {f.lenke && <TextLink href={f.lenke.href}>{f.lenke.tekst}</TextLink>}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <ClosingCta
        kicker="Kontakt"
        title="Usikker på hvilket kontor som passer?"
        text="Ring oss eller send en melding, så setter vi deg i kontakt med riktig person."
      />
    </>
  );
}
