import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Plus } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import ClosingCta from '@/components/ClosingCta';
import Breadcrumbs from '@/components/Breadcrumbs';
import Bekreft, { UtkastBanner } from '@/components/Bekreft';
import JsonLd from '@/components/JsonLd';
import FlydIcon from '@/components/FlydIcon';
import { ButtonLink } from '@/components/Button';
import { ServiceTile } from '@/components/ServiceIcon';
import ProcessCards from '@/components/ProcessCards';
import { process } from '@/data/process';
import { siteUrl } from '@/lib/seo';
import { visUtkast } from '@/lib/utkast';
import {
  visibleServices,
  visibleErpSystems,
  erpSystems,
  erpComparisonStatus,
  erpUrl,
  serviceUrl,
  type Service,
} from '@/data/services';
import { leadership, officeLeads, otherTeam } from '@/data/team';

const lc = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/**
 * Mal for én tjeneste (/tjenester/[slug]/). Innholdet kommer fra
 * data/services.ts. Seksjoner uten innhold vises ikke på publiserte sider;
 * på utkast står det en [BEKREFT]-merknad der innholdet mangler.
 */
export default function TjenesteMal({ service: s }: { service: Service }) {
  const utkast = s.status === 'utkast';
  const mangler = (hva: string) => (utkast && visUtkast ? <Bekreft>{hva}</Bekreft> : null);
  const kontakt = `/kontakt?tema=${encodeURIComponent(s.tema.toLowerCase())}`;
  const fagperson = s.fagperson
    ? [...leadership, ...officeLeads, ...otherTeam].find((m) => m.name === s.fagperson)
    : undefined;
  const andre = visibleServices.filter((o) => o.slug !== s.slug);
  const isErp = s.slug === 'erp';
  const visFaq = Boolean(s.faq?.length || fagperson || (utkast && visUtkast));
  const comparisonVisible = erpComparisonStatus === 'publisert' || visUtkast;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}${serviceUrl(s)}#service`,
    name: s.title,
    description: s.short,
    url: `${siteUrl}${serviceUrl(s)}`,
    provider: { '@id': `${siteUrl}/#organization` },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Rogaland' },
      { '@type': 'AdministrativeArea', name: 'Agder' },
    ],
    ...(s.faq?.length
      ? {
          subjectOf: {
            '@type': 'FAQPage',
            mainEntity: s.faq.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        }
      : {}),
  };

  return (
    <>
      {utkast && <UtkastBanner />}
      <JsonLd data={serviceJsonLd} />

      {/* HERO */}
      <Section tone="sand" className="pt-10 md:pt-14">
        <Container>
          <Breadcrumbs items={[{ name: 'Tjenester', href: '/tjenester/' }, { name: s.title, href: serviceUrl(s) }]} />
          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>Tjeneste</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">{s.title}</h1>
              <span aria-hidden="true" className="aksentlinje mt-6 block h-1 w-24 rounded-pille bg-flyd-teal" />
              <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-petrol">{s.short}</p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink href={kontakt} variant="primary" withArrow>
                  Snakk med oss
                </ButtonLink>
                <ButtonLink href="tel:+4748019958" variant="secondary" external>
                  Ring +47 480 19 958
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-5">
              {s.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-bilde bg-flyd-lysmint">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <ServiceTile name={s.icon} tone="petrol" className="aspect-[4/3] w-full rounded-bilde" />
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* PROBLEMET + HVA SOM INNGÅR */}
      <Section tone="lysmint">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>Dette løser vi</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                {s.problem ? s.problem : `Slik hjelper vi deg med ${lc(s.title)}.`}
              </h2>
              {!s.problem && mangler('problemet tjenesten løser, i kundens egne ord')}
            </div>
            <div className="lg:col-span-7" data-reveal>
              <p className="text-[17px] leading-[1.7] text-flyd-skifer">{s.long}</p>
              <h3 className="mt-10 font-display text-[20px] font-semibold">Dette inngår</h3>
              <ul className="mt-4 grid grid-cols-1 border-t border-flyd-linje-mint sm:grid-cols-2 sm:gap-x-8">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 border-b border-flyd-linje-mint py-4 text-[16px] leading-relaxed text-flyd-skog"
                  >
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-flyd-teal" strokeWidth={2.5} aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* SYSTEMENE (bare på ERP-siden) */}
      {isErp && (
        <Section tone="sand">
          <Container>
            <div className="max-w-3xl" data-reveal>
              <Eyebrow>Systemer vi jobber med</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                Fire systemer. Ett ærlig råd.
              </h2>
            </div>
            <ul className="stagger mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
              {erpSystems.map((e, i) => {
                const linked = visibleErpSystems.includes(e);
                const inner = (
                  <>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-flis bg-flyd-sand text-flyd-teal">
                      <FlydIcon name={e.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 font-display text-[22px] font-semibold leading-tight">{e.name}</h3>
                    <p className="mt-2 text-[12px] font-bold uppercase leading-[1.35] tracking-[0.12em] text-flyd-petrol">
                      {e.tagline}
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-flyd-skifer">{e.description}</p>
                    {linked && (
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-medium text-flyd-petrol">
                        Les om {e.name}
                        <ArrowRight className="lenkekort-pil h-4 w-4" strokeWidth={2} aria-hidden="true" />
                      </span>
                    )}
                  </>
                );
                return (
                  <li key={e.id} id={e.id} data-reveal style={{ '--i': i } as React.CSSProperties} className="h-full">
                    {linked ? (
                      <Link href={erpUrl(e)} className="lenkekort flex h-full flex-col rounded-kort bg-flyd-lysmint p-7 hover:bg-flyd-linje-mint">
                        {inner}
                      </Link>
                    ) : (
                      <div className="flex h-full flex-col rounded-kort bg-flyd-lysmint p-7">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            {comparisonVisible && (
              <div className="mt-10" data-reveal>
                <Link
                  href="/tjenester/erp/sammenligning/"
                  className="lenkekort group inline-flex items-center gap-3 rounded-pille bg-flyd-petrol px-6 py-3.5 text-[16px] font-medium text-flyd-sand hover:bg-flyd-skog"
                >
                  Sammenlign systemene
                  <ArrowRight className="lenkekort-pil h-4 w-4 text-flyd-mint" strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* SLIK JOBBER VI: egen prosess for tjenesten, ellers Flyds fire steg */}
      <Section tone="petrol">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow tone="petrol">Slik jobber vi</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">
              Fra første samtale til full flyd.
            </h2>
          </div>
          <div className="mt-12" data-reveal>
            {s.prosess?.length ? (
              <ol className="relative max-w-3xl">
                <span aria-hidden="true" className="prosesslinje absolute bottom-6 left-[23px] top-6 w-0.5 bg-flyd-mint/40" />
                {s.prosess.map((p, i) => (
                  <li key={p.title} className="relative flex gap-6 pb-10 last:pb-0">
                    <span className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-pille bg-flyd-skog font-display text-[20px] font-semibold text-flyd-korall">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="pt-2">
                      <h3 className="font-display text-[20px] font-semibold text-flyd-sand">{p.title}</h3>
                      <p className="mt-2 text-[16px] leading-relaxed text-flyd-dempet">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <ProcessCards steps={process} />
            )}
          </div>
        </Container>
      </Section>

      {/* PASSER FOR / IKKE + PRIS */}
      <Section tone="sand">
        <Container>
          <div
            className={`stagger grid grid-cols-1 gap-4 md:gap-5 ${
              s.passerIkke || (utkast && visUtkast) ? 'md:grid-cols-2' : ''
            }`}
          >
            <div data-reveal className="rounded-kort bg-flyd-lysmint p-7 md:p-10">
              <Eyebrow>Passer for</Eyebrow>
              <p className="mt-4 max-w-3xl font-display text-ingress font-medium text-flyd-skog">{s.fitFor}</p>
            </div>
            {(s.passerIkke || (utkast && visUtkast)) && (
              <div data-reveal style={{ '--i': 1 } as React.CSSProperties} className="rounded-kort bg-flyd-lysmint p-7 md:p-8">
                <Eyebrow>Passer ikke for</Eyebrow>
                {s.passerIkke ? (
                  <p className="mt-4 text-[17px] leading-relaxed text-flyd-skog">{s.passerIkke}</p>
                ) : (
                  mangler('hvem tjenesten ikke passer for')
                )}
              </div>
            )}
          </div>

          {(s.prisfaktorer?.length || (utkast && visUtkast)) && (
            <div className="mt-16 grid grid-cols-1 gap-10 border-t border-flyd-linje-sand pt-14 lg:grid-cols-12 lg:gap-16" data-reveal>
              <div className="lg:col-span-5">
                <Eyebrow>Pris</Eyebrow>
                <h2 className="mt-5 font-display text-display-md font-semibold">Hva prisen avhenger av</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-flyd-skifer">
                  Vi har ingen faste priser på nettsiden. Du får et konkret tilbud etter en første samtale.
                </p>
              </div>
              <div className="lg:col-span-7">
                {s.prisfaktorer?.length ? (
                  <ul className="border-t border-flyd-linje-sand">
                    {s.prisfaktorer.map((f) => (
                      <li key={f} className="flex gap-3 border-b border-flyd-linje-sand py-4 text-[16px] text-flyd-skog">
                        <Check className="mt-1 h-4 w-4 flex-shrink-0 text-flyd-teal" strokeWidth={2.5} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                ) : (
                  mangler('hva prisen for tjenesten avhenger av')
                )}
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* VANLIGE SPØRSMÅL + FAGPERSON */}
      {visFaq && (
        <Section tone="lysmint">
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7" data-reveal>
                <Eyebrow>Vanlige spørsmål</Eyebrow>
                <h2 className="mt-5 font-display text-display-md font-semibold">Det kundene spør oss om</h2>
                {s.faq?.length ? (
                  <div className="mt-8 border-t border-flyd-linje-mint">
                    {s.faq.map((f) => (
                      <details key={f.q} className="faq group border-b border-flyd-linje-mint">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-flis py-5 font-display text-[18px] font-semibold text-flyd-skog transition-colors duration-200 hover:text-flyd-petrol">
                          {f.q}
                          <Plus className="faq-pil h-5 w-5 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                        </summary>
                        <p className="faq-svar pb-6 text-[16px] leading-relaxed text-flyd-skifer">{f.a}</p>
                      </details>
                    ))}
                  </div>
                ) : (
                  <div className="mt-8">{mangler('spørsmål og svar fra ekte kundesamtaler')}</div>
                )}
              </div>
              <aside className="lg:col-span-5" data-reveal>
                <div className="rounded-kort bg-flyd-sand p-7 md:p-8">
                  <Eyebrow>Din fagperson</Eyebrow>
                  {fagperson ? (
                    <div className="mt-5 flex items-center gap-5">
                      {fagperson.image ? (
                        <Image
                          src={fagperson.image}
                          alt={`${fagperson.name} – ${fagperson.role}`}
                          width={80}
                          height={80}
                          className="h-20 w-20 rounded-flis object-cover object-top"
                        />
                      ) : (
                        <span className="flex h-20 w-20 items-center justify-center rounded-flis bg-flyd-petrol font-display text-2xl font-semibold text-flyd-sand">
                          {fagperson.initials}
                        </span>
                      )}
                      <div>
                        <p className="font-display text-[20px] font-semibold">{fagperson.name}</p>
                        <p className="text-[15px] text-flyd-skifer">{fagperson.role}</p>
                        {fagperson.phone && (
                          <a
                            href={`tel:${fagperson.phone.replace(/\s/g, '')}`}
                            className="mt-1 inline-block text-[15px] font-medium text-flyd-petrol underline decoration-flyd-teal decoration-2 underline-offset-4 hover:text-flyd-skog"
                          >
                            {fagperson.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5">{mangler('navngitt fagperson med bilde og direkte nummer')}</div>
                  )}
                </div>
              </aside>
            </div>
          </Container>
        </Section>
      )}

      {/* ANDRE TJENESTER – motsatt flate av seksjonen over, så rytmen holder */}
      <Section tone={visFaq ? 'sand' : 'lysmint'}>
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>Alt i ett hus</Eyebrow>
            <h2 className="mt-5 font-display text-display-md font-semibold">Andre tjenester</h2>
          </div>
          <ul className="stagger mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {andre.map((o, i) => (
              <li key={o.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <Link
                  href={serviceUrl(o)}
                  className={`lenkekort group flex h-full items-center gap-5 rounded-kort p-4 pr-6 ${
                    visFaq ? 'bg-flyd-lysmint hover:bg-flyd-linje-mint' : 'bg-flyd-sand hover:bg-flyd-linje-sand'
                  }`}
                >
                  <ServiceTile name={o.icon} tone="petrol" className="h-16 w-16 flex-shrink-0 rounded-flis" />
                  <span className="flex-1 font-display text-[18px] font-semibold leading-tight">{o.title}</span>
                  <ArrowRight className="lenkekort-pil h-5 w-5 flex-shrink-0 text-flyd-teal" strokeWidth={2} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ClosingCta
        kicker="Neste steg"
        title={`Skal vi se på ${lc(s.title)} sammen?`}
        text="Fortell oss litt om virksomheten din, så finner vi ut hva som er riktig første steg."
        primary={{ href: kontakt, label: 'Snakk med oss' }}
      />
    </>
  );
}
