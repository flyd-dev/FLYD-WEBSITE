import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
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
  visibleErpSystems,
  erpSystems,
  serviceUrl,
  erpUrl,
} from '@/data/services';

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
  title: 'Regnskap, rådgivning og ERP – Tjenester',
  description:
    'Regnskap og rådgivning, ERP/programvare, integrasjoner, analyse, nettsider og digitale flater, lønn og HR – samlet hos Flyd.',
  path: '/tjenester/',
});

const tileTones: ServiceTone[] = ['petrol', 'teal', 'skog'];

export default function TjenesterPage() {
  return (
    <ScrollProgressLineWrapper>
      <JsonLd data={servicesJsonLd} />
      {/* Seksjonsskille: Petrol, stor tittel og emnetagger. */}
      <Section tone="petrol" size="lg" flyt>
        <Container>
          <Breadcrumbs items={[{ name: 'Tjenester', href: '/tjenester/' }]} tone="dark" />
          <Eyebrow tone="petrol" className="mt-10">Tjenester</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-display-xl font-semibold text-flyd-sand">
            Alt du trenger. Ett kompetansehus.
          </h1>
          <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-dempet">
            Vi leverer alt du trenger innen økonomi og teknologi – fra daglig
            bokføring til komplekse integrasjoner mellom forretningssystemer.
            Velg det du trenger, eller sett oss til å ta hele bildet.
          </p>

          <nav aria-label="Tjenester" className="mt-12">
            <ul className="flex flex-wrap gap-3">
              {visibleServices.map((s) => (
                <li key={s.id}>
                  <Link
                    href={serviceUrl(s)}
                    className="inline-flex items-center rounded-pille border border-flyd-mint px-4 py-2 text-[15px] font-medium text-flyd-sand transition-colors duration-200 hover:bg-flyd-mint hover:text-flyd-skog active:translate-y-[1px]"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      {/* Kortene beholder de gamle ankrene (#regnskap-radgivning osv.), så
          lenker til /tjenester/#… lander på riktig kort og leder videre. */}
      <Section tone="sand">
        <Container>
          <ul className="stagger grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {visibleServices.map((s, i) => (
              <li
                key={s.id}
                id={s.id}
                data-reveal
                style={{ '--i': i } as React.CSSProperties}
                className="scroll-mt-28"
              >
                <Link
                  href={serviceUrl(s)}
                  className="lys lenkekort group flex h-full flex-col rounded-kort bg-flyd-lysmint p-3 hover:bg-flyd-linje-mint"
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
                    <ServiceTile
                      name={s.icon}
                      tone={tileTones[i % tileTones.length]}
                      className="aspect-[16/10] w-full rounded-flis"
                    />
                  )}
                  <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
                    <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-flyd-petrol">
                      {String(i + 1).padStart(2, '0')}
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
            ))}
          </ul>
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
