import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Minus } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import ClosingCta from '@/components/ClosingCta';
import Breadcrumbs from '@/components/Breadcrumbs';
import Bekreft, { UtkastBanner } from '@/components/Bekreft';
import JsonLd from '@/components/JsonLd';
import FlydIcon from '@/components/FlydIcon';
import { ButtonLink } from '@/components/Button';
import { siteUrl } from '@/lib/seo';
import { visUtkast } from '@/lib/utkast';
import { visibleErpSystems, erpUrl, type ErpSystem } from '@/data/services';

const kontakt = `/kontakt?tema=${encodeURIComponent('programvare / erp')}`;

/**
 * Mal for ett ERP-system (/tjenester/erp/[slug]/). Innholdet kommer fra
 * erpSystems i data/services.ts. Vurderingen (styrker, svakheter,
 * innføringstid) skal skrives av Flyds konsulenter – ikke kopieres fra
 * leverandøren. Lisenspriser lenkes til leverandørens egen prisside.
 */
export default function ErpMal({ system: e }: { system: ErpSystem }) {
  const utkast = e.status === 'utkast';
  const mangler = (hva: string) => (utkast && visUtkast ? <Bekreft>{hva}</Bekreft> : null);
  const andre = visibleErpSystems.filter((o) => o.slug !== e.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}${erpUrl(e)}#service`,
    name: `${e.name}: valg, innføring og integrasjoner`,
    description: e.description,
    url: `${siteUrl}${erpUrl(e)}`,
    serviceType: 'ERP-rådgivning og implementering',
    provider: { '@id': `${siteUrl}/#organization` },
    isRelatedTo: { '@id': `${siteUrl}/tjenester/erp/#service` },
  };

  return (
    <>
      {utkast && <UtkastBanner />}
      <JsonLd data={jsonLd} />

      <Section tone="sand" className="pt-10 md:pt-14">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Tjenester', href: '/tjenester/' },
              { name: 'ERP', href: '/tjenester/erp/' },
              { name: e.name, href: erpUrl(e) },
            ]}
          />
          <div className="mt-10 max-w-4xl">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-flis bg-flyd-lysmint text-flyd-teal">
                <FlydIcon name={e.icon} className="h-7 w-7" />
              </span>
              <Eyebrow>ERP-system · {e.tagline}</Eyebrow>
            </div>
            <h1 className="mt-6 font-display text-display-xl font-semibold">{e.name}</h1>
            <span aria-hidden="true" className="aksentlinje mt-6 block h-1 w-24 rounded-pille bg-flyd-teal" />
            <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-petrol">{e.description}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href={kontakt} variant="primary" withArrow>
                Snakk med oss
              </ButtonLink>
              <ButtonLink href="/tjenester/erp/" variant="secondary">
                Slik velger vi system
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="lysmint">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>Passer for</Eyebrow>
              <h2 className="mt-5 font-display text-display-md font-semibold">
                Hvem {e.name} passer for
              </h2>
              {e.passerFor ? (
                <p className="mt-6 text-[17px] leading-[1.7] text-flyd-skifer">{e.passerFor}</p>
              ) : (
                <div className="mt-6">{mangler(`hvem ${e.name} passer for, med konsulentenes ord`)}</div>
              )}
            </div>
            <div className="stagger grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              <div data-reveal className="rounded-kort bg-flyd-sand p-7">
                <h3 className="font-display text-[20px] font-semibold">Styrker</h3>
                {e.styrker?.length ? (
                  <ul className="mt-4 space-y-3">
                    {e.styrker.map((x) => (
                      <li key={x} className="flex gap-3 text-[16px] text-flyd-skog">
                        <Check className="mt-1 h-4 w-4 flex-shrink-0 text-flyd-teal" strokeWidth={2.5} aria-hidden="true" />
                        {x}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-4">{mangler('styrker')}</div>
                )}
              </div>
              <div data-reveal style={{ '--i': 1 } as React.CSSProperties} className="rounded-kort bg-flyd-sand p-7">
                <h3 className="font-display text-[20px] font-semibold">Svakheter</h3>
                {e.svakheter?.length ? (
                  <ul className="mt-4 space-y-3">
                    {e.svakheter.map((x) => (
                      <li key={x} className="flex gap-3 text-[16px] text-flyd-skog">
                        <Minus className="mt-1 h-4 w-4 flex-shrink-0 text-flyd-teal" strokeWidth={2.5} aria-hidden="true" />
                        {x}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-4">{mangler('svakheter, sagt like ærlig')}</div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="petrol">
        <Container>
          <div className="stagger grid grid-cols-1 gap-10 md:grid-cols-3">
            <div data-reveal>
              <Eyebrow tone="petrol">Innføring</Eyebrow>
              {e.innforing ? (
                <p className="mt-4 text-[17px] leading-relaxed text-flyd-sand">{e.innforing}</p>
              ) : (
                <div className="mt-4">{mangler('typisk innføringstid og hva den avhenger av')}</div>
              )}
            </div>
            <div data-reveal style={{ '--i': 1 } as React.CSSProperties}>
              <Eyebrow tone="petrol">Integrasjoner vi har bygget</Eyebrow>
              {e.integrasjoner?.length ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {e.integrasjoner.map((x) => (
                    <li key={x} className="rounded-pille border border-flyd-mint px-3 py-1.5 text-[14px] text-flyd-sand">
                      {x}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4">{mangler('integrasjoner Flyd har bygget mot systemet')}</div>
              )}
            </div>
            <div data-reveal style={{ '--i': 2 } as React.CSSProperties}>
              <Eyebrow tone="petrol">Lisenspris</Eyebrow>
              {e.prisside ? (
                <a
                  href={e.prisside}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[17px] font-medium text-flyd-sand underline decoration-flyd-mint decoration-2 underline-offset-4 hover:text-flyd-mint"
                >
                  Se prisene hos {e.name}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </a>
              ) : (
                <div className="mt-4">{mangler(`lenke til prissiden hos ${e.name}`)}</div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {andre.length > 0 && (
        <Section tone="sand">
          <Container>
            <div className="max-w-3xl" data-reveal>
              <Eyebrow>Andre systemer</Eyebrow>
              <h2 className="mt-5 font-display text-display-md font-semibold">Vurderer du noe annet?</h2>
            </div>
            <ul className="stagger mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
              {andre.map((o, i) => (
                <li key={o.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                  <Link
                    href={erpUrl(o)}
                    className="lenkekort flex h-full items-center gap-4 rounded-kort bg-flyd-lysmint p-5 hover:bg-flyd-linje-mint"
                  >
                    <FlydIcon name={o.icon} className="h-6 w-6 flex-shrink-0 text-flyd-teal" />
                    <span className="flex-1 font-display text-[18px] font-semibold">{o.name}</span>
                    <ArrowRight className="lenkekort-pil h-5 w-5 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <ClosingCta
        kicker="Systemvalg"
        title={`Usikker på om ${e.name} er riktig for dere?`}
        text="Vi selger ikke ett system. Vi hjelper deg å velge det som passer, og får det til å virke."
        primary={{ href: kontakt, label: 'Snakk med oss' }}
      />
    </>
  );
}
