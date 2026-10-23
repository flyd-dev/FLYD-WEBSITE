import type { Metadata } from 'next';
import { Fragment } from 'react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import Breadcrumbs from '@/components/Breadcrumbs';
import NumberedList from '@/components/NumberedList';
import ClosingCta from '@/components/ClosingCta';
import { ButtonLink, TextLink } from '@/components/Button';
import { pageMetadata } from '@/lib/seo';
import { bytteRevisor as b } from '@/data/revisjon';
import StegScroll from '@/components/designlab/StegScroll';
import { visUtkast } from '@/lib/utkast';

/**
 * Bytte revisor: samme oppbygning som revisjonssiden, kort og saklig.
 * Tekstene står i data/revisjon.ts.
 */
export const metadata: Metadata = pageMetadata({
  title: b.meta.title,
  description: b.meta.description,
  path: b.path,
});

const kontakt = `/kontakt?tema=${encodeURIComponent('revisjon')}`;

export default function BytteRevisorPage() {
  return (
    <>
      {/* HERO */}
      <Section tone="sand" className="pt-10 md:pt-14" flyt>
        <Container>
          <Breadcrumbs items={[{ name: 'Bytte revisor', href: b.path }]} />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>Guide · Revisor</Eyebrow>
            <h1 className="mt-6 font-display text-display-xl font-semibold">{b.tittel}</h1>
            <span aria-hidden="true" className="aksentlinje mt-6 block h-1 w-24 rounded-pille bg-flyd-teal" />
            <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-petrol">{b.ingress}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href={kontakt} variant="primary" withArrow>
                Snakk med oss
              </ButtonLink>
              <ButtonLink href="tel:+4748019958" variant="secondary" external>
                Ring +47 480 19 958
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* STEGENE – Petrol som seksjonsskille */}
      {/* overflow: clip i stedet for hidden, ellers virker ikke sticky i StegScroll (designlab). */}
      <Section tone="petrol" flyt className={visUtkast ? '!overflow-clip' : undefined}>
        <Container>
          {visUtkast ? (
            // Designlab-forslag, bare på forhåndsvisning: stegene som tidslinje som fylles når du scroller.
            <StegScroll
              tone="petrol"
              steps={b.steg.punkter.map((p, i) => ({ n: String(i + 1), title: p.tittel, body: p.tekst }))}
              intro={
                <>
                  <Eyebrow tone="petrol">{b.steg.kicker}</Eyebrow>
                  <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">{b.steg.tittel}</h2>
                </>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5" data-reveal>
                <Eyebrow tone="petrol">{b.steg.kicker}</Eyebrow>
                <h2 className="mt-5 font-display text-display-lg font-semibold text-flyd-sand">{b.steg.tittel}</h2>
              </div>
              <div className="lg:col-span-7">
                <NumberedList
                  tone="dark"
                  items={b.steg.punkter.map((p) => (
                    <Fragment key={p.tittel}>
                      <strong className="block font-display text-[20px] font-semibold leading-tight">{p.tittel}</strong>
                      <span className="mt-2 block text-[16px] text-flyd-dempet">{p.tekst}</span>
                    </Fragment>
                  ))}
                />
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* REVISJON OG REGNSKAP ADSKILT */}
      <Section tone="sand">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>{b.adskilt.kicker}</Eyebrow>
            <h2 className="mt-5 font-display text-display-md font-semibold">{b.adskilt.tittel}</h2>
            <p className="mt-6 text-[17px] leading-[1.7] text-flyd-skifer">{b.adskilt.tekst}</p>
            <div className="mt-8">
              <TextLink href="/tjenester/revisjon/">Les om revisjon hos Flyd</TextLink>
            </div>
          </div>
        </Container>
      </Section>

      <ClosingCta
        kicker={b.avslutning.kicker}
        title={b.avslutning.tittel}
        text={b.avslutning.tekst}
        primary={{ href: kontakt, label: 'Snakk med oss' }}
      />
    </>
  );
}
