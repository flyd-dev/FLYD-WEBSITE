import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import FullflydMark from '@/components/FullflydMark';
import { ButtonLink } from '@/components/Button';
import { ScrollProgressLineWrapper } from '@/components/ScrollProgressLine';
import JsonLd from '@/components/JsonLd';
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

const tones: Array<'paper' | 'ink' | 'teal' | 'teal-soft'> = [
  'paper',
  'ink',
  'paper',
  'teal',
  'paper',
  'ink',
];

export default function TjenesterPage() {
  return (
    <ScrollProgressLineWrapper>
      <JsonLd data={breadcrumbJsonLd} />
      <Section tone="paper" size="lg" className="pt-20 md:pt-28 overflow-hidden">
        <div
          className="pointer-events-none absolute -right-[4%] top-[30%] hidden lg:block opacity-[0.12]"
          aria-hidden="true"
        >
          <FullflydMark variant="teal" className="text-[18rem]" />
        </div>
        <Container className="relative">
          <Eyebrow tone="teal">Tjenester</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-display-xl font-semibold">
            Seks tjenester.
            <br />
            <span className="text-flyd-teal-dark">Ett kompetansehus.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[18px] leading-[1.75] text-flyd-ink/75">
            Vi leverer alt du trenger innen økonomi og teknologi – fra daglig
            bokføring til komplekse integrasjoner mellom forretningssystemer.
            Velg det du trenger, eller sett oss til å ta hele bildet.
          </p>

          <nav
            aria-label="Tjenester"
            className="mt-14 grid grid-cols-2 gap-[1px] bg-flyd-ink/10 sm:grid-cols-3 lg:grid-cols-6"
          >
            {services.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className="bg-flyd-paper px-4 py-5 text-center text-[13px] uppercase tracking-[0.18em] text-flyd-ink/70 transition-colors hover:bg-[#F2F7F7] hover:text-flyd-accent"
              >
                {s.title}
              </Link>
            ))}
          </nav>
        </Container>
      </Section>

      {services.map((s, i) => {
        const tone = tones[i % tones.length];
        const Icon = s.icon;
        const dark = tone === 'ink';
        const teal = tone === 'teal';
        const textMuted = dark
          ? 'text-flyd-paper/80'
          : teal
          ? 'text-flyd-ink/80'
          : 'text-flyd-ink/75';
        const border = dark ? 'border-flyd-paper/20' : 'border-flyd-ink/15';

        return (
          <Section key={s.id} tone={tone} id={s.id}>
            <Container>
              <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
                <div className="lg:col-span-5" data-reveal>
                  <div className="flex items-center gap-4">
                    <Icon
                      className={dark ? 'h-7 w-7 text-flyd-teal' : 'h-7 w-7 text-flyd-teal-dark'}
                      strokeWidth={1.5}
                    />
                    <Eyebrow tone={dark ? 'paper' : 'ink'}>
                      0{i + 1} · Tjeneste
                    </Eyebrow>
                  </div>
                  <h2 className="mt-6 font-display text-display-lg font-semibold">
                    {s.title}
                  </h2>
                  <p className={`mt-6 text-[17px] leading-[1.75] ${textMuted}`}>
                    {s.short}
                  </p>
                </div>

                <div className="lg:col-span-7" data-reveal>
                  <p className={`text-[17px] leading-[1.8] ${textMuted}`}>
                    {s.long}
                  </p>

                  <ul className={`mt-10 grid grid-cols-1 gap-0 sm:grid-cols-2 border-t ${border}`}>
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className={`flex items-start gap-3 border-b ${border} py-4 pr-4 text-[15px] leading-relaxed`}
                      >
                        <Check
                          className={
                            dark
                              ? 'mt-1 h-4 w-4 flex-shrink-0 text-flyd-teal'
                              : 'mt-1 h-4 w-4 flex-shrink-0 text-flyd-teal-dark'
                          }
                          strokeWidth={2}
                        />
                        <span className={dark ? 'text-flyd-paper/90' : 'text-flyd-ink/90'}>
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-10 border p-6 md:p-7 ${
                      dark
                        ? 'border-flyd-teal/50 bg-flyd-teal/10'
                        : 'border-flyd-teal-dark bg-flyd-teal/10'
                    }`}
                  >
                    <div className="text-[11px] uppercase tracking-[0.22em] text-flyd-teal-dark">
                      Passer for
                    </div>
                    <p
                      className={`mt-3 text-[15px] leading-relaxed ${
                        dark ? 'text-flyd-paper/90' : 'text-flyd-ink/90'
                      }`}
                    >
                      {s.fitFor}
                    </p>
                  </div>

                  <div className="mt-10">
                    <ButtonLink
                      href="/kontakt"
                      variant={dark ? 'teal' : 'primary'}
                      withArrow
                      accent
                    >
                      Snakk med oss om {s.title.toLowerCase()}
                    </ButtonLink>
                  </div>
                </div>
              </div>

              {/* ERP sub-grid only under the programvare section */}
              {s.id === 'programvare' && (
                <div className="mt-20 border-t border-flyd-ink/15 pt-14">
                  <h3 className="font-display text-2xl font-semibold">
                    Systemer vi jobber med
                  </h3>
                  <div className="mt-8 grid grid-cols-1 gap-[1px] bg-flyd-ink/10 sm:grid-cols-2 lg:grid-cols-4">
                    {erpSystems.map((e) => (
                      <div
                        key={e.id}
                        id={e.id}
                        className="bg-flyd-paper p-7"
                      >
                        <h4 className="font-display text-lg font-semibold">
                          {e.name}
                        </h4>
                        <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-flyd-teal-dark">
                          {e.tagline}
                        </div>
                        <p className="mt-4 text-[14px] text-flyd-ink/75 leading-relaxed">
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

      {/* CLOSING CTA */}
      <Section tone="teal-dark" size="lg">
        <Container className="relative">
          <div className="max-w-3xl" data-reveal>
            <Eyebrow tone="paper">Neste steg</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-paper">
              Usikker på hvor du skal begynne?
            </h2>
            <p className="mt-6 text-[17px] text-flyd-paper/85 leading-[1.75]">
              Vi tar gjerne en uforpliktende prat for å forstå situasjonen din og
              anbefale hva som bør være første steg.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/kontakt" variant="teal" withArrow accent>
                Book en samtale
              </ButtonLink>
              <ButtonLink href="tel:+4748019958" variant="outline-paper">
                Ring oss
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </ScrollProgressLineWrapper>
  );
}
