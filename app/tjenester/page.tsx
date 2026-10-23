import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import ClosingCta from '@/components/ClosingCta';
import { TextLink } from '@/components/Button';
import { ScrollProgressLineWrapper } from '@/components/ScrollProgressLine';
import JsonLd from '@/components/JsonLd';
import { ServiceTile, type ServiceTone } from '@/components/ServiceIcon';
import Breadcrumbs from '@/components/Breadcrumbs';
import { siteUrl } from '@/lib/seo';
import {
  visibleServices,
  kombinerbareTjenester,
  uavhengigeTjenester,
  visibleErpSystems,
  erpSystems,
  serviceUrl,
  erpUrl,
  type Service,
  type EgenTjeneste,
} from '@/data/services';
import { bredtKortKolonner } from '@/components/ServiceCard';

// Én Service per tjeneste, med egen side. Tjenestesiden har samme @id.
const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: visibleServices.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      '@id': `${siteUrl}${serviceUrl(s)}#service`,
      name: s.title,
      description: s.short,
      url: `${siteUrl}${serviceUrl(s)}`,
      provider: { '@id': `${siteUrl}/#organization` },
    },
  })),
};

export const metadata: Metadata = pageMetadata({
  title: 'Regnskap, revisjon, rådgivning og ERP – Tjenester',
  description:
    'Tjenestene til Flyd: regnskap og rådgivning, revisjon, ERP/programvare, integrasjoner, analyse, nettsider og digitale flater, lønn og HR.',
  path: '/tjenester/',
});

const tileTones: ServiceTone[] = ['petrol', 'teal', 'skog'];

/**
 * Tjenestekort med bilde (eller ikonflis), nummer og lenke. `bred` gir et kort over
 * hele rutenettet med bildet til venstre, like bredt som én kolonne (revisjon).
 */
function Tjenestekort({
  s,
  nr,
  tone,
  bred = false,
}: {
  s: Service | EgenTjeneste;
  nr: number;
  tone: ServiceTone;
  bred?: boolean;
}) {
  return (
    <li
      id={s.id}
      data-reveal
      style={{ '--i': nr - 1 } as React.CSSProperties}
      className={clsx('scroll-mt-28', bred && 'sm:col-span-2 lg:col-span-3')}
    >
      <Link
        href={serviceUrl(s)}
        className={clsx(
          'lys lenkekort group flex h-full flex-col rounded-kort bg-flyd-lysmint p-3 hover:bg-flyd-linje-mint',
          bred && bredtKortKolonner,
        )}
      >
        {s.image ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-flis bg-flyd-linje-mint">
            <div className="rull-zoom absolute inset-0">
              <Image
                src={s.image.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>
          </div>
        ) : (
          <ServiceTile name={s.icon} tone={tone} className="aspect-[16/10] w-full rounded-flis" />
        )}
        <div className={clsx('flex flex-1 flex-col px-3 pb-3 pt-6', bred && 'sm:pt-3 lg:col-span-2')}>
          <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-flyd-petrol">
            {String(nr).padStart(2, '0')}
          </span>
          <h2 className="mt-2 font-display text-[24px] font-semibold leading-tight">{s.title}</h2>
          <p className="mt-3 text-[16px] leading-[1.6] text-flyd-skifer">{s.short}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-medium text-flyd-petrol">
            Les mer om {s.title.charAt(0).toLowerCase() + s.title.slice(1)}
            <ArrowRight className="lenkekort-pil h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </li>
  );
}

export default function TjenesterPage() {
  return (
    <ScrollProgressLineWrapper>
      <JsonLd data={servicesJsonLd} />
      {/* Seksjonsskille: Petrol og stor tittel. Kortene rett under er menyen. */}
      <Section tone="petrol" size="lg" flyt>
        <Container>
          <Breadcrumbs items={[{ name: 'Tjenester', href: '/tjenester/' }]} tone="dark" />
          <Eyebrow tone="petrol" className="mt-10">Tjenester</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-display-xl font-semibold text-flyd-sand">
            Ett kompetansehus for økonomi og teknologi.
          </h1>
          <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-dempet">
            Vi hjelper bedrifter med regnskap, revisjon, rådgivning og
            programvare – fra daglig bokføring til integrasjoner mellom
            forretningssystemer. Velg det du trenger.
          </p>
        </Container>
      </Section>

      {/* Kortene beholder de gamle ankrene (#regnskap-radgivning osv.), så
          lenker til /tjenester/#… lander på riktig kort og leder videre. */}
      <Section tone="sand">
        <Container>
          {/* Tjenestene som kan leveres sammen i rutenettet, revisjon i egen bred rad under. */}
          <ul className="stagger grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {kombinerbareTjenester.map((s, i) => (
              <Tjenestekort key={s.id} s={s} nr={i + 1} tone={tileTones[i % tileTones.length]} />
            ))}
            {uavhengigeTjenester.map((s, i) => (
              <Tjenestekort key={s.id} s={s} nr={kombinerbareTjenester.length + i + 1} tone="teal" bred />
            ))}
          </ul>
          <p className="mt-12 text-[17px] leading-[1.7] text-flyd-skifer" data-reveal>
            Har du regnskapsfører i dag og vurderer å bytte?{' '}
            <TextLink href="/bytte-regnskapsforer/">Slik går du fram for å bytte regnskapsfører</TextLink>
          </p>
        </Container>
      </Section>

      {/* ERP-systemene. Ankrene (#tripletex osv.) er beholdt fra før. */}
      <Section tone="lysmint">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
            <div className="max-w-2xl">
              <Eyebrow>Systemer vi jobber med</Eyebrow>
              <h2 className="mt-5 font-display text-display-md font-semibold">
                Vi velger systemet etter behovet ditt.
              </h2>
            </div>
            <TextLink href="/tjenester/erp/">Les om ERP og systemvalg</TextLink>
          </div>
          <ul className="stagger mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {erpSystems.map((e, i) => (
              <li
                key={e.id}
                id={e.id}
                data-reveal
                style={{ '--i': i } as React.CSSProperties}
                className="scroll-mt-28 rounded-kort bg-flyd-sand p-6"
              >
                <h3 className="font-display text-[20px] font-semibold">
                  {visibleErpSystems.includes(e) ? (
                    <Link href={erpUrl(e)} className="underline decoration-flyd-teal decoration-2 underline-offset-4 hover:text-flyd-petrol">
                      {e.name}
                    </Link>
                  ) : (
                    e.name
                  )}
                </h3>
                <p className="mt-2 text-[12px] font-bold uppercase leading-[1.35] tracking-[0.12em] text-flyd-petrol">
                  {e.tagline}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-flyd-skifer">{e.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ClosingCta
        kicker="Neste steg"
        title="Usikker på hvor du skal begynne?"
        text="Vi tar gjerne en uforpliktende prat for å forstå situasjonen din og anbefale hva som bør være første steg."
      />
    </ScrollProgressLineWrapper>
  );
}
