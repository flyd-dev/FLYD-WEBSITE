import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import ClosingCta from '@/components/ClosingCta';
import { ButtonLink } from '@/components/Button';
import { ScrollProgressLineWrapper } from '@/components/ScrollProgressLine';
import JsonLd from '@/components/JsonLd';
import { ServiceTile, type ServiceTone } from '@/components/ServiceIcon';
import { services, erpSystems } from '@/data/services';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://www.flyd.no/' },
    { '@type': 'ListItem', position: 2, name: 'Tjenester', item: 'https://www.flyd.no/tjenester/' },
  ],
};

export const metadata: Metadata = {
  title: 'Regnskap, rådgivning og ERP – Tjenester',
  description:
    'Regnskap og rådgivning, ERP/programvare, integrasjoner, analyse, nettsider og digitale flater, lønn og HR – samlet hos Flyd.',
  alternates: { canonical: '/tjenester/' },
};

// Sand og Lys mint veksler på innhold (designmanualen, bakgrunnsrytme).
const tones = ['sand', 'lysmint'] as const;
const tileTones: ServiceTone[] = ['petrol', 'teal', 'skog'];

export default function TjenesterPage() {
  return (
    <ScrollProgressLineWrapper>
      <JsonLd data={breadcrumbJsonLd} />
      {/* Seksjonsskille: Petrol, stor tittel og emnetagger. */}
      <Section tone="petrol" size="lg">
        <Container>
          <Eyebrow tone="petrol">Tjenester</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-display-xl font-semibold text-flyd-sand">
            Seks tjenester. Ett kompetansehus.
          </h1>
          <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-dempet">
            Vi leverer alt du trenger innen økonomi og teknologi – fra daglig
            bokføring til komplekse integrasjoner mellom forretningssystemer.
            Velg det du trenger, eller sett oss til å ta hele bildet.
          </p>

          <nav aria-label="Tjenester" className="mt-12">
            <ul className="flex flex-wrap gap-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`#${s.id}`}
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

      {services.map((s, i) => {
        const tone = tones[i % tones.length];
        const cardBg = tone === 'sand' ? 'bg-flyd-lysmint' : 'bg-flyd-sand';
        const line = tone === 'sand' ? 'border-flyd-linje-sand' : 'border-flyd-linje-mint';

        return (
          <Section key={s.id} tone={tone} id={s.id}>
            <Container>
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5" data-reveal>
                  <ServiceTile
                    name={s.icon}
                    tone={tileTones[i % tileTones.length]}
                    className="h-20 w-20 rounded-flis"
                  />
                  <Eyebrow className="mt-8">
                    {String(i + 1).padStart(2, '0')} — Tjeneste
                  </Eyebrow>
                  <h2 className="mt-4 font-display text-display-lg font-semibold">
                    {s.title}
                  </h2>
                  <p className="mt-6 font-display text-ingress font-medium text-flyd-petrol">
                    {s.short}
                  </p>
                </div>

                <div className="lg:col-span-7" data-reveal>
                  <p className="text-[17px] leading-[1.7] text-flyd-skifer">{s.long}</p>

                  <ul className={`mt-10 grid grid-cols-1 border-t sm:grid-cols-2 sm:gap-x-8 ${line}`}>
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className={`flex items-start gap-3 border-b py-4 text-[16px] leading-relaxed text-flyd-skog ${line}`}
                      >
                        <Check
                          className="mt-1 h-4 w-4 flex-shrink-0 text-flyd-teal"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-10 rounded-kort p-6 md:p-7 ${cardBg}`}>
                    <Eyebrow>Passer for</Eyebrow>
                    <p className="mt-3 text-[16px] leading-relaxed text-flyd-skog">{s.fitFor}</p>
                  </div>

                  <div className="mt-10">
                    <ButtonLink href="/kontakt" variant="primary" withArrow>
                      Snakk med oss om {s.title.toLowerCase()}
                    </ButtonLink>
                  </div>
                </div>
              </div>

              {/* ERP-systemene kun under programvare */}
              {s.id === 'programvare' && (
                <div className={`mt-20 border-t pt-14 ${line}`}>
                  <h3 className="font-display text-display-md font-semibold">
                    Systemer vi jobber med
                  </h3>
                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {erpSystems.map((e) => (
                      <div key={e.id} id={e.id} className={`rounded-kort p-7 ${cardBg}`}>
                        <h4 className="font-display text-[20px] font-semibold">{e.name}</h4>
                        <p className="mt-2 text-[12px] font-bold uppercase leading-[1.35] tracking-[0.12em] text-flyd-petrol">
                          {e.tagline}
                        </p>
                        <p className="mt-4 text-[15px] leading-relaxed text-flyd-skifer">
                          {e.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Container>
          </Section>
        );
      })}

      <ClosingCta
        kicker="Neste steg"
        title="Usikker på hvor du skal begynne?"
        text="Vi tar gjerne en uforpliktende prat for å forstå situasjonen din og anbefale hva som bør være første steg."
      />
    </ScrollProgressLineWrapper>
  );
}
